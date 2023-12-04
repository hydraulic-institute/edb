import os
from openpyxl import load_workbook
import json

root_dir = '../..'
dir_path = '.'
# DEBUG
# dir_path = f'{dir_path}/kb/unit-converter'
unit_files = [f for f in os.listdir(dir_path) if f.endswith(".xlsx")]
units = []
for unit_file in unit_files:
    wb = load_workbook(f'{dir_path}/{unit_file}')
    sheet = wb.get_sheet_by_name('Sheet1')
    measure = sheet['B1'].value
    decimals = sheet['B2'].value
    image = sheet['B3'].value
    unit = dict()
    unit['measure'] = measure
    unit['decimals'] = decimals
    unit['image'] = image
    unit['units'] = []
    print(measure)
    print(decimals)
    print(image)
    row = 6
    label = sheet.cell(row=row, column=1).value
    factor = sheet.cell(row=row, column=2).value
    while (label is not None):
        u = dict()
        u['label'] = label
        u['factor'] = factor
        unit['units'].append(u)
        print(label, factor)
        row += 1
        label = sheet.cell(row=row, column=1).value
        factor = sheet.cell(row=row, column=2).value
    units.append(unit)

with open(f'{root_dir}/generate/static/unit-conversions.json', 'w') as fp:
    output=json.dumps(units, indent=4)
    fp.write(output)
