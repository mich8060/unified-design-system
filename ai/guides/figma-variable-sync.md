# Figma variable sync — canonical scripts

Use these entry points; avoid recreating one-off `figma-sync-*` helpers.

## CSS tokens → target Figma file

1. `node scripts/parse-uds-tokens-for-figma.mjs > .tmp/figma-tokens.json`
2. `node scripts/generate-figma-variable-import.mjs <batch>` (repeat per batch; writes to `/tmp/figma-import-*.js`)
3. `node scripts/figma-run-imports.mjs` — ordered import list for file `LkIyThUA0oVNsDEAyOF7ER`
4. Run each import via Figma MCP `use_figma` (sequential)

### Large imports (>50KB)

1. `node scripts/figma-sync-chunk-import-wrappers.mjs <id> <src.js>`
2. `node scripts/figma-sync-run-wrapper-batch.mjs [startId] [endId]`
3. `node scripts/figma-sync-combine-stores.mjs <id>` when needed
4. Run store chunks then exec via `use_figma`

For brand semantic batches 05–08, see also `scripts/run-figma-variable-import-b64.mjs`.

## Cross-file sync (source → target)

Source: `3bTua8rojOOC7tYWIEWJl0` · Target: `LkIyThUA0oVNsDEAyOF7ER`

```bash
node scripts/figma-sync-orchestrate.mjs plan
node scripts/figma-sync-orchestrate.mjs store-code Colors 66 132
# … retrieve slices/chunks via MCP, then:
node scripts/figma-sync-orchestrate.mjs assemble-slices Colors 66 132
node scripts/figma-sync-orchestrate.mjs import-code Colors 66 132
```

Alternate pull helper: `node scripts/figma-sync-pull-batch-from-figma.mjs Colors 66 132`

## Shared core (called by the above)

- `figma-sync-variables-export.mjs` / `figma-sync-variables-import.mjs`
- `figma-sync-gen-import.mjs` → `figma-sync-process-batch.mjs` → `figma-sync-assemble-batch.mjs`
- `figma-sync-store-export.mjs`, `figma-sync-retrieve-chunk.mjs`, `figma-sync-store-json-slices.mjs`
- `figma-sync-retrieve-json-slice.mjs`, `figma-sync-retrieve-slice-part.mjs`
- `lib/figma-variable-scopes.mjs`, `lib/figma-variable-order.mjs`

Verify an export: `node scripts/figma-sync-read-import.mjs .tmp/figma-export/Colors-0-66.json`
