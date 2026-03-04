# Pagination

Page navigation control for paginated data sets.

## When to Use
- Navigating through pages of data (tables, lists, search results)
- Any content that is split across multiple pages

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalPages` | `number` | — | Total number of pages |
| `currentPage` | `number` | `1` | Current active page |
| `onPageChange` | `function` | — | Callback `(page: number) => void` |
| `variant` | `"default" \| "line"` | `"default"` | Visual style of the pagination control |
| `showJumpInput` | `boolean` | `false` | Shows jump-to-page input |
| `showDoubleButtons` | `boolean` | `false` | Shows first/last buttons |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

```jsx
<Pagination totalPages={20} currentPage={page} onPageChange={setPage} />
```

### With table
```jsx
<Table columns={columns} data={paginatedData} />
<Pagination totalPages={Math.ceil(total / pageSize)} currentPage={page} onPageChange={setPage} />
```
