---
id: empty-states-tree
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
  - discovery
---
# Decision tree: Empty states

## What

Branching reasoning for **empty states** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[No data?] --> error{Is it an error?}
  error -->|Yes| errors[See errors tree]
  error -->|No| first{First-run / zero items?}
  first -->|Yes| empty[Empty pattern + one primary CTA]
  first -->|No| filters[Clear filters / adjust query]
```

## Reasoning outline

No data?
→ Error → errors tree
→ First-run → Empty + single primary CTA
→ Filters too tight → prompt to clear filters

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
