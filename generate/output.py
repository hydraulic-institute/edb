import shutil
import os
import lesscpy
import markdown
import glob
import io
import htmlmin
import csv

from .common import parse_dict
from six import StringIO
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown.preprocessors import Preprocessor
from markdown import Extension
from shutil import copyfile
from shutil import copytree
from collections import namedtuple

BASE_DIR = os.path.split(os.path.realpath(__file__))[0]
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "./build")
TEMPLATE_DIR = os.path.join(BASE_DIR, "./templates/")
STATICS_DIR = os.path.join(BASE_DIR, "./static")
SOURCE_DIR = os.path.join(BASE_DIR, "..", "./source")

Table = namedtuple('Table', 'units columns headings rows')
TableRow = namedtuple('TableRow', 'type data')
TableColumn = namedtuple('TableColumn', 'type data')

env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(['html', 'xml'])
)


def replace_latex_block(latex):
    return "<p class='formula'>" + latex + "</p>"


def table_data(units, table, path, filename):
    file = os.path.join(SOURCE_DIR, path, filename)
    if not os.path.isfile(file):
        print(
            f"Error - the table {table.title} refers to {file} which does not exist")
        return None

    with open(file, newline='') as csvfile:
        csv_data = csv.reader(csvfile)
        first_row = next(csv_data)
        columns = first_row[1:]
        rows = []
        headings = []
        for row in csv_data:
            row_columns = [TableColumn(columns[i], d)
                           for i, d in enumerate(row[1:])]
            r = TableRow(row[0], row_columns)
            if (r.type == 'heading'):
                headings.append(r)
            else:
                rows.append(r)
        return Table(units, columns, headings, rows)


def replace_table_block(dir, table_text):
    table = parse_dict(table_text.strip().split("\n"))

    data_us = ""
    data_metric = ""

    if 'data' in table:
        data_us = table['data']
        data_metric = table['data']
    elif 'data-us' in table and 'data-metric' in table:
        data_us = table['data-us']
        data_metric = table['data-metric']
    else:
        print(
            f"Error - the table {table.title} does not specify unit-agnostic source or us/metric sources.")
        return ""

    template = env.get_template('table.jinja')

    us = table_data('us', table, dir, data_us)
    metric = table_data('metric', table, dir, data_metric)

    us_html = template.render(meta=table, table=us)
    metric_html = template.render(meta=table, table=metric)
    return us_html+metric_html


def process_latex_blocks(markdown):
    delim = "=+="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + replace_latex_block(within) + after
        start = markdown.find(delim)
    return markdown


def process_table_blocks(dir, markdown):
    delim = "=|="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + replace_table_block(dir, within) + after
        start = markdown.find(delim)

    return markdown


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
    with io.open(os.path.join(OUTPUT_DIR, 'statics', 'style.css'), 'w', encoding='utf8') as f:
        f.write(css)


def make_specials(specials):
    for special in specials:
        src = os.path.join(SOURCE_DIR, special)
        dst = os.path.join(OUTPUT_DIR, special)
        print(f'Copying {src} to {dst}.')
        copytree(src,
                 dst)


def write_content(graph, node, slug_override=None, path="."):
    print(f'Processing {node["name"]} at path {path}')
    if node['copy_only'] == True:
        out = os.path.join(OUTPUT_DIR, path, node['name'])
        src = os.path.join(node['path'], node['name'])
        print(f' - Copied {node["name"]} as static resource.')
        copyfile(src, out)
        return

    if slug_override:
        slug = slug_override
    else:
        slug = node['slug']

    content = node['content']
    content = process_latex_blocks(content)
    content = markdown.markdown(content)

    # table get's exploded after markdown conversion - placing actual HTML in
    # the markdown causes some problems (not entirely sure why - looks like a bug
    # in the module perhaps...)
    content = process_table_blocks(node['path'], content)
    template = env.get_template('topic.jinja')
    sections = [dir for dir in graph if dir['directory'] == True]
    html = template.render(section="", topic=slug,
                           content=content, sections=sections)

    # Refactor - use minification only if not in "debug" mode... makes dev more difficult.
    with io.open(os.path.join(OUTPUT_DIR, path, slug+'.html'), 'w', encoding='utf8') as f:
        f.write(htmlmin.minify(
            html, remove_comments=True, remove_empty_space=True))
        # f.write(html.encode('utf-8'))


def make_root(graph):
    statics()

    nodes = [node for node in graph if node['directory'] == False]

    for node in nodes:
        so = None
        if node['slug'] == 'home':
            so = 'index'
        write_content(graph, node, so)


def make_section(graph, section, parent=None):
    directory = os.path.join(OUTPUT_DIR, section['slug'])
    os.makedirs(directory)
    for topic in section['children']:
        # If this is a subsection... recursive time...
        if topic['directory']:
            print("Sub directories are currently unsupported.")
        else:
            write_content(graph, topic, None, section['slug'])


def html(graph, specials):
    print('Base directory:      ', BASE_DIR)
    print('Output directory:    ', OUTPUT_DIR)
    print('Template directory:  ', TEMPLATE_DIR)
    print('Statics directory:   ', STATICS_DIR)
    print('Source directory:    ', SOURCE_DIR)
    clean()
    make_specials(specials)
    make_root(graph)
    for section in [dir for dir in graph if dir['directory'] == True]:
        make_section(graph, section)
