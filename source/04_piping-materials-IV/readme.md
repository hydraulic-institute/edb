# Process for Updated PIPE MATERIALS Data
*"Section IV - Pipe Materials.xlsx"*

## Prep the Data
1. Download the new Pipe Materials spreadsheet to your Downloads folder.
2. Rename the new file to *"Section IV - Pipe Materials.xlsx"*.
3. Save the *"Pipe Data"* tab from the spreadsheet as a separate CSV file (UTF8-encoded) as: *"Section IV - Pipe-Tube Data.csv"*
4. Replace the existing files in the `edl/kb/friction-loss` folder with these 2 files.
5. Open the `edl/kb/friction-loss/Section IV - Pipe-Tube Data.csv` file.
	-  Add a new row under the header row (which is/should be at row 4)
	-  On that new row, put the word *"include"* in every column that you want displayed on the tables in **Section IV** on the EDL website.
    -  Make sure to always *"include"* the **Group Name, Sub-Division and Sub-Division Name**.

## Build the tables and json file for the Friction Calculator
1.  Run the build file in the `edl/kb/friction-loss` folder:
	-  `python build-full.py`
	-  This will generate the data tables in `edl/source/04_piping-materials-IV/table-data`
		- The file names are auto-created based on the **Group Name** and then the **Sub-Division Name**:  <br/>
        `<Group Name Initials>_<First 4 letters of each of the words in the Sub-Division Name followed by '-'>.csv`
		- Ex:  **Group:** Steel Pipe <br/>
			**Sub-Division Name:** Welded and Seamless Wrought Steel Pipe <br/>
			Filename generated:  `sp_weld-and-seam-wrou-stee-pipe.csv` <br/>
	-  These tables are referenced in the *.md files in `edl/source/04_piping-materials-IV`
    -  This build will also generate the `friction-loss-materials-full.json` file in the `generate/static` folder.
        - This file is used by the friction calculator implemented in the `source/javascript/calculators.js` file.

# Process for Updated FLANGE Data 
*"Section IV - Flange Data.xlsx"* 

## Prep the Data	
1. Download the new Flange Data spreadsheet to your Downloads folder.
2. Rename the new file to *"Section IV - Flange Data.xlsx"*.
3. Replace the existing file in the `source/04_piping-materials-IV/table-data` folder.
4. For each tab in the spreadsheet:
	-  There exists a CSV file for each tab in the spreadsheet in this same folder.
	-  Copy JUST the data (US or Metric) and replace the data in the existing CSV file.
	-  There is a row under the *header* row called *tags*.  This row is for tagging the columns you want to who on the table.
		- If you leave a column blank or tag it 'All', it WILL be included.
		- If you tag the column 'None', it will NOT be included
		- For the files with multiple types of flanges, the appropriate *"Section IV - Flange Data.xlsx"* tab/sheet will have a row of *tags* that can be copy/pasted into the appropriate CSV file in the *tags* row.
	-  Save the file.

## Build the tables
1.  The tables will automatically be built in the `output.py` file in the `table_data()` function when you build the system:
	- `python serve.py`

# Using TAGS for tables

1. Here is an example of using *tags* to select specific columns from a table
	```
	=|=
	title: Threaded Steel Pipe Flanges per ASME B16.5 (Class 150, 300)
	data-us: flange-16.5-150-300-us.csv
	data-metric: flange-16.5-150-300-metric.csv
	column_tags: Th
	=|=
	```
	In this example, the columns that will be included will be the ones tagged with 'Th' on the *tags* row in the CSV files.
	The CSV file(s) can be used for multiple flanges.