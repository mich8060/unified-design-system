// scripts/pull-variables.js
import fs from 'node:fs/promises';

const { FIGMA_TOKEN, FIGMA_FILE_KEY } = process.env;
if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY');
  process.exit(1);
}

async function get(url) {
  const res = await fetch(url, { headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} – ${url}`);
  return res.json();
}

const base = 'https://api.figma.com/v1';
const local = await get(`${base}/files/${FIGMA_FILE_KEY}/variables/local`);

const vars = local.meta.variables;
const colls = local.meta.variableCollections;

const to255 = x => Math.round(x * 255);
const h2 = n => n.toString(16).padStart(2, '0').toUpperCase();
const colorToCss = c => (c?.a != null && c.a < 1)
  ? `rgba(${to255(c.r)},${to255(c.g)},${to255(c.b)},${+c.a.toFixed(3)})`
  : `#${h2(to255(c.r))}${h2(to255(c.g))}${h2(to255(c.b))}`;

const scssLines = [`// Auto-generated from Figma Variables. Do not edit.\n`];
const cssLines  = [`/* Auto-generated from Figma Variables. Do not edit. */`, `:root{`];

for (const v of Object.values(vars)) {
  const name = v.name.trim().replace(/\s+/g, '-').toLowerCase();
  const coll = colls[v.variableCollectionId];
  const defaultMode = coll?.defaultModeId;
  const val = v.valuesByMode?.[defaultMode];

  if (val && typeof val === 'object' && 'type' in val && val.type === 'VARIABLE_ALIAS') {
    const target = vars[val.id];
    const targetName = target?.name?.trim().replace(/\s+/g, '-').toLowerCase();
    scssLines.push(`$${name}: $${targetName};`);
  } else {
    let out = val;
    if (v.resolvedType === 'COLOR' && val) out = colorToCss(val);
    scssLines.push(`$${name}: ${out};`);
    if (out != null) cssLines.push(`  --${name}: ${out};`);
  }
}

cssLines.push('}');

await fs.writeFile('src/scss/_variables.scss', scssLines.join('\n') + '\n', 'utf8');
await fs.writeFile('src/scss/css-vars.scss', `@use "./variables" as vars;\n` + cssLines.join('\n') + '\n', 'utf8');

console.log('Wrote src/scss/_variables.scss and src/scss/css-vars.scss');
