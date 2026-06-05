# Documentation version snapshots

The docs site can show **frozen** navigation/catalog bundles per semver under `src/docs/versions/<version>/`. The sync script runs before every `npm run build:docs`.

## When a new snapshot is created

| Package bump | New folder `src/docs/versions/X.Y.Z/` |
|--------------|----------------------------------------|
| **Major** (e.g. 1.0.5 → 2.0.0) | Yes |
| **Minor** (e.g. 1.0.5 → 1.1.0) | Yes |
| **Patch** (e.g. 1.0.5 → 1.0.6) | **No** — reuse the latest snapshot |
| Same version rebuild | Refreshes existing snapshot in place |

Patch releases still ship updated **live** docs (current `src/docs` source) when you run `build:docs`; only the **versioned snapshot** in the sidebar selector stays on the latest minor/major line until the next minor or major bump.

## Sidebar version selector

The **Docs version** control is **hidden** until at least two minor/major snapshots exist (for example `1.0.5` and `1.1.0`). With a single snapshot line, there is nothing to switch between.

Older patch-only folders (`1.0.1`, `1.0.2`, …) are **pruned** on sync. The manifest keeps at most:

1. The newest snapshot, and  
2. One older snapshot on a **different** minor or major line (when present).

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
