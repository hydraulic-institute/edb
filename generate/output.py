import shutil
import os
import lesscpy
import markdown
import glob
import io
import htmlmin
import copy
import csv
import json
import uuid
import pprint
import pypandoc
from selenium import webdriver
from datetime import date

from .common import parse_dict
from six import StringIO
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markdown.preprocessors import Preprocessor
from markdown import Extension
from shutil import copyfile
from shutil import copytree
from collections import namedtuple

global chart_count
chart_count = 0

global pprinter
pprinter = pprint.PrettyPrinter(indent=2)

global all_tables
all_tables=[]

BASE_DIR = os.path.split(os.path.realpath(__file__))[0]
OUTPUT_DIR = os.path.join(BASE_DIR, "..", "./build")
TEMPLATE_DIR = os.path.join(BASE_DIR, "./templates/")
STATICS_DIR = os.path.join(BASE_DIR, "./static")
SOURCE_DIR = os.path.join(BASE_DIR, "..", "./source")

Table = namedtuple('Table', 'units columns headings rows')
TableRow = namedtuple('TableRow', 'type data')
TableColumn = namedtuple('TableColumn', 'type data')
DefinitionRow = namedtuple('DefinitionRow', 'section type data id ref_link source_link')
DefinitionColumn = namedtuple('DefinitionColumn','type data links')
ChartSeries = namedtuple('ChartSeries', 'title data')
Chart = namedtuple('Chart', 'units x series')
env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(['html', 'xml'])
)


class RenderOptions:
    def __init__(self):
        self.minified = ""


global options
options = RenderOptions()


def replace_latex_block(latex):
    # [units
    unit = None
    u_index = latex.find('[units')
    if u_index >= 0:

        end = latex.find(']', u_index)
        unit_specifier = latex[u_index:end+1]
        if unit_specifier.find('us') >= 0:
            unit = 'us'
        elif unit_specifier.find('metric') >= 0:
            unit = 'metric'
        latex = latex.replace(unit_specifier, "")

    if unit:
        return f'<p class="formula" v-show="{unit}_visible">{latex}</p>'
    else:
        return "<p class='formula'>" + latex + "</p>"

