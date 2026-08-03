---
id: field-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
components:
  - Field
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - a11y-forms
conflicts_with:
  []
alternatives:
  []
---
# Field

## What

`Field` **is-a** Form primitive.

## API (system facts)

| Export | Role |
|--------|------|
| `Field` | `role="group"`; orientation vertical/horizontal/responsive |
| `FieldLabel` / `FieldTitle` | Name |
| `FieldDescription` | Help |
| `FieldError` | `role="alert"` |
| `data-invalid` | Destructive styling |

Compose with Input, Select, Switch, etc.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Form primitive |
| **contains** | Label; Control; Description; Error |
| **requires** | An input control child |
| **uses** | Validation/disabled group styles |
| **appears in** | settings-form; Dialogs |
| **supports** | Accessible forms |
| **cannot exist without** | Product validation rules |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.
4. **Layout:** stack Fields in one column by default. Place Fields in `md:grid-cols-2` only when they are a **related pair** (e.g. first & last name) or the form is **dense** and needs the horizontal space — see [`forms`](../patterns/forms.md).

Confidence: Preferred — Use the published component; prefer stacked field layout.


## Relationships

### Supports

- Accessible forms

### Requires

- An input control child

### Influences

- settings-form
- Dialogs

### Uses

- Validation/disabled group styles

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

- [Ontology index](./README.md)
- [Choosing components](../decision-rules/choosing-components.md)
- [Contract](../../ai/uds-contract.json)
