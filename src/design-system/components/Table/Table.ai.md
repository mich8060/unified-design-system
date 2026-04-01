# Table

Data table component for displaying tabular data with sortable and filterable columns.

## When to Use
- Displaying structured data in rows and columns
- Data grids with custom cell rendering
- Lists that need column alignment, sorting indicators, or filtering

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `array` | `[]` | Column definitions (see Column Object below) |
| `data` | `array` | `[]` | Array of row data objects |
| `className` | `string` | `""` | Additional CSS classes |

### Column Object

| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Data key to access from row objects |
| `label` | `string` | Column header text |
| `icon` | `string` | Phosphor icon name for header |
| `align` | `string` | Cell alignment: `"left"`, `"center"`, `"right"` |
| `sortable` | `boolean` | Show sort indicator in header |
| `filterable` | `boolean` | Show filter icon in header |
| `className` | `string` | Additional class for column cells |
| `render` | `function` | Custom render: `(row, rowIndex, colIndex) => ReactNode` |

## Examples

### Basic table
```jsx
<Table
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ]}
  data={[
    { name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  ]}
/>
```

### With custom cell rendering
```jsx
<Table
  columns={[
    {
      key: "user",
      label: "User",
      render: (row) => (
        <Layout gap="8" alignItems="center">
          <Avatar initials={row.initials} size="small" />
          <span>{row.name}</span>
        </Layout>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "status",
      label: "Status",
      render: (row) => <Status label={row.status} variant={row.statusColor} />,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <Button icon="DotsThree" layout="icon-only" appearance="ghost" size="small" />
      ),
    },
  ]}
  data={users}
/>
```

### With sortable/filterable headers
```jsx
<Table
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "date", label: "Date", sortable: true, icon: "Calendar" },
    { key: "category", label: "Category", filterable: true },
    { key: "amount", label: "Amount", align: "right", sortable: true },
  ]}
  data={transactions}
/>
```

## Composition

- Use `Avatar`, `Tag`, `Status`, `Badge`, `Button` inside custom `render` functions
- Wrap in `Card` for bordered table sections
- Pair with `Pagination` below the table for large datasets
- Inside `UDS.Main` for page-level data tables

## Do's and Don'ts

✅ **Do**: Use `render` function for complex cell content (avatars, tags, action buttons)
✅ **Do**: Align numeric columns to the right with `align: "right"`
✅ **Do**: Use `Layout` inside render functions for multi-element cells

❌ **Don't**: Put very wide content in cells without considering responsive behavior
❌ **Don't**: Use `render` AND `key` for the same column — `render` takes precedence
