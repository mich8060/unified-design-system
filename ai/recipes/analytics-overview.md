# Analytics Overview

<!-- Distilled from UDS prototyping starter dashboards; keep product fixtures generic. -->

## When to use it

Use for **Reports** / analytics screens: charts, activity feeds, callouts, and summary tables. Prefer **columns** so the page does not become one long full-width stack.

## Required imports

```ts
import {
  AppShell,
  Menu,
  MainContent,
  MainStack,
  PageHeader,
  Card,
  CardContent,
  Badge,
  Medallion,
  Button,
  Empty,
  Tabs,
  Table,
  SectionHeader,
} from "@chghealthcare/unified-design-system"
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@chghealthcare/unified-design-system/chart"
import "@chghealthcare/unified-design-system/styles.css"
```

Chart series children come from **`recharts`**. Prefer chart colors from `ChartConfig` → `var(--chart-*)`. Import chart primitives from **`@chghealthcare/unified-design-system/chart`**.

**Stacked bars:** touching segment ends **radius 0** (outer ends may stay at 4). See [`stacked-bar-radius`](../../design-language/semantics/stacked-bar-radius.md).

## Required layout primitives

- **`AppShell`** with **`menu={<Menu … />}`**.
- **`MainContent`** + **`PageHeader`** + **`MainStack`** (gap 24).
- **Required: short regions share a row** — do not stack chart, feed, callout, and tables all full-width.
- **Row 1:** `lg:grid-cols-3` — primary chart `lg:col-span-2` | activity feed.
- **Row 2:** `lg:grid-cols-3` — secondary chart `lg:col-span-2` | priority callout (or equivalent aside).
- **Row 3:** `lg:grid-cols-2` — Specialty mix table | Client performance table.
- **Boxed padding** — Prefer `Card` + `CardContent` (**16px** all sides). Tables: `CardContent className="p-0"` (cell edge pad 16px); **one** outline only (no Card+Table double border).

## Forbidden substitutions

- **FAIL:** Chart then activity feed then chart then callout then two tables — **all full-width stacked** (oversized short regions).
- **FAIL:** Specialty mix and Client performance tables stacked full-width instead of `lg:grid-cols-2`.
- **FAIL:** Section gaps of `gap-3` / `gap-5` / `space-y-2` instead of `MainStack` / gap 16–24.
- **FAIL:** Chart or list flush to a bordered box (missing CardContent / padding).
- Do not invent a bespoke SVG chart when `ChartContainer` + recharts fit.
- Do not leave empty feed regions blank — use `Empty`.
- Do not put `Sidebar*` in the AppShell menu slot.

## JSX skeleton

```tsx
<AppShell.Main>
  <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
    <PageHeader layout="inline">…</PageHeader>
    <MainStack>
      <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent>{/* chart */}</CardContent></Card>
        <Card><CardContent>{/* feed */}</CardContent></Card>
      </div>
      <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardContent>{/* chart */}</CardContent></Card>
        <Card><CardContent>{/* callout */}</CardContent></Card>
      </div>
      <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
        <div>{/* Specialty mix Table */}</div>
        <div>{/* Client performance Table */}</div>
      </div>
    </MainStack>
  </MainContent>
</AppShell.Main>
```

## Canonical example

[`ai/examples/analytics-overview.tsx`](../examples/analytics-overview.tsx)
