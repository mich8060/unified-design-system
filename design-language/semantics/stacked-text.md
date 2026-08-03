---
id: stacked-text
category: semantics
type: rule
priority: high
ai_priority: critical
confidence_default: required
related:
  - hierarchy
  - typography
  - proximity
  - readability
  - color
  - section-header-ontology
components:
  - Text
  - SectionHeader
patterns:
  - dashboards
  - lists
  - forms
  - detail-pages
  - cards
tokens:
  - "--uds-text-primary"
  - "--uds-text-secondary"
  - "--uds-gap-8"
  - "--uds-spacing-0"
depends_on:
  - typography
  - hierarchy
influences:
  - lists
  - cards
  - dashboards
  - section-header-ontology
conflicts_with:
  - visual-noise
alternatives: []
---

# Stacked text (title + description)

## What

A **stacked text pair** is two lines of copy in a vertical stack: a primary line (title / name / label) above a supporting line (description / subtext / meta).

## Why

Equal color weight on both lines flattens hierarchy. Large gaps between the pair make them read as unrelated blocks instead of one unit.

## When

Use this rule whenever you compose title-over-description, including:

- Item / list row title + meta
- Card title + supporting line
- SectionHeader title + description
- KPI label + value caption (when stacked)
- Form group legend + help line (when not using FieldDescription spacing exceptions)

## Color (required)

| Role | Text API | Token / class |
|------|----------|----------------|
| **Title / primary line** | `appearance="primary"` (default) | `--uds-text-primary` → `text-uds-text-primary` |
| **Description / subtext** | `appearance="secondary"` | `--uds-text-secondary` → `text-uds-text-secondary` |

Do **not** use the same appearance on both lines. Do **not** use tertiary/quaternary for the description in a standard title+description pair (reserve those for further-demoted meta).

## Gap (required)

| Guidance | Value |
|----------|-------|
| **Usual** | **0px** — no gap utility; let line-height separate the lines (`gap-0` / `space-y-0` / omit gap) |
| **Maximum** | **8px** — `--uds-gap-8` only when optical tightness needs a hair of air |
| **Never** | Gaps **> 8px** between the title and its description in the same pair |

Larger gaps belong **between** stacked pairs (or between sections), not inside the pair. Between first-level items use [`spacing-levels`](./spacing-levels.md) (**16 or 24** outer; **12 or 16** inside cards)—not inside the title/description pair.

## Example

```tsx
import { Text } from "@chghealthcare/unified-design-system"

function TitleDescription({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-0">
      <Text appearance="primary" weight="semibold">
        {title}
      </Text>
      <Text appearance="secondary" size="12">
        {description}
      </Text>
    </div>
  )
}
```

Optional max air:

```tsx
<div className="flex flex-col gap-[length:var(--uds-gap-8)]">
  {/* same Text pair */}
</div>
```

## How AI should reason

1. Detect a vertical title + description (or name + meta) pair.
2. Set title → `Text appearance="primary"` (or equivalent semantic primary text).
3. Set description → `Text appearance="secondary"`.
4. Set stack gap → `0` by default; allow up to `--uds-gap-8`; never 12/16/24 inside the pair.
5. If more than two levels of demotion are needed, only then use tertiary for a third line—not for the main description.

Confidence: Required — Primary line uses text-primary; description uses text-secondary.

Confidence: Required — Gap inside the pair is usually 0px and never more than 8px.

## Relationships

### Supports

- Hierarchy
- Readability
- Proximity (pair reads as one unit)

### Requires

- Text (or semantic text tokens)
- Typography foundation

### Influences

- Lists, cards, dashboards, SectionHeader descriptions

### Uses

- `--uds-text-primary`, `--uds-text-secondary`
- `--uds-gap-8` (max), `--uds-spacing-0` / `gap-0` (default)

### Conflicts With

- Same color on title and description
- `gap-12` / `gap-16` / `gap-24` between title and its own description
- Hardcoded hex text colors

### Alternatives

- Single-line title only (no description)
- FieldDescription spacing inside Field (form chrome may use Field’s built-in rhythm—still keep description secondary)

### Depends On

- typography, hierarchy

### Referenced By

- foundations/typography.md
- semantics/hierarchy.md
- ai/indexes/concept-index.md (after generate:ai)

## See also

- [Typography](../foundations/typography.md)
- [Hierarchy](./hierarchy.md)
- [Proximity](./proximity.md)
- [Color](../foundations/color.md)
