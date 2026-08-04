---
id: headings
category: accessibility
type: concept
priority: high
ai_priority: high
confidence_default: preferred
related:
  - hierarchy
  - section-header-ontology
  - readability
components:
  - SectionHeader
  - Text
  - DialogTitle
patterns:
  - dashboards
  - detail-pages
  - forms
tokens:
  []
depends_on:
  - hierarchy
influences:
  - content-hierarchy-tree
  - dashboards
conflicts_with:
  - accessibility-mistakes
alternatives:
  []
---
# Headings

## What

Page and section titles form a logical heading outline (one h1-equivalent page title, then section headings).

## Why

AT users navigate by headings. Fake bold paragraphs break that outline.

## When

Every page in `AppShell.Main`, dashboard sections, settings groups, dialog titles.

## UDS implementation

| Need | Component |
|------|-----------|
| Page title (h1) | `PageHeaderTitle` — heading/**28** (largest on the page) |
| Section title + optional actions | `SectionHeader` (first-party) — **body/20/semibold** (`h2`, recommended) |
| Semantic text roles | `Text` with `variant="heading"` sizes 24/28/32; section `h2` prefer body/20/semibold |
| Dialog title | `DialogTitle` (required for naming) |
| Body copy | `Text` `variant="body"` (default size 14) |

Do not skip levels for style (e.g. jump body → display without a section heading). Visually, keep in-page headlines **at least 1–2 sizes smaller** than the page title.

## How AI should reason

1. One primary page title (`PageHeaderTitle`), then `SectionHeader` per major block at a smaller type size.
2. Use SectionHeader/Text—not oversized `div` with font classes alone.
3. Dialog: always DialogTitle.

Confidence: Preferred — SectionHeader for section titles in AppShell.Main.

Confidence: Preferred — Page title largest; other headlines ≥1 size step smaller.


## Relationships

### Supports

- Hierarchy
- Screen reader nav

### Requires

- SectionHeader / Text

### Influences

- Dashboards
- Detail pages

### Uses

- SectionHeader
- Text heading variant
- DialogTitle

### Conflicts With

- Bold divs as headings

### Alternatives

- —

### Depends On

- hierarchy

### Referenced By

- semantics/hierarchy.md



## See also

- [Hierarchy](../semantics/hierarchy.md)
- [SectionHeader ontology](../ontology/section-header.md)
- [Content hierarchy tree](../decision-rules/trees/content-hierarchy.md)