def definitions_table_data(table, path, filename, in_sections):    
    file = os.path.join(SOURCE_DIR, path, filename)
    if not os.path.isfile(file):
        print(
            f"Error - the table {table.title} refers to {file} which does not exist")
        return None

    with open(file, newline='', encoding='utf-8') as csvfile:
        csv_data = csv.reader(csvfile)
        page_sections = []
        columns = []
        headings = []
        acronym = []
        acronym_ids = []
        row_columns = []
        comment_idx=1
        section_idx=-1
        section=""
        index = {'sections': [], 'height': 200}
        orig_col_obj={'url': None, 'ref': None, 'type': None}
        for row in csv_data:
            if len(row[0]):
                section_idx=None
                section = row[0].split(" (")[0]
                columns = [row[i] for i,x in enumerate(row) if i != 0]
                try:
                    comment_idx = columns.index("Comment")
                except:
                    comment_idx = columns.index("")
                columns = columns[0:comment_idx]
                #Are there any columns that involve links
                col_link_data=[]
                #Go through each column and create an array of urls based on column index
                for i,x in enumerate(columns):
                    col_obj=copy.deepcopy(orig_col_obj)
                    col_data = columns[i].split("::")
                    if "::" in x:
                        col_obj['url']=col_data[1].strip()
                        col_obj['type']=col_data[0].strip()
                        col_link_data.append(col_obj)
                        columns[i] = col_data[0]
                    else:
                        # Push empty data
                        col_link_data.append(col_obj) 
                    if col_data[0] == "Section":
                        section_idx = i 
                headings = columns.copy()
                page_sections.append({'section':section, 'headings':headings, 'rows':[]}) 
                index['sections'].append(section)       
                continue
            datarow=row[1:comment_idx+1]
            if section:
                # Working in a section
                row_id = "0"
                section_link=""
                source_link=""
                num_columns=len(columns)
                source_links=[]
                source_links=['' for k in range(num_columns)]
                row_columns=[DefinitionColumn(d, datarow[i], '')
                              for i, d in enumerate(columns)]
                # Acronymn Link
                if "acronym" in section.lower():
                    acronym.append(datarow[1].lower())
                    acronym_ids.append(datarow[0])
                else:
                    try:
                        # Check for acronym link
                        indexes = [i for i, x in enumerate(acronym) if x in datarow[0].lower()]
                        row_id = acronym_ids[indexes[0]]
                    except:
                        row_id = "0"
                    # If there is a Section Index, then create a link to the navigation section
                    if section_idx and len(datarow[section_idx]):
                        section_link = definition_create_section_link(in_sections, datarow[section_idx])

                    # Go through each section_link_data array item, create a link if necessary
                    for i in range(num_columns):
                        if col_link_data[i]['url'] and len(datarow[columns.index(col_link_data[i]['type'])]):
                            # Create a link if there's data
                            # https://www.pumps.org/what-we-do/standards/?pumps-search-product=ANSI%2FHI+14.1-14.2&hi-order=asc&hi-order-by=name 
                            # Replace slashes with %2F, replace spaces with + and add &hi-order=asc&hi-order-by=name
                            search_str='+'.join(datarow[columns.index(col_link_data[i]['type'])].split())
                            search_str=search_str.replace('/','%2F')
                            search_str+='&hi-order=asc&hi-order-by=name'
                            source_links[i]=(col_link_data[i]['url'].replace("{{REF}}",search_str))
                        else:
                            # Replace all new lines with br
                            datarow[i]=datarow[i].replace('\n','<br>')    
                row_columns = [DefinitionColumn(columns[i], datarow[i], source_links[i])
                           for i in range(num_columns)]
                r = DefinitionRow(section, row[0], row_columns, row_id, section_link, source_link)
                page_sections[-1]['rows'].append(r)
        index['height']=len(index['sections'])*45
        return index, page_sections
    
def definition_create_section_link(sections, in_section):
    # Search the sections for the path
    if ":" in in_section:
        section_slug = in_section.split(": ")[0]
        child_slug = in_section.split(": ")[1]
    else:
        section_slug = None
        child_slug = in_section
    for obj in sections:
        if section_slug:
            if section_slug not in obj['metadata']['title']:
                continue
        for child in obj['children']:
            if 'title' in child['metadata'] and child_slug in child['metadata']['title']:
                section_link = f"/{obj['slug']}/{child['slug']}.html"
                return section_link
    return ""

def table_data(units, table, path, filename):
    file = os.path.join(SOURCE_DIR, path, filename)
    if not os.path.isfile(file):
        print(
            f"Error - the table {table.title} refers to {file} which does not exist")
        return None

    with open(file, newline='', encoding='utf-8') as csvfile:
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

def replace_definitions_block(dir, definitions_text, sections):
    definitions_table = parse_dict(definitions_text.strip().split("\n"))
    template = env.get_template('definitions.jinja')
    index, defs = definitions_table_data(definitions_table, dir, definitions_table['data'], sections)
    def_html = template.render(meta=definitions_table, table=defs, units='us', index=index)
    return def_html

def replace_table_block(dir, table_text):
    table = parse_dict(table_text.strip().split("\n"))

    data_us = ""
    data_metric = ""
    #Assume fixed if not noted
    if 'table_fixed_header' not in table or table['table_fixed_header'] == "true":
        table['table_fixed_header']="fixed"
    else:
       table['table_fixed_header']="not-fixed"
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
    all_tables.append(data_us)
 
    template = env.get_template('table.jinja')

    us = table_data('us', table, dir, data_us)
    metric = table_data('metric', table, dir, data_metric)

    us_html = template.render(meta=table, table=us)
    metric_html = template.render(meta=table, table=metric)
    if 'title' in table:
        return '<h3>'+table['title']+'</h3>'+us_html+metric_html
    return us_html+metric_html


