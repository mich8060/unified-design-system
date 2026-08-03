---
id: action-spacing
category: accessibility
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - touch-targets
  - spacing-levels
  - choosing-spacing
  - proximity
  - button-ontology
  - accessibility-mistakes
components:
  - Button
  - ButtonGroup
  - Link
  - Toolbar
patterns:
  - forms
  - dialogs
  - tables
tokens:
  - "--uds-gap-12"
depends_on:
  - touch-targets
  - spacing
influences:
  - forms
  - choosing-spacing
conflicts_with:
  - accessibility-mistakes
  - spacing-mistakes
alternatives:
  []
design_intent:
  - editing
  - confirmation
  - navigation
---
# Action spacing

## What

**Discrete adjacent actions** (Buttons, icon Buttons, action Links in a footer/toolbar/row) must have **at least 12px** gap between them (`--uds-gap-12` or larger on the gap scale).

## Why

Tight clusters cause mis-taps and fail accessibility reviews. Target size alone is not enough when hit areas sit next to each other—spacing reduces accidental activation (related to WCAG 2.5.8 Target Size / spacing guidance).

## When

- Dialog / AlertDialog / Sheet footers
- Card footers and form action rows
- Toolbar groups of separate actions
- Table or list row action clusters (when actions are separate controls)

## Exception

**Attached** `ButtonGroup` segments that share borders (segmented control) may sit flush. That is one composite control—not a cluster of independent actions. Once actions are separate (outline Cancel + filled Save), use ≥12px.

## How AI should reason

1. Are these independent actions the user chooses between? → gap ≥ `--uds-gap-12`.
2. Prefer `gap-[length:var(--uds-gap-12)]` (or 16) over `gap-2` (8px).
3. Do not pack icon Buttons with 4–8px gutters in dense rows without expanding hit spacing.

Confidence: Required — Adjacent discrete actions ≥ 12px gap.

## Relationships

### Supports

- Touch targets
- Proximity

### Requires

- Spacing scale

### Influences

- Forms, dialogs, toolbars

### Uses

- Button, Link, Toolbar

### Conflicts With

- Crowded action clusters (`gap-2` / 8px between separate Buttons)

### Alternatives

- Attached ButtonGroup for mutually exclusive segment choices

### Depends On

- touch-targets
- spacing

### Referenced By

- `ai/indexes/concept-index.md`

## See also

- [Touch targets](./touch-targets.md)
- [Spacing levels](../semantics/spacing-levels.md)
- [Choosing spacing](../decision-rules/choosing-spacing.md)
- [Accessibility mistakes](../anti-patterns/accessibility-mistakes.md)
