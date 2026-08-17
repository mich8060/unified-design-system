/**
 * Per-component and per-stylesheet gzip bundle budget check.
 *
 * Bundles each JS entry in .audit/bundle-budget.json `components` with esbuild,
 * gzips the output, and compares against its gzip budget. Also gzips each
 * plain CSS file listed under `css` directly (no bundling — they're already
 * built files) and compares against its budget. This is what would have
 * caught the inlined-font regression in dist/styles-base.css: Tailwind/
 * lightningcss base64-inlines @font-face url()s regardless of Vite's
 * assetsInlineLimit, and scripts/prepare-package.mjs must externalize them
 * for every CSS entry that imports src/fonts.css or the gzip size balloons.
 *
 * Also asserts (hard fail, independent of gzip budgets):
 * - `dist/styles.css` and `dist/styles-base.css` contain no `data:font/woff2;base64`
 * - `dist/fonts/Inter-Variable.woff2` exists (prepare-package externalize ran)
 *
 * Prints a table and exits 1 if anything exceeds its budget or font asserts fail.
 *
 * Requires `npm run build:lib` first (includes prepare-package.mjs).
 */
import * as esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const auditDir = path.join(root, ".audit");
const budgetPath = path.join(auditDir, "bundle-budget.json");
const distRoot = path.join(root, "dist");

const distIndex = path.join(distRoot, "index.js");
if (!fs.existsSync(distIndex)) {
  console.error(
    "ci:bundle: dist/index.js missing — run `npm run build:lib` first.",
  );
  process.exit(1);
}

/** @param {number} n */
function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

/** @param {boolean} ok */
function status(ok) {
  return ok ? "✓ pass" : "✗ FAIL";
}

const INLINE_FONT_RE = /data:font\/woff2;base64,/i;
const CSS_FONT_FILES = ["styles.css", "styles-base.css"];
const EXTERNAL_FONT = path.join(distRoot, "fonts", "Inter-Variable.woff2");

/** @type {string[]} */
const fontAssertFailures = [];

for (const cssFileName of CSS_FONT_FILES) {
  const cssPath = path.join(distRoot, cssFileName);
  if (!fs.existsSync(cssPath)) {
    fontAssertFailures.push(
      `missing ${cssFileName} — run \`npm run build:lib\` first`,
    );
    continue;
  }
  const css = fs.readFileSync(cssPath, "utf8");
  if (INLINE_FONT_RE.test(css)) {
    fontAssertFailures.push(
      `${cssFileName} still contains data:font/woff2;base64 — prepare-package must externalize fonts (do not publish a dist that skipped prepare-package.mjs)`,
    );
  }
}

if (!fs.existsSync(EXTERNAL_FONT)) {
  fontAssertFailures.push(
    "dist/fonts/Inter-Variable.woff2 missing — run full `npm run build:lib` (vite + prepare-package)",
  );
} else {
  const st = fs.statSync(EXTERNAL_FONT);
  if (st.size < 1024) {
    fontAssertFailures.push(
      `dist/fonts/Inter-Variable.woff2 is too small (${st.size} bytes) — expected a real WOFF2`,
    );
  }
}

if (fontAssertFailures.length > 0) {
  console.error("");
  console.error("  ci:bundle — font externalize asserts");
  for (const msg of fontAssertFailures) {
    console.error(`  ✗ ${msg}`);
  }
  console.error("");
  process.exit(1);
}

console.log("");
console.log("  ci:bundle — font externalize asserts");
console.log("  ✓ no data:font/woff2;base64 in styles.css / styles-base.css");
console.log("  ✓ dist/fonts/Inter-Variable.woff2 present");
console.log("");

const budget = JSON.parse(fs.readFileSync(budgetPath, "utf8"));
const components = Object.entries(budget.components);
const cssEntries = Object.entries(budget.css ?? {});

/** @type {{ name: string; raw: number; gzip: number; budget: number; ok: boolean }[]} */
const results = [];

