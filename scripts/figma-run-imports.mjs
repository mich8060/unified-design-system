#!/usr/bin/env node
/**
 * Prints ordered list of import scripts for Figma variable sync.
 * Usage: node scripts/figma-run-imports.mjs
 */
const IMPORTS = [
  '/tmp/figma-import-01-system-0-90.js',
  '/tmp/figma-import-02-system-90-180.js',
  '/tmp/figma-import-03-system-180-263.js',
  '/tmp/figma-import-04-brand-ld.js',
  '/tmp/figma-import-05-brand-semantic-0-100.js',
  '/tmp/figma-import-06-brand-semantic-100-200.js',
  '/tmp/figma-import-07-brand-semantic-200-300.js',
  '/tmp/figma-import-08-brand-semantic-300-412.js',
  '/tmp/figma-import-09-button-tokens.js',
  '/tmp/figma-import-10-layout.js',
  '/tmp/figma-import-11-typography.js',
  '/tmp/figma-import-12-responsive.js',
]

console.log(JSON.stringify({ fileKey: 'LkIyThUA0oVNsDEAyOF7ER', imports: IMPORTS }, null, 2))
