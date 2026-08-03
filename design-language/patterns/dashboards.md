---
id: dashboards
category: pattern
type: pattern
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - dashboards-tree
  - examples-dashboards
  - hierarchy
  - density
  - stacked-bar-radius
components:
  - AppShell
  - Menu
  - SectionHeader
  - Card
  - Badge
  - Status
  - Medallion
  - Item
  - Chart
  - SearchInput
  - MicroCalendar
patterns:
  - workspace-dashboard
  - ops-queue-dashboard
  - triage-dashboard
  - provider-portal-home
  - analytics-overview
tokens:
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - intent
  - grammar-regions
influences:
  - examples-dashboards
conflicts_with:
  - visual-noise
alternatives:
  - detail-pages
design_intent:
  - scanability
  - comparison
  - discovery
---

# Dashboards

## What

Operational overview screens inside `AppShell.Main`: KPIs, queues, charts, and workflow summaries—not marketing landing pages.

## Why

CHG products share shell + section structure so users transferring between brands still recognize hierarchy and actions.

## When

Map intent → recipe (also [`dashboards` tree](../decision-rules/trees/dashboards.md)):

| Intent | Recipe | Example |
|--------|--------|---------|
| Simple KPI / summary | `workspace-dashboard` | `ai/examples/workspace-dashboard.tsx` |
| Queue + calendar aside | `ops-queue-dashboard` | `ai/examples/ops-queue-dashboard.tsx` |
| Dense triage KPI + Item panels | `triage-dashboard` | `ai/examples/triage-dashboard.tsx` |
| Provider identity + workflow | `provider-portal-home` | `ai/examples/provider-portal-home.tsx` |
| Charts + feed panels | `analytics-overview` | `ai/examples/analytics-overview.tsx` |

## Goal (example)

Give an operator an overview so they know what needs attention today.

## Reasoning

```
Overview intent
→ Classify density (decision tree)
→ Pick recipe row above
→ AppShell + Menu + AppShell.Main
→ SectionHeader + KPI/Cards/Item/Chart per recipe
→ One primary CTA region
```

## UDS building blocks (by recipe)

**ops-queue-dashboard** (from recipe): `SectionHeader` → actions → `SearchInput` + facet chips → `lg:grid-cols-[minmax(0,1fr)_320px]` with `Item`/`ItemGroup` queue + `MicroCalendar` aside; `Badge`, `Status`, `Medallion`, `Card`, `Button`.

**Shared shell rules:** `menu={<Menu … />}`; `enableRouterOutlet={false}` for static demos; no nested `<main>`; prefer package `*Icon` exports.

## How AI should reason

1. Do not invent a novel dashboard layout—open the matching example.
2. Prefer Status/Badge/Medallion over custom pills.
3. Control density via recipe choice, not random compact CSS.
4. In `AppShell.Main`, space stacked sections **16 or 24px**, prefer **2–3 columns**, and pad boxed Cards/panels.
5. In grid rows, **match peer heights** (especially non-bottom rows); stretch when Δ **≤ 150px**, rebalance when larger; bottom row may stay natural ([`grid`](../foundations/grid.md)).
6. Avoid visual noise (nested cards, multiple primaries, glow gradients).
7. Stacked bar charts: touching segment ends use **radius 0** ([`stacked-bar-radius`](../semantics/stacked-bar-radius.md)).

Confidence: Preferred — Start from the recipe example file.

## Relationships

### Supports

- Operational scanning across CHG products

### Requires

- Intent, AppShell + Menu, choosing-patterns

### Influences

- Component selection (Card, Item, Chart, Status)

### Uses

- SectionHeader, Card, Item, Status, Badge, Medallion, Chart, SearchInput, MicroCalendar

### Conflicts With

- visual-noise, bespoke shells

### Alternatives

- detail-with-listview when focus is one entity + collection

### Depends On

- intent, grammar-regions

### Referenced By

- decision-rules/trees/dashboards.md, examples/dashboards.md

## See also

- [Choosing patterns](../decision-rules/choosing-patterns.md)
- [Dashboards tree](../decision-rules/trees/dashboards.md)
- [Dashboard examples](../examples/dashboards.md)
- [Ops queue recipe](../../ai/recipes/ops-queue-dashboard.md)
