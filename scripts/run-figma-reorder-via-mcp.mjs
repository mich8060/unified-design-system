#!/usr/bin/env node
/**
 * Prints sequential use_figma payloads for Figma color reorder batches.
 * Agent: CallMcpTool(user-Figma, use_figma, skillNames: figma-use) per step using each payload's `arguments`.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const importDir = path.join(root, '.tmp/figma-import');
const steps = [
  'reorder-system-colors.js',
  'reorder-brand-colors.js',
  'reorder-semantic-colors-0-50.js',
  'reorder-semantic-colors-50-100.js',
  'reorder-semantic-colors-100-150.js',
  'reorder-semantic-colors-150-200.js',
  'reorder-semantic-colors-200-250.js',
  'reorder-semantic-colors-250-300.js',
  'reorder-semantic-colors-300-350.js',
  'reorder-semantic-colors-350-400.js',
];

for (const file of steps) {
  const code = fs.readFileSync(path.join(importDir, file), 'utf8');
  const payload = {
    fileKey: '3bTua8rojOOC7tYWIEWJl0',
    skillNames: 'figma-use',
    description: file.replace('.js', ''),
    code,
  };
  const out = path.join(root, '.tmp', `figma-reorder-payloads/${file}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(payload));
  console.log(file, 'code bytes:', code.length, '->', out);
}
