const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PACKAGE_JSON_PATH = path.join(ROOT, "package.json");
const DIST_STYLES_PATH = path.join(ROOT, "dist/styles.css");
const DIST_UDS_ENTRY_PATH = path.join(ROOT, "dist/entries/UDS.js");
const DIST_TOKENS_PATH = path.join(ROOT, "dist/tokens.css");

const REQUIRED_UDS_SELECTORS = [
  ".uds--container",
  ".uds--content",
  ".uds--main",
  ".uds--listview",
  ".uds--panel",
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function collectExportTargets(value, acc = []) {
  if (typeof value === "string") {
    acc.push(value);
    return acc;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((nested) => collectExportTargets(nested, acc));
  }
  return acc;
}

function run() {
  const pkg = readJson(PACKAGE_JSON_PATH);
  const exportsMap = pkg.exports || {};
  const exportTargets = collectExportTargets(exportsMap);
  const errors = [];

  const invalidSrcTargets = exportTargets.filter((target) => /(^|\/)src\//.test(target));
  if (invalidSrcTargets.length > 0) {
    errors.push(
      "Runtime export map contains src/** paths:\n" + invalidSrcTargets.join("\n"),
    );
  }

  if (!exportsMap["./UDS"] && !exportsMap["./*"]) {
    errors.push('Missing required subpath export for "./UDS" (explicit entry or wildcard).');
  }

  if (exportsMap["./tokens.css"] !== "./dist/tokens.css") {
    errors.push('Expected "./tokens.css" to point to "./dist/tokens.css".');
  }

  if (!fs.existsSync(DIST_STYLES_PATH)) {
    errors.push("Missing dist/styles.css");
  } else {
    const distStyles = readText(DIST_STYLES_PATH);
    REQUIRED_UDS_SELECTORS.forEach((selector) => {
      if (!distStyles.includes(selector)) {
        errors.push(`Missing UDS shell selector in dist/styles.css: ${selector}`);
      }
    });
  }

  if (!fs.existsSync(DIST_UDS_ENTRY_PATH)) {
    errors.push("Missing dist UDS entry shim: dist/entries/UDS.js");
  } else {
    const udsEntry = readText(DIST_UDS_ENTRY_PATH);
    if (/\.scss["']?/.test(udsEntry)) {
      errors.push("dist/entries/UDS.js should not import any .scss files.");
    }
  }

  if (!fs.existsSync(DIST_TOKENS_PATH)) {
    errors.push("Missing dist/tokens.css");
  }

  if (errors.length > 0) {
    console.error("Runtime export validation failed:\n");
    errors.forEach((err, idx) => console.error(`${idx + 1}. ${err}\n`));
    process.exit(1);
  }

  console.log("Runtime export validation passed.");
}

run();
