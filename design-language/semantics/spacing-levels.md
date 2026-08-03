---
id: spacing-levels
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - spacing
  - choosing-spacing
  - spacing-scale
  - proximity
  - density
  - stacked-text
  - spacing-mistakes
  - appshell-main-containment
  - grid
components:
  - Card
  - Field
  - Item
  - SectionHeader
  - AppShell
  - StatisticCard
patterns:
  - dashboards
  - forms
  - lists
  - cards
tokens:
  - "--uds-gap-12"
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - spacing
  - proximity
influences:
  - choosing-spacing
  - dashboards
  - forms
  - statistic-card-ontology
conflicts_with:
  - spacing-mistakes
alternatives: []
---

# Spacing levels (outer vs inner)

## What

Layout spacing uses two bands:

| Level | Where | Allowed gaps |
|-------|--------|----------------|
| **Outer / first level** | Space **around** first-level items (page padding, gaps between sibling Cards/sections/Items in Main) | **16px or 24px** only (`--uds-gap-16` / `--uds-gap-24`) |
| **Inner / within items** | Gaps **inside** a first-level item (Card body stacks, Field groups, row internals below the title pair) | **12px or 16px** only (`--uds-gap-12` / `--uds-gap-16`) |

## Why

Outer rhythm (16/24) separates major blocks on the AppShell canvas. Inner rhythm (12/16) keeps content readable without matching the outer step—so groups read as units.

## When

Default for AppShell.Main layouts, dashboard grids, form sections, and list/card compositions.

## Outer / first-level (required)

Use **only** `--uds-gap-16` or `--uds-gap-24` for:

- Padding around the first content band in Main (page inset)
- Gap between sibling first-level blocks (Card ↔ Card, section ↔ section, Item group ↔ Item group) — **required** when stacking sections in `AppShell.Main` so the page does not feel crowded ([`appshell-main-containment`](./appshell-main-containment.md))
- Gap between a SectionHeader block and the next first-level surface when they are peers in the page stack
- Gap between peer **Statistic Cards** in a horizontal KPI row ([`statistic-card-ontology`](../ontology/statistic-card.md))
- Gap between columns in a 2–3 column Main layout

| Choice | Prefer when |
|--------|-------------|
| **24px** | **Recommended default** page inset: **edge** `MainContent` via className; **fixed** mode builds **24px** into the inner 1000px column (do not pad the outer L/R). Also airier Statistic Card rows and section stacks. |
| **16px** | Denser ops (queues, triage, tight dashboards) when 24px feels too airy — including dense Statistic Card rows and section stacks |

Do **not** use 8, 12, 20, or 32 as the default outer/first-level gap between peer items (32+ is for rare major region breaks—not routine first-level item spacing).

## Inner / within items (required)

Use **only** `--uds-gap-12` or `--uds-gap-16` for:

- Vertical stacks inside a Card / panel
- Gaps between controls inside a form group (below Field’s own label binding)
- Internal padding rhythm of a first-level container’s content column
- Gaps between sub-blocks that live **inside** one first-level item

**Boxed surfaces** (Card, bordered / filled panels) must also have **padding around the edges** so content does not touch the box — prefer `CardContent` or `--uds-spacing-16` / `--uds-spacing-24` inset ([`appshell-main-containment`](./appshell-main-containment.md)).

| Choice | Prefer when |
|--------|-------------|
| **12px** | Compact internal stacks (dense cards, filter chips + fields) |
| **16px** | Default internal stack / comfortable field rhythm |

## Exceptions (do not break these)

| Case | Rule |
|------|------|
| **Title + description pair** | [`stacked-text`](./stacked-text.md) — usually **0**, max **8px** inside that pair only |
| **Inline icon + label** | `--uds-gap-4` / `--uds-gap-8` inside a single control |
| **Component defaults** | Prefer Button/Field built-in padding; don’t fight them with outer 24 inside a 32px control |
| **Table cells** | Body **py 8px**; horizontal interior **4px**; first cell **left 16–24px**; last cell **right 16–24px**; `TableHead` ≥ **48px** — see [`table-list-ontology`](../ontology/table-list.md) |

## How AI should reason

1. Classify the gap: **between first-level peers** vs **inside one item**.
2. Outer → pick **16 or 24** (`--uds-gap-16` / `--uds-gap-24`) between stacked Main sections.
3. Prefer **2–3 columns** in Main when multiple regions compete — do not only stack full-width blocks.
4. Inner → pick **12 or 16** (`--uds-gap-12` / `--uds-gap-16`); ensure boxed content has edge padding.
5. Title/description pair → stacked-text (0–8), not 12/16.
6. Stay on the UDS gap scale—no `gap-[18px]` hacks.

### Example

```tsx
{/* Outer: 24 between first-level cards */}
<div className="flex flex-col gap-[length:var(--uds-gap-24)] p-[length:var(--uds-gap-24)]">
  <Card className="flex flex-col gap-[length:var(--uds-gap-16)] p-[length:var(--uds-gap-16)]">
    {/* Inner: 16 inside the card */}
    <div className="flex flex-col gap-0">
      <Text appearance="primary">Title</Text>
      <Text appearance="secondary">Description</Text>
    </div>
    <div className="flex flex-col gap-[length:var(--uds-gap-12)]">
      {/* Inner: 12 between fields */}
      <Field>…</Field>
      <Field>…</Field>
    </div>
  </Card>
  <Card>…</Card>
</div>
```

Confidence: Required — First-level outer gaps are 16 or 24px.

Confidence: Required — Internal gaps within items are 12 or 16px.

## Relationships

### Supports

- Proximity, density control, visual rhythm

### Requires

- Spacing tokens (`--uds-gap-*`)

### Influences

- choosing-spacing, dashboards, forms, cards

### Uses

- `--uds-gap-12`, `--uds-gap-16`, `--uds-gap-24`

### Conflicts With

- Outer gaps of 8/12 between peer Cards
- Inner stacks using 24/32 (reads as separate sections)
- spacing-mistakes (off-scale values)

### Alternatives

- Major region breaks at 32+ only when separating unrelated page regions (not routine item gaps)

### Depends On

- spacing, proximity

### Referenced By

- foundations/spacing.md
- decision-rules/choosing-spacing.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Spacing](../foundations/spacing.md)
- [Choosing spacing](../decision-rules/choosing-spacing.md)
- [Stacked text](./stacked-text.md)
- [Proximity](./proximity.md)
- [Spacing mistakes](../anti-patterns/spacing-mistakes.md)
