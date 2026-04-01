import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Layout } from "./Layout";

// ---------------------------------------------------------------------------
// Shared helper: coloured box to make layout behaviour visible
// ---------------------------------------------------------------------------
const Box = ({
  label,
  colorIndex = 0,
  style,
}: {
  label?: string;
  colorIndex?: number;
  style?: React.CSSProperties;
}) => {
  const colors = [
    "var(--uds-color-brand-primary)",
    "var(--uds-color-status-positive)",
    "var(--uds-color-status-warning)",
    "var(--uds-color-status-critical)",
    "var(--uds-color-status-info)",
  ];

  return (
    <div
      style={{
        background: colors[colorIndex % colors.length],
        color: "var(--uds-color-text-on-primary, #fff)",
        padding: "var(--uds-spacing-12) var(--uds-spacing-16)",
        borderRadius: "var(--uds-border-radius-4)",
        fontFamily: "var(--uds-font-family-body)",
        fontSize: "var(--uds-font-size-14)",
        fontWeight: "var(--uds-font-weight-semibold)",
        textAlign: "center",
        ...style,
      }}
    >
      {label ?? "Box"}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: "Components/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Layout is the primary structural primitive, built on CSS flexbox with design-system spacing tokens.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "Main axis direction.",
      table: { defaultValue: { summary: "row" } },
    },
    justifyContent: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
      description: "Alignment along the main axis.",
    },
    alignItems: {
      control: "select",
      options: ["stretch", "flex-start", "center", "flex-end", "baseline"],
      description: "Alignment along the cross axis.",
    },
    appearance: {
      control: "select",
      options: ["full", "equal", "right", "left"],
      description: "Column width distribution preset.",
      table: { defaultValue: { summary: "full" } },
    },
    wrap: {
      control: "select",
      options: [true, false, "wrap", "nowrap", "wrap-reverse"],
      description: "Whether children wrap.",
    },
    gap: {
      control: "select",
      options: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "24", "32", "48", "64", "80"],
      description: "Gap between children using a spacing token.",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretch to 100% of parent width.",
      table: { defaultValue: { summary: "false" } },
    },
    fullHeight: {
      control: "boolean",
      description: "Stretch to 100% of parent height.",
      table: { defaultValue: { summary: "false" } },
    },
    inline: {
      control: "boolean",
      description: "Use inline-flex instead of flex.",
      table: { defaultValue: { summary: "false" } },
    },
    itemsPerRow: {
      control: { type: "number", min: 1, max: 12 },
      description: "Force N items per row (enables wrap automatically).",
    },
    as: {
      control: "text",
      description: "Polymorphic root element.",
    },
    shrink: {
      control: { type: "number", min: 0 },
      description: "flex-shrink value.",
    },
    grow: {
      control: { type: "number", min: 0 },
      description: "flex-grow value.",
    },
  },
  args: {
    direction: "row",
    gap: "16",
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: "Default (Row)",
  args: {
    direction: "row",
    gap: "16",
    alignItems: "center",
  },
  render: (args) => (
    <Layout {...args}>
      <Box label="Column 1" colorIndex={0} />
      <Box label="Column 2" colorIndex={1} />
      <Box label="Column 3" colorIndex={2} />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three equal-height blocks laid out in a row with a 16px token gap.",
      },
    },
  },
};

export const ColumnStack: Story = {
  name: "Column Stack",
  args: {
    direction: "column",
    gap: "12",
    fullWidth: true,
  },
  render: (args) => (
    <Layout {...args}>
      <Box label="Row 1" colorIndex={0} />
      <Box label="Row 2" colorIndex={1} />
      <Box label="Row 3" colorIndex={2} />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story: "Items stacked vertically using `direction=\"column\"`.",
      },
    },
  },
};

export const TwoEqualColumns: Story = {
  name: "Two Equal Columns",
  args: {
    direction: "row",
    gap: "16",
    appearance: "equal",
    fullWidth: true,
  },
  render: (args) => (
    <Layout {...args}>
      <Box label="Left Panel" colorIndex={0} style={{ padding: "var(--uds-spacing-24)" }} />
      <Box label="Right Panel" colorIndex={1} style={{ padding: "var(--uds-spacing-24)" }} />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`appearance=\"equal\"` makes both children exactly the same width — ideal for split-panel layouts.",
      },
    },
  },
};

export const SidebarLeft: Story = {
  name: "Sidebar Left (appearance: right)",
  args: {
    direction: "row",
    gap: "16",
    appearance: "right",
    fullWidth: true,
    alignItems: "stretch",
  },
  render: (args) => (
    <Layout {...args}>
      <Box
        label="Sidebar"
        colorIndex={3}
        style={{ padding: "var(--uds-spacing-24)", minHeight: 120 }}
      />
      <Box
        label="Main Content Area"
        colorIndex={0}
        style={{ padding: "var(--uds-spacing-24)", minHeight: 120 }}
      />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`appearance=\"right\"` biases column widths so the first child is narrow and the second (main content) is wide.",
      },
    },
  },
};

