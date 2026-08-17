# Public API compatibility

`@chghealthcare/unified-design-system` follows [Semantic Versioning](https://semver.org/) for the **published public API**:

| Bump | Meaning |
|------|---------|
| **patch** | Bug fixes, docs, additive non-breaking tweaks, deprecated compatibility shims |
| **minor** | Backward-compatible additions (new components, props, icons, recipes) |
| **major** | Breaking removals or incompatible behavior changes to the public API |

**Public API** means what consumers import from:

- `@chghealthcare/unified-design-system` (root barrel)
- Documented package subpaths (`/drawer`, `/date-input`, `/chart`, …)
- `@chghealthcare/unified-design-system/styles.css` and shipped AI/docs entrypoints listed in `package.json` `exports`

Internal modules under `src/components/ui/*-base`, `*-uds`, `dist/*`, and `@/*` are not a public contract.

## No silent breaks

- Prefer additive APIs, root re-exports, or `@deprecated` shims **before** removals.
- Removals of public exports/props, moving modules off the root barrel without re-export, or renaming CSS tokens without aliases → **major** (or ship a shim in a prior release).
- Every consumer-facing PR updates [`CHANGELOG.md`](../CHANGELOG.md) `[Unreleased]`. Every publish **promotes** that section to a versioned heading.

Release process (compat fields, tests, performance, rollback): [`RELEASE_CHECKLIST.md`](./RELEASE_CHECKLIST.md).

## Historical note (1.0 → 1.2)

The **1.2.x** line shipped breaking changes (AppShell header chrome, Card heading removal, heavy modules off the root barrel) without a major version bump. That was a process miss; we **do not** re-tag historical `1.2.1` as `2.0.0`.

Compatibility restorations (root Drawer / DateInput / DateRangeInput re-exports, deprecated Card heading shims) ship as a forward patch/minor so apps can leave `1.0.6` pins. Removing those shims later is a **major**.

## Discoverability

- Durable history: [`CHANGELOG.md`](../CHANGELOG.md)
- Draft for the next GitHub Release: [`NEXT_RELEASE_NOTES.md`](./NEXT_RELEASE_NOTES.md)
- Every-release runbook: [`RELEASE_CHECKLIST.md`](./RELEASE_CHECKLIST.md)
- 1.0 → 1.2 checklist: [`MIGRATION-1.0-to-1.2.md`](./MIGRATION-1.0-to-1.2.md)

Maintainers: every publish must update `CHANGELOG.md` and the GitHub Release body — do not rely on trial installs to discover breaks.
