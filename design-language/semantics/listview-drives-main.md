---
id: listview-drives-main
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - detail-pages
  - grammar-regions
  - appshell-ontology
  - toolbar-ontology
  - choosing-layout
  - layout-tree
  - overflow
  - lists
  - right-side-panel
  - row-dividers
  - density
components:
  - AppShell
  - Menu
  - Toolbar
  - ToolbarCenter
  - ToolbarTitle
  - ToolbarDescription
  - ToolbarStart
  - ToolbarEnd
  - Item
  - ItemGroup
  - Card
  - Status
  - SearchInput
patterns:
  - detail-with-listview
  - detail-pages
  - lists
tokens:
  - "--appshell-listview-width"
  - "--appshell-listview-width-min"
  - "--appshell-listview-width-max"
  - "--uds-border-primary"
depends_on:
  - grammar-regions
  - appshell-ontology
  - toolbar-ontology
  - row-dividers
influences:
  - detail-pages
  - choosing-layout
  - layout-tree
conflicts_with:
  - layout-mistakes
  - visual-noise
alternatives:
  - tables
  - filters
  - right-side-panel
---

# Listview when it drives Main

## What

Use AppShell **`listview`** whenever the content in that pane **controls or changes** what appears in the **main** body (`.appshell--main` / `AppShell.Main`).

If selecting, focusing, or navigating an item in a side collection updates the primary workspace, that collection belongs in **`listview`**—not in Main beside an ad-hoc second column, and not only in the product `Menu`.

## Why

`listview` is the shell’s master–detail contract: stable width, independent scroll, and Main reserved for the affected detail. Putting a driving list inside Main as a DIY split breaks overflow, spatial stability, and the `detail-with-listview` recipe.

## When (required → use listview)

Use `listview` when **any** of these are true:

| Signal | Example |
|--------|---------|
| Selection in the list **changes Main** | Click queue row → detail / editor / preview in Main |
| The list is a **master** for a detail workspace | Inbox, assignments, candidates, tickets |
| Users need the collection **visible while** working in Main | Review queue + open record |
| URL/state ties `selectedId` (or equivalent) to Main content | `/items/:id` with persistent list |

**Recipe:** [`detail-with-listview`](../../ai/recipes/detail-with-listview.md) + [`ai/examples/detail-with-listview.tsx`](../../ai/examples/detail-with-listview.tsx).

## When not (do not force listview)

| Situation | Prefer |
|-----------|--------|
| List/table is the **only** content (nothing in Main depends on a row selection driving a sibling pane) | Table/list **in Main** |
| Filters/search refine the **same** Main collection in place | Filters + list/table in Main |
| Navigation between **pages/apps areas** | `Menu` (product nav)—not listview |
| Dashboard KPIs / cards that don’t master a detail pane | Dashboard recipes in Main |
| **More detail about something already in Main** | Right **`Sheet`** ([`right-side-panel`](./right-side-panel.md))—not listview |

## Usage: SearchInput in listview (Required)

When a **`SearchInput`** is inside AppShell **`listview`**, wrap it with **4px padding on all sides**:

```tsx
<div className="border-b border-border p-[length:var(--uds-spacing-4)]">
  <SearchInput inputSize="sm" placeholder="Search…" aria-label="Search" />
</div>
```

| Rule | Detail |
|------|--------|
| Padding | **4px** all sides — `p-[length:var(--uds-spacing-4)]` (or `p-1`) |
| Wrapper | Prefer a dedicated wrapper under the Toolbar; do **not** put the field flush to the pane edge |
| Bottom border | Keep `border-b` on that wrapper so search separates from the scroll list |

**FAIL IF:** Listview `SearchInput` is flush to the pane (no 4px inset).

Confidence: **Required** — Listview SearchInput always has 4px padding around it.

## Required: listview pane composition

The master pane is **320–480px** wide (`listviewWidth` / `--appshell-listview-width`; default **320**). Choose width from content need — dense `Item` queues stay near 320; longer titles or `Card` entities may need up to **480**. It uses a **`Toolbar` titlebar** as the primary header for the content below, then **`Item` or `Card`** for each entity. Match this structure (see [`ai/examples/detail-with-listview.tsx`](../../ai/examples/detail-with-listview.tsx)):

