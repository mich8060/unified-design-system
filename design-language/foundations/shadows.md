---
id: shadows
category: foundation
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - elevation
  - choosing-elevation
  - visual-noise
components:
  - Dialog
  - DropdownMenu
  - Card
patterns:
  - dialogs
  - cards
tokens:
  - "--uds-boxshadow-sm"
  - "--uds-boxshadow-md"
  - "--uds-shadow-10"
depends_on:
  - elevation
influences:
  - cards
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Shadows

## What

Shadow tokens (`--uds-shadow-5|8|10|12|15|18|25` and `--uds-boxshadow-*`) support elevation perception for overlays.

## Why

Multi-layer custom shadows create visual noise in dense dashboards. UDS ships recipes.

## When

Overlays (dialog, menu, popover). Cards: prefer border/surface tokens first.

## How AI should reason

1. Do not copy multi-shadow CSS from generic AI layouts.
2. Use component chrome (Dialog already elevated).
3. Cards in `workspace-dashboard` / triage: flat + border unless product already uses shadow.

Confidence: Preferred — Prefer borders on cards; shadows for overlays.


## Relationships

### Supports

- Elevation

### Requires

- Shadow tokens

### Influences

- Dialogs

### Uses

- --uds-boxshadow-*

### Conflicts With

- visual-noise

### Alternatives

- Border / surface separation

### Depends On

- elevation

### Referenced By

- foundations/elevation.md



## See also

- [Elevation](./elevation.md)
- [Visual noise](../anti-patterns/visual-noise.md)
