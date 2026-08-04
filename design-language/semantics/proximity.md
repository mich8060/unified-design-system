---
id: proximity
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - proximity-physics
  - spacing
  - grouping
  - density
  - laws-of-ux
components:
  - Button
  - Field
  - ButtonGroup
patterns:
  - forms
  - dialogs
tokens:
  - --uds-space-8
  - --uds-space-16
depends_on:
  - proximity-physics
  - spacing
influences:
  - grouping
  - choosing-spacing
conflicts_with:
  - spacing-mistakes
alternatives:
  []
---
# Proximity

## What

Related objects sit closer together than unrelated objects. Distance encodes relationship.

## Why

Gestalt proximity is how users parse structure before reading labels.

## When

Apply between label↔control, related actions, and row metadata. Increase gap between unrelated sections.

## How AI should reason

1. Identify related pairs (label+input, primary+secondary action).
2. Use smaller token steps within the pair; larger between groups.
3. Do not use equal gaps everywhere—that erases structure.

Confidence: Required — Use spacing tokens (`--uds-space-*`), never ad-hoc pixel stacks that fight the scale.


## Relationships

### Supports

- Grouping
- Forms
- Whitespace meaning

### Requires

- Spacing foundation

### Influences

- Density
- Choosing spacing

### Uses

- Spacing tokens
- ButtonGroup

### Conflicts With

- Spacing mistakes (uniform gaps)

### Alternatives

- —

### Depends On

- Design physics: proximity

### Referenced By

- design-physics/proximity.md



## See also

- [Proximity physics](../design-physics/proximity.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Law of Proximity
- [Spacing](../foundations/spacing.md)
