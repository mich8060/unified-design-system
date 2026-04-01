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
const iconCatalogPath = resolve(rootDir, "src", "ai", "icons", "catalog.json");
const tokenCatalogPath = resolve(rootDir, "src", "ai", "tokens", "catalog.json");
const layoutArchitecturePath = resolve(rootDir, "src", "ai", "layout", "architecture.json");
const templatesPath = resolve(rootDir, "src", "ai", "templates", "layouts.json");
const examplesDatasetPath = resolve(rootDir, "src", "ai", "examples", "dataset.index.json");
const brandMenusPath = resolve(rootDir, "src", "ai", "navigation", "brand-menus.json");
const governanceSourcePath = resolve(rootDir, "src", "ai", "manifest", "governance.manifest.ts");
const figmaContractPath = resolve(rootDir, "src", "ai", "figma-make.contract.json");
const figmaPromptPath = resolve(rootDir, "src", "ai", "prompts", "figma-make.prompt.md");
const figmaDocPath = resolve(rootDir, "src", "ai", "figma-make.md");

const pkg = readJson(packageJsonPath);
const componentApi = readJson(componentApiPath);
const aiManifest = readJson(manifestPath);
const aiDiscovery = readJson(discoveryPath);
const aiIconCatalog = readJson(iconCatalogPath);
const aiTokenCatalog = readJson(tokenCatalogPath);
const aiLayoutArchitecture = readJson(layoutArchitecturePath);
const aiTemplates = readJson(templatesPath);
const aiExamplesDataset = readJson(examplesDatasetPath);
const aiBrandMenus = readJson(brandMenusPath);
const governanceSource = readText(governanceSourcePath);
const figmaContract = readJson(figmaContractPath);
const figmaPrompt = readText(figmaPromptPath);
const figmaDoc = readText(figmaDocPath);

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
  "./figma-make",
  "./ai",
  "./ai/schema",
  "./ai/icons.json",
  "./ai/icons",
  "./ai/token-catalog",
  "./ai/templates.json",
  "./ai/templates",
  "./ai/layout-architecture",
  "./ai/figma-make.json",
  "./ai/figma-make",
  "./ai/prompts/figma-make",
  "./ai/prompts/system",
  "./ai/prompts/repair",
  "./ai/prompts/starter",
  "./ai/navigation",
  "./ai/navigation/brand-menus.json",
  "./ai/manifest.json",
  "./ai/discovery.json",
  "./ai/discovery",
  "./ai/manifest",
  "./ai/validation",
  "./ai/sdk",
  "./ai/examples",
  "./ai/examples/dataset",
  "./ai/examples/signin-flow-uds.jsonl",
  "./ai/examples/dashboard-statistics-uds.jsonl",
  "./ai/examples/settings-preferences-uds.jsonl",
  "./ai/examples/calendar-events-layout-uds.jsonl",
  "./ai/examples/admin-users-table-uds.jsonl",
  "./ai/examples/kanban-board-uds.jsonl",
  "./ai/examples/uds-governed-training.jsonl",
];

for (const key of requiredAiExports) {
  if (!pkg.exports || !(key in pkg.exports)) {
    fail(`package.json exports missing required AI subpath: ${key}`);
  }
}

