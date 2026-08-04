# Next release notes (draft)

Copy into the GitHub Release body on the next publish, then clear or replace this draft.

## Toolbar

- Three-region layout: **`ToolbarStart`**, **`ToolbarCenter`** (`ToolbarTitle` / `ToolbarDescription`), **`ToolbarEnd`**.
- Sizes: **`default`** (min-height **44px**) and **`lg`** (min-height **56px**) for stacked title + description.
- Chrome: **radius 0**, **border-bottom only**.
- `ToolbarGroup` / `ToolbarDivider` still cluster actions inside Start or End.
- See `design-language/ontology/toolbar.md` and docs **Toolbar** examples.

## AppShell / listview

- **`listviewWidth`** — pane width **320–480px** (clamped; default **320**). Tokens: `--appshell-listview-width`, `--appshell-listview-width-min` / `-max`.
- **Listview chrome** — **`Toolbar`** is the primary titlebar; optional `SearchInput` wrap with **4px** pad + `border-b`; entities are **`Item`** (`appearance="list"` for dense queues) or **`Card`**.
- Canonical: `ai/examples/detail-with-listview.tsx`, `design-language/semantics/listview-drives-main.md`.

## AppShell / Header chrome (breaking)

- **Branding + menu toggle** moved from Menu into the full-width **AppShell Header** above the rail.
- Set **`brand`**, **`headerVariant`**, **`headerTitle`** on **`AppShell`** (not Menu). Menu inside AppShell is **nav-only**.
- Wordmark stays visible when the rail collapses; collapsed **mark** / hover-reveal toggle removed.
- Below **`lg`**: menu is an overlay drawer + scrim; Header uses compact (icon) search.
- **`hideSearch`** / **`headerLeading`** still omit or replace search only (not brand/toggle).
- See `ai/guides/menu-header-identity.md`.

## SearchInput / Filterbar

- **`surface`**: **`primary`** (white) on gray parents; **`secondary`** (gray, default) on white parents. In Filterbar on edge Main, use `surface="primary"`.
- See `design-language/ontology/filterbar.md`.

## MainContent containment

- **Recommended:** Keep `containment="edge"` or `containment="fixed"` **consistent across the app’s pages** — do not mix container vs edge layouts route-to-route.
- See `design-language/semantics/appshell-main-containment.md`.

## Drawer

- Left/right drawers clamp width to **320–600px** (`min-w-[320px] max-w-[600px]`).

## Item

- **`appearance="list"`** — radius **0** and a hairline **bottom border** between siblings (last row drops the border). Prefer with `ItemGroup` `gap-0` for AppShell listview. Docs page shows both **Box** and **List**.
- **Hover / active** on all variants: `default` and `outline` hover → `--uds-surface-secondary`, active → `--uds-surface-tertiary`; `muted` hover/active → `--uds-surface-tertiary`. Persistent selection remains `variant="muted"`.

## Table

- **`appearance="plain"`** — remove outer border/radius on the table container.
- **`containerClassName`** — style the scroll/chrome wrapper (`data-slot="table-container"`).
- **`TableHead` / `TableCell` `wrap`** — set `wrap` to allow cell text to wrap (default remains nowrap).

## Button

- Disabled buttons no longer use `pointer-events-none`, so `cursor-not-allowed` and native `title` tooltips work on hover.

## Alert

- **`style="default" | "filled"`** (default `default`). `filled` is a soft accent wash for quieter alerts alongside the existing semantic `variant`.

## Icons

- Added **`ShapesIcon`** and **`ListChecksIcon`** to the curated Phosphor registry.

## Load / CSS

- **styles.css no longer embeds Inter.** The Inter Variable font ships as a separate ~200 KB WOFF2 (`@chghealthcare/unified-design-system/fonts/Inter-Variable.woff2`), so CSS parse/download stays small. Upgrade if pages still feel slow to load on an older tarball that inlined the font as base64.
- Optional preload guidance: see `setup.md` (Fonts & preload).
- **AI recipe layout utilities** — published `styles.css` / `styles/base.css` now include multi-column classes used by `ai/examples` and COMPOSITION (`lg:grid-cols-2`, settings `240px` nav grids, `lg:items-start`, etc.). Styles.css-only consumers no longer need a consumer Tailwind build for those recipe layouts.

## Branding / CareerMD

- New **`careermd`** brand mode (`Menu brand="careermd"`, `data-brand="careermd"`): Black `#232323` primary + Purple `#6B7AFF` secondary + Teal `#5DE0D0` tertiary accent, gray quaternary.
- **`Branding appearance="CareerMD"`** — `careermd-wordmark.svg` / `careermd-brand-mark.svg`.
- Default nav: Dashboard, Jobs, Employers, Candidates, Messages, Reporting.
- Branding artwork under `src/assets/branding/svg/` is optimized with SVGO (`floatPrecision: 2`, viewBox/dimensions/hex fills preserved for dark-mode invert). Re-run after replacing artwork: `npm run optimize:branding-svg`.

## Status ↔ Badge appearances

- **Status** appearances are the same axis as **Badge**: `subtle` | `pastel` | `outlined` | `solid`, sharing accent shade steps (`src/lib/accent-appearance-styles.ts`).
- Meaning → hue: `error`→red, `warning`→yellow, `success`→green, `info`→blue. Preferred default remains `appearance="outlined"`.
- Legacy: `appearance="text-only"` → `subtle`; `color="pastel"` with `solid` → `pastel` fill.

## Docs site

- Documentation version dropdown removed; the site always shows the **latest** snapshot (`1.2.0`). Older frozen trees are not retained.

## Vite / icons / subpaths

- Phosphor icons are imported via **per-icon deep paths** inside UDS so Vite no longer prebundles the entire `@phosphor-icons/react` package (~17 MB) in dev. `IconContext` uses `@phosphor-icons/react/dist/lib/context` (not the package root barrel).
- **Do not** `optimizeDeps.exclude` UDS (waterfall). **Do not** `optimizeDeps.include` the package **root** either (one multi‑MB DEV prebundle of the full barrel).
- **Calendar / DateInput / DateRangeInput / InputOTP / MicroCalendar** (and chart/drawer/command/…) remain **subpath-only** for heavy deps.
- **Additional component subpaths** for Vitest / narrow imports: `/button`, `/select`, `/table`, `/alert`, `/app-shell`, `/card`, `/badge`, `/status`, `/field`, `/input`, `/header`, `/sidebar`, `/dialog`, `/sheet`, … (see `package.json` `exports`). Prefer these over the root barrel in unit tests.
- Vite DEV Network Size for `react-dom_*` / `react-router-dom` is expected; inline dep source maps inflate chunks, so the footer **Resources** total often lands **20–30 MB** in DEV. Measure production with `vite build && vite preview`.
