#!/usr/bin/env node
/** Prints use_figma arguments JSON for step N (2-10) from .tmp/_payload-step{N}.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const step = process.argv[2];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const payloadPath = path.join(root, '.tmp', `_payload-step${step}.json`);
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
const outPath = path.join(root, '.tmp', `_result-step${step}.json`);
process.stdout.write(JSON.stringify({ payload, outPath }));
