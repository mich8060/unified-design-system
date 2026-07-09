#!/usr/bin/env node
/**
 * Emit a use_figma script under the 50k MCP limit by including only named runtime functions.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const runtimePath = path.join(root, 'scripts/figma-build-runtime.js')
const specsPath = path.join(root, 'scripts/figma-component-build-specs.json')

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node scripts/figma-slim-build.mjs <slug>')
  process.exit(1)
}

const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'))
const spec = specs[slug]
if (!spec) {
  console.error(`No spec for ${slug}`)
  process.exit(1)
}

const runtime = fs.readFileSync(runtimePath, 'utf8')
const BADGE_BUILD_FROM_SPEC = `
async function buildFromSpec(spec) {
  const page = await ensurePage(spec.pageName ?? 'UDS Components')
  const existing = page.findOne(
    (n) => n.type === 'COMPONENT_SET' && n.name === spec.figmaName,
  )
  if (existing && spec.replaceExisting) {
    existing.remove()
  } else if (existing) {
    return { skipped: true, nodeId: existing.id, name: existing.name }
  }

  await loadInter()
  const axisNames = Object.keys(spec.axes)
  const axisValues = axisNames.map((k) => spec.axes[k])
  const combinations = cartesianProduct(axisValues)
  const components = []

  for (const combo of combinations) {
    const comp = figma.createComponent()
    comp.name = variantName(axisNames, combo)
    const axis = Object.fromEntries(axisNames.map((k, i) => [k, combo[i]]))
    await buildBadgeVariant(comp, spec, axis)
    page.appendChild(comp)
    components.push(comp)
  }

  const set = figma.combineAsVariants(components, page)
  set.name = spec.figmaName
  set.x = 100
  set.y = nextCanvasY(page)
  gridLayoutVariants(
    set,
    spec.gridCols ?? 8,
    spec.gridCellW ?? 88,
    spec.gridCellH ?? 32,
  )

  const labelLink = linkTextComponentProperty(set, {
    propertyName: 'label',
    layerName: 'Label',
    defaultValue: spec.label ?? 'Label',
  })

  return {
    skipped: false,
    nodeId: set.id,
    name: set.name,
    variantCount: set.children.length,
    samples: set.children.slice(0, 4).map((c) => c.name),
    labelProperty: labelLink,
  }
}
`.trim()

const SLIM_EXTRA_BY_SLUG = {
  badge: [
    'accentColorToken',
    'badgeAccentSlug',
    'resolveBadgeStyle',
    'buildBadgeVariant',
    'applyLocalTextStyle',
    'bindPaddingAxis',
  ],
}

const BASE_FN_NAMES = [
  'cartesianProduct',
  'findVar',
  'bindFill',
  'bindStroke',
  'bindRadius',
  'bindGap',
  'bindText',
  'loadInter',
  'variantName',
  'linkTextComponentProperty',
  'gridLayoutVariants',
  'nextCanvasY',
  'ensurePage',
]

const FULL_FN_NAMES = [
  ...BASE_FN_NAMES,
  'buildFromSpec',
  'bindPaddingAxis',
  'buildKbdVariant',
  'createCheckboxInstance',
  'buildCheckListControlContent',
  'buildCheckListControlVariant',
  'buildCheckListItemFrame',
  'buildCheckListVariant',
  'createCollapsibleIcon',
  'buildCollapsibleVariant',
  'createKbdShortcutFrame',
  'createMenuIcon16',
  'createMenuCheckIndicator',
  'buildContextMenuItemRow',
  'buildContextMenuItemVariant',
  'buildContextMenuLabelVariant',
  'buildContextMenuSeparatorVariant',
  'instantiateContextMenuPart',
  'buildContextMenuContentFrame',
  'buildContextMenuVariant',
  'createButtonInstance',
  'buildDropdownMenuVariant',
  'applyInputGroupShell',
  'createInputGroupControlFrame',
  'createInputGroupAddonFrame',
  'createInputGroupAddonSlotFrame',
  'createIcon16Instance',
  'buildInputGroupVariant',
  'buildSearchInputVariant',
  'buildDateInputVariant',
  'applyInputShellStateEffects',
  'appendDateSegmentTexts',
  'buildDateRangeInputVariant',
  'createInputGroupIconButton',
  'buildInputWithTrailingActionVariant',
  'buildUrlInputVariant',
  'createTokenChipFrame',
  'buildTokenInputVariant',
  'buildInputOtpSlot',
  'buildInputOtpVariant',
  'resolveGlyphComponentId',
  'createIconInstance',
  'bindIconFill',
  'applyLocalEffectStyle',
  'buildComboboxInputVariant',
  'buildDotStatusVariant',
  'buildAlertDialogVariant',
  'buildDialogVariant',
  'buildDrawerVariant',
  'bindCornerRadius',
  'createInputInstance',
  'appendDialogCloseButton',
  'buildComboboxItemVariant',
]

const slugFnNames =
  slug === 'badge'
    ? [...BASE_FN_NAMES, ...(SLIM_EXTRA_BY_SLUG.badge ?? [])]
    : [...FULL_FN_NAMES, ...(SLIM_EXTRA_BY_SLUG[slug] ?? [])]

const constBlocks = []
if (slug === 'badge') {
  const m = runtime.match(/const BADGE_CHROMATIC_ACCENTS = [\s\S]*?\]\n/)
  if (m) constBlocks.push(m[0].trim())
}

const chunks = []
for (const name of slugFnNames) {
  const re = new RegExp(
    `(?:async )?function ${name}\\([^)]*\\)[\\s\\S]*?(?=\\n(?:async )?function |\\nconst [A-Z_]|$)`,
  )
  const m = runtime.match(re)
  if (m) chunks.push(m[0].trim())
}

const buildFromSpecBlock = slug === 'badge' ? BADGE_BUILD_FROM_SPEC : null

const code = `${constBlocks.join('\n\n')}

${chunks.join('\n\n')}

${buildFromSpecBlock ?? ''}

const spec = ${JSON.stringify({ pageName: 'UDS Components', kind: 'badge', replaceExisting: true, ...spec }, null, 2)};
return await buildFromSpec(spec);
`

const out = path.join(root, '.tmp/figma-build', `${slug}-slim.js`)
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, code)
console.log(`Wrote ${out} (${code.length} bytes)`)
if (code.length > 50000) {
  console.error('WARNING: exceeds 50k MCP limit')
  process.exit(1)
}
