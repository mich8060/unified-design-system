import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Tooltip from "./Tooltip";
import Button from "../Button/Button";

const canvasStyle: React.CSSProperties = {
  minHeight: 280,
  padding: "80px 120px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "visible",
};

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    content: {
      control: { type: "text" },
      description: "Text or ReactNode displayed inside the tooltip bubble.",
    },
    placement: {
      control: { type: "inline-radio" },
      options: ["top", "bottom", "left", "right"],
      description: "Preferred position of the tooltip relative to the trigger.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "When true, the tooltip is suppressed and children render as-is.",
    },
    defaultVisible: {
      control: { type: "boolean" },
      description: "When true, the tooltip is visible on mount and stays visible on hover.",
    },
  },
  args: {
    content: "Additional context for this action",
    placement: "top",
    disabled: false,
    defaultVisible: false,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Hover me" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement variants
// ---------------------------------------------------------------------------
export const PlacementTop: Story = {
  name: "Placement — Top",
  args: {
    content: "Tooltip above the trigger",
    placement: "top",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Hover — top" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

export const PlacementBottom: Story = {
  name: "Placement — Bottom",
  args: {
    content: "Tooltip below the trigger",
    placement: "bottom",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Hover — bottom" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

export const PlacementLeft: Story = {
  name: "Placement — Left",
  args: {
    content: "Tooltip to the left",
    placement: "left",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Hover — left" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

export const PlacementRight: Story = {
  name: "Placement — Right",
  args: {
    content: "Tooltip to the right",
    placement: "right",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Hover — right" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All placements in a grid
// ---------------------------------------------------------------------------
export const AllPlacements: Story = {
  name: "All Placements",
  render: (_args) => (
    <div
      style={{
        minHeight: 400,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "48px",
        padding: "80px",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} content={`Placement: ${placement}`} placement={placement}>
          <Button label={placement} appearance="outline" size="small" />
        </Tooltip>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Icon-only button with tooltip label
// ---------------------------------------------------------------------------
export const IconOnlyTrigger: Story = {
  name: "Icon-Only Button Trigger",
  args: {
    content: "Download report",
    placement: "top",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button layout="icon-only" icon="DownloadSimple" label="Download" appearance="ghost" />
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled tooltip — passes children through untouched
// ---------------------------------------------------------------------------
export const DisabledTooltip: Story = {
  name: "Disabled",
  args: {
    content: "You will never see this",
    placement: "top",
    disabled: true,
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Tooltip disabled" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Always-visible (defaultVisible)
// ---------------------------------------------------------------------------
export const DefaultVisible: Story = {
  name: "Default Visible",
  args: {
    content: "This tooltip is open on mount",
    placement: "top",
    defaultVisible: true,
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button label="Always has tooltip" appearance="outline" />
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Tooltip on a non-button element
// ---------------------------------------------------------------------------
export const InlineTextTrigger: Story = {
  name: "Inline Text Trigger",
  args: {
    content: "Primary source verification is complete",
    placement: "bottom",
  },
  render: (args) => (
    <div style={{ ...canvasStyle, fontSize: "16px" }}>
      <p style={{ margin: 0 }}>
        The provider's credentials are{" "}
        <Tooltip {...args}>
          <span
            style={{
              textDecoration: "underline dotted",
              cursor: "help",
              color: "var(--uds-text-link)",
            }}
          >
            PSV verified
          </span>
        </Tooltip>
        {" "}and ready for assignment.
      </p>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Rich content inside tooltip
// ---------------------------------------------------------------------------
export const RichContent: Story = {
  name: "Rich Content",
  args: {
    content: "Shifts include nights and weekends — review schedule carefully.",
    placement: "right",
  },
  render: (args) => (
    <div style={canvasStyle}>
      <Tooltip {...args}>
        <Button
          label="View schedule"
          appearance="soft"
          layout="icon-left"
          icon="CalendarBlank"
        />
      </Tooltip>
    </div>
  ),
};
