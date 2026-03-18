import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import Chip from "./Chip";
import type { ChipSize, ChipIconPlacement } from "./Chip.types";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text content displayed inside the chip.",
    },
    selected: {
      control: "boolean",
      description: "Controlled selected state. Omit to use internal toggle state.",
    },
    rounded: {
      control: "boolean",
      description: "Fully rounded pill shape vs slightly rounded.",
    },
    size: {
      control: "select",
      options: ["default", "compact", "mini"] satisfies ChipSize[],
      description: "Size of the chip.",
    },
    iconPlacement: {
      control: "select",
      options: ["none", "left", "right", "both"] satisfies ChipIconPlacement[],
      description: "Where to display the icon relative to the label.",
    },
    icon: {
      control: "text",
      description: "Icon name from the Icon component library.",
    },
    badge: {
      control: "number",
      description: "Badge count to display alongside the label.",
    },
    badgeVariant: {
      control: "select",
      options: ["blue", "cyan", "green", "magenta", "indigo", "rose", "neutral", "orange", "purple", "red", "sky", "yellow", "inverse", "lime"],
      description: "Color variant of the embedded badge.",
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and applies disabled styling.",
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when the chip is clicked.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
  args: {
    label: "Filter",
    rounded: true,
    size: "default",
    iconPlacement: "none",
    disabled: false,
    badgeVariant: "sky",
    className: "",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const DefaultUnselected: Story = {
  name: "Default (Unselected)",
  args: {
    label: "All Specialties",
    selected: false,
    iconPlacement: "none",
  },
};

export const Selected: Story = {
  name: "Selected",
  args: {
    label: "Emergency Medicine",
    selected: true,
    iconPlacement: "none",
  },
};

export const SelfToggling: Story = {
  name: "Self-Toggling (Uncontrolled)",
  render: () => <Chip label="Click to toggle" />,
};

export const ControlledToggleGroup: Story = {
  name: "Controlled Toggle Group",
  render: () => {
    const FILTERS = ["All", "Active", "Pending", "Inactive", "Closed"];

    const ToggleGroup = () => {
      const [active, setActive] = useState("All");
      return (
        <div style={{ display: "flex", gap: 8 }}>
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={active === f}
              onClick={() => setActive(f)}
            />
          ))}
        </div>
      );
    };

    return <ToggleGroup />;
  },
};

export const SizeVariants: Story = {
  name: "Size Variants",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Chip label="Default" size="default" />
      <Chip label="Compact" size="compact" />
      <Chip label="Mini" size="mini" />
    </div>
  ),
};

export const IconLeft: Story = {
  name: "Icon Left",
  args: {
    label: "Calendar",
    icon: "Calendar",
    iconPlacement: "left",
  },
};

export const IconRight: Story = {
  name: "Icon Right",
  args: {
    label: "Dropdown",
    icon: "CaretDown",
    iconPlacement: "right",
  },
};

export const IconBoth: Story = {
  name: "Icon on Both Sides",
  args: {
    label: "Filter",
    icon: "Funnel",
    iconPlacement: "both",
  },
};

export const WithBadge: Story = {
  name: "With Badge Count",
  args: {
    label: "Messages",
    badge: 12,
    badgeVariant: "red",
    iconPlacement: "none",
  },
};

export const WithBadgeAndIcon: Story = {
  name: "With Icon and Badge",
  args: {
    label: "Notifications",
    icon: "Bell",
    iconPlacement: "left",
    badge: 5,
    badgeVariant: "red",
  },
};

export const DisabledState: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Chip label="Disabled Unselected" disabled />
      <Chip label="Disabled Selected" selected disabled />
    </div>
  ),
};

export const NotRounded: Story = {
  name: "Square Corners",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Chip label="Rounded" rounded />
      <Chip label="Square" rounded={false} />
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes with Icons",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Chip label="Default" size="default" icon="Star" iconPlacement="left" selected />
      <Chip label="Compact" size="compact" icon="Star" iconPlacement="left" selected />
      <Chip label="Mini" size="mini" icon="Star" iconPlacement="left" selected />
    </div>
  ),
};
