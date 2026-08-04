# Visual baselines

Narrow Playwright screenshots of docs example stages (`[data-docs-example]`).

## Update locally

```bash
npm run build:docs
npm run test:visual:update
```

Snapshots land in `e2e/visual/components.spec.ts-snapshots/` as `*-{platform}.png` (e.g. `darwin`, `linux`).

## CI

GitHub Actions runs on Ubuntu. Commit `*-linux.png` files so the **Visual baselines** CI step enables itself (`hashFiles('e2e/visual/**/*-linux.png')`).

Generate Linux baselines on an Ubuntu machine or in CI artifacts, then commit them.
