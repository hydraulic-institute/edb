def parse_dict(lines):
    metadata = dict()

    def insert_metadata_entry(line):
        try:
            name = line.split(":")[0].strip()
            value = ":".join(line.split(":")[1:]).strip()
        except:
            print("Error processing data block, has malformed entry")
            print(lines)
            print("\t Error on line:  ", line)
            return None
        metadata[name] = value
        return (name, value)

    tuples = [insert_metadata_entry(l)
              for l in lines]
    return metadata
