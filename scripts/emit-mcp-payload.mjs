#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const step = process.argv[2];
if (!step) {
  console.error('Usage: node emit-mcp-payload.mjs <2-10>');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const payloadPath = path.join(root, '.tmp', `_payload-step${step}.json`);
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
process.stdout.write(JSON.stringify(payload));
