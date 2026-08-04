---
id: choosing-elevation
category: decision
type: rule
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - elevation
  - elevation-scale
  - shadows
  - dialogs
components:
  - Dialog
  - DropdownMenu
  - Card
patterns:
  - dialogs
  - cards
tokens: []
depends_on:
  - elevation
influences:
  - dialogs
conflicts_with:
  - visual-noise
alternatives: []
---

# Choosing elevation

## What

When to raise a surface with shadow/elevation tokens.

## How AI should reason

1. Default page content → flat / base surface (no competing shadows).
2. Overlay (dialog, menu, popover) → elevated token already on the component.
3. Card → prefer border/surface separation before heavy shadow.
4. Do not stack multiple elevated cards for decoration.

Confidence: Preferred — Prefer semantic component elevation over custom box-shadow.

## Relationships

### Supports

- Overlay discoverability

### Requires

- Elevation foundation

### Influences

- Dialogs, menus

### Uses

- Shadow / elevation tokens

### Conflicts With

- Visual noise

### Alternatives

- Border separation on cards

### Depends On

- elevation

### Referenced By

- foundations/elevation.md

## See also

- [Elevation](../foundations/elevation.md)
- [Dialogs tree](./trees/dialogs.md)
