import type { UINodeTree } from "../manifest/types";

export const ValidAuthFormTree: UINodeTree = {
  type: "Container",
  props: { gap: "--uds-spacing-24" },
  children: [
    {
      type: "Container",
      props: { gap: "--uds-spacing-16" },
      children: [
        { type: "Text", props: { variant: "heading-24" } },
        {
          type: "Field",
          children: [{ type: "TextInput", props: { iconPosition: "left" } }],
        },
        {
          type: "Field",
          children: [{ type: "TextInput", props: { type: "password" } }],
        },
        { type: "Button", props: { appearance: "primary", label: "Sign in" } },
      ],
    },
  ],
};

export const InvalidPrimaryActionTree: UINodeTree = {
  type: "Container",
  children: [
    { type: "Button", props: { appearance: "primary", label: "Save" } },
    { type: "Button", props: { appearance: "primary", label: "Publish" } },
  ],
};
