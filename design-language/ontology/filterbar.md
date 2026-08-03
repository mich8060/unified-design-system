---
id: filterbar-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - lists
  - tables
  - touch-targets
  - toolbar-action-slots
  - page-header-ontology
  - appshell-main-containment
  - appshell-body-surface
components:
  - Filterbar
  - SearchInput
  - Button
  - DropdownMenu
patterns:
  - lists
  - tables
  - filters
tokens:
  - --uds-gap-12
  - --uds-spacing-10
  - --uds-surface-primary
  - --uds-surface-secondary
depends_on:
  - grammar-hierarchy
  - toolbar-action-slots
influences:
  - lists
  - tables
conflicts_with:
  []
alternatives:
  - section-header-ontology
design_intent:
  - discovery
  - navigation
  - scanability
---
# Filterbar

## What

`Filterbar` **is-a** module pattern for list/table toolbars: search + filter/sort controls, trailing page actions, and optional applied facets.

## SearchInput surface (Required)

Choose `SearchInput` **`surface`** so the field **contrasts** with the background behind the Filterbar:

| Parent background | SearchInput `surface` | Field looks |
|-------------------|----------------------|-------------|
| Gray (`--uds-surface-secondary`) — e.g. edge Main canvas | **`primary`** | White |
| White (`--uds-surface-primary`) — e.g. fixed MainContent panel, Card | **`secondary`** (default) | Gray |

```tsx
{/* Gray canvas (edge) → white field */}
<MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
  <Filterbar>
    <FilterbarToolbar>
      <FilterbarSearch>
        <SearchInput surface="primary" placeholder="Search…" aria-label="Search" />
        …
      </FilterbarSearch>
    </FilterbarToolbar>
  </Filterbar>
</MainContent>

{/* White panel (fixed) → gray field (default) */}
<MainContent containment="fixed">
  <Filterbar>
    <FilterbarToolbar>
      <FilterbarSearch>
        <SearchInput placeholder="Search…" aria-label="Search" />
        …
      </FilterbarSearch>
    </FilterbarToolbar>
  </Filterbar>
</MainContent>
```

**FAIL IF:** Gray SearchInput on a gray canvas, or white SearchInput on a white panel (field disappears into the background).

## API (system facts)

| Slot | Role |
|------|------|
| `FilterbarToolbar` | Top row |
| `FilterbarSearch` | Left: `SearchInput` (default **500px**) + filters |
| `FilterbarFilters` | Icon-only controls **immediately after** search — default/`icon` size, left-aligned |
| `FilterbarActions` | Trailing page/collection actions — see action rules below |
| `FilterbarFacets` | Open slot for applied filters — prefer soft `Button variant="secondary"` |
| `FilterbarFacet` | Optional soft dismissible Button helper |

`FilterbarFilters`, `FilterbarActions`, and `FilterbarFacets` are layout-only slots (flex + ≥12px gap). For active facets, use soft buttons (`variant="secondary"`, typically `size="sm"` with a trailing dismiss icon) — facet chips are **not** subject to the actions-slot primary rules.

### Buttons next to search (`FilterbarFilters`)

Recommended:

1. **Icon-only** Buttons (`size="icon"`) — not labeled text buttons.
2. **Default size** band so height **aligns with `SearchInput`** (~44px) — not `sm` / `icon-sm`.
3. **Left-aligned immediately after** the search field inside `FilterbarSearch` (do not push them to the trailing actions slot).
4. Always provide an **`aria-label`**.

```tsx
<FilterbarSearch>
  {/* surface="primary" when Filterbar sits on gray; omit / secondary on white */}
  <SearchInput surface="primary" placeholder="Search…" aria-label="Search" />
  <FilterbarFilters>
    <Button type="button" variant="outline" size="icon" aria-label="Filters">
      <SlidersIcon className="size-5" weight="bold" aria-hidden />
    </Button>
    <Button type="button" variant="outline" size="icon" aria-label="Sort">
      <SortAscendingIcon className="size-5" weight="bold" aria-hidden />
    </Button>
  </FilterbarFilters>
</FilterbarSearch>
```

### Actions slot (`FilterbarActions`)

Follow [`toolbar-action-slots`](../semantics/toolbar-action-slots.md) (same rules as `PageHeaderActions`):

1. **Exactly one** primary `Button` (at least one, only one).
2. Use **default-size** Buttons for labeled actions.
3. If more than **three** buttons, add a **three-dots** (`DotsThree*` icon) control with an action menu for the rest — **always last on the right**, with **`weight="bold"`** (not `fill`).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Module / toolbar pattern |
| **contains** | SearchInput; Buttons; Facet chips |
| **requires** | A searchable or filterable collection |
| **appears in** | Lists; Tables; Queues |
| **does-not** | Replace AppShell Header (app chrome) |

## Anti-patterns

- Packing icon buttons with gaps under 12px
- Building an ad-hoc flex toolbar when `Filterbar` fits
- Multiple primary Buttons, compact labeled Buttons, or 4+ visible Buttons without a three-dots overflow menu in `FilterbarActions`
- Three-dots control not last on the right, or three-dots icon without `weight="bold"` (do not use `fill`)
- Compact/`sm` Buttons next to `SearchInput` that misalign with the search field height
- Labeled text Buttons in `FilterbarFilters` (use icon-only)
- Placing search-adjacent filter icons in `FilterbarActions` instead of immediately after the input
- SearchInput surface matching the parent (no contrast) — gray-on-gray or white-on-white

## How AI should reason

1. Reach for `Filterbar` before building an ad-hoc flex toolbar above a list or table.
2. Set `SearchInput` **`surface`** from the parent: gray canvas → `primary`; white panel → `secondary` (default).
3. Put **icon-only, default-size** Buttons in `FilterbarFilters` immediately after `SearchInput` (left-aligned).
4. Page-level actions in `FilterbarActions` per [`toolbar-action-slots`](../semantics/toolbar-action-slots.md).
5. Render applied filters as soft secondary buttons in `FilterbarFacets`, not raw chips.
6. Keep gaps ≥12px between all Filterbar children.

Confidence: Preferred — Icon-only default-size filters after search; one primary in FilterbarActions.

Confidence: Required — SearchInput surface contrasts with the Filterbar background (gray parent → white field; white parent → gray field).

## Relationships

### Supports

- Lists
- Tables

### Requires

- A searchable or filterable collection

### Influences

- lists
- tables

### Uses

- SearchInput
- Button

### Conflicts With

- Ad-hoc flex toolbars
- Sub-12px control gaps
- Compact or labeled text buttons beside SearchInput

### Alternatives

- SectionHeader (no search/filter slots)

### Depends On

- grammar-hierarchy

### Referenced By

- patterns/lists.md
- patterns/tables.md
- patterns/filters.md

## See also

- [Toolbar action slots](../semantics/toolbar-action-slots.md)
- [Page Header ontology](./page-header.md)
- [Lists pattern](../patterns/lists.md)
- [Tables pattern](../patterns/tables.md)
- [Filters pattern](../patterns/filters.md)
- [Touch targets](../accessibility/touch-targets.md)
- [Ontology index](./README.md)
