# Triage Dashboard

<!-- Distilled from UDS prototyping starter dashboards; keep product fixtures generic. -->

## When to use it

Use for dense operations triage: KPI stat tiles, a “since last visit” alert strip, then three scrollable `Item` panels (escalations, stalled providers, notifications with line `Tabs`).

## Required imports

```ts
import {
  AppShell,
  Menu,
  SectionHeader,
  SearchInput,
  Card,
  Medallion,
  Status,
  Badge,
  Item,
  ItemGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

## Required layout primitives

- **`AppShell`** with **`menu={<Menu … />}`**.
- **`AppShell.Main`** (or content-only nested route under a shared shell).
- Page body: eyebrow + `SectionHeader` → search row → `sm:grid-cols-2 lg:grid-cols-4` KPI cards → alert cards → `lg:grid-cols-3` action panels with `ItemGroup` / `Item` rows.
- Panel bodies may use `max-h-[…] overflow-y-auto` at `lg+` so the shell main column remains the page scroller.
- **Main section gap** — First-level siblings: only `--uds-gap-16` or `--uds-gap-24`.
- **Required: short regions share a row at `lg+`** — KPI / alert / panel grids at desktop; do not stack skinny short regions full-width alone.
- **Boxed padding** — Every `Card` / bordered panel: `CardContent` or p-16/24; content must not touch the box.

## Forbidden substitutions

- Do not replace KPI tiles with anonymous gray boxes when `Card` + `Medallion` + `Status` fit.
- Do not put `Sidebar*` in the AppShell menu slot.
- Prefer UDS `*Icon` exports; phosphor only for glyphs not re-exported.

## JSX skeleton

```tsx
<div className="flex min-w-0 flex-col gap-6 p-4 md:p-6">
  <SectionHeader>{/* eyebrow + greeting */}</SectionHeader>
  <SearchInput surface="primary" aria-label="Search" />
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{/* KPI Cards */}</div>
  <div className="grid gap-4 md:grid-cols-3">{/* Status alert Cards */}</div>
  <div className="grid gap-6 lg:grid-cols-3">
    <Card>{/* Escalations ItemGroup */}</Card>
    <Card>{/* Providers ItemGroup */}</Card>
    <Card>
      <Tabs defaultValue="all">
        <TabsList variant="line">{/* … */}</TabsList>
        <TabsContent value="all">{/* notification Items */}</TabsContent>
      </Tabs>
    </Card>
  </div>
</div>
```

## Canonical example

[`ai/examples/triage-dashboard.tsx`](../examples/triage-dashboard.tsx)

## Brand application

Map severity to `Status` variants and `Medallion` colors (`error` / `warning` / `info`, `red` / `sky` / `emerald`). Use `Badge` for counts and outlined pills on provider rows.
