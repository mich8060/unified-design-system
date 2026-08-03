---
id: focus
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - focus-order
  - keyboard
  - button-ontology
components:
  - Button
  - Badge
  - Input
  - Dialog
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - focus-order
  - keyboard
  - button-ontology
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Focus

## What

Keyboard focus is visible and predictable on interactive UDS controls.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Button, Badge, Input, Dialog.

## UDS implementation

| Component | Pattern |
|-----------|---------|
| Button | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` |
| Badge | `focus-visible:ring-[3px]` when interactive |
| Tokens | `--uds-focus-ring-width` 2px, border + offset tokens |
| Field | Invalid uses `aria-invalid` / `data-invalid` rings |

## How AI should reason

1. Do not remove focus rings.
2. Prefer focus-visible (mouse users keep clean UI).
3. After Dialog close, restore trigger focus.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- focus-order
- keyboard
- button-ontology

### Uses

- Button
- Badge
- Input
- Dialog

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
- [keyboard](../interactions/keyboard.md)
- [button-ontology](../ontology/button.md)
