# DSL principles

1. **Tokens before values** — Use `--uds-*` variables and component variants; do not hardcode hex, px spacing, or ad-hoc radius.
2. **Components before markup** — Prefer UDS exports (`Button`, `Field`, `Card`, `AppShell`) over bespoke HTML/CSS.
3. **Semantic before decorative** — Color, elevation, and weight communicate meaning (status, hierarchy, affordance).
4. **Shell before screen** — Authenticated product UI defaults to `AppShell` with `Menu` in the menu slot; page content in `AppShell.Main`.
5. **Accessible by default** — Focus, contrast, touch targets, and semantics are not optional polish.
6. **Brand via modes** — Product brand differences use token modes and `Menu`/`Branding` props—not one-off color overrides.
7. **AI-readable** — Decisions in this folder should align with `ai/uds-contract.json` so agents produce on-brand UI.
