---
id: glossary
category: index
type: index
priority: high
ai_priority: high
confidence_default: preferred
related:
  - design-language-readme
  - philosophy
  - front-matter-schema
components: []
patterns: []
tokens: []
depends_on: []
influences: []
conflicts_with: []
alternatives: []
---

# Glossary

| Term | Definition |
|------|------------|
| **DSL** | Design System Language — layered why/when knowledge in `design-language/` plus contracts |
| **UDS** | Unified Design System — `@chghealthcare/unified-design-system` |
| **Token** | Named design decision as `--uds-*` CSS variable or Figma variable |
| **Semantic color** | Role-based color (`--uds-text-primary`, `--uds-surface-primary`) not raw palette step |
| **Design physics** | Universal principles (proximity, weight, stability…) underlying semantics |
| **Semantics** | Meaning concepts (hierarchy, density, affordance, intent…) |
| **Grammar** | Valid containment (Experience → Token; AppShell regions) |
| **Ontology** | Knowledge object (is-a, requires, uses, appears-in…) |
| **AppShell** | Authenticated product layout with menu, header, main, optional listview/footer |
| **Menu** | Canonical sidebar rail; use in `AppShell.menu`, not ad-hoc `Sidebar*` unless you own rail CSS |
| **Recipe** | Screen pattern in `ai/recipes/` with matching `ai/examples/` fixture |
| **Decision tree** | Branching reasoning doc under `decision-rules/trees/` |
| **Confidence** | Required / Strong Recommendation / Optional — strength of a rule |
| **First-party** | CHG-specific components (Menu, Medallion, Status, AppShell) in the contract |
| **Radius cap** | Rectangular surfaces ≤ 12px; `rounded-full` only for true circles/pills |

## Relationships

### Supports

- Shared vocabulary for humans and AI

### Requires

- —

### Influences

- All DSL docs

### Uses

- —

### Conflicts With

- —

### Alternatives

- —

### Depends On

- —

### Referenced By

- design-language/README.md

## See also

- [README](./README.md)
- [Front matter schema](./_meta/front-matter-schema.md)
