import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Flex } from "./index";

// ---------------------------------------------------------------------------
// Shared helper: colored box used to make flex behaviour visible
// ---------------------------------------------------------------------------
const Box = ({
  label,
  color = "var(--uds-color-brand-primary)",
  style,
}: {
  label?: string;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: color,
      color: "var(--uds-color-text-on-primary, #fff)",
      padding: "var(--uds-spacing-8) var(--uds-spacing-12)",
      borderRadius: "var(--uds-border-radius-4)",
      fontFamily: "var(--uds-font-family-body)",
      fontSize: "var(--uds-font-size-14)",
      fontWeight: "var(--uds-font-weight-semibold)",
      minWidth: 60,
      textAlign: "center",
      ...style,
    }}
  >
    {label ?? "Box"}
  </div>
);

const COLORS = [
  "var(--uds-color-brand-primary)",
  "var(--uds-color-brand-secondary, var(--uds-color-brand-primary))",
  "var(--uds-color-status-positive)",
  "var(--uds-color-status-warning)",
  "var(--uds-color-status-critical)",
];

const ColoredBoxes = ({ count = 4 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <Box key={i} label={`Item ${i + 1}`} color={COLORS[i % COLORS.length]} />
    ))}
  </>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: "Components/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Flex is the primary layout primitive. It wraps CSS flexbox using design-system spacing tokens and exposes only supported values.",
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
      table: { defaultValue: { summary: "stretch" } },
    },
    wrap: {
      control: "select",
      options: [true, false, "wrap", "nowrap", "wrap-reverse"],
      description: "Whether children wrap onto multiple lines.",
      table: { defaultValue: { summary: "false" } },
    },
    gap: {
      control: "select",
      options: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "24", "32", "48", "64", "80"],
      description: "Gap between children — must be a supported spacing token value.",
    },
    appearance: {
      control: "select",
      options: ["full", "equal", "right", "left"],
      description: "Column-width distribution preset.",
      table: { defaultValue: { summary: "full" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Stretches the container to 100% of its parent width.",
      table: { defaultValue: { summary: "false" } },
    },
    fullHeight: {
      control: "boolean",
      description: "Stretches the container to 100% of its parent height.",
      table: { defaultValue: { summary: "false" } },
    },
    inline: {
      control: "boolean",
      description: "Renders as an inline-flex container.",
      table: { defaultValue: { summary: "false" } },
    },
    itemsPerRow: {
      control: { type: "number", min: 1, max: 12 },
      description: "When direction=row, forces N items per row by enabling wrap automatically.",
    },
    as: {
      control: "text",
      description: "Polymorphic root element (div, section, ul, etc.).",
    },
    mt: {
      control: "select",
      options: ["0", "4", "8", "12", "16", "24", "32"],
      description: "Margin-top using a spacing token.",
    },
    mb: {
      control: "select",
      options: ["0", "4", "8", "12", "16", "24", "32"],
      description: "Margin-bottom using a spacing token.",
    },
  },
  args: {
    direction: "row",
    gap: "16",
  },
} satisfies Meta<typeof Flex>;

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
    <Flex {...args}>
      <ColoredBoxes count={4} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic row with four items and a `gap` of 16.",
      },
    },
  },
};

export const ColumnDirection: Story = {
  name: "Column Direction",
  args: {
    direction: "column",
    gap: "12",
  },
  render: (args) => (
    <Flex {...args}>
      <ColoredBoxes count={4} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "Items stacked vertically using `direction=\"column\"`.",
      },
    },
  },
};

export const JustifyContentVariants: Story = {
  name: "Justify-Content Variants",
  render: () => (
    <Flex direction="column" gap="16">
      {(["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] as const).map(
        (justify) => (
          <div key={justify}>
            <p style={{ fontFamily: "var(--uds-font-family-body)", fontSize: "var(--uds-font-size-12)", marginBottom: 4 }}>
              {justify}
            </p>
            <Flex
              direction="row"
              gap="8"
              justifyContent={justify}
              fullWidth
              style={{ background: "var(--uds-color-surface-secondary)", padding: "var(--uds-spacing-8)", borderRadius: "var(--uds-border-radius-4)" }}
            >
              <ColoredBoxes count={3} />
            </Flex>
          </div>
        )
      )}
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "All six `justifyContent` values displayed side-by-side for easy comparison.",
      },
    },
  },
};

