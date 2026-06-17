#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FIGMA_SCOPES_SNIPPET } from './lib/figma-variable-scopes.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [, , outPath, ...importFiles] = process.argv
if (!outPath || importFiles.length === 0) {
  console.error('Usage: node scripts/figma-build-compact-import.mjs <out.js> <import1.js> ...')
  process.exit(1)
}

const entries = []
for (const f of importFiles) {
  const src = fs.readFileSync(f, 'utf8')
  const m = src.match(/const entries = (\[[\s\S]*?\]);/)
  if (!m) throw new Error(`no entries in ${f}`)
  entries.push(...eval(m[1]))
}

const code = `${FIGMA_SCOPES_SNIPPET}
function parseColor(input) {
  const hex = input.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (h.length === 6) return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255, a: 1 };
    if (h.length === 8) return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255, a: parseInt(h.slice(6, 8), 16) / 255 };
  }
  const rgba = input.match(/rgba?\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)/i);
  if (rgba) return { r: Number(rgba[1]) / 255, g: Number(rgba[2]) / 255, b: Number(rgba[3]) / 255, a: rgba[4] != null ? Number(rgba[4]) : 1 };
  return null;
}
function tokenPath(cssName) { return cssName.replace(/^--/, '').replace(/-/g, '/'); }
async function findCollection(name) { return (await figma.variables.getLocalVariableCollectionsAsync()).find((c) => c.name === name) ?? null; }
async function upsertColorVar(coll, modeId, cssName, hex) {
  const name = tokenPath(cssName);
  const color = parseColor(hex);
  if (!color) return null;
  const existing = (await figma.variables.getLocalVariablesAsync('COLOR')).find((v) => v.variableCollectionId === coll.id && v.name === name);
  const v = existing ?? figma.variables.createVariable(name, coll, 'COLOR');
  v.scopes = scopesForFigmaVariable(name, 'COLOR', coll.name);
  v.setValueForMode(modeId, color);
  v.setVariableCodeSyntax('WEB', 'var(' + cssName + ')');
  return v.id;
}
const coll = await findCollection('Colors');
if (!coll) throw new Error('Colors collection missing');
const modeId = coll.modes[0].modeId;
const entries = ${JSON.stringify(entries)};
let createdCount = 0;
for (const [cssName, hex] of entries) { if (await upsertColorVar(coll, modeId, cssName, hex)) createdCount++; }
return { createdCount, total: entries.length };
`

fs.writeFileSync(outPath, code)
console.error(`wrote ${outPath} (${code.length} bytes, ${entries.length} entries)`)
