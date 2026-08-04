---
id: detail-pages
category: pattern
type: pattern
priority: critical
ai_priority: critical
confidence_default: required
related:
  - overflow
  - grammar-regions
  - layout-tree
  - lists
  - listview-drives-main
  - choosing-layout
components:
  - AppShell
  - Menu
  - SectionHeader
  - Item
  - Status
  - Badge
patterns:
  - detail-with-listview
tokens:
  - "--appshell-listview-width"
depends_on:
  - grammar-regions
  - overflow
  - listview-drives-main
influences:
  - detail-with-listview
conflicts_with:
  - layout-mistakes
alternatives:
  - tables
design_intent:
  - scanability
  - editing
  - navigation
---

# Detail pages (master–detail)

## What

Collection + entity detail using AppShell **`listview`** + **`AppShell.Main`**.

## Why

Keeps the queue visible while inspecting one record—standard for credentialing/ops review.

## When

**Trigger:** the collection **affects / drives** what Main shows → always use `listview` ([`listview-drives-main`](../semantics/listview-drives-main.md)).

Use recipe **`detail-with-listview`** (`ai/recipes/detail-with-listview.md`, `ai/examples/detail-with-listview.tsx`).

## Scroll contract (required)

1. Shell: `className="min-h-dvh w-full min-w-0"`.
2. Only `.appshell--main` scrolls.
3. Listview: flex column; pinned header `shrink-0`; list body on `data-slot="appshell-listview-scroll"`.
4. Listview width: `--appshell-listview-width` / `listviewWidth` **320–480px** (default 320).
5. Never CSS-collapse `.appshell--main > :first-child` to hide an empty outlet.

## Goal (example)

Review one assignment while scanning the queue.

## Reasoning

```
Master–detail intent
→ AppShell listview + Main
→ Pinned list header (+ SearchInput) + scroll body
→ Toolbar titlebar + Item (list) or Card entities
→ Detail sections / SectionHeader in Main
```

Confidence: Required — Honor listview scroll contract.

Confidence: Required — Listview pane composition is flat (not outlined Item cards). See [`listview-drives-main`](../semantics/listview-drives-main.md).

## Relationships

### Supports

- Queue review workflows

### Requires

- AppShell listview, overflow rules

### Influences

- Item/Status usage

### Uses

- listview slot, appshell-listview-scroll, SectionHeader

### Conflicts With

- layout-mistakes, body scroll hacks

### Alternatives

- Full Table page without listview when no persistent master pane

### Depends On

- overflow, grammar-regions

### Referenced By

- composition/overflow.md, ai/guides/appshell-navigation.md

## See also

- [Listview when it drives Main](../semantics/listview-drives-main.md)
- [Overflow](../composition/overflow.md)
- [Detail listview recipe](../../ai/recipes/detail-with-listview.md)
- [Layout tree](../decision-rules/trees/layout.md)
