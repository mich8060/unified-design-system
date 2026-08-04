---
id: appshell-main-containment
category: semantics
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
  - appshell-body-surface
  - grammar-regions
  - appshell-ontology
  - page-header-ontology
  - main-content-ontology
  - page-composition
  - spacing-levels
  - grid
  - density
components:
  - AppShell
  - MainContent
  - PageHeader
  - Card
  - SectionHeader
patterns:
  - dashboards
  - detail-pages
  - forms
tokens:
  - "--uds-surface-secondary"
  - "--uds-surface-primary"
  - "--uds-border-primary"
  - "--uds-container-xl"
  - "--uds-container-main"
  - "--uds-spacing-16"
  - "--uds-spacing-24"
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - appshell-body-surface
  - grammar-regions
  - spacing-levels
influences:
  - page-header-ontology
  - dashboards
  - detail-pages
conflicts_with:
  - layout-mistakes
alternatives: []
design_intent:
  - scanability
  - navigation
---
# AppShell.Main content containment

## What

There are **two** ways to contain page content inside `AppShell.Main`. Both keep the Main canvas as **`--uds-surface-secondary`**.

**Recommended (app-wide):** Pick **edge** or **fixed** (the container layout) once for the product, then use that same mode on every authenticated page. Mixing edge on some routes and fixed on others makes the shell feel inconsistent as users navigate.

## Containment options

| Mode | Canvas | Outer panel | Inner column | Chrome |
|------|--------|-------------|--------------|--------|
| **Edge** | `--uds-surface-secondary` | — (content on canvas) | Full width of Main | None |
| **Fixed** | `--uds-surface-secondary` (shows beside/beyond the panel) | Max **1280px** (`--uds-container-xl`), `--uds-surface-primary`, height follows content (**no min-height**), **no left/right padding** | Max **1000px** (`--uds-container-main`), **left-aligned**, padding from `appearance` (**24** default / **48** expanded) | Outer: **1px** `border-right` only — not a full box |

Use the `MainContent` component:

- `containment="edge"` (default)
- `containment="fixed"` — automatically wraps children in the left-aligned 1000px inner (`data-slot="main-content-inner"`)

## Padding

### Edge

`AppShell.Main` and edge `MainContent` have **no built-in padding**.

**Recommended:** apply **24px** inset with `--uds-spacing-24` on `MainContent`:

```tsx
<MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
```

### Fixed (required usage)

| Layer | Padding | Boxing |
|-------|---------|--------|
| **Outer** 1280px panel | **No left/right padding** (`px-0`). Do not add `px-*` / full `p-*` on the outer for inset. | Surface + **border-right only** — do **not** wrap page content in an extra Card/bordered box |
| **Inner** 1000px column | **24px** on all sides built in (`--uds-spacing-24`) | Content sits on the primary panel; use Card/Sheet/etc. only when that component is **designed** as a box |

```tsx
{/* Fixed — outer has no L/R padding; inner ships with 24px */}
<MainContent containment="fixed">
  <PageHeader layout="inline">…</PageHeader>
  {/* sections on the primary surface — not an extra page-level box */}
</MainContent>
```

The fixed outer panel **grows with its children** (no `min-height`). Do not give it a short fixed height that clips or leaves a stub panel.

## Page body layout (stacked sections)

Before stacking sections, choose a **page pattern and width band** — see [`page-composition`](./page-composition.md) (pre-layout questions, pattern table, width hierarchy). This section covers **geometry and section rhythm** once that choice is made.

When `AppShell.Main` holds **multiple sections** (SectionHeaders, Cards, tables, KPI rows, side panels), compose them so the page does not feel crowded or like one endless vertical stack.

### 1. Gap between stacked sections — 16 or 24px

Between sibling first-level blocks, use **only** `--uds-gap-16` or `--uds-gap-24` ([`spacing-levels`](./spacing-levels.md)). This is required outer rhythm — zero or 8/12 between peer sections reads as cramped.

**Required primitive:** wrap first-level sections under PageHeader in **`MainStack`** (default gap **24**). Override to 16 only for intentional dense ops via `className`.