| Region | Content |
|--------|---------|
| **Pinned titlebar** (`shrink-0`) | **`Toolbar`** — primary header for the list below. Put the queue name in `ToolbarTitle`, count/meta in `ToolbarDescription`; optional actions in `ToolbarStart` / `ToolbarEnd`. Prefer `size="lg"` when title + description stack. |
| **Listview SearchInput** | **Required** when present: **4px** padding on all sides around the field (`p-[length:var(--uds-spacing-4)]`) **and** `border-b` on the wrapper. See [Usage](#usage-searchinput-in-listview-required). |
| **Scroll body** (`data-slot="appshell-listview-scroll"`) | Entity list composed with **`Item`** or **`Card`** — not ad-hoc row chrome |
| **Dense queues (default)** | `Item appearance="list"` + `ItemGroup gap-0` + row-dividers ([`row-dividers`](./row-dividers.md)); `ItemTitle` + `ItemDescription`; **one** trailing `Status` in `ItemActions` (`outlined` + `compact`); selection via `variant="muted"` |
| **Richer entities** | `Card` (+ `CardContent`) when each row needs a card surface (media, multi-line body, grouped actions). Keep selection/focus clear; do not invent custom card chrome |

```tsx
<div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
  <div className="shrink-0">
    <Toolbar size="lg" aria-label="Clinician queue">
      <ToolbarCenter>
        <ToolbarTitle>Clinician queue</ToolbarTitle>
        <ToolbarDescription>6 records</ToolbarDescription>
      </ToolbarCenter>
    </Toolbar>
    <div className="border-b border-border p-[length:var(--uds-spacing-4)]">
      <SearchInput inputSize="sm" placeholder="Search clinician queue…" />
    </div>
  </div>
  <div data-slot="appshell-listview-scroll" className="min-h-0 flex-1">
    <ItemGroup className="gap-0">
      <Item appearance="list" variant={selected ? "muted" : "default"}>
        <ItemContent>
          <ItemTitle>…</ItemTitle>
          <ItemDescription>Specialty · Place</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Status appearance="outlined" size="compact" variant="success">
            Available
          </Status>
        </ItemActions>
      </Item>
    </ItemGroup>
  </div>
</div>
```

**FAIL IF**

- Custom title/count header instead of **`Toolbar`** (titlebar) for the listview pane
- Listview width outside **320–480px** (use `listviewWidth`; values are clamped)
- Listview `SearchInput` without **4px** padding on all sides, or without a **bottom border** on its wrapper
- Ad-hoc entity rows (plain `div` / `button` stacks) instead of **`Item`** or **`Card`**
- Omitting `appearance="list"` on dense Item queues (Item default `appearance="box"` reads as unintended cards)
- `ItemGroup` default `gap-4` on dense list rows (use `gap-0` + row dividers)
- Badge-as-sequence chrome; multiple Status/Badge chips per dense list row
- Title/meta wrapping under or below the trailing Status (uneven row heights) — rely on package `Item appearance="list"` truncation; do not override those away

Confidence: **Required** — Listview uses `Toolbar` as the primary titlebar; entities are `Item` or `Card`.

## How AI should reason

1. Ask: “Does interacting with this collection **change what Main shows**?”
2. If **yes** → `AppShell` `listview={…}` + detail in `AppShell.Main`.
3. Compose the listview pane as **`Toolbar` titlebar (+ optional SearchInput) → `Item` or `Card` entities** in the scroll body.
4. Prefer dense `Item appearance="list"` for queues; use `Card` when the entity needs a richer card surface.
5. If **no** → keep the collection in Main (table/list/dashboard pattern).
6. Never fake master–detail with two flex columns inside Main when listview fits.
7. Honor scroll contract ([`overflow`](../composition/overflow.md)): only Main scrolls; list body uses `data-slot="appshell-listview-scroll"`.

```tsx
<AppShell
  menu={<Menu navigationItems={nav} />}
  listview={<QueueList selectedId={id} onSelect={setId} />}
  enableRouterOutlet={false}
>
  <AppShell.Main>
    <RecordDetail id={id} />
  </AppShell.Main>
</AppShell>
```

Confidence: Required — If the list drives Main content, use AppShell `listview`.

Confidence: Required — Do not implement master–detail as a custom split only inside Main when listview applies.

## Relationships

### Supports

- Master–detail clarity, spatial stability

### Requires

- AppShell regions, overflow/scroll contract

### Influences

- detail-pages, choosing-layout, layout-tree

### Uses

- `listview` prop, `Toolbar` titlebar, `Item` or `Card` entities, SearchInput, Status, Main detail

### Conflicts With

- DIY two-column Main for selection-driven detail
- Putting master collections only in Menu
- layout-mistakes (wrong shell composition)
- Custom listview headers / ad-hoc entity rows (visual-noise)

### Alternatives

- Full collection in Main when selection does not drive a sibling detail pane
- Menu for durable product areas (not record masters)

### Depends On

- grammar-regions, appshell-ontology

### Referenced By

- patterns/detail-pages.md
- decision-rules/choosing-layout.md
- decision-rules/trees/layout.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Toolbar](../ontology/toolbar.md)
- [Row dividers](./row-dividers.md)
- [Right side panel](./right-side-panel.md)
- [Detail pages](../patterns/detail-pages.md)
- [Lists](../patterns/lists.md)
- [Choosing layout](../decision-rules/choosing-layout.md)
- [Layout tree](../decision-rules/trees/layout.md)
- [AppShell regions](../grammar/regions.md)
- [Overflow](../composition/overflow.md)
- [Detail listview recipe](../../ai/recipes/detail-with-listview.md)
