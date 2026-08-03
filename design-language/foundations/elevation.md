---
id: elevation
category: foundation
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - choosing-elevation
  - elevation-scale
  - shadows
  - dialogs
components:
  - Dialog
  - DropdownMenu
  - Popover
  - Tooltip
  - Toast
patterns:
  - dialogs
tokens:
  - "--uds-elevation-dropdown"
  - "--uds-elevation-modal"
  - "--uds-elevation-toast"
  - "--uds-elevation-tooltip"
depends_on:
  []
influences:
  - dialogs
  - choosing-elevation
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Elevation

## What

Elevation is the **z-index stacking scale** for overlays (not decorative card shadows alone).

## Token scale (`uds-tokens.css`)

| Token | Value | Typical use |
|-------|------:|-------------|
| `--uds-elevation-base` | 0 | Page |
| `--uds-elevation-sticky` | 100 | Sticky headers |
| `--uds-elevation-dropdown` | 500 | Menus / selects |
| `--uds-elevation-menu` | 1000 | Elevated menus |
| `--uds-elevation-overlay` | 1100 | Backdrops |
| `--uds-elevation-modal` | 1300 | Dialogs |
| `--uds-elevation-toast` | 1400 | Toasts (Sonner) |
| `--uds-elevation-tooltip` | 1500 | Tooltips |

Shadow recipes (`--uds-boxshadow-sm|default|md|lg|xl|2xl|inner`) compose `--uds-shadow-*` color stops.

## How AI should reason

1. Prefer component defaults (Dialog/Dropdown already stack correctly).
2. Do not invent z-index wars on cards inside Main.
3. See choosing-elevation for when shadows vs flat borders.

Confidence: Preferred — Use overlay components; don’t hand-stack z-index on content cards.


## Relationships

### Supports

- Overlay discoverability

### Requires

- Elevation tokens

### Influences

- Dialogs
- Menus

### Uses

- --uds-elevation-*
- --uds-boxshadow-*

### Conflicts With

- Shadow on every Card

### Alternatives

- Border separation for cards

### Depends On

- —

### Referenced By

- choosing-elevation.md



## See also

- [Choosing elevation](../decision-rules/choosing-elevation.md)
- [Shadows](./shadows.md)
- [Elevation scale](../relationships/elevation-scale.md)
