Create an analytics overview screen using the Unified Design System package.

Requirements:
- import components only from `@chghealthcare/unified-design-system`
- import styles only from `@chghealthcare/unified-design-system/styles.css`
- use `AppShell` with `Menu` in the `menu` slot and content in `AppShell.Main`
- include a wide `ChartContainer` card (`lg:col-span-2`) with KPI `Badge`s and adjacent feed panels — import chart from `@chghealthcare/unified-design-system/chart`
- use `Empty` for idle feed states; chart series colors via `ChartConfig` / `--chart-*` (not raw hex)
- recharts primitives may be used only as children of `ChartContainer`

Before coding, read `ai/recipes/analytics-overview.md` and `ai/examples/analytics-overview.tsx`.
