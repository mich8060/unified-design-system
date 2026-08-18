# Changelog

All notable changes to `@chghealthcare/unified-design-system` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
going forward. See [docs/semver.md](./docs/semver.md).

Draft notes for the *next* unpublished release also live in [`docs/NEXT_RELEASE_NOTES.md`](./docs/NEXT_RELEASE_NOTES.md); maintainers copy them here (and into the GitHub Release) on publish.

## [Unreleased]

## [1.4.3] - 2026-08-18

### Fixed

- **Cloudflare docs deploy** — committed `wrangler.jsonc` with `assets.directory` `./docs-dist` so `npx wrangler deploy` uploads the docs site instead of auto-scaffolding an invalid config and rebuilding the library.

## [1.4.2] - 2026-08-17

Compatibility restorations and additive APIs for apps leaving `1.0.6` pins, plus visual polish.

### Added

- **`Alert` `appearance="pastel"`** — Badge-aligned soft wash; legacy `style="filled"` maps to pastel (TD-UDS-003).
- **`MenuNavigationItem.disabled` / `className`** — gray out / prevent selection; merge per-row class names (TD-UDS-011).
- **Amber accent `@theme` colors** — `--color-uds-color-accent-amber-*` utilities from existing `--uds-color-accent-amber-*` tokens; safelisted in published `styles.css` / `styles-base.css` and included in the `./theme` partial (TD-UDS-007).
- **`FunnelIcon` / `LightningIcon`** — curated Phosphor glyphs on the root icon registry (TD-UDS-008).
- **Root-barrel compatibility** — `Drawer` (all parts), `DateInput`, and `DateRangeInput` re-exported from the package root again (subpaths remain) (TD-UDS-012).
- **Card heading shims** — deprecated `CardHeader`, `CardTitle`, `CardDescription`, and `CardAction` restored for 1.0.x upgrades. Prefer title/description inside `CardContent`, or `SectionHeader` above the card (TD-UDS-012).
- **`NumberInput` steppers** — custom increment/decrement controls; pass `hideStepper` to hide them.
- **Lazy test barrel** — `dist/lazy-index.cjs` behind the `"test"` export condition so Vitest/Jest can load root-barrel imports per-component. Guide: [`ai/guides/consumer-test-performance.md`](./ai/guides/consumer-test-performance.md).

### Fixed

- **`border-t` / `border-b` padding collision** — InputGroup block-addon separator padding no longer flattens into global `.border-t` / `.border-b` rules in `styles.css` (TD-UDS-002). Guard: `npm run test:border-utility-css`.
- **List marker / padding resets** — Breadcrumb, CheckList, Pagination, Sidebar menu, and Steps no longer pick up consumer `ul`/`ol` bullets or default padding.
- **DateInput / DateRangeInput popover chrome** — calendar popovers use surface-primary fill and UDS radius/shadow instead of `bg-card`.

## [1.4.1] - 2026-08-13

- Tailwind consumer partials: `./theme` + `./variants` (`dist/theme.css` / `dist/variants.css`) for local Tailwind v4 builds ([#72](https://github.com/chghealthcare/unified-design-system/pull/72)). Guide: [`docs/consumer-tailwind-theme.md`](./docs/consumer-tailwind-theme.md).

## [1.4.0] - 2026-08-13

Yanked / superseded by **1.4.1** for the theme partial surface. Do not pin `1.4.0`.

## [1.3.0] - 2026-08

- Complete component subpath exports for Vitest (TD-UDS-010 / [#52](https://github.com/chghealthcare/unified-design-system/issues/52) / [#66](https://github.com/chghealthcare/unified-design-system/pull/66)).

## [1.2.1] - 2026-07

Patch on the 1.2 line. See GitHub Releases for the full body; highlights below summarize breaking and high-impact notes from the 1.2.x cycle relative to **1.0.6**.

### Breaking (shipped in 1.2.x before compatibility restorations)

- **AppShell header chrome** — branding + menu toggle moved from Menu into the full-width AppShell Header. Set `brand` / `headerVariant` / `headerTitle` on `AppShell`; Menu is nav-only. See `ai/guides/menu-header-identity.md`.
- **Card heading parts removed** — `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` were deleted in favor of the three-slot model (`Card` / `CardImage` / `CardContent` / `CardFooter`). Restored as deprecated shims in **[Unreleased]**.
- **Heavy modules subpath-only** — `Drawer`, `DateInput`, `DateRangeInput`, `Calendar`, `MicroCalendar`, `Chart`, `Command`, and related peers left the root barrel for Vite/bundle reasons. `Drawer` / `DateInput` / `DateRangeInput` return to the root in **[Unreleased]**; other heavy modules stay subpath-only.

### Added (1.2.x)

- Larger curated icon registry on the root barrel (including `SlidersIcon`, `ShapesIcon`, `ListChecksIcon`).
- Toolbar three-region layout; `listviewWidth` 320–480px; Status/Badge shared appearance axis; CareerMD brand; Inter font externalized from `styles.css`; component subpaths for narrow Vitest imports.

Upgrade checklist: [`docs/MIGRATION-1.0-to-1.2.md`](./docs/MIGRATION-1.0-to-1.2.md).

## [1.0.6]

Baseline many consumer apps pinned before the 1.2 line. Root barrel included Drawer, DateInput, DateRangeInput, and Card heading subcomponents. Smaller curated icon allowlist than 1.2.x.
