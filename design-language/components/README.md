---
id: components-index
category: component
type: index
priority: high
ai_priority: critical
confidence_default: required
related:
  - ontology-index
  - button-ontology
  - appshell-ontology
components:
  - AppShell
  - Menu
  - Button
  - Card
  - Field
  - Dialog
patterns:
  []
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  []
conflicts_with:
  []
alternatives:
  []
---
# Components

Component **APIs and catalog** live in [`ai/uds-contract.json`](../../ai/uds-contract.json) → `componentCatalog`.

This DSL layer does **not** duplicate props. Use:

| Need | Go to |
|------|--------|
| Relational model (is-a, requires, uses) | [`ontology/`](../ontology/) |
| When to choose which control | [`decision-rules/`](../decision-rules/) |
| Runtime imports | `@chghealthcare/unified-design-system` |

Confidence: Required — Do not invent parallel component docs that drift from the contract.
