import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { AI_CONTRACT_SCHEMA_VERSION, UDSGovernance } from "../src/ai/manifest/governance.manifest.ts";
import { UDS_RUNTIME_VERSION } from "../src/design-system/version.ts";
import { ComponentRegistry as PublicComponentRegistry } from "../src/ai/manifest/components.manifest.ts";
import { ComponentRegistry as RuntimeComponentRegistry } from "../src/design-system/ai/manifest/components.manifest.ts";
import { LayoutRules } from "../src/design-system/ai/manifest/layout.manifest.ts";
import { UDS_TOKEN_INTENTS } from "../src/design-system/ai/token-intents.ts";

type Primitive = string | number | boolean | null;

interface ContractProp {
  type: "enum" | "boolean" | "string" | "number";
  values?: string[];
  default?: Primitive;
}

interface GeneratedComponentApiItem {
  props: Record<string, ContractProp>;
  defaults?: Record<string, Primitive>;
  states?: string[];
  purpose?: string;
  tier?: number;
  tokensUsed?: string[];
  composition?: {
    allowedChildren?: string[];
    allowedParents?: string[];
    disallowedChildren?: string[];
  };
}

async function buildContract(): Promise<Record<string, unknown>> {
  const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
  const componentApiPath = resolve(rootDir, "src", "design-system", "generated", "component-api.json");
  const componentApiJson = JSON.parse(await readFile(componentApiPath, "utf8")) as {
    compositionRules?: {
      allowedChildrenByParent?: Record<string, string[]>;
      allowedParentsByChild?: Record<string, string[]>;
      disallowedPairs?: Array<{ parent: string; child: string; reason?: string }>;
    };
    components?: Record<string, GeneratedComponentApiItem>;
  };
  const generatedApi = componentApiJson.components ?? {};
  const generatedComposition = componentApiJson.compositionRules ?? {};
  const componentNames = Object.keys(PublicComponentRegistry).sort();
  const components: Record<string, unknown> = {};

  for (const componentName of componentNames) {
    const publicMeta = (PublicComponentRegistry as Record<string, any>)[componentName] ?? {};
    const runtimeMeta = (RuntimeComponentRegistry as Record<string, any>)[componentName] ?? {};
    const generatedSpec = generatedApi[componentName];
    const normalized = {
      props: ((generatedSpec?.props ?? {}) as Record<string, ContractProp>),
      states: generatedSpec?.states ?? [],
    };

    const disallowedChildren = (
      generatedComposition.disallowedPairs ??
      (LayoutRules.disallowedNesting ?? []).map((entry) => ({ parent: entry.parent, child: entry.child }))
    )
      .filter((rule) => rule.parent === componentName)
      .map((rule) => rule.child);

    components[componentName] = {
      name: componentName,
      category: publicMeta.category ?? runtimeMeta.category ?? "unknown",
      intent: publicMeta.intent ?? runtimeMeta.intent ?? "",
      purpose: generatedSpec?.purpose ?? null,
      tier: generatedSpec?.tier ?? null,
      description: publicMeta.description ?? null,
      roles: publicMeta.roles ?? (runtimeMeta.accessibility ? [runtimeMeta.accessibility.role] : []),
      slots: runtimeMeta.slots ?? null,
      states: normalized.states,
      props: normalized.props,
      defaults: Object.fromEntries(
        Object.entries(normalized.props)
          .filter(([, value]) => value.default !== undefined)
          .map(([key, value]) => [key, value.default])
      ),
      composition: {
        preferredParents: publicMeta.preferredParent ?? [],
        allowedChildren: generatedSpec?.composition?.allowedChildren ?? generatedComposition.allowedChildrenByParent?.[componentName] ?? [],
        allowedParents: generatedSpec?.composition?.allowedParents ?? generatedComposition.allowedParentsByChild?.[componentName] ?? [],
        disallowedChildren,
        constraints: runtimeMeta.constraints ?? null,
      },
      tokens: {
        allowed: runtimeMeta.tokenDependencies ?? generatedSpec?.tokensUsed ?? [],
      },
    };
  }

  return {
    contractName: "uds.ai.contract",
    schemaVersion: AI_CONTRACT_SCHEMA_VERSION,
    systemVersion: UDS_RUNTIME_VERSION,
    tokenVersion: UDSGovernance.tokenVersion,
    manifestVersion: UDSGovernance.manifestVersion,
    governanceVersion: UDSGovernance.governanceVersion,
    policyVersion: UDSGovernance.policyVersion,
    versioning: {
      schema: AI_CONTRACT_SCHEMA_VERSION,
      manifest: UDSGovernance.manifestVersion,
      governance: UDSGovernance.governanceVersion,
      policy: UDSGovernance.policyVersion,
      token: UDSGovernance.tokenVersion,
      system: UDS_RUNTIME_VERSION,
    },
    components,
    compositionRules: {
      spacingSystem: LayoutRules.spacingSystem,
      verticalRhythm: LayoutRules.verticalRhythm,
      allowedComposition: generatedComposition.allowedChildrenByParent ?? LayoutRules.allowedComposition,
      allowedParents: generatedComposition.allowedParentsByChild ?? LayoutRules.allowedParents,
      disallowedNesting:
        generatedComposition.disallowedPairs?.map(({ parent, child }) => ({ parent, child })) ??
        LayoutRules.disallowedNesting,
      actionPlacement: LayoutRules.actionPlacement,
      maxWidth: LayoutRules.maxWidth,
      maxNestingDepth: UDSGovernance.limits.maxNestingDepth,
    },
    tokenIntents: Object.fromEntries(UDS_TOKEN_INTENTS.map((entry) => [entry.intent, entry.tokens])),
  };
}

const rootDir = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const srcOutputPath = resolve(rootDir, "src", "ai", "manifest", "manifest.json");
const distOutputPath = resolve(rootDir, "dist", "ai", "manifest.json");

const contract = await buildContract();
const payload = `${JSON.stringify(contract, null, 2)}\n`;

await mkdir(dirname(srcOutputPath), { recursive: true });
await mkdir(dirname(distOutputPath), { recursive: true });
await writeFile(srcOutputPath, payload, "utf8");
await writeFile(distOutputPath, payload, "utf8");

console.log("Generated AI contract manifest:");
console.log(`- ${srcOutputPath}`);
console.log(`- ${distOutputPath}`);
