from generate import graph
from generate import output
import os

SPECIAL_DIRS = ['javascript', 'images', 'table-data']
IGNORE_DIRS = ['table-data']
ROOT_SPECIAL_DIRS = 'root_specials'


def generate(production):
    content_graph = graph.build_content_graph(SPECIAL_DIRS)
    output.html(content_graph, SPECIAL_DIRS, IGNORE_DIRS, ROOT_SPECIAL_DIRS, production)
    print("EDB generated successfully.")


if __name__ == "__main__":
    generate(False)
