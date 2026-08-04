---
id: accessibility-mistakes
category: anti-pattern
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - a11y-forms
  - screen-readers
  - color-contrast
  - touch-targets
components:
  - Button
  - Field
  - Status
patterns:
  - forms
tokens:
  []
depends_on:
  []
influences:
  []
conflicts_with:
  - a11y-forms
alternatives:
  []
---
# Accessibility mistakes

## Never

- Clickable `div`/`span` instead of `Button` / `Link`
- Icon-only Button without `aria-label`
- Placeholder-as-label (skip `FieldLabel`)
- Errors shown only as red borders / toast without `FieldError`
- Status by color alone (no text)
- Removing `focus-visible` rings
- Touch targets ≪ 44px for primary actions
- Custom modal without focus trap (skip UDS Dialog)

## Also from contract

- Do not invent parallel buttons/fields/badges/status when package exports exist.

Confidence: Required.


## Relationships

### Supports

- Inclusive UI

### Requires

- UDS components

### Influences

- —

### Uses

- Field
- Button
- Dialog
- Status

### Conflicts With

- a11y-forms (when violated)

### Alternatives

- Published Field/Dialog patterns

### Depends On

- —

### Referenced By

- accessibility/*.md



## See also

- [Accessible forms](../accessibility/forms.md)
- [Screen readers](../accessibility/screen-readers.md)
- [Touch targets](../accessibility/touch-targets.md)
