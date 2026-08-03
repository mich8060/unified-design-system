---
id: front-matter-schema
category: index
type: index
priority: critical
ai_priority: critical
confidence_default: required
related:
  - design-language-readme
  - relationship-graph
components: []
patterns: []
tokens: []
depends_on: []
influences: []
conflicts_with: []
alternatives: []
design_intent: []
---

# Front matter schema

Every markdown knowledge object under `design-language/` (except this schema’s own examples) **must** begin with YAML front matter matching this shape.

## Required fields

```yaml
---
id: hierarchy                    # stable kebab-case chunk key (unique in repo)
category: semantics              # see enum below
type: concept                    # see enum below
priority: high                   # critical | high | medium | low
ai_priority: critical            # critical | high | medium | low
confidence_default: preferred     # required | preferred | recommended | fallback | experimental | deprecated
related: []                      # other document ids
components: []                   # UDS component names (PascalCase)
patterns: []                     # pattern document ids
tokens: []                       # token names or --uds-* references
depends_on: []                   # document ids this requires
influences: []                   # document ids this shapes
conflicts_with: []               # document ids / anti-patterns
alternatives: []                 # peer choices
design_intent: []                # optional retrieval facet — see enum below
---
```

## Enums

### `category`

| Value | Layer |
|-------|--------|
| `philosophy` | Design philosophy / principles |
| `physics` | Design physics |
| `semantics` | Design semantics |
| `grammar` | Design grammar |
| `decision` | Decision rules / trees |
| `relationship` | Scales and typed relationships |
| `pattern` | Screen / UI patterns |
| `ontology` | Knowledge objects |
| `foundation` | Tokens / foundations |
| `composition` | Residual layout composition |
| `interaction` | Interaction states |
| `accessibility` | Inclusive design |
| `anti-pattern` | Mistakes to avoid |
| `example` | Example indexes |
| `component` | Component indexes |
| `index` | Indexes, schema, migration |

### `type`

`concept` · `rule` · `pattern` · `principle` · `object` · `tree` · `index`

### `confidence_default`

| Value | Meaning |
|-------|---------|
| `required` | Immutable system rule — no documented exception |
| `preferred` | Default guidance — the standard choice among viable options |
| `recommended` | Good, situational guidance; flexible |
| `fallback` | Acceptable secondary path when preferred/recommended does not fit |
| `experimental` | New or unstable; use with caution, expect change |
| `deprecated` | Phasing out; do not use for new work |

### `design_intent` (optional list)

User-goal facet for retrieval. Omit or use `[]` when the document is not goal-specific. When set, every value **must** be one of:

| Value | Meaning |
|-------|---------|
| `scanability` | Scan status, counts, or queues quickly |
| `comparison` | Compare items, metrics, or options |
| `editing` | Change fields, preferences, or content |
| `navigation` | Move between areas, records, or steps |
| `discovery` | Find next actions, availability, or novelty |
| `confirmation` | Affirm or cancel a consequential action |
| `temporary_workspace` | Complete a short multi-input task, then return to the prior context |
| `interrupt_workflow` | Stop the current flow to force attention before continuing |
| `prevent_harm` | Block or warn against a harmful, unsafe, or irreversible outcome |
| `obtain_confirmation` | Require an explicit yes/no (or acknowledge) before proceeding |

Canonical concept: [`semantics/intent.md`](../semantics/intent.md) (Design Intent). Generated index: `ai/indexes/design-intent-index.md`.

### Confidence (inline prose)

Use these labels on individual recommendations, matching `confidence_default`'s values:

| Label | Meaning |
|-------|---------|
| `Confidence: Required` | Immutable system rule |
| `Confidence: Preferred` | Default guidance |
| `Confidence: Recommended` | Flexible / situational |
| `Confidence: Fallback` | Acceptable secondary path |
| `Confidence: Experimental` | New or unstable |
| `Confidence: Deprecated` | Phasing out |

## Body contract

After front matter, documents should include (as applicable):

1. **What** — definition
2. **Why** — reason the concept exists
3. **When** — usage conditions
4. **How AI should reason** — decision steps
5. **Relationships** — Supports / Requires / Influences / Uses / Conflicts With / Alternatives / Depends On / Referenced By
6. **See also** — human markdown links aligned with `related`

## RAG notes

- `id` is the deterministic retrieval key.
- Prefer `design_intent` on patterns, decision trees, and ontology objects that map to a user goal—retrieval can fan out from intent → docs before component choice.
- Keep one concept per file; avoid duplicate canonical definitions.
- Prefer embeddable chunks under ~120 lines of body content.
