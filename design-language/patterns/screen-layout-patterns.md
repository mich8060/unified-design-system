---
id: screen-layout-patterns
category: pattern
type: pattern
priority: critical
ai_priority: critical
confidence_default: preferred
related:
  - page-composition
  - choosing-patterns
  - layout-tree
  - choosing-layout
  - dashboards
  - tables
  - forms
  - lists
  - detail-pages
  - cards
  - filters
  - listview-drives-main
  - appshell-main-containment
  - layout-mistakes
components:
  - AppShell
  - Menu
  - MainContent
  - MainStack
  - PageHeader
  - Filterbar
  - Table
  - Card
  - Item
  - Status
  - Badge
  - Tabs
  - Progress
  - StatisticCard
  - Sheet
patterns:
  - analytics-overview
  - workspace-dashboard
  - ops-queue-dashboard
  - data-workflow-table
  - detail-with-listview
  - settings-nav-panel
tokens:
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - page-composition
  - intent
  - grammar-regions
influences:
  - choosing-patterns
  - choosing-layout
  - layout-tree
conflicts_with:
  - layout-mistakes
  - visual-noise
alternatives: []
design_intent:
  - scanability
  - navigation
  - comparison
  - editing
  - discovery
---

# Screen layout patterns

## What

A **structural inventory** of whole-page anatomies (01–11). Use it **after** intent and [`page-composition`](../semantics/page-composition.md) pre-layout questions, **before** inventing a vertical Card stack.

This document owns **page shape** (regions, columns, chrome). Component APIs stay in ontology; implementation fixtures stay in `ai/recipes/` and `ai/examples/`.

## Why

Agents default to full-width Card stacks. Named anatomies force a choice: chart+feeds, table workflow, listview master–detail, nav+panel, lean checklist, and so on.

## When

Any authenticated product screen. Pair with [`choosing-patterns`](../decision-rules/choosing-patterns.md) and the [`layout` tree](../decision-rules/trees/layout.md).

## Translation note (Required)

Product screenshots may show a **narrow unlabeled icon rail**. In UDS that frame is **`AppShell` + `Menu` + Header** — not a bespoke icon-only rail. Only navigation **items** change across modules; the shell does not.

Confidence: **Required** — Authenticated chrome is AppShell + Menu + Header.

---

## Cross-cutting conventions

### Constant product shell

**Required:** Every authenticated screen shares `AppShell` with `Menu` in `menu` and page content in `AppShell.Main` via `MainContent`. Header search / trailing utilities stay in AppShell Header props (`headerSearchProps`, `headerRight`, or `hideSearch` / `headerLeading`).

### Status is never color-only

**Required:** Status / urgency always pairs color with a **text label** (and optionally a dot or icon). See [`status`](../ontology/status.md). Prefer `appearance="outlined"`.

**FAIL IF:** Hue alone communicates state (Active / Pending / Verifying / Confirmed).

### Colored left border (optional accent)

**Preferred:** A thin colored left border on a row or card may encode **type or urgency** *in addition to* Status/Badge — never instead of a label. Reuse across feeds, finance rows, agenda cards, and escalation cards.

### Progress as one primitive

**Preferred:** The same `Progress` (thin rounded bar) may appear as chart fill rate, tier response rate, or wizard section completion. Do not invent a second progress visual language.

### Shared table / list chrome

**Preferred:** Dense record screens repeat the same Filterbar anatomy: `SearchInput` + icon-only filter/sort (`size="icon"`) in `FilterbarFilters`, saved-filter chips, then in-surface toolbar (bulk select, icon cluster, one primary, overflow last). See [`filterbar`](../ontology/filterbar.md) and [`toolbar-action-slots`](../semantics/toolbar-action-slots.md).

### Pagination footer

**Preferred:** Items-per-page control on the **bottom-left**; numbered pager with prev/next on the **bottom-right** — identical across dense table screens.

---

## Pattern → UDS map

