---
id: dsl-principles
category: philosophy
type: principle
priority: critical
ai_priority: critical
confidence_default: required
related:
  - philosophy
  - grammar-rules
  - front-matter-schema
components:
  - AppShell
  - Menu
  - Button
  - Field
  - Card
patterns:
  []
tokens:
  - --uds-*
depends_on:
  - philosophy
influences: []
conflicts_with:
  - layout-mistakes
  - radius-mistakes
alternatives:
  []
---
# DSL principles

1. **Tokens before values** — Use `--uds-*` variables and component variants; do not hardcode hex, px spacing, or ad-hoc radius.
2. **Components before markup** — Prefer UDS exports (`Button`, `Field`, `Card`, `AppShell`) over bespoke HTML/CSS.
3. **Semantic before decorative** — Color, elevation, and weight communicate meaning (status, hierarchy, affordance).
4. **Shell before screen** — Authenticated product UI defaults to `AppShell` with `Menu` in the menu slot; page content in `AppShell.Main`.
5. **Accessible by default** — Focus, contrast, touch targets, and semantics are not optional polish.
6. **Brand via modes** — Product brand differences use token modes and `Menu`/`Branding` props—not one-off color overrides.
7. **AI-readable** — Decisions align with `ai/uds-contract.json` and this DSL so agents produce on-brand UI.

Confidence: Required — Principles 1, 2, 4, and 5 are non-negotiable for product UI.


## Relationships

### Supports

- Consistent AI output

### Requires

- Philosophy

### Influences

- Grammar
- Decision rules

### Uses

- Tokens
- Components

### Conflicts With

- Anti-patterns

### Alternatives

- —

### Depends On

- philosophy

### Referenced By

- AGENTS.md



## See also

- [Philosophy](./philosophy.md)
- [Anti-patterns](./anti-patterns/layout-mistakes.md)
