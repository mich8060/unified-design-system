---
id: page-header-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - section-header-ontology
  - choosing-components
  - stacked-text
  - navigation
  - appshell-body-surface
  - appshell-main-containment
  - main-content-ontology
  - grammar-regions
  - search
  - filters
  - toolbar-action-slots
components:
  - PageHeader
  - MainContent
  - AppShell
  - Breadcrumb
  - Button
  - DropdownMenu
patterns:
  - detail-pages
  - lists
  - tables
tokens:
  - --uds-gap-12
  - --uds-gap-16
  - --uds-gap-24
  - --uds-spacing-12
  - --uds-spacing-24
depends_on:
  - grammar-hierarchy
  - stacked-text
  - toolbar-action-slots
influences:
  - detail-pages
conflicts_with:
  []
alternatives:
  - section-header-ontology
design_intent:
  - navigation
  - discovery
  - scanability
---
# Page Header

## What

`PageHeader` **is-a** module pattern for page-level chrome. **Only `PageHeaderTitle` is required** — nav, eyebrow, description, and actions are optional.

## API (system facts)

| Slot / prop | Required? | Role |
|-------------|-----------|------|
| `PageHeaderTitle` | **Yes** | Page title (heading/28/semibold, h1) — **largest** headline on the page |
| `layout` | No | `inline` (default) or `block` — placement relative to MainContent |
| `appearance` | No | `default` (block pad **24px**) or `expanded` (block pad **48px**) |
| `actionsPlacement` | No | `trailing` (default) — beside title stack on `lg+`; wraps below description with **≥16px** gap on mobile/tablet; `below` — under description with **24px** gap (all breakpoints) |
| `PageHeaderNav` | No | Back + breadcrumb — nested `Breadcrumb` defaults to `size="compact"` (body/12). **24px** gap below nav to the title stack (eyebrow / title). |
| `PageHeaderEyebrow` | No | Overline above title |
| `PageHeaderDescription` | No | Supporting copy (0px below title; max-width **720px**) |
| `PageHeaderActions` | No | Page actions — see action rules below; ≥12px gaps; placement via `actionsPlacement` |
| `PageHeaderBody` / `PageHeaderContent` | Layout | Wrap title stack + optional actions |

Root is `w-full` + `flex: 1`. Distinct from app-chrome `Header` and lighter `SectionHeader`.

### Actions slot (`PageHeaderActions`)

Follow [`toolbar-action-slots`](../semantics/toolbar-action-slots.md) (same rules as `FilterbarActions`):

1. **Exactly one** primary `Button` (at least one, only one).
2. Use **default-size** Buttons for labeled actions.
3. If more than **three** buttons, add a **three-dots** (`DotsThree*` icon) control with an action menu for the rest — **always last on the right**, with **`weight="bold"`** (not `fill`).

**Preferred:** Do **not** put `Badge` (or Status-as-badge chrome) in `PageHeaderActions`. That slot is for **actions** (Buttons / overflow menu). Put counts, state, or labels near the title stack (`PageHeaderTitle` / description / content), not in the actions region.

**Placement** via `actionsPlacement` on `PageHeader`:

| Value | Behavior |
|-------|----------|
| `trailing` (default) | **`lg+`:** same row as the title stack, end-aligned and vertically centered. **Below `lg` (mobile/tablet):** actions wrap under the description (or title if no description) with **≥16px** gap from `PageHeaderContent` |
| `below` | Actions sit under the description (or title if no description), with **24px** gap from `PageHeaderContent` at all breakpoints |

Do **not** place a `SearchInput` in `PageHeaderActions` — use **`Filterbar`**, filters near the list/table, or app-chrome **`Header`** search.

## Gap to first content (required)

Match the active density: **`appearance="default"`** → **24px** (or ≤16 for denser ops) between the Page Header bottom and the first content item; **`appearance="expanded"`** → **48px** via matching `MainContent appearance="expanded"`. Do **not** stack extra parent `gap` / `mt` on top of that.

| Layout | How the gap to first content is achieved |
|--------|----------------------------------------|
| **Inline** | `PageHeader` `mb` of **24px** below the border — do **not** also add a parent `gap-24` / top margin on the first sibling (that stacks past 24) |
| **Block** | **One** `MainContent` top padding (`appearance="default"` → **24px**, `expanded` → **48px**) — do **not** add `mt` / extra margin under the header |

```tsx
{/* ❌ Too much space — parent gap + header mb = 48px */}
<div className="flex flex-col gap-[length:var(--uds-gap-24)]">
  <PageHeader layout="inline">…</PageHeader>
  <Card>…</Card>
</div>

{/* ✅ ≤24px — rely on PageHeader mb only */}
<>
  <PageHeader layout="inline">…</PageHeader>
  <div className="flex flex-col gap-[length:var(--uds-gap-24)]">
    <Card>…</Card>
  </div>
</>
```

## Layout options (AppShell.Main)

