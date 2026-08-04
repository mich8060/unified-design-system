---
id: alignment-order
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
  - alignment
  - forms
  - tables
  - grid
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - philosophy
influences:
  - alignment
  - forms
  - tables
  - grid
conflicts_with:
  []
alternatives:
  []
---
# Alignment creates order

## What

Alignment creates order.

## Why

Shared edges form implicit grids the eye trusts, speeding scan of forms and tables. Shared **bottom edges** on peer boxes in a row (especially non-bottom rows) reduce mid-page negative space — stretch when heights are within **150px**, rebalance when larger; bottom row may stay natural — see [`grid`](../foundations/grid.md).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- alignment
- forms
- tables

### Requires

- Philosophy

### Influences

- alignment
- forms
- tables

### Uses

- Foundations
- Semantics

### Conflicts With

- Decorative motion
- Ad-hoc layout

### Alternatives

- —

### Depends On

- philosophy

### Referenced By

- semantics/
- grammar/



## See also

- [alignment](../semantics/alignment.md)
- [forms](../patterns/forms.md)
- [tables](../patterns/tables.md)
