---
id: toolbar-ontology
category: ontology
type: object
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - toolbar-action-slots
  - listview-drives-main
  - page-header-ontology
  - filterbar-ontology
  - hierarchy
components:
  - Toolbar
patterns:
  - detail-with-listview
  - detail-pages
  - tables
tokens:
  - "--uds-spacing-8"
  - "--uds-spacing-12"
  - "--uds-gap-8"
depends_on:
  - grammar-hierarchy
influences:
  - listview-drives-main
conflicts_with: []
alternatives: []
---
# Toolbar

## What

`Toolbar` **is-a** horizontal chrome bar with **three regions**: leading actions, centered title/metadata, trailing actions. In AppShell **`listview`**, Toolbar is the **primary titlebar** for the entity list below.

## API (system facts)

| Prop / part | Values |
|-------------|--------|
| `size` | **`default`** (min-height **44px**) \| **`lg`** (min-height **56px**, for stacked title + description) |
| `ToolbarStart` | Leading actions (buttons, links, icon controls) |
| `ToolbarCenter` | Title + optional description / metadata |
| `ToolbarTitle` | Primary label in center |
| `ToolbarDescription` | Secondary metadata under/ beside title |
| `ToolbarEnd` | Trailing actions |
| `ToolbarGroup` | Cluster controls inside Start or End |
| `ToolbarDivider` | Vertical rule inside Start/End groups |

## Usage

```tsx
<Toolbar size="default">
  <ToolbarStart>
    <Button size="icon" variant="ghost" aria-label="Back">…</Button>
  </ToolbarStart>
  <ToolbarCenter>
    <ToolbarTitle>Placement review</ToolbarTitle>
    <ToolbarDescription>Updated 2h ago</ToolbarDescription>
  </ToolbarCenter>
  <ToolbarEnd>
    <Button variant="outline">Share</Button>
    <Button>Save</Button>
  </ToolbarEnd>
</Toolbar>
```

| Size | When |
|------|------|
| **default** (44) | Compact bars; single-line title or short meta |
| **lg** (56) | Title + description stack needs more vertical room |

Trailing actions still follow [`toolbar-action-slots`](../semantics/toolbar-action-slots.md) when the End slot is a page/list action cluster (one primary; overflow behind DotsThree when >3).

Chrome: **radius 0**, **border-bottom only** (no side/top border).

**Listview titlebar (Required):** In `listview`, use Toolbar for the queue name + count/meta (`ToolbarTitle` / `ToolbarDescription`). Prefer `size="lg"` when title + description stack. See [`listview-drives-main`](../semantics/listview-drives-main.md).

**FAIL IF:** Put the page title in Toolbar when `PageHeader` is already present (Toolbar center is local context, not the page H1). **FAIL IF:** Invent a custom title/count block in listview instead of Toolbar.

## How AI should reason

1. Compose **Start → Center → End**; do not invent a separate three-column flex.
2. Prefer `size="default"` unless center needs stacked title + description → `lg`.
3. Prefer `PageHeader` / `Filterbar` for full page chrome; use `Toolbar` for local panel/section toolbars **and** for AppShell listview titlebars.
4. Listview entities below the titlebar are **`Item`** or **`Card`**.

Confidence: Preferred — Use published Toolbar slots and sizes.  
Confidence: Required — Listview primary header is Toolbar.

## See also

- [Listview when it drives Main](../semantics/listview-drives-main.md)
- [Toolbar action slots](../semantics/toolbar-action-slots.md)
- [Page header](./page-header.md)
- [Filterbar](./filterbar.md)
