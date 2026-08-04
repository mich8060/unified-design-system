---
id: disabled
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - validation
  - affordance
  - a11y-forms
components:
  - Button
  - Field
  - Input
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - validation
  - affordance
  - a11y-forms
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Disabled

## What

Disabled controls are non-interactive and visually muted via component disabled styles.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Button, Field, Input.

## UDS implementation

| Component | Pattern |
|-----------|---------|
| Button | `disabled:cursor-not-allowed disabled:opacity-50` + disabled surface/text tokens (keep pointer events so the not-allowed cursor and `title` tooltips work) |
| Field | `group-data-[disabled=true]/field:opacity-50` |
| Surfaces | `--uds-surface-disabled`, `--uds-text-disabled`, `--uds-border-disabled` |

## How AI should reason

1. Use the `disabled` prop—do not only gray with CSS.
2. Prefer explaining why via FieldDescription when a primary action is disabled.
3. Disabled ≠ read-only; use read-only inputs when value must remain focusable.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- validation
- affordance
- a11y-forms

### Uses

- Button
- Field
- Input

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [validation](../interactions/validation.md)
- [affordance](../semantics/affordance.md)
- [a11y-forms](../accessibility/forms.md)
