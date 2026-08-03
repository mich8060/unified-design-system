---
id: visual-rhythm
category: relationship
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - spacing-scale
  - typography-scale
  - density
components:
  - SectionHeader
  - Card
patterns:
  - dashboards
  - forms
tokens:
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - spacing-scale
  - typography-scale
influences:
  - dashboards
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Visual rhythm

## What

Repeating spacing + type steps so sections feel measured: field stacks at 12–16 gap, sections at 24–32, titles via SectionHeader.

## Why

Irregular rhythm reads as unfinished and increases scan cost in triage/ops views.

## How AI should reason

1. Pick a vertical rhythm from the spacing scale and stick to it in a page.
2. Match recipe density (workspace vs ops-queue) rather than mixing both.
3. Keep heading sizes consistent across sibling sections.

Confidence: Preferred — Consistent gap steps per page.


## Relationships

### Supports

- Readability
- Density control

### Requires

- Spacing + type scales

### Influences

- Dashboards
- Forms

### Uses

- --uds-gap-16/24
- SectionHeader

### Conflicts With

- visual-noise

### Alternatives

- —

### Depends On

- spacing-scale
- typography-scale

### Referenced By

- patterns/dashboards.md



## See also

- [Spacing scale](./spacing-scale.md)
- [Density](../semantics/density.md)