def replace_table_block_pdf(dir, table_text):
    table = parse_dict(table_text.strip().split("\n"))

    data_us = ""
    data_metric = ""
    table['table_fixed_header']="not-fixed"
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

    template = env.get_template('table-pdf.jinja')

    us = table_data('us', table, dir, data_us)
    metric = table_data('metric', table, dir, data_metric)

    us_html = template.render(meta=table, table=us)
    metric_html = template.render(meta=table, table=metric)
    if 'title' in table:
        return '<h3>'+table['title']+'</h3>'+us_html #+metric_html
    return us_html  # +metric_html


def chart_data(units, chart, path, filename):
    file = os.path.join(SOURCE_DIR, path, filename)
    if not os.path.isfile(file):
        print(
            f"Error - the chart {chart.title} refers to {file} which does not exist")
        return None
    with open(file, newline='', encoding='utf-8') as csvfile:
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
        # Refactor!!! - the above is just reading a data table.. make it a common function

        series_cols = [int(col) for col in chart['series'].split(',')]
        series_title_index = 0
        if 'series_title_index' in chart:
            series_title_index = int(chart['series_title_index'])

        # we've already removed the extra column to the left
        x_axis = int(chart['x']) - 1
        x_data = [float(row.data[x_axis].data) for row in rows]
        x = ChartSeries(headings[series_title_index].data[x_axis].data, x_data)

        chart_series = []
        for series in series_cols:
            # we've already removed the extra column to the left
            data_col = int(series) - 1

            data = [float(row.data[data_col].data) for row in rows]
            series_title = [
                h.data for h in headings[series_title_index].data][data_col]
            chart_series.append(ChartSeries(series_title, data))

        # Refactor - actually, we probably don't need the Chart named tuple at all...
        chart = Chart(units, x, chart_series)
        chart_dict = dict()
        chart_dict['units'] = chart.units
        chart_dict['x'] = chart.x._asdict()
        chart_dict['series'] = [series._asdict() for series in chart.series]
        return chart_dict

def replace_demonstrator_block(output_path, dir, markdownProps):
    useMarkdown = markdownProps.strip().split("\n")
    init = parse_dict(useMarkdown)
    template = env.get_template('demo.jinja')
    key = str(uuid.uuid4())
    demoHtml = template.render(key=key, kind=init["kind"], init=json.dumps(init))

    return demoHtml

def replace_chart_block(output_path, dir, chart_text):
    chart = parse_dict(chart_text.strip().split("\n"))

    data_us = ""
    data_metric = ""

    if 'data' in chart:
        data_us = chart['data']
        data_metric = chart['data']
    elif 'data-us' in chart and 'data-metric' in chart:
        data_us = chart['data-us']
        data_metric = chart['data-metric']
    else:
        print(
            f"Error - the chart {chart.title} does not specify unit-agnostic source or us/metric sources.")
        return ""

    template = env.get_template('chart.jinja')

    us = chart_data('us', chart, dir, data_us)
    metric = chart_data('metric', chart, dir, data_metric)

    # Used by front end for unique identifier.
    key = str(uuid.uuid4())
    us_html = template.render(
        key=key, meta=chart, units='us', chart=json.dumps(us))
    metric_html = template.render(
        key=key, meta=chart, units='metric', chart=json.dumps(metric))
    return f"<div class='chart-title'>{chart['title']}</div>{us_html}{metric_html}"

# Needs refactor... the only difference from above is that we don't return both charts!