These are the **two main Page Header layouts**. Place `PageHeader` inside **`AppShell.Main`**. Do not use it for app-chrome `Header` / Menu rail.

### 1. Inline — inside the padded page content

`layout="inline"` (default) lives **inside** `MainContent` with the recommended page padding. It flows with sections, cards, and tables. The header uses **24px margin-bottom** (below its bottom border) so there is **at most 24px** between the header and the following content.

```tsx
<AppShell.Main>
  <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
    <PageHeader layout="inline">…</PageHeader>
    <Card>…</Card>
  </MainContent>
</AppShell.Main>
```

### 2. Block — edge-to-edge above the padded page content

`layout="block"` sits **outside** the padded content section — a sibling **above** `MainContent`, spanning **edge to edge** with `AppShell.Main`. Do not nest it inside `MainContent` padding.

Pair with `appearance="default"` (24px block pad) or `appearance="expanded"` (48px block pad). Gap to content comes from `MainContent` padding — match densities (`MainContent appearance="expanded"` with expanded headers).

```tsx
<AppShell.Main>
  <PageHeader layout="block" appearance="expanded">…</PageHeader>
  <MainContent containment="fixed" appearance="expanded">
    <Card>…</Card>
  </MainContent>
</AppShell.Main>
```

| Option | Layout | Relative to padding | Width | Gap to first content |
|--------|--------|---------------------|-------|----------------------|
| **Inline** | `inline` | Inside padded `MainContent` | Content column | **≤24px** (`PageHeader` margin-bottom; no stacked gap) |
| **Block** | `block` | Outside / above padded content | Edge-to-edge with Main | MainContent top padding (`default` 24 / `expanded` 48; no stacked margin) |

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Module / page chrome |
| **contains** | Required title; Optional nav / eyebrow / description; Optional actions (no search) |
| **requires** | A page title |
| **appears in** | Detail pages; list/table screens inside `AppShell.Main` |
| **does-not** | Host collection search or Badges in `PageHeaderActions`; exceed **24px** to first content |
| **alternatives** | SectionHeader (no nav/eyebrow variants) |

## Anti-patterns

- Putting `SearchInput` in `PageHeaderActions` — use `Filterbar` / filters near the collection, or app-chrome `Header` search instead
- Putting `Badge` in `PageHeaderActions` — keep status/count labels with the title stack; actions slot is for Buttons / overflow only
- Nesting `layout="block"` inside padded `MainContent`
- More than **24px** between Page Header bottom and first content (stacked `gap`/`mt` + header `mb` / MainContent padding)
- Multiple primary Buttons, compact labeled Buttons, or 4+ visible Buttons without a three-dots overflow menu in `PageHeaderActions`
- Three-dots control not last on the right, or three-dots icon without `weight="bold"` (do not use `fill`)
- Matching or exceeding the page title size with `SectionHeader` / Card / custom headlines (keep them **≥1 size step smaller**)

## How AI should reason

1. Authenticated page → `AppShell` + `Menu`; put `PageHeader` in `AppShell.Main`.
2. Pick a **main layout option**: **inline** (inside padded content) or **block** (edge-to-edge above padded content).
3. Keep gap from header bottom to first content **≤ 24px** — never stack an extra gap on top of the built-in spacing.
4. Only `PageHeaderTitle` is required; for `PageHeaderActions` follow [`toolbar-action-slots`](../semantics/toolbar-action-slots.md) — one primary, default size, overflow at 4+; prefer **no Badge** in that slot.
5. Keep page title the **largest** type on the page — `SectionHeaderTitle` / `h2` prefer **body/20/semibold** (recommended). See [`hierarchy`](../semantics/hierarchy.md).

Confidence: Preferred — PageHeaderTitle required; ≤24px to first content; one primary action; no SearchInput or Badge in actions.

Confidence: Preferred — Page title largest; other headlines ≥1 size step smaller.

## Relationships

### Supports

- Page-level hierarchy and navigation

### Requires

- A page title

### Influences

- detail-pages

### Uses

- MainContent
- AppShell
- Breadcrumb
- Button

### Conflicts With

- Nesting `layout="block"` inside padded `MainContent`
- SearchInput in `PageHeaderActions`
- >24px between Page Header and first content item

### Alternatives

- SectionHeader (no nav/eyebrow variants)
- Filterbar / Header search (for query UI)

### Depends On

- grammar-hierarchy
- stacked-text

### Referenced By

- ai/indexes/component-index.md

## See also

- [AppShell.Main content containment](../semantics/appshell-main-containment.md)
- [MainContent ontology](./main-content.md)
- [SectionHeader ontology](./section-header.md)
- [Filterbar ontology](./filterbar.md)
- [Toolbar action slots](../semantics/toolbar-action-slots.md)
- [Search](../patterns/search.md)
- [Stacked text](../semantics/stacked-text.md)
- [Ontology index](./README.md)
