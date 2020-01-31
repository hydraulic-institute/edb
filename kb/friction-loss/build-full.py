import math
import pandas as pd
from pandas import ExcelFile
from collections import namedtuple
import pprint
import json
import csv
pp = pprint.PrettyPrinter(indent=4)

Piping = namedtuple(
    'Piping', 'filename material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description')
Pipe = namedtuple(
    'Pipe', 'material nominal_size nominal_od nominal_id nominal_thickness epsilon selector_label selector_value')

df = pd.read_excel(
    'piping-losses/FrictionLossTemplate.xlsx', sheet_name="Sheet1")


def COL_INDEX(column):
    # Rows are exposed such that A is index 1, not 0 - which is why - is first.
    cols = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M']
    return cols.index(column)


def MERGE(row, cols):
    columns = cols.split('+')
    vals = []
    for c in columns:
        value = str(row[COL_INDEX(c)])
        if value and value != 'nan':
            vals.append(str(value))
    return " / ".join(vals)


r = 0
piping = []
for row in df.itertuples():
    piping.append(Piping(f'piping-losses/{row[1]}.csv', row[2], row[3],
                         row[4], row[5], row[6],
                         row[7], row[8], row[9]))
    r = r + 1

pipes = []
for pipe in piping:
    r = 0
    with open(pipe.filename) as pipe_csv:
        csvReader = csv.reader(pipe_csv)
        print(pipe.filename)
        for row in csvReader:
            if r > 1:
                material = pipe.material
                nominal_size = float(row[COL_INDEX(pipe.nominal_size)])
                nominal_od = float(row[COL_INDEX(pipe.nominal_od)])
                nominal_thickness = float(
                    row[COL_INDEX(pipe.nominal_thickness)])
                epsilon = float(row[COL_INDEX(pipe.epsilon)])
                if pipe.nominal_id == "CALCULATE":
                    nominal_id = nominal_od - 2 * nominal_thickness
                else:
                    nominal_id = float(row[COL_INDEX(pipe.nominal_id)])
                if (pipe.selector == "NONE"):
                    selector_label = None
                    selector_value = None
                else:
                    selector_label = pipe.selector_description
                    selector_value = MERGE(row, pipe.selector)
                pipes.append(Pipe(material, nominal_size, nominal_od, nominal_id,
                                  nominal_thickness, epsilon, selector_label, selector_value))
            r = r + 1


with open('processed.csv', 'w') as out:
    csv_out = csv.writer(out)
    csv_out.writerow(('material', 'nominal_size', 'nominal_od', 'nominal_id',
                      'nominal_thickness', 'epsilon', 'selector_label', 'selector_value'))
    for p in pipes:
        if not math.isnan(p.nominal_od):
            csv_out.writerow((p.material, p.nominal_size, p.nominal_od, p.nominal_id,
                              p.nominal_thickness, p.epsilon, p.selector_label, p.selector_value))


materials = dict()

for piping_material in piping:
    m = dict()
    m['nominal_sizes'] = dict()
    if piping_material.selector != 'NONE':
        m['selector'] = piping_material.selector_description
    # build list of available nominal sizes
    for pipe in [p for p in pipes if p.material == piping_material.material]:
        if pipe.nominal_size not in m['nominal_sizes']:
            m['nominal_sizes'][pipe.nominal_size] = list()
        entry = dict()
        entry['od'] = pipe.nominal_od
        entry['id'] = pipe.nominal_id
        entry['thickness'] = pipe.nominal_thickness
        entry['epsilon'] = pipe.epsilon
        if piping_material.selector != 'NONE':
            entry['selector'] = pipe.selector_value
        m['nominal_sizes'][pipe.nominal_size].append(entry)

    materials[piping_material.material] = m

with open('../../generate/static/friction-loss-materials-full.json', 'w') as fp:
    json.dump(materials, fp)