def replace_chart_block_pdf(output_path, dir, chart_text):
    chart = parse_dict(chart_text.strip().split("\n"))

    data_us = ""
    data_metric = ""

    if 'data' in chart:
        data_us = chart['data']
        data_metric = chart['data']
    elif 'data-us' in chart and 'data-metric' in chart:
        data_us = chart['data-us']
        data_metric = chart['data-metric']
    else:
        print(
            f"Error - the chart {chart.title} does not specify unit-agnostic source or us/metric sources.")
        return ""

    template = env.get_template('chart.jinja')

    us = chart_data('us', chart, dir, data_us)
    metric = chart_data('metric', chart, dir, data_metric)

    # Used by front end for unique identifier.
    key = str(uuid.uuid4())
    us_html = template.render(
        key=key, meta=chart, units='us', chart=json.dumps(us))
    # metric_html = template.render(
    #    key=key, meta=chart, units='metric', chart=json.dumps(metric))
    return f"<div class='chart-title'>{chart['title']}</div>{us_html}"


def replace_ad_block(chart_text):
    ad = parse_dict(chart_text.strip().split("\n"))
    template = env.get_template('ad.jinja')
    ad_html = template.render(ad=ad)
    return ad_html


def process_ad_blocks(markdown):
    delim = "=^="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + \
            replace_ad_block(within) + after
        start = markdown.find(delim)

    return markdown

# Ads are not in PDF, so just snip them out.


def process_add_blocks_pdf(markdown):
    delim = "=^="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + after
        start = markdown.find(delim)

    return markdown


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


def process_latex_blocks_pdf(markdown):
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


def process_definitions_block(dir, markdown, sections):
    delim = "=defs="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+len(delim):end]
        after = markdown[end+len(delim):]
        markdown = before + \
            replace_definitions_block(dir, within, sections) + after
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
        markdown = before + \
            replace_table_block(dir, within) + after
        start = markdown.find(delim)

    return markdown


def process_table_blocks_pdf(dir, markdown):
    delim = "=|="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + \
            replace_table_block_pdf(dir, within) + after
        start = markdown.find(delim)

    return markdown


def process_chart_blocks(output_path, dir, markdown):
    delim = "=/="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + \
            replace_chart_block(output_path, dir, within) + after
        start = markdown.find(delim)

    return markdown

def process_demonstrator_blocks(output_path, dir, markdown):
    delim = "=d="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        markdown = before + replace_demonstrator_block(output_path, dir, within) + after
        start = markdown.find(delim)

    return markdown


def process_chart_blocks_pdf(output_path, dir, markdown):
    global chart_count
    delim = "=/="
    start = markdown.find(delim)
    while (start >= 0):
        end = markdown.find(delim, start+1)
        before = markdown[:start]
        within = markdown[start+3:end]
        after = markdown[end+3:]
        chart_html = replace_chart_block_pdf(output_path, dir, within)
        chart_template = env.get_template('chart-wrapper.jinja')
        html = chart_template.render(content=chart_html, units='us', key='n')

        chart_count += 1
        chart_file = os.path.join(
            OUTPUT_DIR, 'charts', f"chart{chart_count}.html")
        with io.open(chart_file, 'w', encoding='utf8') as f:
            f.write(html)

        options = webdriver.ChromeOptions()
        options.add_argument('headless')
        browser = webdriver.Chrome(chrome_options=options)
        html_file = "file:///"+chart_file
        print(html_file)
        browser.get(html_file)

        img = browser.find_element_by_id('vue').screenshot_as_png
        browser.close()

        png_file = os.path.join(
            OUTPUT_DIR, 'charts', f"chart{chart_count}.png")
        with open(png_file, 'wb') as out_file:
            out_file.write(img)

        markdown = before + \
            f"<img src='build/charts/chart{chart_count}.png'/>" + after
        start = markdown.find(delim)

    return markdown


