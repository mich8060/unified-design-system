---
id: choosing-patterns
category: decision
type: rule
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - dashboards-tree
  - forms-tree
  - layout-tree
  - intent
  - page-composition
  - laws-of-ux
  - screen-layout-patterns
components:
  - AppShell
  - Menu
patterns:
  - auth-shell
  - workspace-dashboard
  - detail-with-listview
  - settings-form
  - settings-nav-panel
  - narrow-form
  - data-workflow-table
  - ops-queue-dashboard
  - triage-dashboard
  - provider-portal-home
  - analytics-overview
  - screen-layout-patterns
tokens:
  []
depends_on:
  - intent
  - page-composition
influences: []
conflicts_with:
  - layout-mistakes
alternatives:
  []
design_intent:
  - scanability
  - comparison
  - editing
  - navigation
  - discovery
  - confirmation
---
# Choosing patterns

Map **screen intent** to `ai/recipes/` before inventing layout. Start from [`page-composition`](../semantics/page-composition.md) when choosing width / pattern archetype. For whole-page **anatomy** (widget grid, table workflow, listview, wizard, checklist, …), match **01–11** in [`screen-layout-patterns`](../patterns/screen-layout-patterns.md) first.

| Intent | Screen pattern | Recipe |
| --- | --- | --- |
| Authenticated shell only | — | `auth-shell` |
| Simple KPI / summary dashboard | **02** / **09** | `workspace-dashboard` |
| Analytics chart + feed panels | **01** | `analytics-overview` |
| Ops queue + calendar aside | **02** / **06** | `ops-queue-dashboard` |
| Dense triage (KPIs + Item panels) | **01**-adjacent | `triage-dashboard` |
| Provider portal (identity rail + workflow) | — | `provider-portal-home` |
| Master–detail / queue + detail | **05** | `detail-with-listview` |
| Settings / preferences form (single column) | — | `settings-form` |
| Focused narrow task / prose form | — | `narrow-form` |
| Settings with many sections (nav + panel) | **07**-adjacent | `settings-nav-panel` |
| Multi-step form wizard (progress + sections) | **07** | Closest: `settings-nav-panel` + Progress (compose) |
| Data-heavy Filterbar + full-width table | **03** | `data-workflow-table` |
| Same dataset as cards instead of rows | **04** | Filterbar chrome from `data-workflow-table` + Item/Card |
| Lean checklist / upload list | **08** | Compose Tabs + SectionHeader + divided Item rows |
| Timeline / itinerary stacked cards | **10** | Compose Cards + Status |
| Expandable tiered ops table | **11** | Compose Table + Progress + nested Cards |

If no recipe fits, compose from `patterns/` (especially [`screen-layout-patterns`](../patterns/screen-layout-patterns.md)) and validate against `anti-patterns/`.

## How AI should reason

1. Write the user goal (intent).
2. Answer page-composition pre-layout questions; match **screen-layout pattern 01–11**; run the dashboards / forms / layout decision trees.
3. Select the recipe row above (or the compose path for gaps).
4. Open matching `ai/examples/*.tsx`.

Confidence: Preferred — Prefer a listed recipe over a novel dashboard.

Confidence: Preferred — Match [`screen-layout-patterns`](../patterns/screen-layout-patterns.md) anatomy before inventing layout.


## Relationships

### Supports

- Recipe selection

### Requires

- Intent

### Influences

- All screen generation

### Uses

- ai/recipes
- ai/examples

### Conflicts With

- Bespoke shells

### Alternatives

- Compose from patterns/ if none fit

### Depends On

- intent

### Referenced By

- ai/indexes/decision-index.md
- ai/indexes/pattern-index.md



## See also

- [Screen layout patterns](../patterns/screen-layout-patterns.md)
- [Dashboards tree](./trees/dashboards.md)
- [Patterns: dashboards](../patterns/dashboards.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Pareto: optimize primary tasks first
