# Workspace Dashboard

## When to use it

Use for operational overview screens with metrics, queue summaries, alerts, and action-oriented workspace sections.

## Required imports

```ts
import { AppShell, Menu, /* … */ } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

## Required layout primitives

- **`AppShell`** with **`menu={<Menu … />}`** (not `Sidebar*` in the menu slot).
- **`AppShell.Main`** for page content.
- **`enableRouterOutlet={false}`** unless the app uses React Router with a layout route (see [`ai/guides/appshell-navigation.md`](../guides/appshell-navigation.md)).
- Compose sections with **`SectionHeader`**, **`Card`**, **`Badge`**, **`Status`**, and **`Medallion`**.

## Forbidden substitutions

- Do not use `sidebar`, `sidebarWidth`, `showListview`, or `mainClassName` — they are not on the published API.
- Do not build a neutral placeholder dashboard from anonymous `div` blocks when UDS components fit.
- Do not put **`Sidebar*`** in the AppShell menu slot without custom rail CSS.

## JSX skeleton

```tsx
<AppShell
  className="min-h-dvh w-full min-w-0"
  enableRouterOutlet={false}
  menu={<Menu navigationItems={items} activeId={activeId} onNavigationSelect={onSelect} />}
>
  <AppShell.Main>
    <SectionHeader>{/* title + actions */}</SectionHeader>
    <div className="grid gap-4 xl:grid-cols-3">{/* branded summary cards */}</div>
    <Card>{/* queue or KPI detail */}</Card>
  </AppShell.Main>
</AppShell>
```

## Canonical example

[`ai/examples/workspace-dashboard.tsx`](../examples/workspace-dashboard.tsx)

## Brand application

Use `Badge` for context labels, `Status` for current state, `Medallion` for key emphasis points, and light token-backed surfaces for summary cards.
