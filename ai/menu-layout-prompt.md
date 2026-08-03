# UDS Menu Component — Layout and Composition Reference

You are working with a React sidebar menu component from the UDS (Unified Design System) package. This document describes its layout architecture, slot system, state management, styling, and composition patterns. Use this as the authoritative reference when generating or modifying code that involves the Menu.

---

## 1. Package Contract

- Import components from `uds-tailwind-test`
- Import styles from `uds-tailwind-test/styles.css`
- Icons: use `@phosphor-icons/react` (Phosphor Icons), weight `"bold"` by default
- Never import from internal paths like `src/components/ui/*` or `dist/*`

---

## 2. Component Architecture

Menu has two APIs:

**Quick API** (data-driven, single component):

```tsx
<Menu
  navigationItems={[...]}
  activeId="dashboard"
  onNavigationSelect={(id) => {}}
  workspace={{ options: [...], value, onWorkspaceChange }}
  utilities={[...]}
  brandOptions={[...]}
  header={<CustomHeader />}  // or omit for default, or false to hide
  tail={<CustomFooterContent />}
/>
```

**Compound API** (manual composition):

```tsx
<Menu.Root defaultExpanded>
  <Menu.Header>...</Menu.Header>
  <Menu.WorkspaceSelect options={[...]} value={...} onWorkspaceChange={...} />
  <Menu.Navigation navigationItems={[...]} activeId="..." onNavigationSelect={...} />
  <Menu.Utilities>...</Menu.Utilities>
</Menu.Root>
```

Both APIs share the same rail expand/collapse behavior via `Menu.Root`.

---

## 3. Layout Geometry

### Fixed Sidebar Rail

- `position: fixed`, `top: 0`, `left: 0`, `height: 100vh`, `z-index: 10`
- **Expanded width:** 280px (`w-[280px]`)
- **Collapsed width:** 56px (`w-[56px]`)
- Transition: `transition-[width] duration-200 ease-out`
- Background: `bg-white` (light) / dark mode inherits
- Border: `border-r border-neutral-200`
- Internal layout: `flex flex-col overflow-hidden`
- Root element: `<nav data-slot="uds-menu-root" data-expanded="true|false">`

### Slot Order (top to bottom inside the nav)

1. **Header** — 56px tall (`h-14`), bottom border, contains branding + collapse toggle
2. **Brand switcher** — optional Select dropdown (expanded) or PlusCircle flyout (collapsed), bottom border
3. **Workspace selector** — optional Select (expanded) or PlusCircle flyout (collapsed), `p-2`, bottom border
4. **Navigation** — scrollable area (`flex-1 overflow-y-auto`), contains the tree of nav rows
5. **Utilities / Tail** — bottom-pinned area for utility links and custom content

### Integration with AppShell

The Menu lives in AppShell's `menu` slot. AppShell offsets its body:

- `appshell--body` has `margin-left: 280px` (expanded) or `56px` (collapsed)
- AppShell detects menu state via CSS `:has([data-slot="uds-menu-root"][data-expanded="false"])`
- AppShell header/footer are in-flow inside the body/main column (footer is last in `.appshell--main`, not fixed)
- Body offset transition is 200ms ease-out to stay synchronized with the Menu rail

---

## 4. Expand / Collapse State

Managed by `Menu.Root` via React context. Access with `useMenuRail()` hook:

```ts
const { expanded, setExpanded, toggleExpanded } = useMenuRail()
```

- `expanded: boolean` — current state
- `setExpanded(boolean)` — set directly
- `toggleExpanded()` — flip

Props on `Menu` / `Menu.Root`:

- `expanded` — controlled mode
- `defaultExpanded` — uncontrolled initial (default: `true`)
- `onExpandedChange` — callback

The root `<nav>` emits `data-expanded="true"` or `"false"` for CSS hooks.

---

## 5. Header Slot

**Inside AppShell:** Menu does **not** render a default header. Branding + the menu toggle live in the full-width **AppShell Header**. Put `brand` / `headerVariant` / `headerTitle` on **AppShell** — see **`ai/guides/menu-header-identity.md`**.

