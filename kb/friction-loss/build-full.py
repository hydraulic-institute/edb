import pandas as pd
from collections import namedtuple
import pprint
import json
import csv
pp = pprint.PrettyPrinter(indent=4)

Piping = namedtuple(
    'Piping', 'material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description')

df = pd.read_csv( 'kb/friction-loss/Section IV - Pipe-Tube Data.csv',dtype='str',header=3)

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

# Get rid of all columns that are not to be shown
# df.stack() collects all rows and columns with data
# row 0 has the "include" data in it, so drop that
new_data=df[list(df.stack()[0].index)].drop(0).copy(True)

# Go through each material for each Group and generate the kb/friction-loss/piping-losses/*.csv files
# Generate the data table files for the source/04_piping-materials-IV/table-data folder
groups = new_data['Group Name'].unique()
print('Groups: '+groups)
ALL_COLUMNS = new_data.columns
COL_TYPES = dict()
for col in ALL_COLUMNS:
    COL_TYPES[col] = 'numeric'
    if col in ['EDB Section','Section Name','Group','Group Name','Sub-Division','Sub-Division Name','Identification','Form','Type']:
        COL_TYPES[col] = 'text'
# Special case for Plastic Pipe
COL_TYPES['Minimum Thickness, inches'] = 'numeric'
pipes = []
for grp in groups:
    print('Working on Group: '+grp)
    grp_data = new_data.loc[new_data['Group Name'] == grp]
    categories = grp_data['Sub-Division Name'].unique() 
    # Get the group filename - clean out dashes and clean up spaces
    grp_filename = ' '.join(grp_data['Group Name'][grp_data.index[0]].lower().replace('-','').split()).strip()
    # take first chars of each word
    parts = grp_filename.split(' ')
    base_filename=''
    sep_part=''
    for idx, part in enumerate(parts):
        base_filename+=sep_part+part[0:1]
    print('Categories: '+categories)
    out_data = None
    for col in categories:
        # Clean up many spaces
        col_name = " ".join(col.split()).strip()
        print('Working on: '+col_name)
        if not isNan(grp_data['STANDARD 1'][grp_data.index[0]]) and len(grp_data['STANDARD 1'][grp_data.index[0]]):
            standard = f" per {grp_data['STANDARD 1'][grp_data.index[0]].strip()}"
        else:
            standard = ''
        #col_name = col_name.replace("(","")
        data = new_data.loc[new_data['Sub-Division Name'] == col].copy(True)
        # Get rid of all columns without data
        #data = data.dropna(axis = 1, how = 'all')
        columns = data.columns
        # Create the file name from the 'Sub-Division Name'
        sub_filename = ' '.join(data['Sub-Division Name'][data.index[0]].lower().replace('-','').split()).strip()
        parts = sub_filename.split(' ')
        outfilename=base_filename+'-'
        sep_part=''
        for idx, part in enumerate(parts):
            if len(part.strip()):
                outfilename+=sep_part+part[0:4]
            sep_part='_'
        outfilename=outfilename.replace('(','').replace(')','')
        out_data = data.copy(True)
        out_data.drop(columns=out_data.columns[:(ALL_COLUMNS.to_list().index('Sub-Division Name')+1)],axis='columns',inplace=True)
        #out_data.drop(columns=['STANDARD 1'],axis='columns',inplace=True)
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
            df_copy.drop(columns=['STANDARD 1'],axis='columns',inplace=True)
            df_copy = df_copy[df_copy.index.isin(df_indexes)]
            new_row = pd.DataFrame(getHeader(df_copy),index=[0])
            df_copy = pd.concat([new_row, df_copy]).reset_index(drop = True)
            print ("writing Sub Division Data to "+filename) 
            df_copy = df_copy.fillna('')
            df_copy.to_csv(filename, header=False, index=False)
            
        # Add the standard to the column name
        if not isNan(out_data['STANDARD 1'][out_data.index[0]]) and len(out_data['STANDARD 1'][out_data.index[0]]):
            col_name = col_name + f" per {out_data['STANDARD 1'][out_data.index[0]].strip()}"
        else:
            col_name = col_name + standard
        out_data.drop(columns=['STANDARD 1'],axis='columns',inplace=True)
           
        # Weed out any Wall Thickness that are not values
        if 'Wall Thickness, inches' in out_data.keys():
            out_data.drop(out_data[(out_data['Wall Thickness, inches'] == '--') | 
                                (out_data['Wall Thickness, inches'] == '-') | 
                                (out_data['Wall Thickness, inches'] == 'c')].index, inplace=True)
        
            data.drop(data[(data['Wall Thickness, inches'] == '--') | 
                                    (data['Wall Thickness, inches'] == '-') | 
                                    (data['Wall Thickness, inches'] == 'c')].index, inplace=True)
            
        # Go through the data and generate the data for the json file & Friction Calculator
        # Get indexes for the items
        calc_indexes=dict()
        for sel in ['Nominal Size', 'Outside Diameter, inches', 'Internal Diameter, inches', 'Wall Thickness, inches', 'e, Absolute Roughness, feet' ]:
            if sel in columns:
                name = sel.replace(' ','_',1)
                name = name.split(' ')[0]
                name = name.split(',')[0]
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
            for sel_col in ['Identification', 'Pipe Schedule', 'Wall Thickness, inches', 'Pressure Class']:
                if data[sel_col].any():
                    index = columns.get_loc(sel_col)+1
                    if str(row[index]) != 'nan' and len(row[index]):
                        row_str = str(row[index])
                    else:
                        row_str = '-'
                    selector+=sep+row_str
                    head, sp, tail = columns[index-1].partition('\n')
                    selector_desc+=sep+head.split(',')[0]
                    sep = ' / '
            if not len(selector):
                selector = 'NONE'
                selector_desc = 'NONE'
            # Special case for Plastic Pipe
            if 'Plastic' in col_name and "Wall" in selector_desc:
                selector_desc = selector_desc.replace("Wall","Minimum")
            
            # material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description'
            pipes.append(Piping(col_name, 
                                nominal_size,
                                row[calc_indexes['outside_diameter']],
                                row[calc_indexes['internal_diameter']],
                                row[calc_indexes['wall_thickness']],
                                row[calc_indexes['e']],
                                selector, selector_desc))


        # Special case for Plastic Pipe
        if "Plastic" in col_name and "Wall Thickness, inches" in out_data.columns:
            out_data.rename(columns={"Wall Thickness, inches":"Minimum Thickness, inches"},inplace=True)
            
        # Collect the data for the Material Sub Division Name
        all_data = out_data.copy(True)
        print ("Writing CATEGORY ["+col+"] data to "+table_filename) 
        # Insert rows/columns for table data csv
        all_data = updateDataForCsv(all_data)
        all_data = all_data.fillna('')
        all_data.to_csv(table_filename,header=False, index=False)
        
# Dump data into processed file
with open('kb/friction-loss/processed.csv', 'w') as out:
    csv_out = csv.writer(out)
    csv_out.writerow(('material', 'nominal_size', 'nominal_od', 'nominal_id',
                      'nominal_thickness', 'epsilon', 'selector_label', 'selector_value'))
    for p in pipes:
        if not isNan(p.nominal_od) and len(p.nominal_od):
            #if not math.isnan(p.nominal_od):
            csv_out.writerow((p.material, p.nominal_size, p.nominal_od, p.nominal_id,
                              p.nominal_thickness, p.epsilon, p.selector, p.selector_description))


# Create the data for the friction-loss-materials-full.json file
m = dict()

for pipe in pipes:
    if pipe.material not in m:
        m[pipe.material] = dict()
        m[pipe.material]['nominal_sizes'] = dict()
        m[pipe.material]['selector'] = ''
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
    # Avoid duplicate entries for a nominal size
    if entry not in m[pipe.material]['nominal_sizes'][pipe.nominal_size]:
        m[pipe.material]['nominal_sizes'][pipe.nominal_size].append(entry)

with open('generate/static/friction-loss-materials-full.json', 'w') as fp:
    output=json.dumps(m, indent=4)
    fp.write(output)
