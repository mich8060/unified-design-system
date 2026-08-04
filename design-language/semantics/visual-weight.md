---
id: visual-weight
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - visual-weight-physics
  - hierarchy
  - emphasis
  - color
components:
  - Button
  - Badge
  - Status
  - Medallion
patterns:
  - dashboards
  - dialogs
tokens:
  - --uds-text-primary
  - --uds-surface-brand
depends_on:
  - visual-weight-physics
influences:
  - hierarchy
  - buttons-tree
conflicts_with:
  - visual-noise
alternatives:
  - urgency
---
# Visual weight

## What

Visual weight is perceived importance from contrast, size, color role, and position—not decoration.

## Why

Important objects must win attention; secondary chrome must recede.

## When

Primary actions, critical status, and page titles carry more weight. Metadata, borders, and icons carry less.

## How AI should reason

1. Rank content: critical → primary → secondary → tertiary.
2. Map to Button appearances, Status/Badge, and text roles.
3. Limit high-weight accents per viewport (usually one primary CTA).

Confidence: Preferred — Prefer semantic color roles over brighter hex hacks.


## Relationships

### Supports

- Hierarchy
- Emphasis
- Primary actions

### Requires

- Color semantics
- Typography

### Influences

- Button decisions
- Dashboard KPIs

### Uses

- Button
- Badge
- Status
- Medallion

### Conflicts With

- Visual noise

### Alternatives

- Urgency (time-critical) when weight alone is insufficient

### Depends On

- Design physics: visual weight

### Referenced By

- decision-rules/trees/buttons.md



## See also

- [Visual weight physics](../design-physics/visual-weight.md)
- [Hierarchy](./hierarchy.md)