**Standalone Menu** (no AppShell) still renders a simplified `MenuDefaultHeader`: toggle + wordmark/title when expanded; toggle only when collapsed (no mark swap, no hover-reveal).

Deprecated on Menu when using AppShell: `headerVariant`, `headerTitle`, `headerShortTitle`.

---

## 6. Brand Switcher

Shown when `brandOptions` array is passed. Renders between header and navigation.

**Expanded:** full-width Radix `Select` in a padded band with bottom border.
**Collapsed:** PlusCircle icon (32px) as `DropdownMenuTrigger`; flyout opens to the right with radio options.

Brand values correspond to `data-brand` attribute on `<html>`, which activates CSS token sets (e.g., `[data-brand=connect]`, `[data-brand=comphealth]`).

---

## 7. Workspace Selector

Shown when `workspace` prop is provided.

```tsx
workspace={{
  options: [{ value: "clinical", label: "Clinical workspace" }, ...],
  value: "clinical",
  onWorkspaceChange: (value) => {},
  "aria-label": "Workspace",
}}
```

**Expanded:** Radix Select, `inputSize="sm"`, in padded band (`p-2`), bottom border.
**Collapsed:** PlusCircle ghost button, tooltip, flyout DropdownMenuRadioGroup to the right.

---

## 8. Navigation Items

Type definition:

```ts
type MenuNavigationItem = {
  id: string           // unique across entire tree
  label: string
  icon?: ComponentType // Phosphor icon; required for root rows, optional for leaves
  children?: MenuNavigationItem[]  // makes this a branch (expandable group)
}
```

### Expanded rendering

- **Root rows** (with icon): 44px tall (`h-11`), `px-4`, icon (20px) + label, full-width button
- **Branch rows** (with children): same height, sticky header (`position: sticky, top: 0, z-10`), expand/collapse chevron, click toggles open/closed
- **Leaf rows** (no icon, nested under branch): left border (`border-l`), `ml-4 pl-6`, smaller type (`text-uds-14`)
- Active state: `background-color: var(--uds-surface-brand-quaternary)`, `color: var(--uds-text-inverse)`, SVGs also inverse
- Active leaf: 2px left border in brand color, `bg-neutrals-50`
- Hover: `bg-neutral-100` (light) / `bg-neutral-800` (dark)
- `activeId` auto-expands ancestor branches

### Collapsed rendering (mainOnlyWhenExpanded=true, the default)

- Only **root-level** rows render as 44x44 icon-only buttons, `rounded-[4px]`
- Tooltips show labels on hover (side="right")
- Branch items open a `DropdownMenu` flyout to the right with nested children
- Leaf items fire `onNavigationSelect` directly

### Default navigation per brand

When `navigationItems` is omitted, Menu calls `getDefaultNavigation(brand)` which returns brand-specific trees:

- `default`: Dashboard, Requests, Providers, Calendar, Reporting
- `chg` / `connect`: Dashboard, Requests, Providers, Scheduling, Pooling (with 4 children), Escalations, Calendar, Reporting
- `comphealth` / `gms` / `weatherby`: Dashboard, Schedule, Job Board, Application, Documents (with Credentialing + Financial children), Time Entry, Travel
- `locumsmart`: Dashboard, Workflow, CRM, Analytics, Administration
- `modio`: Dashboard, Reports, Providers, Facilities, Payors, Tracking
- `careermd`: Dashboard, Jobs, Employers, Candidates, Messages, Reporting
- `wireframe`: 5x "Menu Item" placeholders (no icons)

---

## 9. Utilities

Data-driven utility links at the bottom of the menu:

```ts
type MenuUtilityItem = {
  id: string
  label: string
  href: string
  icon: ComponentType  // Phosphor icon
}
```

**Expanded:** anchor tags, 36px tall (`h-9`), `px-4`, icon + label, `text-uds-14`.
**Collapsed:** 44x44 icon-only links, `rounded-[4px]`, tooltip to the right.

