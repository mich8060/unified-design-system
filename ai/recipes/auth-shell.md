# Authenticated Shell

## When to use it

Use for authenticated application pages, internal product tools, dashboards, queues, and workflow screens that need persistent navigation.

## Required imports

```ts
import { AppShell, Menu, TooltipProvider } from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"
```

## Required layout primitives

- **`TooltipProvider`** at the app or layout root when using tooltips.
- **`AppShell`** with **`menu={<Menu … />}`**.
- **`AppShell.Main`** for workspace content.

See [`ai/guides/appshell-navigation.md`](../guides/appshell-navigation.md).

## Forbidden substitutions

- Do not replace the **`menu`** slot with **`Sidebar*`** plus manual `fixed` rail CSS.
- Do not use a raw `<aside>` or copied stock shadcn sidebar for the product shell rail.

## JSX skeleton

```tsx
<TooltipProvider>
  <AppShell
    className="min-h-dvh w-full min-w-0"
    enableRouterOutlet={false}
    menu={<Menu navigationItems={items} activeId={activeId} onNavigationSelect={onSelect} />}
  >
    <AppShell.Main>{/* workspace content */}</AppShell.Main>
  </AppShell>
</TooltipProvider>
```

## Canonical example

[`ai/examples/auth-shell.tsx`](../examples/auth-shell.tsx)

## Brand application

Use `Status`, `Badge`, `Medallion`, tinted `Card` surfaces, and token-backed text or border treatments before inventing ad hoc accent styling.
