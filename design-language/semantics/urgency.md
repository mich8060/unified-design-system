---
id: urgency
category: semantics
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - emphasis
  - errors-tree
  - dialogs
components:
  - Alert
  - Status
  - Badge
  - Dialog
patterns:
  - dialogs
  - empty-states
tokens:
  []
depends_on:
  []
influences:
  - dialogs
  - empty-states
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Urgency

## What

Urgency signals time-critical or blocking conditions that need attention before other work.

## Why

Operational tools must surface blockers without turning every status into an emergency.

## When

Errors blocking submit, SLA breaches, destructive confirms. Not for routine success toasts.

## How AI should reason

1. Ask: does this require immediate action?
2. If yes → Alert / destructive Dialog / `Status variant="error"` (destructive color pattern).
3. If no → Badge or secondary Status — still match meaning to color ([`color`](../foundations/color.md): error→destructive, warning→warning, success→constructive, info→action/info).

Confidence: Preferred — Follow related decision trees before inventing layout.


## Relationships

### Supports

- `emphasis`
- `errors-tree`
- `dialogs`

### Requires

- Philosophy
- Design physics

### Influences

- dialogs
- empty-states

### Uses

- Alert
- Status
- Badge
- Dialog

### Conflicts With

- Visual noise
- Layout mistakes

### Alternatives

- —

### Depends On

- semantics foundation concepts

### Referenced By

- ai/indexes/concept-index.md



## See also

- [emphasis](./emphasis.md)
- [errors-tree](../decision-rules/trees/errors.md)
- [dialogs](../patterns/dialogs.md)
