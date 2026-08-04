---
id: elevation-scale
category: relationship
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - elevation
  - choosing-elevation
components:
  - Dialog
  - Tooltip
patterns:
  - dialogs
tokens:
  - "--uds-elevation-base"
  - "--uds-elevation-tooltip"
depends_on:
  - elevation
influences:
  - dialogs
conflicts_with:
  []
alternatives:
  []
---
# Elevation scale

Stacking order (low → high): base (0) → sticky (100) → dropdown (500) → menu (1000) → overlay (1100) → modal (1300) → toast (1400) → tooltip (1500).

Higher elevation must mean true overlay intent (see choosing-elevation). Content cards stay at base.

Confidence: Preferred — Don’t manually assign tooltip z-index to cards.


## Relationships

### Supports

- Overlay clarity

### Requires

- elevation

### Influences

- Dialogs

### Uses

- --uds-elevation-*

### Conflicts With

- z-index wars

### Alternatives

- —

### Depends On

- elevation

### Referenced By

- foundations/elevation.md



## See also

- [Elevation](../foundations/elevation.md)
- [Choosing elevation](../decision-rules/choosing-elevation.md)
