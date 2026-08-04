---
id: corner-radius
category: foundation
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - radius-scale
  - choosing-radius
  - radius-mistakes
  - nested-radius
  - stacked-bar-radius
  - nesting
components:
  - Card
  - Button
  - Dialog
  - Input
  - ChartContainer
patterns:
  - cards
  - dialogs
  - dashboards
tokens:
  - "--uds-radius-4"
  - "--uds-radius-8"
  - "--uds-radius-12"
  - "--uds-radius-9999"
depends_on: []
influences:
  - cards
  - dialogs
  - nested-radius
conflicts_with:
  - radius-mistakes
alternatives: []
---

# Corner radius

## What

Token scale: `--uds-radius-0` through `--uds-radius-12`, plus `--uds-radius-9999` for pills/circles.

## Why

A capped radius language keeps CHG UI crisp and prevents “soft blob” rectangles that fight density.

## When

All rectangular chrome. Circles/pills only when the shape is intrinsically round.

## Policy (rectangles ≤ 12px)

- **Never above 12px** on rectangles (`rounded-2xl`, `rounded-[16px]`, `--uds-radius-16+` forbidden in product UI)
- **Prefer 4px** for routine layout, form, and status chrome
- **8px** for overlays/menus that already ship at 8px
- **12px** max only for outermost surfaces when needed—not the default for every card
- **`9999` / full** only for avatars, dots, pill toggles, medallions
- **Nested stacks** → radius **decreases** with depth; **same level → same token** — see [`nested-radius`](../semantics/nested-radius.md)
- **Stacked bar charts** → touching segment ends are **radius 0** — see [`stacked-bar-radius`](../semantics/stacked-bar-radius.md)
- **Content boxes** → pair radius with **`overflow-hidden`** (unless escape/scroll needs otherwise) so children do not spill past rounded corners — see [`overflow`](../composition/overflow.md)

## How AI should reason

1. Is the shape a circle/pill? → `rounded-full` / 9999 allowed.
2. Else cap at 12px; prefer 4px for app chrome.
3. If nesting surfaces, step radius down per [`nested-radius`](../semantics/nested-radius.md).
4. Keep sibling surfaces on one radius token.
5. Use component defaults before overriding radius.
6. On bordered content boxes, prefer `overflow-hidden` so the radius stays optically clean.

Confidence: Required — Rectangular surfaces never above 12px.

Confidence: Required — Follow nested-radius for depth and sibling consistency.

Confidence: Preferred — Content boxes use overflow-hidden with radius.

## Relationships

### Supports

- Consistent chrome

### Requires

- Radius tokens

### Influences

- Cards, dialogs, inputs

### Uses

- `--uds-radius-*`

### Conflicts With

- Radius mistakes

### Alternatives

- —

### Depends On

- —

### Referenced By

- choosing-radius, radius-mistakes

## See also

- [Nested radius](../semantics/nested-radius.md)
- [Choosing radius](../decision-rules/choosing-radius.md)
- [Radius mistakes](../anti-patterns/radius-mistakes.md)
