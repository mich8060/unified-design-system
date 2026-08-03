---
id: selected
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - navigation
  - menu-ontology
  - lists
components:
  - Menu
  - Toggle
  - Item
  - Table
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  - navigation
  - menu-ontology
  - lists
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Selected

## What

Selection state marks the current item in lists, nav, and toggles.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Menu, Toggle, Item, Table.

## UDS implementation

| Surface | Pattern |
|---------|---------|
| Menu item | `data-active` + `aria-current="page"` when route matches |
| Toggle / ToggleGroup | selected styling via component props |
| Listview rows | `Item variant="muted"` for selected; hover/active use surface-secondary/tertiary; keep keyboard focus visible |

## How AI should reason

1. Drive from route/state—not CSS :hover alone.
2. Menu: set active from router.
3. Tables: selected row must remain distinguishable without color-only cues.

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- navigation
- menu-ontology
- lists

### Uses

- Menu
- Toggle
- Item
- Table

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [navigation](../patterns/navigation.md)
- [menu-ontology](../ontology/menu.md)
- [lists](../patterns/lists.md)
