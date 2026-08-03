---
id: overflow
category: composition
type: concept
priority: high
ai_priority: high
confidence_default: required
related:
  - grammar-regions
  - detail-pages
  - appshell-ontology
  - card-ontology
  - corner-radius
components:
  - AppShell
  - Card
  - StatisticCard
  - ScrollArea
patterns:
  - detail-pages
tokens:
  []
depends_on:
  - grammar-regions
influences:
  - detail-with-listview
conflicts_with:
  - layout-mistakes
alternatives:
  []
---
# Overflow & scrolling

## What

Two related concerns:

1. **AppShell scroll ownership** — **only `.appshell--main` scrolls** for master–detail. Listview uses a pinned header + `data-slot="appshell-listview-scroll"` body.
2. **Content box clipping** — Bordered / rounded containers that hold page content should use **`overflow: hidden`** unless something must escape the box.

## Why

Wrong AppShell overflow creates double scrollbars or clipped queues—the most common AppShell integration bug.

Missing `overflow-hidden` on content boxes lets child backgrounds, tables, and media spill past the corner radius, so edges look ragged instead of clean.

## Content boxes (`overflow-hidden`)

**Preferred:** Unless otherwise necessary, boxes that contain content (`Card`, `StatisticCard`, Alert, Dialog/AlertDialog surfaces, custom bordered panels) use **`overflow-hidden`** so children clip to the border radius and the outline stays a clean **1px** edge.

| Do | Don’t |
|----|--------|
| `Card` / `StatisticCard` (package defaults include `overflow-hidden`) | Custom bordered `div` with radius but `overflow: visible` and children that paint past corners |
| Clip table/media to the card radius | Rely on the child to “almost” match the parent radius |

**When to opt out:** Portals / floating UI that must escape (menus, popovers, tooltips), sticky headers that need to stick outside a clip, or intentional scroll regions (`overflow-auto` / `overflow-y-auto` on an inner pane — keep the **outer** box clipped when possible).

### Do not clip readable copy

`overflow-hidden` must **not** silently cut off sentences, buttons, or table rows. Prefer:

1. Let **Main** scroll (default AppShell contract) so Cards grow with content, or
2. Put a **`min-h-0 flex-1 overflow-y-auto`** region **inside** `CardContent` for intentionally bounded tall lists/tables, or
3. Allow text to **wrap** — do not fix a Card height that truncates body copy mid-word.

**FAIL IF:** Card / panel body text or controls are cut off at the edge with no inner scroll region. **FAIL IF:** `line-clamp` / fixed height hides required product copy.

Confidence: Preferred — Content boxes use `overflow-hidden` unless escape or inner scroll requires otherwise.

Confidence: **Required** — Never ship clipped readable content inside Cards.

## AppShell scroll rules

1. Shell: `className="min-h-dvh w-full min-w-0"`.
2. `html`, `body`, `#root` fill the viewport.
3. Listview: flex column; header `shrink-0`; list body on `data-slot="appshell-listview-scroll"`.
4. Do **not** CSS-collapse `.appshell--main > :first-child` to hide an empty router outlet.
5. Long tables: scroll inside Main or use recipe patterns—not nested page scroll on `body`.

**Recipe:** `ai/recipes/detail-with-listview.md`.

Confidence: Required — Honor AppShell scroll contract.


## Relationships

### Supports

- Master–detail

### Requires

- AppShell regions

### Influences

- detail-with-listview

### Uses

- appshell--main
- appshell-listview-scroll

### Conflicts With

- layout-mistakes

### Alternatives

- —

### Depends On

- grammar-regions

### Referenced By

- patterns/detail-pages.md
- ai/guides/appshell-navigation.md



## See also

- [Regions](../grammar/regions.md)
- [Detail pages](../patterns/detail-pages.md)
- [Detail listview recipe](../../ai/recipes/detail-with-listview.md)
