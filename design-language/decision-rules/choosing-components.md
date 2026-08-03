---
id: choosing-components
category: decision
type: rule
priority: high
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - buttons-tree
  - forms-tree
  - components-index
  - ontology-index
components:
  - AppShell
  - Menu
  - Button
  - Field
  - Status
  - Medallion
  - Badge
  - Table
  - Item
patterns:
  - forms
  - tables
  - navigation
tokens: []
depends_on:
  - intent
  - choosing-patterns
influences: []
conflicts_with:
  - layout-mistakes
alternatives: []
---

# Choosing components

## What

Rules for selecting UDS components instead of inventing markup.

## Why

Parallel component systems drift from tokens, a11y, and brand modes.

## When

After intent and pattern are known; before writing JSX.

## How AI should reason

1. Open `ai/uds-contract.json` → `componentCatalog` (or ontology for relations).
2. Prefer first-party: `AppShell`, `Menu`, `Status`, `Medallion`, `Badge`, `SectionHeader`, `Item`.
3. Forms → `Field` + input family. Actions → `Button` (see buttons tree). Collections → `Table` or `Item`.
4. If no export fits, compose existing primitives—do not copy `src/components/ui/*`.

Confidence: Required — Consult the catalog before inventing UI.

Confidence: Preferred — Status/Badge/Medallion before custom colored pills.

Confidence: Preferred — Status `appearance="outlined"` (default) over solid fills.

Confidence: Preferred — `Medallion` defaults to **`size="lg"`**; omit size or pass `lg` unless a dense pattern needs smaller.

## Relationships

### Supports

- On-brand implementation

### Requires

- Intent, choosing-patterns

### Influences

- All screens

### Uses

- componentCatalog, ontology/

### Conflicts With

- Bespoke component systems

### Alternatives

- —

### Depends On

- intent

### Referenced By

- ai/indexes/decision-index.md

## See also

- [Choosing patterns](./choosing-patterns.md)
- [Buttons tree](./trees/buttons.md)
- [Ontology](../ontology/README.md)
