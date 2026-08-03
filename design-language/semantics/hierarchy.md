---
id: hierarchy
category: semantics
type: concept
priority: critical
ai_priority: critical
confidence_default: required
related:
  - visual-weight
  - emphasis
  - typography
  - page-header-ontology
  - section-header-ontology
  - sheet-ontology
  - drawer-ontology
  - readability
  - stacked-text
components:
  - PageHeader
  - PageHeaderTitle
  - SectionHeader
  - SectionHeaderTitle
  - SheetTitle
  - DrawerTitle
  - Text
  - Badge
patterns:
  - dashboards
  - detail-pages
  - forms
tokens:
  - --uds-text-primary
  - --uds-text-secondary
depends_on:
  - visual-weight-physics
influences:
  - content-hierarchy-tree
  - dashboards
conflicts_with:
  - visual-noise
alternatives:
  []
---
# Visual hierarchy

## What

Visual hierarchy is the ordered presentation of information so users perceive **page title → section headers → primary content → supporting metadata** without reading every pixel.

## Why

Operational CHG tools are data-rich. Hierarchy prevents every element from competing equally, which reduces cognitive load and scanning time.

## When

Use on every page and every multi-section pattern. Increase hierarchy strength when density rises (queues, triage, analytics).

## Type size ladder (page → section) — Required

| Role | Component / pattern | Default / recommended | Rule |
|------|---------------------|----------------------|------|
| Page title | `PageHeaderTitle` **only** | heading/**28** | **Largest** headline on the page — nothing else may match or exceed |
| Section / in-page headlines (`h2`) | `SectionHeaderTitle`, Card headings, raw `h2` / `Text` | **body/20/semibold** (recommended) | Below the page title; do **not** use heading/28+ or `text-2xl`/`text-3xl` on sections |
| Panel titles | `SheetTitle`, `DrawerTitle` | **16** semibold (package default) | Below section; do **not** upsize with `text-2xl` / heading-28 |

Page title uses heading steps (**24 → 28 → 32**). Prefer page **28** + section **body/20/semibold**. Section titles may use heading/**24** only when a stronger section signal is required — still **at least 1 size step** below the page title.

**Never** match or exceed the page title with a lower headline. Do **not** use `text-2xl`, `text-3xl`, or `Text variant="heading" size="28"` except on `PageHeaderTitle`.

**FAIL IF:** SectionHeader, Card title, Sheet/Drawer title, or ad-hoc `h1`/`h2` is the same size or larger than the page title. **FAIL IF:** page title is omitted and every section uses 28/32.

## How AI should reason

1. Identify the single primary question the screen answers.
2. Assign one dominant **page** title (`PageHeaderTitle`) — largest type on the page.
3. Group supporting content under `SectionHeaderTitle` / `h2` at **body/20/semibold** (recommended).
4. Keep Sheet/Drawer titles at package default (16) — never className-upsize to page/section scale.
5. Demote metadata with secondary text / badges—not larger type.
6. For title-over-description pairs, apply [`stacked-text`](./stacked-text.md): `appearance="primary"` over `appearance="secondary"`, gap usually 0px (max 8px).

Confidence: **Required** — Page title largest; section `h2` / `SectionHeaderTitle` prefer body/20/semibold; panel titles stay 16.

Confidence: Required — Do not rely on size alone; use semantic text roles and `SectionHeader`.

Confidence: Preferred — Keep one primary CTA per section.


## Relationships

### Supports

- Readability
- Information architecture
- Content hierarchy decisions

### Requires

- Typography tokens
- Visual weight

### Influences

- Dashboards
- Forms
- Detail pages

### Uses

- SectionHeader
- Text
- Badge

### Conflicts With

- Visual noise (equal weight everywhere)

### Alternatives

- Progressive disclosure when hierarchy alone is insufficient

### Depends On

- Design physics: visual weight

### Referenced By

- decision-rules/trees/content-hierarchy.md



## See also

- [Stacked text (title + description)](./stacked-text.md)
- [Visual weight](./visual-weight.md)
- [Emphasis](./emphasis.md)
- [Typography](../foundations/typography.md)
