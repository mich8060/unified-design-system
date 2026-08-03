---
id: navigation
category: pattern
type: pattern
priority: critical
ai_priority: critical
confidence_default: required
related:
  - menu-ontology
  - appshell-ontology
  - navigation-tree
  - spatial-stability
  - default-navigation
  - tabs-ontology
components:
  - AppShell
  - Menu
  - Breadcrumb
  - Tabs
patterns:
  - auth-shell
tokens:
  - "--appshell-menu-width-expanded"
  - "--appshell-menu-width-collapsed"
depends_on:
  - grammar-regions
  - spatial-stability
influences: []
conflicts_with:
  - layout-mistakes
alternatives: []
design_intent:
  - navigation
  - discovery
---

# Navigation

## What

Durable product navigation via **`Menu` inside `AppShell.menu`**, with optional in-page Tabs/Breadcrumb for local structure.

## Why

Spatial stability: the rail stays put while Main content changes (design physics).

## When

| Need | Solution |
|------|----------|
| Cross-page destinations | `Menu` + `navigationItems` |
| Brand lockup | `headerVariant="brand"` (default) |
| Internal tool / no lockup | `headerVariant="title"` + `headerTitle` |
| Page-local sections | Tabs / anchors — not a second global rail. Prefer `TabsList` `fill={false}` (condensed triggers; list still full width). **Required:** **24px** between `TabsList` and the next item — see [`tabs-ontology`](../ontology/tabs.md) |
| Trail | Breadcrumb |

**Recipes:** `auth-shell`, nav defaults in `ai/recipes/default-navigation.md`.  
**Guides:** `ai/guides/appshell-navigation.md`, `ai/guides/menu-header-identity.md`.

## Goal (example)

Move between Home, Queue, and Settings without re-learning layout.

## Reasoning

```
Durable destinations
→ AppShell + Menu in menu slot
→ navigationItems (Phosphor package icons)
→ headerVariant brand vs title
→ Active item: aria-current="page" / data-active from route
```

## Forbidden

- `Sidebar*` in `AppShell.menu` + fixed rail CSS
- Bespoke `aside` shell
- `docs-site-data-brand` in consumer apps

Confidence: Required — Menu in AppShell.menu for authenticated product nav.

## Relationships

### Supports

- Spatial stability, IA

### Requires

- AppShell, Menu

### Influences

- Every authenticated recipe

### Uses

- Menu brand/headerVariant, navigationItems, AppShell widths 280/64

### Conflicts With

- layout-mistakes

### Alternatives

- Breadcrumb / Tabs for local-only nav

### Depends On

- grammar-regions

### Referenced By

- grammar/regions.md, examples/navigation.md

## See also

- [Navigation tree](../decision-rules/trees/navigation.md)
- [Menu ontology](../ontology/menu.md)
- [Auth shell recipe](../../ai/recipes/auth-shell.md)
- [Default navigation](../../ai/recipes/default-navigation.md)
