import { cp, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const source = `${rootDir}/src/ai/templates/layouts.json`;
const destination = `${rootDir}/dist/ai/templates/layouts.json`;

await mkdir(dirname(destination), { recursive: true });
await cp(source, destination);

console.log("Copied AI layout templates to dist/ai/templates/layouts.json");
