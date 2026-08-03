# AI Contract Acceptance Checklist

Use the prompts in `ai/evals/prompts/` and review generated output against these checks. Tool-agnostic (Cursor, Claude Code, Copilot, etc.).

## Imports & shell

- Imports come only from `@chghealthcare/unified-design-system` and `@chghealthcare/unified-design-system/styles.css`.
- Authenticated product pages use `AppShell`.
- The `AppShell` **`menu`** slot is composed with package **`Menu`** (not `Sidebar*` for the product rail).
- Page content is in **`AppShell.Main`** (often via **`MainContent`**).
- No imports from `src/components/ui/*`, `dist/*`, or `@/*`.

## Emphasis & chrome

- The screen uses UDS emphasis components such as `Badge`, `Status`, `Medallion`, `Card`, `Item`, `StatisticCard`, or `SectionHeader` instead of neutral placeholder divs.
- Custom rectangular chrome uses square or ≤12px corners; component-native radii preserved where shipped.
- The output matches the closest recipe in `ai/recipes/`.

## Composition (high-frequency)

- **Page composition** — Answer pre-layout questions (`design-language/semantics/page-composition.md`) before stacking. Fail on default vertical stacks of full-width Cards for reading/forms; fail when ordinary content blocks stretch past **~720px** without columns or a max-width cap; fail when settings-with-many-sections omit in-Main nav+panel; fail when a dominant table workflow is split into skinny Card stacks. Prompts: `narrow-form-layout`, `settings-nav-panel`, `data-workflow-table`.
- **StatisticCards** (or KPI tiles) are in a **horizontal row** with gap **16 or 24** — not a vertical stack of full-width cards only.
- No **`SearchInput`** in `PageHeaderActions` or Header trailing.
- **Main section gap** — Prefer **`MainStack`** (gap 24). Fail on `gap-3`, `gap-5`, `space-y-2`, 8/12/20/32, or missing section gap.
- **Required: short regions share a row** — At `lg+`, lists/feeds/callouts/watchlists share `lg:grid-cols-2` (or chart `col-span-2` + aside). Fail on skinny full-width placements/watchlist/feed/callout, or Reports stacking chart→feed→chart→callout→tables all full-width.
- **Boxed padding** — Prefer `Card` + `CardContent` (**16px** all sides; naked Cards auto-pad 16px). Tables: `CardContent p-0` with **one** outline (Card only — no double Table+Card border). Fail on flush content touching the box edge. Content boxes prefer **`overflow-hidden`** for clean radius edges.
- Horizontal **`TabsList`** prefers **`variant="line"`** (underlined, default) and **`fill={false}`** (condensed triggers; list still full width). Fail on equal-flex triggers as the default look. **Required:** **24px** between `TabsList` and the next item. Fail on `mt-3` / `pt-4` / other non-24 gaps.
- **Table** cells: body **py 8px**; horizontal interior **4px**; first cell left **16–24**; last cell right **16–24** (when tables are present). **`TableHead` ≥ 48px** tall. Nested controls in rows use **compact / `sm`** (`Status size="compact"`, `Badge size="sm"`, etc.).
- **Status** — Prefer **`appearance="outlined"`** (default); fail on unnecessary `solid` fills as the page-wide default.
- **Dominant variant** — Stick with the prevalent component variant on the screen unless the problem requires a change. Fail on decorative variant mixing.
- Grid peer boxes: match heights in a row (esp. non-bottom); stretch when Δ **≤ 150px** and density is similar; bottom row may stay natural; fail stretch voids **>150px** empty.
- **PageHeader** → first content **≤ 24px**.
- **Headline hierarchy (Required)** — Only `PageHeaderTitle` is heading/28; prefer section/`h2`/`SectionHeaderTitle` at body/20/semibold; Sheet/Drawer titles stay 16. Fail when any other headline matches or exceeds the page title (including `text-2xl` on sections).
- **`MainContent` `fixed`**: outer no L/R padding, spans content height; inner ~1000 has 24px padding (when used).
- **`PageHeaderActions` / `FilterbarActions`**: exactly one primary; labeled buttons default size; if >3 actions, **DotsThree*** overflow **last** with **`weight="bold"`** (not `fill`).
- **`FilterbarFilters`**: icon-only `size="icon"` immediately after `SearchInput` (when Filterbar is used).
- **Medallion**: prefer / default **`lg`** (omit size or pass `lg`).
- Icon-only Buttons are **square** and use **`size="icon"`** (44) next to default controls.
- Stacked bar charts: touching ends **radius 0** (when charts are present).
- **Right Sheet / Drawer inspectors** — Header → Body → Footer; Body scrolls; side footer actions horizontal. Fail on freeform Content, stacked side-footer buttons, oversized panel titles, or sparse 1–2 field bodies. Copy `ai/examples/right-side-inspector.tsx`.
- **AppShell listview** — `listviewWidth` 320–480 (default 320); `Toolbar` titlebar; SearchInput **Required 4px** padding on all sides + `border-b` on wrapper; entities `Item` (`appearance="list"` dense) or `Card`. Fail on custom title/count header, flush SearchInput, or ad-hoc entity rows. Copy `ai/examples/detail-with-listview.tsx`.
- **MainContent** — Prefer the same `edge` / `fixed` containment across the app’s pages.
- **Grid stretch** — Fail when `items-stretch` creates >150px empty Card interior; prefer `items-start` for mixed-density peers.
- **Card clipping** — Fail when Card/`overflow-hidden` cuts off body text, buttons, or table rows.

See also: `ai/consumer-ai/COMPOSITION.md`, `design-language/semantics/page-composition.md`, `ai/guides/consumer-ai-bootstrap.md`, prompts `tenant-dashboard-layout`, `reports-layout`, `narrow-form-layout`, `settings-nav-panel`, `data-workflow-table`, `detail-listview`.
