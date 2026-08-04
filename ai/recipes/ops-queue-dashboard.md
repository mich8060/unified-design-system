# Ops Queue Dashboard

<!-- Distilled from UDS prototyping starter dashboards; keep product fixtures generic. -->

## When to use it

Use for operational work queues: search and facets above sectioned `Item` lists, with a narrow aside for calendar tracking and approaching due dates.

## Required imports

```ts
import {
  AppShell,
  Menu,
  SectionHeader,
  SearchInput,
  Card,
  Item,
  ItemGroup,
  Badge,
  Status,
  Medallion,
  Button,
} from "@chghealthcare/unified-design-system"
import { MicroCalendar } from "@chghealthcare/unified-design-system/micro-calendar"
import "@chghealthcare/unified-design-system/styles.css"
```

## Required layout primitives

- **`AppShell`** with **`menu={<Menu … />}`** (not `Sidebar*` in the menu slot).
- **`AppShell.Main`** for page content (or a content-only route under a shared shell — see [`appshell-navigation.md`](../guides/appshell-navigation.md)).
- **`enableRouterOutlet={false}`** for static examples; use nested layout routes when the outlet is enabled.
- Page body: `SectionHeader` → optional quick actions → `SearchInput` + facet chips → `lg:grid-cols-[minmax(0,1fr)_320px]` (queue sections + calendar aside).
- **Main section gap** — First-level siblings: only `--uds-gap-16` or `--uds-gap-24`.
- **Required: short regions share a row at `lg+`** — Multi-region layout at desktop (queue + aside); do not stack skinny short regions full-width alone.
- **Boxed padding** — Every `Card` / bordered panel: `CardContent` or p-16/24; content must not touch the box.

## Forbidden substitutions

- Do not nest a second `<main>` inside the shell outlet; use a `div` page root.
- Do not invent filter chrome when `SearchInput`, `Badge`, and outline `Button`s fit.
- Prefer package `*Icon` exports; import from `@phosphor-icons/react` only when UDS does not re-export the glyph.

## JSX skeleton

```tsx
<AppShell enableRouterOutlet={false} menu={<Menu … />}>
  <AppShell.Main>
    <div className="flex min-w-0 flex-col gap-6 p-4 md:p-6">
      <SectionHeader>{/* title + actions */}</SectionHeader>
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput surface="primary" aria-label="Search" className="min-w-[240px] max-w-sm flex-1" />
        {/* facet Badges + Filter / Sort Buttons */}
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-6">{/* Card sections + ItemGroup rows */}</div>
        <aside className="flex min-w-0 flex-col gap-6">
          <Card>{/* MicroCalendar */}</Card>
          <Card>{/* Approaching due dates */}</Card>
        </aside>
      </div>
    </div>
  </AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/ops-queue-dashboard.tsx`](../examples/ops-queue-dashboard.tsx)

## Brand application

Use `Badge` for facets and labels, `Status` / `Medallion` on queue rows, and token-backed `Card` surfaces for section and aside panels.
