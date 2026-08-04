---
id: emphasis
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - visual-weight
  - urgency
  - hierarchy
  - laws-of-ux
  - visual-weight-physics
components:
  - Button
  - Badge
  - Alert
  - Status
patterns:
  - dialogs
  - dashboards
tokens:
  []
depends_on:
  []
influences:
  - dialogs
  - dashboards
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Emphasis

## What

Emphasis is deliberate highlighting of a small set of elements so they stand out from peers.

## Why

Without controlled emphasis, everything shouts and nothing guides action.

## When

Primary CTAs, critical alerts, key KPIs. Not for every icon or badge.

## How AI should reason

1. Cap high-emphasis elements per viewport.
2. Use Button appearance / Status / semantic color—not outlines everywhere.
3. Pair with hierarchy so emphasis reinforces structure.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `visual-weight`
- `urgency`
- `hierarchy`

### Requires

- Philosophy
- Design physics

### Influences

- dialogs
- dashboards

### Uses

- Button
- Badge
- Alert
- Status

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [visual-weight](./visual-weight.md)
- [urgency](./urgency.md)
- [hierarchy](./hierarchy.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Von Restorff / Selective Attention