for (const [name, spec] of cssEntries) {
  const filePath = path.join(root, spec.file);
  if (!fs.existsSync(filePath)) {
    console.error(
      `ci:bundle: css entry missing for "${name}": ${spec.file} — run \`npm run build:lib\` first.`,
    );
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(raw);
  const ok = gzipped.byteLength <= spec.gzipBytes;
  results.push({
    name,
    raw: raw.byteLength,
    gzip: gzipped.byteLength,
    budget: spec.gzipBytes,
    ok,
  });
}

for (const [name, spec] of components) {
  const entryPath = path.join(root, spec.entry);
  if (!fs.existsSync(entryPath)) {
    console.error(`ci:bundle: entry missing for "${name}": ${spec.entry}`);
    process.exit(1);
  }

  // Code-split so lazy Branding SVG chunks (and similar) are not inlined into the
  // AppShell measurement. Default: eager entry only. Branding sets includeAsyncChunks.
  const outDir = path.join(auditDir, `.ci-bundle-${name}`);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  try {
    await esbuild.build({
      entryPoints: [entryPath],
      absWorkingDir: root,
      bundle: true,
      platform: "node",
      format: "esm",
      splitting: true,
      outdir: outDir,
      logLevel: "warning",
      // Treat all node_modules as external — we only measure our own component code.
      plugins: [
        {
          name: "external-node-modules",
          setup(build) {
            build.onResolve({ filter: /^[^./]/ }, (args) => ({
              path: args.path,
              external: true,
            }));
          },
        },
      ],
    });

    const entryBase = `${path.basename(entryPath, path.extname(entryPath))}.js`;
    const files = fs.readdirSync(outDir).filter((f) => f.endsWith(".js"));
    const includeAsync = spec.includeAsyncChunks === true;
    const measured = includeAsync
      ? files
      : files.filter((f) => f === entryBase);
    if (measured.length === 0) {
      console.error(
        `ci:bundle: no measurable output for "${name}" (expected ${entryBase})`,
      );
      process.exit(1);
    }

    let rawBytes = 0;
    let gzipBytes = 0;
    for (const file of measured) {
      const buf = fs.readFileSync(path.join(outDir, file));
      rawBytes += buf.byteLength;
      gzipBytes += zlib.gzipSync(buf).byteLength;
    }
    const ok = gzipBytes <= spec.gzipBytes;
    results.push({
      name,
      raw: rawBytes,
      gzip: gzipBytes,
      budget: spec.gzipBytes,
      ok,
    });
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}

// Print table
const COL = { name: 16, raw: 9, gzip: 9, budget: 9, status: 8 };
const header = [
  "component".padEnd(COL.name),
  "raw".padStart(COL.raw),
  "gzip".padStart(COL.gzip),
  "budget".padStart(COL.budget),
  "status".padStart(COL.status),
].join("  ");
const divider = "-".repeat(header.length);

console.log("");
console.log("  ci:bundle — per-component gzip budget report");
console.log("  " + divider);
console.log("  " + header);
console.log("  " + divider);
for (const r of results) {
  const row = [
    r.name.padEnd(COL.name),
    fmtBytes(r.raw).padStart(COL.raw),
    fmtBytes(r.gzip).padStart(COL.gzip),
    fmtBytes(r.budget).padStart(COL.budget),
    status(r.ok).padStart(COL.status),
  ].join("  ");
  console.log("  " + row);
}
console.log("  " + divider);
console.log("");

const failed = results.filter((r) => !r.ok);

/**
 * Subpath tree-shaking check.
 *
 * The gzip budgets above measure a component's own code size with all of
 * node_modules externalized — that can't tell us whether importing a
 * component via its new `package.json#exports` subpath actually avoids the
 * barrel's heavy deps, since externalizing node_modules hides that either
 * way. This check instead walks *every* barrel component's real built import
 * graph (dist/components/ui/<name>.js and its local `./` hops) and asserts
 * none of the barrel's known avoidable heavy deps appear, unless the
 * component is a documented exception.
 *
 * `radix-ui` and `@base-ui/react` are deliberately excluded from HEAVY_DEPS:
 * they're the shared primitive layer, not a barrel-specific cost — a measured
 * sweep of all 80 barrel components found 49 of them import `radix-ui`
 * directly (accordion, select, dialog, tooltip, dropdown-menu, and most other
 * interactive components). Importing any of those via its own subpath still
 * needs radix regardless of import path, so flagging it here would either
 * produce ~49 exceptions (noise) or falsely imply subpathing avoids something
 * it can't. The real, avoidable win this check protects is everything else:
 * a component's own 79 unrelated siblings, `react-day-picker`, `recharts`,
 * `cmdk`, `vaul`, `sonner`, `react-resizable-panels`, `date-fns`, and the full
 * Phosphor icon set for components that don't render icons.
 */
const HEAVY_DEPS = [
  "recharts",
  "cmdk",
  "vaul",
  "react-day-picker",
  "sonner",
  "react-resizable-panels",
  "date-fns",
  "input-otp",
];

// Known, deliberate exceptions — see "What the tree-shaking check covers" in
// docs/component-subpath-exports.md: calendar/date-input/date-range-input are genuine
// barrel members that pull react-day-picker, and input-otp's own component
// legitimately depends on the identically-named input-otp package. None of
// this leaks into any *other* component's subpath.
const EXPECTED_HEAVY_DEPS = {
  calendar: ["react-day-picker"],
  "date-input": ["react-day-picker"],
  "date-range-input": ["react-day-picker"],
  // Root-barrel compatibility re-export (1.0.x upgrades); subpath still preferred for Vitest.
  drawer: ["vaul"],
  "input-otp": ["input-otp"],
};

function barrelComponentNames() {
  const indexSrc = fs.readFileSync(path.join(root, "src/index.ts"), "utf8");
  const names = new Set();
  const re = /export \* from ['"]\.\/components\/ui\/([a-z0-9-]+)['"]/g;
  let match;
  while ((match = re.exec(indexSrc))) names.add(match[1]);
  return [...names].sort();
}

/** Collect every bare (non-relative) import specifier reachable from a built dist file. */
function collectBareImports(entryFile, visited = new Set(), out = new Set()) {
  if (visited.has(entryFile)) return out;
  visited.add(entryFile);
  if (!fs.existsSync(entryFile)) return out;

  const src = fs.readFileSync(entryFile, "utf8");
  const re = /^import\s[^'"]*from\s+["']([^"']+)["']/gm;
  let match;
  while ((match = re.exec(src))) {
    const spec = match[1];
    if (spec.startsWith(".")) {
      collectBareImports(
        path.join(path.dirname(entryFile), spec),
        visited,
        out,
      );
    } else {
      out.add(spec);
    }
  }
  return out;
}

const subpathFailures = [];
const barrelNames = barrelComponentNames();
console.log(
  "  ci:bundle — subpath tree-shaking check (all barrel components)",
);
console.log("  " + divider);
for (const name of barrelNames) {
  const entryFile = path.join(root, "dist/components/ui", `${name}.js`);
  const bareImports = collectBareImports(entryFile);
  const unexpectedHeavy = HEAVY_DEPS.filter(
    (dep) =>
      bareImports.has(dep) && !(EXPECTED_HEAVY_DEPS[name] ?? []).includes(dep),
  );
  const ok = fs.existsSync(entryFile) && unexpectedHeavy.length === 0;
  if (!ok) {
    console.log(
      `  ${status(ok).padEnd(COL.status)}  ${name.padEnd(COL.name)}${
        unexpectedHeavy.length
          ? `  unexpected heavy dep(s): ${unexpectedHeavy.join(", ")}`
          : "  entry file missing"
      }`,
    );
    subpathFailures.push(name);
  }
}
if (subpathFailures.length === 0) {
  console.log(
    `  ✓ pass    all ${barrelNames.length} barrel components clean of unexpected heavy deps`,
  );
}
console.log("  " + divider);
console.log("");

if (failed.length > 0 || subpathFailures.length > 0) {
  if (failed.length > 0) {
    console.error(
      `ci:bundle: ${failed.length} component(s) exceed gzip budget: ${failed.map((r) => r.name).join(", ")}`,
    );
  }
  if (subpathFailures.length > 0) {
    console.error(
      `ci:bundle: ${subpathFailures.length} subpath(s) failed the tree-shaking check: ${subpathFailures.join(", ")}`,
    );
  }
  process.exit(1);
}

console.log(
  "ci:bundle: all components within gzip budget; all sampled subpaths tree-shake as expected.",
);
