import subprocess

def get_current_git_branch_and_hash():
    """
    Retrieves the name of the current Git branch using subprocess.
    """
    try:
        branch_name = subprocess.check_output(
            ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
            stderr=subprocess.STDOUT,
            text=True
        ).strip()
        repo_home = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'],
            stderr=subprocess.STDOUT,
            text=True
        ).strip().rsplit('.', 1)[0]
        commit_hash = subprocess.check_output(
            ['git', 'rev-parse', 'HEAD'],
            stderr=subprocess.STDOUT,
            text=True
        ).strip()
        if commit_hash:
            commit_hash = commit_hash[:7]
        return {'branch': branch_name, 'repo': repo_home, 'hash':commit_hash}
    except subprocess.CalledProcessError as e:
        print(f"Error: Command failed with return code {e.returncode}")
        print(f"Output: {e.output}")
        return {}
    except FileNotFoundError:
        print("Error: 'git' executable not found. Ensure Git is installed and in your PATH.")
        return {}

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
