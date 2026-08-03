---
id: accessibility-meaning
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - a11y-semantics
  - color-contrast
  - focus-order
  - screen-readers
components:
  - Button
  - Status
  - Field
  - Dialog
patterns:
  - forms
  - dialogs
tokens:
  []
depends_on:
  []
influences:
  - forms
  - dialogs
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Accessibility meaning

## What

Accessibility meaning is the semantic role and name technology exposes—not only visual appearance.

## Why

A green badge that is only color fails. Roles, names, and focus order carry meaning to AT users.

## When

Every interactive and status-bearing UI.

## How AI should reason

1. Use components with correct roles.
2. Do not convey status by color alone.
3. Preserve heading order and focus.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `a11y-semantics`
- `color-contrast`
- `focus-order`
- `screen-readers`

### Requires

- Philosophy
- Design physics

### Influences

- forms
- dialogs

### Uses

- Button
- Status
- Field
- Dialog

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [a11y-semantics](../accessibility/semantics.md)
- [color-contrast](../accessibility/color-contrast.md)
- [focus-order](../accessibility/focus-order.md)
- [screen-readers](../accessibility/screen-readers.md)