```tsx
<>
  <PageHeader layout="inline">…</PageHeader>
  {/* ≤24px from header — use PageHeader mb; gap only between following sections */}
  <MainStack>
    <section>…</section>
    <section>…</section>
  </MainStack>
</>
```

| Gap | Prefer when |
|-----|-------------|
| **24px** | Default / airier workspaces |
| **16px** | Denser ops (queues, triage) |

### 2. Required: short regions share a row at `lg+`

Multi-region dashboards and reports **must** use **2–3 columns** at desktop. A single full-width column of every section is **not** allowed when short peers exist.

**Short regions** (Item lists, activity feeds, callouts/CTAs, watchlists, narrow 3–4 column tables) **must share a grid row** with a peer:

- `lg:grid-cols-2` for peers of similar weight, or
- chart / wide table `lg:col-span-2` + short aside in `lg:grid-cols-3`.

**Full-width alone** is allowed only for:

- StatisticCard **KPI rows** (already horizontal),
- **Wide comparison tables** that need many columns (still pair with a short list when one exists),
- A **primary chart** when intentionally hero — still prefer chart | feed when a short peer exists.

**FAIL:** Skinny full-width list / feed / callout / watchlist with large empty horizontal space between left content and right meta. Pairing KPI cards horizontally does **not** satisfy this rule for later sections.

When peer boxes share a row, **match heights** (especially on non-bottom rows) so short cards do not leave mid-page negative space — see [`grid`](../foundations/grid.md). Stretch when Δ **≤ 150px** and density is similar; rebalance content when Δ is larger. Bottom row of the page grid may stay natural height.

```tsx
{/* Short list must share a row — not stacked full-width under the table */}
<div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
  <div>{/* Staffing pipeline Table */}</div>
  <div>{/* Recent placements list */}</div>
</div>

{/* Chart | feed */}
<div className="grid min-w-0 grid-cols-1 gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
  <Card className="lg:col-span-2">…</Card>
  <Card>{/* activity feed */}</Card>
</div>
```

See [`grid`](../foundations/grid.md), [`ai/examples/workspace-dashboard.tsx`](../../ai/examples/workspace-dashboard.tsx), [`ai/examples/analytics-overview.tsx`](../../ai/examples/analytics-overview.tsx).

Confidence: **Required** — Short regions share a row at `lg+` on multi-region dashboards/reports.

### 3. Boxed content needs edge padding

Surfaces with a border / background box (**Card**, primary panels, bordered toolbars) must have **padding around the edges** so content does not touch the box. Prefer package slots (`CardContent`) or explicit `--uds-spacing-16` / `--uds-spacing-24` inset. Do not flush text or controls to the border.

**Runtime:** a naked `Card` (no direct `CardContent` / `CardImage` / `CardFooter` child) auto-applies **16px** padding. Prefer explicit `CardContent` anyway. Tables may use `CardContent className="p-0"` because table cells already inset first/last columns by 16px — keep **one** outer border (the Card); `Table` drops its wrapper border inside `CardContent`.

```tsx
<Card>
  <CardContent className="flex flex-col gap-[length:var(--uds-gap-16)]">
    {/* CardContent already pads; keep inner stacks at 12/16 */}
  </CardContent>
</Card>
```

## Why

Edge layouts suit dense ops / full-bleed tools. Fixed layouts give a primary workspace panel with a secondary gutter on wide viewports, plus a tighter left-aligned reading column (1000px) inside that panel. Section gaps, columns, and box padding keep Main scannable.

## When

Every authenticated page in `AppShell.Main`.

**Recommended:** One containment mode for the whole app — if the product uses the **fixed** container layout, keep `containment="fixed"` across pages; if it uses **edge**, keep `containment="edge"` across pages. Do not switch modes page-to-page without a deliberate product exception (e.g. a rare full-bleed tool that is documented as outside the app standard).

Do not nest fixed inside edge wrappers casually.

## Do

