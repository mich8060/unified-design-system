---
id: keyboard
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - focus-order
  - focus
  - dialogs
components:
  - Dialog
  - Menu
  - DropdownMenu
  - Select
  - Button
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - focus-order
  - focus
  - dialogs
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Keyboard

## What

All pointer actions have keyboard equivalents through UDS/Radix primitives.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Dialog, Menu, DropdownMenu, Select, Button.

## UDS implementation

- Button/Link: Enter/Space activate
- Dialog: Escape closes; Tab cycles within trap
- Menu: arrow keys within nav patterns as implemented; expand/collapse via control
- Select/Combobox/DropdownMenu: Radix keyboard model

## How AI should reason

1. Do not replace Radix/UDS overlays with div menus.
2. Ensure custom listview rows are focusable buttons/links if clickable.
3. See focus-order for tab sequence.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- focus-order
- focus
- dialogs

### Uses

- Dialog
- Menu
- DropdownMenu
- Select
- Button

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [focus-order](../accessibility/focus-order.md)
- [focus](../interactions/focus.md)
- [dialogs](../patterns/dialogs.md)
