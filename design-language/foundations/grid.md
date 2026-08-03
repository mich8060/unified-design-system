---
id: grid
category: foundation
type: concept
priority: medium
ai_priority: medium
confidence_default: preferred
related:
  - alignment
  - responsive-layout
  - dashboards
  - appshell-main-containment
  - visual-noise
components:
  - AppShell
  - Card
patterns:
  - dashboards
  - forms
tokens:
  - "--uds-gap-16"
  - "--uds-gap-24"
depends_on:
  - alignment
  - spacing
influences:
  - dashboards
conflicts_with:
  - layout-mistakes
  - visual-noise
alternatives:
  []
---
# Grid

## What

UDS does not ship a separate **12-column** framework. Layout grids are composed with AppShell regions + CSS flex/grid using `--uds-gap-*` spacing.

- **Column gutters** in Main are **16 or 24** (`--uds-gap-16` / `--uds-gap-24`) on CSS `grid` / flex — not Bootstrap-style span classes.
- **Modular grids** are peer Cards, KPI / StatisticCard rows, and chart + aside compositions that share a row at `lg+`.

**FAIL IF:** invent a page-level 12-column (or similar) framework outside AppShell + token gutters.

## Why

Shell geometry (menu/listview/main) is the primary grid. Inner pages use simple columns (e.g. KPI row + stack) aligned to spacing tokens.

## When

Dashboard KPI rows, settings two-column (label/field via Field orientation), analytics chart + feed, any multi-section `AppShell.Main` body.

## Columns in Main (usage)

Inside `AppShell.Main`, prefer **2 or 3 columns** to break up content so the page is not only a single vertical stack. Keep column gaps at **16 or 24** (`--uds-gap-16` / `--uds-gap-24`). See [`appshell-main-containment`](../semantics/appshell-main-containment.md).

Treat peer Cards / KPI tiles / chart+aside as a **modular** matrix: gutters on the 4px scale (outer **16/24**), not fractional 12-col spans.

## Equalize box heights (usage)

**Recommended:** When peers share a grid row, **aim for matching heights** so the row has a shared bottom edge. Large negative space under a short card next to a tall peer (mid-page) reads as a broken layout — compose content so peers balance, then stretch when needed.

**Bottom row exception:** On the **last** row of the page grid, uneven natural heights are more acceptable (nothing sits below the void). Still prefer balance when peers are close in density.

| Situation | Action |
|-----------|--------|
| Non-bottom row, peers similar density, Δ **≤ 150px** | **Equalize** — `items-stretch` + `h-full` on Cards |
| Non-bottom row, peers similar density, Δ **> 150px** | **Rebalance content** first (trim/expand lists, move CTAs, swap pairing) so heights converge; avoid leaving a tall void under the short peer |
| Non-bottom row, mixed density that cannot rebalance | Prefer `lg:items-start` — do **not** stretch a short Card into a tall empty shell |
| **Bottom** row of the page grid | Natural heights OK; stretch only when Δ ≤ 150px and density matches |

```tsx
{/* Peer cards in one row — stretch when heights are within ~150px */}
<div className="grid min-w-0 grid-cols-1 items-stretch gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
  <Card className="h-full">…</Card>
  <Card className="h-full">…</Card>
</div>
```

Use CSS grid/flex stretch (`items-stretch`, `h-full` on children) rather than hardcoding pixel heights.

**Prefer `items-start`** only when peers have **different density** that cannot be rebalanced (short list vs tall table, short callout vs long watchlist). Stretch that creates a large empty interior reads as a broken “gap” on the page.

**FAIL IF:** A non-bottom grid row leaves a large empty band under a short peer beside a tall peer when content could have been rebalanced or stretched (Δ ≤ 150px).

**FAIL IF:** `items-stretch` / `h-full` creates **>150px** of empty interior in a short peer Card. Prefer `lg:items-start` (see `ai/examples/workspace-dashboard.tsx`).

## How AI should reason

1. Outer grid = AppShell regions.
2. Inner grid = flex/grid + gap tokens (16/24); prefer **2–3 columns** for multi-region pages.
3. Modular peers = Cards / KPI / chart+aside — **match heights** on non-bottom rows (rebalance content, then stretch when Δ ≤ 150px).
4. Bottom row may stay natural height; mid-page ragged bottoms are worse.
5. Align columns (see alignment semantics).
6. Follow recipe examples for dense dashboards rather than inventing a Bootstrap-like / 12-column grid.

Confidence: **Strong Recommendation** — Match peer heights in grid rows (especially non-bottom) to avoid negative space under short blocks.

Confidence: Preferred — Compose with AppShell + gap tokens; equalize near-height peer boxes (≤150px) only when stretch won’t create voids.

Confidence: **Required** — Do not stretch short Cards into tall empty shells.

Confidence: **Required** — Do not invent a 12-column page framework; use CSS grid + `--uds-gap-16|24`.

## Relationships

### Supports

- Alignment
- Dashboards

### Requires

- Spacing
- AppShell

### Influences

- Dashboard patterns

### Uses

- --uds-gap-*
- flex/grid

### Conflicts With

- Bespoke page frameworks outside shell
- Invented 12-column (or similar) layout systems
- Ragged peer boxes that should have been stretched (≤150px delta)

### Alternatives

- —

### Depends On

- spacing
- alignment

### Referenced By

- patterns/dashboards.md

## See also

- [Alignment](../semantics/alignment.md)
- [AppShell.Main content containment](../semantics/appshell-main-containment.md)
- [Visual noise](../anti-patterns/visual-noise.md)
- [Responsive layout](../composition/responsive-layout.md)
- [Dashboards](../patterns/dashboards.md)