def process_vue_components(content):
    c = content.replace('<units', "<units :units='unit_set'")
    return c


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

    copyfile(os.path.join(STATICS_DIR, 'edb.pdf'),
             os.path.join(OUTPUT_DIR, 'statics', 'edb.pdf'))
    copyfile(os.path.join(STATICS_DIR, 'friction-loss-materials.json'),
             os.path.join(OUTPUT_DIR, 'statics', 'friction-loss-materials.json'))
    copyfile(os.path.join(STATICS_DIR, 'friction-loss-materials-full.json'),
             os.path.join(OUTPUT_DIR, 'statics', 'friction-loss-materials-full.json'))
    copyfile(os.path.join(STATICS_DIR, 'unit-conversions.json'),
             os.path.join(OUTPUT_DIR, 'statics', 'unit-conversions.json'))
    copyfile(os.path.join(STATICS_DIR, 'viscosity.json'),
             os.path.join(OUTPUT_DIR, 'statics', 'viscosity.json'))

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
    # REFACTOR THIS INTO A RENDERING CLASS INSTANCE TO AVOID GLOBALS
    global options
    print(f'Processing {node["name"]} at path {path}')
    
    sections = [dir for dir in graph if dir['directory'] == True]

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

    # tables and charts get exploded after markdown conversion - placing actual HTML in
    # the markdown causes some problems (not entirely sure why - looks like a bug
    # in the module perhaps...)
    content = process_table_blocks(node['path'], content)
    content = process_chart_blocks(path, node['path'], content)
    content = process_demonstrator_blocks(path, node['path'], content)
    content = process_definitions_block(node['path'], content, sections)
    content = process_ad_blocks(content)
    # Last step injects the Vue markup necessary for some components - such as <units> elements.
    content = process_vue_components(content)

    template = env.get_template('topic.jinja')
    related = [section['children'] for section in sections if section['path']
               == node['path'] and section['slug'] != node['slug']]
    # Related is a list of lists with the same section (it's always size 1)
    related = [item for sublist in related for item in sublist]
    # Related is not all topics under the same section, we need to filter out this node
    related = [topic for topic in related if topic['directory']
               != True and topic['name'] != node['name']]

    # print("======================================")
    # pprinter.pprint(related)

    # pprinter.pprint(node)
    html = template.render(section="", topic=slug, node=node,
                           content=content, sections=sections,
                           related=related, options=options)

    # Refactor - use minification only if not in "debug" mode... makes dev more difficult.
    with io.open(os.path.join(OUTPUT_DIR, path, slug+'.html'), 'w', encoding='utf8') as f:
        f.write(htmlmin.minify(
            html, remove_comments=True, remove_empty_space=True))
        # f.write(html.encode('utf-8'))


def make_root(graph):
    statics()

    nodes = [node for node in graph if node['directory'] == False or node['sort'] == '00']

    for node in nodes:
        so = None
        content_node = node
        # Create the index
        if node['sort'] == '00':
            for child in node['children']:
                if child['slug'] == 'home':
                    so = 'index'
                    content_node = child
                    break
        elif node['slug'] == 'home':
            so = 'index'
        print("Writing", content_node['name'], 'from ', content_node['path'])
        write_content(graph, content_node, so)


def make_section(graph, section, parent=None):
    print("Outputting into ", section['slug'])
    slug = section['slug']
    if parent:
        slug = os.path.join(parent['slug'], slug)
        print("MAKING SUBSECTION")
    directory = os.path.join(OUTPUT_DIR, slug)
    print("makedirs for " + directory)
    os.makedirs(directory)
    for topic in section['children']:
        if topic['directory']:
            print("Sub directories are currently unsupported.")
            make_section(graph, topic, section)
        else:
            print("Writing sub-contents",
                  topic['name'], "of", section['slug'])

            write_content(graph, topic, None, directory)


def rewrite_image_urls(content, path="."):
    delim = "![]"
    start = content.find(delim)
    while (start >= 0):
        end = content.find(" ", start+1)
        before = content[:start]
        after = content[end:]
        src = "![](./build/"+path+'/'+content[start+4:end]
        content = before + src + after
        start = content.find(delim, start+1)

    return content


