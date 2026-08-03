---
id: lists
category: pattern
type: pattern
priority: high
ai_priority: high
confidence_default: preferred
related:
  - tables
  - tables-tree
  - detail-pages
  - density
  - row-dividers
  - listview-drives-main
components:
  - Item
  - ItemGroup
  - Status
  - Badge
  - Medallion
patterns:
  - lists
  - ops-queue-dashboard
  - triage-dashboard
tokens:
  - "--uds-border-primary"
depends_on:
  - intent
influences:
  - ops-queue-dashboard
conflicts_with:
  - visual-noise
alternatives:
  - tables
design_intent:
  - scanability
  - navigation
---

# Lists

## What

Scannable collections using first-party **`Item` / `ItemGroup`** (and similar row patterns)—not multi-column comparison.

## Why

Queues and triage feeds optimize for scan + status + actions. Tables optimize for attribute comparison.

## When

- Ops queues (`ops-queue-dashboard` Item sections)
- Triage panels (`triage-dashboard`)
- Listview master pane (`detail-with-listview`)
- Prefer Table when users must compare many columns

## Reasoning

```
Many items, scan not compare
→ Item / ItemGroup
→ Status + title + meta
→ Optional listview for master–detail
```

Confidence: Preferred — Use Item in queue recipes; don’t Card-wrap every row.

When rendering a **flat row list** (not outlined Item cards), apply [`row-dividers`](../semantics/row-dividers.md): bottom border `--uds-border-primary` on each row except the last.

Confidence: Required — Flat data rows follow row-dividers (primary border; no border on last row).

### AppShell listview (Required)

Master panes in `listview` use **`Toolbar`** as the primary titlebar, then **`Item`** or **`Card`** for each entity. Dense queues: `Item appearance="list"`, `ItemGroup gap-0`, row-dividers, one trailing compact `Status`. Richer entities may use `Card`. See [`listview-drives-main`](../semantics/listview-drives-main.md).

Confidence: Required — Listview titlebar is Toolbar; entities are Item or Card.

## Relationships

### Supports

- Queue scanning

### Requires

- Intent

### Influences

- ops-queue, triage recipes

### Uses

- Item, ItemGroup, Status, Badge, Medallion

### Conflicts With

- Card-per-row noise

### Alternatives

- Table, detail-with-listview

### Depends On

- intent

### Referenced By

- patterns/dashboards.md, tables-tree

## See also

- [Row dividers](../semantics/row-dividers.md)
- [Tables](./tables.md)
- [Ops queue recipe](../../ai/recipes/ops-queue-dashboard.md)
- [Detail pages](./detail-pages.md)
