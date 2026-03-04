import { cp, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const source = `${rootDir}/src/ai/schemas/ai-output.schema.json`;
const destination = `${rootDir}/dist/ai/schemas/ai-output.schema.json`;

await mkdir(dirname(destination), { recursive: true });
await cp(source, destination);

console.log("Copied AI output schema to dist/ai/schemas/ai-output.schema.json");
