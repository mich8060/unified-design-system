---
id: layout-mistakes
category: anti-pattern
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
  - grammar-regions
  - appshell-ontology
  - choosing-layout
  - page-composition
  - screen-layout-patterns
  - listview-drives-main
components:
  - AppShell
  - Menu
patterns:
  - navigation
tokens:
  []
depends_on:
  []
influences:
  []
conflicts_with:
  - grammar-rules
alternatives:
  - auth-shell
  - detail-with-listview
---
# Layout mistakes

## What

Contract-normative layout anti-patterns (from `ai/uds-contract.json` → `antiPatterns`).

## Never do this

- Do not build a bespoke outer shell with raw div/aside markup when AppShell plus Menu already fits the screen.
- Do not put Sidebar* in AppShell.menu and add fixed inset-y-0 rail CSS — use Menu in menu.
- Do not use AppShell props sidebarWidth, showListview, or mainClassName — they are not on the published API.
- Do not use CSS that collapses .appshell--main > :first-child to fix layout.
- Do not render a second `<Outlet />` (or full page UI) as AppShell children when `enableRouterOutlet` is `true` (default) — that double-mounts the page. Use the bundled outlet alone, or set `enableRouterOutlet={false}` and put **one** `<Outlet />` in `AppShell.Main`.
- Do not assume consumer-only react-router-dom fills AppShell without a layout route under the same router.
- Do not stack every `AppShell.Main` section full-width with little or no gap — use **16 or 24px** between sections and prefer **2–3 columns**.
- Do not default every section to a **full-width Card** — pick a page pattern and width band from [`page-composition`](../semantics/page-composition.md) (and anatomy from [`screen-layout-patterns`](../patterns/screen-layout-patterns.md)); use spacing, headings, and grouping instead of boxing everything.
- Do not stretch reading copy, simple forms, or small content groups past **~720px** across the full Main width — use **columns** (or `max-w-[720px]` / `--uds-container-prose`) to utilize wider space.
- Do not fake master–detail with a DIY split only inside Main when the collection drives Main — use AppShell `listview` (pattern **05**).
- Do not wrap lean checklist / upload rows in Cards for decoration (pattern **08**) — use section headers + divided rows.
- Do not flush content to the edges of bordered / filled boxes — add padding around boxed content.
- Do not leave more than **24px** between the bottom of `PageHeader` and the first content item (no stacked gap + margin).
- Do not pad the **fixed** `MainContent` outer panel left/right, or wrap the whole fixed page in an extra Card/box — use the inner 1000px’s built-in **24px** padding instead.

## How AI should reason

1. Start from `auth-shell` / AppShell + Menu.
2. Master–detail → `listview` prop + `detail-with-listview` recipe.
3. Static apps → `enableRouterOutlet={false}`. Routed apps → **one** outlet (bundled **or** explicit in `AppShell.Main`), never both.
4. If outlet is empty, fix routes—do not CSS-collapse `.appshell--main > :first-child`.

Confidence: Required — These match the published contract.


## Relationships

### Supports

- Correct shell composition

### Requires

- AppShell
- Menu

### Influences

- All authenticated screens

### Uses

- ai/recipes/auth-shell.md

### Conflicts With

- grammar-regions (when violated)

### Alternatives

- Published recipes

### Depends On

- —

### Referenced By

- AGENTS.md
- grammar/regions.md



## See also

- [Choosing layout](../decision-rules/choosing-layout.md)
- [Regions](../grammar/regions.md)
- [Auth shell recipe](../../ai/recipes/auth-shell.md)
