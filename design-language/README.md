---
id: design-language-readme
category: index
type: index
priority: critical
ai_priority: critical
confidence_default: required
related:
  - philosophy
  - dsl-principles
  - front-matter-schema
  - relationship-graph
components: []
patterns: []
tokens: []
depends_on: []
influences: []
conflicts_with: []
alternatives: []
---

# UDS Design System Language (DSL)

The Design System Language is the human- and machine-readable model for how CHG product UI should look, behave, and compose. It teaches **why** decisions exist, **when** to use them, and **how** humans and AI should reason—not only which component to import.

## Knowledge layers

Dependencies only point downward:

```
Philosophy
    ↓
Design Physics
    ↓
Design Semantics
    ↓
Design Grammar
    ↓
Decision Rules
    ↓
Relationships
    ↓
Patterns
    ↓
Ontology / Components
    ↓
Foundations (Tokens)
    ↓
Code Examples
```

| Layer | Path | Role |
|-------|------|------|
| Philosophy | [`philosophy.md`](./philosophy.md), [`principles.md`](./principles.md) | Why the system exists |
| Design Physics | [`design-physics/`](./design-physics/) | Universal principles (proximity, weight, stability…). Named law aliases: [`laws-of-ux.md`](./design-physics/laws-of-ux.md) |
| Semantics | [`semantics/`](./semantics/) | Meaning: hierarchy, density, affordance, design intent… |
| Grammar | [`grammar/`](./grammar/) | Valid composition (Experience → Token) |
| Decision Rules | [`decision-rules/`](./decision-rules/) | Choosing + decision trees |
| Relationships | [`relationships/`](./relationships/) | Scales, edges, graph |
| Patterns | [`patterns/`](./patterns/) | Screen-level recipes |
| Ontology | [`ontology/`](./ontology/) | Knowledge objects (is-a, requires, uses…) |
| Components | [`components/`](./components/) | Thin index → contract catalog |
| Foundations (Tokens) | [`foundations/`](./foundations/) | Token-backed primitives |
| Composition | [`composition/`](./composition/) | Residual layout (nesting, overflow, responsive) |
| Interactions | [`interactions/`](./interactions/) | State / feedback |
| Accessibility | [`accessibility/`](./accessibility/) | Inclusive requirements |
| Anti-patterns | [`anti-patterns/`](./anti-patterns/) | Common mistakes |
| Examples | [`examples/`](./examples/) | Pointers to `ai/examples/` |
| Meta | [`_meta/`](./_meta/), [`MIGRATION.md`](./MIGRATION.md) | Schema + migration |

## How to use this folder

| Audience | Start here |
|----------|------------|
| Designers | `philosophy.md` → `design-physics/` → `semantics/` → `patterns/` |
| Engineers & AI agents | `principles.md` → `grammar/` → `decision-rules/` → [`patterns/screen-layout-patterns.md`](./patterns/screen-layout-patterns.md) → `@chghealthcare/unified-design-system/contract` |
| QA & accessibility | `accessibility/`, `anti-patterns/` |
| RAG / retrieval | [`ai/indexes/`](../ai/indexes/) |

## Canonical runtime sources

- **Tokens:** `--uds-*` CSS variables in `@chghealthcare/unified-design-system/styles.css`
- **Components:** `@chghealthcare/unified-design-system` exports (`ai/uds-contract.json` → `componentCatalog`)
- **Layout shell:** `AppShell` + `Menu` — see `ai/guides/appshell-navigation.md`
- **Screen recipes:** `ai/recipes/*.md` + `ai/examples/*.tsx`
- **Figma:** variable-bound components per `figma.component.rules.md`

When prose here disagrees with shipped components or the contract, **components and contract win** until this documentation is updated.

## AI indexes

Deterministic retrieval indexes live in [`ai/indexes/`](../ai/indexes/):

- `concept-index.md`
- `component-index.md`
- `relationship-index.md`
- `decision-index.md`
- `pattern-index.md`
- `reasoning-index.md`
- `design-intent-index.md`

Regenerate via `node scripts/generate-ai-artifacts.mjs` (or the package script that wraps it).

## Published package path

`@chghealthcare/unified-design-system/design-language`
