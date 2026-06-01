# Figma component props ↔ code

Canonical mapping: [`ai/figma-component-props.json`](../figma-component-props.json)

Apply renames in Figma after component builds:

```bash
node scripts/figma-align-component-props.mjs --write
# Then run `.tmp/figma-align-component-props.js` via use_figma (fileKey in JSON).
```

## Button

| Code `variant` | Figma Appearance |
|----------------|------------------|
| `default` | Default |
| `secondary` | Secondary |
| `outline` | Outline |
| `ghost` | Ghost |
| `destructive` | Destructive |
| `link` | Link |

| Code `size` | Figma Size |
|-------------|------------|
| `default` | Default |
| `xs` | Extra Small |
| `sm` | Small |
| `lg` | Large |
| `icon` | Icon |
| `icon-xs` | Icon Extra Small |
| `icon-sm` | Icon Small |
| `icon-lg` | Icon Large |

Icon/label **gap** is **8px** (`--uds-gap-8`) in code and Figma auto-layout `itemSpacing`.

Source: `src/components/ui/button-theme.ts`, `button.tsx`.

## Badge

| Code `accent` | Figma Accent |
|---------------|--------------|
| `transparent` | Transparent |
| `neutral` | Neutral |
| `red` … `magenta` | Red … Magenta (title case) |
| `inverse` | Inverse |

| Code `appearance` | Figma Appearance |
|-------------------|------------------|
| `subtle` | Subtle |
| `pastel` | Pastel |
| `outlined` | Outlined |
| `solid` | Solid |

Chromatic fills use `uds/color/accent/{hue}/{step}` tokens (e.g. pastel bg = 100, solid fill = 500). Source: `src/components/ui/badge.tsx`.

## Icon

Figma **Size** uses numeric values (`12`, `16`, `20`, `24`, `32`) matching the Phosphor `size` prop on `Icon` / `*Icon` exports.

## Accordion

| Code `variant` | Figma Variant |
|----------------|---------------|
| `divided` | Divided |
| `boxed` | Boxed |
| `boxed-filled` | Boxed Filled |

Property name in Figma: **Variant** (not Appearance). Source: `src/components/ui/accordion.tsx`.
