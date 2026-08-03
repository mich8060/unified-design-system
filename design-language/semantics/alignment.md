---
id: alignment
category: semantics
type: concept
priority: high
ai_priority: medium
confidence_default: preferred
related:
  - alignment-order
  - grid
  - forms
  - tables
components:
  - Field
  - Table
  - ButtonGroup
patterns:
  - forms
  - tables
  - dashboards
tokens:
  []
depends_on:
  - alignment-order
influences:
  - forms
  - tables
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Alignment

## What

Alignment creates shared edges and columns so the eye finds order quickly.

## Why

Misaligned labels, values, and actions increase scanning cost and look unfinished.

## When

Forms (label/control columns), tables (value columns), toolbars (action clusters), and dashboard KPI rows / card grids.

## Grid box heights

When peer boxes share a grid row, **match heights** (esp. non-bottom rows) — stretch if Δ **≤ 150px**, rebalance content when larger — see [`grid`](../foundations/grid.md). Bottom row may stay natural; never stretch into >150px empty voids.

## How AI should reason

1. Pick a grid or column model for the region.
2. Align related labels/values on a shared edge.
3. Keep primary actions aligned consistently across sections.
4. Stretch near-equal peer boxes (height delta ≤ 150px) so bottoms align.

Confidence: Preferred — Prefer UDS Field/Table layout over custom absolute positioning; equalize near-height grid boxes.


## Relationships

### Supports

- Forms
- Tables
- Perceived quality

### Requires

- Grid / layout grammar

### Influences

- Layout decision tree

### Uses

- Field
- Table
- ButtonGroup

### Conflicts With

- Layout mistakes

### Alternatives

- —

### Depends On

- Alignment-order physics

### Referenced By

- design-physics/alignment-order.md



## See also

- [Alignment physics](../design-physics/alignment-order.md)
- [Grid](../foundations/grid.md)
