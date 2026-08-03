---
id: drag-drop
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - a11y-forms
  - affordance
components:
  - FileUpload
  - FileUploadCards
  - Button
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - a11y-forms
  - affordance
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Drag and drop

## What

Drag-and-drop is optional enhancement; keyboard/file-picker equivalents required.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using FileUpload, FileUploadCards, Button.

## UDS implementation

File upload: use `FileUpload` / `FileUploadCards` (first-party) rather than bespoke drop zones without keyboard path. Provide explicit file picker button.

## How AI should reason

1. Always offer click-to-upload.
2. Announce errors via FieldError/Alert.
3. Do not make drag the only path.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- a11y-forms
- affordance

### Uses

- FileUpload
- FileUploadCards
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

- [a11y-forms](../accessibility/forms.md)
- [affordance](../semantics/affordance.md)
