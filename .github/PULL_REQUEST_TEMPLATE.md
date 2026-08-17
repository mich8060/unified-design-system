## Summary

<!-- 1–3 bullets: why this change exists -->

## Semver intent

- [ ] **patch** — fix / docs / additive shim (no public break)
- [ ] **minor** — backward-compatible addition
- [ ] **major** — breaking public API / behavior

See [`docs/semver.md`](../docs/semver.md).

## Changelog (**Required**)

- [ ] Updated [`CHANGELOG.md`](../CHANGELOG.md) `[Unreleased]`
- [ ] Mirrored draft bullets in [`docs/NEXT_RELEASE_NOTES.md`](../docs/NEXT_RELEASE_NOTES.md) when useful for the Release body

## Compatibility (Required for minor/major; patch if exports/props/tokens/imports change)

### Breaking changes

<!-- Explicit list, or `none` -->

### Required team actions

<!-- What consumer apps must do, or `none` -->

### Before-and-after

```tsx
// Before

// After
```

### Deprecation timeline

<!-- What is deprecated and when it will be removed, or `none` -->

### Compatibility risks

<!-- Root barrel vs subpath, styles.css-only, Vitest, theme.css, etc. — or `none` -->

### Rollback approach

<!-- e.g. pin previous version; ship patch with shims — or `n/a` for pure docs -->

## Backwards compatibility

- [ ] Additive API, re-export, or `@deprecated` shim preferred over removal
- [ ] No public export/prop removed without major **or** a shim
- [ ] Migration note linked or inlined when consumers must change code

## Test plan

- [ ] `npm run build:lib`
- [ ] `npm test` / `npm run test:unit`
- [ ] `npm run ci:bundle`
- [ ] `npm run pack:check`
- [ ] Docs smoke / docs routes checked if docs changed (CI `docs-smoke` or local)
- [ ] Spot-check: root + subpath imports for touched public modules
- [ ] Performance: no unnecessary root-barrel / heavy-dep growth

## Release checklist

When this lands in a publish: follow [`docs/RELEASE_CHECKLIST.md`](../docs/RELEASE_CHECKLIST.md).
