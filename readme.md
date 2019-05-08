# Setup
```
pip3 install virtualenv
python3 -m venv env
source env/bin/activate

pip3 install Jinja2   
pip3 install lesscpy
pip3 install Markdown
pip3 install watchdog
pip3 install htmlmin
```


# Page Structure
## Metadata
Each page will show up in the table of contents using the file's name, without it's extension (i.e. pump_stuff.md will be "pump_stuff").  To allow better titles for the pages in the table of contents, you can place meta data in each page (at the top).

```
-----
title:  Pump Info
-----

... the page content ....
```

All metadata must appear at the top of the file, and the 
metadata is sectioned off from the rest of the page content with
a sequence of 5 dashes `-----`, and closed with the same 5 dashes.

The following metadata attributes are supported:

- **title** - title of the page to appear in the table of contents
- **author** - optional text to indicate who wrote the page.  Will be injected at the end of the page.
- **date** - optional date originally published.
- **edited** - optional date last edited.


## Directory (Topic Headings)
Each directory **must include a `index.md` file.  This file must include a meta data entry, but no additional content.  The meta data should at least include the title.

## Page ordering
The EDB is arranged in a heiarchy of topics.  Folder structure under the `/source` directory is used to arrange the heiarchy, however the order of pages within the same directory is determined by alphabetical order.

**Note** - this is why the actual page title is always included in the metadata section discussed above.  **The recommended way to create individual pages is to prefix their filenames with a number** - ensuring the order of the pages is always clear.

For example, the main topic "System Curves" has three pages within it - "Tutorial", "Demonstrator", and "Worked Example".  To ensure that the pages appear in the given order, you would arrange the folder structure as follows:

```
 source
   ---- index.md
   ---- 01_system-curves
        | -- index.md
        | -- 01_tutorial.md
        | -- 02_demonstrator.md
        | -- 03_worked-example.md
```
The `index.md` entry at the root of the directory structure is the front page of the EDB, and contains standard markup.  While it must have a meta data block, it is not necessary to place any values in it. See the current `index.md` for detail.

Within sub-directories, which represent sections of the EDB, the contents of `index.md` contains the true title of the section:

```
-----
title: System Curves
-----
```

The prefixes 01, 02, 03 ensure the topics held under System Curves appear in the correct order.  Their page titles will be derived from their metadata block.  For example - within `03_worked-example.md`:

```
-----
title: Worked Example
date: April 16th, 2019
-----
```
## Directory and File Naming
As described below, the title of directories and pages that *users* see in their browser is **not** determined by the file / directory names you create in the `source` directory - the public facing names are defined in the metadata blocks within the directories and files.

**It is absolutely critical that DO NOT INCLUDE spaces in the names of your files or folders.**

Likewise, **DO NOT use underscore characters `_` anywhere in the file or directory** name OTHER than to separate the numeric prefix used to order the pages.

For example, the following are all valid folder or file names:
- `01_system-curves`
- `01_SystemCurves`
- `01_systemcurves`

The following **are not valid names**, and will result in build failure
- `01_system_curves`  (multuple underscores will lead to malformed URLs)
- `01-system-curves`  (an underscore should always separate the ordering prefix)
- `01__system-curves` (multuple underscores will lead to malformed URLs)
- `01_system curves`  (spaces between words will create invalid URLs)

*You are highly recommended to follow the standard URL **slug** notation - which uses all lower cases, an separates words using a single dash `-` character.*  While not absolutely necessary, following this convention is known to improve search engine optimization.  You should make every effort to make the names of your directories and files be short, clear, and consistent - **they will be used to build URLs for your pages**.

## Section / Topic Nesting
The EDB is meant to be easily navigated.  Sections (directories) may have files (topics) in them - but no sub-directories.  Thus, the EDB consists of sections, which have several topics.  Each topic page can contain headings and sub headings - but there is no ability to create nested sections/pages.

This choice was made to ease navigation, and also to ensure each topic page can have adequeate detail.  It is critical for SEO to ensure the EDB has long content - not a series of very short pages.

# Page Content
All pages can contain general text.  Text is entered using Markdown, a simplified
syntax for HTML.

## Text

### Markdown Basics

### Units of Measure

## Formulas / Equations
All pages can contain blocks for equations, which are entered in LaTeX and automatically typset when the EDB is built.  All equations are block elements - meaning the occupy their own vertical real estate on the screen.

LaTex formulas are supported via a *custom extension* to markdown syntax.  The include LaTex equation, the LaTex line must have a `=+=` on the line preceding and after it.  The actual LaTex text must have `$$` at the beginning and end of the line as well.

For example:
```
=+=
$$ \Delta h_f = { {fL \over D} * v^2  \over 2g}$$
=+=
```

The block will compile and be typset as the following:

<img src='data:image/png;base64,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'/>

## Tables
All pages can contain blocks for tabular data.  Tabular data is entered into the EDB by supplying CSV files, and referencing them within the page.  Each CSV table can be provided with a `US__` or `METRIC__` prefix, and the system will select the correct data based on user settings.  Tables without the units prefix will not respond to units of measure. 

## Images
Images are supported naturally by Markdown.  Images can be placed in the same directory as the page, or in a central `/image` directory.  The links you enter will be resolved as a relative URL.   External images can also be used using an absolute URL (not recommended).

## Internal Links
When linking to other pages within the document, you must provide the non-prefixed file name, with a `.html` extension, using standard Markdown link syntax.

For example, a page linking to the Worked Example page under "System Curves" would contain a link to `/system-curves/worked-example.html`.  While that link will work globally, throughout the EDB (since it starts with a `/`), you may also use relative links.  For example, if you were linking to Worked Example under System Curves, from the System Curves Tutorial page, you caould simply link to `tutorial.html`.  If linking to Worked Example from another section (i.e., a page under "Specific Speed"), you could also use `../system-curves/worked-example.html`.

## External Links
External links follow standard Markdown link syntax.  Often, links to external sites should open in a new browser tab - to keep the user on the EDB page.  Markdown does not support this, in this case you should include the actual HTML markup - which will be honored by the system.  The following text, written within the page's markdown text, will open example.com in a new browser tab/window:  
```
<a href="http://example.com/" target="_blank">example</a>
```
## Sales Links

## Interactive Demonstrators
These are JavaScript apps - more details to come.

# Auto-Generated Content
## Cross-Links
## Search 
## PDF Document

# EDB Management
## Local Preview
All work should be done from within the `source` directory.  While you can build the EDB HTML site manually, the easiest way to do your
development is to execute the following command from the root project directory:

```
python3 serve.py
```
This script automatically builds the EDB, and monitors file changes in the `source` directory.  Any time you save a modification, the EDB is automatically rebuilt.

The EDB is always built to the `build` directory.  The files contained there are suitable for viewing with a web browser - *but you shouldn't open them directly* by clicking on them.  **Instead, the `server` script also launches a local web server** so you can view the built EDB in your web browser exactly as if it is deployed.

To view the EDB while you are developing, got to [http://localhost:8081](http://localhost:8081).  While the EDB is automatically rebuilt whenever any source files change, **you must click the refresh button on your web browser to see the changes**.

## Version control with `git`
## Deploying