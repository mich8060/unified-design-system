---
id: nesting
category: composition
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - cards
  - grouping
  - borders
  - visual-noise
components:
  - Card
patterns:
  - cards
  - dashboards
  - forms
tokens:
  []
depends_on:
  - grouping
influences:
  - cards
conflicts_with:
  - visual-noise
alternatives:
  - section-header-ontology
---
# Nesting

## What

Limit bordered surface nesting. Card-inside-Card only when the inner card is a distinct interactive unit.

## Why

Deep nested outlines are a common AI dashboard failure and create visual noise.

## When / when not

| OK | Avoid |
|----|-------|
| Card section containing a Table | Card > Card > Card for static text |
| Dialog containing a Field group | Card around every Field |
| Listview Item rows | Nested cards for each meta line |

Prefer flat sections with `SectionHeader` over deep bordered boxes.

Confidence: Preferred — Prefer SectionHeader + spacing over nested Cards.


## Relationships

### Supports

- Clarity

### Requires

- Grouping judgment

### Influences

- Cards
- Dashboards

### Uses

- Card
- SectionHeader

### Conflicts With

- visual-noise

### Alternatives

- Flat sections

### Depends On

- grouping

### Referenced By

- patterns/cards.md



## See also

- [Cards](../patterns/cards.md)
- [Grouping](../semantics/grouping.md)
- [Visual noise](../anti-patterns/visual-noise.md)
