from generate import graph
from generate import output
import os

SPECIAL_DIRS = ['javascript', 'images']


def generate():
    content_graph = graph.build_content_graph(SPECIAL_DIRS)
    output.html(content_graph, SPECIAL_DIRS)
    print("EDB generated successfully.")


if __name__ == "__main__":
    generate()
