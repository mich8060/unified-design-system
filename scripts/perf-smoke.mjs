import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const distDir = resolve(root, "dist");

const fail = (message) => {
  process.stderr.write(`[FAIL] ${message}\n`);
  process.exitCode = 1;
};

const pass = (message) => {
  process.stdout.write(`[PASS] ${message}\n`);
};

if (!existsSync(distDir)) {
  fail("dist directory not found. Run `npm run build` first.");
} else {
  pass("dist directory exists");
}

const stylePath = resolve(distDir, "style.css");
if (!existsSync(stylePath)) {
  fail("dist/style.css missing.");
} else {
  const cssBytes = statSync(stylePath).size;
  const cssLimit = Number(process.env.UDS_SMOKE_MAX_CSS_BYTES ?? 320_000);
  if (cssBytes > cssLimit) {
    fail(`dist/style.css is ${(cssBytes / 1024).toFixed(2)} KiB (> ${(cssLimit / 1024).toFixed(2)} KiB).`);
  } else {
    pass(`dist/style.css budget OK (${(cssBytes / 1024).toFixed(2)} KiB)`);
  }
}

const manifestPath = resolve(distDir, "ai", "manifest.json");
if (!existsSync(manifestPath)) {
  fail("dist/ai/manifest.json missing.");
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest?.contractName !== "uds.ai.contract") {
    fail("dist/ai/manifest.json contractName mismatch.");
  } else {
    pass("dist/ai/manifest.json contractName OK");
  }
}

if (!process.exitCode) {
  process.stdout.write("Performance smoke checks passed.\n");
}
