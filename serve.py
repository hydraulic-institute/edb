from http.server import BaseHTTPRequestHandler, HTTPServer, SimpleHTTPRequestHandler
import socketserver
import os
import threading
import sys
import time
import logging
import build

import io
import cgi
import shutil

from threading import Thread
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


PORT = 8080
FILE_SERVER_PORT = 8001
BASE_DIR = os.path.split(os.path.realpath(__file__))[0]
WEB_DIR = os.path.join(os.path.dirname(__file__), 'build')
SOURCE_DIR = os.path.join(BASE_DIR, 'source')
DO_UPLOAD = True
#If DO_UPLOAD=True
UPLOADS_DIR = os.path.join(WEB_DIR, 'uploads')
#If DO_UPLOAD=False
TOOL_DIR = os.path.join(WEB_DIR, 'tools') #To write it directly overtop of the existing csv
DEFS_FILENAME = "table-of-definitions.csv"

class StoppableHTTPServer(HTTPServer):
    def run(self):
        try:
            self.serve_forever()
        except KeyboardInterrupt:
            pass
        finally:
            # Clean-up server (close socket, etc.)
            self.server_close()


class BuilderEventHandler(FileSystemEventHandler):
    def on_moved(self, event):
        super(BuilderEventHandler, self).on_moved(event)
        build.generate(False)

    def on_created(self, event):
        super(BuilderEventHandler, self).on_created(event)
        build.generate(False)

    def on_deleted(self, event):
        super(BuilderEventHandler, self).on_deleted(event)
        build.generate(False)

    def on_modified(self, event):
        super(BuilderEventHandler, self).on_deleted(event)
        build.generate(False)

class FileServer(BaseHTTPRequestHandler):
    
    def do_GET(self):
        outData3='<form method=post action=/ enctype=multipart/form-data> <input type=file name=file> <input type=submit> </form>'
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes(outData3, "utf-8"))


    def do_POST(self):        
        r, info = self.deal_post_data()
        print(r, info, "by: ", self.client_address)
        f = io.BytesIO()
        if r:
            f.write(b"Success\n")
        else:
            f.write(b"Failed\n")
        length = f.tell()
        f.seek(0)
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.send_header("Content-Length", str(length))
        self.end_headers()
        if f:
            shutil.copyfileobj(f, self.wfile)
            f.close()      

    def deal_post_data(self):
        ctype, pdict = cgi.parse_header(self.headers['Content-Type'])
        pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
        pdict['CONTENT-LENGTH'] = int(self.headers['Content-Length'])
        files_uploaded=""
        if ctype == 'multipart/form-data':
            form = cgi.FieldStorage( fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':self.headers['Content-Type'], })
            print (type(form))
            try:
                if isinstance(form["file"], list):
                    #Everything goes to uploads directory
                    myfilename=f"""{UPLOADS_DIR}/{record.filename}"""
                    for record in form["file"]:
                        open(myfilename, "wb").write(record.file.read())
                        files_uploaded+=myfilename+", "
                else:
                    if DO_UPLOAD:
                        myfilename=f"""{UPLOADS_DIR}/{form["file"].filename}"""
                    else:
                        myfilename=f"""{TOOL_DIR}/{DEFS_FILENAME}"""
                    open(myfilename, "wb").write(form["file"].file.read())
                    files_uploaded=myfilename
            except IOError:
                    return (False, "Can't create file to write, do you have permission to write?")
        return (True, "Files uploaded: "+files_uploaded)
    

def launch_file_server():
    file_server = StoppableHTTPServer(("127.0.0.1", FILE_SERVER_PORT), FileServer)
    print("File Server running at ", FILE_SERVER_PORT)

    file_thread = threading.Thread(None, file_server.run)
    file_thread.start()


def launch_web_server():
    os.chdir(WEB_DIR)
    server = StoppableHTTPServer(("127.0.0.1", PORT), SimpleHTTPRequestHandler)

    thread = threading.Thread(None, server.run)
    thread.start()
    print("Server running at ", PORT)

    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')


if __name__ == "__main__":
    # Do an initial build right away.
    build.generate(False)

    # Setup an HTTP server so user can see the EDB live in a browser
    # this is done in a separate thread
    launch_file_server()

    launch_web_server()

    # Now watch the source directory for changes, building each time.
    event_handler = BuilderEventHandler()
    observer = Observer()
    observer.schedule(event_handler, SOURCE_DIR, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
