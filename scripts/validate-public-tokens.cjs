const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_TOKENS_PATH = path.join(ROOT, "src/styles/tokens.css");
const DIST_STYLES_PATH = path.join(ROOT, "dist/styles.css");
const PUBLIC_TOKENS_PATH = path.join(ROOT, "public/styles/tokens.css");

const GRAY_SHADES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${path.relative(ROOT, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function collectDeclaredTokens(cssText) {
  const matches = cssText.match(/--uds-[a-z0-9-]+\s*:/g) || [];
  return new Set(matches.map((token) => token.replace(":", "").trim()));
}

function containsDarkScope(cssText) {
  return /\[data-mode(?:=|=")dark/.test(cssText);
}

function missingAliases(cssText) {
  return GRAY_SHADES.filter((shade) => {
    const aliasPattern = new RegExp(
      `--uds-color-gray-${shade}\\s*:\\s*var\\(\\s*--uds-color-neutrals-${shade}\\s*\\)\\s*;`,
    );
    return !aliasPattern.test(cssText);
  });
}

function findMalformedMsValues(cssText) {
  return cssText.match(/\b\d+msms\b/g) || [];
}

function run() {
  const srcTokensCss = readFile(SRC_TOKENS_PATH);
  const distStylesCss = readFile(DIST_STYLES_PATH);
  const publicTokensCss = fs.existsSync(PUBLIC_TOKENS_PATH)
    ? readFile(PUBLIC_TOKENS_PATH)
    : "";

  const srcDeclaredTokens = collectDeclaredTokens(srcTokensCss);
  const distDeclaredTokens = collectDeclaredTokens(distStylesCss);
  const missingInDist = [...srcDeclaredTokens].filter((token) => !distDeclaredTokens.has(token));

  const srcMissingAliases = missingAliases(srcTokensCss);
  const distMissingAliases = missingAliases(distStylesCss);

  const malformedValues = [
    ...findMalformedMsValues(srcTokensCss),
    ...findMalformedMsValues(distStylesCss),
    ...findMalformedMsValues(publicTokensCss),
  ];

  const errors = [];

  if (!containsDarkScope(srcTokensCss)) {
    errors.push("`src/styles/tokens.css` is missing a dark mode scope selector.");
  }
  if (!containsDarkScope(distStylesCss)) {
    errors.push("`dist/styles.css` is missing a dark mode scope selector.");
  }
  if (missingInDist.length > 0) {
    errors.push(
      `dist/styles.css is missing ${missingInDist.length} token declaration(s) from src/styles/tokens.css.\n` +
        missingInDist.slice(0, 20).join("\n"),
    );
  }
  if (srcMissingAliases.length > 0) {
    errors.push(
      `src/styles/tokens.css is missing gray alias(es) for shade(s): ${srcMissingAliases.join(", ")}`,
    );
  }
  if (distMissingAliases.length > 0) {
    errors.push(
      `dist/styles.css is missing gray alias(es) for shade(s): ${distMissingAliases.join(", ")}`,
    );
  }
  if (malformedValues.length > 0) {
    errors.push(
      `Malformed duration token value(s) detected: ${[...new Set(malformedValues)].join(", ")}`,
    );
  }

  if (errors.length > 0) {
    console.error("Token validation failed:\n");
    errors.forEach((error, index) => {
      console.error(`${index + 1}. ${error}\n`);
    });
    process.exit(1);
  }

  console.log("Token validation passed.");
  console.log(`- Source tokens: ${srcDeclaredTokens.size}`);
  console.log(`- Dist tokens: ${distDeclaredTokens.size}`);
  console.log(`- Gray aliases validated: ${GRAY_SHADES.length}`);
}

run();
