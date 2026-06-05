# Menu header identity (`brand` vs `title`)

Normative for AI agents composing **`Menu`** inside **`AppShell.menu`**.

Related: [`appshell-navigation.md`](./appshell-navigation.md), [`../menu-layout-prompt.md`](../menu-layout-prompt.md), [`../recipes/default-navigation.md`](../recipes/default-navigation.md).

---

## Decision rule (read first)

| Situation | `headerVariant` | Header shows |
| --- | --- | --- |
| CHG product app with a known brand (`connect`, `comphealth`, `weatherby`, `locumsmart`, `modio`, `gms`, `chg`, …) | **`"brand"`** (default) | SVG wordmark + symbol from **`Branding`** |
| Internal tool, platform admin, partner white-label, MVP, or any app **without** an approved CHG product lockup | **`"title"`** | Plain text from **`headerTitle`** / **`headerShortTitle`** |
| Unsure whether marketing approved a logo | **`"title"`** | Safer until brand assets are confirmed |

**Do not** use `headerVariant="title"` for standard CHG product shells that already have a `brand` id in [`uds-brand`](../uds-contract.json) / `UDS_BRAND_IDS`.

**Do not** use `headerVariant="brand"` (or omit it) when there is no product brand—users will see the wrong CHG logo.

---

## API

```tsx
import { Menu } from "@chghealthcare/unified-design-system"

// Default — product brand logos + brand tokens
<Menu brand="connect" navigationItems={items} />

// Non-brand — text header; tokens still from brand prop
<Menu
  headerVariant="title"
  headerTitle="Internal portal"
  headerShortTitle="IP"
  brand="default"
  navigationItems={items}
/>
```

| Prop | Required | Purpose |
| --- | --- | --- |
| `headerVariant` | No (default `"brand"`) | `"brand"` → logos; `"title"` → text header |
| `headerTitle` | **Yes** when `headerVariant="title"` | Full product name in the **expanded** rail (188px center band) |
| `headerShortTitle` | No | Collapsed-rail label (36px tile). Defaults to first two characters of `headerTitle` |
| `brand` | No (default `"chg"`) | Sets `document.documentElement.dataset.brand` for **design tokens only** when using `"title"`. Does **not** render a logo in title mode |

If `headerVariant="title"` and `headerTitle` is empty, the component **falls back to brand logos** (dev warning).

---

## When to use `headerVariant="title"`

Use for apps that are:

- Internal-only (ops, compliance, engineering consoles)
- Multi-tenant where the **tenant name** is dynamic (pass tenant name as `headerTitle`; do not invent SVG lockups)
- Early prototypes before brand assignment
- Sub-brands or experiments **not** listed in `UDS_BRAND_IDS`
- Embedded modules inside a parent product that already owns the chrome

## When to use `headerVariant="brand"` (default)

Use for shipped CHG Healthcare product applications:

- Connect, CompHealth, Weatherby, Locumsmart, Modio, GMS, CHG default shell
- Any screen that should match marketing-approved wordmarks in `public/branding/svg/`
- When `brandOptions` lets users switch between **product** brands (not arbitrary strings)

Pair with:

- `brand="<uds-brand-id>"` matching the product
- `navigationItems={getDefaultNavigation(brand)}` or contract rows from `brand-menus.json` when defaults apply
- Optional `brandStorageKey` only when persisting a **product** brand choice

---

## Visual behavior

**Expanded rail (280px):** `headerTitle` centered, `text-base`, up to two lines (`line-clamp-2`).

**Collapsed rail (64px):** `headerShortTitle` or auto-abbreviation in a rounded neutral tile (`text-sm`). Same cross-fade / hover-to-expand toggle as brand marks.

**Tokens:** `brand` still drives `[data-brand=…]` CSS variables. For neutral internal tools, prefer `brand="default"` or `brand="wireframe"` unless a product palette is intentional.

---

## AppShell example (non-brand)

```tsx
import {
  AppShell,
  Menu,
  TooltipProvider,
  type MenuNavigationItem,
} from "@chghealthcare/unified-design-system"
import "@chghealthcare/unified-design-system/styles.css"

const NAV: MenuNavigationItem[] = [
  { id: "home", label: "Home", icon: LayoutIcon },
  { id: "reports", label: "Reports", icon: ChartBarIcon },
]

export function InternalShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AppShell
        className="min-h-dvh w-full min-w-0"
        enableRouterOutlet={false}
        menu={
          <Menu
            headerVariant="title"
            headerTitle="Credentialing hub"
            headerShortTitle="CH"
            brand="default"
            defaultExpanded
            aria-label="Application menu"
            navigationItems={NAV}
            activeId="home"
          />
        }
      >
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </TooltipProvider>
  )
}
```

---

## Compound API

When composing `Menu.Root` + `MenuDefaultHeader` manually:

```tsx
<MenuDefaultHeader
  variant="title"
  title="Internal portal"
  shortTitle="IP"
/>
```

Or rely on `MenuHeaderIdentityContext` from the default `<Menu />` wrapper.

---

## Anti-patterns

| Avoid | Why |
| --- | --- |
| `headerVariant="title"` with a CHG `brand` id “for tokens” but a product marketing name in `headerTitle` | Confusing: users see internal text on a Connect-colored shell. Pick title mode + `default`, or brand mode + product `brand`. |
| Custom `<img>` or text in `toolbar` to fake a header | Use `headerVariant="title"` instead |
| `Branding` inside `Menu.Header` while also using default header | Replace header via composition; do not double-stack logos |
| Omitting `headerTitle` in title mode | Falls back to logos; always pass a non-empty string |

---

## Docs site note

The documentation **Menu** page (`/docs/getting-started/menu`) includes live iframes for every `UDS_BRAND_OPTIONS` entry plus a **title header** example. That preview is for authors only; consumer apps must not use `docs-site-data-brand`.
