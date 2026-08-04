# Expected signals

- `listview={…}` is used (not deprecated `showListview`)
- listview width stays in **320–480px** when `listviewWidth` / `--appshell-listview-width` is set (default 320)
- the `listview` slot uses **`Toolbar`** as the primary titlebar (`ToolbarTitle` / `ToolbarDescription` for name + count/meta)
- `SearchInput` (when present) is wrapped with **4px** padding and a bottom border
- entities use **`Item`** (`appearance="list"` + `ItemGroup gap-0` for dense queues) **or** **`Card`**
- dense Item rows: at most one trailing `Status` (`outlined` + `compact`)
- detail content stays in `AppShell.Main` / children, not in an ad hoc parallel layout
- FAIL if listview uses a custom title/count header instead of Toolbar, or ad-hoc entity rows instead of Item/Card
