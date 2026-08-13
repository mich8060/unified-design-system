# Figma Make — same environment as `setup.md`

Use this file in **[Figma Make](https://www.figma.com/make/)** so generated app code matches the **@chghealthcare/unified-design-system** consumer setup: **React 19**, **Vite + TypeScript**, **`AppShell`**, and a single global stylesheet import.

For a longer, terminal-focused agent prompt (install, `npm run dev -- --open`, etc.), use **[setup.md](./setup.md)** in Cursor or your local repo.

---

## How to use this in Figma Make

1. Open your Make file’s **project instructions** (or the first prompt when you start the app).
2. Paste **either** the short **project brief** (keeps every generation on-rails) **or** the **full bootstrap prompt** (if Make is driving creation of the whole repo).
3. When you move code to your machine, run **`npm install`** and **`npm run dev -- --open`** in the project folder (Make may not run your local Node for you).

---

## Project brief (keep in Make instructions)

Paste and adjust the package line if you use a local `file:` path instead of npm.

```text
Stack: React 19 + Vite + TypeScript.

UI library: @chghealthcare/unified-design-system only.
- Import components from "@chghealthcare/unified-design-system" (e.g. AppShell, SidebarProvider, Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, Button, Card, TooltipProvider, Badge, Status, Medallion).
- Import global styles once in the app entry: import "@chghealthcare/unified-design-system/styles.css"
- Do NOT import from @/, dist/, or internal modules (*-base, *-core, *-theme, *-uds).

Layout: Authenticated app chrome must use AppShell. Compose a real product screen: a visible primary navigation rail, a clear main body, and optional listview/footer. The **`menu`** slot (legacy `sidebar`) should compose **`SidebarProvider`**, **`Sidebar`**, and **`SidebarMenu*`** for the main rail (header/brand/nav/footer are app-specific). Optional listview and footer regions are fine; omit showListview/showFooter when not needed.

Starter vs demo: the published-package starter is intentionally simpler than the docs demo. If you are generating for an external consumer app, do not try to recreate the full repo demo sidebar with repo-local docs components. If you are generating inside this repository and the goal is to match the demo, use src/docs/pages/app-shell-demo-doc-sidebar.tsx and src/docs/app-shell-demo/AppShellDemoCanvas.tsx as the source of truth.

Viewport: html, body, and #root must fill the full page width and height (zero body margin, min-height 100dvh or height 100% chain). AppShell gets min-h-dvh w-full min-w-0 (or equivalent) so the product shell is edge to edge.

Styling: Use Tailwind utility classes that work with the shipped package CSS. Do not replace the stylesheet pipeline or add Embla/carousel. Keep border radius at 4px or less. Prefer square corners or rounded-[4px] / var(--uds-radius-4). Avoid bland grayscale placeholder UI. Use restrained color through UDS primitives such as Badge, Status, Medallion, tinted cards or panels, and soft light-toned section backgrounds so the page feels like a finished product screen. Favor the active brand palette over generic default accents so the interface feels clearly branded. Primary UI font: Inter if wiring fonts.

Icons: Prefer @phosphor-icons/react if icons are needed; add it as a direct dependency. Exports use the Icon suffix (HouseIcon, MagnifyingGlassIcon, etc.). There is NO SettingsIcon—use GearSixIcon or GearIcon for settings. Match names to https://phosphoricons.com/ (PascalCase + Icon in React).

npm: react and react-dom ^19; @chghealthcare/unified-design-system from npm (or file:../path-to-repo for local dev).
```

---

## Copy-paste prompt (bootstrap a Make project to match this repo)

Use this when you want Make to **produce** (or refactor to) the same starter as `setup.md`: working **AppShell**, correct imports, and runnable Vite output. This is the package-safe starter path, not the repo-local exact demo path.

````text
Build (or refactor) this project as a React 19 + Vite + TypeScript app that uses the npm package @chghealthcare/unified-design-system.

Requirements:
1) Dependencies: react, react-dom (^19), @chghealthcare/unified-design-system, vite, @vitejs/plugin-react, typescript, and typical @types. If I am on a local monorepo, use "@chghealthcare/unified-design-system": "file:…" in package.json instead of a semver.

2) Entry file (e.g. src/main.tsx): import "@chghealthcare/unified-design-system/styles.css" before rendering.

