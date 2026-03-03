import type { UINodeTree } from "../manifest/types";
import type { PolicyViolation } from "../policies/policy.types";

const createViolation = (code: string, message: string, path: string): PolicyViolation => ({
  severity: "error",
  code,
  message,
  path,
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const validateNode = (node: unknown, path: string, violations: PolicyViolation[]) => {
  if (!isRecord(node)) {
    violations.push(createViolation("SCHEMA_NODE_OBJECT", "Node must be an object.", path));
    return;
  }
  if (typeof node.type !== "string" || node.type.trim().length === 0) {
    violations.push(createViolation("SCHEMA_NODE_TYPE", "Node.type must be a non-empty string.", `${path}.type`));
  }
  if (node.props != null && !isRecord(node.props)) {
    violations.push(createViolation("SCHEMA_NODE_PROPS", "Node.props must be an object when provided.", `${path}.props`));
  }
  if (node.children != null && !Array.isArray(node.children)) {
    violations.push(createViolation("SCHEMA_NODE_CHILDREN", "Node.children must be an array when provided.", `${path}.children`));
    return;
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child, index) => validateNode(child, `${path}.children[${index}]`, violations));
  }
};

export function validateSchema(output: unknown): { valid: boolean; violations: PolicyViolation[]; tree?: UINodeTree } {
  const violations: PolicyViolation[] = [];
  const payload = isRecord(output) ? output : undefined;
  const candidateTree = payload?.tree ?? output;

  validateNode(candidateTree, "root", violations);
  if (violations.length > 0) {
    return { valid: false, violations };
  }

  return {
    valid: true,
    violations,
    tree: candidateTree as UINodeTree,
  };
}