def write_markdown_content(graph, node, md_file, slug_override=None, path="."):
    # global options
    print(f'Processing {node["name"]} at path {path}')

    # The static resources still need to get copied... but where?  Carefuly
    # using a single directory, because naming conflicts could present an issue...

    if node['copy_only'] == True:
        out = os.path.join(OUTPUT_DIR, path, node['name'])
        src = os.path.join(node['path'], node['name'])
        print(f' - Copied {node["name"]} as static resource.')
        copyfile(src, out)
        return

    # if slug_override:
    #    slug = slug_override
    # else:
    #    slug = node['slug']

    content = node['content']
    content = rewrite_image_urls(content, path)
    content = process_latex_blocks_pdf(content)
    # content = markdown.markdown(content)

    # tables and charts get exploded after markdown conversion - placing actual HTML in
    # the markdown causes some problems (not entirely sure why - looks like a bug
    # in the module perhaps...)
    content = process_table_blocks_pdf(node['path'], content)
    content = process_chart_blocks_pdf(path, node['path'], content)

    # Last step injects the Vue markup necessary for some components - such as <units> elements.
    # content = process_vue_components(content)

    # template = env.get_template('topic.jinja')
    # sections = [dir for dir in graph if dir['directory'] == True]
    # related = [section['children'] for section in sections if section['path']
    #           == node['path'] and section['slug'] != node['slug']]
    # Related is a list of lists with the same section (it's always size 1)
    # related = [item for sublist in related for item in sublist]
    # Related is not all topics under the same section, we need to filter out this node
    # related = [topic for topic in related if topic['name'] != node['name']]

    # print("======================================")
    # pprinter.pprint(related)

    # pprinter.pprint(node)
    # html = template.render(section="", topic=slug, node=node,
    #                       content=content, sections=sections,
    #                       related=related, options=options)

    # Refactor - use minification only if not in "debug" mode... makes dev more difficult.
    # with io.open(os.path.join(OUTPUT_DIR, path, slug+'.html'), 'w', encoding='utf8') as f:

    # f.write(html.encode('utf-8'))
    md_file.write("\n\n<h2>"+node['metadata']['title']+"</h2>\n\n<section>")

    html = markdown.markdown(content)
    # We want to downgrade all the headings in the actual section contents, because we already have h1, h2.
    html = html.replace("<h4>", "<h6>")
    html = html.replace("</h4>", "</h6>")
    html = html.replace("<h3>", "<h5>")
    html = html.replace("</h3>", "</h5>")
    html = html.replace("<h2>", "<h4>")
    html = html.replace("</h2>", "</h4>")
    html = html.replace("<h1>", "<h3>")
    html = html.replace("</h1>", "</h3>")
    md_file.write(html)  # was content
    md_file.write("</section>")


def make_markdown_section(graph, section, md_file, parent=None):
    print("Outputting Markdown into ", section['slug'])
    # directory = os.path.join(OUTPUT_DIR, section['slug'])
    # os.makedirs(directory)
    md_file.write("\n\n<h1>"+section['metadata']['title']+"</h1>")
    for topic in sorted(section['children'], key=lambda x: x['sort']):
        if topic['directory']:
            print("Sub directories are currently unsupported.")
        else:
            print("Writing markdown sub-contents",
                  topic['name'], "of", section['slug'])

            write_markdown_content(graph, topic, md_file,
                                   None, section['slug'])


