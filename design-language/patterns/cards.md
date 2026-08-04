---
id: cards
category: pattern
type: pattern
priority: high
ai_priority: medium
confidence_default: preferred
related:
  - nesting
  - grouping
  - card-ontology
  - visual-noise
components:
  - Card
  - SectionHeader
  - Button
patterns:
  - cards
  - workspace-dashboard
tokens:
  - "--uds-radius-4"
  - "--uds-radius-12"
depends_on:
  - grouping
influences: []
conflicts_with:
  - nesting
  - visual-noise
alternatives:
  - lists
design_intent:
  - scanability
  - comparison
  - discovery
---

# Cards

## What

`Card` contains a related cluster or interactive unit (KPI block, settings group, summary).

## Why

Cards create grouping—but overuse (card-every-paragraph) is the top visual-noise failure in AI dashboards.

## When

- KPI / summary tiles in `workspace-dashboard`
- Settings subsections that are interactive units
- **Not** every list row (use Item)
- **Not** nested Card > Card for static text (see nesting)

## Reasoning

```
Need a container for interaction/grouping?
→ Card (radius ≤12)
→ Header + body + optional actions
→ Else SectionHeader + flat layout
```

Confidence: Preferred — Cards for interactive/group units only.

Confidence: Recommended — Cards may contain icons.

## Relationships

### Supports

- Grouping

### Requires

- Justified separation

### Influences

- Dashboard chrome

### Uses

- Card, surface/border/radius tokens

### Conflicts With

- nesting abuse, visual-noise

### Alternatives

- Flat SectionHeader sections, Item rows

### Depends On

- grouping

### Referenced By

- composition/nesting.md

## See also

- [Nesting](../composition/nesting.md)
- [Card ontology](../ontology/card.md)
- [Visual noise](../anti-patterns/visual-noise.md)
