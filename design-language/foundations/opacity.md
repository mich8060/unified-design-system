---
id: opacity
category: foundation
type: concept
priority: medium
ai_priority: low
confidence_default: preferred
related:
  - disabled
  - shadows
components:
  - Button
  - Field
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - disabled
conflicts_with:
  []
alternatives:
  []
---
# Opacity

## What

Opacity communicates disabled/decorative state. Button/Field use `opacity-50` when disabled; prefer semantic disabled tokens for text/surfaces when available.

## Why

Random opacity on content reduces contrast below WCAG without looking “disabled.”

## When

Disabled controls, decorative overlays—not primary body text.

Confidence: Preferred — Use `disabled` props; don’t fade body copy for hierarchy.


## Relationships

### Supports

- Disabled affordance

### Requires

- Disabled states

### Influences

- Button
- Field

### Uses

- disabled:opacity-50
- disabled tokens

### Conflicts With

- Low-contrast faded text as hierarchy

### Alternatives

- Text appearance secondary/tertiary

### Depends On

- disabled

### Referenced By

- interactions/disabled.md



## See also

- [Disabled](../interactions/disabled.md)
- [Color contrast](../accessibility/color-contrast.md)
