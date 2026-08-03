---
id: tables
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - tables-tree
  - lists
  - table-list-ontology
  - density
  - row-dividers
  - borders
  - data-workflow-table
  - page-composition
  - filterbar-ontology
components:
  - Table
  - TableRow
  - TableBody
  - Item
  - Badge
  - Status
  - Button
patterns:
  - tables
  - lists
tokens:
  - "--uds-gap-8"
  - "--uds-spacing-4"
  - "--uds-spacing-8"
  - "--uds-spacing-16"
  - "--uds-spacing-24"
  - "--uds-border-primary"
depends_on:
  - intent
influences: []
conflicts_with:
  - visual-noise
alternatives:
  - lists
  - cards
design_intent:
  - scanability
  - comparison
---

# Tables

## What

Multi-column comparison of many records using `Table`, versus scannable `Item` lists when comparison is not needed.

## Why

Wrong collection pattern wastes space (cards for 200 rows) or hides comparison (paragraphs instead of columns).

## When

Use [tables tree](../decision-rules/trees/tables.md):

| Need | Pattern |
|------|---------|
| Compare attributes across rows | **Table** |
| Fast scan + row actions | **List / Item** |
| Dominant searchable collection | **data-workflow-table** (Filterbar + full-width Table) |
| Persistent master pane | **detail-with-listview** |
| Each item is a rich task container | Cards (sparingly) |

See also [`page-composition`](../semantics/page-composition.md).

## Goal (example)

Compare providers by specialty, status, and start date.

## Reasoning

```
Many items + comparison
→ Table
→ Status/Badge in cells (compact / sm sizes)
→ Cell padding: body py 8px; horizontal 4px; first cell pl 16–24; last cell pr 16–24
→ TableHead ≥ 48px
→ Row actions as ghost/icon Button (prefer icon-sm / sm in dense rows)
→ Trailing action TableHead/TableCell: className="w-0" (hug content at far end)
→ Filters via SearchInput nearby (filters pattern)
```

## UDS notes

- Prefer `Status` / `Badge` in cells over colored text spans.
- **Cell padding:** `TableCell` top/bottom **8px**; horizontal **4px**; **first** cell left **16–24px**; **last** cell right **16–24px**. Package defaults: body `py-8` + first `pl-16` + last `pr-16`. See [`table-list-ontology`](../ontology/table-list.md).
- **Header height:** `TableHead` **≥ 48px** tall so the header row is distinct from denser body rows.
- **Compact in rows:** In table (and dense list) rows, use compact/`sm` variants — e.g. `Status size="compact"`, `Badge size="sm"`, labeled `Button size="sm"`, icon `Button size="icon-sm"` — so default chrome does not crowd cell padding. See [`density`](../semantics/density.md).
- **Trailing actions:** Last column with a button, link, or action icons → `TableHead` / `TableCell` **`className="w-0"`** (or `w-[1%]`) so the column hugs content and stays at the far end of the row. See [`table-list-ontology`](../ontology/table-list.md).
- Dense ops: still keep primary row actions ≥ usable hit area (see touch-targets).
- Don’t wrap every row in Card.
- **Row dividers:** each `TableRow` gets a bottom border in `--uds-border-primary` (`border-border`); the last body row has none — see [`row-dividers`](../semantics/row-dividers.md). Shipped on `TableRow` + `TableBody`.
- **Boxed tables:** Inside `Card` / `CardContent`, keep **one** outer border (the Card). Do not also border the table wrapper — double outlines read as **2px**. Package drops the table outer border inside `CardContent`. See [`borders`](../foundations/borders.md).

Confidence: Preferred — Table for comparison; Item for scan queues; follow cell padding bands.

Confidence: Preferred — Table headers ≥ 48px tall; body cell vertical padding 8px.

Confidence: Preferred — One outline when Table is wrapped in Card (no double border).

Confidence: Strong Recommendation — Compact nested controls in table/list rows.

Confidence: Strong Recommendation — Trailing action columns hug content (`w-0` / `w-[1%]`).

Confidence: Required — Follow row-dividers for table body borders.

## Relationships

### Supports

- Operational comparison

### Requires

- Intent classification

### Influences

- Badge/Status usage

### Uses

- Table, Item, Status, Badge, Button

### Conflicts With

- Card grids for large comparable sets

### Alternatives

- lists, detail-with-listview

### Depends On

- intent

### Referenced By

- decision-rules/trees/tables.md

## See also

- [Page composition](../semantics/page-composition.md)
- [Data workflow table recipe](../../ai/recipes/data-workflow-table.md)
- [Row dividers](../semantics/row-dividers.md)
- [Tables tree](../decision-rules/trees/tables.md)
- [Lists](./lists.md)
- [Table/List ontology](../ontology/table-list.md)
