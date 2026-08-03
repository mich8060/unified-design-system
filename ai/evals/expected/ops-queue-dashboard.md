# Expected signals

- `AppShell` with `Menu` in the `menu` slot (not `Sidebar*`)
- `AppShell.Main` wraps page content
- `SearchInput` and facet/`Badge` filters are present
- Queue rows use `Item` / `ItemGroup` (and preferably `Medallion` / `Status`)
- Aside includes `MicroCalendar` from `@chghealthcare/unified-design-system/micro-calendar`
- imports remain on the package root (plus the micro-calendar subpath when needed)