export const AlignItemsVariants: Story = {
  name: "Align-Items Variants",
  render: () => (
    <Flex direction="column" gap="16">
      {(["stretch", "flex-start", "center", "flex-end", "baseline"] as const).map((align) => (
        <div key={align}>
          <p style={{ fontFamily: "var(--uds-font-family-body)", fontSize: "var(--uds-font-size-12)", marginBottom: 4 }}>
            {align}
          </p>
          <Flex
            direction="row"
            gap="8"
            alignItems={align}
            style={{
              background: "var(--uds-color-surface-secondary)",
              padding: "var(--uds-spacing-8)",
              borderRadius: "var(--uds-border-radius-4)",
              height: 80,
            }}
          >
            <Box label="Short" color={COLORS[0]} />
            <Box label="Tall" color={COLORS[1]} style={{ paddingTop: "var(--uds-spacing-16)", paddingBottom: "var(--uds-spacing-16)" }} />
            <Box label="Medium" color={COLORS[2]} style={{ paddingTop: "var(--uds-spacing-8)", paddingBottom: "var(--uds-spacing-8)" }} />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "All five `alignItems` values with items of varying height inside a fixed-height container.",
      },
    },
  },
};

export const Wrapping: Story = {
  name: "Wrap: Items Overflow to Next Row",
  args: {
    direction: "row",
    gap: "12",
    wrap: true,
    fullWidth: true,
  },
  render: (args) => (
    <Flex {...args}>
      <ColoredBoxes count={12} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "With `wrap={true}` and 12 items, overflowing items flow onto additional rows.",
      },
    },
  },
};

export const ItemsPerRow: Story = {
  name: "Items Per Row (Grid-like)",
  args: {
    direction: "row",
    gap: "12",
    itemsPerRow: 3,
    fullWidth: true,
  },
  render: (args) => (
    <Flex {...args}>
      <ColoredBoxes count={9} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`itemsPerRow={3}` automatically enables wrap and sizes each child to fill exactly 1/3 of the row.",
      },
    },
  },
};

export const AppearanceEqual: Story = {
  name: "Appearance: Equal Columns",
  args: {
    direction: "row",
    gap: "16",
    appearance: "equal",
    fullWidth: true,
  },
  render: (args) => (
    <Flex {...args}>
      <ColoredBoxes count={3} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "`appearance=\"equal\"` distributes all children into equal-width columns.",
      },
    },
  },
};

export const AppearanceRight: Story = {
  name: "Appearance: Content-Right (Sidebar Left)",
  args: {
    direction: "row",
    gap: "16",
    appearance: "right",
    fullWidth: true,
  },
  render: (args) => (
    <Flex {...args}>
      <Box label="Sidebar" color={COLORS[3]} />
      <Box label="Main Content" color={COLORS[0]} style={{ flex: 1 }} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "`appearance=\"right\"` biases the layout so content is weighted toward the right column.",
      },
    },
  },
};

export const AppearanceLeft: Story = {
  name: "Appearance: Content-Left (Sidebar Right)",
  args: {
    direction: "row",
    gap: "16",
    appearance: "left",
    fullWidth: true,
  },
  render: (args) => (
    <Flex {...args}>
      <Box label="Main Content" color={COLORS[0]} style={{ flex: 1 }} />
      <Box label="Sidebar" color={COLORS[3]} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "`appearance=\"left\"` biases the layout so content is weighted toward the left column.",
      },
    },
  },
};

export const GapTokens: Story = {
  name: "Gap Token Scale",
  render: () => (
    <Flex direction="column" gap="16">
      {(["0", "4", "8", "16", "24", "32", "48"] as const).map((gap) => (
        <div key={gap}>
          <p style={{ fontFamily: "var(--uds-font-family-body)", fontSize: "var(--uds-font-size-12)", marginBottom: 4 }}>
            gap=&quot;{gap}&quot;
          </p>
          <Flex direction="row" gap={gap}>
            <ColoredBoxes count={4} />
          </Flex>
        </div>
      ))}
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: "All supported gap token values rendered for visual comparison.",
      },
    },
  },
};

export const FillSubcomponent: Story = {
  name: "Flex.Fill (Fills Remaining Space)",
  render: () => (
    <Flex direction="row" gap="8" alignItems="center" fullWidth>
      <Box label="Fixed" color={COLORS[0]} />
      <Flex.Fill>
        <Box label="Fills the rest" color={COLORS[2]} style={{ width: "100%" }} />
      </Flex.Fill>
      <Box label="Fixed" color={COLORS[3]} />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`<Flex.Fill>` expands to consume all available space, pushing fixed siblings to each edge.",
      },
    },
  },
};

export const PolymorphicAs: Story = {
  name: "Polymorphic: as=\"ul\"",
  args: {
    as: "ul",
    direction: "row",
    gap: "8",
    alignItems: "center",
  },
  render: (args) => (
    <Flex {...args} style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {["Home", "Components", "Tokens", "Docs"].map((item) => (
        <li key={item}>
          <Box label={item} color={COLORS[0]} />
        </li>
      ))}
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The `as` prop renders Flex as any HTML element — here a `<ul>` — while keeping all flex behaviour intact.",
      },
    },
  },
};

export const InlineVariant: Story = {
  name: "Inline Flex",
  args: {
    inline: true,
    gap: "8",
    alignItems: "center",
  },
  render: (args) => (
    <p style={{ fontFamily: "var(--uds-font-family-body)", fontSize: "var(--uds-font-size-16)" }}>
      Text before{" "}
      <Flex {...args}>
        <Box label="A" color={COLORS[0]} />
        <Box label="B" color={COLORS[1]} />
      </Flex>
      {" "}text after.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: "`inline={true}` switches to `display: inline-flex` so the container sits inline with text.",
      },
    },
  },
};