Pass via `utilities` prop on `Menu`, or compose manually with `Menu.Utilities`.

---

## 10. Styling Details

### CSS class naming

All styles use flat class names prefixed with `menu-nav-` or `menu-utility-`:

- `.menu-nav-row-layout` — shared flex row base
- `.menu-nav-row` — composed root row (layout + root type + padding)
- `.menu-nav-branch-row` — expandable parent
- `.menu-nav-active` — brand background + inverse text
- `.menu-nav-parent-sticky` — sticky branch header strip
- `.menu-nav-leaf-border-inactive` / `.menu-nav-leaf-border-active` — left border variants
- `.menu-nav-leaf-active-bg` — `bg-neutrals-50`
- `.menu-nav-collapsed-focus-ring` — keyboard focus on collapsed items
- `.menu-nav-collapsed-radius` — `rounded-[4px]` for collapsed items
- `.menu-utility-link-expanded` / `.menu-utility-link-collapsed` — utility link variants

### Color tokens

- Active: `var(--uds-surface-brand-quaternary)` bg, `var(--uds-text-inverse)` text
- Dark active: `var(--uds-color-primary-300)` bg
- Leaf active border: `var(--uds-surface-brand-quaternary)`, dark: `var(--uds-color-primary-300)`
- Inactive text: `var(--uds-text-primary)` (root), `var(--uds-text-tertiary)` (leaf)
- Hover: `bg-neutral-100` / `dark:bg-neutral-800`
- Leaf hover: `var(--uds-system-action-quaternary)`

### Typography

- Root rows: `text-uds-16`, `font-uds-medium`, `leading-uds-16`
- Leaf rows: `text-uds-14`, `font-uds-regular` or `font-uds-medium`, `leading-uds-14`
- Font family: `var(--font-inter)` / `font-sans`

### Focus

- All interactive elements: `focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2`, `z-10`
- Dark: `focus-visible:ring-neutral-500 focus-visible:ring-offset-neutral-950`

### Transitions

- Row colors: `transition-colors`
- Rail width: `transition-[width] duration-200 ease-out`
- Header branding cross-fade: `transition-opacity duration-200 ease-out`

---

## 11. Branding Component

Used inside the Menu header for product logos:

```tsx
<Branding
  appearance="Connect"   // "Connect" | "Locumsmart" | "Wireframe" | "MyWeatherby" | "MyCompHealth" | "Modio" | "Design System"
  symbol                 // square mark (36-64px) vs full wordmark (200x80)
  wordmarkAlign="center" // "start" | "center"
/>
```

SVGs are bundled via the `Branding` component from `src/assets/branding/svg/`. Dark mode applies `brightness-0 invert`.

---

## 12. Complete Usage Example

```tsx
import { Menu, AppShell, Header, Footer, useMenuRail, Branding, type MenuNavigationItem, type MenuUtilityItem } from "uds-tailwind-test"
import "uds-tailwind-test/styles.css"
import { LayoutIcon, BriefcaseIcon, UsersIcon, PhoneIcon, ChatCircleDotsIcon, ListIcon } from "@phosphor-icons/react"

const NAV_ITEMS: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "requests", label: "Requests", icon: BriefcaseIcon },
  { id: "providers", label: "Providers", icon: UsersIcon },
]

const UTILITIES: MenuUtilityItem[] = [
  { id: "phone", label: "888-888-8888", href: "tel:+18888888888", icon: PhoneIcon },
  { id: "feedback", label: "Feedback", href: "#feedback", icon: ChatCircleDotsIcon },
]

function App() {
  const [activeId, setActiveId] = useState("dashboard")
  return (
    <AppShell
      menu={
        <Menu
          defaultExpanded
          navigationItems={NAV_ITEMS}
          activeId={activeId}
          onNavigationSelect={(id) => setActiveId(id)}
          utilities={UTILITIES}
        />
      }
      header={<Header />}
      footer={<Footer links={[{ label: "Privacy", href: "#" }]} />}
    >
      <main>Page content</main>
    </AppShell>
  )
}
```
