import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const AI_OUTPUT_ROOT = "ai-generated";
const TREE_FOLDERS = [`${AI_OUTPUT_ROOT}/screens/`, `${AI_OUTPUT_ROOT}/components/`];

const isJsonFile = (filePath) => filePath.endsWith(".json");

const walk = (dirPath) => {
  if (!existsSync(dirPath)) return [];
  const entries = readdirSync(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && isJsonFile(fullPath)) {
      files.push(fullPath.replace(/\\/g, "/"));
    }
  }
  return files;
};

const walkTreeOutputFolders = () => TREE_FOLDERS.flatMap((folder) => walk(folder));

const safeExec = (command) => {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};

export const getChangedAIFiles = () => {
  const baseRef =
    process.env.GITHUB_BASE_REF && process.env.GITHUB_BASE_REF.length > 0
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : "HEAD~1";

  const diffOutput =
    safeExec(`git diff --name-only --diff-filter=ACMRT ${baseRef}...HEAD -- "${AI_OUTPUT_ROOT}"`) ||
    safeExec(`git diff --name-only --diff-filter=ACMRT HEAD~1...HEAD -- "${AI_OUTPUT_ROOT}"`);

  if (!diffOutput) return walkTreeOutputFolders().filter((line) => !line.includes("/template."));

  return diffOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 &&
        line.endsWith(".json") &&
        TREE_FOLDERS.some((prefix) => line.startsWith(prefix)) &&
        !line.includes("/template.")
    );
};

export const readJson = (filePath) => {
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw);
};

export const failWith = (message, details = undefined) => {
  console.error(`\n[AI Governance] ${message}`);
  if (details) {
    console.error(typeof details === "string" ? details : JSON.stringify(details, null, 2));
  }
  process.exit(1);
};

export const warn = (message, details = undefined) => {
  console.warn(`\n[AI Governance] ${message}`);
  if (details) {
    console.warn(typeof details === "string" ? details : JSON.stringify(details, null, 2));
  }
};

export const ensureAIFilesExist = (files) => {
  if (files.length > 0) return;
  console.info("[AI Governance] No AI JSON files changed; skipping checks.");
  process.exit(0);
};
