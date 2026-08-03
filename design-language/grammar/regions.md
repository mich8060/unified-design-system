---
id: grammar-regions
category: grammar
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - grammar-rules
  - appshell-ontology
  - menu-ontology
  - detail-pages
  - appshell-body-surface
  - appshell-main-containment
  - color
  - listview-drives-main
components:
  - AppShell
  - Menu
  - MainContent
  - AppShell.Header
  - AppShell.Footer
patterns:
  - navigation
  - detail-pages
tokens:
  - --appshell-menu-width-expanded
  - --appshell-listview-width
  - "--uds-surface-secondary"
  - "--uds-container-xl"
depends_on:
  - spatial-stability
  - appshell-body-surface
  - appshell-main-containment
influences:
  - detail-with-listview
  - auth-shell
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# AppShell region grammar

## What

AppShell defines regions: **menu**, **header**, **main**, **listview**, **footer**. Each has a job.

## Why

Regions stabilize navigation and scroll. Putting page content in the wrong region breaks master–detail and router outlet behavior.

## When

All authenticated product UI. See `ai/appshell.schema.json` for props.

## Region rules

| Region | Contains | Does not contain |
|--------|----------|------------------|
| `menu` | Canonical `Menu` | Ad-hoc `Sidebar*` + fixed rail CSS (unless product owns it) |
| `header` | Page-level chrome / `AppShell.Header` | Primary product nav |
| `main` | Page sections & patterns (`AppShell.Main`) on **surface secondary** canvas; contain with `MainContent` **edge** or **fixed** ([`appshell-main-containment`](../semantics/appshell-main-containment.md)) | Global nav; painting all of Main primary white |
| `listview` | Master list / queue that **drives Main** ([`listview-drives-main`](../semantics/listview-drives-main.md)) | Detail editor (belongs in main); product nav (belongs in Menu) |
| `footer` | Secondary app chrome — in-flow at end of main (not fixed), 48px above | Primary nav |
| **body** (`.appshell--body`) | Header + content row beside menu | Must use `--uds-surface-secondary` — see [`appshell-body-surface`](../semantics/appshell-body-surface.md) |

## How AI should reason

1. Default `enableRouterOutlet={false}` for static demos; use layout routes when outlet is enabled.
2. Only `.appshell--main` scrolls for master–detail; listview uses `Toolbar` titlebar + `data-slot="appshell-listview-scroll"`.
3. Never CSS-collapse the outlet to “fix” empty main.
4. Body/main canvas is `--uds-surface-secondary`; put Cards (primary) on top—do not recolor Main to primary white. For Main width modes use `MainContent` (`edge` | `fixed`) — [`appshell-main-containment`](../semantics/appshell-main-containment.md).

Confidence: Required — Menu in menu slot; page content in Main.

Confidence: Required — AppShell body uses surface secondary.


## Relationships

### Supports

- Spatial stability
- Master–detail

### Requires

- AppShell
- Menu

### Influences

- Detail pages
- Navigation

### Uses

- AppShell regions
- CSS variables

### Conflicts With

- Bespoke shells
- Sidebar-in-menu hacks

### Alternatives

- —

### Depends On

- spatial-stability

### Referenced By

- ai/guides/appshell-navigation.md



## See also

- [Listview when it drives Main](../semantics/listview-drives-main.md)
- [AppShell body surface](../semantics/appshell-body-surface.md)
- [AppShell ontology](../ontology/appshell.md)
- [Navigation guide](../../ai/guides/appshell-navigation.md)
