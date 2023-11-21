import math
import pandas as pd
from pandas import ExcelFile
from collections import namedtuple
import pprint
import json
import csv
pp = pprint.PrettyPrinter(indent=4)

Piping = namedtuple(
    'Piping', 'material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description')

# kdf = pd.read_excel(
#     'kb/friction-loss/Section IV - Piping Materials.xlsx', sheet_name="Pipe-Tube Data", dtype='str', header=3)
#
kdf = pd.read_csv(
    'kb/friction-loss/Section IV - Pipe-Tube Data.csv',dtype='str',header=3)

Category = namedtuple(
    'Category', 'div grp_name sub_div sub_div_name')

ALPHA_COL_NAMES = list(map(chr, range(ord('A'), ord('Z')+1)))

def isNan(num):
    return num != num

def getHeader(df):
    heading_data={}
    for col in df.columns:
        heading_data[col]=col
    return heading_data

def updateDataForCsv(df):
    """Add headings and column for data tables at the END"""
    header_size = 2
    out_data={}
    # deep copy DF
    df_copy = df.copy(True)
    for col in df_copy.columns:
        out_data[col]=COL_TYPES[col]

    header_array = []
    new_row = pd.DataFrame(getHeader(df_copy),index =[0])
    df_copy = pd.concat([new_row, df_copy]).reset_index(drop = True)
    new_row = pd.DataFrame(out_data, index=[0])
    df_copy = pd.concat([new_row, df_copy]).reset_index(drop = True)
    header_array = ['','heading']
    # insert col
    col_data = header_array + (['data'] * (df_copy.shape[0] - header_size))
    df_copy.insert(loc=0, column='A', value=col_data)
    df_copy.columns = ALPHA_COL_NAMES[:df_copy.shape[1]]
    return df_copy

# Go through each material for each Group and generate the kb/friction-loss/piping-losses/*.csv files
# Generate the data table files for the source/04_piping-materials-IV/table-data folder
groups = kdf['Group Name'].unique()
print('Groups: '+groups)
ALL_COLUMNS = kdf.columns
COL_TYPES = dict()
for col in ALL_COLUMNS:
    COL_TYPES[col] = 'numeric'
    if col in ['EDB Section','Section Name','Group','Group Name','Sub-Division','Sub-Division Name','Standard\nX-Strong\nXX-Strong','Pipe Schedule','Form','Type']:
        COL_TYPES[col] = 'string'
