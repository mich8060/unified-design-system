import { statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const files = [
  {
    name: "dist/index.js",
    path: resolve(root, "dist/index.js"),
    maxBytes: Number(process.env.UDS_MAX_ESM_BYTES ?? 330_000),
  },
  {
    name: "dist/index.cjs",
    path: resolve(root, "dist/index.cjs"),
    maxBytes: Number(process.env.UDS_MAX_CJS_BYTES ?? 240_000),
  },
];

const toKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;

let hasError = false;
for (const file of files) {
  const bytes = statSync(file.path).size;
  const ok = bytes <= file.maxBytes;
  const status = ok ? "PASS" : "FAIL";
  process.stdout.write(
    `[${status}] ${file.name} ${toKiB(bytes)} (limit ${toKiB(file.maxBytes)})\n`
  );
  if (!ok) hasError = true;
}

if (hasError) {
  process.stderr.write(
    "Bundle size budget exceeded. Adjust code or explicitly raise UDS_MAX_*_BYTES.\n"
  );
  process.exit(1);
}

process.stdout.write("Bundle size budgets are within thresholds.\n");
