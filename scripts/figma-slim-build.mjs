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
const fnNames = [
  'cartesianProduct',
  'findVar',
  'bindFill',
  'bindStroke',
  'bindRadius',
  'bindGap',
  'bindText',
  'applyLocalTextStyle',
  'loadInter',
  'variantName',
  'gridLayoutVariants',
  'nextCanvasY',
  'ensurePage',
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
  'createIcon16Instance',
  'buildInputGroupVariant',
  'buildSearchInputVariant',
  'buildDateInputVariant',
  'applyInputShellStateEffects',
  'appendDateSegmentTexts',
  'buildDateRangeInputVariant',
  'createInputGroupIconButton',
  'buildComboboxInputVariant',
  'buildDotStatusVariant',
  'buildAlertDialogVariant',
  'buildDialogVariant',
  'buildDrawerVariant',
  'bindCornerRadius',
  'createInputInstance',
  'appendDialogCloseButton',
  'createMenuIcon16',
  'createMenuCheckIndicator',
  'buildComboboxItemVariant',
]

const chunks = []
for (const name of fnNames) {
  const re = new RegExp(
    `(?:async )?function ${name}\\([^)]*\\)[\\s\\S]*?(?=\\n(?:async )?function |\\nconst [A-Z_]|$)`,
  )
  const m = runtime.match(re)
  if (m) chunks.push(m[0].trim())
}

const code = `${chunks.join('\n\n')}

const spec = ${JSON.stringify({ pageName: 'UDS Components', ...spec }, null, 2)};
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
