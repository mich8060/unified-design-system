---
id: navigation-tree
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
  - navigation
  - discovery
---
# Decision tree: Navigation

## What

Branching reasoning for **navigation** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Need navigation?] --> durable{Durable across pages?}
  durable -->|Yes| menu[Menu in AppShell.menu]
  durable -->|No| local{In-page sections?}
  local -->|Yes| tabs[Tabs or in-page anchors]
  local -->|No| crumbs[Breadcrumb / back]
  menu --> brand{Product brand lockup?}
  brand -->|Yes| hvBrand[headerVariant brand]
  brand -->|No| hvTitle[headerVariant title]
```

## Reasoning outline

Need navigation?
→ Durable across pages? → **Menu** in AppShell.menu
→ Page-local only? → Tabs / section nav
→ Trail context? → Breadcrumb
→ Brand lockup? → headerVariant brand vs title

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
