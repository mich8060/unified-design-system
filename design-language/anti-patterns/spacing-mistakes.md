---
id: spacing-mistakes
category: anti-pattern
type: rule
priority: high
ai_priority: high
confidence_default: required
related:
  - spacing
  - proximity
  - choosing-spacing
components:
  []
patterns:
  []
tokens:
  - "--uds-gap-8"
  - "--uds-gap-16"
depends_on:
  []
influences:
  []
conflicts_with:
  - spacing
alternatives:
  []
---
# Spacing mistakes

## What

Common spacing failures in UDS consumers and AI output.

## Never / avoid

- Hardcoded `p-[13px]`, `gap-[7px]`, or arbitrary spacing outside `--uds-gap-*` / `--uds-spacing-*`
- Equal gaps everywhere (erases proximity)
- Section gaps smaller than field-stack gaps
- Negative margins to “fix” AppShell padding

## Do instead

Use the gap scale: 2, 4, 8, 12, 16, 20, 24, 32, 40 — see `foundations/spacing.md`.

Confidence: Required — Stay on UDS spacing tokens.


## Relationships

### Supports

- Proximity

### Requires

- Spacing foundation

### Influences

- —

### Uses

- --uds-gap-*

### Conflicts With

- spacing (correct usage)

### Alternatives

- choosing-spacing table

### Depends On

- —

### Referenced By

- foundations/spacing.md



## See also

- [Spacing](../foundations/spacing.md)
- [Choosing spacing](../decision-rules/choosing-spacing.md)