export const SidebarRight: Story = {
  name: "Sidebar Right (appearance: left)",
  args: {
    direction: "row",
    gap: "16",
    appearance: "left",
    fullWidth: true,
    alignItems: "stretch",
  },
  render: (args) => (
    <Layout {...args}>
      <Box
        label="Main Content Area"
        colorIndex={0}
        style={{ padding: "var(--uds-spacing-24)", minHeight: 120 }}
      />
      <Box
        label="Sidebar"
        colorIndex={3}
        style={{ padding: "var(--uds-spacing-24)", minHeight: 120 }}
      />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`appearance=\"left\"` biases column widths so the first (main) child is wide and the last (sidebar) is narrow.",
      },
    },
  },
};

export const WrappingGrid: Story = {
  name: "Wrapping / Auto-Grid",
  args: {
    direction: "row",
    gap: "12",
    wrap: true,
    fullWidth: true,
  },
  render: (args) => (
    <Layout {...args}>
      {Array.from({ length: 10 }, (_, i) => (
        <Box key={i} label={`Card ${i + 1}`} colorIndex={i % 5} />
      ))}
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story: "With `wrap={true}` items that exceed the container width flow onto new rows.",
      },
    },
  },
};

export const ItemsPerRow: Story = {
  name: "Items Per Row (3-Column Grid)",
  args: {
    direction: "row",
    gap: "12",
    itemsPerRow: 3,
    fullWidth: true,
  },
  render: (args) => (
    <Layout {...args}>
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} label={`Cell ${i + 1}`} colorIndex={i % 5} style={{ padding: "var(--uds-spacing-24)" }} />
      ))}
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`itemsPerRow={3}` automatically enables wrap and sizes each child to span exactly 1/3 of the container — no custom CSS needed.",
      },
    },
  },
};

export const FillSubcomponent: Story = {
  name: "Layout.Fill (Greedy Child)",
  render: () => (
    <Layout direction="row" gap="8" alignItems="center" fullWidth>
      <Box label="Fixed" colorIndex={0} />
      <Layout.Fill>
        <Box
          label="Fills remaining space"
          colorIndex={2}
          style={{ width: "100%" }}
        />
      </Layout.Fill>
      <Box label="Fixed" colorIndex={3} />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<Layout.Fill>` expands to consume all available space, pinning its siblings to the edges.",
      },
    },
  },
};

export const NestedLayouts: Story = {
  name: "Nested Layouts",
  render: () => (
    <Layout direction="column" gap="16" fullWidth>
      {/* Top bar */}
      <Layout direction="row" gap="8" justifyContent="space-between" alignItems="center" fullWidth>
        <Box label="Logo" colorIndex={0} />
        <Layout direction="row" gap="8">
          <Box label="Nav 1" colorIndex={1} />
          <Box label="Nav 2" colorIndex={1} />
          <Box label="Nav 3" colorIndex={1} />
        </Layout>
        <Box label="CTA" colorIndex={2} />
      </Layout>
      {/* Body */}
      <Layout direction="row" gap="16" fullWidth alignItems="stretch">
        <Box label="Sidebar" colorIndex={3} style={{ padding: "var(--uds-spacing-32)", minHeight: 120 }} />
        <Layout.Fill>
          <Layout direction="column" gap="12" fullWidth>
            <Box label="Content Block A" colorIndex={0} style={{ padding: "var(--uds-spacing-24)" }} />
            <Box label="Content Block B" colorIndex={4} style={{ padding: "var(--uds-spacing-24)" }} />
          </Layout>
        </Layout.Fill>
      </Layout>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Layouts compose naturally. This example nests a top bar and a sidebar/content split inside a column layout.",
      },
    },
  },
};

export const SpacingProps: Story = {
  name: "Margin & Padding Helpers (mt / mb / pl)",
  render: () => (
    <div
      style={{
        background: "var(--uds-color-surface-secondary)",
        padding: "var(--uds-spacing-4)",
        borderRadius: "var(--uds-border-radius-4)",
      }}
    >
      <Layout direction="column" gap="0">
        <Box label="No margin" colorIndex={0} />
        <Layout direction="row" gap="8" mt="16" mb="8">
          <Box label="mt=16" colorIndex={1} />
          <Box label="mb=8" colorIndex={2} />
        </Layout>
        <Box label="Baseline" colorIndex={3} />
      </Layout>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`mt` and `mb` accept spacing token values and translate to `marginTop` / `marginBottom` via CSS custom properties.",
      },
    },
  },
};

export const CenteredContent: Story = {
  name: "Centered Content",
  args: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "16",
    style: { minHeight: 160, background: "var(--uds-color-surface-secondary)", borderRadius: "var(--uds-border-radius-8)" },
  },
  render: (args) => (
    <Layout {...args}>
      <Box label="Centered A" colorIndex={0} />
      <Box label="Centered B" colorIndex={1} />
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`justifyContent=\"center\"` combined with `alignItems=\"center\"` centres children both horizontally and vertically.",
      },
    },
  },
};
