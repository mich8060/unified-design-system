---
id: examples-dashboards
category: example
type: index
priority: high
ai_priority: critical
confidence_default: preferred
related:
  - dashboards
  - choosing-patterns
  - dashboards-tree
components:
  - AppShell
  - Menu
  - SectionHeader
  - Card
  - Chart
  - Status
patterns:
  - workspace-dashboard
  - ops-queue-dashboard
  - triage-dashboard
  - provider-portal-home
  - analytics-overview
tokens:
  []
depends_on:
  - choosing-patterns
influences:
  []
conflicts_with:
  []
alternatives:
  []
---
# Dashboard examples

Canonical fixtures from `ai/examples/` (also listed in contract `screenRecipes`):

| Recipe id | Recipe | Example |
|-----------|--------|---------|
| `workspace-dashboard` | [`ai/recipes/workspace-dashboard.md`](../../ai/recipes/workspace-dashboard.md) | [`workspace-dashboard.tsx`](../../ai/examples/workspace-dashboard.tsx) |
| `ops-queue-dashboard` | [`ai/recipes/ops-queue-dashboard.md`](../../ai/recipes/ops-queue-dashboard.md) | [`ops-queue-dashboard.tsx`](../../ai/examples/ops-queue-dashboard.tsx) |
| `triage-dashboard` | [`ai/recipes/triage-dashboard.md`](../../ai/recipes/triage-dashboard.md) | [`triage-dashboard.tsx`](../../ai/examples/triage-dashboard.tsx) |
| `provider-portal-home` | [`ai/recipes/provider-portal-home.md`](../../ai/recipes/provider-portal-home.md) | [`provider-portal-home.tsx`](../../ai/examples/provider-portal-home.tsx) |
| `analytics-overview` | [`ai/recipes/analytics-overview.md`](../../ai/recipes/analytics-overview.md) | [`analytics-overview.tsx`](../../ai/examples/analytics-overview.tsx) |

Pick via [`choosing-patterns`](../decision-rules/choosing-patterns.md) or the [dashboards tree](../decision-rules/trees/dashboards.md).

Confidence: Preferred — Copy structure from the matching example; do not invent a fourth dashboard layout.


## Relationships

### Supports

- Dense + simple dashboard fidelity

### Requires

- choosing-patterns

### Influences

- —

### Uses

- ai/examples/*dashboard*

### Conflicts With

- visual-noise generic dashboards

### Alternatives

- —

### Depends On

- dashboards

### Referenced By

- patterns/dashboards.md



## See also

- [Dashboards pattern](../patterns/dashboards.md)
- [Dashboards tree](../decision-rules/trees/dashboards.md)