| # | Name | Primary UDS routing |
|---|------|---------------------|
| 01 | Analytics dashboard | [`analytics-overview`](../../ai/recipes/analytics-overview.md) |
| 02 | Command home | [`workspace-dashboard`](../../ai/recipes/workspace-dashboard.md) / [`ops-queue-dashboard`](../../ai/recipes/ops-queue-dashboard.md) |
| 03 | Dense data table | [`data-workflow-table`](../../ai/recipes/data-workflow-table.md) |
| 04 | Record card list | Same chrome as 03; rows as `Item` / Card (no dedicated recipe yet) |
| 05 | Master–detail split | [`detail-with-listview`](../../ai/recipes/detail-with-listview.md) — **Required** `listview` |
| 06 | Calendar + agenda | Two-column Main; closest [`ops-queue-dashboard`](../../ai/recipes/ops-queue-dashboard.md) |
| 07 | Form wizard | Closest [`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md) + Progress + sticky footer |
| 08 | Checklist / upload | Section headers + divided rows; **no** Card chrome (compose) |
| 09 | Finance summary | Two-column summary; [`workspace-dashboard`](../../ai/recipes/workspace-dashboard.md) peers |
| 10 | Timeline / itinerary | Full-width stacked Cards + Status/Badge |
| 11 | Tiered escalation table | Table expand → nested Cards (compose) |

---

## Pattern catalog

### 01 — Analytics dashboard (widget grid)

**Anatomy**

- Top: chart region (~2/3) + tabbed activity feed (~1/3)
- Bottom: three equal feed cards (title + count Badge + Tabs + scrollable rows + “See all”)
- Activity row template: actor (role) · verb · linked entity · relative time

**UDS regions:** `AppShell.Main` → `MainContent` edge + `MainStack`; short regions share `lg:grid-cols-2` / chart `col-span-2` + aside; bottom `lg:grid-cols-3`.

**Recipe:** [`analytics-overview`](../../ai/recipes/analytics-overview.md) · example [`analytics-overview.tsx`](../../ai/examples/analytics-overview.tsx)

**When:** Team landing that needs trend + several parallel queues.

**FAIL IF:** Skinny full-width feed/callout stacks instead of sharing a row at `lg+`.

---

### 02 — Command home (quick actions + digests)

**Anatomy**

- PageHeader + secondary Filterbar / chips
- Horizontal quick-action strip (ghost / secondary icon+label buttons)
- Left (~2/3): stacked collection digests (mini-cards with left-border accent) + recent activity
- Right (~1/3): compact calendar + approaching due-dates list

**UDS regions:** In-Main two-column grid; do **not** fake listview unless selection drives Main.

**Recipe:** [`workspace-dashboard`](../../ai/recipes/workspace-dashboard.md) or [`ops-queue-dashboard`](../../ai/recipes/ops-queue-dashboard.md)

**When:** Personal “what do I need to do” home (vs 01’s analytics).

**FAIL IF:** Full-width stack of digest lists when a calendar/due rail can share the row.

---

### 03 — Dense data table

**Anatomy**

- PageHeader (title + count; one primary in `PageHeaderActions`)
- Filterbar (search + icon filters + chips)
- Optional in-card toolbar (bulk checkbox, icon cluster, primary Add, overflow last)
- Sortable `Table` with Status (dot + label) and trailing row actions in `w-0` cell
- Pagination footer (items-per-page left, pager right)
- Variant: persistent right filter rail → prefer `Sheet` `side="right"` or in-Main filter column — not a DIY AppShell rail

**UDS regions:** `MainContent` edge; full-width primary table surface.

**Recipe:** [`data-workflow-table`](../../ai/recipes/data-workflow-table.md)

**When:** Homogeneous comparable records + bulk ops (providers, contracts, pools).

**FAIL IF:** Search in `PageHeaderActions`; more than one primary; Status as color swatch only.

---

### 04 — Record card list

**Anatomy**

- Same Filterbar / toolbar chrome as **03**
- Each record is a taller card/row: identity + meta + contact + key/value + icon-only actions

**UDS mapping:** Reuse 03 chrome; render records with `Item` (`appearance="list"` or boxed) / Card — not `Table`. **Gap:** no dedicated recipe; compose from Filterbar + Item/Card.

**When:** Per-row metadata exceeds comfortable table cells, but a full detail page is too heavy.

**FAIL IF:** Different filter chrome than the table view of the same dataset; wrapping every field in nested Cards.

---

### 05 — Master–detail split

**Anatomy**

- Left browse list (~30%): filters + scrollable compact items
- Right Main (~70%): detail **or** centered empty state until selection

**UDS regions:** **Required** AppShell `listview` + `AppShell.Main` — see [`listview-drives-main`](../semantics/listview-drives-main.md). `Toolbar` titlebar; entities are `Item` or `Card`.

**Recipe:** [`detail-with-listview`](../../ai/recipes/detail-with-listview.md)

**When:** Selecting an item reveals substantially more than the list card holds (jobs, inbox, queues).

**FAIL IF:** DIY split only inside Main when the collection **drives** what Main shows.

---

### 06 — Calendar + agenda

**Anatomy**

- Optional section Tabs
- Left: legend + month grid(s) with status-coded days
- Right: chronological agenda grouped by month; left-border cards + type icon + Status

**UDS mapping:** In-Main `lg:grid-cols-2` (or calendar `col-span` + aside). Closest recipe: [`ops-queue-dashboard`](../../ai/recipes/ops-queue-dashboard.md). **Gap:** no dedicated schedule recipe.

**When:** Both “which days” and “what, in order” matter (shifts, travel).

**FAIL IF:** Calendar full-width then agenda full-width stacked when both can share a row.

---

### 07 — Multi-step form wizard

**Anatomy**

- Left: overall Progress + section links grouped by completion status (jumpable, not strictly linear)
- Main: title + helper + optional Alert + fieldset Cards (2–3 column fields)
- Sticky footer: last-saved + primary Save & Continue

**UDS mapping:** Closest [`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md) — **vertical `Tabs`** for the section rail + `TabsContent` panel. Add `Progress` in the nav for true wizards. Prefer `MainContent` fixed; keep field groups ≤720px or multi-column inside the panel. **Gap:** no dedicated wizard recipe.

