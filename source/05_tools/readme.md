# Process for Updated Unit Conversion Data

## Background
1. Spreadsheets with Unit Conversion data are in `kb/unit-converter` folder.
2. When any of these files change, the `generate/static/unit-conversions.json` file needs to be rebuilt.
	- Run the build file in the `kb/unit-converter` folder
		- `python build.py`
		- This will parse all of the `xlsx` files and build the `unit-conversions.json` file.  
			- This file is used by the *Unit Conversion Tool*

# Superscripting, Subscripting and special characters

1. The `kb/unit-converter/data/unicode.json` file has (most) all of the unicode keys for special characters.
2. To use the special characters in the unit-converter or other tables/areas
	- Convert the hex code to decimal
	- Prepend **&#** to the decimal representation of the character and use that in your text string
		- Ex:  Plus-Minus sign - ` { "key": "\u00b1", "hex": "\u00B1", "name": "plus-minus sign" },`
		- Convert 0x00b1 to decimal -> 177
		- Insert the string "&#177" in the place where you want the plus-minus sign to display

### Helpful links:
- https://www.freeformatter.com/html-entities.html
- https://www.mastertemplate.co.uk/jsonescapedcharacterentities.php
