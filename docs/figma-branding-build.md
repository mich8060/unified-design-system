# Branding component in Figma

Builds the **Branding** component set on the **UDS Components** page with all 16 variants (8 appearances × wordmark/mark).

## Variants

| Appearance | Code `appearance` | Wordmark SVG | Mark SVG |
|------------|-------------------|--------------|----------|
| Wireframe | `Wireframe` | `wireframe-wordmark.svg` | `wireframe-brand-mark.svg` |
| Connect | `Connect` | `connect-wordmark.svg` | `connect-brand-mark.svg` |
| CHG | `CHG` | `unified-design-system-wordmark.svg` | `unified-design-system-brand-mark.svg` |
| Locumsmart | `Locumsmart` | `locumsmart-wordmark.svg` | `locumsmart-brand-mark.svg` |
| Modio | `Modio` | `modio-wordmark.svg` | `modio-brand-mark.svg` |
| MyWeatherby | `MyWeatherby` | `weatherby-wordmark.svg` | `weatherby-brand-mark.svg` |
| MyCompHealth | `MyCompHealth` | `comphealth-wordmark.svg` | `comphealth-brand-mark.svg` |
| Design System | `Design System` | `unified-design-system-wordmark.svg` | `unified-design-system-brand-mark.svg` |

Frames: **200×80** wordmark (`Symbol=False`), **64×64** mark (`Symbol=True`).

## Generate batch scripts

```bash
node scripts/figma-run-branding-batches.mjs
```

Writes `.tmp/figma-build/branding-batches/batch-0.js` … `batch-7.js` and `combine.js`.

## Run in Figma (requires Figma MCP)

1. Open [Untitled](https://www.figma.com/design/3bTua8rojOOC7tYWIEWJl0) in Figma Desktop and connect the Figma MCP plugin in Cursor.
2. Run **nine** sequential `use_figma` calls (`skillNames: figma-use`, `fileKey: 3bTua8rojOOC7tYWIEWJl0`), passing each file’s contents as `code`:
   - `batch-0.js` through `batch-7.js` (one appearance each)
   - `combine.js` last (combines 16 components into component set **Branding**)

Or use payloads:

```bash
node scripts/invoke-branding-figma-batch.mjs batch-0   # prints JSON payload for MCP
```

## Single-shot build (alternative)

```bash
node scripts/figma-generate-component-build.mjs branding --write
# Then use_figma with .tmp/figma-build/branding.js (~147KB — may exceed MCP limits; prefer batches above).
```

## Code alignment

- Component: `src/components/ui/branding.tsx`
- Figma build runtime: `scripts/figma-branding-runtime-slim.js`
- Spec: `scripts/figma-component-build-specs.json` → `branding`
