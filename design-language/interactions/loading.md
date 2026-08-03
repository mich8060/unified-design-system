---
id: loading
category: interaction
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
 - empty-states
 - buttons-tree
 - laws-of-ux
components:
 - Spinner
 - Skeleton
 - Progress
 - Button
patterns:
 []
tokens:
 []
depends_on:
 []
influences:
 - empty-states
 - buttons-tree
conflicts_with:
 - accessibility-mistakes
alternatives:
 []
---
# Loading

## What

Loading states use Spinner/Skeleton/Progress—not disabled-looking fake content without announcement.

## Why

Interaction states are how users and AT confirm the system is responding. UDS encodes them in components and tokens.

## When

Any interactive control using Spinner, Skeleton, Progress, Button.

## UDS implementation

| Component | Use |
|-----------|-----|
| `Spinner` | Inline / button busy |
| `Skeleton` | Content placeholders in Main/listview |
| `Progress` / `ProgressCircles` | Determinate progress |
| Button | Disable + Spinner child while submitting |

## How AI should reason

1. Prefer Skeleton in known layouts over blank Main.
2. Disable submit Button while pending.
3. Avoid layout jump—reserve space.
4. Aim for feedback within ~**400ms** when the user is waiting (**Doherty Threshold** — see [`laws-of-ux`](../design-physics/laws-of-ux.md)).

Confidence: Preferred — Prefer component props/states over custom CSS state hacks.


## Relationships

### Supports

- Affordance
- Accessibility

### Requires

- Published components

### Influences

- empty-states
- buttons-tree

### Uses

- Spinner
- Skeleton
- Progress
- Button

### Conflicts With

- Custom state CSS that removes focus/disabled semantics

### Alternatives

- —

### Depends On

- affordance

### Referenced By

- ai/indexes/concept-index.md



## See also

- [empty-states](../patterns/empty-states.md)
- [buttons-tree](../decision-rules/trees/buttons.md)
- [Laws of UX index](../design-physics/laws-of-ux.md) — Doherty Threshold