3) App root: wrap with TooltipProvider from @chghealthcare/unified-design-system (put SidebarProvider inside the AppShell `menu` slot, not necessarily above AppShell).

4) Viewport: ensure full width and height—global styles for html, body, #root (no body margin; min-height 100dvh; width 100%). Import that CSS from main.tsx if needed.

5) Layout: AppShell from @chghealthcare/unified-design-system with className min-h-dvh w-full min-w-0. Treat AppShell as the visual page structure for the app screen, not as an empty wrapper.
   - menu slot: SidebarProvider + Sidebar (collapsible="none" is fine) with SidebarHeader / SidebarContent / SidebarFooter as needed; put SidebarMenu and nav links inside the sidebar. Sync sidebarWidth with expanded vs rail width. No raw aside or non-package nav.
   - listview slot: simple scrollable list or supporting column when the page needs a master-detail or queue pattern; otherwise set showListview={false}.
   - children: main workspace with clear visual hierarchy, such as a title, supporting copy, cards, metrics, task panels, or tables.
   - footer: thin status bar or showFooter={false}.
   - use color intentionally in the page body through Badge, Status, Medallion, tinted metric panels, accent labels, and soft background tones. Do not ship a neutral-only wireframe-looking page.
   - favor the active brand palette for emphasis, tags, medallions, soft surfaces, and supporting highlights instead of generic fallback accent colors.
   - this starter should resemble examples/consumer-react/src/App.tsx, not the full docs demo sidebar.

6) All component imports must be from "@chghealthcare/unified-design-system" only—never @/components, never dist, never *-uds/*-core/*-theme/*-base paths.

7) No carousel / Embla. One global CSS import: @chghealthcare/unified-design-system/styles.css. Keep border radius at 4px or less. Avoid flat gray-on-white composition; use restrained color and light-toned surfaces. Favor active brand colors over generic accent defaults. UI typography: Inter if adding fonts. If using @phosphor-icons/react, import only real named exports (e.g. GearSixIcon or GearIcon for settings—never SettingsIcon, which does not exist).

8) Output complete files: package.json, vite.config.ts, tsconfig, index.html, src/main.tsx, src/App.tsx, optional src/index.css for viewport reset (and vite-env.d.ts if needed) so the user can run npm install && npm run dev -- --open locally.

Explain briefly how to run locally and the default dev URL (usually http://localhost:5173).
````

---

## Repo-local exact demo prompt addendum

Use this addendum only when Figma Make is being asked to match the docs demo while working inside this repository:

````text
You are working inside the @chghealthcare/unified-design-system repository itself, not a separate consumer app. Match the existing AppShell demo instead of inventing a simplified starter sidebar.

- Treat src/docs/pages/app-shell-demo-doc-sidebar.tsx as the sidebar source of truth.
- Treat src/docs/app-shell-demo/AppShellDemoCanvas.tsx as the AppShell composition source of truth.
- Preserve the existing demo behaviors that make the sidebar recognizable: CompHealth branding, expanded vs minimized widths, router-backed nav links, the Documents rail flyout, account area, and the current information architecture.
- Reuse the existing repo-local docs helpers and components those files depend on rather than replacing them with plain placeholders.
- Keep any new radius values at 4px or less unless preserving an existing demo detail exactly.
````

---

## Phosphor: `Settings` vs gear icons

Figma Make and other generators often emit `Settings` or `SettingsIcon` from `@phosphor-icons/react`, which **fails at build time** because that export does not exist. Use **`GearSixIcon`** or **`GearIcon`** instead:

```ts
import { GearSixIcon } from "@phosphor-icons/react"
```

Confirm any other icon against [phosphoricons.com](https://phosphoricons.com/) and use the **`…Icon`** component name from `@phosphor-icons/react`.

---

## After Make: run locally

```bash
npm install
npm run dev -- --open
```

If `@chghealthcare/unified-design-system` is unpublished, install from a clone:

```bash
npm install file:/absolute/path/to/@chghealthcare/unified-design-system
```

---

## Contract reference

- Import rules and **AppShell** guidance: [AI_USAGE.md](./AI_USAGE.md)
- Full terminal/agent prompt: [setup.md](./setup.md)
