import subprocess
import shutil
import build


build.generate(False)
# subprocess.run([shutil.which('aws'), 's3', 'sync', '--acl',
#                 'public-read', '--delete', 'build', 's3://hi-edb-beta'])
