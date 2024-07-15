import os
from openpyxl import load_workbook
import json

dir_path = 'kb/unit-converter'
unit_files = [f for f in os.listdir(dir_path) if f.endswith(".xlsx")]
units = []
for unit_file in unit_files:
    wb = load_workbook(f'{dir_path}/{unit_file}')
    sheet = wb['Sheet1']
    measure = sheet['B1'].value
    decimals = sheet['B2'].value
    image = sheet['B3'].value
    if 'Default' in sheet['A4'].value:
        default_to = sheet['B4'].value
    else:
        default_to = 0
    unit = dict()
    unit['measure'] = measure
    unit['decimals'] = decimals
    unit['image'] = image
    unit['has_descriptions'] = False
    unit['units'] = []
    print(measure)
    print(decimals)
    print(image)
    row = 6
    if default_to > 0:
        row = 7
    label = sheet.cell(row=row, column=1).value
    factor = sheet.cell(row=row, column=2).value
    description = sheet.cell(row=row, column=3).value
    while (label is not None):
        u = dict()
        u['label'] = label
        u['factor'] = factor
        u['description'] = description
        if row == default_to:
            unit['default_to'] = u
        unit['units'].append(u)
        print(label, factor)
        row += 1
        label = sheet.cell(row=row, column=1).value
        factor = sheet.cell(row=row, column=2).value
        description = sheet.cell(row=row, column=3).value
    units.append(unit)

with open('generate/static/unit-conversions.json', 'w') as fp:
    output=json.dumps(units, indent=4)
    fp.write(output)
