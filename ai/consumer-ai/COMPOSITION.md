# UDS composition — Required (high-frequency)

Copy this block into consumer agent instructions. Before composing authenticated screens, open package docs under `node_modules/@chghealthcare/unified-design-system/`:

1. `AI_USAGE.md`
2. `AGENTS.md`
3. `design-language/README.md`
4. `ai/indexes/` (start with `concept-index.md` / `decision-index.md`)

## Rules

### Page composition (Required)

Canonical: `design-language/semantics/page-composition.md`.

Before placing components, select an appropriate page layout based on the content’s hierarchy and relationships. Do **not** default to a single vertical stack of full-width Cards. Consider a main-and-sidebar layout, multi-column grid, split layout, or intentionally narrow content column. **Most content blocks should not be wider than 720px** — when Main is wider, use **columns** to divide space (or `max-w-[720px]` / `--uds-container-prose`). Avoid stretching text, forms, and small content groups across the full screen. Do not place every section inside a card; use spacing, headings, dividers, and background changes to establish groups. Match a named anatomy from `design-language/patterns/screen-layout-patterns.md` (01–11) before inventing layout.

**Answer before generating layout:**

1. What is the user’s primary task?
2. Which information must receive the most visual space?
3. Which content can sit beside other content?
4. Which sections need full width?
5. What should remain visible without scrolling?
6. Which page pattern best fits these relationships?

Demos: `ai/examples/workspace-dashboard.tsx`, `analytics-overview.tsx`, `settings-form.tsx` (fixed), `narrow-form.tsx`, `settings-nav-panel.tsx`, `data-workflow-table.tsx`.

**FAIL IF:** Every section is a full-width Card; reading/forms/small groups stretch past ~720px; no pattern/width choice before stacking; wide Main with a single skinny full-width column when peers could share a row.

- **StatisticCards** — Horizontal row; gap **16 or 24** only (`design-language/ontology/statistic-card.md`).
- **No Search in header actions** — Do not put `SearchInput` in `PageHeaderActions` or Header trailing (`design-language/ontology/page-header.md`).

### AppShell.Main layout (three separate Required rules)

Canonical: `design-language/semantics/appshell-main-containment.md` (+ `design-language/semantics/spacing-levels.md`).
**Recommended:** Keep `MainContent` `edge` vs `fixed` (container layout) consistent across the app’s pages.
Copy the structure in `ai/examples/workspace-dashboard.tsx` (KPI row → **`lg:grid-cols-2`** table | list).

1. **Main section gap** — Prefer **`MainStack`** under PageHeader (built-in `--uds-gap-24`). If hand-rolling, use **only** `--uds-gap-16` or `--uds-gap-24`. Do **not** use 8, 12, 20, 32, or bare Tailwind `gap-3` / `gap-5` / `space-y-2`.

**Form fields:** Prefer **stacked** (single column). Use `md:grid-cols-2` only for **related** pairs (e.g. first & last name) or dense forms that need the space. **FAIL IF** unrelated fields sit side-by-side by default (`design-language/patterns/forms.md`).

```tsx
<MainStack>
  {/* first-level sections */}
</MainStack>
```

**FAIL IF:** KPI row sits tight under the page header / above the next section with less than 16px gap.

2. **Required: short regions share a row at `lg+`** — Item lists, feeds, callouts, watchlists, and narrow tables **must** share a grid row (`lg:grid-cols-2` or chart `lg:col-span-2` + aside). A KPI row alone does **not** satisfy this for later sections. Copy `ai/examples/workspace-dashboard.tsx` (two grid rows) and `ai/examples/analytics-overview.tsx`.

```tsx
<div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
  <div>{/* pipeline Table */}</div>
  <div>{/* placements list */}</div>
</div>
```

These grid utilities ship in published `styles.css` / `styles/base.css` — styles.css-only apps do **not** need a consumer Tailwind build for recipe multi-column layouts.

**FAIL IF:** Skinny full-width placements / watchlist / feed / callout (large empty horizontal space). **FAIL IF:** Reports stacks chart→feed→chart→callout→tables all full-width.

3. **Boxed padding** — Prefer **`Card` + `CardContent`**. Naked Cards (no slot children) auto-pad **16px** in the package; still use `CardContent` for composition. Content must **not** touch the box edge.
   - Do: `<Card><CardContent>…</CardContent></Card>`
   - Tables: `<Card><CardContent className="p-0"><Table>…</Table></CardContent></Card>` (cell first/last pad is 16px). **One border only** — Card outline; Table drops its outer border inside `CardContent` (no double / 2px edge).
   - Content boxes: prefer **`overflow-hidden`** (Card / StatisticCard defaults) so children clip to the radius — clean edges unless escape/scroll requires otherwise (`design-language/composition/overflow.md`).
   - Don’t: flush custom lists/tables to the Card border with no inset; don’t stack Card + Table outer borders.

**FAIL IF:** Bordered box with text/rows flush against the left/right edge.

### Other Required rules

