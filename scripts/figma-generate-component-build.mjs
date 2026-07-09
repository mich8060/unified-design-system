#!/usr/bin/env node
/**
 * Generate a use_figma plugin script for one component slug.
 *
 *   node scripts/figma-generate-component-build.mjs badge
 *   node scripts/figma-generate-component-build.mjs badge --write
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const specsPath = path.join(root, 'scripts/figma-component-build-specs.json')
const runtimePath = path.join(root, 'scripts/figma-build-runtime.js')

const slug = process.argv[2]
const write = process.argv.includes('--write')
const minimal = process.argv.includes('--minimal')
const patch = process.argv.includes('--patch')
if (!slug) {
  console.error(
    'Usage: node scripts/figma-generate-component-build.mjs <slug> [--write] [--minimal] [--patch]',
  )
  process.exit(1)
}

const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'))
const spec = specs[slug]
if (!spec) {
  console.error(`No build spec for slug "${slug}". Add to scripts/figma-component-build-specs.json`)
  process.exit(1)
}

const KIND_BY_SLUG = {
  badge: 'badge',
  input: 'input',
  checkbox: 'checkbox',
  switch: 'switch',
  skeleton: 'skeleton',
  spinner: 'spinner',
  label: 'label',
  'dot-status': 'dot-status',
  avatar: 'avatar',
  toggle: 'toggle',
  'radio-group': 'radio',
  textarea: 'textarea',
  progress: 'progress',
  slider: 'slider',
  separator: 'separator',
  kbd: 'kbd',
  link: 'link',
  footer: 'footer',
  text: 'text',
  status: 'status',
  alert: 'alert',
  card: 'card',
  tabs: 'tabs',
  field: 'field',
  'check-list': 'check-list',
  collapsible: 'collapsible',
  empty: 'empty',
  medallion: 'medallion',
  'medallion-layout': 'medallion',
  'alert-dialog': 'alert-dialog',
  'dialog': 'dialog',
  'drawer': 'drawer',
  'dropdown-menu': 'dropdown-menu',
  branding: 'branding',
  menu: 'menu',
  'menu-nav-parent': 'menu-nav-parent',
  'menu-nav-child': 'menu-nav-child',
}

const BRANDING_SVG_FILES = {
  Wireframe: {
    wordmark: 'wireframe-wordmark.svg',
    mark: 'wireframe-brand-mark.svg',
  },
  Connect: {
    wordmark: 'connect-wordmark.svg',
    mark: 'connect-brand-mark.svg',
  },
  CHG: {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
  Locumsmart: {
    wordmark: 'locumsmart-wordmark.svg',
    mark: 'locumsmart-brand-mark.svg',
  },
  Modio: { wordmark: 'modio-wordmark.svg', mark: 'modio-brand-mark.svg' },
  MyWeatherby: {
    wordmark: 'weatherby-wordmark.svg',
    mark: 'weatherby-brand-mark.svg',
  },
  MyCompHealth: {
    wordmark: 'comphealth-wordmark.svg',
    mark: 'comphealth-brand-mark.svg',
  },
  'Design System': {
    wordmark: 'unified-design-system-wordmark.svg',
    mark: 'unified-design-system-brand-mark.svg',
  },
}

function loadBrandingSvgs() {
  const dir = path.join(root, 'public/branding/svg')
  const out = {}
  for (const [appearance, files] of Object.entries(BRANDING_SVG_FILES)) {
    out[appearance] = {
      wordmark: fs.readFileSync(path.join(dir, files.wordmark), 'utf8'),
      mark: fs.readFileSync(path.join(dir, files.mark), 'utf8'),
    }
  }
  return out
}

const fullSpec = {
  pageName: 'UDS Components',
  kind: spec.kind ?? KIND_BY_SLUG[slug] ?? 'placeholder',
  gridCols: spec.gridCols,
  gridCellW: spec.gridCellW,
  gridCellH: spec.gridCellH,
  ...spec,
}

const INPUT_STROKES = {
  Default: 'uds/border/secondary',
  Focused: 'uds/color/primary/700',
  Error: 'uds/button/border/primary/destructive',
  Disabled: 'uds/border/disabled',
}
if (slug === 'input') fullSpec.strokeByState = INPUT_STROKES
if (slug === 'textarea') fullSpec.strokeByState = INPUT_STROKES

if (slug === 'menu') {
  const navData = JSON.parse(
    fs.readFileSync(path.join(root, 'scripts/figma-menu-nav-data.json'), 'utf8'),
  )
  fullSpec.brandToAppearance = navData.brandToAppearance
  fullSpec.navigationByBrand = navData.navigationByBrand
}

const runtime = fs.readFileSync(runtimePath, 'utf8')
const brandingSvgsBlock =
  slug === 'branding'
    ? `\nconst BRANDING_SVGS = ${JSON.stringify(loadBrandingSvgs())};\n`
    : ''

function extractFunction(name) {
  const m = runtime.match(
    new RegExp(
      `(?:async )?function ${name}\\([^)]*\\)[\\s\\S]*?(?=\\n(?:async )?function |\\nconst [A-Z_]|$)`,
    ),
  )
  if (!m) throw new Error(`Missing runtime function: ${name}`)
  return m[0].trim()
}

function atomVariantBuildTail(builderFn) {
  return `
const spec = ${JSON.stringify(fullSpec, null, 2)};
const page = await ensurePage(spec.pageName ?? 'UDS Components');
const existing = page.findOne((n) => n.type === 'COMPONENT_SET' && n.name === spec.figmaName);
if (existing) existing.remove();
await loadInter();
const axisNames = Object.keys(spec.axes);
const axisValues = axisNames.map((k) => spec.axes[k]);
const combinations = cartesianProduct(axisValues);
const components = [];
for (const combo of combinations) {
  const comp = figma.createComponent();
  comp.name = variantName(axisNames, combo);
  const axis = Object.fromEntries(axisNames.map((k, i) => [k, combo[i]]));
  await ${builderFn}(comp, spec, axis);
  page.appendChild(comp);
  components.push(comp);
}
const set = figma.combineAsVariants(components, page);
set.name = spec.figmaName;
set.x = 100;
set.y = nextCanvasY(page);
gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);
return { nodeId: set.id, name: set.name, variantCount: set.children.length, samples: set.children.slice(0, 5).map((c) => c.name) };
`.trim()
}

function medallionMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindRadius',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'medallionColorSlug',
    'medallionTokenPath',
    'resolveMedallionTokens',
    'buildMedallionVariant',
  ]
  const consts = runtime.match(/const MEDALLION_PASTEL_FG_1000[\s\S]*?^}/m)?.[0] ?? ''
  const sizePx = runtime.match(/const MEDALLION_SIZE_PX[\s\S]*?^}/m)?.[0] ?? ''
  return [consts, sizePx, ...fnNames.map(extractFunction), atomVariantBuildTail('buildMedallionVariant')]
    .filter(Boolean)
    .join('\n\n')
}

function radioMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindRadius',
    'bindStroke',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'buildRadioVariant',
  ]
  return [...fnNames.map(extractFunction), atomVariantBuildTail('buildRadioVariant')].join('\n\n')
}

function switchMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindRadius',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'buildSwitchVariant',
  ]
  return [...fnNames.map(extractFunction), atomVariantBuildTail('buildSwitchVariant')].join('\n\n')
}

function fieldMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindGap',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'createInputInstance',
    'buildFieldVariant',
  ]
  return [...fnNames.map(extractFunction), atomVariantBuildTail('buildFieldVariant')].join('\n\n')
}

function fileUploadMinimalCode() {
  const constBlocks = [
    runtime.match(/const GLYPH_COMPONENT_CACHE = \{\}/m)?.[0],
    runtime.match(/const FILE_UPLOAD_MEDALLION_SIZE[\s\S]*?^}/m)?.[0],
    runtime.match(/const FILE_UPLOAD_COPY[\s\S]*?^}/m)?.[0],
    extractFunction('importGlyphComponent'),
  ].filter(Boolean)
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindRadius',
    'bindGap',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'medallionVariantName',
    'createMedallionInstance',
    'bindDashedStroke',
    'swapMedallionGlyph',
    'createUploadMedallionInstance',
    'buildFileUploadVariant',
  ]
  return [...constBlocks, ...fnNames.map(extractFunction), atomVariantBuildTail('buildFileUploadVariant')]
    .filter(Boolean)
    .join('\n\n')
}

function fileUploadCardsMinimalCode() {
  const constBlocks = [
    runtime.match(/const GLYPH_COMPONENT_CACHE = \{\}/m)?.[0],
    runtime.match(/const FILE_UPLOAD_MEDALLION_SIZE[\s\S]*?^}/m)?.[0],
    runtime.match(/const FILE_UPLOAD_COPY[\s\S]*?^}/m)?.[0],
    extractFunction('importGlyphComponent'),
  ].filter(Boolean)
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindRadius',
    'bindGap',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'createIcon16Instance',
    'medallionVariantName',
    'createMedallionInstance',
    'bindDashedStroke',
    'swapMedallionGlyph',
    'createUploadMedallionInstance',
    'createBadgeInstance',
    'createFileUploadInstance',
    'fileUploadStatusBadge',
    'createFileActionButton',
    'appendFileUploadCard',
    'buildFileUploadCardsVariant',
  ]
  return [
    ...constBlocks,
    ...fnNames.map(extractFunction),
    atomVariantBuildTail('buildFileUploadCardsVariant'),
  ]
    .filter(Boolean)
    .join('\n\n')
}

function menuNavSharedConsts() {
  return [
    runtime.match(/const GLYPH_COMPONENT_CACHE = \{\}/m)?.[0],
    extractFunction('importGlyphComponent'),
  ].filter(Boolean)
}

function menuNavParentMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindRadius',
    'bindGap',
    'bindPaddingAxis',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'bindIconFill',
    'createMenuGlyph',
    'createMenuDefaultIconInstance',
    'findComponentPropertyId',
    'ensureTextComponentProperty',
    'ensureSlotComponentProperty',
    'getMenuNavPartComponent',
    'instantiateMenuNavPart',
    'setMenuNavInstanceLabel',
    'findMenuNavParentLabelLayer',
    'linkMenuNavParentProperties',
    'buildMenuNavParentExpandedRow',
    'buildMenuNavParentVariant',
  ]
  const tail = atomVariantBuildTail('buildMenuNavParentVariant').replace(
    'gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);',
    `gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);
linkMenuNavParentProperties(set, spec);`,
  )
  return [...menuNavSharedConsts(), ...fnNames.map(extractFunction), tail]
    .filter(Boolean)
    .join('\n\n')
}

function menuNavParentPatchCode() {
  const fnNames = [
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindRadius',
    'bindGap',
    'bindPaddingAxis',
    'loadInter',
    'applyLocalTextStyle',
    'bindIconFill',
    'createMenuGlyph',
    'createMenuDefaultIconInstance',
    'variantName',
    'gridLayoutVariants',
    'ensurePage',
    'findComponentPropertyId',
    'ensureTextComponentProperty',
    'ensureSlotComponentProperty',
    'getMenuNavPartComponent',
    'instantiateMenuNavPart',
    'setMenuNavInstanceLabel',
    'findMenuNavParentLabelLayer',
    'linkMenuNavParentProperties',
    'buildMenuNavParentExpandedRow',
    'buildMenuNavParentVariant',
  ]
  return `${menuNavSharedConsts().join('\n\n')}

${fnNames.map(extractFunction).join('\n\n')}

const spec = ${JSON.stringify(fullSpec, null, 2)};

const MENU_NAV_PARENT_SET_ID = '2369:6204';

function parseMenuNavParentVariantAxis(name) {
  const axis = {};
  for (const part of String(name).split(', ')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    axis[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return axis;
}

async function patchMenuNavParentInPlace() {
  await ensurePage('UDS Components');
  const set = await figma.getNodeByIdAsync(MENU_NAV_PARENT_SET_ID);
  if (!set || set.type !== 'COMPONENT_SET') {
    throw new Error('Menu nav parent set not found: ' + MENU_NAV_PARENT_SET_ID);
  }
  await loadInter();
  let patched = 0;
  for (const variant of set.children) {
    if (variant.type !== 'COMPONENT') continue;
    const axis = parseMenuNavParentVariantAxis(variant.name);
    while (variant.children.length > 0) variant.children[0].remove();
    await buildMenuNavParentVariant(variant, spec, axis);
    patched += 1;
  }
  gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 300, spec.gridCellH ?? 140);
  linkMenuNavParentProperties(set, spec);
  return { nodeId: set.id, name: set.name, patched, variantCount: set.children.length };
}

return await patchMenuNavParentInPlace();`
}

function menuNavChildMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindPaddingAxis',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'buildMenuNavChildVariant',
    'linkTextComponentProperty',
  ]
  const tail = atomVariantBuildTail('buildMenuNavChildVariant').replace(
    'gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);',
    `gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);
linkTextComponentProperty(set, { propertyName: 'label', layerName: 'Label', defaultValue: spec.copy?.label ?? 'Open requisitions' });`,
  )
  return [...fnNames.map(extractFunction), tail].filter(Boolean).join('\n\n')
}

function menuCoreCode() {
  const constBlocks = [
    runtime.match(/const GLYPH_COMPONENT_CACHE = \{\}/m)?.[0],
    runtime.match(/const MENU_BRAND_AXIS_TO_EXTENSION = \{[\s\S]*?\n\}/m)?.[0],
    'const MENU_WORDMARK_CLIP = { width: 140, height: 56 }',
    'const MENU_TOGGLE_SIZE = { width: 20, height: 44 }',
    'const MENU_MARK_CLIP = { width: 36, height: 36 }',
    runtime.match(/let menuBrandExtensionCache = null/m)?.[0],
    extractFunction('importGlyphComponent'),
    extractFunction('menuBranchSubtreeActive'),
    extractFunction('instantiateMenuNavPart'),
    extractFunction('getMenuNavPartComponent'),
    extractFunction('setMenuNavInstanceLabel'),
    extractFunction('createMenuDefaultIconInstance'),
    extractFunction('findMenuNavParentIconSlot'),
    extractFunction('swapMenuNavParentIcon'),
    extractFunction('configureMenuNavParentBranchChildren'),
  ].filter(Boolean)
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindRadius',
    'bindGap',
    'bindPaddingAxis',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'createBrandingInstance',
    'getMenuBrandExtensionCollection',
    'applyMenuBrandVariableMode',
    'fitMenuBrandingInstance',
    'bindIconFill',
    'createMenuGlyph',
    'createMenuToggleButton',
    'appendMenuNavLeaf',
    'appendMenuNavBranch',
    'appendMenuNavRow',
    'appendMenuNavCollapsed',
    'appendMenuHeader',
    'appendMenuNavigation',
    'buildMenuVariant',
  ]
  return [...constBlocks, ...fnNames.map(extractFunction)].filter(Boolean).join('\n\n')
}

function menuMinimalCode() {
  return [menuCoreCode(), atomVariantBuildTail('buildMenuVariant')].filter(Boolean).join('\n\n')
}

function menuNavChildPatchCode() {
  const fnNames = [
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindPaddingAxis',
    'loadInter',
    'applyLocalTextStyle',
    'gridLayoutVariants',
    'buildMenuNavChildVariant',
    'linkTextComponentProperty',
  ]
  return `${fnNames.map(extractFunction).join('\n\n')}

const spec = ${JSON.stringify(fullSpec, null, 2)};

const MENU_NAV_CHILD_SET_ID = '2369:6219';

function parseMenuNavChildVariantAxis(name) {
  const axis = {};
  for (const part of String(name).split(', ')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    axis[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return axis;
}

async function patchMenuNavChildInPlace() {
  const set = await figma.getNodeByIdAsync(MENU_NAV_CHILD_SET_ID);
  if (!set || set.type !== 'COMPONENT_SET') {
    throw new Error('Menu nav child set not found: ' + MENU_NAV_CHILD_SET_ID);
  }
  await loadInter();
  let patched = 0;
  for (const variant of set.children) {
    if (variant.type !== 'COMPONENT') continue;
    const axis = parseMenuNavChildVariantAxis(variant.name);
    while (variant.children.length > 0) variant.children[0].remove();
    await buildMenuNavChildVariant(variant, spec, axis);
    patched += 1;
  }
  gridLayoutVariants(set, spec.gridCols ?? 2, spec.gridCellW ?? 300, spec.gridCellH ?? 56);
  linkTextComponentProperty(set, {
    propertyName: 'label',
    layerName: 'Label',
    defaultValue: spec.copy?.label ?? 'Open requisitions',
  });
  return { nodeId: set.id, name: set.name, patched, variantCount: set.children.length };
}

return await patchMenuNavChildInPlace();`
}

function menuPatchCode() {
  return `${menuCoreCode()}

const spec = ${JSON.stringify(fullSpec, null, 2)};

const MENU_SET_ID = '1895:6336';

function parseMenuVariantAxis(name) {
  const axis = {};
  for (const part of String(name).split(', ')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    axis[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return axis;
}

async function patchMenuInPlace() {
  const set = await figma.getNodeByIdAsync(MENU_SET_ID);
  if (!set || set.type !== 'COMPONENT_SET') {
    throw new Error('Menu component set not found: ' + MENU_SET_ID);
  }
  await loadInter();
  let patched = 0;
  for (const variant of set.children) {
    if (variant.type !== 'COMPONENT') continue;
    const axis = parseMenuVariantAxis(variant.name);
    while (variant.children.length > 0) variant.children[0].remove();
    await buildMenuVariant(variant, spec, axis);
    patched += 1;
  }
  return { nodeId: set.id, name: set.name, patched, variantCount: set.children.length };
}

return await patchMenuInPlace();`
}

function footerMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindGap',
    'bindPaddingAxis',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'findComponentPropertyId',
    'ensureTextComponentProperty',
    'linkInstanceComponentProperty',
    'linkFooterTextProperties',
    'buildFooterVariant',
  ]
  const tail = atomVariantBuildTail('buildFooterVariant').replace(
    'gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);',
    `gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);
linkFooterTextProperties(set, spec);`,
  )
  return [...fnNames.map(extractFunction), tail].filter(Boolean).join('\n\n')
}

function timeInputMinimalCode() {
  const constBlocks = [
    runtime.match(/const GLYPH_COMPONENT_CACHE = \{\}/m)?.[0],
    extractFunction('importGlyphComponent'),
  ].filter(Boolean)
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindRadius',
    'bindGap',
    'bindPaddingAxis',
    'bindText',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'applyLocalEffectStyle',
    'linkTextComponentProperty',
    'resolveGlyphComponentId',
    'createIconInstance',
    'createIcon16Instance',
    'createInputGroupIconButton',
    'createInputGroupAddonFrame',
    'applyInputGroupShell',
    'createMeridiemLabel',
    'createTimezoneLabel',
    'buildTimeInputVariant',
    'linkTimeInputProperties',
  ]
  const tail = atomVariantBuildTail('buildTimeInputVariant').replace(
    'gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);',
    `gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 480, spec.gridCellH ?? 64);
linkTimeInputProperties(set, spec);`,
  )
  return [...constBlocks, ...fnNames.map(extractFunction), tail].filter(Boolean).join('\n\n')
}

function headerMinimalCode() {
  const fnNames = [
    'cartesianProduct',
    'findVar',
    'bindFill',
    'bindStroke',
    'bindStrokeWeight',
    'bindGap',
    'bindPaddingAxis',
    'bindRadius',
    'bindText',
    'loadInter',
    'variantName',
    'gridLayoutVariants',
    'nextCanvasY',
    'ensurePage',
    'applyLocalTextStyle',
    'findComponentPropertyId',
    'ensureTextComponentProperty',
    'linkInstanceComponentProperty',
    'importGlyphComponent',
    'bindIconFill',
    'createMenuGlyph',
    'createSearchInputInstance',
    'applyInputGroupShell',
    'createInputGroupAddonFrame',
    'createInputGroupControlFrame',
    'createKbdShortcutFrame',
    'createHeaderGlyph',
    'createHeaderIconButton',
    'createHeaderAccountButton',
    'appendHeaderTrailingDefaults',
    'applyInlineHeaderSearchField',
    'linkHeaderProperties',
    'buildHeaderVariant',
  ]
  const tail = atomVariantBuildTail('buildHeaderVariant').replace(
    'gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);',
    `gridLayoutVariants(set, spec.gridCols ?? 4, spec.gridCellW ?? 48, spec.gridCellH ?? 48);
linkHeaderProperties(set, spec);`,
  )
  const glyphCache = 'const GLYPH_COMPONENT_CACHE = {}'
  return [glyphCache, ...fnNames.map(extractFunction), tail].filter(Boolean).join('\n\n')
}

const MINIMAL_BUILDERS = {
  medallion: medallionMinimalCode,
  'medallion-layout': medallionMinimalCode,
  'radio-group': radioMinimalCode,
  switch: switchMinimalCode,
  field: fieldMinimalCode,
  'file-upload': fileUploadMinimalCode,
  'file-upload-cards': fileUploadCardsMinimalCode,
  menu: menuMinimalCode,
  'menu-nav-parent': menuNavParentMinimalCode,
  'menu-nav-child': menuNavChildMinimalCode,
  footer: footerMinimalCode,
  header: headerMinimalCode,
  'time-input': timeInputMinimalCode,
}

const code =
  patch && slug === 'menu'
    ? menuPatchCode()
    : patch && slug === 'menu-nav-child'
      ? menuNavChildPatchCode()
      : patch && slug === 'menu-nav-parent'
        ? menuNavParentPatchCode()
        : minimal && MINIMAL_BUILDERS[slug]
      ? MINIMAL_BUILDERS[slug]()
      : `
${runtime}
${brandingSvgsBlock}
const spec = ${JSON.stringify(fullSpec, null, 2)};
return await buildFromSpec(spec);
`.trim()

const outDir = path.join(root, '.tmp/figma-build')
const outPath = path.join(
  outDir,
  `${slug}${patch ? '-patch' : minimal ? '-minimal' : ''}.js`,
)
const mcpPath = path.join(
  outDir,
  `${slug}${patch ? '-patch' : minimal ? '-minimal' : ''}-mcp-args.json`,
)
if (write) {
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outPath, code)
  if (minimal || patch) {
    fs.writeFileSync(
      mcpPath,
      JSON.stringify({
        fileKey: '3bTua8rojOOC7tYWIEWJl0',
        description: `Rebuild ${fullSpec.figmaName ?? slug} (${Object.values(fullSpec.axes ?? {}).reduce((a, b) => a * b.length, 1)} variants)`,
        skillNames: 'resource:figma-use,resource:figma-generate-library',
        code,
      }),
    )
    console.error(`Wrote ${outPath} and ${mcpPath}`)
  } else {
    console.error(`Wrote ${outPath}`)
  }
} else {
  process.stdout.write(code)
}
