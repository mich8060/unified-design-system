---
id: page-composition
category: semantics
type: rule
priority: critical
ai_priority: critical
confidence_default: required
related:
 - appshell-main-containment
 - choosing-layout
 - choosing-patterns
 - layout-tree
 - grouping
 - whitespace
 - cards
 - layout-mistakes
 - listview-drives-main
 - right-side-panel
 - laws-of-ux
 - cognitive-load
 - screen-layout-patterns
components:
 - AppShell
 - MainContent
 - MainStack
 - PageHeader
 - Card
 - SectionHeader
 - Filterbar
patterns:
 - dashboards
 - detail-pages
 - forms
 - tables
tokens:
 - "--uds-container-prose"
 - "--uds-container-content"
 - "--uds-container-main"
 - "--uds-container-xl"
 - "--uds-container-wide"
depends_on:
 - intent
 - appshell-main-containment
 - grammar-regions
influences:
 - choosing-layout
 - choosing-patterns
 - dashboards
 - forms
conflicts_with:
 - layout-mistakes
 - visual-noise
alternatives: []
design_intent:
 - scanability
 - navigation
 - editing
---

# Page composition

## What

How to choose a **whole-page layout** before placing components: width hierarchy, content-type patterns, and when to use Cards vs spacing/grouping. A page is a **composition**, not a stack of full-width Cards.

Containment geometry (edge vs fixed 1280/1000) stays in [`appshell-main-containment`](./appshell-main-containment.md). **Recommended:** keep the app’s containment choice (container / fixed vs edge) **consistent across pages**. This document owns **which pattern and width band** to use inside that mode.

## Layout principles

- Do **not** make every section a full-width Card.
- Use page width to establish **hierarchy**, not simply to enlarge content.
- Keep reading-heavy content within a **comfortable maximum width**.
- **Most content blocks should not exceed 720px wide.** When Main is wider, use **columns** to divide space — do not stretch a single text, form, or small group across the full band.
- Use **multiple columns** when content groups are related but independently scannable.
- Reserve **full-width** sections for tables, timelines, dashboards KPI rows, and primary data workflows.
- Prefer **whitespace and grouping** (SectionHeader, gaps, surface changes) over placing every content block inside a container.

## Content block max width (Required)

**Required:** Treat **720px** as the default ceiling for ordinary content blocks (prose, descriptions, simple forms, single-column field groups, callout copy, compact cards of reading content). Aligns with `PageHeaderDescription` max-width (**720px**); tighter reading may use `--uds-container-prose` (**640px**).

When the available Main / panel is wider than 720px:

1. Prefer a **multi-column grid** (`lg:grid-cols-2`, `lg:grid-cols-3`, nav | panel, chart | aside) so each block stays scannable, **or**
2. Cap the block with `max-w-[720px]` / `max-w-[length:var(--uds-container-prose)]` instead of stretching it.

**May exceed 720px** when the content type genuinely needs the width: dominant tables, Filterbar toolbars, StatisticCard KPI rows, wide charts, and other data-heavy primary workflows (see page-pattern table).

```tsx
{/* Prefer columns when peers exist */}
<div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
 <Card><CardContent>…</CardContent></Card>
 <Card><CardContent>…</CardContent></Card>
</div>

{/* Or cap a lone reading/form block */}
<div className="max-w-[720px]">{/* Fields or prose */}</div>
```

**FAIL IF:** A prose block, simple form, or small content group stretches past ~720px across a wide Main solely because space is available.

Confidence: **Required** — Most content blocks ≤720px; use columns to utilize wider space.

## Recommended page patterns

Match a **screen layout pattern (01–11)** from [`screen-layout-patterns`](../patterns/screen-layout-patterns.md) when the anatomy is clear; then open the mapped recipe.

