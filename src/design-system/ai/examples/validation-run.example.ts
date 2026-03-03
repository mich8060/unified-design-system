import { UDSGovernance } from "../manifest/governance.manifest";
import type { UINodeTree } from "../manifest/types";
import { validateAIOutput } from "../validation/validateAIOutput";

export const StrictModeFailureTree: UINodeTree = {
  type: "Container",
  children: [
    { type: "Button", props: { appearance: "primary", label: "Save" } },
    { type: "Button", props: { appearance: "primary", label: "Publish" } },
    { type: "div", props: { style: { color: "#ff0000" } } },
  ],
};

export const strictModeFailureExample = validateAIOutput(
  { tree: StrictModeFailureTree },
  {
    ...UDSGovernance,
    enforcement: {
      ...UDSGovernance.enforcement,
      strictMode: true,
    },
  }
);
