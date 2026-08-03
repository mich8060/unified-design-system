---
id: tables-tree
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
  - scanability
  - comparison
---
# Decision tree: Tables

## What

Branching reasoning for **tables** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Many items?] --> compare{Need comparison across attributes?}
  compare -->|Yes| table[Table]
  compare -->|No| scan{Need fast scanning / actions?}
  scan -->|Yes| list[List / Item rows]
  scan -->|No| cards[Cards only if each item is a task container]
```

## Reasoning outline

Many items?
→ Compare attributes → Table
→ Scan + row actions → List / Item
→ Each item is a rich task container → Cards (sparingly)

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
