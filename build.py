from generate import graph
from generate import output
import os


def generate():
    content_graph = graph.build_content_graph()
    output.html(content_graph)
    print("EDB generated successfully.")


if __name__ == "__main__":
    generate()