| Content type | Preferred layout | Screen pattern | UDS recipe / example |
|--------------|------------------|----------------|----------------------|
| Form or focused task | Centered narrow column / fixed reading column | — | [`settings-form`](../../ai/recipes/settings-form.md), [`narrow-form`](../../ai/recipes/narrow-form.md) |
| Multi-step / sectioned form | Nav rail + fieldset panel | **07** wizard | Closest [`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md) |
| Detail page | Main content with listview master **or** Sheet for extra detail | **05** master–detail | [`detail-with-listview`](../../ai/recipes/detail-with-listview.md), [`right-side-inspector`](../../ai/examples/right-side-inspector.tsx) |
| Analytics / widget grid | Chart + feed asides; multi-column feeds | **01** | [`analytics-overview`](../../ai/recipes/analytics-overview.md) |
| Personal / command home | Quick actions + digests + calendar/due rail | **02** | [`workspace-dashboard`](../../ai/recipes/workspace-dashboard.md), [`ops-queue-dashboard`](../../ai/recipes/ops-queue-dashboard.md) |
| Dashboard / summary | Responsive 2–4 column grid | **01** / **09** | workspace / analytics / ops / triage |
| Settings (many sections) | Vertical `Tabs` + content panel | **07**-adjacent | [`settings-nav-panel`](../../ai/recipes/settings-nav-panel.md) |
| Data-heavy workflow | Full-width table with Filterbar + pagination | **03** | [`data-workflow-table`](../../ai/recipes/data-workflow-table.md) |
| Record card list | Same chrome as table; Item/Card rows | **04** | Compose Filterbar + Item (see screen-layout-patterns) |
| Checklist / uploads | Section headers + divided rows (no Cards) | **08** | Compose Tabs + SectionHeader + Item |
| Calendar + agenda | Two-column calendar \| itinerary | **06** | Closest ops-queue aside |
| Timeline / itinerary | Full-width stacked Cards | **10** | Compose Cards + Status |
| Tiered expand-in-place | Table → nested Card clusters | **11** | Compose Table + Progress + Card |

**Shell rules still apply:** collection drives Main → AppShell `listview` (**05**); more detail about something already in Main → right `Sheet` — not a DIY inspector column.

## Width hierarchy

Define several content widths instead of one universal container. Map bands to existing tokens — do **not** invent new `MainContent` modes.

| Band | Approx. range | Token / mechanism | Typical use |
|------|---------------|-------------------|-------------|
| **Narrow / content block** | ≤**720px** (often 640) | Cap at **720px**; or `--uds-container-prose` (640); PageHeaderDescription max **720** | Default for prose, forms, small groups — **most blocks** |
| **Standard** | 960–1200px | `MainContent containment="fixed"` → outer `--uds-container-xl` (1280) + inner `--uds-container-main` (1000); or `--uds-container-content` (960) | Page chrome / panel; still split or cap blocks ≤720 inside when reading-heavy |
| **Wide** | 1280–1440px | Edge Main + **columns**; optional `--uds-container-wide` (1440) only when content needs it | Dashboards, multi-region ops |
| **Full width** | Full Main | `MainContent containment="edge"` with no artificial max-width | Dominant tables, Filterbar + table workflows, timelines |

## Pre-layout questions (Required)

Before generating a layout, answer:

1. What is the user’s primary task?
2. Which information must receive the most visual space?
3. Which content can sit beside other content?
4. Which sections need full width?
5. What should remain visible without scrolling?
6. Which page pattern best fits these relationships?
7. Which **screen layout pattern (01–11)** from [`screen-layout-patterns`](../patterns/screen-layout-patterns.md) matches the anatomy (or closest compose path)?

Then pick edge vs fixed from [`appshell-main-containment`](./appshell-main-containment.md) and open the matching recipe in [`choosing-patterns`](../decision-rules/choosing-patterns.md).

## AI composition instruction

Before placing components, select an appropriate page layout based on the content’s hierarchy and relationships. Do not default to a single vertical stack. Consider a main-and-sidebar layout, multi-column grid, split layout, or intentionally narrow content column. **Most content blocks should not be wider than 720px**; when Main is wider, use columns to divide space instead of stretching a single block. Avoid stretching text, forms, and small content groups across the full screen. Do not place every section inside a card; use spacing, headings, dividers, and background changes to establish groups.

## How AI should reason

1. State intent ([`intent`](./intent.md)).
2. Answer the pre-layout questions (including screen-layout pattern 01–11).
3. Choose a row from the page-pattern table / [`screen-layout-patterns`](../patterns/screen-layout-patterns.md).
4. Choose width band → edge vs fixed; keep ordinary blocks ≤**720px** or split into columns.
5. Implement from the matching `ai/recipes/*.md` + `ai/examples/*.tsx` (or compose from the gap table).
6. Apply Main section gap / short-regions / boxed-padding rules from [`appshell-main-containment`](./appshell-main-containment.md). In multi-column grids, **match peer heights** on non-bottom rows ([`grid`](../foundations/grid.md)).

Confidence: **Required** — Answer pre-layout questions and pick a page pattern before stacking sections.

Confidence: **Preferred** — Match a named screen-layout pattern (01–11) before inventing layout.

Confidence: **Required** — Do not default every section to a full-width Card.

Confidence: **Required** — Most content blocks ≤720px; use columns when Main is wider.

## Do

- Pair short regions at `lg+` on dashboards/reports; match peer heights in a row (esp. non-bottom) — [`grid`](../foundations/grid.md).
- Cap reading/forms at **720px** (or `--uds-container-prose`) or place peers in columns.
- Use `MainContent fixed` for standard product panels; still avoid stretching every inner block to 1000px.
- Use edge full-width for a single dominant table workflow.
- Group form fields with `SectionHeader` + spacing; Card only when the box is a designed interactive unit.
- **Stack form Fields** by default; multi-column only for related pairs (first/last name) or dense forms — [`forms`](../patterns/forms.md).

## Do not

- Stretch paragraphs, simple forms, or small groups past **720px** across a wide Main “because there is room.”
- Use one full-width column of skinny content when peers could share a row.
- Leave large mid-page negative space under a short grid peer beside a tall peer when heights could match.
- Wrap every section in a Card for visual noise.
- Fake listview or Sheet with an ad-hoc split only inside Main when those regions apply.
- Invent max-widths other than the token bands above for `MainContent` fixed geometry.

## Related law

Supports lower **cognitive load** and **selective attention** — columns and ≤720px blocks reduce competing signals. See [`cognitive-load`](../design-physics/cognitive-load.md) and [`laws-of-ux`](../design-physics/laws-of-ux.md).

## See also

- [Screen layout patterns](../patterns/screen-layout-patterns.md)
- [Cognitive load](../design-physics/cognitive-load.md)
- [Laws of UX index](../design-physics/laws-of-ux.md)
- [AppShell.Main containment](./appshell-main-containment.md)
- [Grid](../foundations/grid.md)
- [Grouping](./grouping.md)
- [Whitespace](./whitespace.md)
- [Cards pattern](../patterns/cards.md)
- [Choosing layout](../decision-rules/choosing-layout.md)
- [Layout tree](../decision-rules/trees/layout.md)
- [Layout mistakes](../anti-patterns/layout-mistakes.md)
