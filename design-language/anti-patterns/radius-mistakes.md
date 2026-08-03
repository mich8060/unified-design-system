---
id: radius-mistakes
category: anti-pattern
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - corner-radius
  - choosing-radius
  - stacked-bar-radius
components:
  - Card
  - Button
  - ChartContainer
patterns:
  - cards
  - dashboards
tokens:
  - "--uds-radius-12"
  - "--uds-radius-9999"
depends_on:
  []
influences:
  []
conflicts_with:
  - corner-radius
alternatives:
  []
---
# Radius mistakes

## What

Violations of the UDS rectangle radius cap.

## Never

- `rounded-2xl`, `rounded-3xl`, `rounded-[16px]` (or larger) on **rectangular** surfaces
- `rounded-full` on cards, dialogs, inputs, or panels to fake large corners
- Ignoring that tokens include `--uds-radius-16|20|24` in CSS — **product UI policy still caps rectangles at 12px**
- The same corner radius on **every** segment of a **stacked** bar chart (touching ends must be **0** — see [`stacked-bar-radius`](../semantics/stacked-bar-radius.md))

## Do instead

Prefer `--uds-radius-4` for chrome; max `--uds-radius-12` for rectangles; `9999` only for pills/circles/avatars. For stacked bars, round only the outer free ends.

Confidence: Required — Rectangles ≤ 12px.


## Relationships

### Supports

- Consistent chrome

### Requires

- corner-radius policy

### Influences

- —

### Uses

- --uds-radius-4/8/12

### Conflicts With

- corner-radius (when violated)

### Alternatives

- choosing-radius

### Depends On

- —

### Referenced By

- foundations/corner-radius.md
- AGENTS.md



## See also

- [Corner radius](../foundations/corner-radius.md)
- [Choosing radius](../decision-rules/choosing-radius.md)
