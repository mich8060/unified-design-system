---
id: forms-tree
category: decision
type: tree
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - grammar-rules
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  - intent
influences:
  []
conflicts_with:
  []
alternatives:
  []
design_intent:
  - editing
  - confirmation
---
# Decision tree: Forms

## What

Branching reasoning for **forms** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Collect or edit data?] --> many{Many fields?}
  many -->|No| dialog[Dialog or inline Field]
  many -->|Yes| sections{Many settings sections?}
  sections -->|Yes| navPanel[settings-nav-panel]
  sections -->|No| width{Focused narrow task?}
  width -->|Yes| narrow[narrow-form or prose max-width]
  width -->|No| page[settings-form fixed reading column]
  navPanel --> groups[Group by task]
  narrow --> groups
  page --> groups
  groups --> layout{Related pair or dense form?}
  layout -->|No| stacked[Stack Fields single column]
  layout -->|Yes| cols[md:grid-cols-2 for related or dense groups]
  stacked --> actions[Primary Save + Secondary Cancel]
  cols --> actions
  dialog --> validate[Field validation states]
  actions --> validate
```

## Reasoning outline

Collect/edit data?
→ Few fields + focused decision → Dialog
→ Many settings sections → `settings-nav-panel`
→ Focused single task → `narrow-form` / prose max-width
→ Otherwise → `settings-form` with `MainContent fixed`
→ Group sections → **stack Fields by default**
→ Multi-column only for related pairs (first/last name) or dense forms that need the space
→ Primary save + secondary cancel
→ Always use Field chrome

Confidence: Preferred — Follow the tree; jump to recipes only after intent is classified.


## Relationships

### Supports

- Deterministic AI composition

### Requires

- Intent

### Influences

- Patterns
- Ontology

### Uses

- Grammar
- Semantics

### Conflicts With

- Ad-hoc component soup

### Alternatives

- choosing-patterns for recipe routing

### Depends On

- intent

### Referenced By

- ai/indexes/decision-index.md



## See also

- [Choosing patterns](../choosing-patterns.md)
- [Grammar rules](../../grammar/rules.md)
