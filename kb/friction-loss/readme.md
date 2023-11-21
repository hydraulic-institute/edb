# Process for an Updated *"Section IV - Pipe Materials.xlsx"* File

## Prep the Data
1.  Save the *"Pipe Data"* tab from the spreadsheet as a separate CSV file into the `edl/kb/friction-loss` folder as:  *"Section IV - Pipe-Tube Data.csv"*
	-  In turn, save the new spreadsheet (replacing the old one) as *"Section IV - Piping Materials.xlsx"* file
2.  Add a new row under the header row (which is/should be at row 4)
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