- **Horizontal Tabs** — Prefer **`variant="line"`** (underlined, default). Prefer **`fill={false}`** (condensed triggers); TabsList still `w-full`. Use `fill={true}` only for equal-width triggers. **Required:** **24px** between `TabsList` and the next item (`gap-[length:var(--uds-gap-24)]` on `Tabs` or `mt-[length:var(--uds-spacing-24)]` on `TabsContent`). **FAIL IF:** `mt-3` / `pt-4` / other non-24 gaps (`design-language/ontology/tabs.md`).
- **Table cells** — Body **py 8px**; horizontal interior **4px**; first cell left **16–24**; last cell right **16–24**. **`TableHead` ≥ 48px** tall (distinct from body rows). In table/list rows prefer compact/`sm` nested controls (`Status size="compact"`, `Badge size="sm"`). Trailing row actions → last cell **`className="w-0"`** (hug content at far end) (`design-language/ontology/table-list.md`).
- **Status appearance** — Prefer **`appearance="outlined"`** (package default). Appearances match Badge (`subtle` / `pastel` / `outlined` / `solid`) on the same accent ramps (`design-language/ontology/status.md`).
- **Badge** — Hug label content; **FAIL IF** Badge is `w-full` / stretched to its container (`design-language/ontology/badge.md`).
- **Feedback colors** — Error → destructive; warning → warning; success → constructive; information → action/info. **FAIL IF** wrong color family (`design-language/foundations/color.md`).
- **Dominant variant** — If one component variant is already prevalent on the screen/product, **keep using it** unless the problem requires a different treatment. Do not mix variants for decoration (`design-language/semantics/dominant-variant.md`).

**FAIL IF:** Multiple decorative variants of the same component compete on one screen without a problem-driven reason.
- **Grid peers** — **Match heights** in a row (especially non-bottom rows) so short cards do not leave mid-page negative space. Rebalance content first; stretch when Δ **≤ 150px** and density is similar. Bottom row may stay natural. Prefer **`items-start`** only when peers cannot rebalance. **FAIL IF:** stretch creates **>150px** empty Card interior (`design-language/foundations/grid.md`).
- **PageHeader → content** — **≤ 24px** between header bottom and first content (`design-language/ontology/page-header.md`).
- **Headline hierarchy (Required)** — Page title (`PageHeaderTitle`, heading/**28**) is the **only** largest headline. Prefer `SectionHeaderTitle` / `h2` at **body/20/semibold**; `SheetTitle` / `DrawerTitle` stay **16** (do not upsize). **FAIL IF:** any in-page or panel headline matches or exceeds the page title (`text-2xl` / heading-28 on sections). (`design-language/semantics/hierarchy.md`).
- **Card clipping** — **FAIL IF:** Card/`overflow-hidden` cuts off body text, buttons, or table rows. Let Main scroll, wrap copy, or use an inner scroll region (`design-language/composition/overflow.md`).
- **MainContent containment** — Use `edge` or `fixed`; **Recommended:** keep that choice consistent across the app’s pages (do not mix container vs edge layouts). **`fixed`:** Outer 1280: no L/R padding, no min-height, no extra wrap box; inner 1000 padding from `appearance` (`default` **24px**, `expanded` **48px`) (`design-language/semantics/appshell-main-containment.md`).
- **Toolbar actions** (`PageHeaderActions` / `FilterbarActions`) — Exactly **one** primary; labeled buttons **default size**; >3 buttons → **DotsThree*** overflow **last on the right** with **`weight="bold"`** (not `fill` / regular). Prefer **no Badge** in `PageHeaderActions` (`design-language/semantics/toolbar-action-slots.md`).
- **Filterbar SearchInput surface** — Gray parent → `surface="primary"` (white); white parent → `surface="secondary"` / default (gray). Icon-only `FilterbarFilters` `size="icon"` immediately **after** search (`design-language/ontology/filterbar.md`).
- **Medallion** — Prefer / default **`size="lg"`** (`design-language/ontology/medallion.md`).
- **Icon-only Buttons** — Always **square**; use **`size="icon"`** (44×44) next to default controls; glyph sizes in `design-language/semantics/button-icon-size.md`.
- **Stacked bar charts** — Touching segment ends **radius 0** (`design-language/semantics/stacked-bar-radius.md`).
- **Right Sheet / Drawer inspectors** — **Required** **Header → Body → Footer**; Body scrolls (`SheetBody` / `DrawerBody`); side footer actions horizontal. Prefer Sheet for desktop. Copy `ai/examples/right-side-inspector.tsx` (`design-language/ontology/sheet.md`, `drawer.md`, `semantics/right-side-panel.md`).

**FAIL IF:** freeform children only under Content; stacked side-footer buttons; body pushes Footer off-screen.

- **AppShell listview** — **Required** width **`listviewWidth` 320–480px** (default 320, based on content need); **`Toolbar`** titlebar (name/count in `ToolbarTitle` / `ToolbarDescription`) + optional `SearchInput` (`inputSize="sm"`) with **Required 4px** padding on all sides around the field **and** `border-b` on the wrapper; entities are **`Item`** (dense: `appearance="list"` + `ItemGroup gap-0` + one trailing compact `Status`) **or** **`Card`**. Copy `ai/examples/detail-with-listview.tsx` (`design-language/semantics/listview-drives-main.md`).

**FAIL IF:** width outside 320–480; custom title/count header instead of Toolbar; ad-hoc entity rows instead of Item/Card; listview SearchInput without 4px pad or bottom border.

## Imports

```tsx
import { AppShell, Button, Card, Menu } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

Do not import from `src/components/ui/*`, `dist/*`, `@/*`, or `*-base` / `*-core` / `*-theme` / `*-uds` modules.
