# AppShell starter setup

Use this document when you want an AI assistant or teammate to bootstrap a React app that uses the published `@chghealthcare/unified-design-system` package correctly.

The detailed rules live in:

- [`ai/uds-contract.json`](./ai/uds-contract.json)
- [`AI_USAGE.md`](./AI_USAGE.md)
- [`ai/guides/appshell-navigation.md`](./ai/guides/appshell-navigation.md)

This file is the shorter starter-oriented projection of that contract.

## Starter rules

- Install `@chghealthcare/unified-design-system`, `react`, and `react-dom` only — **do not** run `npx shadcn init` or `npx shadcn create` (Table / Board / Roadmap prompts come from shadcn scaffolding, not UDS install).
- Import styles once with `import "@chghealthcare/unified-design-system/styles.css"`.
- For authenticated product screens, default to `AppShell`.
- Compose the **`menu`** slot with the package **`Menu`** component (not `Sidebar*`).
- Put page content in **`AppShell.Main`**.
- Set **`enableRouterOutlet={false}`** unless you use React Router layout routes (see the navigation guide).
- Use **`listview={…}`** for master-detail or queue flows (there is no `showListview` prop).
- Keep imports on `@chghealthcare/unified-design-system` and `@chghealthcare/unified-design-system/styles.css` only.
- Prefer existing UDS emphasis components such as `Badge`, `Status`, `Medallion`, and `Card` before inventing custom presentation wrappers.

## Copy-paste prompt

```text
Set up a minimal React + Vite + TypeScript application that uses `@chghealthcare/unified-design-system`.

Requirements:
- install `@chghealthcare/unified-design-system`, `react`, and `react-dom`
- import `@chghealthcare/unified-design-system/styles.css` once near the app root
- render `AppShell` on first load with `enableRouterOutlet={false}`
- compose the `menu` slot with `<Menu navigationItems={…} />` (not Sidebar in menu)
- put page content in `AppShell.Main`
- keep imports on `@chghealthcare/unified-design-system` only
- make the app fill the viewport (`min-h-dvh` on shell, html/body/#root full height)

Before composing the screen, consult:
- `ai/uds-contract.json`
- `ai/guides/appshell-navigation.md`
- `ai/recipes/auth-shell.md`
- `ai/examples/auth-shell.tsx`
```

## Reference starter files

### `src/main.tsx`

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@chghealthcare/unified-design-system/styles.css"
import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/index.css`

```css
html,
body,
#root {
  width: 100%;
  min-height: 100dvh;
}

body {
  margin: 0;
}
```

### `src/App.tsx`

```tsx
import {
  AppShell,
  Card,
  Menu,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"

const navigationItems: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "reports", label: "Reports" },
]

export default function App() {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            navigationItems={navigationItems}
            activeId="dashboard"
            onNavigationSelect={() => {}}
          />
        }
      >
        <AppShell.Main>
          <Card className="m-6 rounded-[4px] p-6">UDS AppShell starter</Card>
        </AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
```
