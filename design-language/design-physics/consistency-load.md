---
id: consistency-load
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - philosophy
 - choosing-patterns
 - dsl-principles
 - dominant-variant
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
 - philosophy
 - choosing-patterns
 - dsl-principles
 - dominant-variant
conflicts_with:
 []
alternatives:
 []
---
# Consistency reduces cognitive load

## What

Consistency reduces cognitive load.

## Why

Reusing patterns and components means users transfer learning across CHG products.

Also known as **Jakob’s Law** (prefer familiar patterns) and contributes to lower **cognitive load** — see [`laws-of-ux`](./laws-of-ux.md).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

**Component variants:** When one variant is already prevalent on the screen or in the product, stick with that style unless the problem requires a different treatment — [`dominant-variant`](../semantics/dominant-variant.md).

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Match the **dominant** component variant already on the page (or the package preferred default) — do not mix variants for decoration.
4. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- philosophy
- choosing-patterns
- dsl-principles

### Requires

- Philosophy

### Influences

- philosophy
- choosing-patterns
- dsl-principles

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
- [Cognitive load](./cognitive-load.md)
- [philosophy](../philosophy.md)
- [choosing-patterns](../decision-rules/choosing-patterns.md)
- [dsl-principles](../principles.md)
