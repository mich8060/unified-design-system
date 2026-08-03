---
id: stacked-bar-radius
category: semantics
type: rule
priority: high
ai_priority: high
confidence_default: preferred
related:
  - corner-radius
  - nested-radius
  - radius-mistakes
  - dashboards
components:
  - ChartContainer
  - Bar
  - BarChart
patterns:
  - dashboards
tokens:
  - "--uds-radius-4"
depends_on:
  - corner-radius
influences:
  - dashboards
conflicts_with:
  - radius-mistakes
alternatives: []
design_intent:
  - scanability
  - comparison
---
# Stacked bar chart radius

## What

When two (or more) bar segments share a `stackId` in a bar chart, the **touching ends** of adjacent segments use **border radius 0**. Only the outer free ends of the stack keep a radius (typically **4px**).

## Why

Rounding both segments at the join creates a visible gap/seam and breaks the stack into separate “pills.” Flat touching ends read as one continuous column.

## When

Any stacked `Bar` series inside `ChartContainer` + Recharts `BarChart` (e.g. analytics-overview).

## How (Recharts)

`Bar` `radius` is `[topLeft, topRight, bottomRight, bottomLeft]`. For a **vertical** stack of two series (first series = bottom):

```tsx
{/* Bottom segment — round only the axis end; flat where it meets the next segment */}
<Bar dataKey="filled" stackId="a" fill="var(--color-filled)" radius={[0, 0, 4, 4]} />
{/* Top segment — round only the free end; flat where it meets the segment below */}
<Bar dataKey="unfilled" stackId="a" fill="var(--color-unfilled)" radius={[4, 4, 0, 0]} />
```

| Segment | Touching end | Free end |
|---------|--------------|----------|
| Bottom | top → `0` | bottom → `4` |
| Top | bottom → `0` | top → `4` |
| Middle (3+) | both ends → `0` | — |

Do **not** use a single `radius={4}` on every stacked series.

For **horizontal** stacked bars, zero the horizontal touching corners the same way (left/right ends that meet).

## Do not

- Apply the same corner radius to every segment in a stack
- Leave rounded corners on both sides of a segment join

## How AI should reason

1. Building a stacked bar chart → identify bottom / middle / top segments.
2. Set touching corners to **0**; keep outer corners at the chart radius (prefer **4**).
3. Prefer the analytics-overview example over inventing radii.

Confidence: Preferred — Touching ends of stacked bars are radius 0.

## See also

- [Corner radius](../foundations/corner-radius.md)
- [Nested radius](./nested-radius.md)
- [Dashboards](../patterns/dashboards.md)
- [`ai/examples/analytics-overview.tsx`](../../ai/examples/analytics-overview.tsx)
