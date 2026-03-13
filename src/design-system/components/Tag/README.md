# Tag

Tag displays compact labels for status, metadata, and categorization.

## Usage

```tsx
import { Tag } from "@mich8060/unified-design-system";
```

## Core Examples

```tsx
<Tag label="Default" color="neutral" />
<Tag label="Outlined" color="blue" outlined />
<Tag label="Solid" color="green" solid />
<Tag label="Pastel" color="purple" pastel />
<Tag label="Icon Left" appearance="icon-left" icon="Tag" color="sky" />
```

## Preset Color-only API

`color` only accepts built-in presets:

- `transparent`
- `neutral`
- `red`
- `orange`
- `yellow`
- `emerald`
- `green`
- `sky`
- `cyan`
- `blue`
- `indigo`
- `purple`
- `fuchsia`
- `magenta`
- `inverse`

## Visual Treatments

- `subtle` (default): transparent background + semantic text
- `pastel`: lighter color surfaces
- `outlined`: visible border using the selected color
- `solid`: high-emphasis filled color

When multiple treatment props are set, `solid` takes precedence over `outlined` and `pastel`.

## Structure Compliance

- Uses semantic token styles from `var(--uds-...)`.
- BEM naming with `.uds-tag` as the block prefix.
- Variants and defaults are defined in `Tag.spec.ts`.
- Public exports are limited to component and types through `index.ts`.
