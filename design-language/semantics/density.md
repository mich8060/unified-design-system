---
id: density
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - proximity
  - whitespace
  - spacing
  - ops-queue-dashboard
components:
  - Item
  - Table
  - Card
patterns:
  - tables
  - lists
  - dashboards
  - ops-queue-dashboard
  - triage-dashboard
tokens:
  - --uds-space-4
  - --uds-space-8
  - --uds-space-16
depends_on:
  - proximity-physics
influences:
  - choosing-spacing
  - tables
conflicts_with:
  - visual-noise
alternatives:
  - progressive-disclosure
---
# Information density

## What

Density is how much information occupies a given region without collapsing hierarchy or touch targets.

## Why

Ops queues and triage screens need high information per viewport, but unconstrained density becomes visual noise.

## When

- **Higher density:** queues, tables, triage, analytics feeds.
- **Lower density:** marketing-adjacent portals, empty states, first-run flows, settings with long help text.

## How AI should reason

1. Classify screen intent (ops vs portal vs settings).
2. Pick a recipe that matches density (`ops-queue-dashboard`, `triage-dashboard` vs `workspace-dashboard`).
3. Tighten spacing between *related* rows; keep section gaps larger.
4. In tight spaces (**table rows**, dense list rows), use **compact / `sm`** component variants (`Status size="compact"`, `Badge size="sm"`, smaller Buttons/Avatars) — do not shrink default controls with ad-hoc CSS.
5. On multi-region dashboards/reports at `lg+`, **short regions share a row** (lists, feeds, callouts, watchlists) — do not stack them full-width alone after a KPI row ([`appshell-main-containment`](./appshell-main-containment.md)).
6. Never shrink touch targets below accessibility minimums (prefer compact variants that still meet targets).

Confidence: Preferred — Prefer recipe-aligned density over ad-hoc compact CSS.

Confidence: Strong Recommendation — Compact nested components in table/list rows.

Confidence: Required — Short regions share a row at `lg+` on multi-region pages.


## Relationships

### Supports

- Operational scanning
- Queue patterns

### Requires

- Spacing tokens
- Proximity

### Influences

- Tables
- Lists
- Dashboards

### Uses

- Item
- Table
- Card

### Conflicts With

- Visual noise
- Touch-target violations

### Alternatives

- Progressive disclosure
- Master–detail listview

### Depends On

- Proximity physics

### Referenced By

- patterns/dashboards.md
- decision-rules/choosing-patterns.md



## See also

- [Proximity](./proximity.md)
- [Whitespace](./whitespace.md)
- [Choosing patterns](../decision-rules/choosing-patterns.md)
