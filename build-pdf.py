from generate import graph
from generate import output
import os

SPECIAL_DIRS = ['javascript', 'images']


def generate(production):
    content_graph = graph.build_content_graph(SPECIAL_DIRS)
    output.pdf(content_graph)
    print("EDB PDF generated successfully.")


if __name__ == "__main__":
    generate(False)
