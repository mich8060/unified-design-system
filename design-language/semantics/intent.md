---
id: intent
category: semantics
type: concept
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - confidence-semantic
  - front-matter-schema
components:
  - AppShell
patterns:
  - dashboards
  - forms
  - tables
tokens:
  []
depends_on:
  []
influences:
  - dashboards
  - forms
  - tables
conflicts_with:
  - visual-noise
alternatives:
  []
design_intent:
  - scanability
  - comparison
  - editing
  - navigation
  - discovery
  - confirmation
  - temporary_workspace
  - interrupt_workflow
  - prevent_harm
  - obtain_confirmation
---
# Design Intent

## What

**Design intent** is the user’s goal for the current screen or composition—what they came to do (scan a queue, compare rows, edit settings, navigate a product, discover next actions, confirm a consequential choice, complete a short task in a temporary workspace, or interrupt a flow to prevent harm).

Tag knowledge objects with the `design_intent` front-matter facet so retrieval can pull the right rules and patterns before components are chosen.

## Taxonomy (`design_intent`)

| Value | User is trying to… |
|-------|--------------------|
| `scanability` | Quickly read status, counts, or a queue without deep reading |
| `comparison` | Judge items side-by-side (metrics, rows, options) |
| `editing` | Change values, preferences, or structured fields |
| `navigation` | Move between areas, records, or workflow steps |
| `discovery` | Find what to do next, what’s available, or what’s new |
| `confirmation` | Affirm or cancel a consequential action (general; prefer more specific intents when they fit) |
| `temporary_workspace` | Finish a small multi-input task in an overlay, then return to the previous context |
| `interrupt_workflow` | Stop the current flow to force attention before continuing |
| `prevent_harm` | Block or warn against a harmful, unsafe, or irreversible outcome |
| `obtain_confirmation` | Require an explicit yes/no (or acknowledge) before proceeding |

A document may list **multiple** intents when it supports more than one goal. **AlertDialog** typically combines `interrupt_workflow`, `prevent_harm`, and `obtain_confirmation`. **Dialog** uses `temporary_workspace`.

## Why

Pattern and recipe choice follows design intent—not aesthetic preference. Faceted `design_intent` metadata makes that choice retrievable for humans and AI.

## When

- At the start of every screen generation or redesign
- When authoring or updating a DSL pattern, decision tree, or ontology object that maps to a user goal

## How AI should reason

1. State the user goal in one sentence.
2. Map to one or more `design_intent` values above.
3. Retrieve DSL docs / recipes tagged with those intents (see `ai/indexes/design-intent-index.md`).
4. Open `decision-rules/choosing-patterns.md`, then pick components.

Confidence: Preferred — Follow related decision trees before inventing layout.

## Relationships

### Supports

- `choosing-patterns`
- `confidence-semantic`
- `front-matter-schema`

### Requires

- Philosophy
- Design physics

### Influences

- dashboards
- forms
- tables

### Uses

- AppShell

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- `ai/indexes/concept-index.md`
- `ai/indexes/design-intent-index.md`

## See also

- [choosing-patterns](../decision-rules/choosing-patterns.md)
- [confidence-semantic](./confidence-semantic.md)
- [front-matter-schema](../_meta/front-matter-schema.md)
