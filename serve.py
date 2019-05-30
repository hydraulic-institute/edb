import http.server
import socketserver
import os
import threading
import sys
import time
import logging
import build
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


PORT = 8081
BASE_DIR = os.path.split(os.path.realpath(__file__))[0]
WEB_DIR = os.path.join(os.path.dirname(__file__), 'build')
SOURCE_DIR = os.path.join(BASE_DIR, 'source')


class StoppableHTTPServer(http.server.HTTPServer):
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


def launch_web_server():
    os.chdir(WEB_DIR)
    server = StoppableHTTPServer(("127.0.0.1", PORT),
                                 http.server.SimpleHTTPRequestHandler)

    thread = threading.Thread(None, server.run)
    thread.start()
    print("Server running at", PORT)

    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')


if __name__ == "__main__":
    # Do an initial build right away.
    build.generate(False)

    # Setup an HTTP server so user can see the EDB live in a browser
    # this is done in a separate thread
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
