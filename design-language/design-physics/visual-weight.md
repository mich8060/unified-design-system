---
id: visual-weight-physics
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - visual-weight
 - emphasis
 - hierarchy
 - laws-of-ux
 - cognitive-load
components:
 []
patterns:
 []
tokens:
 []
depends_on:
 - philosophy
influences:
 - visual-weight
 - emphasis
 - hierarchy
conflicts_with:
 []
alternatives:
 []
---
# Important objects gain visual weight

## What

Important objects gain visual weight.

## Why

Attention is finite. Weight (contrast, size, position) steers the eye to what matters for the task.

Also known as **Selective Attention** and the isolation side of **Von Restorff** — see [`laws-of-ux`](./laws-of-ux.md).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- visual-weight
- emphasis
- hierarchy

### Requires

- Philosophy

### Influences

- visual-weight
- emphasis
- hierarchy

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
- [visual-weight](../semantics/visual-weight.md)
- [emphasis](../semantics/emphasis.md)
- [hierarchy](../semantics/hierarchy.md)
