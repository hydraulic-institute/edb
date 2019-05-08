import shutil
import os
import lesscpy
import markdown
import glob
import htmlmin
from six import StringIO
from jinja2 import Environment, FileSystemLoader, select_autoescape

BASE_DIR = os.path.split(os.path.realpath(__file__))[0]
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "./build")
TEMPLATE_DIR = os.path.join(BASE_DIR, "./templates/")
STATICS_DIR = os.path.join(BASE_DIR, "./static")


env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(['html', 'xml'])
)


def clean():
    if os.path.exists(OUTPUT_DIR):
        for root, dirs, files in os.walk(OUTPUT_DIR):
            for f in files:
                os.unlink(os.path.join(root, f))
            for d in dirs:
                shutil.rmtree(os.path.join(root, d))
    else:
        os.makedirs(OUTPUT_DIR)


def statics():
    os.makedirs(os.path.join(OUTPUT_DIR, 'statics'))
    css = lesscpy.compile(os.path.join(STATICS_DIR, 'style.less'), minify=True)
    f = open(os.path.join(OUTPUT_DIR, 'statics', 'style.css'), "w")
    f.write(css)
    f.close()


def write_html(graph, node, slug_override=None, path="."):
    if slug_override:
        slug = slug_override
    else:
        slug = node['slug']
    content = markdown.markdown(node['content'])
    template = env.get_template('topic.jinja')
    target = open(os.path.join(OUTPUT_DIR, path, slug+'.html'), "w")
    sections = [dir for dir in graph if dir['directory'] == True]
    html = template.render(section="", topic=slug,
                           content=content, sections=sections)

    target.write(htmlmin.minify(
        html, remove_comments=True, remove_empty_space=True))
    target.close()


def make_root(graph):
    statics()

    nodes = [node for node in graph if node['directory'] == False]

    for node in nodes:
        so = None
        if node['slug'] == 'home':
            so = 'index'
        write_html(graph, node, so)


def make_section(graph, section, parent=None):
    directory = os.path.join(OUTPUT_DIR, section['slug'])
    os.makedirs(directory)
    for topic in section['children']:
        # If this is a subsection... recursive time...
        if topic['directory']:
            print("Sub directories are currently unsupported.")
        else:
            write_html(graph, topic, None, section['slug'])


def html(graph):
    print(BASE_DIR)
    print(OUTPUT_DIR)
    print(TEMPLATE_DIR)
    print(STATICS_DIR)
    clean()
    make_root(graph)
    for section in [dir for dir in graph if dir['directory'] == True]:
        make_section(graph, section)
