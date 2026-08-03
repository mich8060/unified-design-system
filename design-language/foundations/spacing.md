---
id: spacing
category: foundation
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - proximity
  - density
  - whitespace
  - spacing-scale
  - choosing-spacing
  - spacing-levels
  - stacked-text
  - borders
  - typography
  - sizing
components:
  - Field
  - Card
  - Button
  - Input
  - Table
patterns:
  - forms
  - dashboards
  - tables
tokens:
  - "--uds-gap-2"
  - "--uds-gap-4"
  - "--uds-gap-8"
  - "--uds-gap-12"
  - "--uds-gap-16"
  - "--uds-gap-24"
  - "--uds-gap-32"
depends_on:
  - proximity-physics
influences:
  - grouping
  - density
  - spacing-levels
conflicts_with:
  - spacing-mistakes
alternatives: []
---

# Spacing

## What

Spacing is the tokenized distance scale from `src/styles/uds-tokens.css`:

- **Base unit:** **4px**. All layout distances should land on the 4px scale (or a documented half-step).
- **Major rhythm:** prefer multiples of **8** (8, 16, 24, 32) for element and region spacing.
- **Half-step of that 8pt rhythm:** **4px** for tight icon + label gaps and small text blocks.
- **Gap tokens:** `--uds-gap-2|4|8|12|16|20|24|32|40` (px)
- **Spacing tokens:** `--uds-spacing-0` … `2,4,6,8,10,12,14,16,18,24,32,36,40,48,64,80` (px)

Use these for padding, gaps, and stack rhythm—not arbitrary pixels. Composition prefers **4 / 8 / 12 / 16 / 24**; other token steps exist for component chrome, not free invention.

Line-heights from `--uds-type-*` stay on the **4px** scale so type sits on the same spatial grid ([`typography`](./typography.md)). Confidence: Preferred.

## Why

Consistent spacing encodes proximity and hierarchy. Ad-hoc or odd (non-4) pixels break density recipes, centering, and Figma parity.

## When

Every layout gap and padding decision. Prefer the next token step over inventing values.

## Usage

| Step | Typical use |
|------|-------------|
| **4px** | Half-step of the 8pt major rhythm — tight inline gaps (icon + label), small text blocks |
| **8px** | Control chrome / stacked-text max |
| **12 or 16px** | **Inner** gaps within a first-level item ([`spacing-levels`](../semantics/spacing-levels.md)) |
| **16 or 24px** | **Outer** gaps around first-level items / page inset ([`spacing-levels`](../semantics/spacing-levels.md)) |
| **32px+** | Rare major region breaks only |

### Element-first vs content-first

When padding and fixed height fight, pick one priority:

| Approach | Prioritize | UDS examples |
|----------|------------|--------------|
| **Element-first** | Predetermined control height / size | `Button`, `Input`, `Select`, icon-only `size="icon"` (44) — use shipped sizes; don’t invent padding that fights the height |
| **Content-first** | Strict internal padding; height follows content | `Table` / list cells, `Card` / `CardContent` body stacks — keep padding tokens; allow variable row height |

### Borders and box model

Runtime uses **`border-box`**. Figma measures the frame (stroke accounting differs from CSS). Prefer shipped component chrome over hand-redlining border offsets — see [`borders`](./borders.md).

In Figma, bind padding and item spacing to `uds/gap/*`—never detached px.

**FAIL IF:** invent odd/non-token px (e.g. 5, 7, 15) or off-scale stacks outside `--uds-gap-*` / spacing tokens.

## How AI should reason

1. Start from the **4px** base; prefer **8×** for major rhythm and **4** for tight icon/text.
2. Classify outer (first-level peers) vs inner (inside an item) → [`spacing-levels`](../semantics/spacing-levels.md).
3. Outer → **16 or 24**; inner → **12 or 16**.
4. Title + description pair → [`stacked-text`](../semantics/stacked-text.md) (0–8), not 12/16.
5. Controls → element-first (shipped sizes); tables/card bodies → content-first (padding tokens).
6. Stay on `--uds-gap-*` tokens.

Confidence: Required — Use `--uds-gap-*` / spacing tokens; do not hardcode arbitrary px stacks.

Confidence: Required — Follow spacing-levels for outer 16/24 and inner 12/16.

Confidence: Preferred — Element-first for controls; content-first for variable-copy surfaces.

## Relationships

### Supports

- Proximity, grouping, density

### Requires

- Design physics: proximity / whitespace

### Influences

- Forms, dashboards, choosing-spacing

### Uses

- `--uds-gap-*` tokens

### Conflicts With

- Spacing mistakes

### Alternatives

- —

### Depends On

- proximity-physics

### Referenced By

- relationships/spacing-scale.md, decision-rules/choosing-spacing.md

## See also

- [Spacing levels (outer vs inner)](../semantics/spacing-levels.md)
- [Spacing scale](../relationships/spacing-scale.md)
- [Choosing spacing](../decision-rules/choosing-spacing.md)
- [Proximity](../semantics/proximity.md)
- [Typography](./typography.md)
- [Borders](./borders.md)
- [Sizing](./sizing.md)
