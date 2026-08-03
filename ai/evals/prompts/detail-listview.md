Create a candidate review screen with a master-detail layout.

Requirements:
- use `AppShell` with a non-null `listview` prop (there is no `showListview`)
- put list content in the `listview` slot
- listview pane: **`Toolbar`** as the primary titlebar (`ToolbarTitle` + `ToolbarDescription` for name/count), optional `SearchInput` (`inputSize="sm"`) in a wrapper with **4px** padding all sides and `border-b`, entities as **`Item appearance="list"`** rows (`ItemGroup gap-0`, one trailing compact outlined `Status`) or **`Card`**
- do **not** invent a custom title/count header or ad-hoc entity rows
- keep detail content in `AppShell.Main`
- keep imports on the package root only
