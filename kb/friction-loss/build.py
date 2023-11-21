import math
import pandas as pd
from collections import namedtuple
import json

header_row=3
# DEBUG
df = pd.read_excel('kb/friction-loss/Section IV - Piping Materials.xlsx', sheet_name="Pipe-Tube Data",header=header_row)
# df = pd.read_excel('Section IV - Piping Materials.xlsx', sheet_name="Pipe-Tube Data",header=header_row)

Entry = namedtuple(
    'Entry', 'type material nominal_size nominal_od schedule id epsilon')

r = header_row+1
entries = []
    # Piping:
      # material (F) - 6
      # nominal size (G) - 7
      # nominal outside diameter (H) - 8
      # schedule (N) - 14
      # inside diameter (X) - 24
      # (AC) epsilon - 29
piping_cols={'material':6,'nom_size':7,'nom_outside_diam':8,'schedule':14,'inside_diameter':24,'epsilon':29}

for row in df.itertuples():
    r += 1
    try:
        if not math.isnan(float(row[piping_cols['epsilon']])) and \
            not math.isnan(float(row[piping_cols['inside_diameter']])) and \
            str(row[piping_cols['schedule']]) != "nan":
            entries.append(Entry('Piping', row[piping_cols['material']], row[piping_cols['nom_size']], row[piping_cols['nom_outside_diam']],
                                row[piping_cols['schedule']], row[piping_cols['inside_diameter']], row[piping_cols['epsilon']]))

    except:
            print("ERROR ROW: ",r," - ",row[piping_cols['material']], row[piping_cols['nom_size']], row[piping_cols['nom_outside_diam']],
                                row[piping_cols['schedule']], row[piping_cols['inside_diameter']], row[piping_cols['epsilon']])

# print(entries)
materials = dict()
for entry in entries:
    if entry.material in materials:
        materials[entry.material]['entries'].append(entry)
    else:
        materials[entry.material] = {"entries": [entry]}

# print(materials)

for material in materials:
    m = materials[material]
    m['nominal_sizes'] = dict()
    for entry in m['entries']:
        if entry.nominal_size in m['nominal_sizes']:
            m['nominal_sizes'][entry.nominal_size]['entries'].append(entry)
        else:
            m['nominal_sizes'][entry.nominal_size] = {"entries": [entry]}
    del m['entries']
for material in materials:
    m = materials[material]
    print(material, len(m['nominal_sizes']))
    for size in m['nominal_sizes']:
        s = m['nominal_sizes'][size]
        s['schedules'] = dict()
        for entry in s['entries']:
            s['schedules'][entry.schedule] = entry

        del s['entries']

# DEBUG 
with open('generate/static/friction-loss-materials.json', 'w') as fp:
#with open('../../generate/static/friction-loss-materials.json', 'w') as fp:
    output=json.dumps(materials, indent=4)
    fp.write(output)

