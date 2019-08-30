import os
from openpyxl import load_workbook
import json

unit_files = [f for f in os.listdir('.') if f.endswith(".xlsx")]
units = []
for unit_file in unit_files:
    wb = load_workbook(f'./{unit_file}')
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

with open('../../generate/static/unit-conversions.json', 'w') as fp:
    json.dump(units, fp)
