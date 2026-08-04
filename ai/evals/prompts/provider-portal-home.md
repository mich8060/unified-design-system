Create a provider portal home screen using the Unified Design System package.

Requirements:
- import components only from `@chghealthcare/unified-design-system`
- import styles only from `@chghealthcare/unified-design-system/styles.css`
- use `AppShell` with `Menu` in the `menu` slot and content in `AppShell.Main`
- layout: optional `Progress` action banner, then `lg:grid-cols-[445px_minmax(0,1fr)]` with a left identity rail (`Avatar`, `Badge`, team/reminder cards) and a main `Steps` walkthrough
- do not nest a second AppShell on the page

Before coding, read `ai/recipes/provider-portal-home.md` and `ai/examples/provider-portal-home.tsx`.
