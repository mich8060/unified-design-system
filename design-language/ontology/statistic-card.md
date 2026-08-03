---
id: statistic-card-ontology
category: ontology
type: object
priority: high
ai_priority: high
confidence_default: preferred
related:
  - ontology-index
  - choosing-components
  - spacing-levels
components:
  - StatisticCard
  - Medallion
  - Link
  - Text
patterns:
  - workspace-dashboard
tokens:
  - --uds-surface-primary
  - --uds-border-primary
  - --uds-radius-8
  - --uds-gap-12
  - --uds-gap-16
  - --uds-gap-24
  - --uds-spacing-16
  - --uds-spacing-24
depends_on:
  - grammar-hierarchy
  - spacing-levels
influences:
  - workspace-dashboard
conflicts_with: []
alternatives:
  - card-ontology
design_intent:
  - scanability
  - comparison
---
# Statistic Card

## What

`StatisticCard` **is-a** data-display surface for a single KPI. It is the card itself — not a multi-card grid wrapper.

## API (system facts)

Compose slots:

| Slot | Role |
|------|------|
| `StatisticHeader` | Title row + value |
| `StatisticTitle` | Label + optional `Medallion` (prefer default **`lg`**) |
| `StatisticLabel` | body/14/semibold |
| `StatisticValue` | **display/48/bold** |
| `StatisticFooter` | Description + action |
| `StatisticDescription` | body/14 supporting text |
| `StatisticAction` | `Link` with `appearance="primary"` (same styles as primary Link) |

`StatisticCard` includes `flex: 1` / `min-w-0` so siblings share width evenly in a flex row. Built-in padding is **24px** (`--uds-spacing-24`). Ships with **`overflow-hidden`** for clean radius edges ([`overflow`](../composition/overflow.md)). Do **not** wrap cards in a `Statistics` component.

## Layout (multiple cards)

When showing more than one Statistic Card, place them **horizontally on the same row** with an outer gap of **16px or 24px** only (`--uds-gap-16` / `--uds-gap-24`) — same band as other first-level siblings ([`spacing-levels`](../semantics/spacing-levels.md)).

```tsx
<div className="flex w-full flex-row items-stretch gap-[length:var(--uds-gap-16)]">
  <StatisticCard>…</StatisticCard>
  <StatisticCard>…</StatisticCard>
  <StatisticCard>…</StatisticCard>
</div>
```

| Gap | Prefer when |
|-----|-------------|
| **16px** | Denser ops / triage KPI rows |
| **24px** | Airier workspace dashboards |

Do **not** stack Statistic Cards vertically as the default layout when they are peer KPIs, and do not invent other gap steps (8, 12, 20, 32) between them.

## Ontology

| Relation | Detail |
|----------|--------|
| **is-a** | Metric / summary card |
| **contains** | Title; Value; Optional medallion; Footer description + link |
| **requires** | A single countable or status metric |
| **uses** | `Text` display scale; `Medallion`; `Link` |
| **appears in** | Ops dashboards; triage / queue attention rows |
| **does-not** | Provide a multi-card layout wrapper |

## Anti-patterns

- Wrapping cards in a dedicated `Statistics` grid component from the package
- Using heading/32 or body sizes for the primary number instead of display/48/bold
- Nesting `StatisticCard` inside another `Card` for the same metric
- Defaulting peer KPI cards to a vertical stack instead of a horizontal row
- Gaps other than 16px / 24px between peer Statistic Cards

## How AI should reason

1. Use `StatisticCard` for a single KPI, not a multi-metric grid.
2. Layout peer cards in a **horizontal** `flex` row with gap **16 or 24**; do not wrap them in a `Statistics` component.
3. Keep the primary number in `StatisticValue` at display/48/bold — do not substitute smaller type scales.

Confidence: Preferred — Use StatisticCard for single-KPI surfaces; compose peer cards in a horizontal row with gap 16 or 24.

## Relationships

### Supports

- Ops dashboard KPI rows

### Requires

- A single countable or status metric

### Influences

- workspace-dashboard

### Uses

- Text
- Medallion
- Link

### Conflicts With

- Wrapping cards in a `Statistics` grid component
- Nesting inside another Card for the same metric
- Vertical stacks as the default for peer KPI cards

### Alternatives

- Card (for non-metric grouped content)

### Depends On

- grammar-hierarchy
- spacing-levels

### Referenced By

- ai/indexes/component-index.md

## See also

- [Card ontology](./card.md)
- [Spacing levels](../semantics/spacing-levels.md)
- [Ontology index](./README.md)
