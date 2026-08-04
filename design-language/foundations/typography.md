---
id: typography
category: foundation
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - hierarchy
  - readability
  - typography-scale
  - section-header-ontology
components:
  - Text
  - SectionHeader
patterns:
  - dashboards
  - forms
  - detail-pages
tokens:
  - "--uds-font-family"
  - "--uds-font-size-14"
  - "--uds-font-weight-semibold"
depends_on:
  []
influences:
  - hierarchy
  - readability
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Typography

## What

UDS type is Inter-based (`--uds-font-family`) exposed through the `Text` component and `--uds-type-*` / `--uds-font-size-*` tokens.

## Why

Ad-hoc font sizes break hierarchy and dark/light theme type ramps.

## When

All product copy. Prefer `Text` / `SectionHeader` over raw Tailwind text sizes for semantic roles.

## Text API (`src/components/ui/text.tsx`)

| Prop | Values |
|------|--------|
| `variant` | `body` \| `heading` \| `display` |
| `size` (body) | 10, 12, **14 (default)**, 16, 18, 20 |
| `size` (heading) | **24 (default)**, 28, 32 |
| `size` (display) | 36, 48 (default), 60, 72, 96, 128 |
| `appearance` | primary/secondary/tertiary/quaternary/disabled/placeholder/inverse + brand-* + link-* |
| `weight` | regular / medium / semibold / bold → `font-uds-*` |
| `lineHeight` | regular \| tight \| loose |

## How AI should reason

1. Page title → `PageHeaderTitle` (heading/**28** by default) — largest headline on the page.
2. Section / in-page headlines (`h2`) → `SectionHeaderTitle` or Text **body/20/semibold** (recommended) — below the page title ([`hierarchy`](../semantics/hierarchy.md)).
3. Body → Text `body` size 14 default.
4. Map importance to `appearance` (primary vs secondary), not random hex.
5. Avoid display sizes inside dense AppShell.Main ops screens.

Confidence: Required — Use Text/SectionHeader + tokens; do not hardcode font stacks.

Confidence: Preferred — Page title largest; other headlines ≥1 size step smaller.


## Relationships

### Supports

- Hierarchy
- Readability

### Requires

- Font tokens

### Influences

- All patterns

### Uses

- Text
- SectionHeader
- --uds-font-*
- --uds-type-*

### Conflicts With

- Ad-hoc px type

### Alternatives

- —

### Depends On

- —

### Referenced By

- relationships/typography-scale.md



## See also

- [Typography scale](../relationships/typography-scale.md)
- [Hierarchy](../semantics/hierarchy.md)
- [Headings a11y](../accessibility/headings.md)