pipes = []
for grp in groups:
    print('Working on Group: '+grp)
    grp_data = kdf.loc[kdf['Group Name'] == grp]
    categories = grp_data['Sub-Division Name'].unique() 
    grp_filename = grp_data['Group Name'][grp_data.index[0]].lower().replace('-','')    
    # take first chars of each word
    parts = grp_filename.split(' ')
    base_filename=''
    sep_part=''
    for idx, part  in enumerate(parts):
        base_filename+=sep_part+part[0:1]
    print('Categories: '+categories)
    out_data = None
    for col in categories:
        print('Working on: '+col)
        data = kdf.loc[kdf['Sub-Division Name'] == col].copy(True)
        # Get rid of all columns without data
        #data = data.dropna(axis = 1, how = 'all')
        columns = data.columns
        # Create the file name from the 'Group Name'
        sub_filename = data['Sub-Division Name'][data.index[0]].lower().replace('-','')
        parts = sub_filename.split(' ')
        outfilename=base_filename+'_'
        sep_part=''
        for idx, part  in enumerate(parts):
            outfilename+=sep_part+part[0:4]
            sep_part='-'
        ref_col = columns.get_loc('Nominal Composition, Nickel, percent') + 1
        out_data = data.copy(True)
        out_data.drop(columns=data.columns[ref_col:],axis='columns',inplace=True)
        out_data.drop(columns=out_data.columns[:6],axis='columns',inplace=True)
        out_data.dropna(axis = 'columns', how = 'all',inplace=True)

        # Table Filename 
        table_filename = f"source/04_piping-materials-IV/table-data/{outfilename}.csv" 
        outfilename = f'kb/friction-loss/piping-losses/{outfilename}'
  
        # For each Material, save the sub division data
        filename = ''
        for div in data['Sub-Division'].unique():
            filename = f'{outfilename}-{div}.csv'
            df_indexes = list(data[data['Sub-Division'] == div].index)
            df_copy = out_data.copy(True)
            df_copy = df_copy[df_copy.index.isin(df_indexes)]
            new_row = pd.DataFrame(getHeader(df_copy),index=[0])
            df_copy = pd.concat([new_row, df_copy]).reset_index(drop = True)
            print ("writing Sub Division Data to "+filename) 
            df_copy.to_csv(filename, header=False, index=False)

        # Weed out any Wall Thickness that are not values
        out_data.drop(out_data[(out_data['Wall Thickness\nin. Nom'] == '--') | 
                               (out_data['Wall Thickness\nin. Nom'] == '-') | 
                               (out_data['Wall Thickness\nin. Nom'] == 'c')].index, inplace=True)
       
        data.drop(data[(data['Wall Thickness\nin. Nom'] == '--') | 
                                (data['Wall Thickness\nin. Nom'] == '-') | 
                                (data['Wall Thickness\nin. Nom'] == 'c')].index, inplace=True)
        
        # Go through the data and generate the data for the json file & Friction Calculator
        # Get indexes for the items
        calc_indexes=dict()
        for sel in ['Nominal Size', 'Nominal Outside dia [in]', 'Internal Diameter in. Nom', 'Wall Thickness\nin. Nom', 'e\nAbsolute Roughness (ft)' ]:
            if sel in columns:
                name = sel.replace(' ','_',1)
                name = name.split(' ')[0]
                name = name.split('\n')[0]
                name = name.lower()
                calc_indexes[name]=columns.get_loc(sel)+1
        for row in data.itertuples():
            # Convert fraction to float
            num = row[calc_indexes['nominal_size']].strip().split('/')
            if len(num) > 1:
                nom = num[0].split()
                if len(nom) > 1:
                    whole = nom[0]
                    nom = nom[1]
                else:
                    nom = nom[0]
                    whole = '0'
                denom = num[1]
                nominal_size = str(float(whole) + (float(nom)/float(denom)))
            else:
                nominal_size = str(float(num[0]))
            selector = ''
            selector_desc = ''
            sep = ''
            # Create the selector String and selector description
            for sel_col in ['Standard\nX-Strong\nXX-Strong', 'Pipe Schedule', 'Wall Thickness\nin. Nom', 'THICKNESS/ PRESSURE CLASS']:
                if data[sel_col].any():
                    index = columns.get_loc(sel_col)+1
                    if str(row[index]) != 'nan' and len(row[index]):
                        #if "Wall Thickness" in columns[sel-1]:
                        #    selector+=sep+str(wall_thickness)
                        #else:
                        selector+=sep+str(row[index])
                        head, sp, tail = columns[index-1].partition('\n')
                        selector_desc+=sep+head
                        sep = ' / '
            if not len(selector):
                selector = 'NONE'
                selector_desc = 'NONE'
            # material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description'
            pipes.append(Piping(col, 
                                nominal_size,
                                row[calc_indexes['nominal_outside']],
                                row[calc_indexes['internal_diameter']],
                                row[calc_indexes['wall_thickness']],
                                row[calc_indexes['e']],
                                selector, selector_desc))


        # Collect the data for the Material Sub Division Name
        all_data = out_data.copy(True)
        print ("Writing CATEGORY data to "+table_filename) 
        # Insert rows/columns for table data csv
        all_data = updateDataForCsv(all_data)
        all_data.to_csv(table_filename, mode='w', header=False, index=False)
        
# Dump data into processed file
with open('kb/friction-loss/processed.csv', 'w') as out:
    csv_out = csv.writer(out)
    csv_out.writerow(('material', 'nominal_size', 'nominal_od', 'nominal_id',
                      'nominal_thickness', 'epsilon', 'selector_label', 'selector_value'))
    for p in pipes:
        if len(p.nominal_od):
            #if not math.isnan(p.nominal_od):
            csv_out.writerow((p.material, p.nominal_size, p.nominal_od, p.nominal_id,
                              p.nominal_thickness, p.epsilon, p.selector, p.selector_description))


# Create the data for the friction-loss-materials-full.json file
m = dict()

for pipe in pipes:
    if pipe.material not in m:
        m[pipe.material] = dict()
        m[pipe.material]['nominal_sizes'] = dict()
    if pipe.nominal_size not in m[pipe.material]['nominal_sizes']:
        m[pipe.material]['nominal_sizes'][pipe.nominal_size] = list()
    if pipe.selector != 'NONE': 
        m[pipe.material]['selector'] = pipe.selector_description
    entry = dict()
    entry['od'] = pipe.nominal_od
    entry['id'] = pipe.nominal_id
    entry['thickness'] = pipe.nominal_thickness
    entry['epsilon'] = pipe.epsilon
    if pipe.selector != 'NONE':
        entry['selector'] = pipe.selector
    m[pipe.material]['nominal_sizes'][pipe.nominal_size].append(entry)

with open('generate/static/friction-loss-materials-full.json', 'w') as fp:
    output=json.dumps(m, indent=4)
    fp.write(output)
