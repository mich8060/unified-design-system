---
id: affordance
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - focus
  - hover
  - disabled
  - intent
  - laws-of-ux
components:
  - Button
  - Link
  - Input
  - Menu
patterns:
  - navigation
  - forms
tokens:
  []
depends_on:
  []
influences:
  - navigation
  - forms
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Affordance

## What

Affordance is the perceived possibility of action—controls look and behave like things you can use.

## Why

Users should not guess what is clickable. Fake affordances and missing states erode trust.

## When

All interactive components: buttons, links, inputs, tabs, menu items.

## How AI should reason

1. Prefer real UDS interactive components over styled divs.
2. Ensure hover/focus/disabled/pressed states exist.
3. Icons alone are not enough—label actions.

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `focus`
- `hover`
- `disabled`
- `intent`

### Requires

- Philosophy
- Design physics

### Influences

- navigation
- forms

### Uses

- Button
- Link
- Input
- Menu

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

- [focus](../interactions/focus.md)
- [hover](../interactions/hover.md)
- [disabled](../interactions/disabled.md)
- [intent](./intent.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Aesthetic-Usability Effect (polish helps; not an excuse for noise)