```tsx
{/* Edge — content full width on secondary canvas; ≤24px from header to first content */}
<AppShell.Main>
  <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
    <PageHeader layout="inline">…</PageHeader>
    {/* rely on PageHeader mb — do not wrap header + siblings in an extra gap-24 stack */}
    <div className="grid min-w-0 gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
      <Card><CardContent>…</CardContent></Card>
      <Card><CardContent>…</CardContent></Card>
    </div>
  </MainContent>
</AppShell.Main>

{/* Block PageHeader — edge-to-edge with Main; ≤24px once via MainContent padding */}
<AppShell.Main>
  <PageHeader layout="block">…</PageHeader>
  <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
    {/* page body — no extra mt on the first child */}
  </MainContent>
</AppShell.Main>
```

## Do not

- Recolor `.appshell--main` / `.appshell--body` to surface primary (canvas stays secondary)
- Invent different max-widths than `--uds-container-xl` (1280) / `--uds-container-main` (1000) for this pattern
- Center the fixed inner column — it stays **left-aligned**
- Use a full box border on fixed when the pattern calls for **border-right only**
- Add left/right padding on the **fixed outer** panel, or wrap the whole fixed page in an extra Card/box
- Strip the built-in **24px** padding from the fixed **inner** 1000px column
- Shorten the fixed panel so it does not span content height
- Assume edge `MainContent` has default padding — it does not; prefer **24px** via `--uds-spacing-24`
- Nest `PageHeader layout="block"` inside padded `MainContent` — keep it outside so it spans Main edge-to-edge
- Stack an extra top margin under a **block** PageHeader on top of content padding (that becomes 48px)
- Put more than **24px** between the Page Header bottom and the first content item (stacked gaps)
- Confuse this with app-chrome `Header` / Menu rail
- Stack every section full-width with little or no gap (crowded single column)
- Flush content to the edges of bordered / filled boxes (missing inset padding)
- Mix `edge` and `fixed` across ordinary product pages (breaks app-wide container consistency)

## Relationship to PageHeader

**Main layout options:**

1. **`PageHeader` `inline`** — inside the padded `MainContent` / page content section; **≤24px** to following content via header `mb` (below the bottom border).
2. **`PageHeader` `block`** — **outside** that padded section; sibling above `MainContent`, edge-to-edge with `AppShell.Main`. Gap to content is **≤24px once** (`MainContent` padding) — no extra top margin on the content body.

**Required:** never more than **24px** between the bottom of the Page Header and the first content item. Do not stack parent `gap` / `mt` on top of the header’s built-in spacing.

See [`page-header-ontology`](../ontology/page-header.md).

## How AI should reason

1. Authenticated layout → `AppShell` + `Menu`; canvas is surface secondary.
2. Reuse the app’s established containment mode (**edge** or **fixed**) — do not invent a different mode for this page.
3. Answer [`page-composition`](./page-composition.md) pre-layout questions; pick pattern + width band **within** that mode.
4. **Edge:** recommend **24px** padding on `MainContent`. **Fixed:** no L/R padding on the outer; rely on the inner’s built-in **24px**; do not add an extra page-level box; panel spans content height.
5. Stack first-level sections with **`MainStack`** (gap 24); **Required:** short regions share a row at `lg+` (lists/feeds/callouts/watchlists — not full-width alone).
6. Give designed boxed surfaces (Card, etc.) edge padding — not a wrapper box around the whole fixed page.
7. Pick a Page Header **main layout option**: `inline` inside content, or `block` above content with a **single** ≤24px gap.
8. For fixed, do not add another max-width wrapper — the 1000px inner is built in.

Confidence: Preferred — Use `MainContent` for Main containment; fixed = unboxed outer + padded 1000px inner.

Confidence: Strong Recommendation — Keep edge vs fixed consistent across the application’s pages.

## See also

- [Page composition](./page-composition.md)
- [AppShell body surface](./appshell-body-surface.md)
- [Spacing levels](./spacing-levels.md)
- [Grid](../foundations/grid.md)
- [AppShell regions](../grammar/regions.md)
- [Page Header ontology](../ontology/page-header.md)
- [MainContent ontology](../ontology/main-content.md)
