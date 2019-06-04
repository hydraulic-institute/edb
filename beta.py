import subprocess
import shutil
import build


build.generate(True)
subprocess.run([shutil.which('aws'), 's3', 'sync', '--acl',
                'public-read', '--delete', 'build', 's3://hi-edb-beta'])
