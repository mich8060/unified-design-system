---
id: choosing-layout
category: decision
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - layout-tree
  - grammar-regions
  - choosing-patterns
  - page-composition
  - appshell-main-containment
  - navigation
  - listview-drives-main
  - right-side-panel
  - detail-pages
  - screen-layout-patterns
components:
  - AppShell
  - Menu
  - MainContent
patterns:
  - navigation
  - detail-pages
  - dashboards
  - forms
tokens: []
depends_on:
  - grammar-regions
  - intent
  - listview-drives-main
  - page-composition
influences: []
conflicts_with:
  - layout-mistakes
alternatives: []
---

# Choosing layout

## What

Top-level layout selection for product screens.

## Why

Wrong shell choice is the most expensive AI mistake—everything else nests incorrectly. Wrong **page width / pattern** is the next: full-width Card stacks instead of composition.

## When

Before choosing patterns or components.

## How AI should reason

1. Authenticated product → `AppShell` + `Menu` (see layout tree).
2. Does a collection **drive / change Main**? → **yes** = `listview` + Main detail ([`listview-drives-main`](../semantics/listview-drives-main.md)). Do not fake this with a split only inside Main.
3. Need **more detail about something already in Main**? → right **`Sheet`** ([`right-side-panel`](../semantics/right-side-panel.md))—not listview, not a DIY right column.
4. Answer [`page-composition`](../semantics/page-composition.md) **pre-layout questions**; match a [`screen-layout-patterns`](../patterns/screen-layout-patterns.md) anatomy (**01–11**); pick a row from the page-pattern table.
5. Pick **edge vs fixed** (and narrow prose when needed) from [`appshell-main-containment`](../semantics/appshell-main-containment.md) + width hierarchy.
6. Open the matching recipe from [`choosing-patterns`](./choosing-patterns.md) (settings-form, settings-nav-panel, data-workflow-table, workspace-dashboard, etc.).
7. Marketing/docs → may omit AppShell; still use tokens.

Confidence: Required — Authenticated product UI uses AppShell + Menu.

Confidence: Required — If list content affects Main, use AppShell `listview`.

Confidence: Required — More detail about Main content → right Sheet.

Confidence: Required — Answer page-composition questions before stacking sections.

Confidence: Preferred — Match screen-layout pattern 01–11 before inventing layout.

## Relationships

### Supports

- Spatial stability

### Requires

- Grammar regions, intent, page-composition

### Influences

- All authenticated screens

### Uses

- AppShell, Menu, MainContent

### Conflicts With

- Layout anti-patterns

### Alternatives

- Unauthenticated surfaces without shell

### Depends On

- grammar-regions
- page-composition

### Referenced By

- decision-rules/trees/layout.md

## See also

- [Page composition](../semantics/page-composition.md)
- [Listview when it drives Main](../semantics/listview-drives-main.md)
- [Right side panel](../semantics/right-side-panel.md)
- [Layout tree](./trees/layout.md)
- [Regions](../grammar/regions.md)
- [Navigation pattern](../patterns/navigation.md)
