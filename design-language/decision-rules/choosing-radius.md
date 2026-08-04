---
id: choosing-radius
category: decision
type: rule
priority: high
ai_priority: high
confidence_default: required
related:
  - corner-radius
  - radius-scale
  - radius-mistakes
  - nested-radius
components:
  - Card
  - Button
  - Dialog
patterns:
  - cards
  - dialogs
tokens:
  - "--uds-radius-4"
  - "--uds-radius-8"
  - "--uds-radius-12"
depends_on:
  - corner-radius
  - nested-radius
influences:
  - cards
conflicts_with:
  - radius-mistakes
alternatives: []
---

# Choosing radius

## What

Pick a radius token by shape role.

## How AI should reason

1. Circle/pill (avatar, dot, pill toggle)? → `9999` / `rounded-full`.
2. Never use a rectangle radius **above 12px**.
3. Routine app chrome? → prefer `--uds-radius-4`.
4. Overlay/menu that already ships 8px? → `--uds-radius-8`.
5. Outermost surface only when needed? → up to `--uds-radius-12`.
6. Nested inside another rounded surface? → pick a **smaller** token than the parent ([`nested-radius`](../semantics/nested-radius.md)).
7. Sibling surfaces at the same level? → **same** token.

Confidence: Required — Rectangles never above 12px; nested-radius for depth and siblings.

## Relationships

### Supports

- Visual consistency

### Requires

- corner-radius

### Influences

- Cards, dialogs

### Uses

- `--uds-radius-*`

### Conflicts With

- radius-mistakes

### Alternatives

- —

### Depends On

- corner-radius

### Referenced By

- foundations/corner-radius.md

## See also

- [Nested radius](../semantics/nested-radius.md)
- [Corner radius](../foundations/corner-radius.md)
- [Radius mistakes](../anti-patterns/radius-mistakes.md)
