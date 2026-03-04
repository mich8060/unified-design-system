import { mkdir, readdir, writeFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CompositionRules } from "../src/design-system/ai/manifest/composition.manifest.ts";
import { getAliasEntries, getCanonicalPropName } from "../src/design-system/ai/manifest/prop-aliases.manifest.ts";
import { AI_COMPONENT_API_SCHEMA_VERSION } from "../src/ai/manifest/governance.manifest.ts";

type Primitive = string | number | boolean | null;

interface ComponentSpecVariant {
  type: "enum" | "boolean";
  values?: string[];
  default: string | boolean;
}

interface ComponentSpecFormat {
  name: string;
  tier: 1 | 2 | 3 | 4;
  purpose: string;
  variants: Record<string, ComponentSpecVariant>;
  states: string[];
  tokensUsed: string[];
  accessibility: { role: string; keyboard: string[] };
  antiPatterns?: string[];
}

interface LegacySpecFormat {
  allowedVariants?: Record<string, string[]>;
  defaults?: Record<string, Primitive>;
}

interface ComponentApiProp {
  type: "enum" | "boolean" | "string" | "number";
  values?: string[];
  default?: Primitive;
}

interface ComponentApiItem {
  name: string;
  source: string;
  tier?: 1 | 2 | 3 | 4;
  purpose?: string;
  props: Record<string, ComponentApiProp>;
  defaults: Record<string, Primitive>;
  states: string[];
  tokensUsed: string[];
  accessibility: {
    role?: string;
    keyboard: string[];
  };
  composition: {
    allowedChildren: string[];
    allowedParents: string[];
    disallowedChildren: string[];
  };
  aliases: {
    props: Record<string, string>;
  };
  ambiguity: {
    propNameCollisions: string[];
    hadAliasNormalization: boolean;
  };
  antiPatterns: string[];
}

