---
id: grammar-rules
category: grammar
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - grammar-hierarchy
  - grammar-regions
  - buttons-tree
components:
  - Button
  - AppShell
  - Menu
patterns:
  - forms
  - dialogs
  - navigation
tokens:
  []
depends_on:
  - grammar-hierarchy
influences:
  - forms
  - dialogs
  - dashboards
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Grammar rules

## What

Valid construction rules for UDS interfaces.

## Core rules

| Rule | Why |
|------|-----|
| Buttons belong inside **actions** | Actions encode intent (submit, cancel, navigate). Orphan buttons lack context. |
| Actions belong inside **patterns** | Patterns (form, dialog, table toolbar) own when actions appear. |
| Patterns belong inside **sections** | Sections provide hierarchy headings and scanning structure. |
| Sections belong inside **pages** | Pages map to routes / main content. |
| Pages belong inside **regions** | AppShell regions (main, listview, header…) own scroll and chrome. |
| Product nav belongs in **Menu** inside `AppShell.menu` | Spatial stability; do not reinvent rails with `Sidebar*` unless you own CSS. |
| Tokens style **components**, not raw page divs | Keeps brand modes and a11y intact. |

## How AI should reason

1. Name the pattern (form / table / dashboard / dialog…).
2. Place it in a section under `AppShell.Main` (or listview).
3. Attach actions to that pattern.
4. Only then choose Button appearances.

Confidence: Required — Authenticated screens use AppShell + Menu.

Confidence: Preferred — One primary button per action group (`PageHeaderActions` / `FilterbarActions`: exactly one primary, default size; bold DotsThree overflow last on the right when more than three — see [`toolbar-action-slots`](../semantics/toolbar-action-slots.md)).


## Relationships

### Supports

- Consistent composition

### Requires

- Grammar hierarchy
- Regions

### Influences

- All decision trees

### Uses

- Button
- AppShell
- Menu

### Conflicts With

- Layout anti-patterns

### Alternatives

- —

### Depends On

- grammar-hierarchy

### Referenced By

- decision-rules/trees/



## See also

- [Hierarchy](./hierarchy.md)
- [Regions](./regions.md)
