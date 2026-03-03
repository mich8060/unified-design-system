import { execSync } from "node:child_process";
import { getChangedAIFiles, readJson, ensureAIFilesExist, failWith } from "./_ai-utils.mjs";

const TOKEN_REGEX = /--uds-[a-z0-9-]+/gi;
const COLOR_LITERAL_REGEX = /#(?:[a-fA-F0-9]{3,8})\b|rgb\(|rgba\(|hsl\(|hsla\(/;
const HARD_SPACING_REGEX = /\b\d+(?:\.\d+)?px\b/;
const APPROVED_TOKEN_CATEGORIES = new Set([
  "spacing",
  "color",
  "radius",
  "shadow",
  "motion",
  "font",
  "line",
  "elevation",
]);

const extractTokens = (value) => {
  if (typeof value === "string") {
    const matches = value.match(TOKEN_REGEX) ?? [];
    return matches;
  }
  if (Array.isArray(value)) {
    return value.flatMap(extractTokens);
  }
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(extractTokens);
  }
  return [];
};

const extractColorLiterals = (value) => {
  const literals = [];
  const walk = (current) => {
    if (typeof current === "string" && COLOR_LITERAL_REGEX.test(current)) {
      literals.push(current);
      return;
    }
    if (Array.isArray(current)) {
      current.forEach(walk);
      return;
    }
    if (current && typeof current === "object") {
      Object.values(current).forEach(walk);
    }
  };
  walk(value);
  return literals;
};

const extractHardSpacing = (value) => {
  const hardSpacing = [];
  const walk = (current) => {
    if (typeof current === "string" && HARD_SPACING_REGEX.test(current) && !current.includes("--uds-spacing-")) {
      hardSpacing.push(current);
      return;
    }
    if (Array.isArray(current)) {
      current.forEach(walk);
      return;
    }
    if (current && typeof current === "object") {
      Object.values(current).forEach(walk);
    }
  };
  walk(value);
  return hardSpacing;
};

const tokenCategory = (token) => {
  const parts = token.replace(/^--uds-/, "").split("-");
  return parts[0] ?? "unknown";
};

const readBaseFile = (filePath, baseRef) => {
  try {
    const content = execSync(`git show ${baseRef}:${filePath}`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();
    return JSON.parse(content);
  } catch {
    return null;
  }
};

const baseRef =
  process.env.GITHUB_BASE_REF && process.env.GITHUB_BASE_REF.length > 0
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : "HEAD~1";

const files = getChangedAIFiles();
ensureAIFilesExist(files);

const violations = [];
const allowNewTokenCategories = process.env.ALLOW_NEW_TOKEN_CATEGORIES === "true";

for (const filePath of files) {
  const current = readJson(filePath);
  const base = readBaseFile(filePath, baseRef) ?? {};

  const currentTokens = new Set(extractTokens(current));
  const baseTokens = new Set(extractTokens(base));
  const newTokens = [...currentTokens].filter((token) => !baseTokens.has(token));

  const currentCategories = new Set(newTokens.map(tokenCategory));
  const baseCategories = new Set([...baseTokens].map(tokenCategory));
  const newCategories = [...currentCategories].filter((category) => !baseCategories.has(category));

  const colorLiterals = extractColorLiterals(current);
  const hardSpacing = extractHardSpacing(current);

  if (colorLiterals.length > 0 || hardSpacing.length > 0) {
    violations.push({
      filePath,
      code: "RAW_VALUE_DIFF",
      colorLiterals,
      hardSpacing,
    });
  }

  const unknownCategories = newCategories.filter(
    (category) => !APPROVED_TOKEN_CATEGORIES.has(category)
  );

  if (!allowNewTokenCategories && unknownCategories.length > 0) {
    violations.push({
      filePath,
      code: "TOKEN_CATEGORY_DIFF",
      newCategories: unknownCategories,
      suggestion:
        "Set ALLOW_NEW_TOKEN_CATEGORIES=true only for approved token taxonomy changes.",
    });
  }
}

if (violations.length > 0) {
  failWith("Token usage diff guard failed.", violations);
}

console.info("[AI Governance] diff-token-usage passed.");
