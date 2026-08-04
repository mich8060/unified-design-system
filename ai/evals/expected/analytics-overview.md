# Expected signals

- `AppShell` + `Menu` in `menu` (not `Sidebar*`)
- `ChartContainer` from `@chghealthcare/unified-design-system/chart` with brand/token chart colors (not hardcoded hex series)
- Grid places chart card at `lg:col-span-2` (or equivalent wide span)
- Feed panels use `Tabs` and/or `Empty` for idle states
- package-root imports for shell/chrome; chart subpath + recharts only as chart children
