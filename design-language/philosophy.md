---
id: philosophy
category: philosophy
type: principle
priority: critical
ai_priority: critical
confidence_default: required
related:
 - dsl-principles
 - consistency-load
 - intent
 - laws-of-ux
components:
 - AppShell
 - Menu
patterns:
 []
tokens:
 []
depends_on:
 []
influences:
 - design-physics-index
conflicts_with:
 []
alternatives:
 []
---
# Design philosophy

CHG Unified Design System exists so every product ships **consistent, trustworthy, on-brand UI faster**—including as AI-assisted development scales.

## What we optimize for

- **Recognition over novelty** — Users moving between CHG products should feel familiar patterns, not a new design language per app.
- **Clarity over density** — Operational tools may be data-rich, but hierarchy, spacing, and grouping prevent visual noise.
- **System over screen** — Individual screens compose from shared foundations and patterns, not local conventions.

## How AI should reason

1. Prefer existing recipes and components over novel layouts.
2. Optimize for task clarity before visual flourish.
3. When unsure, choose the more consistent CHG pattern.

Related laws (**Jakob’s Law**, **Occam’s Razor**, **Paradox of the Active User**, **Prägnanz**) — see [`laws-of-ux`](./design-physics/laws-of-ux.md). Teach by composed screens (`ai/examples/`), not manuals.

## Relationship to the DSL data model

| Layer | Answers |
|-------|---------|
| DSL (`design-language/`) | *Why* and *when* |
| Contract (`ai/uds-contract.json`) | *What* is available |
| React components | *How* it ships |

When prose here disagrees with shipped components, **components and tokens win** until this documentation is updated.

Confidence: Required — Do not invent a parallel visual language per app.


## Relationships

### Supports

- All DSL layers

### Requires

- —

### Influences

- Design physics
- Semantics
- Patterns

### Uses

- —

### Conflicts With

- One-off brand forks

### Alternatives

- —

### Depends On

- —

### Referenced By

- principles.md
- ai/indexes/concept-index.md



## See also

- [Principles](./principles.md)
- [Design physics](./design-physics/README.md)
- [Laws of UX index](./design-physics/laws-of-ux.md)
