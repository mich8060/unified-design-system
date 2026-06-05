# Roadmap embed (docs)

Interactive timeline served at `/roadmap/index.html` inside the UDS docs site.

Built against **`@chghealthcare/unified-design-system`** (via Vite alias to `../src`) — uses UDS components (`Button`, `Dialog`, `Field`, `Input`, `Status`, …) and `--uds-*` design tokens only in app code. Vendored `src/app/components/ui/` is legacy and unused.

## Export workflow

1. Open `/docs/roadmap`, press **⌘E** / **Ctrl+E** in the viewer (turns on layout edit mode and the internal toolbar).
2. Edit the roadmap, then click **Export JSON** in the header. Press **⌘E** / **Ctrl+E** again to exit edit mode.
3. Replace the docs data file with the download:

   ```text
   public/api/event-positions
   ```

   (No `.json` extension — the file is JSON content.)

4. Commit the updated `public/api/event-positions` (and optionally re-sync the embed).

## Rebuild embed after source changes

From the repo root:

```bash
npm run build:roadmap-embed
```

Or from a `Roadmap.zip`:

```bash
node scripts/sync-roadmap-embed.mjs /path/to/Roadmap.zip
```
