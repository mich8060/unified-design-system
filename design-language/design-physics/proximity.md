---
id: proximity-physics
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - proximity
 - grouping
 - spacing
 - laws-of-ux
 - common-region
components:
 []
patterns:
 []
tokens:
 []
depends_on:
 - philosophy
influences:
 - proximity
 - grouping
 - spacing
conflicts_with:
 []
alternatives:
 []
---
# Related objects move closer together

## What

Related objects move closer together.

## Why

Human vision groups by distance before reading labels. Encoding relationship in space is cheaper than adding borders or cards.

Also known as the **Law of Proximity** — see [`laws-of-ux`](./laws-of-ux.md).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- proximity
- grouping
- spacing

### Requires

- Philosophy

### Influences

- proximity
- grouping
- spacing

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

- [Laws of UX index](./laws-of-ux.md)
- [Common region](./common-region.md)
- [proximity](../semantics/proximity.md)
- [grouping](../semantics/grouping.md)
- [spacing](../foundations/spacing.md)
