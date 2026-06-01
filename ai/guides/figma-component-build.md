# Building UDS components in Figma

Rules: [`figma.component.rules.md`](../../figma.component.rules.md)

## Inventory

```bash
node scripts/figma-prepare-component-manifest.mjs
```

See [`ai/figma-component-manifest.json`](../figma-component-manifest.json) for `spec-ready`, `in-figma`, `deferred`, and `needs-spec` counts.

## Add a component spec

1. Add variant axes to [`scripts/figma-component-build-specs.json`](../../scripts/figma-component-build-specs.json) (match React props; cap matrix ≤30 variants).
2. Add `kind` and grid layout hints; extend [`scripts/figma-build-runtime.js`](../../scripts/figma-build-runtime.js) if a new builder is needed.
3. Regenerate plugin code:

```bash
node scripts/figma-generate-component-build.mjs <slug> --write
```

4. Run the script in Figma via `use_figma` (one slug per call, sequentially).

## Batch bootstrap (atom slugs with build specs)

```bash
for s in badge input checkbox switch skeleton spinner label dot-status avatar \
  toggle radio-group textarea progress slider separator kbd link; do
  node scripts/figma-generate-component-build.mjs "$s" --write
done
# Then run each .tmp/figma-build/<slug>.js via use_figma (MCP), one at a time.
```

**Atoms (17)** and **molecules (7)** below are built in Figma as of the latest inventory (`ai/figma-component-manifest.json`).

```bash
for s in text status alert card tabs field empty; do
  node scripts/figma-generate-component-build.mjs "$s" --write
done
```

## Deferred slugs

Composite screens (dialog, table, menu, calendar, etc.) are marked `deferred` in the manifest. Build their **atoms** in Figma first, then compose with instances—or use docs capture (`scripts/figma-batch-capture-components.mjs`) for full examples.

## Align existing sets

```bash
node scripts/figma-align-component-props.mjs --write
# Run .tmp/figma-align-component-props.js via use_figma
```

Property mapping: [`ai/figma-component-props.json`](../figma-component-props.json)
