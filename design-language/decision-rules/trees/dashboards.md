---
id: dashboards-tree
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
  - discovery
---
# Decision tree: Dashboards

## What

Branching reasoning for **dashboards** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Operational overview?] --> dense{High density ops?}
  dense -->|Queue + calendar| ops[ops-queue-dashboard]
  dense -->|KPI + Item panels| triage[triage-dashboard]
  dense -->|Charts + feed| analytics[analytics-overview]
  dense -->|Provider workflow| provider[provider-portal-home]
  dense -->|Simple KPIs| workspace[workspace-dashboard]
```

## Reasoning outline

Operational overview?
→ Queue + calendar aside → ops-queue-dashboard
→ Dense triage KPI + Items → triage-dashboard
→ Charts + feed → analytics-overview
→ Provider identity + workflow → provider-portal-home
→ Simple KPIs → workspace-dashboard

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
