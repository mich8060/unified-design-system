---
id: validation
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - a11y-forms
  - errors-tree
  - field-ontology
components:
  - Field
  - FieldError
  - Alert
  - Input
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - a11y-forms
  - errors-tree
  - field-ontology
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Validation

## What

Field-level and form-level validation use invalid state + error text.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Field, FieldError, Alert, Input.

## UDS implementation

| Mechanism | Detail |
|-----------|--------|
| Field | `data-invalid="true"` → destructive styling |
| FieldError | `role="alert"` |
| Button/Input | `aria-invalid:border-destructive` + ring |
| Blocking vs soft | Blocking → Alert/Dialog (errors tree); field → FieldError |

## How AI should reason

1. Pair invalid styling with FieldError text.
2. Don’t use toast as the only message for field errors.
3. Follow errors decision tree for page-level failures.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- a11y-forms
- errors-tree
- field-ontology

### Uses

- Field
- FieldError
- Alert
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

- [a11y-forms](../accessibility/forms.md)
- [errors-tree](../decision-rules/trees/errors.md)
- [field-ontology](../ontology/field.md)
