---
id: visual-importance
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - hierarchy
  - visual-weight
  - emphasis
components:
  - SectionHeader
  - Button
  - Badge
patterns:
  - dashboards
tokens:
  []
depends_on:
  []
influences:
  - dashboards
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Visual importance

## What

Visual importance ranks elements by business/user criticality so layout and weight can match.

## Why

Without an importance ranking, hierarchy and emphasis have no input.

## When

Before choosing type size, color role, or placement.

## How AI should reason

1. Rank elements 1–n by criticality.
2. Map rank → hierarchy + visual weight.
3. Demote chrome.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `hierarchy`
- `visual-weight`
- `emphasis`

### Requires

- Philosophy
- Design physics

### Influences

- dashboards

### Uses

- SectionHeader
- Button
- Badge

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

- [hierarchy](./hierarchy.md)
- [visual-weight](./visual-weight.md)
- [emphasis](./emphasis.md)
