---
id: medallion-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - grammar-hierarchy
  - statistic-card-ontology
  - emphasis
components:
  - Medallion
patterns:
  - dashboards
  - lists
tokens: []
depends_on:
  - grammar-hierarchy
influences:
  - emphasis
  - visual-weight
conflicts_with: []
alternatives:
  - badge-ontology
  - status-ontology
design_intent:
  - scanability
---
# Medallion

## What

`Medallion` **is-a** decorative icon tile for section/KPI identity (preferred over ad-hoc tinted icon boxes).

## API (system facts)

| Prop | Values |
|------|--------|
| `color` | `MedallionColor` (required) |
| `tone` | pastel (default) \| solid |
| `icon` | ReactNode (required) |
| `size` | xs \| sm \| default \| **lg (component default)** \| xl |
| `shape` | circle (default) \| square \| rounded |

Container sizes: 24 / 32 / 40 / **48** / 64px.

### Size (usage)

**Default to `lg`** (omit `size`, or pass `size="lg"`). Use smaller sizes only when density or a composed pattern requires it (e.g. AlertDialog header, compact file-upload rows).

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Feedback / identity tile |
| **contains** | Centered Phosphor (or similar) icon |
| **appears in** | Statistic cards; section headers; alerts; empty/upload chrome |
| **supports** | Color emphasis without inventing custom pills |

## How AI should reason

1. Need a colored icon tile → use `Medallion` before custom boxes.
2. Prefer **`size="lg"`** (the default) for page and section use.
3. Pick `tone` and `color` from the palette; prefer pastel for light surfaces.
4. Reserve `xs` / `sm` / `default` for dense lists or embedded chrome that already sets size.

Confidence: Preferred — Medallion defaults to large (`lg`).

## Relationships

### Supports

- Color emphasis without ad-hoc tinted boxes

### Requires

- An icon and a semantic color

### Influences

- emphasis
- visual-weight

### Uses

- Phosphor icons

### Conflicts With

- Custom tinted icon boxes

### Alternatives

- Badge (text-first, not icon-first)
- Status (state, not identity)

### Depends On

- grammar-hierarchy

### Referenced By

- ai/indexes/component-index.md

## See also

- [Choosing components](../decision-rules/choosing-components.md)
- [Statistic Card](./statistic-card.md)
- [Ontology index](./README.md)
