import subprocess
import build


build.generate(True)
subprocess.run(['aws', 's3', 'sync', '--acl',
                'public-read', '--delete', './build', 's3://hi-edb-beta'])
