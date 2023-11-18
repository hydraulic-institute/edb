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

# df = pd.read_excel(
#    'kb/friction-loss/piping-losses/FrictionLossTemplate.xlsx', sheet_name="Sheet1")

kdf = pd.read_excel(
    'kb/friction-loss/Section IV - Piping Materials.xlsx', sheet_name="Pipe-Tube Data",header=3)

Category = namedtuple(
    'Category', 'div grp_name sub_div sub_div_name')

COL_NAMES = list(map(chr, range(ord('A'), ord('Z')+1)))
def isNan(num):
    return num != num

def updateDataForCsv(df):
    out_data={}
    heading_data={}
    for col in df.columns:
        out_data[col]='numeric'
        if col in ['Standard\nX-Strong\nXX-Strong','Pipe Schedule','Form','Type']:
            out_data[col]='string'
        heading_data[col]=col
    new_row = pd.DataFrame(heading_data,index =[0])
    df = pd.concat([new_row, df]).reset_index(drop = True)
    new_row = pd.DataFrame(out_data, index=[0])
    df = pd.concat([new_row, df]).reset_index(drop = True)
    # insert col
    data_arr = ['data'] * (df.shape[0] - 2)
    col_data = ['','heading'] + data_arr
    df.insert(loc=0, column='A', value=col_data)
    df.columns = COL_NAMES[:df.shape[1]]
    return df

categories = kdf['Sub-Division Name'].unique()
groups = kdf['Group Name'].unique()
print('Groups: '+groups)
pipes = []
for grp in groups:
    print('Working on Group: '+grp)
    grp_data = kdf.loc[kdf['Group Name'] == grp]
    categories = grp_data['Sub-Division Name'].unique() 
    print('Categories: '+categories)
    for col in categories:
        print('Working on: '+col)
        data = kdf.loc[kdf['Sub-Division Name'] == col]
        # Get rid of all columns without data
        #data = data.dropna(axis = 1, how = 'all')
        columns = data.columns
        print(f'Columns: {columns}')
        # Get indexes for the items
        sel_indexes=list()
        for sel in ['Standard\nX-Strong\nXX-Strong', 'Pipe Schedule', 'Wall Thickness\nin. Nom', 'THICKNESS/ PRESSURE CLASS']:
            if sel in columns:
                sel_indexes.append(columns.get_loc(sel)+1)
        calc_indexes=dict()
        for sel in ['Nominal Size', 'Nominal Outside dia [in]', 'Internal Diameter in. Nom', 'Wall Thickness\nin. Nom', 'e\nAbsolute Roughness (ft)' ]:
            if sel in columns:
                name = sel.replace(' ','_',1)
                name = name.split(' ')[0]
                name = name.split('\n')[0]
                name = name.lower()
                calc_indexes[name]=columns.get_loc(sel)+1
        # subdivision
        sub_divs = data['Sub-Division'].unique()
        print(f'Sub Divs: {sub_divs}')
        for div in sub_divs:
            print('Working on: '+str(div))
            div_data = data.loc[data['Sub-Division'] == div]
            # Create the file name from the 'Group Name'
            grp_filename = div_data['Group Name'][div_data.index[0]].lower().replace('-','')
            sub_filename = div_data['Sub-Division Name'][div_data.index[0]].lower().replace('-','')
            # take first chars of each word
            parts = grp_filename.split(' ')
            outfilename=''
            sep_part=''
            for idx, part  in enumerate(parts):
                outfilename+=sep_part+part[0:1]
            parts = sub_filename.split(' ')
            outfilename+='_'
            sep_part=''
            for idx, part  in enumerate(parts):
                outfilename+=sep_part+part[0:4]
                sep_part='-'
            table_filename = f'source/04_piping-materials-IV/table-data/{outfilename}.csv'
            outfilename+='-'+str(div)
            print ("writing to "+outfilename)
            outfilename = f'kb/friction-loss/piping-losses/{outfilename}.csv'
            ref_col = columns.get_loc('Nominal Composition, Nickel, percent') + 1
            out_data = div_data.drop(columns=div_data.columns[ref_col:],axis='columns')
            out_data.drop(columns=out_data.columns[:6],axis='columns',inplace=True)
            out_data.dropna(axis = 'columns', how = 'all',inplace=True)
            # Drop rows without Wall Thickness
            #index_wt=out_data[ (out_data['Wall Thickness\nin. Nom'] == '--') | (out_data['Wall Thickness\nin. Nom'] == '') ].index
            #if len(index_wt):
            #    out_data.drop(index_wt, inplace=True)
            # Insert row at the top 
            out_data = updateDataForCsv(out_data)
            out_data.to_csv(outfilename, header=False, index=False)
            out_data.to_csv(table_filename, mode='a', header=False, index=False)
            # Set up piping
            for row in div_data.itertuples():
                # skip 
                if isinstance(row[calc_indexes['wall_thickness']], str):
                    continue
                selector = ''
                selector_desc = ''
                sep = ''
                for sel in sel_indexes:
                    if str(row[sel]) != 'nan' and len(str(row[sel])):
                        selector+=sep+str(row[sel])
                        head, sp, tail = columns[sel-1].partition('\n')
                        selector_desc+=sep+head
                        sep = ' / '
                if not len(selector):
                    selector = 'NONE'
                    selector_desc = 'NONE'
                # filename material nominal_size nominal_od nominal_id nominal_thickness epsilon selector selector_description'
                pipes.append(Piping(outfilename, col, 
                                    row[calc_indexes['nominal_size']], 
                                    row[calc_indexes['nominal_outside']], 
                                    round(row[calc_indexes['internal_diameter']],3), 
                                    row[calc_indexes['wall_thickness']], 
                                    row[calc_indexes['e']],
                                    selector, selector_desc))
        

with open('kb/friction-loss/processed.csv', 'w') as out:
    csv_out = csv.writer(out)
    csv_out.writerow(('material', 'nominal_size', 'nominal_od', 'nominal_id',
                      'nominal_thickness', 'epsilon', 'selector_label', 'selector_value'))
    for p in pipes:
        if not math.isnan(p.nominal_od):
            csv_out.writerow((p.material, p.nominal_size, p.nominal_od, p.nominal_id,
                              p.nominal_thickness, p.epsilon, p.selector, p.selector_description))


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
