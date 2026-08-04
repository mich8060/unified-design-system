---
id: pressed
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - selected
  - button-ontology
components:
  - Button
  - Toggle
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - selected
  - button-ontology
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Pressed

## What

Active/pressed feedback confirms a control engaged.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Button, Toggle.

## UDS implementation

Button: `active:not-aria-[haspopup]:translate-y-px` (subtle press). Menus/dialogs use open state via `data-open` / `aria-expanded`.

## How AI should reason

1. Prefer component built-ins.
2. For toggles use selected/aria-pressed patterns on Toggle/ToggleGroup.
3. Do not fake press with only color if state must persist—use selected.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- selected
- button-ontology

### Uses

- Button
- Toggle

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [selected](../interactions/selected.md)
- [button-ontology](../ontology/button.md)
