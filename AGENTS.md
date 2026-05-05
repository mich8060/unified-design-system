# UDS AI Rules

Canonical contract: [`ai/uds-contract.json`](./ai/uds-contract.json)

- AppShell schema (regions, props, behavior): [`ai/appshell.schema.json`](./ai/appshell.schema.json)

- Import runtime components only from `@chg-ds/unified-design-system`.
- Import styles only from `@chg-ds/unified-design-system/styles.css`.
- Do not import from `src/components/ui/*`, `dist/*`, `@/*`, or any `*-base`, `*-core`, `*-theme`, `*-uds` module in consumer-facing code.
- For authenticated product screens, default to `AppShell`.
- Compose the `AppShell` `sidebar` slot only with exported UDS sidebar primitives.
- Use existing UDS exports before inventing new layout or component chrome.
- Prefer recipe-aligned patterns from `ai/recipes/*.md` and `ai/examples/*.tsx` when generating a new screen.
- Treat `ai/uds-contract.json` as normative when prose docs disagree.
