# Migrating from UDS 1.0.x to 1.2.x+

Checklist for apps pinned on **1.0.6** (or earlier 1.0.x) that need icons and other 1.2+ APIs.

Companion: [CHANGELOG.md](../CHANGELOG.md), [semver.md](./semver.md).

## 1. Unpin and install

In the consumer `package.json`, replace an exact pin such as `"1.0.6"` with a version that includes the compatibility restorations (root Drawer/DateInput re-exports + Card heading shims), then install:

```bash
npm install @chghealthcare/unified-design-system@latest
```

Prefer a caret range only after you have run the checklist once (`"^1.2.2"` or whatever version ships the shims). Until then, pin the exact patched version.

## 2. Drawer / DateInput / DateRangeInput imports

**Mechanical.** These are available from the **root barrel again**:

```tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerBody,
  DateInput,
  DateRangeInput,
} from "@chghealthcare/unified-design-system"
```

Subpaths remain valid and preferred for Vitest / narrow bundles:

```tsx
import { Drawer, DrawerContent } from "@chghealthcare/unified-design-system/drawer"
import { DateInput } from "@chghealthcare/unified-design-system/date-input"
import { DateRangeInput } from "@chghealthcare/unified-design-system/date-range-input"
```

Still **subpath-only** (not restored to root): `/calendar`, `/micro-calendar`, `/chart`, `/command`, `/resizable`, `/sonner`, `/input-otp`.

## 3. Card heading parts

**1.0.x:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Supporting copy</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>
```

**Compatibility (post-shim release):** the same imports compile. `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` are **deprecated** — keep them only while migrating.

**Recommended long-term** — title inside `CardContent`, or `SectionHeader` above the card:

```tsx
<Card>
  <CardContent>
    <p className="font-medium text-uds-text-primary">Title</p>
    <p className="text-sm text-uds-text-secondary">Supporting copy</p>
    …
  </CardContent>
</Card>
```

```tsx
<SectionHeader>
  <SectionHeaderTitle>Title</SectionHeaderTitle>
  <SectionHeaderDescription>Supporting copy</SectionHeaderDescription>
</SectionHeader>
<Card>
  <CardContent>…</CardContent>
</Card>
```

Settle one pattern, then apply it across call sites (the expensive half of the upgrade).

## 4. Icons

1.2.x expands the curated root registry. After upgrade you can import:

```tsx
import { SlidersIcon, FunnelIcon } from "@chghealthcare/unified-design-system"
// Vitest / narrow bundles:
import { SlidersIcon, FunnelIcon } from "@chghealthcare/unified-design-system/icons"
// equivalent:
import { SlidersIcon, FunnelIcon } from "@chghealthcare/unified-design-system/uds-icons"
```

Use package icons — do not import `@phosphor-icons/react` directly in app code.

## 5. Vitest / TD-UDS-010 (root barrel eager-load) — keystone `apps/web`

Importing from the package **root** in Vitest evaluates the entire public barrel (~100+ modules and heavy peers). That dominates consumer CI even when each test only needs `Button`.

**Required for test files (including keystone):** rewrite UDS imports to **kebab subpaths**. Every barrel module now has an export (e.g. `/button`, `/toolbar`, `/section-header`, `/icons` or `/uds-icons`, `/app-shell`). Production app code may keep root imports for convenience; tests should not.

```tsx
// Before (slow in Vitest)
import { Button, Card, CardContent } from "@chghealthcare/unified-design-system"

// After
import { Button } from "@chghealthcare/unified-design-system/button"
import { Card, CardContent } from "@chghealthcare/unified-design-system/card"
```

Expect a large CI win from module-collection time without changing runtime behavior. See [`setup.md`](../setup.md) (Vitest section).

## 6. AppShell header chrome (behavioral)

Branding + menu toggle live on the full-width **AppShell Header**, not Menu:

- Set `brand` / `headerVariant` / `headerTitle` on **`AppShell`**
- Menu in the `menu` slot is **nav-only**

See [`ai/guides/menu-header-identity.md`](../ai/guides/menu-header-identity.md).

## Suggested order of work

1. Bump package version and fix type errors from missing exports (should be few once shims ship).
2. **Rewrite Vitest imports to subpaths** (TD-UDS-010) — largest CI win.
3. Optionally rewrite app Drawer/DateInput to subpaths for bundle hygiene.
4. Migrate Card headings site-by-site to `CardContent` / `SectionHeader`.
5. Adopt new icons (`SlidersIcon`, `FunnelIcon`, …) via root or `/icons`.
6. Validate AppShell header branding against the guide above.
