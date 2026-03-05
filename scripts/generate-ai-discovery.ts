import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { UDSGovernance, AI_CONTRACT_SCHEMA_VERSION } from "../src/ai/manifest/governance.manifest.ts";

interface AIContractManifest {
  systemVersion?: string;
  tokenVersion?: string;
  manifestVersion?: string;
  governanceVersion?: string;
  policyVersion?: string;
}

async function generate() {
  const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
  const packageJsonPath = resolve(rootDir, "package.json");
  const contractManifestPath = resolve(rootDir, "src", "ai", "manifest", "manifest.json");
  const srcOutputPath = resolve(rootDir, "src", "ai", "discovery.json");
  const distOutputPath = resolve(rootDir, "dist", "ai", "discovery.json");

  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8")) as { name?: string };
  const contractManifest = JSON.parse(await readFile(contractManifestPath, "utf8")) as AIContractManifest;
  const packageName = packageJson.name ?? "@mich8060/unified-design-system";

  const discovery = {
    contractName: "uds.ai.discovery",
    schemaVersion: AI_CONTRACT_SCHEMA_VERSION,
    package: packageName,
    recommendedReadOrder: [
      `${packageName}/ai/discovery.json`,
      `${packageName}/ai/manifest.json`,
      `${packageName}/ai/schema`,
      `${packageName}/ai/icons`,
      `${packageName}/ai/figma-make.json`,
      `${packageName}/ai/figma-make`,
      `${packageName}/ai/prompts/figma-make`,
      `${packageName}/ai/prompts/system`,
      `${packageName}/ai/prompts/repair`,
      `${packageName}/ai/prompts/starter`,
      `${packageName}/ai/navigation`,
      `${packageName}/ai/templates`,
      `${packageName}/ai/examples`,
      `${packageName}/ai/validation`,
      `${packageName}/ai/sdk`,
    ],
    entrypoints: {
      discovery: `${packageName}/ai/discovery.json`,
      contractManifest: `${packageName}/ai/manifest.json`,
      schema: `${packageName}/ai/schema`,
      iconCatalog: `${packageName}/ai/icons`,
      figmaMakeContractJson: `${packageName}/ai/figma-make.json`,
      figmaMakeContract: `${packageName}/ai/figma-make`,
      figmaMakePrompt: `${packageName}/ai/prompts/figma-make`,
      systemPrompt: `${packageName}/ai/prompts/system`,
      repairPrompt: `${packageName}/ai/prompts/repair`,
      starterPrompt: `${packageName}/ai/prompts/starter`,
      brandMenus: `${packageName}/ai/navigation`,
      templatesCatalog: `${packageName}/ai/templates`,
      runtimeApi: `${packageName}/ai`,
      manifestModule: `${packageName}/ai/manifest`,
      validationModule: `${packageName}/ai/validation`,
      helperSdk: `${packageName}/ai/sdk`,
      examplesModule: `${packageName}/ai/examples`,
      validateAlias: `${packageName}/ai/validate`,
    },
    versioning: {
      system: contractManifest.systemVersion ?? UDSGovernance.systemVersion,
      token: contractManifest.tokenVersion ?? UDSGovernance.tokenVersion,
      manifest: contractManifest.manifestVersion ?? UDSGovernance.manifestVersion,
      governance: contractManifest.governanceVersion ?? UDSGovernance.governanceVersion,
      policy: contractManifest.policyVersion ?? UDSGovernance.policyVersion,
    },
  };

  const payload = `${JSON.stringify(discovery, null, 2)}\n`;

  await mkdir(dirname(srcOutputPath), { recursive: true });
  await mkdir(dirname(distOutputPath), { recursive: true });
  await writeFile(srcOutputPath, payload, "utf8");
  await writeFile(distOutputPath, payload, "utf8");

  console.log("Generated AI discoverability index:");
  console.log(`- ${srcOutputPath}`);
  console.log(`- ${distOutputPath}`);
}

await generate();
