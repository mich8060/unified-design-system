import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const readText = (path) => readFileSync(path, "utf8");

const failures = [];

const fail = (message) => {
  failures.push(message);
};

const packageJsonPath = resolve(rootDir, "package.json");
const componentApiPath = resolve(rootDir, "src", "design-system", "generated", "component-api.json");
const manifestPath = resolve(rootDir, "src", "ai", "manifest", "manifest.json");
const discoveryPath = resolve(rootDir, "src", "ai", "discovery.json");
const governanceSourcePath = resolve(rootDir, "src", "ai", "manifest", "governance.manifest.ts");

const pkg = readJson(packageJsonPath);
const componentApi = readJson(componentApiPath);
const aiManifest = readJson(manifestPath);
const aiDiscovery = readJson(discoveryPath);
const governanceSource = readText(governanceSourcePath);

const readConstString = (name) => {
  const pattern = new RegExp(`export const ${name} = "([^"]+)"`);
  const match = governanceSource.match(pattern);
  return match?.[1];
};

const manifestVersion = readConstString("AI_MANIFEST_VERSION");
const governanceVersion = readConstString("AI_GOVERNANCE_VERSION");
const policyVersion = readConstString("AI_POLICY_VERSION");
const contractSchemaVersion = readConstString("AI_CONTRACT_SCHEMA_VERSION");
const componentApiSchemaVersion = readConstString("AI_COMPONENT_API_SCHEMA_VERSION");

if (!manifestVersion || !governanceVersion || !policyVersion || !contractSchemaVersion || !componentApiSchemaVersion) {
  fail("Unable to read AI version constants from src/ai/manifest/governance.manifest.ts.");
}

const requiredAiExports = [
  "./ai",
  "./ai/schema",
  "./ai/manifest.json",
  "./ai/discovery.json",
  "./ai/discovery",
  "./ai/manifest",
  "./ai/validation",
  "./ai/sdk",
  "./ai/examples",
];

for (const key of requiredAiExports) {
  if (!pkg.exports || !(key in pkg.exports)) {
    fail(`package.json exports missing required AI subpath: ${key}`);
  }
}

if (componentApi.contractName !== "uds.ai.component-api") {
  fail(`component-api.json contractName must be "uds.ai.component-api", got "${componentApi.contractName ?? "undefined"}".`);
}
if (componentApi.schemaVersion !== componentApiSchemaVersion) {
  fail(
    `component-api.json schemaVersion "${componentApi.schemaVersion}" does not match AI_COMPONENT_API_SCHEMA_VERSION "${componentApiSchemaVersion}".`
  );
}

if (aiManifest.contractName !== "uds.ai.contract") {
  fail(`ai manifest contractName must be "uds.ai.contract", got "${aiManifest.contractName ?? "undefined"}".`);
}
if (aiManifest.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai manifest schemaVersion "${aiManifest.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (aiManifest.manifestVersion !== manifestVersion) {
  fail(`ai manifest manifestVersion "${aiManifest.manifestVersion}" does not match AI_MANIFEST_VERSION "${manifestVersion}".`);
}
if (aiManifest.governanceVersion !== governanceVersion) {
  fail(
    `ai manifest governanceVersion "${aiManifest.governanceVersion}" does not match AI_GOVERNANCE_VERSION "${governanceVersion}".`
  );
}
if (aiManifest.policyVersion !== policyVersion) {
  fail(`ai manifest policyVersion "${aiManifest.policyVersion}" does not match AI_POLICY_VERSION "${policyVersion}".`);
}

if (aiDiscovery.contractName !== "uds.ai.discovery") {
  fail(`ai discovery contractName must be "uds.ai.discovery", got "${aiDiscovery.contractName ?? "undefined"}".`);
}
if (aiDiscovery.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai discovery schemaVersion "${aiDiscovery.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (aiDiscovery.entrypoints?.contractManifest !== `${pkg.name}/ai/manifest.json`) {
  fail("ai discovery entrypoints.contractManifest must point to package /ai/manifest.json export.");
}
if (aiDiscovery.entrypoints?.schema !== `${pkg.name}/ai/schema`) {
  fail("ai discovery entrypoints.schema must point to package /ai/schema export.");
}
if (aiDiscovery.entrypoints?.validationModule !== `${pkg.name}/ai/validation`) {
  fail("ai discovery entrypoints.validationModule must point to package /ai/validation export.");
}
if (aiDiscovery.entrypoints?.helperSdk !== `${pkg.name}/ai/sdk`) {
  fail("ai discovery entrypoints.helperSdk must point to package /ai/sdk export.");
}

const versioning = aiManifest.versioning ?? {};
if (versioning.schema !== aiManifest.schemaVersion) fail("ai manifest versioning.schema must match schemaVersion.");
if (versioning.manifest !== aiManifest.manifestVersion) fail("ai manifest versioning.manifest must match manifestVersion.");
if (versioning.governance !== aiManifest.governanceVersion) {
  fail("ai manifest versioning.governance must match governanceVersion.");
}
if (versioning.policy !== aiManifest.policyVersion) fail("ai manifest versioning.policy must match policyVersion.");
if (versioning.token !== aiManifest.tokenVersion) fail("ai manifest versioning.token must match tokenVersion.");
if (versioning.system !== aiManifest.systemVersion) fail("ai manifest versioning.system must match systemVersion.");

const components = componentApi.components ?? {};
for (const [componentName, component] of Object.entries(components)) {
  const ambiguity = component.ambiguity ?? {};
  const aliasMap = component.aliases?.props ?? {};
  const propKeys = Object.keys(component.props ?? {});

  if (Array.isArray(ambiguity.propNameCollisions) && ambiguity.propNameCollisions.length > 0) {
    fail(`${componentName} has ambiguous prop collisions: ${ambiguity.propNameCollisions.join(", ")}.`);
  }

  for (const [alias, canonical] of Object.entries(aliasMap)) {
    if (propKeys.includes(alias)) {
      fail(`${componentName} still exposes alias prop "${alias}" (canonical: "${canonical}") in component-api.json.`);
    }
  }
}

if (failures.length > 0) {
  console.error("[AI Governance] AI contract integrity check failed:");
  for (const message of failures) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.info("[AI Governance] check-ai-contract-integrity passed.");