const requiredStyleExports = ["./styles.css", "./dist/style.css"];
for (const key of requiredStyleExports) {
  if (!pkg.exports || !(key in pkg.exports)) {
    fail(`package.json exports missing required style subpath: ${key}`);
  }
}
if (pkg.style !== "./dist/style.css") {
  fail(`package.json style must be "./dist/style.css", got "${pkg.style ?? "undefined"}".`);
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
if (aiDiscovery.entrypoints?.iconCatalog !== `${pkg.name}/ai/icons`) {
  fail("ai discovery entrypoints.iconCatalog must point to package /ai/icons export.");
}
if (aiDiscovery.entrypoints?.tokenCatalog !== `${pkg.name}/ai/token-catalog`) {
  fail("ai discovery entrypoints.tokenCatalog must point to package /ai/token-catalog export.");
}
if (aiDiscovery.entrypoints?.figmaMakeContractJson !== `${pkg.name}/ai/figma-make.json`) {
  fail("ai discovery entrypoints.figmaMakeContractJson must point to package /ai/figma-make.json export.");
}
if (aiDiscovery.entrypoints?.figmaMakeContract !== `${pkg.name}/ai/figma-make`) {
  fail("ai discovery entrypoints.figmaMakeContract must point to package /ai/figma-make export.");
}
if (aiDiscovery.entrypoints?.figmaMakePrompt !== `${pkg.name}/ai/prompts/figma-make`) {
  fail("ai discovery entrypoints.figmaMakePrompt must point to package /ai/prompts/figma-make export.");
}
if (aiDiscovery.entrypoints?.systemPrompt !== `${pkg.name}/ai/prompts/system`) {
  fail("ai discovery entrypoints.systemPrompt must point to package /ai/prompts/system export.");
}
if (aiDiscovery.entrypoints?.repairPrompt !== `${pkg.name}/ai/prompts/repair`) {
  fail("ai discovery entrypoints.repairPrompt must point to package /ai/prompts/repair export.");
}
if (aiDiscovery.entrypoints?.starterPrompt !== `${pkg.name}/ai/prompts/starter`) {
  fail("ai discovery entrypoints.starterPrompt must point to package /ai/prompts/starter export.");
}
if (aiDiscovery.entrypoints?.brandMenus !== `${pkg.name}/ai/navigation`) {
  fail("ai discovery entrypoints.brandMenus must point to package /ai/navigation export.");
}
if (aiDiscovery.entrypoints?.layoutArchitecture !== `${pkg.name}/ai/layout-architecture`) {
  fail("ai discovery entrypoints.layoutArchitecture must point to package /ai/layout-architecture export.");
}
if (aiDiscovery.entrypoints?.templatesCatalog !== `${pkg.name}/ai/templates`) {
  fail("ai discovery entrypoints.templatesCatalog must point to package /ai/templates export.");
}
if (aiDiscovery.entrypoints?.validationModule !== `${pkg.name}/ai/validation`) {
  fail("ai discovery entrypoints.validationModule must point to package /ai/validation export.");
}
if (aiDiscovery.entrypoints?.helperSdk !== `${pkg.name}/ai/sdk`) {
  fail("ai discovery entrypoints.helperSdk must point to package /ai/sdk export.");
}
if (aiDiscovery.entrypoints?.examplesDataset !== `${pkg.name}/ai/examples/dataset`) {
  fail("ai discovery entrypoints.examplesDataset must point to package /ai/examples/dataset export.");
}

if (aiTemplates.contractName !== "uds.ai.layout-templates") {
  fail(
    `ai templates contractName must be "uds.ai.layout-templates", got "${aiTemplates.contractName ?? "undefined"}".`
  );
}
if (aiTemplates.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai templates schemaVersion "${aiTemplates.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!Array.isArray(aiTemplates.templates) || aiTemplates.templates.length === 0) {
  fail("ai templates must include a non-empty templates array.");
}
for (const template of aiTemplates.templates ?? []) {
  if (typeof template?.patternId !== "string" || template.patternId.length === 0) {
    fail(`template "${template?.id ?? "unknown"}" must include a non-empty patternId.`);
  }
}

if (aiExamplesDataset.contractName !== "uds.ai.examples-dataset") {
  fail(
    `ai examples dataset contractName must be "uds.ai.examples-dataset", got "${aiExamplesDataset.contractName ?? "undefined"}".`
  );
}
if (aiExamplesDataset.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai examples dataset schemaVersion "${aiExamplesDataset.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!Array.isArray(aiExamplesDataset.files) || aiExamplesDataset.files.length === 0) {
  fail("ai examples dataset must include a non-empty files array.");
}
for (const file of aiExamplesDataset.files ?? []) {
  if (!file?.id || !file?.path) {
    fail("ai examples dataset entries must include id and path.");
    continue;
  }
  if (typeof file.path !== "string" || !file.path.startsWith(`${pkg.name}/ai/examples/`)) {
    fail(`ai examples dataset path must use package ai/examples export namespace: ${file.path}`);
  }
}

if (aiBrandMenus.contractName !== "uds.ai.brand-menus") {
  fail(
    `ai brand menus contractName must be "uds.ai.brand-menus", got "${aiBrandMenus.contractName ?? "undefined"}".`
  );
}
if (aiBrandMenus.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai brand menus schemaVersion "${aiBrandMenus.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!aiBrandMenus.brands || typeof aiBrandMenus.brands !== "object") {
  fail("ai brand menus must include a brands object.");
}

if (aiIconCatalog.contractName !== "uds.ai.icon-catalog") {
  fail(
    `ai icon catalog contractName must be "uds.ai.icon-catalog", got "${aiIconCatalog.contractName ?? "undefined"}".`
  );
}
if (aiIconCatalog.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai icon catalog schemaVersion "${aiIconCatalog.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!Array.isArray(aiIconCatalog.appearanceOptions) || aiIconCatalog.appearanceOptions.length === 0) {
  fail("ai icon catalog must include a non-empty appearanceOptions array.");
}
if (!aiIconCatalog.recommendedByIntent || typeof aiIconCatalog.recommendedByIntent !== "object") {
  fail("ai icon catalog must include recommendedByIntent mappings.");
}

if (aiTokenCatalog.contractName !== "uds.ai.token-catalog") {
  fail(
    `ai token catalog contractName must be "uds.ai.token-catalog", got "${aiTokenCatalog.contractName ?? "undefined"}".`
  );
}
if (aiTokenCatalog.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai token catalog schemaVersion "${aiTokenCatalog.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!aiTokenCatalog.groups || typeof aiTokenCatalog.groups !== "object") {
  fail("ai token catalog must include token groups.");
}
const requiredTokenGroups = ["surface", "text", "border", "action", "state", "spacing"];
for (const group of requiredTokenGroups) {
  if (!Array.isArray(aiTokenCatalog.groups?.[group]) || aiTokenCatalog.groups[group].length === 0) {
    fail(`ai token catalog must include a non-empty "${group}" token group.`);
  }
}

if (aiLayoutArchitecture.contractName !== "uds.ai.layout-architecture") {
  fail(
    `ai layout architecture contractName must be "uds.ai.layout-architecture", got "${aiLayoutArchitecture.contractName ?? "undefined"}".`
  );
}
if (aiLayoutArchitecture.schemaVersion !== contractSchemaVersion) {
  fail(
    `ai layout architecture schemaVersion "${aiLayoutArchitecture.schemaVersion}" does not match AI_CONTRACT_SCHEMA_VERSION "${contractSchemaVersion}".`
  );
}
if (!aiLayoutArchitecture.rootPatterns?.application?.requiredRoot) {
  fail("ai layout architecture must define rootPatterns.application.requiredRoot.");
}
if (!Array.isArray(aiLayoutArchitecture.blueprints) || aiLayoutArchitecture.blueprints.length === 0) {
  fail("ai layout architecture must include at least one blueprint.");
}

if (!figmaContract.hardConstraints?.importRules?.allowPackageLevelImportsOnly) {
  fail("figma contract must require package-level imports only.");
}
if (!figmaContract.hardConstraints?.importRules?.disallowDeepComponentImports) {
  fail("figma contract must disallow deep component imports.");
}

const forbiddenPropsByComponent = figmaContract.hardConstraints?.forbiddenPropsByComponent;
if (!forbiddenPropsByComponent || typeof forbiddenPropsByComponent !== "object") {
  fail("figma contract must declare forbiddenPropsByComponent.");
} else {
  const requiredForbiddenProps = {
    Menu: ["items", "selectedKeys", "mode"],
    Layout: ["vertical", "justify", "align"],
    Button: ["type"],
  };
  for (const [componentName, propList] of Object.entries(requiredForbiddenProps)) {
    const actual = forbiddenPropsByComponent[componentName];
    if (!Array.isArray(actual)) {
      fail(`figma contract missing forbidden props list for ${componentName}.`);
      continue;
    }
    for (const propName of propList) {
      if (!actual.includes(propName)) {
        fail(`figma contract must list "${componentName}.${propName}" as forbidden.`);
      }
    }
  }
}

const requiredPromptSnippets = [
  "Never deep import `@/.../components/*`.",
  "@chg-ds/unified-design-system/ai/navigation",
  "Menu.items",
  "Layout.vertical",
  "Button.type",
];
for (const snippet of requiredPromptSnippets) {
  if (!figmaPrompt.includes(snippet)) {
    fail(`figma prompt is missing required guidance snippet: ${snippet}`);
  }
}

const requiredDocSnippets = [
  "No Ant-style prop APIs on UDS components",
  "RULE_FORBIDDEN_PROP",
  "Menu.items",
  "Layout.vertical",
];
for (const snippet of requiredDocSnippets) {
  if (!figmaDoc.includes(snippet)) {
    fail(`figma contract doc is missing required guidance snippet: ${snippet}`);
  }
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
