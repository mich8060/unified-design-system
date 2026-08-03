---
id: progressive-disclosure
category: physics
type: principle
priority: high
ai_priority: high
confidence_default: preferred
related:
 - detail-pages
 - dialogs
 - density
 - right-side-panel
 - listview-drives-main
 - laws-of-ux
 - choice-complexity
 - cognitive-load
components:
 - Sheet
 - Dialog
patterns:
 - dialogs
 - detail-pages
tokens:
 []
depends_on:
 - philosophy
influences:
 - detail-pages
 - dialogs
 - density
 - right-side-panel
conflicts_with:
 []
alternatives:
 []
---
# Progressive disclosure reduces complexity

## What

Progressive disclosure reduces complexity.

## Why

Showing everything at once overwhelms. Reveal detail as intent narrows (listview → Main, right Sheet inspectors, dialogs).

Also known as applying **Tesler’s Law** (complexity moves, it doesn’t vanish) and reducing **Hick’s** choice cost — see [`laws-of-ux`](./laws-of-ux.md).

## When

Apply whenever composing layout, navigation, motion, or status. Prefer this principle over decorative exceptions.

## How AI should reason

1. Check whether the UI violates this principle.
2. If yes, fix structure (spacing, shell, contrast, disclosure) before restyling.
3. Implement via linked semantics and foundations—not one-off CSS.

Confidence: Preferred — Treat as durable physics unless accessibility or platform constraints require a documented exception.


## Relationships

### Supports

- detail-pages
- dialogs
- density

### Requires

- Philosophy

### Influences

- detail-pages
- dialogs
- density

### Uses

- Foundations
- Semantics

### Conflicts With

- Decorative motion
- Ad-hoc layout

### Alternatives

- —

### Depends On

- philosophy

### Referenced By

- semantics/
- grammar/



## See also

- [Laws of UX index](./laws-of-ux.md)
- [Choice complexity](./choice-complexity.md)
- [Cognitive load](./cognitive-load.md)
- [Right side panel](../semantics/right-side-panel.md)
- [Listview when it drives Main](../semantics/listview-drives-main.md)
- [Detail pages](../patterns/detail-pages.md)
- [Dialogs](../patterns/dialogs.md)
- [Density](../semantics/density.md)
