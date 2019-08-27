import math
import pandas as pd
from pandas import ExcelFile
from collections import namedtuple
import pprint
import json
pp = pprint.PrettyPrinter(indent=4)
df = pd.read_excel(
    'Section IV - Piping Materials - Revison to EDB.xlsx', sheet_name="Pipe-Tube Data")

Entry = namedtuple(
    'Entry', 'material nominal_size nominal_od schedule id epsilon')

r = 0
entries = []
for row in df.itertuples():
    # material (F)
    # nominal size (G)
    # nominal outside diameter (H)
    # schedule (N)
    # inside diameter
    # (AB) epsilon

    if r > 1 and not math.isnan(float(row[28])) and not math.isnan(float(row[23])) and str(row[14]) != "nan":
        entries.append(Entry(row[6], row[7], row[8],
                             row[14], row[23], row[28]))

    r = r + 1

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

with open('../../generate/static/friction-loss-materials.json', 'w') as fp:
    json.dump(materials, fp)
