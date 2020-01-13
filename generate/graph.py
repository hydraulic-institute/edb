import os
import io
from .common import parse_dict

META_DELIM = "-----"
BASE_DIR = os.path.split(os.path.realpath(__file__))[0]


def build_content_graph(specials):
    # Walks the source directory and creates
    # a graph, where each node is the content
    # of the page / directory
    BASE_DIR = os.path.split(os.path.realpath(__file__))[0]

    rootDir = os.path.join(BASE_DIR, "..", "./source")
    graph = []
    meta = None
    sub_sections = []
    for dirName, subdirList, fileList in os.walk(rootDir):
        # Special folders are dealt with separately, they are not
        # part of the content graph.
        if len([special for special in specials if dirName.endswith(special)]) > 0:
            continue

        # don't process root,
        if not dirName.endswith('./source'):
            meta = make_directory_node(dirName)
            graph.append(meta)

            for sub in subdirList:
                print("---------------------")
                print("Sub directory = [" + sub + "] in " + dirName)
                smeta = make_directory_node(sub, dirName, meta)
                meta['children'].append(smeta)
                sub_sections.append({
                    "path": os.path.join(dirName, sub),
                    "node": smeta})

        for fname in fileList:
            print("Compiling " + fname + ", " + dirName)

            if fname.endswith(".md") and fname != 'index.md':
                print(" - Markdown (non-index)")
                node = make_page_node(dirName, fname)
            elif not fname.endswith(".md"):
                # This isn't markdown, check if it is in the static extension list.
                print(" - Resource Node")
                node = make_resource_node(dirName, fname)
            elif fname.endswith(".md") and meta == None:
                print(" - Processing root home page")
                node = make_page_node(dirName, fname)
            else:
                # Index.md in a sub-directory - does not get processed further.
                continue

            # If meta is not None, then this content is under a sub-directory
            # Otherwise, it's top level content (i.e. content.md)
            if meta != None:
                meta['children'].append(node)
                print(" - Adding ", node['slug'], "as child node of ", dirName)
            elif fname.endswith(".md"):
                print(" - Adding directly to graph root.")
                graph.append(node)

    print("------------------------------------")
    print("Loaded", [n['slug'] for n in graph])
    print("------------------------------------")

    print(sub_sections)

    # Now post process... find the nodes at the top level that actually should be inside a sub_section
    for topic in graph:
        if 'children' in topic:
            for node in topic['children']:
                sub_section_paths = [s['path'] for s in sub_sections]

                if (node["path"] in sub_section_paths):
                    if node["directory"] != True:
                        print("SUB -> " + node["path"])
                        ind = sub_section_paths.index(node["path"])
                        sub = sub_sections[ind]["node"]
                        sub['children'].append(node)
                        topic['children'].remove(node)
                        # this node needs to be removed from this topic, and added
                        # to the subsection topic.
                        print(node)
    for topic in graph:
        if 'children' in topic:
            if len(topic['children']) < 1:
                graph.remove(topic)
    return graph


def make_directory_node(dirName, parentDir=None, parentNode=None):

    path = dirName
    if parentDir:
        path = os.path.join(parentDir, dirName)

    name = os.path.split(dirName)
    try:
        sort = name[1].split("_")[0]
        slug = name[1].split("_")[1]
    except:
        print("ERROR:  The directory", dirName, "has an invalid name")
        return None

    return {
        "sort": sort,
        "slug": slug,
        "path": path,
        "metadata": read_metadata(path+"/index.md"),
        "directory": True,
        "children": [],
        "copy_only": False,
        "is_topic": False,
        "parent": parentNode
    }


def make_resource_node(dirName, fname):
    try:
        sort = fname.split("_")[0]
        slug = fname.split("_")[1].split(".")[0]
    except:
        sort = ""
        slug = fname.split(".")[0]

    filename = dirName+"/"+fname
    return {
        "sort": sort,
        "slug": slug,
        "path": dirName,
        "name": fname,
        "metadata": dict(),
        "directory": False,
        "copy_only": True,
        "is_topic": False
    }


def make_page_node(dirName, fname):
    try:
        sort = fname.split("_")[0]
        slug = fname.split("_")[1].split(".")[0]
    except:
        sort = ""
        slug = fname.split(".")[0]

    filename = dirName+"/"+fname
    metadata = read_metadata(filename)
    return {
        "sort": sort,
        "slug": slug,
        "path": dirName,
        "name": fname,
        "metadata": metadata,
        "directory": False,
        "content": read_page_content(metadata, filename),
        "copy_only": False,
        "is_topic": True
    }


def read_metadata(file):
    with io.open(file, 'r', encoding='utf8') as content_file:
        data = content_file.read().splitlines()

    try:
        meta_start = data.index(META_DELIM)
    except:
        print("Error,", file, "does not contain a metadata block.")
        return None

    try:
        meta_end = data.index(META_DELIM, meta_start+1)
    except:
        print("Error,", file,
              "contains metadata block start, but block is not terminated")
        return None

    metadata_lines = data[meta_start+1: meta_end]
    metadata = parse_dict(metadata_lines)
    metadata['meta_start'] = meta_start
    metadata['meta_end'] = meta_end

    return metadata


def read_page_content(meta, file):
    with io.open(file, 'r', encoding='utf8') as content_file:
        data = content_file.readlines()
    return "".join(data[meta['meta_end']+1:])
