---
id: iconography
category: foundation
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - navigation
  - button-ontology
  - button-icon-size
  - affordance
components:
  - Menu
  - Button
  - Badge
  - HouseIcon
patterns:
  - navigation
tokens:
  []
depends_on:
  []
influences:
  - navigation
  - default-navigation
conflicts_with:
  []
alternatives:
  []
---
# Iconography

## What

UDS icons are **Phosphor** glyphs exposed as package icon components (e.g. `HouseIcon`), including Menu `navigationItems`.

## Why

Ad-hoc SVG chevrons and emoji break optical size and brand consistency. Figma uses Icon + INSTANCE_SWAP the same way.

## When

Menu items, Button leading icons, empty states, Badge optional icon.

## Rules

- Import icons from `@chghealthcare/unified-design-system` (published icon components).
- Menu defaults: see `ai/recipes/default-navigation.md` for brand default sets.
- Decorative icons: `aria-hidden` (Menu already does this on nav icons).
- Icon-only Button: require `aria-label`.
- Match icon glyph size to Button size — [`button-icon-size`](../semantics/button-icon-size.md) (12/16/16/20/24).
- Do not use text characters (`>`, `v`) as chevrons.

Confidence: Required — Phosphor via package icons; no ad-hoc SVG chevrons.


## Relationships

### Supports

- Navigation affordance

### Requires

- Package icon exports

### Influences

- Menu
- Buttons

### Uses

- Phosphor icon components

### Conflicts With

- Emoji as UI icons
- Raw SVG chevrons

### Alternatives

- —

### Depends On

- —

### Referenced By

- patterns/navigation.md
- ai/recipes/default-navigation.md



## See also

- [Button icon size](../semantics/button-icon-size.md)
- [Navigation](../patterns/navigation.md)
- [Default navigation recipe](../../ai/recipes/default-navigation.md)
- [Screen readers](../accessibility/screen-readers.md)
