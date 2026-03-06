import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const distTokensDir = resolve(root, "dist/tokens");

const moduleUrl = pathToFileURL(resolve(distTokensDir, "index.js")).href;
const runtime = await import(moduleUrl);

const resetCss = [
  "*,*::before,*::after{box-sizing:border-box}",
  "html,body{margin:0;padding:0}",
].join("");
const css = runtime.generateRuntimeTokensCss(runtime.runtimeTokens);
writeFileSync(resolve(distTokensDir, "tokens.css"), `${resetCss}${css}`, "utf8");

process.stdout.write("Generated dist/tokens/tokens.css from runtime token source.\n");