def pdf(graph):
    md_file = os.path.join(OUTPUT_DIR, 'edb.html')

    nodes = [node for node in graph if node['directory'] == False or node['sort'] == '00']
    front_matter = None
    for node in nodes:
        so = None
        content_node = node
        # Create the index
        if node['sort'] == '00':
            for child in node['children']:
                if child['slug'] == 'home':
                    so = 'index'
                    content_node = child
                    break
        elif node['slug'] == 'home':
            so = 'index'
        if so == 'index':
            front_matter = content_node
            front_matter['metadata']['title'] = "HI Engineering Data Library"
            front_matter['children'] = []

    with io.open(md_file, 'w', encoding='utf8') as f:
        f.write('<!DOCTYPE html><html lang="en"><head></head><body>')
        f.write("\n\n<h1>"+node['metadata']['title']+"</h1>")
        write_markdown_content(graph, node, f,
                               None, node['slug'])
        for section in sorted([dir for dir in graph if dir['directory'] == True], key=lambda x: x['sort']):
            make_markdown_section(graph, section, f)
        f.write('</body></html>')

    print("HTML file saved to " + md_file)

    pdoc_args = ['--toc', '--chapters', '--latex-engine=xelatex',
                 '-V', 'geometry:margin=1.5cm']  # '--template', 'template.latex', '--variable=subparagraph',
    # print("Compiling markdown to HTML...")
    # output = pypandoc.convert_file(
    #    md_file, format='markdown_strict', to='html+markdown_in_html_blocks+raw_html', extra_args=pdoc_args, outputfile='edb.html')

    print("Compiling HTML to PDF...")
    output = pypandoc.convert_file(
        md_file, format='html+tex_math_dollars', to='pdf', extra_args=pdoc_args, outputfile='./generate/static/edb.pdf')


def html(graph, specials, production=False):
    print('Base directory:      ', BASE_DIR)
    print('Output directory:    ', OUTPUT_DIR)
    print('Template directory:  ', TEMPLATE_DIR)
    print('Statics directory:   ', STATICS_DIR)
    print('Source directory:    ', SOURCE_DIR)

    if production:
        options.minified = ".min"
    clean()
    make_specials(specials)
    os.makedirs(os.path.join(OUTPUT_DIR, "charts"))

    make_root(graph)
    for section in [dir for dir in graph if dir['directory'] == True]:
        make_section(graph, section)

    # Generate search json (haystack).
    # There will be one entry per topic (content)
    # ID:  full slug (url)
    # title:  Page title (as appears in search listings)
    # text: Page content
    # Fuse.js will search title and text, and use the ID to identify topics.
    # After search, the search results will be populated with the title/slug combo
    # to render.

    Topic = namedtuple('Topic', 'path slug title text section')
    haystack = list()

    for section in [dir for dir in graph if dir['directory'] == True]:
        for topic in [child for child in section['children'] if child['is_topic']]:
            haystack.append(Topic(
                f"/{ section['slug'] }/{ topic['slug'] }", topic['slug'], topic['metadata']['title'], topic['content'], section['metadata']['title']))

    with open(os.path.join(OUTPUT_DIR, 'statics',  'haystack.json'), 'w') as outfile:
        json.dump([t._asdict() for t in haystack], outfile)

    sitemap = list()
    for section in [dir for dir in graph if dir['directory'] == True]:
        for topic in [child for child in section['children'] if child['is_topic']]:
            url = dict()
            url['loc'] = f"/{ section['slug'] }/{ topic['slug'] }"
            url['lastmod'] = date.today()
            url['changefreq'] = 'monthly'
            url['priority'] = '0.8'
            sitemap.append(url)

    base_url = 'https://edb.pumps.org'
    xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for s in sitemap:
        xml += f"<url><loc>{base_url}/{s['loc']}</loc><lastmod>{s['lastmod']}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>"
    xml += "</urlset>"

    robots = 'Sitemap: https://edb.pumps.org/sitemap.xml '

    with io.open(os.path.join(OUTPUT_DIR, 'sitemap.xml'), 'w', encoding='utf8') as f:
        f.write(xml)
    with io.open(os.path.join(OUTPUT_DIR, 'robots.txt'), 'w', encoding='utf8') as f:
        f.write(robots)
        # f.write(html.encode('utf-8'))
    table_str="\n".join(all_tables)
    #print(f"TABLES: {table_str}")