**When:** Long multi-section data collection with progress and non-linear section jump.

**FAIL IF:** Single endless full-width Card; hiding progress; locked submit without visible prerequisites.

---

### 08 — Checklist / upload list

**Anatomy**

- Page title + Tabs (e.g. Requests / Uploaded)
- Section headers grouping **plain divided rows** (no Card chrome)
- Row: requirement label (+ file chip if done) · trailing Upload / download

**UDS mapping:** `Tabs` + `SectionHeader` + divided list / `Item appearance="list"`. **Gap:** lean checklist is intentional — do not upgrade to Cards for decoration.

**When:** Binary done/not-done lists where count matters more than rich metadata.

**FAIL IF:** Wrapping each requirement in a Card; table chrome for a simple checklist.

---

### 09 — Finance / summary dashboard

**Anatomy**

- Left: promo CTA Cards + recent payments list + tip banner
- Right: hero StatisticCard (optional visibility toggle) + tabs + status-bordered reimbursements list

**UDS regions:** `lg:grid-cols-2`; StatisticCards in a horizontal band when multiple metrics; short lists share a row with peers.

**Recipe:** Compose with [`workspace-dashboard`](../../ai/recipes/workspace-dashboard.md) patterns.

**When:** Money/summary page needing both “do a task” entry points and recent history without a full table.

**FAIL IF:** Full-width promo then full-width hero then full-width list when two columns fit.

---

### 10 — Timeline / itinerary cards

**Anatomy**

- Title + Tabs; optional persistent help action top-right
- Full-width stacked Cards (title, date range, facility link, Status, expand)
- Pending vs confirmed: Badge **and** border treatment (e.g. dashed vs solid)
- Plain section divider between groups; footnote at bottom

**UDS mapping:** `MainContent` edge or fixed; stacked Cards; Status/Badge for state. Full-width OK for chronological equal-weight items.

**When:** Chronological records of similar weight that do not need table density.

**FAIL IF:** Status color without label; nesting Cards inside Cards without need.

---

### 11 — Tiered escalation table (expandable → nested cards)

**Anatomy**

- Summary `Table` with Progress column + counts + expand control
- Expanded: Overview card → row of tier mini-stat Cards (each with Progress) → request Cards with actions

**UDS mapping:** Compose `Table` + `Card` + `Progress` + `Button`. **Gap:** no dedicated recipe; keep expansion **in place** (do not navigate away for the nest).

**When:** Ops monitoring where a summary row must reveal multi-level detail without a new route.

**FAIL IF:** Opening a full page for every expand; color-only Progress meaning; DIY master-detail instead of in-row expansion when Main is not driven by a collection pane.

---

## Composition gaps (this inventory)

No dedicated `ai/recipes` yet for **04, 06, 07, 08, 11**. Prefer the closest recipe above and compose from published components. Do not invent shell chrome.

| Gap | Compose from |
|-----|----------------|
| 04 Card list | Filterbar + Item/Card (mirror 03 chrome) |
| 06 Calendar + agenda | MicroCalendar / calendar subpath + Card list; ops-queue aside |
| 07 Wizard | settings-nav-panel + Progress + Field/Card + footer |
| 08 Checklist | Tabs + SectionHeader + divided Item rows |
| 11 Escalation expand | Table + nested Card grid + Progress |

---

## How AI should reason

1. State intent ([`intent`](../semantics/intent.md)).
2. Answer [`page-composition`](../semantics/page-composition.md) pre-layout questions.
3. If a collection **drives** Main → pattern **05** / listview (do not skip).
4. Match **01–11** from this inventory.
5. Open the mapped recipe or compose from the gap table.
6. Apply ≤720px / short-regions / Filterbar / Status rules.

Confidence: **Preferred** — Match a named screen-layout pattern before inventing layout.

Confidence: **Required** — Master–detail that drives Main uses AppShell `listview` (05).

---

## See also

- [Page composition](../semantics/page-composition.md)
- [Choosing patterns](../decision-rules/choosing-patterns.md)
- [Layout tree](../decision-rules/trees/layout.md)
- [Choosing layout](../decision-rules/choosing-layout.md)
- [Listview drives Main](../semantics/listview-drives-main.md)
- [Layout mistakes](../anti-patterns/layout-mistakes.md)
- [Dashboards](./dashboards.md)
- [Tables](./tables.md)
- [Forms](./forms.md)
- [Lists](./lists.md)
