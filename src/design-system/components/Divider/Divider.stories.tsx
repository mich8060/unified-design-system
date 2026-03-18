import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Divider from "./Divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["line", "solid"],
      description:
        "Visual style — 'line' renders a thin horizontal rule (supports label/icon), 'solid' renders an 8px solid block separator",
      table: { defaultValue: { summary: "line" } },
    },
    label: {
      control: "text",
      description: "Optional text to display on the divider (line variant only)",
    },
    icon: {
      control: "text",
      description:
        "Icon name from the Icon library to display on the divider (line variant only)",
    },
    alignment: {
      control: "radio",
      options: ["left", "center", "right"],
      description: "Horizontal alignment of the label/icon content",
      table: { defaultValue: { summary: "center" } },
    },
    labelWithIcon: {
      control: "boolean",
      description:
        "Render the icon inline inside the label text (e.g., an icon preceding the label)",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    variant: "line",
    alignment: "center",
    labelWithIcon: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", maxWidth: "560px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Plain Line",
  args: {
    variant: "line",
  },
};

export const WithLabel: Story = {
  name: "Line with Center Label",
  args: {
    variant: "line",
    label: "Or continue with",
    alignment: "center",
  },
};

export const LabelAlignedLeft: Story = {
  name: "Label — Left Aligned",
  args: {
    variant: "line",
    label: "Section Title",
    alignment: "left",
  },
};

export const LabelAlignedRight: Story = {
  name: "Label — Right Aligned",
  args: {
    variant: "line",
    label: "End of Section",
    alignment: "right",
  },
};

export const WithIconOnly: Story = {
  name: "Icon Only (No Label)",
  args: {
    variant: "line",
    icon: "Plus",
    alignment: "center",
  },
};

export const WithLabelAndIcon: Story = {
  name: "Label + Icon (Icon After Label)",
  args: {
    variant: "line",
    label: "Add Section",
    icon: "Plus",
    alignment: "center",
    labelWithIcon: false,
  },
};

export const LabelWithInlineIcon: Story = {
  name: "Label with Inline Icon (Icon Before Label)",
  args: {
    variant: "line",
    label: "Add New Item",
    icon: "Plus",
    alignment: "center",
    labelWithIcon: true,
  },
};

export const Solid: Story = {
  name: "Solid Variant",
  args: {
    variant: "solid",
  },
};

export const AllAlignments: Story = {
  name: "All Label Alignments",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Divider variant="line" label="Left aligned" alignment="left" />
      <Divider variant="line" label="Center aligned" alignment="center" />
      <Divider variant="line" label="Right aligned" alignment="right" />
    </div>
  ),
};

export const LineVsSolid: Story = {
  name: "Line vs Solid Comparison",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <p style={{ margin: 0 }}>Content above a line divider</p>
      <Divider variant="line" />
      <p style={{ margin: 0 }}>Content above a solid divider</p>
      <Divider variant="solid" />
      <p style={{ margin: 0 }}>Content below</p>
    </div>
  ),
};
