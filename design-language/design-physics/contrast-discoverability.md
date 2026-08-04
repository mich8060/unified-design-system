---
id: contrast-discoverability
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
  - color-contrast
  - affordance
  - readability
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - philosophy
influences:
  - color-contrast
  - affordance
  - readability
conflicts_with:
  []
alternatives:
  []
---
# Contrast increases discoverability

## What

Contrast increases discoverability.

## Why

Low contrast hides controls and status. Adequate contrast makes interactive and critical content findable.

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- color-contrast
- affordance
- readability

### Requires

- Philosophy

### Influences

- color-contrast
- affordance
- readability

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

- [color-contrast](../accessibility/color-contrast.md)
- [affordance](../semantics/affordance.md)
- [readability](../semantics/readability.md)
