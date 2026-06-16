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

## Fonts & preload

- The package bundles **one** web font: a **Latin-Extended** subset of Inter Variable (Google Fonts `latin` + `latin-ext` ranges, full `opsz` + `wght` axes). It covers Western European languages and accented names (e.g. José, García, Müller, Zoë, François, Łukasz). It does **not** include Greek, Cyrillic, or CJK glyphs — those fall back to system fonts.
- Monospace text uses the **native system stack** (`ui-monospace` / SF Mono / Menlo / Consolas / Liberation Mono); no monospace web font is downloaded.
- `font-display: swap` is set, so text paints immediately in a fallback and swaps to Inter when it loads.
- To remove the first-paint font swap on the primary font, **preload Inter** in your app's `index.html`. With Vite you can resolve the bundled file via the package export:

```ts
// near your app entry (e.g. main.tsx)
import interHref from "@chghealthcare/unified-design-system/fonts/Inter-Variable.woff2?url"

const link = document.createElement("link")
link.rel = "preload"
link.as = "font"
link.type = "font/woff2"
link.crossOrigin = "anonymous"
link.href = interHref
document.head.prepend(link)
```

Or, if you serve the asset from a known static path, add directly to `index.html`:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/Inter-Variable.woff2" />
```

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