function normalizeBooleanString(value: Primitive): Primitive {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function normalizeFromComponentSpec(spec: ComponentSpecFormat): ComponentApiItem {
  const props: Record<string, ComponentApiProp> = {};
  const defaults: Record<string, Primitive> = {};

  for (const [propName, propSpec] of Object.entries(spec.variants ?? {})) {
    const normalizedDefault = normalizeBooleanString(propSpec.default);
    props[propName] = {
      type: propSpec.type,
      values: propSpec.values ? [...propSpec.values] : undefined,
      default: normalizedDefault,
    };
    defaults[propName] = normalizedDefault;
  }

  return {
    name: spec.name,
    source: "",
    tier: spec.tier,
    purpose: spec.purpose,
    props,
    defaults,
    states: [...(spec.states ?? [])],
    tokensUsed: [...(spec.tokensUsed ?? [])],
    accessibility: {
      role: spec.accessibility?.role,
      keyboard: [...(spec.accessibility?.keyboard ?? [])],
    },
    composition: {
      allowedChildren: [],
      allowedParents: [],
      disallowedChildren: [],
    },
    aliases: {
      props: {},
    },
    ambiguity: {
      propNameCollisions: [],
      hadAliasNormalization: false,
    },
    antiPatterns: [...(spec.antiPatterns ?? [])],
  };
}

function normalizeFromLegacySpec(componentName: string, spec: LegacySpecFormat): ComponentApiItem {
  const props: Record<string, ComponentApiProp> = {};
  const defaults: Record<string, Primitive> = {};
  const allowedVariants = spec.allowedVariants ?? {};
  const rawDefaults = spec.defaults ?? {};

  for (const [propName, values] of Object.entries(allowedVariants)) {
    const hasBooleanEnum = values.length === 2 && values.includes("true") && values.includes("false");
    const normalizedDefault = normalizeBooleanString(rawDefaults[propName] ?? null);
    props[propName] = {
      type: hasBooleanEnum ? "boolean" : "enum",
      values: hasBooleanEnum ? undefined : [...values],
      default: normalizedDefault === null ? undefined : normalizedDefault,
    };
    if (normalizedDefault !== null) {
      defaults[propName] = normalizedDefault;
    }
  }

  for (const [propName, rawValue] of Object.entries(rawDefaults)) {
    if (props[propName]) continue;
    const value = normalizeBooleanString(rawValue);
    let type: ComponentApiProp["type"] = "string";
    if (typeof value === "boolean") type = "boolean";
    if (typeof value === "number") type = "number";
    props[propName] = {
      type,
      default: value,
    };
    defaults[propName] = value;
  }

  return {
    name: componentName,
    source: "",
    props,
    defaults,
    states: Array.isArray(allowedVariants.state) ? [...allowedVariants.state] : [],
    tokensUsed: [],
    accessibility: {
      keyboard: [],
    },
    composition: {
      allowedChildren: [],
      allowedParents: [],
      disallowedChildren: [],
    },
    aliases: {
      props: {},
    },
    ambiguity: {
      propNameCollisions: [],
      hadAliasNormalization: false,
    },
    antiPatterns: [],
  };
}

function applyCanonicalPropNames(item: ComponentApiItem): void {
  const normalizedProps: Record<string, ComponentApiProp> = {};
  const normalizedDefaults: Record<string, Primitive> = {};
  const aliases: Record<string, string> = {};
  let hadAliasNormalization = false;

  const propEntries = Object.entries(item.props);
  for (const [rawName, propMeta] of propEntries) {
    const canonicalName = getCanonicalPropName(item.name, rawName);
    if (canonicalName !== rawName) {
      aliases[rawName] = canonicalName;
      hadAliasNormalization = true;
    }
    normalizedProps[canonicalName] = propMeta;
  }

  const defaultEntries = Object.entries(item.defaults);
  for (const [rawName, value] of defaultEntries) {
    const canonicalName = getCanonicalPropName(item.name, rawName);
    if (canonicalName !== rawName) {
      aliases[rawName] = canonicalName;
      hadAliasNormalization = true;
    }
    normalizedDefaults[canonicalName] = value;
  }

  const caseBuckets = Object.keys(normalizedProps).reduce<Record<string, string[]>>((acc, key) => {
    const lowered = key.toLowerCase();
    if (!acc[lowered]) acc[lowered] = [];
    acc[lowered].push(key);
    return acc;
  }, {});
  const propNameCollisions = Object.values(caseBuckets)
    .filter((keys) => keys.length > 1)
    .map((keys) => keys.sort().join(", "))
    .sort();

  item.props = normalizedProps;
  item.defaults = normalizedDefaults;
  item.aliases = {
    props: Object.fromEntries(
      [...Object.entries(aliases), ...getAliasEntries(item.name).map(({ alias, canonical }) => [alias, canonical])]
        .sort(([a], [b]) => a.localeCompare(b))
    ),
  };
  item.ambiguity = {
    propNameCollisions,
    hadAliasNormalization,
  };
}

function escapeMarkdown(value: string): string {
  return value.replace(/\|/g, "\\|");
}

async function generate() {
  const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
  const componentsDir = resolve(rootDir, "src", "design-system", "components");
  const generatedDir = resolve(rootDir, "src", "design-system", "generated");
  const docsGeneratedDir = resolve(rootDir, "docs", "generated");
  const aiExamplesDir = resolve(rootDir, "src", "ai", "examples");

  const componentDirs = (await readdir(componentsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const apiItems: Record<string, ComponentApiItem> = {};
  const disallowedChildrenByParent = CompositionRules.disallowedPairs.reduce<Record<string, string[]>>(
    (acc, pair) => {
      if (!acc[pair.parent]) acc[pair.parent] = [];
      acc[pair.parent].push(pair.child);
      return acc;
    },
    {}
  );

  for (const componentName of componentDirs) {
    const specPath = resolve(componentsDir, componentName, `${componentName}.spec.ts`);
    try {
      await readFile(specPath, "utf8");
    } catch {
      continue;
    }

    const module = (await import(pathToFileURL(specPath).href)) as Record<string, unknown>;
    const specExportName = `${componentName}Spec`;
    const rawSpec = module[specExportName] as ComponentSpecFormat | LegacySpecFormat | undefined;
    if (!rawSpec) continue;

    const normalized =
      "variants" in rawSpec
        ? normalizeFromComponentSpec(rawSpec as ComponentSpecFormat)
        : normalizeFromLegacySpec(componentName, rawSpec as LegacySpecFormat);

    normalized.source = `src/design-system/components/${componentName}/${componentName}.spec.ts`;
    if (!normalized.name) normalized.name = componentName;
    applyCanonicalPropNames(normalized);
    normalized.composition = {
      allowedChildren: [...(CompositionRules.allowedChildrenByParent[componentName] ?? [])],
      allowedParents: [...(CompositionRules.allowedParentsByChild[componentName] ?? [])],
      disallowedChildren: [...(disallowedChildrenByParent[componentName] ?? [])],
    };
    apiItems[componentName] = normalized;
  }

  const sortedEntries = Object.entries(apiItems).sort(([a], [b]) => a.localeCompare(b));
  const apiJson = {
    contractName: "uds.ai.component-api",
    schemaVersion: AI_COMPONENT_API_SCHEMA_VERSION,
    compositionRules: CompositionRules,
    components: Object.fromEntries(sortedEntries),
  };

  const tsBody = `/* eslint-disable */
// AUTO-GENERATED by scripts/generate-api-artifacts.ts
// Do not edit manually.

export const COMPONENT_API = ${JSON.stringify(apiJson.components, null, 2)} as const;

export type ComponentApiMap = typeof COMPONENT_API;
export type ComponentName = keyof ComponentApiMap;
export type ComponentApi = ComponentApiMap[ComponentName];
`;

  const docsLines: string[] = [
    "# Generated Component API",
    "",
    "This file is generated from `src/design-system/components/*/*.spec.ts`.",
    "",
    "## Components",
    "",
  ];

  for (const [componentName, item] of sortedEntries) {
    docsLines.push(`### ${componentName}`);
    docsLines.push("");
    if (item.purpose) docsLines.push(item.purpose, "");
    docsLines.push(`- Source: \`${item.source}\``);
    if (typeof item.tier === "number") docsLines.push(`- Tier: \`${item.tier}\``);
    if (item.states.length > 0) docsLines.push(`- States: \`${item.states.join("`, `")}\``);
    if (item.composition.allowedParents.length > 0) {
      docsLines.push(`- Allowed parents: \`${item.composition.allowedParents.join("`, `")}\``);
    }
    if (item.composition.allowedChildren.length > 0) {
      docsLines.push(`- Allowed children: \`${item.composition.allowedChildren.join("`, `")}\``);
    }
    if (item.composition.disallowedChildren.length > 0) {
      docsLines.push(`- Disallowed children: \`${item.composition.disallowedChildren.join("`, `")}\``);
    }
    const aliasEntries = Object.entries(item.aliases.props);
    if (aliasEntries.length > 0) {
      docsLines.push(`- Canonical prop aliases: \`${aliasEntries.map(([alias, canonical]) => `${alias} -> ${canonical}`).join("`, `")}\``);
    }
    if (item.ambiguity.propNameCollisions.length > 0) {
      docsLines.push(`- Ambiguous prop collisions: \`${item.ambiguity.propNameCollisions.join("`, `")}\``);
    }
    docsLines.push("");
    docsLines.push("| Prop | Type | Allowed Values | Default |");
    docsLines.push("| --- | --- | --- | --- |");

    const propEntries = Object.entries(item.props).sort(([a], [b]) => a.localeCompare(b));
    if (propEntries.length === 0) {
      docsLines.push("| _none_ | - | - | - |");
    } else {
      for (const [propName, prop] of propEntries) {
        const values = prop.values && prop.values.length > 0 ? prop.values.join(", ") : "-";
        const defaultValue = prop.default === undefined ? "-" : String(prop.default);
        docsLines.push(
          `| \`${escapeMarkdown(propName)}\` | \`${prop.type}\` | ${escapeMarkdown(values)} | \`${escapeMarkdown(defaultValue)}\` |`
        );
      }
    }
    docsLines.push("");
  }

  const examples = sortedEntries.map(([componentName, item]) => {
    const props = item.defaults;
    const attrParts = Object.entries(props).map(([propName, value]) => {
      if (typeof value === "boolean") return value ? propName : `${propName}={false}`;
      if (typeof value === "number") return `${propName}={${value}}`;
      return `${propName}="${value}"`;
    });

    return {
      component: componentName,
      props,
      jsx: `<${componentName}${attrParts.length ? ` ${attrParts.join(" ")}` : ""} />`,
    };
  });

  await mkdir(generatedDir, { recursive: true });
  await mkdir(docsGeneratedDir, { recursive: true });
  await mkdir(aiExamplesDir, { recursive: true });

  await writeFile(resolve(generatedDir, "component-api.json"), `${JSON.stringify(apiJson, null, 2)}\n`, "utf8");
  await writeFile(resolve(generatedDir, "component-api.ts"), `${tsBody}\n`, "utf8");
  await writeFile(resolve(docsGeneratedDir, "component-api.md"), `${docsLines.join("\n")}\n`, "utf8");
  await writeFile(resolve(aiExamplesDir, "generated.component.examples.json"), `${JSON.stringify(examples, null, 2)}\n`, "utf8");

  console.log("Generated API artifacts:");
  console.log(`- ${resolve(generatedDir, "component-api.json")}`);
  console.log(`- ${resolve(generatedDir, "component-api.ts")}`);
  console.log(`- ${resolve(docsGeneratedDir, "component-api.md")}`);
  console.log(`- ${resolve(aiExamplesDir, "generated.component.examples.json")}`);
}

await generate();
