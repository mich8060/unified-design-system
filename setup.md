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
- **styles.css-only is enough for the AI recipe layouts** — published CSS includes the multi-column utilities used by `ai/examples` (`lg:grid-cols-2`, settings nav grids, etc.). You do **not** need a consumer Tailwind build for **those** recipe class strings. It is *not* a general Tailwind surface: published CSS contains only what UDS's own build emitted, so utilities it never emitted (`space-y-6`, bare `grid-cols-2`, arbitrary values, most negative offsets) silently do nothing rather than failing the build. Check `node_modules/@chghealthcare/unified-design-system/dist/styles.css` before relying on a class outside the recipe set — or add a local Tailwind build, next bullet.
- **Need utilities beyond the published set?** Add a local Tailwind v4 build that *references* UDS's theme rather than re-emitting it. Four steps for React + Vite:

  **1.** Install Tailwind (UDS declares `tailwindcss` as an **optional peer**, so you install it; pin to the version in `dist/theme.css`'s header). `@tailwindcss/vite` is the Vite integration and brings `tailwindcss` with it — swap it for `@tailwindcss/postcss` or `@tailwindcss/cli` if you don't use Vite.

  ```bash
  npm install -D tailwindcss@4.3.3 @tailwindcss/vite
  ```

  **2.** Add the plugin in `vite.config.ts`:

  ```ts
  import tailwindcss from "@tailwindcss/vite"
  import react from "@vitejs/plugin-react"
  import { defineConfig } from "vite"

  export default defineConfig({ plugins: [tailwindcss(), react()] })
  ```

  **3.** Add `src/uds-tailwind.css` (`@source "./"` resolves relative to this file, so here it scans `src/`):

  ```css
  @import "@chghealthcare/unified-design-system/theme" theme(reference);
  @import "@chghealthcare/unified-design-system/variants";
  @import "tailwindcss/theme.css" theme(reference);
  @import "tailwindcss/utilities.css" layer(utilities) source(none);

  @source "./";
  ```

  **4.** Import it **after** `styles.css` in `src/main.tsx`:

  ```ts
  import "@chghealthcare/unified-design-system/styles.css"
  import "./uds-tailwind.css"
  ```

  Rules that matter: do **not** prefix the classes (unprefixed names are what make this a fallback for a utility UDS stops emitting), do **not** `@import "tailwindcss"` (that emits a second `@layer theme` which, because same-named layers merge, replaces UDS's Inter `--font-sans` with Tailwind's system stack app-wide), keep `source(none)`, and keep importing `styles.css` — the partials carry registrations, not token values.

  The `./variants` line is only load-bearing **if your source uses any `dark:` utility** (`grep -rE '\bdark:' src/`) — it carries UDS's `@custom-variant dark (&:where(.dark, .dark *))`. Tailwind's default `dark:` is `@media (prefers-color-scheme: dark)`, so without it those utilities fire whenever the developer's OS is in dark mode and override UDS's class-scoped rules. That bites hardest in apps with **no** dark mode, where such classes are dead code until a local build makes them live. Include it by default: one line, no output when unused. Full rationale: [`docs/consumer-tailwind-theme.md`](./docs/consumer-tailwind-theme.md).

  The result emits utilities only — nothing that can collide with a UDS token — and covers UDS's own token utilities (`text-uds-14`, `bg-uds-surface-primary`, `text-uds-text-link-primary-default`) as well as the standard scale.
- **AI stubs on the hot path** (required for AI-assisted work; **agent-owned**): after install, the setup agent runs `npx uds-copy-ai-rules` (or `--tool=cursor`) from the consumer app root — do **not** ask designers/PMs to do this. Commit the written files (e.g. `.cursor/rules/uds.mdc`). Starter templates should bake them in. Full matrix: [`ai/guides/consumer-ai-bootstrap.md`](./ai/guides/consumer-ai-bootstrap.md). Without this, agents will not load `design-language/` from `node_modules`.
- Prefer **`MainStack`** under PageHeader for first-level section gaps (24px).
- For authenticated product screens, default to `AppShell`.
- Compose the **`menu`** slot with the package **`Menu`** component (not `Sidebar*`).
- Put page content in **`AppShell.Main`** via **`MainContent`** (`edge` | `fixed`). Keep that containment choice consistent across pages.
- Set **`enableRouterOutlet={false}`** unless you use React Router layout routes (see the navigation guide).
- Use **`listview={…}`** for master-detail or queue flows (there is no `showListview` prop). Optional **`listviewWidth`** (**320–480**, default **320**). Compose the pane with a **`Toolbar`** titlebar and **`Item`** / **`Card`** entities.
- Keep component imports on `@chghealthcare/unified-design-system` and styles on `@chghealthcare/unified-design-system/styles.css`. The only other allowed entries are the optional CSS partials `…/theme` and `…/variants`, and then only if the app runs its own Tailwind build (above).
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

## Vite optimizeDeps (dev load)

Prepared packages externalize Inter and sanitize branding asset filenames (`*.svg?url.js` → `*.svg.url.js`).

- **Do not** `optimizeDeps.exclude` `@chghealthcare/unified-design-system` (unbundled waterfall).
- **Do not** `optimizeDeps.include` the **package root** either — that builds one multi‑MB DEV prebundle of the full barrel. Use Vite’s default discovery unless a measured waterfall returns.
- Lazy-load heavy screens (charts / `recharts`). Import calendar/date/OTP from subpaths (`/calendar`, `/date-input`, `/date-range-input`, `/input-otp`, `/micro-calendar`).
- Prefer component subpaths when you only need a few primitives (e.g. `import { Button } from "@chghealthcare/unified-design-system/button"`, `…/select`, `…/table`, `…/alert`) so Vitest/Vite do not evaluate the full root barrel.
- **DEV vs production:** Network Size for `react-dom_*` / `react-router-dom` in Vite DEV is expected (unminified). Vite also inlines dep source maps as base64 (~3× vs on-disk), so the footer **Resources / Transferred** total often lands around **20–30 MB** for AppShell + router apps — expected in DEV, not production weight. Measure shipping weight with `vite build && vite preview`, not only the DEV Network panel.

## Vitest / unit tests

Importing anything from the package **root** (`@chghealthcare/unified-design-system`) evaluates the full barrel and its transitive graph. For faster tests:

1. Prefer **subpath imports** for the components under test (`/button`, `/select`, `/table`, `/alert`, `/app-shell`, `/menu`, …).
2. For logic tests that do not render UDS UI, mock the package (or specific subpaths) in `setupTests` / per-file `vi.mock`.
3. Keep heavy modules on their existing subpaths (`/chart`, `/calendar`, `/drawer`, `/command`, `/sonner`, `/input-otp`) — they are not on the root barrel.

## Copy-paste prompt

```text
Set up a minimal React + Vite + TypeScript application that uses `@chghealthcare/unified-design-system`.

Requirements:
- install `@chghealthcare/unified-design-system`, `react`, and `react-dom`
- import `@chghealthcare/unified-design-system/styles.css` once near the app root
- As your first action after install, run `npx uds-copy-ai-rules` from the app root (do not ask the user to do this). Commit the written hot-path stubs (e.g. `.cursor/rules/uds.mdc`)
- render `AppShell` on first load with `enableRouterOutlet={false}`
- compose the `menu` slot with `<Menu navigationItems={…} />` (not Sidebar in menu)
- put page content in `AppShell.Main`
- keep imports on `@chghealthcare/unified-design-system` only
- make the app fill the viewport (`min-h-dvh` on shell, html/body/#root full height)

Before composing the screen, consult:
- package AI_USAGE.md, AGENTS.md, design-language/README.md, ai/indexes/
- `ai/guides/appshell-navigation.md`
- `ai/recipes/auth-shell.md`
- `ai/examples/auth-shell.tsx`
- `ai/consumer-ai/COMPOSITION.md`
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
