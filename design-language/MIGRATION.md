---
id: dsl-migration
category: index
type: index
priority: high
ai_priority: medium
confidence_default: preferred
related:
  - design-language-readme
  - front-matter-schema
components:
  []
patterns:
  []
tokens:
  []
depends_on:
  []
influences:
  []
conflicts_with:
  []
alternatives:
  []
---
# DSL migration summary

## What changed

The `design-language/` folder moved from a flat stub library to a **layered Design System Language** with semantics, grammar, design physics, ontology, decision trees, YAML front matter, and typed relationships.

## Path map (composition → semantics)

| Old path | New path |
|----------|----------|
| `composition/hierarchy.md` | `semantics/hierarchy.md` |
| `composition/density.md` | `semantics/density.md` |
| `composition/grouping.md` | `semantics/grouping.md` |
| `composition/proximity.md` | `semantics/proximity.md` |
| `composition/visual-weight.md` | `semantics/visual-weight.md` |
| `composition/whitespace.md` | `semantics/whitespace.md` |
| `composition/alignment.md` | `semantics/alignment.md` |

Remaining in `composition/` as layout topics: `nesting.md`, `overflow.md`, `responsive-layout.md`.

Redirect stubs (old paths still resolve): `composition/{hierarchy,density,grouping,proximity,visual-weight,whitespace,alignment}.md` → point at `semantics/`.

## New folders

| Path | Purpose |
|------|---------|
| `semantics/` | Design meaning concepts |
| `grammar/` | Experience→Token rules + AppShell regions |
| `design-physics/` | Universal principles |
| `ontology/` | Knowledge objects |
| `decision-rules/trees/` | Decision trees |
| `components/` | Thin index → contract |
| `_meta/` | Front matter schema |
| `../ai/indexes/` | AI retrieval indexes (generated) |

## Agent / package wiring

| Artifact | Change |
|----------|--------|
| `AGENTS.md`, `CLAUDE.md`, `.cursorrules` | Point to DSL for why/when; contract for what |
| `AI_USAGE.md` | Documents `@…/design-language` + `ai/indexes` |
| `package.json` `files` | Includes `ai/indexes` |
| `ai/uds-contract.json` | `designLanguage` block + references (via `generate:ai`) |
| `scripts/generate-ai-artifacts.mjs` | Scans front matter → writes indexes |
| `scripts/bootstrap-design-language.mjs` | One-shot scaffold helper (re-run with `FORCE=1` if needed) |
| `scripts/populate-design-language.mjs` | Fills stubs with real UDS tokens, APIs, recipes, antiPatterns |

## Backwards compatibility

- Package export `@chghealthcare/unified-design-system/design-language` unchanged.
- `ai/recipes`, `ai/examples`, and `ai/uds-contract.json` remain runtime sources of truth for *what*.
- Agents should read DSL for *why/when* and contract for *what*.
- Useful stub content preserved; enriched in place rather than deleted.

## Future improvements

1. Expand ontology to full `componentCatalog`.
2. Emit `relationships/graph.json` from front matter.
3. ~~CI check: require front matter keys + valid `related` ids.~~ Done — `scripts/validate-design-language.mjs` (`npm run validate:design-language`, chained into `npm run validate:ai`).
4. RAG eval suite against `ai/evals/` prompts.
5. ~~Auto-link checker for See also hrefs.~~ Done — same script also resolves every markdown link on disk.
6. Enrich remaining thin foundations/interactions to full What/Why/When depth.
7. Deduplicate AGENTS hard rules further into DSL anti-patterns as single source.
