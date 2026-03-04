import { ComponentRegistry } from "../manifest/components.manifest";
import { UDSGovernance, getVersionLineage } from "../manifest/governance.manifest";
import { UDSManifest } from "../manifest/system.manifest";
import type { GovernanceConfig, VersionLineage } from "../manifest/types";
import { getCanonicalPropName } from "../manifest/prop-aliases.manifest";
import { validateAIOutput, type AIValidationResult } from "../validation/validateAIOutput";

export interface CanonicalizedPropsResult {
  canonicalProps: Record<string, unknown>;
  aliasesApplied: Record<string, string>;
}

export interface UDSRuntimeHelperSDK {
  readonly governance: GovernanceConfig;
  getVersionLineage(): VersionLineage;
  getManifest(): typeof UDSManifest;
  getComponent(componentName: string): (typeof ComponentRegistry)[string] | undefined;
  canonicalizeProps(componentName: string, props: Record<string, unknown>): CanonicalizedPropsResult;
  validate(output: unknown): AIValidationResult;
  validateOrThrow(output: unknown): AIValidationResult;
}

export interface CreateUDSRuntimeHelperSDKOptions {
  governance?: GovernanceConfig;
}

export function createUDSRuntimeHelperSDK(
  options: CreateUDSRuntimeHelperSDKOptions = {}
): UDSRuntimeHelperSDK {
  const governance = options.governance ?? UDSGovernance;

  return {
    governance,
    getVersionLineage: () => getVersionLineage(),
    getManifest: () => UDSManifest,
    getComponent: (componentName) => ComponentRegistry[componentName],
    canonicalizeProps(componentName, props) {
      const canonicalProps: Record<string, unknown> = {};
      const aliasesApplied: Record<string, string> = {};
      for (const [rawName, value] of Object.entries(props)) {
        const canonicalName = getCanonicalPropName(componentName, rawName);
        canonicalProps[canonicalName] = value;
        if (canonicalName !== rawName) {
          aliasesApplied[rawName] = canonicalName;
        }
      }
      return {
        canonicalProps,
        aliasesApplied,
      };
    },
    validate(output) {
      return validateAIOutput(output, governance);
    },
    validateOrThrow(output) {
      const result = validateAIOutput(output, governance);
      if (result.status === "pass") {
        return result;
      }

      const fallback = `Validation failed with ${result.violations.length} error(s).`;
      const summary = result.deterministicFeedback?.summary ?? fallback;
      const fingerprint = result.deterministicFeedback?.fingerprint;
      const lines = [`[UDS AI SDK] ${summary}`];
      if (fingerprint) {
        lines.push(`Fingerprint: ${fingerprint}`);
      }
      throw new Error(lines.join("\n"));
    },
  };
}
