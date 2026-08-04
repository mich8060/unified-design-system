---
id: layout-tree
category: decision
type: tree
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - choosing-patterns
  - grammar-rules
  - listview-drives-main
  - choosing-layout
  - page-composition
  - appshell-main-containment
  - screen-layout-patterns
components:
  - AppShell
  - Menu
  - MainContent
patterns:
  - detail-with-listview
  - settings-form
  - settings-nav-panel
  - data-workflow-table
  - workspace-dashboard
  - screen-layout-patterns
tokens:
  []
depends_on:
  - intent
  - listview-drives-main
  - page-composition
influences:
  []
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Decision tree: Layout

## What

Branching reasoning for **layout** decisions.

## Why

Isolated tips do not scale. Trees force intent → structure → component order.

## When

Before generating or refactoring UI in this category.

## Tree

```mermaid
flowchart TD
  start[Authenticated screen?] --> shell[AppShell + Menu]
  shell --> drives{Does a collection affect or change Main?}
  drives -->|Yes| listview[listview slot + Main detail pattern 05]
  drives -->|No| main[Content in AppShell.Main]
  main --> questions[Answer page-composition questions]
  questions --> anatomy[Match screen-layout pattern 01-11]
  anatomy --> settingsIA{Settings or wizard with many sections?}
  settingsIA -->|Yes| navPanel[In-Main nav column + panel 07]
  settingsIA -->|No| width{Width need?}
  width -->|Reading or simple form| narrow[fixed MainContent or prose max-width]
  width -->|Multi-region scan| edgeGrid[edge MainContent + 2-4 col grid]
  width -->|Dominant table or timeline| full[edge full-width primary surface]
  listview --> recipes[Open matching recipe]
  navPanel --> recipes
  narrow --> recipes
  edgeGrid --> recipes
  full --> recipes
```

## Reasoning outline

Authenticated?
→ AppShell + Menu
→ Does list/collection content **affect Main**? → **listview** + Main detail — pattern **05** ([`listview-drives-main`](../../semantics/listview-drives-main.md))
→ Else → answer [`page-composition`](../../semantics/page-composition.md) pre-layout questions
→ Match [`screen-layout-patterns`](../../patterns/screen-layout-patterns.md) **01–11**
→ Settings / wizard with many sections? → in-Main nav + panel ([`settings-nav-panel`](../../../ai/recipes/settings-nav-panel.md); pattern **07**)
→ Else by width: reading/form → fixed or prose; multi-region → edge + grid; dominant table/timeline → edge full-width (**03** / **10** / **11**)
→ Open matching recipe from [`choosing-patterns`](../choosing-patterns.md)
Static app → enableRouterOutlet false

Confidence: Required — If the collection drives Main, use listview.

Confidence: Required — Answer page-composition questions before stacking sections.

Confidence: Preferred — Match screen-layout pattern 01–11 before inventing layout.

Confidence: Preferred — Follow the tree; jump to recipes only after intent is classified.


## Relationships

### Supports

- Deterministic AI composition

### Requires

- Intent
- page-composition

### Influences

- Patterns
- Ontology

### Uses

- Grammar
- Semantics

### Conflicts With

- Ad-hoc component soup

### Alternatives

- choosing-patterns for recipe routing

### Depends On

- intent
- page-composition

### Referenced By

- ai/indexes/decision-index.md



## See also

- [Page composition](../../semantics/page-composition.md)
- [Listview when it drives Main](../../semantics/listview-drives-main.md)
- [Choosing layout](../choosing-layout.md)
- [Choosing patterns](../choosing-patterns.md)
- [AppShell.Main containment](../../semantics/appshell-main-containment.md)
- [Grammar rules](../../grammar/rules.md)
