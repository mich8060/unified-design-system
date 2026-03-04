import type { PolicyViolation } from "../policies/policy.types";

export interface DeterministicViolationFeedback {
  id: string;
  code: string;
  path: string;
  message: string;
  fix: string;
  severity: "error" | "warning";
}

const FIX_HINTS: Record<string, string> = {
  SCHEMA_NODE_OBJECT: "Return each tree node as an object with type/props/children keys.",
  SCHEMA_NODE_TYPE: "Set node.type to a non-empty UDS component name.",
  SCHEMA_NODE_PROPS: "Provide node.props as a plain object.",
  SCHEMA_NODE_CHILDREN: "Provide node.children as an array of child nodes.",
  RULE_UNKNOWN_COMPONENT: "Replace unknown components with supported UDS components.",
  RULE_RAW_HTML_DISALLOWED: "Use UDS components instead of raw HTML tags.",
  RULE_INVALID_COMPOSITION: "Use only allowed child components for the parent component.",
  RULE_INVALID_PARENT_COMPOSITION: "Move the component under one of its allowed parent components.",
  RULE_DISALLOWED_NESTING: "Remove or refactor disallowed parent/child nesting.",
  RULE_MAX_PRIMARY_ACTIONS: "Keep at most one primary Button per section.",
  RULE_SPACING_TOKEN_ONLY: "Use --uds-spacing-* tokens for spacing-related props.",
  RULE_UNKNOWN_SPACING_TOKEN: "Replace unknown spacing token with an allowed spacing token.",
  RULE_AMBIGUOUS_PROP_ALIAS: "Replace ambiguous alias props with canonical prop names.",
  RULE_VERSION_MISMATCH_MANIFESTVERSION: "Set manifestVersion to the current manifest contract version.",
  RULE_VERSION_MISMATCH_GOVERNANCEVERSION: "Set governanceVersion to the current governance version.",
  RULE_VERSION_MISMATCH_POLICYVERSION: "Set policyVersion to the current policy version.",
  RULE_MAX_NESTING_DEPTH: "Reduce UI nesting depth to stay within governance limits.",
  RULE_INLINE_STYLE_DISALLOWED: "Remove inline styles and use tokenized component props.",
  DRIFT_UNKNOWN_COMPONENT: "Align with ComponentRegistry component names.",
  DRIFT_DISALLOWED_NESTING: "Align nesting with layout disallowed pair rules.",
  DRIFT_MARGIN_USAGE: "Replace margin usage with composition spacing tokens.",
  DRIFT_INLINE_STYLE: "Replace inline style usage with UDS tokenized styling.",
  DRIFT_UNKNOWN_TOKEN: "Use a known token from the published UDS token contract.",
  DRIFT_HARDCODED_COLOR: "Replace color literals with semantic UDS tokens.",
};

const stableCompare = (a: string | undefined, b: string | undefined): number =>
  String(a ?? "").localeCompare(String(b ?? ""));

const stableSerializeViolation = (violation: PolicyViolation): string =>
  [
    violation.severity,
    violation.code,
    violation.path,
    violation.component ?? "",
    violation.token ?? "",
    violation.message,
  ].join("|");

const hashString = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
};

export function sortAndDedupeViolations(violations: PolicyViolation[]): PolicyViolation[] {
  const sorted = [...violations].sort((left, right) => {
    const severityDiff = stableCompare(left.severity, right.severity);
    if (severityDiff !== 0) return severityDiff;
    const codeDiff = stableCompare(left.code, right.code);
    if (codeDiff !== 0) return codeDiff;
    const pathDiff = stableCompare(left.path, right.path);
    if (pathDiff !== 0) return pathDiff;
    const componentDiff = stableCompare(left.component, right.component);
    if (componentDiff !== 0) return componentDiff;
    const tokenDiff = stableCompare(left.token, right.token);
    if (tokenDiff !== 0) return tokenDiff;
    return stableCompare(left.message, right.message);
  });

  const deduped: PolicyViolation[] = [];
  const seen = new Set<string>();
  for (const violation of sorted) {
    const key = stableSerializeViolation(violation);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(violation);
  }
  return deduped;
}

export function buildDeterministicFeedback(
  violations: PolicyViolation[]
): {
  fingerprint: string;
  summary: string;
  items: DeterministicViolationFeedback[];
} {
  const canonical = sortAndDedupeViolations(violations);
  const rawFingerprint = canonical.map(stableSerializeViolation).join("||");
  const fingerprint = `fb-${hashString(rawFingerprint)}`;
  const items = canonical.map((violation) => ({
    id: `${violation.code}:${violation.path}:${hashString(stableSerializeViolation(violation))}`,
    code: violation.code,
    path: violation.path,
    message: violation.message,
    fix: FIX_HINTS[violation.code] ?? "Apply governance-compliant correction for this violation.",
    severity: violation.severity,
  }));
  const summary = `${items.length} deterministic violation(s)`;
  return { fingerprint, summary, items };
}
