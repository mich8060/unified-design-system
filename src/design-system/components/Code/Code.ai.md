# Code

Syntax-highlighted code component using PrismJS tokenization and UDS semantic code color tokens.

## When to Use
- Displaying code snippets in docs, examples, and developer-facing UI
- Inline code references inside paragraphs

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | — | Source code string to render and highlight |
| `language` | `string` | `"javascript"` | Prism language key |
| `inline` | `boolean` | `false` | Renders inline code style when true |
| `className` | `string` | `""` | Additional CSS classes |

## Notes
- Uses semantic tokens: `--uds-code-bg`, `--uds-code-fg`, and token color vars
- Uses Prism token classes (e.g. `.token.keyword`, `.token.string`) for styling
