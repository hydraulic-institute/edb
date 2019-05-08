import os

META_DELIM = "-----"
BASE_DIR = os.path.split(os.path.realpath(__file__))[0]


def build_content_graph():
    # Walks the source directory and creates
    # a graph, where each node is the content
    # of the page / directory
    BASE_DIR = os.path.split(os.path.realpath(__file__))[0]

    rootDir = os.path.join(BASE_DIR, "..", "./source")
    graph = []
    meta = None
    for dirName, subdirList, fileList in os.walk(rootDir):
        # don't process root,
        if not dirName.endswith('./source'):
            meta = make_directory_node(dirName)
            graph.append(meta)

        for fname in fileList:
            if fname.endswith(".md") and fname != 'index.md':
                node = make_page_node(dirName, fname)
                # If meta is not None, then this content is under a sub-directory
                # Otherwise, it's top level content (i.e. content.md)
                if meta != None:
                    meta['children'].append(node)
                elif fname.endswith(".md"):
                    graph.append(node)
    print("------------------------------------")
    print([n['slug'] for n in graph])
    print("------------------------------------")
    return graph


def make_directory_node(dirName):
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
        "path": dirName,
        "metadata": read_metadata(dirName+"/index.md"),
        "directory": True,
        "children": []
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
        "content": read_page_content(metadata, filename)
    }


def read_metadata(file):
    with open(file, "r") as content_file:
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
    metadata = dict()

    def insert_metadata_entry(line):
        try:
            name = line.split(":")[0].strip()
            value = line.split(":")[1].strip()
        except:
            print("Error processing", file, "metadata block has malformed entry")
            print("\t", line)
            return None
        metadata[name] = value
        return (name, value)

    tuples = [insert_metadata_entry(l)
              for l in metadata_lines]
    metadata['meta_start'] = meta_start
    metadata['meta_end'] = meta_end

    return metadata


def read_page_content(meta, file):
    with open(file, "r") as content_file:
        data = content_file.readlines()
    return "".join(data[meta['meta_end']+1:])
