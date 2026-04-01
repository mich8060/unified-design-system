import { cp, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));

const copies = [
  {
    source: `${rootDir}/src/ai/examples/layout-recipes.json`,
    destination: `${rootDir}/dist/ai/examples/layout-recipes.json`,
  },
  {
    source: `${rootDir}/src/ai/examples/dataset.index.json`,
    destination: `${rootDir}/dist/ai/examples/dataset.index.json`,
  },
  {
    source: `${rootDir}/src/ai/examples/signin-flow-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/signin-flow-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/dashboard-statistics-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/dashboard-statistics-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/settings-preferences-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/settings-preferences-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/calendar-events-layout-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/calendar-events-layout-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/admin-users-table-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/admin-users-table-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/kanban-board-uds.jsonl`,
    destination: `${rootDir}/dist/ai/examples/kanban-board-uds.jsonl`,
  },
  {
    source: `${rootDir}/src/ai/examples/uds-governed-training.jsonl`,
    destination: `${rootDir}/dist/ai/examples/uds-governed-training.jsonl`,
  },
];

for (const item of copies) {
  await mkdir(dirname(item.destination), { recursive: true });
  await cp(item.source, item.destination);
}

console.log("Copied AI example datasets to dist/ai/examples.");
