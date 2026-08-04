---
id: borders
category: foundation
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - color
  - cards
  - tables
components:
  - Card
  - Table
  - Separator
  - Input
patterns:
  - cards
  - tables
  - forms
tokens:
  - "--uds-border-primary"
  - "--uds-border-secondary"
  - "--uds-border-width-1"
  - "--uds-border-width-2"
depends_on:
  - color
influences:
  - cards
  - tables
conflicts_with:
  - visual-noise
alternatives:
  - shadows
---
# Borders

## What

Semantic border colors and widths: `--uds-border-primary|secondary|tertiary|quaternary|disabled|inverse` (+ brand), widths `--uds-border-width-1|2|4|6|none`.

## Why

Hairline chaos and stacked card outlines create visual noise. Tokens keep tables/cards aligned to theme.

## When

Card outlines, input borders, table rules, Separator. Prefer `--uds-border-primary/secondary` over hex.

## How AI should reason

1. Use component borders (Input/Card) before custom.
2. One border weight per region; don’t double-outline nested cards (see nesting).
3. **Table in a box:** When a `Table` sits inside a bordered container (`Card` / `CardContent`), keep **one** outline — the container. Do not also show the table’s outer border (reads as a **2px** edge vs the standard **1px**). Standalone tables keep their own border. Package: `Table` drops outer border/radius inside `CardContent`.
4. Brand borders via brand tokens / components—not custom.

Confidence: Preferred — Semantic border tokens; avoid nested Card borders.

Confidence: Preferred — One outline only when Table is wrapped in Card (no double border).


## Relationships

### Supports

- Grouping without shadow

### Requires

- Color tokens

### Influences

- Cards
- Tables
- Forms

### Uses

- --uds-border-*

### Conflicts With

- visual-noise

### Alternatives

- Surface fills
- Separator

### Depends On

- color

### Referenced By

- composition/nesting.md



## See also

- [Color](./color.md)
- [Nesting](../composition/nesting.md)
- [Cards](../patterns/cards.md)
