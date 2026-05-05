# UDS Contract

Use [`ai/uds-contract.json`](./ai/uds-contract.json) as the source of truth.

- AppShell (props, regions, DOM, AI rules): [`ai/appshell.schema.json`](./ai/appshell.schema.json)

- Allowed imports: `@chg-ds/unified-design-system` and `@chg-ds/unified-design-system/styles.css`
- Default authenticated layout: `AppShell` with exported `Sidebar*` primitives
- Prefer existing UDS components before inventing new chrome
- Consult `ai/recipes/*.md` and `ai/examples/*.tsx` before composing a new screen
