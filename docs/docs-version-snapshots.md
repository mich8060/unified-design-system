# Documentation version snapshots

The docs site loads a **single frozen** navigation/catalog bundle under `src/docs/versions/<version>/` for the latest retained package line. The sync script runs before every `npm run build:docs`. There is **no** documentation version dropdown in the Menu.

## When a new snapshot is created

| Package bump | New folder `src/docs/versions/X.Y.Z/` |
|--------------|----------------------------------------|
| **Major** (e.g. 1.0.5 → 2.0.0) | Yes |
| **Minor** (e.g. 1.0.5 → 1.1.0) | Yes |
| **Patch** (e.g. 1.0.5 → 1.0.6) | **No** — reuse the latest snapshot |
| Same version rebuild | Refreshes existing snapshot in place |

Patch releases still ship updated **live** docs (current `src/docs` source) when you run `build:docs`; the frozen snapshot folder only advances on minor/major (or force).

## Retention

Only the **newest** snapshot is kept. Older semver folders are **pruned** on sync. Historical version switching is not supported.

## Maintainer commands

```bash
# Normal docs build (applies policy automatically)
npm run build:docs

# Rare: force a patch-level snapshot (e.g. legally required doc freeze)
FORCE_DOCS_SNAPSHOT=1 npm run build:docs
```

## Release checklist

1. **Patch** — bump `package.json` patch, publish; no new docs snapshot required.
2. **Minor / major** — bump version, run `npm run build:docs` (or full `npm run build`) so `sync-docs-version-snapshot.mjs` creates `src/docs/versions/<new>/`, then commit the generated `manifest.ts` and `resolve-loaders.generated.ts` with the snapshot folder.

## Implementation

- Policy: `scripts/lib/docs-version-policy.mjs`
- Sync: `scripts/sync-docs-version-snapshot.mjs`
- Manifest `defaultVersion` points at the newest **snapshot**, not necessarily the current package patch.
