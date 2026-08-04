---
id: touch-targets
category: accessibility
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - button-ontology
  - density
  - spacing
  - action-spacing
  - laws-of-ux
  - target-acquisition
  - button-icon-size
components:
  - Button
  - Menu
  - Checkbox
  - Switch
  - "Icon buttons"
patterns:
  - navigation
  - forms
  - tables
tokens:
  - "--uds-gap-8"
  - "--uds-gap-12"
  - "--uds-spacing-8"
depends_on:
  - button-ontology
influences:
  - density
  - tables
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Touch targets

## What

Primary interactive targets meet a **minimum 44×44px** hit area (WCAG 2.5.5 / platform norms).

## Why

Dense ops UIs tempt tiny icon buttons. Undersized targets cause mis-taps and fail a11y reviews.

## When

Buttons, Menu items, row icon actions, checkboxes/switches, pagination controls.

## UDS sizes (Button)

From `button-theme.ts`:

| `size` | Approx height |
|---------|----------------|
| `default` | **h-11 (44px)** — preferred default |
| `sm` | 36px |
| `xs` | 32px |
| `lg` | 52px |
| `icon-xs` | **24×24** (matches `2x-sm`) |
| `icon-sm` | **36×36** (matches `sm`) |
| `icon` | **44×44** (matches `default`) — preferred icon-only |
| `icon-lg` | **52×52** (matches `lg`) |

Icon-only sizes are always square (`width === height`).

Inputs: Default ~44px, Compact/Small ~36px (Figma sync notes).

## How AI should reason

1. Default to Button `size="default"` (44px) for primary actions.
2. Buttons next to `SearchInput` (`FilterbarFilters`) should be **icon-only** at **default** / `icon` height so they align with the search field — not `sm` or labeled text.
3. Dense tables may use `sm` but keep spacing so hit area stays usable (padding/gap).
4. Icon-only: use `icon` sizes + `aria-label`; do not shrink below compact without cause.

Confidence: Required — Primary actions ≥ 44×44px (Button default).

Confidence: Preferred — Prefer default over xs in touch-first portals.


## Relationships

### Supports

- Mobile / hybrid ops tools

### Requires

- Button size scale

### Influences

- Density choices
- Table row actions

### Uses

- Button sizes
- Menu items

### Conflicts With

- Tiny custom icon hit areas

### Alternatives

- Larger invisible padding around compact controls

### Depends On

- button-ontology

### Referenced By

- interactions/hover.md
- semantics/density.md



## See also

- [Target acquisition (Fitts’s Law)](../design-physics/target-acquisition.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
- [Button ontology](../ontology/button.md)
- [Density](../semantics/density.md)
- [Buttons tree](../decision-rules/trees/buttons.md)
