/**
 * Prints a use_figma script body (no file write) for importing UDS tokens.
 * node scripts/generate-figma-variable-import.mjs system 0 90
 * node scripts/generate-figma-variable-import.mjs system 90 180
 * node scripts/generate-figma-variable-import.mjs brand
 * node scripts/generate-figma-variable-import.mjs layout
 * node scripts/generate-figma-variable-import.mjs semantic-colors 0 120
 * node scripts/generate-figma-variable-import.mjs semantic-floats
 * node scripts/generate-figma-variable-import.mjs semantic-cleanup
 * node scripts/generate-figma-variable-import.mjs semantic-layout-merge
 * node scripts/generate-figma-variable-import.mjs typography-line-height
 * node scripts/generate-figma-variable-import.mjs migrate-responsive-type
 * node scripts/apply-figma-variable-scopes.mjs  (re-apply scopes only; run via use_figma)
 *
 * Variable scopes and collection order: scripts/lib/figma-variable-scopes.snippet.js,
 * scripts/lib/figma-variable-order.mjs (keep aligned with the Figma UDS Tokens file).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FIGMA_SCOPES_SNIPPET } from './lib/figma-variable-scopes.mjs'
import { compareBrandSemanticEntries, compareLayoutEntries, RESPONSIVE_MODE_ORDER } from './lib/figma-variable-order.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(fs.readFileSync(path.join(root, '.tmp/figma-tokens.json'), 'utf8'))

const [, , kind, startArg, endArg] = process.argv
const start = Number(startArg ?? 0)
const defaultEnd =
  kind === 'semantic-colors' || kind === 'brand-semantic'
    ? data.semanticColors.length
    : kind === 'semantic-floats'
      ? data.semanticFloats.length
      : kind === 'typography-line-height'
        ? data.typographyLineHeights.length
        : data.systemColors.length
const end = Number(endArg ?? defaultEnd)

const HELPERS = `
${FIGMA_SCOPES_SNIPPET}
function parseColor(input) {
  const hex = input.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (h.length === 6) {
      return {
        r: parseInt(h.slice(0, 2), 16) / 255,
        g: parseInt(h.slice(2, 4), 16) / 255,
        b: parseInt(h.slice(4, 6), 16) / 255,
        a: 1,
      };
    }
    if (h.length === 8) {
      return {
        r: parseInt(h.slice(0, 2), 16) / 255,
        g: parseInt(h.slice(2, 4), 16) / 255,
        b: parseInt(h.slice(4, 6), 16) / 255,
        a: parseInt(h.slice(6, 8), 16) / 255,
      };
    }
  }
  const rgba = input.match(/rgba?\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)/i);
  if (rgba) {
    return {
      r: Number(rgba[1]) / 255,
      g: Number(rgba[2]) / 255,
      b: Number(rgba[3]) / 255,
      a: rgba[4] != null ? Number(rgba[4]) : 1,
    };
  }
  return null;
}

function tokenPath(cssName) {
  return cssName.replace(/^--/, '').replace(/-/g, '/');
}

async function findCollection(name) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  return all.find((c) => c.name === name) ?? null;
}

async function ensurePage(name) {
  let page = figma.root.children.find((p) => p.type === 'PAGE' && p.name === name);
  if (!page) {
    page = figma.createPage();
    page.name = name;
  }
  await figma.setCurrentPageAsync(page);
  return page;
}

async function ensureColorCollection(name, modeNames) {
  let coll = await findCollection(name);
  const modeIds = {};
  if (!coll) {
    coll = figma.variables.createVariableCollection(name);
    coll.renameMode(coll.modes[0].modeId, modeNames[0]);
    modeIds[modeNames[0]] = coll.modes[0].modeId;
    for (let i = 1; i < modeNames.length; i++) {
      modeIds[modeNames[i]] = coll.addMode(modeNames[i]);
    }
    if (typeof coll.setSharedPluginData === 'function') {
      coll.setSharedPluginData('uds', 'collection', name);
    }
  } else {
    for (const m of coll.modes) modeIds[m.name] = m.modeId;
  }
  return { coll, modeIds };
}

async function upsertColorVar(coll, modeId, cssName, hex) {
  const name = tokenPath(cssName);
  const color = parseColor(hex);
  if (!color) return null;
  const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', coll.name);
  v.setValueForMode(modeId, color);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  return v.id;
}

async function upsertFloatVar(coll, modeId, cssName, pxValue) {
  const name = tokenPath(cssName);
  const num = parseFloat(String(pxValue).replace('px', ''));
  if (!Number.isFinite(num)) return null;
  const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeId, num);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  return v.id;
}
`

function emitSystem() {
  const slice = data.systemColors.slice(start, end)
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const { coll, modeIds } = await ensureColorCollection('Colors', ['Value']);
const modeId = modeIds.Value;
const entries = ${JSON.stringify(slice)};
const created = [];
for (const [cssName, hex] of entries) {
  const id = await upsertColorVar(coll, modeId, cssName, hex);
  if (id) created.push(id);
}
return { pageId: PAGE.id, collectionId: coll.id, createdCount: created.length, range: [${start}, ${end}] };
`
}

function emitBrand() {
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const modes = ${JSON.stringify(data.brand.modes)};
const { coll, modeIds } = await ensureColorCollection('Brand', modes);
const byMode = ${JSON.stringify(data.brand.byMode)};
const created = [];
for (const mode of modes) {
  const modeId = modeIds[mode];
  const vars = byMode[mode] || {};
  for (const [cssName, hex] of Object.entries(vars)) {
    const id = await upsertColorVar(coll, modeId, cssName, hex);
    if (id) created.push(id);
  }
}
return { pageId: PAGE.id, collectionId: coll.id, createdCount: created.length, modes };
`
}

function emitBrandExtend() {
  const byMode = data.brand.byMode
  const baseMode = byMode.default ? 'default' : data.brand.modes[0]
  const brandLabels = {
    chg: 'CHG',
    careermd: 'CareerMD',
    comphealth: 'CompHealth',
    connect: 'Connect',
    gms: 'GMS',
    locumsmart: 'LocumSmart',
    modio: 'Modio',
    weatherby: 'Weatherby',
    wireframe: 'Wireframe',
  }
  const extendOrder = data.brand.modes.filter((m) => m !== baseMode)
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const BYMODE = ${JSON.stringify(byMode)};
const BASE_MODE = ${JSON.stringify(baseMode)};
const LABELS = ${JSON.stringify(brandLabels)};
const EXTEND_ORDER = ${JSON.stringify(extendOrder)};
const BRAND_SCOPES = ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];

let base = await findCollection('Brand');
if (!base) base = await findCollection('Default Brand');
if (!base) {
  base = figma.variables.createVariableCollection('Brand');
  base.renameMode(base.modes[0].modeId, BASE_MODE);
}
if (base.name !== 'Brand') base.name = 'Brand';

// Remove any previously-created extended collections under Brand (idempotent re-run).
const allColls = await figma.variables.getLocalVariableCollectionsAsync();
const removedExtended = [];
for (const c of allColls) {
  if (c.isExtension && c.parentVariableCollectionId === base.id) {
    removedExtended.push(c.name);
    c.remove();
  }
}

// Reduce base to a single BASE_MODE mode.
let baseModeId = base.modes.find((m) => m.name === BASE_MODE)?.modeId ?? base.modes[0].modeId;
for (const m of base.modes) {
  if (m.modeId !== baseModeId) base.removeMode(m.modeId);
}
base.renameMode(baseModeId, BASE_MODE);

// Ensure base variables exist and hold the default brand values.
const byName = new Map();
for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) {
  if (v.variableCollectionId === base.id) byName.set(v.name, v);
}
const baseVars = BYMODE[BASE_MODE] || {};
for (const [cssName, hex] of Object.entries(baseVars)) {
  const name = tokenPath(cssName);
  let v = byName.get(name);
  if (!v) {
    v = figma.variables.createVariable(name, base, 'COLOR');
    byName.set(name, v);
  }
  v.scopes = BRAND_SCOPES;
  const color = parseColor(hex);
  if (color) v.setValueForMode(baseModeId, color);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
}

// Create one extended collection per non-default brand and override values.
const createdExtended = [];
for (const brand of EXTEND_ORDER) {
  const label = LABELS[brand] || brand;
  const ext = base.extend(label);
  const extModeId = ext.modes[0].modeId;
  const vars = BYMODE[brand] || {};
  let overrides = 0;
  for (const [cssName, hex] of Object.entries(vars)) {
    const name = tokenPath(cssName);
    const v = byName.get(name);
    if (!v) continue;
    const color = parseColor(hex);
    if (!color) continue;
    v.setValueForMode(extModeId, color);
    overrides++;
  }
  createdExtended.push({ name: ext.name, brand, overrides });
}

return {
  pageId: PAGE.id,
  baseCollectionId: base.id,
  baseMode: BASE_MODE,
  baseVarCount: byName.size,
  removedExtended,
  createdExtended,
};
`
}

const BRAND_LABELS = {
  chg: 'CHG',
  careermd: 'CareerMD',
  comphealth: 'CompHealth',
  connect: 'Connect',
  gms: 'GMS',
  locumsmart: 'LocumSmart',
  modio: 'Modio',
  weatherby: 'Weatherby',
  wireframe: 'Wireframe',
}

function emitBrandLightDark() {
  const byMode = data.brand.byMode
  const baseBrand = byMode.default ? 'default' : data.brand.modes[0]
  const extendOrder = data.brand.modes.filter((m) => m !== baseBrand)
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const BYMODE = ${JSON.stringify(byMode)};
const BASE_BRAND = ${JSON.stringify(baseBrand)};
const LABELS = ${JSON.stringify(BRAND_LABELS)};
const EXTEND_ORDER = ${JSON.stringify(extendOrder)};
const BRAND_SCOPES = ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];

let base = await findCollection('Brand');
if (!base) base = await findCollection('Default Brand');
if (!base) base = figma.variables.createVariableCollection('Brand');
if (base.name !== 'Brand') base.name = 'Brand';

// Remove existing extensions (idempotent).
const allColls = await figma.variables.getLocalVariableCollectionsAsync();
const removedExtended = [];
for (const c of allColls) {
  if (c.isExtension && c.parentVariableCollectionId === base.id) {
    removedExtended.push(c.name);
    c.remove();
  }
}

// Ensure base modes are exactly Light, Dark.
let lightId = base.modes.find((m) => m.name === 'Light')?.modeId ?? base.modes[0].modeId;
base.renameMode(lightId, 'Light');
let darkId = base.modes.find((m) => m.name === 'Dark')?.modeId;
if (!darkId) darkId = base.addMode('Dark');
for (const m of base.modes) {
  if (m.modeId !== lightId && m.modeId !== darkId) base.removeMode(m.modeId);
}

// Base brand ramp (default brand). Ramp is theme-independent: same value in Light and Dark.
// The Light/Dark inversion happens at the semantic layer (uds/color/*), not the ramp.
const byName = new Map();
for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) {
  if (v.variableCollectionId === base.id && v.name.startsWith('brand/')) byName.set(v.name, v);
}
const baseLight = BYMODE[BASE_BRAND];
for (const [cssName, hex] of Object.entries(baseLight)) {
  const name = tokenPath(cssName);
  let v = byName.get(name);
  if (!v) {
    v = figma.variables.createVariable(name, base, 'COLOR');
    byName.set(name, v);
  }
  v.scopes = BRAND_SCOPES;
  const c = parseColor(hex);
  if (c) {
    v.setValueForMode(lightId, c);
    v.setValueForMode(darkId, c);
  }
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
}

// Extensions: override brand ramp per brand (same value in Light and Dark).
const createdExtended = [];
for (const brand of EXTEND_ORDER) {
  const label = LABELS[brand] || brand;
  const ext = base.extend(label);
  const extLight = ext.modes.find((m) => m.name === 'Light')?.modeId ?? ext.modes[0].modeId;
  const extDark = ext.modes.find((m) => m.name === 'Dark')?.modeId;
  const vars = BYMODE[brand] || {};
  let overrides = 0;
  for (const [cssName, hex] of Object.entries(vars)) {
    const v = byName.get(tokenPath(cssName));
    if (!v) continue;
    const c = parseColor(hex);
    if (!c) continue;
    v.setValueForMode(extLight, c);
    if (extDark) v.setValueForMode(extDark, c);
    overrides++;
  }
  createdExtended.push({ name: ext.name, brand, overrides });
}

return {
  pageId: PAGE.id,
  baseCollectionId: base.id,
  modes: base.modes.map((m) => m.name),
  baseBrandVarCount: byName.size,
  removedExtended,
  createdExtended,
};
`
}

function emitBrandSemantic() {
  const slice = data.semanticColors.slice(start, end).sort(compareBrandSemanticEntries)
  const wipeFirst = start === 0
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const SYSTEM_COLLECTION = 'Colors';

function setColorModeValue(v, modeId, systemVar, hexFallback) {
  if (systemVar) {
    v.setValueForMode(modeId, figma.variables.createVariableAlias(systemVar));
    return 'alias';
  }
  const color = parseColor(hexFallback);
  if (!color) return null;
  v.setValueForMode(modeId, color);
  return 'hex';
}

const base = await findCollection('Brand');
if (!base) throw new Error('Brand collection not found - run brand-ld first');
const lightId = base.modes.find((m) => m.name === 'Light')?.modeId;
const darkId = base.modes.find((m) => m.name === 'Dark')?.modeId;
if (!lightId || !darkId) throw new Error('Brand collection missing Light/Dark modes');

const systemColl = await findCollection(SYSTEM_COLLECTION);
const systemVarByPath = new Map();
if (systemColl) {
  for (const sv of await figma.variables.getLocalVariablesAsync('COLOR')) {
    if (sv.variableCollectionId === systemColl.id) systemVarByPath.set(sv.name, sv);
  }
}

// Brand ramp variables live in the same Brand collection. Aliasing semantic
// tokens to these makes them resolve per-brand automatically in each extension.
const brandVarByPath = new Map();
for (const bv of await figma.variables.getLocalVariablesAsync('COLOR')) {
  if (bv.variableCollectionId === base.id && bv.name.startsWith('brand/')) {
    brandVarByPath.set(bv.name, bv);
  }
}

let removedSemantic = 0;
if (${wipeFirst}) {
  for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) {
    if (v.variableCollectionId === base.id && v.name.startsWith('uds/')) {
      v.remove();
      removedSemantic++;
    }
  }
}

const entries = ${JSON.stringify(slice)};
const created = [];
let aliasSystem = 0;
let aliasBrand = 0;
let hexFallback = 0;
function pickTarget(systemRef, brandRef) {
  if (systemRef) return ['system', systemVarByPath.get(tokenPath(systemRef))];
  if (brandRef) return ['brand', brandVarByPath.get(tokenPath(brandRef))];
  return [null, null];
}
for (const [cssName, lightSystemRef, darkSystemRef, lightBrandRef, darkBrandRef, lightHex, darkHex] of entries) {
  const name = tokenPath(cssName);
  const [lightKind, lightTarget] = pickTarget(lightSystemRef, lightBrandRef);
  const [darkKind, darkTarget] = pickTarget(darkSystemRef, darkBrandRef);
  const v = figma.variables.createVariable(name, base, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', base.name);
  const rLight = setColorModeValue(v, lightId, lightTarget, lightHex);
  const rDark = setColorModeValue(v, darkId, darkTarget, darkHex);
  if (!rLight || !rDark) {
    v.remove();
    continue;
  }
  if (rLight === 'alias') (lightKind === 'brand' ? aliasBrand++ : aliasSystem++);
  else hexFallback++;
  if (rDark === 'alias') (darkKind === 'brand' ? aliasBrand++ : aliasSystem++);
  else hexFallback++;
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  created.push(name);
}

return {
  pageId: PAGE.id,
  baseCollectionId: base.id,
  removedSemantic,
  createdCount: created.length,
  aliasSystem,
  aliasBrand,
  hexFallbackModes: hexFallback,
  range: [${start}, ${end}],
};
`
}

function emitButtonTokens() {
  const tokens = data.buttonTokens || []
  const overrides = data.buttonOverrides || {}
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const LABELS = ${JSON.stringify(BRAND_LABELS)};
const TOKENS = ${JSON.stringify(tokens)};
const OVERRIDES = ${JSON.stringify(overrides)};

function setColorModeValue(v, modeId, targetVar, hexFallback) {
  if (targetVar) {
    v.setValueForMode(modeId, figma.variables.createVariableAlias(targetVar));
    return 'alias';
  }
  const color = parseColor(hexFallback);
  if (!color) return null;
  v.setValueForMode(modeId, color);
  return 'hex';
}

const base = await findCollection('Brand');
if (!base) throw new Error('Brand collection not found - run brand-ld first');
const lightId = base.modes.find((m) => m.name === 'Light')?.modeId;
const darkId = base.modes.find((m) => m.name === 'Dark')?.modeId;
if (!lightId || !darkId) throw new Error('Brand collection missing Light/Dark modes');

// Targets: system colors live in 'Colors'; brand ramp lives in 'Brand' (base).
const systemColl = await findCollection('Colors');
const systemVarByPath = new Map();
const brandVarByPath = new Map();
for (const sv of await figma.variables.getLocalVariablesAsync('COLOR')) {
  if (systemColl && sv.variableCollectionId === systemColl.id) systemVarByPath.set(sv.name, sv);
  else if (sv.variableCollectionId === base.id && sv.name.startsWith('brand/')) brandVarByPath.set(sv.name, sv);
}

// Idempotent: remove existing button vars before recreating.
let removed = 0;
for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) {
  if (v.variableCollectionId === base.id && v.name.startsWith('uds/button/')) { v.remove(); removed++; }
}

function pickTarget(systemRef, brandRef) {
  if (systemRef) return systemVarByPath.get(tokenPath(systemRef));
  if (brandRef) return brandVarByPath.get(tokenPath(brandRef));
  return null;
}

const buttonVarByName = new Map();
let created = 0;
let unresolved = 0;
for (const [cssName, lightSystemRef, darkSystemRef, lightBrandRef, darkBrandRef, lightHex, darkHex] of TOKENS) {
  const name = tokenPath(cssName);
  const v = figma.variables.createVariable(name, base, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', base.name);
  const rl = setColorModeValue(v, lightId, pickTarget(lightSystemRef, lightBrandRef), lightHex);
  const rd = setColorModeValue(v, darkId, pickTarget(darkSystemRef, darkBrandRef), darkHex);
  if (!rl || !rd) { v.remove(); unresolved++; continue; }
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  buttonVarByName.set(name, v);
  created++;
}

// Per-brand extension overrides (fine-grained control beyond ramp inheritance).
const allColls = await figma.variables.getLocalVariableCollectionsAsync();
const extByLabel = new Map();
for (const c of allColls) {
  if (c.isExtension && c.parentVariableCollectionId === base.id) extByLabel.set(c.name, c);
}
const applied = [];
for (const [figmaName, byBrand] of Object.entries(OVERRIDES)) {
  const v = buttonVarByName.get(figmaName);
  if (!v) continue;
  for (const [brandKey, refs] of Object.entries(byBrand)) {
    const label = LABELS[brandKey] || brandKey;
    const ext = extByLabel.get(label);
    if (!ext) continue;
    const extLight = ext.modes.find((m) => m.name === 'Light')?.modeId ?? ext.modes[0].modeId;
    const extDark = ext.modes.find((m) => m.name === 'Dark')?.modeId;
    const lt = refs.light ? brandVarByPath.get(refs.light) : null;
    const dt = refs.dark ? brandVarByPath.get(refs.dark) : null;
    if (lt) v.setValueForMode(extLight, figma.variables.createVariableAlias(lt));
    if (dt && extDark) v.setValueForMode(extDark, figma.variables.createVariableAlias(dt));
    applied.push({ token: figmaName, brand: label });
  }
}

return { pageId: PAGE.id, removed, created, unresolved, overridesApplied: applied.length, applied };
`
}

function emitDeleteSemanticCollection() {
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const coll = await findCollection('Semantic Colors');
if (!coll) return { deleted: false, reason: 'not found' };
let removed = 0;
for (const v of await figma.variables.getLocalVariablesAsync()) {
  if (v.variableCollectionId === coll.id) {
    v.remove();
    removed++;
  }
}
coll.remove();
const remaining = (await figma.variables.getLocalVariableCollectionsAsync()).map((c) => c.name);
return { deleted: true, removedVariables: removed, remaining };
`
}

function emitLayout() {
  const layoutFloats = [
    ...data.spacing,
    ...data.radius,
    ...data.gap,
    ...(data.blur || []),
    ...data.semanticFloats,
    ...data.sizing,
    ...data.elevation,
  ].sort(compareLayoutEntries)
  const font = data.font || { family: null, weights: [] }
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const { coll, modeIds } = await ensureColorCollection('Layout', ['Value']);
const modeId = modeIds.Value;
const floatEntries = ${JSON.stringify(layoutFloats)};
const created = [];
for (const [cssName, px] of floatEntries) {
  const id = await upsertFloatVar(coll, modeId, cssName, px);
  if (id) created.push(id);
}
const family = ${JSON.stringify(font.family)};
const weights = ${JSON.stringify(font.weights)};
if (family) {
  const name = 'uds/font/family';
  const existing = (await figma.variables.getLocalVariablesAsync('STRING')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'STRING');
  v.scopes = scopesForFigmaVariable(name, 'STRING', coll.name);
  v.setValueForMode(modeId, family);
  v.setVariableCodeSyntax('WEB', 'var(--uds-font-family)');
  created.push(name);
}
for (const [cssName, weight] of weights) {
  const name = tokenPath(cssName);
  const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeId, weight);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  created.push(name);
}
return { pageId: PAGE.id, collectionId: coll.id, createdCount: created.length };
`
}

function emitGroupA() {
  const sizing = data.sizing || []
  const elevation = data.elevation || []
  const font = data.font || { family: null, weights: [] }
  const letterSpacing = data.letterSpacing || []
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const result = {};

// 1. Sizing -> Layout (px floats, WIDTH_HEIGHT scope)
{
  const { coll, modeIds } = await ensureColorCollection('Layout', ['Value']);
  const modeId = modeIds.Value;
  const entries = ${JSON.stringify(sizing)};
  let n = 0;
  for (const [cssName, px] of entries) {
    const id = await upsertFloatVar(coll, modeId, cssName, px);
    if (id) n++;
  }
  result.sizing = { collectionId: coll.id, created: n };
}

// 2. Elevation (z-index) -> new Elevation collection (no Figma scope for z-index)
{
  const { coll, modeIds } = await ensureColorCollection('Elevation', ['Value']);
  const modeId = modeIds.Value;
  const entries = ${JSON.stringify(elevation)};
  let n = 0;
  for (const [cssName, num] of entries) {
    const name = tokenPath(cssName);
    const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
      (v) => v.variableCollectionId === coll.id && v.name === name,
    );
    const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
    v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
    v.setValueForMode(modeId, num);
    v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
    n++;
  }
  result.elevation = { collectionId: coll.id, created: n };
}

// 3. Font -> new Font collection (family STRING + weights FLOAT)
{
  const { coll, modeIds } = await ensureColorCollection('Font', ['Value']);
  const modeId = modeIds.Value;
  const family = ${JSON.stringify(font.family)};
  const weights = ${JSON.stringify(font.weights)};
  let n = 0;
  if (family) {
    const name = 'uds/font/family';
    const existing = (await figma.variables.getLocalVariablesAsync('STRING')).find(
      (v) => v.variableCollectionId === coll.id && v.name === name,
    );
    const v = existing ?? figma.variables.createVariable(name, coll, 'STRING');
    v.scopes = scopesForFigmaVariable(name, 'STRING', coll.name);
    v.setValueForMode(modeId, family);
    v.setVariableCodeSyntax('WEB', 'var(--uds-font-family)');
    n++;
  }
  for (const [cssName, weight] of weights) {
    const name = tokenPath(cssName);
    const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
      (v) => v.variableCollectionId === coll.id && v.name === name,
    );
    const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
    v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
    v.setValueForMode(modeId, weight);
    v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
    n++;
  }
  result.font = { collectionId: coll.id, created: n };
}

// 4. Letter spacing per type -> new Letter Spacing collection (FLOAT %, LETTER_SPACING scope)
{
  const { coll, modeIds } = await ensureColorCollection('Letter Spacing', ['Value']);
  const modeId = modeIds.Value;
  const entries = ${JSON.stringify(letterSpacing)};
  let n = 0;
  for (const [cssBase, percent] of entries) {
    const name = tokenPath(cssBase);
    const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
      (v) => v.variableCollectionId === coll.id && v.name === name,
    );
    const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
    v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
    v.setValueForMode(modeId, percent);
    v.setVariableCodeSyntax('WEB', 'var(' + cssBase + '-letter-spacing)');
    n++;
  }
  result.letterSpacing = { collectionId: coll.id, created: n };
}

return { pageId: PAGE.id, ...result };
`
}

function emitSemanticColors() {
  const slice = data.semanticColors.slice(start, end)
  return `${HELPERS}
const SYSTEM_COLLECTION = 'Colors';

function setColorModeValue(v, modeId, systemVar, hexFallback) {
  if (systemVar) {
    v.setValueForMode(modeId, figma.variables.createVariableAlias(systemVar));
    return 'alias';
  }
  const color = parseColor(hexFallback);
  if (!color) return null;
  v.setValueForMode(modeId, color);
  return 'hex';
}

const PAGE = await ensurePage('UDS Tokens');
const systemColl = await findCollection(SYSTEM_COLLECTION);
const systemVarByPath = new Map();
if (systemColl) {
  const systemVars = await figma.variables.getLocalVariablesAsync('COLOR');
  for (const sv of systemVars) {
    if (sv.variableCollectionId === systemColl.id) systemVarByPath.set(sv.name, sv);
  }
}

const { coll, modeIds } = await ensureColorCollection('Semantic Colors', ['Light', 'Dark']);
const lightId = modeIds.Light;
const darkId = modeIds.Dark;
const entries = ${JSON.stringify(slice)};
const created = [];
let aliasLight = 0;
let aliasDark = 0;
let hexFallback = 0;

for (const [cssName, lightSystemRef, darkSystemRef, , , lightHex, darkHex] of entries) {
  const name = tokenPath(cssName);
  const lightTarget = lightSystemRef ? systemVarByPath.get(tokenPath(lightSystemRef)) : null;
  const darkTarget = darkSystemRef ? systemVarByPath.get(tokenPath(darkSystemRef)) : null;
  const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', base.name);
  const rLight = setColorModeValue(v, lightId, lightTarget, lightHex);
  const rDark = setColorModeValue(v, darkId, darkTarget, darkHex);
  if (!rLight || !rDark) continue;
  if (rLight === 'alias') aliasLight++;
  else hexFallback++;
  if (rDark === 'alias') aliasDark++;
  else hexFallback++;
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  created.push(name);
}

return {
  pageId: PAGE.id,
  collectionId: coll.id,
  systemCollectionId: systemColl ? systemColl.id : null,
  createdCount: created.length,
  aliasLight,
  aliasDark,
  hexFallbackModes: hexFallback,
  range: [${start}, ${end}],
};
`
}

function emitSemanticFloats() {
  const slice = data.semanticFloats.slice(start, end)
  return `${HELPERS}
async function upsertSemanticFloatVar(coll, modeId, cssName, pxValue) {
  const name = tokenPath(cssName);
  const num = parseFloat(String(pxValue).replace('px', ''));
  if (!Number.isFinite(num)) return null;
  const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeId, num);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  return v.id;
}

const PAGE = await ensurePage('UDS Tokens');
const { coll, modeIds } = await ensureColorCollection('Layout', ['Value']);
const modeId = modeIds.Value;
const entries = ${JSON.stringify(slice)};
const created = [];
for (const [cssName, px] of entries) {
  const id = await upsertSemanticFloatVar(coll, modeId, cssName, px);
  if (id) created.push(id);
}
return { pageId: PAGE.id, collectionId: coll.id, createdCount: created.length, range: [${start}, ${end}] };
`
}

function emitSemanticCleanup() {
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const removed = [];
const coll = await findCollection('Semantic Layout');
if (coll) {
  const vars = await figma.variables.getLocalVariablesAsync();
  for (const v of vars) {
    if (v.variableCollectionId === coll.id) {
      v.remove();
      removed.push(v.name);
    }
  }
  coll.remove();
}
return { pageId: PAGE.id, removedCollection: 'Semantic Layout', removedVariableCount: removed.length };
`
}

function emitSemanticLayoutMerge() {
  const entries = data.semanticFloats
  return `${HELPERS}
async function upsertLayoutFloatVar(coll, modeId, name, num, cssName) {
  if (!Number.isFinite(num)) return null;
  const existing = (await figma.variables.getLocalVariablesAsync('FLOAT')).find(
    (v) => v.variableCollectionId === coll.id && v.name === name,
  );
  const v = existing ?? figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeId, num);
  if (cssName) v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  return v.id;
}

const PAGE = await ensurePage('UDS Tokens');
const { coll: layoutColl, modeIds } = await ensureColorCollection('Layout', ['Value']);
const valueModeId = modeIds.Value;
const migrated = [];
const semanticColl = await findCollection('Semantic Layout');

if (semanticColl) {
  const semanticModeId = semanticColl.modes[0].modeId;
  const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
  for (const v of vars) {
    if (v.variableCollectionId !== semanticColl.id) continue;
    const raw = v.valuesByMode[semanticModeId];
    const num = typeof raw === 'number' ? raw : null;
    if (num == null) continue;
    const cssName = '--' + v.name.replace(/\\//g, '-');
    const id = await upsertLayoutFloatVar(layoutColl, valueModeId, v.name, num, cssName);
    if (id) migrated.push(v.name);
  }
}

const entries = ${JSON.stringify(entries)};
const created = [];
for (const [cssName, px] of entries) {
  const name = tokenPath(cssName);
  const num = parseFloat(String(px).replace('px', ''));
  const id = await upsertLayoutFloatVar(layoutColl, valueModeId, name, num, cssName);
  if (id) created.push(name);
}

let removedCount = 0;
if (semanticColl) {
  const all = await figma.variables.getLocalVariablesAsync();
  for (const v of all) {
    if (v.variableCollectionId === semanticColl.id) {
      v.remove();
      removedCount++;
    }
  }
  semanticColl.remove();
}

return {
  pageId: PAGE.id,
  layoutCollectionId: layoutColl.id,
  migratedFromSemanticLayout: migrated.length,
  upsertedFromTokens: created.length,
  removedSemanticLayoutVariables: removedCount,
};
`
}

function emitReorderSystemColors() {
  const entries = data.systemColors
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const { coll, modeIds } = await ensureColorCollection('Colors', ['Value']);
const modeId = modeIds.Value;
const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).filter(
  (v) => v.variableCollectionId === coll.id,
);
for (const v of existing) v.remove();
const entries = ${JSON.stringify(entries)};
const created = [];
for (const [cssName, hex] of entries) {
  const id = await upsertColorVar(coll, modeId, cssName, hex);
  if (id) created.push(tokenPath(cssName));
}
return {
  pageId: PAGE.id,
  collectionId: coll.id,
  removedCount: existing.length,
  createdCount: created.length,
};
`
}

function emitReorderBrandColors() {
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const modes = ${JSON.stringify(data.brand.modes)};
const { coll, modeIds } = await ensureColorCollection('Brand', modes);
const byMode = ${JSON.stringify(data.brand.byMode)};
const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).filter(
  (v) => v.variableCollectionId === coll.id,
);
for (const v of existing) v.remove();
const created = [];
for (const mode of modes) {
  const modeId = modeIds[mode];
  const vars = byMode[mode] || {};
  for (const [cssName, hex] of Object.entries(vars)) {
    const id = await upsertColorVar(coll, modeId, cssName, hex);
    if (id) created.push(tokenPath(cssName));
  }
}
return {
  pageId: PAGE.id,
  collectionId: coll.id,
  removedCount: existing.length,
  createdCount: created.length,
  modes,
};
`
}

function emitReorderSemanticColors() {
  const entries = data.semanticColors.slice(start, end).sort(compareBrandSemanticEntries)
  const deleteBlock =
    start === 0
      ? `
const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).filter(
  (v) => v.variableCollectionId === coll.id,
);
for (const v of existing) v.remove();
const removedCount = existing.length;
`
      : 'const removedCount = 0;'

  return `${HELPERS}
const SYSTEM_COLLECTION = 'Colors';

function setColorModeValue(v, modeId, systemVar, hexFallback) {
  if (systemVar) {
    v.setValueForMode(modeId, figma.variables.createVariableAlias(systemVar));
    return 'alias';
  }
  const color = parseColor(hexFallback);
  if (!color) return null;
  v.setValueForMode(modeId, color);
  return 'hex';
}

const PAGE = await ensurePage('UDS Tokens');
const systemColl = await findCollection(SYSTEM_COLLECTION);
const systemVarByPath = new Map();
if (systemColl) {
  const systemVars = await figma.variables.getLocalVariablesAsync('COLOR');
  for (const sv of systemVars) {
    if (sv.variableCollectionId === systemColl.id) systemVarByPath.set(sv.name, sv);
  }
}

const { coll, modeIds } = await ensureColorCollection('Semantic Colors', ['Light', 'Dark']);
const lightId = modeIds.Light;
const darkId = modeIds.Dark;
${deleteBlock}
const entries = ${JSON.stringify(entries)};
const created = [];
for (const [cssName, lightSystemRef, darkSystemRef, , , lightHex, darkHex] of entries) {
  const name = tokenPath(cssName);
  const lightTarget = lightSystemRef ? systemVarByPath.get(tokenPath(lightSystemRef)) : null;
  const darkTarget = darkSystemRef ? systemVarByPath.get(tokenPath(darkSystemRef)) : null;
  const v = figma.variables.createVariable(name, coll, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', base.name);
  const rLight = setColorModeValue(v, lightId, lightTarget, lightHex);
  const rDark = setColorModeValue(v, darkId, darkTarget, darkHex);
  if (!rLight || !rDark) {
    v.remove();
    continue;
  }
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  created.push(name);
}
return {
  pageId: PAGE.id,
  collectionId: coll.id,
  removedCount,
  createdCount: created.length,
  range: [${start}, ${end}],
};
`
}

function emitMigrateResponsiveType() {
  const entries = data.responsiveType
  const modeOrder = RESPONSIVE_MODE_ORDER
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const RESPONSIVE_COLLECTION = 'Responsive';
const MODE_ORDER = ${JSON.stringify(modeOrder)};

async function ensureResponsiveCollection() {
  let coll = await findCollection(RESPONSIVE_COLLECTION);
  const modeIds = {};
  if (!coll) {
    coll = figma.variables.createVariableCollection(RESPONSIVE_COLLECTION);
    coll.renameMode(coll.modes[0].modeId, MODE_ORDER[0]);
    modeIds[MODE_ORDER[0]] = coll.modes[0].modeId;
    for (let i = 1; i < MODE_ORDER.length; i++) {
      modeIds[MODE_ORDER[i]] = coll.addMode(MODE_ORDER[i]);
    }
    if (typeof coll.setSharedPluginData === 'function') {
      coll.setSharedPluginData('uds', 'collection', RESPONSIVE_COLLECTION);
    }
  } else {
    for (const m of coll.modes) modeIds[m.name] = m.modeId;
    for (const name of MODE_ORDER) {
      if (!modeIds[name]) modeIds[name] = coll.addMode(name);
    }
    if (coll.modes[0]?.name !== MODE_ORDER[0]) {
      const ordered = MODE_ORDER.map((label) => ({
        label,
        id: modeIds[label] ?? coll.addMode(label),
      }));
      for (let i = 0; i < ordered.length; i++) {
        coll.renameMode(ordered[i].id, ordered[i].label);
        modeIds[ordered[i].label] = ordered[i].id;
      }
    }
  }
  return { coll, modeIds };
}

const layoutColl = await findCollection('Layout');
const removedFromLayout = [];
if (layoutColl) {
  const layoutVars = await figma.variables.getLocalVariablesAsync('FLOAT');
  const typePrefix = /^uds\\/type\\//;
  for (const v of layoutVars) {
    if (v.variableCollectionId === layoutColl.id && typePrefix.test(v.name)) {
      removedFromLayout.push(v.name);
      v.remove();
    }
  }
}

const { coll, modeIds } = await ensureResponsiveCollection();

const existingResponsive = (await figma.variables.getLocalVariablesAsync('FLOAT')).filter(
  (v) => v.variableCollectionId === coll.id,
);
for (const v of existingResponsive) v.remove();

const entries = ${JSON.stringify(entries)};
const created = [];
for (const [cssName, mobile, tablet, desktop] of entries) {
  const name = tokenPath(cssName).replace(/\\/font\\/size$/, '');
  const v = figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeIds.Mobile, mobile);
  v.setValueForMode(modeIds.Tablet, tablet);
  v.setValueForMode(modeIds.Desktop, desktop);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  created.push(name);
}

return {
  pageId: PAGE.id,
  collectionId: coll.id,
  collectionName: RESPONSIVE_COLLECTION,
  modeOrder: MODE_ORDER,
  removedFromLayoutCount: removedFromLayout.length,
  removedFromLayout,
  createdCount: created.length,
  created,
};
`
}

function emitTypographyLineHeight() {
  const slice = data.typographyLineHeights.slice(start, end)
  return `${HELPERS}
const PAGE = await ensurePage('UDS Tokens');
const layoutColl = await findCollection('Layout');
const removedFromLayout = [];
if (layoutColl) {
  const layoutVars = await figma.variables.getLocalVariablesAsync('FLOAT');
  const lineRe = /^uds\\/type\\/(display|heading|body)\\/\\d+\\/line(\\/|$)/;
  for (const v of layoutVars) {
    if (v.variableCollectionId !== layoutColl.id) continue;
    if (lineRe.test(v.name)) {
      removedFromLayout.push(v.name);
      v.remove();
    }
  }
}

const TYPOGRAPHY_COLLECTION = 'Typography';
const LEGACY_TYPOGRAPHY_COLLECTION = 'UDS Typography Line Height';
const MODE_ORDER = ['Regular', 'Tight', 'Loose'];

async function removeCollectionVariables(coll) {
  const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
  for (const v of vars) {
    if (v.variableCollectionId === coll.id) v.remove();
  }
}

async function ensureTypographyCollection() {
  const legacy = await findCollection(LEGACY_TYPOGRAPHY_COLLECTION);
  let coll = await findCollection(TYPOGRAPHY_COLLECTION);
  if (legacy) {
    await removeCollectionVariables(legacy);
    legacy.remove();
  }
  const needsRecreate = !coll || coll.modes[0]?.name !== 'Regular';
  if (needsRecreate) {
    if (coll) {
      await removeCollectionVariables(coll);
      coll.remove();
    }
    coll = figma.variables.createVariableCollection(TYPOGRAPHY_COLLECTION);
    const modeIds = {};
    coll.renameMode(coll.modes[0].modeId, MODE_ORDER[0]);
    modeIds[MODE_ORDER[0]] = coll.modes[0].modeId;
    for (let i = 1; i < MODE_ORDER.length; i++) {
      modeIds[MODE_ORDER[i]] = coll.addMode(MODE_ORDER[i]);
    }
    if (typeof coll.setSharedPluginData === 'function') {
      coll.setSharedPluginData('uds', 'collection', TYPOGRAPHY_COLLECTION);
    }
    return { coll, modeIds };
  }
  const modeIds = {};
  for (const m of coll.modes) modeIds[m.name] = m.modeId;
  for (const name of MODE_ORDER) {
    if (!modeIds[name]) modeIds[name] = coll.addMode(name);
  }
  // Remove any modes no longer in MODE_ORDER (e.g. legacy Snug).
  for (const m of [...coll.modes]) {
    if (!MODE_ORDER.includes(m.name)) {
      coll.removeMode(m.modeId);
      delete modeIds[m.name];
    }
  }
  return { coll, modeIds };
}

const { coll, modeIds } = await ensureTypographyCollection();

const existingTypography = (await figma.variables.getLocalVariablesAsync('FLOAT')).filter(
  (v) => v.variableCollectionId === coll.id,
);
for (const v of existingTypography) v.remove();

const entries = ${JSON.stringify(slice)};
const created = [];
for (const [cssBase, presets] of entries) {
  const name = tokenPath(cssBase);
  const v = figma.variables.createVariable(name, coll, 'FLOAT');
  v.scopes = scopesForFigmaVariable(name, 'FLOAT', coll.name);
  v.setValueForMode(modeIds.Regular, presets.regular);
  v.setValueForMode(modeIds.Tight, presets.tight);
  v.setValueForMode(modeIds.Loose, presets.loose);
  v.setVariableCodeSyntax('WEB', 'var(' + cssBase + '-line-regular)');
  created.push(name);
}
return {
  pageId: PAGE.id,
  collectionId: coll.id,
  collectionName: TYPOGRAPHY_COLLECTION,
  modeOrder: MODE_ORDER,
  removedFromLayoutCount: removedFromLayout.length,
  createdCount: created.length,
  range: [${start}, ${end}],
};
`
}

let body
if (kind === 'system') body = emitSystem()
else if (kind === 'brand') body = emitBrand()
else if (kind === 'brand-extend') body = emitBrandExtend()
else if (kind === 'brand-ld') body = emitBrandLightDark()
else if (kind === 'brand-semantic') body = emitBrandSemantic()
else if (kind === 'button-tokens') body = emitButtonTokens()
else if (kind === 'delete-semantic-collection') body = emitDeleteSemanticCollection()
else if (kind === 'layout') body = emitLayout()
else if (kind === 'group-a') body = emitGroupA()
else if (kind === 'semantic-colors') body = emitSemanticColors()
else if (kind === 'semantic-floats') body = emitSemanticFloats()
else if (kind === 'semantic-cleanup') body = emitSemanticCleanup()
else if (kind === 'semantic-layout-merge') body = emitSemanticLayoutMerge()
else if (kind === 'typography-line-height') body = emitTypographyLineHeight()
else if (kind === 'migrate-responsive-type') body = emitMigrateResponsiveType()
else if (kind === 'reorder-system-colors') body = emitReorderSystemColors()
else if (kind === 'reorder-brand-colors') body = emitReorderBrandColors()
else if (kind === 'reorder-semantic-colors') body = emitReorderSemanticColors()
else {
  throw new Error(
    'Usage: system [start end] | brand | brand-extend | brand-ld | brand-semantic [start end] | button-tokens | delete-semantic-collection | layout | semantic-colors [start end] | semantic-floats [start end] | semantic-cleanup | semantic-layout-merge | typography-line-height [start end] | migrate-responsive-type | reorder-system-colors | reorder-brand-colors | reorder-semantic-colors [start end]',
  )
}

process.stdout.write(body)
