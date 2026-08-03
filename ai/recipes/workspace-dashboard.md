# Workspace Dashboard

## When to use it

Use for operational overview screens with metrics, queue summaries, alerts, and action-oriented workspace sections (e.g. KPI row + pipeline table + recent list).

## Required imports

```ts
import {
  AppShell,
  Menu,
  MainContent,
  MainStack,
  PageHeader,
  StatisticCard,
  Card,
  CardContent,
  Table,
  SectionHeader,
  /* … */
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

## Required layout primitives

- **`AppShell`** with **`menu={<Menu … />}`** (not `Sidebar*` in the menu slot).
- **`AppShell.Main`** → **`MainContent`** (`edge` or `fixed`) with **`p-[length:var(--uds-spacing-24)]`** on edge.
- **`MainStack`** — first-level sections under PageHeader (built-in gap **24**). Do not invent `gap-3` / `space-y-2`.
- **`enableRouterOutlet={false}`** unless the app uses React Router with a layout route (see [`ai/guides/appshell-navigation.md`](../guides/appshell-navigation.md)).
- **`PageHeader`** (inline) for title + actions — no `SearchInput` in `PageHeaderActions`.
- **StatisticCards** in a **horizontal** row, gap **16 or 24** (card padding **24** built in).
- **Main section gap** — Prefer **`MainStack`**; only `--uds-gap-16` or `--uds-gap-24` if hand-rolling.
- **Required: short regions share a row at `lg+`** — `lg:grid-cols-2`: pipeline table | placements list; then watchlist | ops callout. Do **not** stack skinny lists/callouts/watchlists full-width alone (KPI row alone does not satisfy this).
- **Boxed padding** — Prefer **`Card` + `CardContent`** (CardContent is **16px** all sides). Naked Cards auto-pad 16px. Tables may use `CardContent className="p-0"` because cell first/last padding is 16px — keep **one** border (Card); Table is borderless inside `CardContent`. Prefer **`overflow-hidden`** on content boxes.

## Forbidden substitutions

- Do not use `sidebar`, `sidebarWidth`, `showListview`, or `mainClassName` — they are not on the published API.
- Do not build a neutral placeholder dashboard from anonymous `div` blocks when UDS components fit.
- Do not put **`Sidebar*`** in the AppShell menu slot without custom rail CSS.
- Do not stack StatisticCards only vertically — use a horizontal row with gap 16/24.
- **FAIL:** Full-width “Staffing pipeline” table **then** full-width “Recent placements” list stacked — use **2 columns** at `lg+`.
- **FAIL:** Full-width compliance watchlist or ops callout alone — pair short regions in `lg:grid-cols-2`.
- **FAIL:** Table or list flush to a bordered box with no inset (missing `CardContent` / padding).
- **FAIL:** Section gaps of `gap-2` / `gap-3` / `gap-5` / `space-y-2` between first-level Main blocks.

## JSX skeleton

```tsx
<AppShell
  className="min-h-dvh w-full min-w-0"
  enableRouterOutlet={false}
  menu={<Menu navigationItems={items} activeId={activeId} onNavigationSelect={onSelect} />}
>
  <AppShell.Main>
    <MainContent containment="edge" className="p-[length:var(--uds-spacing-24)]">
      <PageHeader layout="inline">{/* title + actions */}</PageHeader>
      <MainStack>
        <div className="flex flex-wrap gap-[length:var(--uds-gap-16)]">{/* StatisticCards */}</div>
        <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
          <div>{/* SectionHeader + Card > CardContent > Table */}</div>
          <div>{/* SectionHeader + Card > CardContent > placements list */}</div>
        </div>
        <div className="grid gap-[length:var(--uds-gap-24)] lg:grid-cols-2">
          <div>{/* Compliance watchlist */}</div>
          <div>{/* Ops focus callout */}</div>
        </div>
      </MainStack>
    </MainContent>
  </AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/workspace-dashboard.tsx`](../examples/workspace-dashboard.tsx)

## Brand application

Use `Badge` for context labels, `Status` for current state, `Medallion` (default **lg**) for key emphasis points, and light token-backed surfaces for summary cards.
