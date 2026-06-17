#!/usr/bin/env node
/** Emit use_figma code to retrieve export from clientStorage and return payload */
console.log(`
const STORAGE_KEY = 'uds-var-export';
const raw = await figma.clientStorage.getAsync(STORAGE_KEY);
if (!raw) return { error: 'no stored export' };
return JSON.parse(raw);
`)
