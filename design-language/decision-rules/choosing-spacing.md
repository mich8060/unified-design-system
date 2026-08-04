---
id: choosing-spacing
category: decision
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
  - spacing
  - proximity
  - density
  - spacing-scale
  - spacing-levels
  - stacked-text
components:
  - Field
  - Card
patterns:
  - forms
  - dashboards
tokens:
  - "--uds-gap-4"
  - "--uds-gap-8"
  - "--uds-gap-12"
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - spacing
  - proximity
  - spacing-levels
influences:
  - forms
  - dashboards
conflicts_with:
  - spacing-mistakes
alternatives: []
---

# Choosing spacing

## What

Decision aid for picking a spacing token by structural context.

## Why

Equal gaps everywhere erase proximity. Context-aware steps restore structure.

## When

Any padding/gap choice in layout or patterns.

## How AI should reason

1. **Outer / first-level** (around peer items, page inset)? → **16 or 24** only ([`spacing-levels`](../semantics/spacing-levels.md)).
2. **Inner / within an item**? → **12 or 16** only.
3. Then finer cases:

| Context | Token |
|---------|-------|
| Title + description pair | 0 (max 8) — [`stacked-text`](../semantics/stacked-text.md) |
| Inline icon gap | gap-4 |
| Control-internal chrome | gap-8 |
| Field stack inside a card/section | gap-12 or gap-16 |
| Between first-level Cards/sections | gap-16 or gap-24 |

Confidence: Required — Outer first-level gaps are 16 or 24; inner gaps are 12 or 16.

Confidence: Required — Stay on the `--uds-gap-*` scale.

## Relationships

### Supports

- Proximity, readability

### Requires

- Spacing foundation

### Influences

- Forms, dashboards

### Uses

- `--uds-gap-*`

### Conflicts With

- Spacing mistakes

### Alternatives

- —

### Depends On

- spacing, proximity

### Referenced By

- foundations/spacing.md

## See also

- [Spacing levels](../semantics/spacing-levels.md)
- [Spacing](../foundations/spacing.md)
- [Proximity](../semantics/proximity.md)
- [Stacked text](../semantics/stacked-text.md)
