#!/usr/bin/env node
/**
 * Emit use_figma plugin code to align Button, Icon, and Accordion variant props with code.
 *
 *   node scripts/figma-align-component-props.mjs           # print code to stdout
 *   node scripts/figma-align-component-props.mjs --write   # write .tmp/figma-align-component-props.js
 *
 * Canonical mapping: ai/figma-component-props.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const spec = JSON.parse(fs.readFileSync(path.join(root, 'ai/figma-component-props.json'), 'utf8'))

const buttonAppearanceLabels = spec.components.Button.properties.Appearance.figmaLabels
const buttonSizeLabels = spec.components.Button.properties.Size.figmaLabels
const accordionVariantLabels = spec.components.Accordion.properties.Variant.figmaLabels

/** Legacy / shorthand Figma values -> canonical full-word labels (see ai/figma-component-props.json). */
const buttonAppearanceMap = {
  Primary: buttonAppearanceLabels.default,
  Default: buttonAppearanceLabels.default,
  Secondary: buttonAppearanceLabels.secondary,
  Outline: buttonAppearanceLabels.outline,
  Ghost: buttonAppearanceLabels.ghost,
  Destructive: buttonAppearanceLabels.destructive,
  Link: buttonAppearanceLabels.link,
}
const buttonSizeMap = {
  Xs: buttonSizeLabels.xs,
  'Extra Small': buttonSizeLabels.xs,
  Sm: buttonSizeLabels.sm,
  Small: buttonSizeLabels.sm,
  Default: buttonSizeLabels.default,
  Lg: buttonSizeLabels.lg,
  Large: buttonSizeLabels.lg,
  Icon: buttonSizeLabels.icon,
  'Icon-Xs': buttonSizeLabels['icon-xs'],
  IconXs: buttonSizeLabels['icon-xs'],
  'Icon Extra Small': buttonSizeLabels['icon-xs'],
  'Icon-Sm': buttonSizeLabels['icon-sm'],
  IconSm: buttonSizeLabels['icon-sm'],
  'Icon Small': buttonSizeLabels['icon-sm'],
  'Icon-Lg': buttonSizeLabels['icon-lg'],
  IconLg: buttonSizeLabels['icon-lg'],
  'Icon Large': buttonSizeLabels['icon-lg'],
}
const accordionVariantMap = {
  Transparent: accordionVariantLabels.divided,
  Divided: accordionVariantLabels.divided,
  Outlined: accordionVariantLabels.boxed,
  Boxed: accordionVariantLabels.boxed,
  'Outline filled': accordionVariantLabels['boxed-filled'],
  'Boxed Filled': accordionVariantLabels['boxed-filled'],
}

const code = `
const page = figma.root.children.find((p) => p.name === ${JSON.stringify(spec.pageName)});
if (!page) {
  return { error: 'Page not found: ' + ${JSON.stringify(spec.pageName)} };
}
await figma.setCurrentPageAsync(page);

const BUTTON_ID = ${JSON.stringify(spec.components.Button.nodeId)};
const ICON_ID = ${JSON.stringify(spec.components.Icon.nodeId)};
const ACCORDION_ID = ${JSON.stringify(spec.components.Accordion.nodeId)};
const ACC_ITEM_ID = ${JSON.stringify(spec.components.AccordionItem.nodeId)};

const buttonAppearanceMap = ${JSON.stringify(buttonAppearanceMap, null, 2)};
const buttonSizeMap = ${JSON.stringify(buttonSizeMap, null, 2)};
const accordionVariantMap = ${JSON.stringify(accordionVariantMap, null, 2)};

function renameVariantParts(name, maps) {
  let next = name;
  for (const [from, to] of Object.entries(maps)) {
    const needle = '=' + from;
    const repl = '=' + to;
    let idx = next.indexOf(needle);
    while (idx !== -1) {
      const after = next[idx + needle.length];
      if (after === ',' || after === undefined || after === '') {
        next = next.slice(0, idx) + repl + next.slice(idx + needle.length);
      }
      idx = next.indexOf(needle, idx + repl.length);
    }
  }
  return next;
}

function renameComponentSetVariants(set, maps) {
  if (!set || set.type !== 'COMPONENT_SET') return null;
  for (const v of set.children) {
    v.name = renameVariantParts(v.name, maps);
  }
  return set;
}

// --- Button: Appearance + Size labels, 8px icon/label gap ---
const buttonSet = await figma.getNodeByIdAsync(BUTTON_ID);
if (buttonSet?.type === 'COMPONENT_SET') {
  for (const v of buttonSet.children) {
    let name = renameVariantParts(v.name, { ...buttonAppearanceMap, ...buttonSizeMap });
    name = name.replace(/^Variant=/, 'Appearance=').replace(/, Variant=/g, ', Appearance=');
    v.name = name;
    v.itemSpacing = 8;
    for (const w of v.findAll(
      (n) => n.name === 'Slot start wrapper' || n.name === 'Slot end wrapper',
    )) {
      w.paddingLeft = 0;
      w.paddingRight = 0;
      w.paddingTop = 0;
      w.paddingBottom = 0;
    }
  }
  try {
    buttonSet.editComponentProperty('Variant', { name: 'Appearance' });
  } catch (_) {}
}

// --- Icon: numeric Size=12|16|20|24|32 (Phosphor size prop) ---
const iconSet = await figma.getNodeByIdAsync(ICON_ID);
if (iconSet?.type === 'COMPONENT_SET') {
  for (const v of iconSet.children) {
    const m = v.name.match(/Size=(\\d+)/);
    if (m) v.name = 'Size=' + m[1];
  }
}

// --- Accordion root: Appearance -> Variant ---
const accordionSet = await figma.getNodeByIdAsync(ACCORDION_ID);
if (accordionSet?.type === 'COMPONENT_SET') {
  for (const v of accordionSet.children) {
    v.name = renameVariantParts(v.name, accordionVariantMap);
  }
  try {
    accordionSet.editComponentProperty('Appearance', { name: 'Variant' });
  } catch (_) {}
}

const accItemSet = await figma.getNodeByIdAsync(ACC_ITEM_ID);

return {
  button: buttonSet?.componentPropertyDefinitions ?? null,
  icon: iconSet?.componentPropertyDefinitions ?? null,
  accordion: accordionSet?.componentPropertyDefinitions ?? null,
  accordionItem: accItemSet?.componentPropertyDefinitions ?? null,
  variantSamples: {
    button: buttonSet?.children?.slice(0, 5).map((c) => c.name) ?? [],
    accordion: accordionSet?.children?.map((c) => c.name) ?? [],
  },
};
`.trim()

const write = process.argv.includes('--write')
if (write) {
  const out = path.join(root, '.tmp/figma-align-component-props.js')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, code)
  console.error(`Wrote ${out}`)
} else {
  process.stdout.write(code)
}
