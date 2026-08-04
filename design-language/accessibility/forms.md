---
id: a11y-forms
category: accessibility
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - forms
  - field-ontology
  - validation
  - accessibility-meaning
components:
  - Field
  - FieldLabel
  - FieldError
  - FieldDescription
  - Input
  - Select
  - Switch
patterns:
  - forms
  - settings-form
tokens:
  []
depends_on:
  - field-ontology
  - validation
influences:
  - settings-form
  - forms
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Accessible forms

## What

Every control is labeled, described, and (when invalid) announced through UDS `Field` chrome—not orphan inputs.

## Why

Settings and credentialing forms are high-stakes. Missing labels or color-only errors fail WCAG and slow agents.

## When

Any `settings-form` recipe, Dialog short forms, filter panels with inputs.

## UDS implementation (`Field`)

From `src/components/ui/field.tsx`:

| Piece | Role |
|-------|------|
| `Field` | `role="group"`; `orientation`: `vertical` \| `horizontal` \| `responsive` |
| `FieldLabel` / `FieldTitle` | Visible name |
| `FieldDescription` | Help text |
| `FieldError` | `role="alert"` |
| `data-invalid="true"` | Destructive text styling on the group |
| Disabled | `group-data-[disabled=true]/field:opacity-50` |

**Recipe:** `ai/recipes/settings-form.md` + `ai/examples/settings-form.tsx`.

## How AI should reason

1. Wrap every control in `Field` + `FieldLabel` (never placeholder-as-label).
2. On error: set invalid state + `FieldError` text (not color alone).
3. Required: indicate in label text or legend—not red border only.
4. Prefer Field over raw `<label>` + Input unless composing a documented exception.

Confidence: Required — Every input has a Field label; errors use FieldError + invalid state.


## Relationships

### Supports

- settings-form
- Dialog forms

### Requires

- Field
- validation states

### Influences

- Form pattern
- errors tree

### Uses

- Field
- FieldLabel
- FieldError
- Input family

### Conflicts With

- Placeholder-only labels
- Color-only errors

### Alternatives

- —

### Depends On

- field-ontology
- validation

### Referenced By

- patterns/forms.md
- interactions/validation.md



## See also

- [Forms pattern](../patterns/forms.md)
- [Validation](../interactions/validation.md)
- [Field ontology](../ontology/field.md)
