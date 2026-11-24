# HI Data Tool (EDB) — Developer Handoff

**Product:** [https://datatool.pumps.org/](https://datatool.pumps.org/)  
**Repo:** [https://github.com/hydraulic-institute/edb](https://github.com/hydraulic-institute/edb)  
**Audience:** Software developers working on the build system, templates, JavaScript, or CSS.  
**Related:** Content authoring is documented in [`readme.md`](readme.md). Use that for Markdown conventions; use this doc for application code.

---

## What this project is

The Engineering Data Book (EDB) / **HI Data Tool** is a static-site generator. Markdown and CSV under `/source` are compiled into HTML under `/build`, then served locally or published to beta/production.

It is **not** a typical SPA framework app. Most “pages” are generated HTML plus shared JS (Vue, MathJax, calculators, navigation).

---

## Quick start

```bash
# Python ≤ 3.11 (required; some deps break on newer versions)
python3 -m venv env
source env/bin/activate          # Windows: .\env\Scripts\activate
pip install -r requirements.txt

python build.py                  # one-shot build → ./build
python launch.py                 # serve ./build on http://127.0.0.1:8080
# or
python serve.py                  # build + watch source + serve
```

| Script | Purpose |
|--------|---------|
| `build.py` | Generate site (`production=False`) |
| `launch.py` | HTTP server for `./build` (port 8080) |
| `serve.py` | Build, serve, rebuild when `/source` changes |
| `beta.py` | Build for beta deploy |
| `prod.py` | Build with `production=True` |
| `build-pdf.py` | PDF-oriented build path |

Activate the venv before running any of these.

---

## Architecture overview

```
source/          ← author content (Markdown, images, table-data CSVs, JS)
generate/        ← Python build pipeline + Jinja templates + LESS
  graph.py       ← walks source dirs into a content graph
  output.py      ← Markdown → HTML, custom block processors, write files
  templates/     ← Jinja2 (layout.jinja is the main chrome)
  static/        ← style.less and static assets compiled into build/statics
build/           ← generated output (do not hand-edit; regenerated on build)
javascript/      ← copied from source/javascript into build
```

**Build flow (simplified):**

1. `graph.build_content_graph()` scans `/source` (sorted `NN_slug` dirs/files).
2. `output.html()` clears/rebuilds `/build`, copies specials (`javascript`, `images`, `logos`), compiles LESS → `statics/style.css`.
3. For each topic: custom block processors → `markdown.markdown()` → more processors → Jinja `topic.jinja` / `layout.jinja` → HTML file.
4. Home section’s home topic is also written as site `index.html`.

Key entry: `build.generate(production)` in `build.py`.

---

## Key files for developers

| Area | Path | Notes |
|------|------|--------|
| Layout / nav | `generate/templates/layout.jinja` | Sidebar accordion, HOME link, mobile menu |
| Topic shell | `generate/templates/topic.jinja` | Wraps page content |
| Build pipeline | `generate/output.py` | All `process_*` block handlers |
| Content graph | `generate/graph.py` | Node shape, sorting, metadata |
| Styles | `generate/static/style.less` | Compiled to `build/statics/style.css` |
| Nav / menu JS | `source/javascript/base.js` | Active topic, localStorage, accordion clicks |
| App / units Vue | `source/javascript/edb.js` | `<units>` component, unit toggle |
| Calculators | `source/javascript/calculators.js`, `tank_calculators.js` | Interactive calculators |
| Demonstrators | `source/javascript/demonstrators.js` | Educational pump/system curve demos (see below) |
| Demo template | `generate/templates/demo.jinja` | Embeds `<demo-{kind}>` into pages |

After changing `source/javascript/*`, rebuild (or copy into `build/javascript/`) so the server picks it up. `launch.py` alone does **not** watch `generate/` or JS unless you use a full rebuild / `serve.py` (which watches `/source`).

**LESS changes:** rebuild, or compile manually:

```bash
python -c "import io, lesscpy; css=lesscpy.compile('generate/static/style.less', minify=True); open('build/statics/style.css','w',encoding='utf8').write(css)"
```

Template (`layout.jinja`) changes require a full `build.py` (or `serve.py` after a source touch) so HTML is regenerated.

---

## Custom Markdown extensions

These are **not** standard Markdown. They are string-delimited blocks processed in `generate/output.py` before/after `markdown.markdown()`.

| Delimiter | Purpose | Processor |
|-----------|---------|-----------|
| `=+=` … `=+=` | LaTeX / MathJax formula block | `process_latex_blocks` |
| `=atag=` … `=atag=` | In-page section + nav submenu label | `process_anchor_tag_blocks` |
| `=t=` / table blocks | Tables from CSV | `process_table_blocks` |
| `=c=` / chart blocks | Static charts from CSV | `process_chart_blocks` |
| `=d=` … `=d=` | Interactive demonstrators | `process_demonstrator_blocks` |
| `=^=` … `=^=` | Ad / promo cards | `process_ad_blocks` |
| `=scrolling-logos=` | Sponsor logo strip | `process_scrolling_logo_blocks` |
| `<units us="..." metric="..."/>` | Unit-specific text (Vue) | `process_vue_components` (injects `:units='unit_set'`) |

### Demonstrators (`=d=`)

Educational demonstrators are interactive Vue widgets (tank levels, friction, pump speed, parallel pumps, control valves) paired with a live pump/system curve chart. They are embedded in Markdown and implemented in JavaScript—not authored as static images.

#### Authoring in Markdown

```markdown
=d=
title:
kind: pump-curve
pumpType: system
pumpCount: 0
lowerLevel: 5
upperLevel: 5
upperPressure: 10
totalResistance: 5
=d=
<div class="demo-label">Demo. 1.B.1 System curve</div>
```

- Delimiter is exactly `=d=` on its own lines (open and close).
- Body is `key: value` lines, parsed by `parse_dict()` in `output.py`.
- **Required:** `kind` — becomes the Vue tag name `demo-{kind}` (e.g. `kind: pump-curve` → `<demo-pump-curve>`).
- Other keys are JSON-serialized into the component’s `init` prop and override defaults in `created()`.
- Place a `<div class="demo-label">…</div>` after the block for the visible caption (and optional anchor id).

Build path:

1. `process_demonstrator_blocks()` finds `=d=` pairs.
2. `replace_demonstrator_block()` parses props and renders `demo.jinja`.
3. Template output (conceptually):

```html
<div>
  <div class="ms-5"><span><u><h3>{{title}}</h3></u></span></div>
  <demo-{{kind}} id="{{key}}" init='{{init}}'></demo-{{kind}}>
</div>
```

#### Runtime stack (tools used to create / run demonstrators)

Loaded from CDNs / local scripts in `layout.jinja`:

| Tool | Role in demonstrators |
|------|------------------------|
| **Vue.js** | Component model (`demo-pump-curve`, child widgets, reactivity, `v-model` / `.sync`) |
| **Konva.js** (`konva@8`) | HTML5 canvas drawing for interactive tanks, knobs, pipes/flow arrows (`demo-tank`, `demo-flow-line`) |
| **ApexCharts** | Live Head vs Flow charts (system curve, pump curves, operating point, friction/static bands) |
| **Bootstrap** (layout grid) | `container-fluid` / `row` / `col-*` structure around inputs + chart |
| **jQuery** | Locating the chart mount node (e.g. `$(this.$el).find('.demo-chart')`) |
| **Custom JS math** | `CurveCalculators` helpers at the top of `demonstrators.js` (static/friction/pump head, Q, parallel effects) |

Primary implementation file: `source/javascript/demonstrators.js` (copied to `build/javascript/` on generate). Script tag order in layout loads Vue, Konva, ApexCharts, then `demonstrators.js`.

#### Vue components in `demonstrators.js`

| Component | Purpose |
|-----------|---------|
| `demo-pump-curve` | Top-level demonstrator: reads `init`, owns chart state, mounts ApexCharts |
| `demo-pump-inputs` | Left-panel controls (tanks, speed, friction, parallel count, valve setting) by `pumpType` |
| `demo-tank` | Konva-drawn tank / slider knob for a numeric parameter |
| `demo-flow-line` | Konva schematic between lower and upper tanks |
| `demo-input-slider` | Simple HTML range input (available helper) |

`pumpType` on `demo-pump-curve` selects which UI/series are shown:

| `pumpType` | Behavior |
|------------|----------|
| `system` | System curve only (tank levels, pressure, friction) |
| `plot` | Pump + system + operating point (variable speed) |
| `fcv` | Adds active control-valve flow setting / valve head series |
| `parallel` | Multiple identical pumps; head/flow increase readouts |

Examples in content: `source/02_pump-system-fundamentals/02_sys-curves-Phase3.md`, `09_operating-point-Phase3.md`.

#### Adding or changing a demonstrator

1. **Content-only:** add/adjust an `=d=` block with the right `kind` / `pumpType` / initial values; rebuild.
2. **New behavior / new kind:** implement or extend a Vue component in `demonstrators.js` named `demo-<kind>`, then reference that `kind` from Markdown.
3. **Visual controls:** Konva shapes live mainly in `demo-tank` / `demo-flow-line`.
4. **Chart series / styling:** ApexCharts options and `series_data` live on `demo-pump-curve`.
5. Rebuild so `build/javascript/demonstrators.js` and page HTML update; hard-refresh the browser if scripts are cached.

**Related but separate:** page calculators (`calculators.js`, `tank_calculators.js`, including `tank-demo`) are Vue tools for the Tools section—not the `=d=` educational demonstrators.

### Formulas (`=+=`)

```markdown
<div class="equation-label"><a id="eq1b3"></a>Eq. 1.B.3 </div>
=+=
$$ Δh_{stat} = ... $$
=+=
```

Optional unit gating inside the block:

```markdown
=+=
[units us]
$$ ... $$
=+=
```

**Important:** Formulas are wrapped in `<div class="formula">` (not `<p>`). MathJax display math inserts block elements; putting them inside `<p>` causes the browser to close the paragraph early so the equation label and formula layout break.

### Anchor tags (`=atag=`)

```markdown
=atag=
System curve
=atag=
```

- Both open and close delimiters must be exactly `=atag=` (a typo like `=atag` fails the build with “No closing delimiter found”).
- No blank lines between the pair.
- Builds a nav submenu entry and an in-page target.

### Links

Standard Markdown links are converted by Python-Markdown in `write_content`:

```python
content = markdown.markdown(content)
```

Example: `[Figure 1.I.8](#fig1i8)` → `<a href="#fig1i8">Figure 1.I.8</a>`.

### Units inside attributes

Raw HTML like `<b>` inside `<units us="..." metric="..."/>` **attribute values** breaks HTML parsing. Prefer:

- Markdown `**Note:**` outside the tag, or  
- Entities: `&lt;b&gt;Note:&lt;/b&gt;` inside the attribute (rendered via Vue `v-html`).

The `<units>` component lives in `source/javascript/edb.js` and already converts `^...^` / `_..._` to `<sup>` / `<sub>`.

---

## Navigation behavior

Desktop nav is in `layout.jinja` (`#sidebar` / `.topic-list`).

### Split heading control (page vs expand)

Where a heading should **open a page** and the **+/- only toggles children**:

- Title is an `<a class="nav-split-title">` (or similar).
- Toggle is a separate `<button class="nav-split-toggle accordion-button ...">` with Bootstrap collapse attributes.
- Styles: `.nav-split`, `.nav-split-toggle` in `style.less`.

Do **not** wrap the toggle button inside the page link, and do not put Bootstrap collapse on the title link itself.

### Active topic / double load on `/`

`source/javascript/base.js` → `setup_menu()`:

- Stores last topic in `localStorage.active_topic`.
- Visiting `/` may redirect to the stored topic.
- `/`, `/index.html`, and `/home/home.html` are treated as the same page via `canonicalPath()`.
- Only click section toggles that are real `<button>` elements (HOME is a link; clicking it would navigate again).

---

## CSS notes

Source of truth: `generate/static/style.less`.

Label classes share base typography; colors differ per type (see `.equation-label`, `.calculation-label`, `.figure-label`, etc.).

Responsive font example:

```css
font-size: clamp(0.75em, 2.5vw, 0.9em);
```

(`min`, preferred viewport-scaled, `max`)

---

## Handling build failures

1. Read the last `Processing <file>.md ...` line — that file failed.
2. Read the following `** Error` / `** BUILDERROR` message.
3. Fix source (or generator), rebuild.

Common content errors:

| Message | Typical cause |
|---------|----------------|
| Anchor tag … No closing delimiter | `=atag=` missing final `=` or unpaired |
| Anchor tag … No tag name found | Empty `=atag=` pair |
| Table/file does not exist | CSV path wrong under `table-data/` |

`build.generate()` catches exceptions, prints `** BUILDERROR - ...`, and returns `False`.

---

## Content vs app code

| Edit here | Effect |
|-----------|--------|
| `source/**/*.md`, images, CSVs | Page content / data |
| `source/javascript/*` | Runtime behavior (copied to build) |
| `generate/templates/*` | HTML structure for all pages |
| `generate/output.py`, `graph.py` | Build pipeline |
| `generate/static/style.less` | Global styles |

Do not hand-edit `build/` except for local debugging; the next build overwrites it.

---

## Naming rules (URLs break if ignored)

Directories/files under `source/`:

- Form: `NN_slug` (e.g. `02_sys-curves-Phase3.md`)
- **No spaces**
- **Only one underscore**, between the numeric prefix and the slug
- Prefer lowercase + hyphens in the slug

Public titles come from YAML-like metadata between `-----` lines, not from the filename.

---

## Related products

This repo powers the **HI Data Tool**. The same organization also maintains **er.pumps.org** (Energy Rating Program) in a separate codebase. Do not assume ER portal code lives here.

---

## Suggested first tasks for a new developer

1. Run `serve.py`, open `http://localhost:8080`, click through HOME and one Pump System Fundamentals page.
2. Change a string in `source/00_home/01_home.md`, confirm rebuild.
3. Trace one formula from Markdown `=+=` through `replace_latex_block` to the HTML `div.formula`.
4. Trace one nav click through `layout.jinja` → `base.js` `menu_topic_click` / `setup_menu`.
5. Read `readme.md` sections on metadata, tables, charts, and `=atag=` before editing content structure.

---

## Contacts / access

- Repo access historically via Hydraulic Institute (see `readme.md` — Pete Gaydon / membership contacts as listed there).
- Production site: `datatool.pumps.org`.

---

*This handoff supplements `readme.md`. Prefer updating this file when application architecture or developer workflows change; prefer updating `readme.md` when content-author conventions change.*
