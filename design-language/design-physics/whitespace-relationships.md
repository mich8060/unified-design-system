---
id: whitespace-relationships
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
  - whitespace
  - proximity
  - density
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - philosophy
influences:
  - whitespace
  - proximity
  - density
conflicts_with:
  []
alternatives:
  []
---
# White space communicates relationships

## What

White space communicates relationships.

## Why

Gaps are signals. Equal whitespace erases structure; intentional whitespace defines groups.

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- whitespace
- proximity
- density

### Requires

- Philosophy

### Influences

- whitespace
- proximity
- density

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

- [whitespace](../semantics/whitespace.md)
- [proximity](../semantics/proximity.md)
- [density](../semantics/density.md)
