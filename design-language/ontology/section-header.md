---
id: section-header-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - stacked-text
  - typography
components:
  - SectionHeader
  - Text
patterns:
  []
tokens:
  - --uds-type-body-20-line-tight
  - --uds-type-body-16-line-tight
depends_on:
  - grammar-hierarchy
  - stacked-text
influences:
  - hierarchy
  - headings
conflicts_with:
  []
alternatives:
  []
---
# SectionHeader

## What

`SectionHeader` **is-a** Hierarchy component (first-party).

## API (system facts)

Title + optional description + optional actions. Primary tool for sectioning AppShell.Main content in recipes.

- Root is `w-full` + `flex: 1` so it spans the content width; actions align **vertically centered**.
- Title/description stack with **0px** gap.
- Typography: `SectionHeaderTitle` uses **`lineHeight="tight"`** (**body/20/semibold**, recommended); `SectionHeaderDescription` uses **`lineHeight="loose"`**, body/16/regular, and **`appearance="secondary"`** (`text-secondary`).
- Stay **below** the page title (`PageHeaderTitle` defaults to heading/28) so hierarchy reads page → section. Do not raise section titles to match or exceed the page title.
- `SectionHeaderActions` is an open slot — any action content (buttons, menus, toggles, links).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Hierarchy component (first-party) |
| **contains** | Title; Optional description; Optional actions |
| **requires** | A section to label |
| **uses** | Typography tokens |
| **appears in** | All dashboard recipes; settings-form |
| **supports** | Hierarchy; Headings a11y |
| **cannot exist without** | Routing |

## How AI should reason

1. Confirm this object fits the grammar layer (shell vs pattern vs control).
2. Read API table above + contract catalog for props.
3. Prefer this export over bespoke markup.

Confidence: Preferred — Use the published component.


## Relationships

### Supports

- Hierarchy
- Headings a11y

### Requires

- A section to label

### Influences

- All dashboard recipes
- settings-form

### Uses

- Typography tokens

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
