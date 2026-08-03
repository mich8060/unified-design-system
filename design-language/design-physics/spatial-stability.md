---
id: spatial-stability
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
  - information-architecture
  - navigation
  - appshell-ontology
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - philosophy
influences:
  - information-architecture
  - navigation
  - appshell-ontology
conflicts_with:
  []
alternatives:
  []
---
# Navigation remains spatially stable

## What

Navigation remains spatially stable.

## Why

When global nav jumps, users re-orient on every route. Stable AppShell + Menu builds spatial memory.

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- information-architecture
- navigation
- appshell-ontology

### Requires

- Philosophy

### Influences

- information-architecture
- navigation
- appshell-ontology

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

- [information-architecture](../semantics/information-architecture.md)
- [navigation](../patterns/navigation.md)
- [appshell-ontology](../ontology/appshell.md)
