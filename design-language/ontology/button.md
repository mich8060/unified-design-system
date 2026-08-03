---
id: button-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - button-icon-size
components:
  - Button
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - buttons-tree
conflicts_with:
  []
alternatives:
  []
---
# Button

## What

`Button` **is-a** Interactive component (preferred).

## API (system facts)

| Prop | Values |
|------|--------|
| `variant` | default \| outline \| secondary \| ghost \| destructive \| link |
| `size` | default (44px) \| sm (36) \| xs (32) \| lg (52) \| icon* (always square: icon-xs 24, icon-sm 36, icon 44, icon-lg 52) |
| States | hover token surfaces, focus-visible ring-3, disabled opacity-50, active translate |
| Radius | ~4px (`--uds-radius-4`) |
| Icon glyphs | Match Button size — see [`button-icon-size`](../semantics/button-icon-size.md) (12/16/16/20/24) |

Avoid importing `BaseButton` / theme internals (`avoid-directly` in catalog).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Interactive component (preferred) |
| **contains** | Label; Optional icon |
| **requires** | Action intent |
| **uses** | --uds-button-* tokens; focus ring tokens |
| **appears in** | Forms; Dialogs; Cards; Toolbars |
| **supports** | Primary/secondary actions |
| **cannot exist without** | Hover/focus/disabled state machinery |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.
4. Pair icons with Button size per [`button-icon-size`](../semantics/button-icon-size.md).

Confidence: Preferred — Use the published component.


## Relationships

### Supports

- Primary/secondary actions

### Requires

- Action intent

### Influences

- Forms
- Dialogs
- Cards
- Toolbars

### Uses

- --uds-button-* tokens
- focus ring tokens

### Conflicts With

- Bespoke equivalents
- src/components/ui imports

### Alternatives

- See decision trees / choosing-components

### Depends On

- grammar-hierarchy

### Referenced By

- ai/indexes/component-index.md



## See also

- [Button icon size](../semantics/button-icon-size.md)
- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
