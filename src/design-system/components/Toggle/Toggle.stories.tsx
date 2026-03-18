import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Toggle from "./Toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["large", "small"],
      description: "Size variant of the toggle.",
    },
    state: {
      control: "inline-radio",
      options: ["off", "on", "indeterminate"],
      description: "Explicit state of the toggle. When omitted, state is derived from checked.",
    },
    checked: {
      control: "boolean",
      description: "Whether the toggle is on. Used when state is not explicitly provided.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the toggle and prevents interaction.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired with the new boolean checked value when toggled.",
    },
  },
  args: {
    size: "large",
    disabled: false,
    checked: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    id: "toggle-default",
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    id: "toggle-checked",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    checked: false,
    id: "toggle-small",
  },
};

export const SmallChecked: Story = {
  args: {
    size: "small",
    checked: true,
    id: "toggle-small-checked",
  },
};

export const Indeterminate: Story = {
  args: {
    state: "indeterminate",
    id: "toggle-indeterminate",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    id: "toggle-disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    id: "toggle-disabled-checked",
  },
};

export const Controlled: Story = {
  render: function ControlledToggleStory(args) {
    const [isOn, setIsOn] = React.useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Toggle
          {...args}
          checked={isOn}
          onChange={setIsOn}
          id="toggle-controlled"
        />
        <span style={{ fontSize: "14px" }}>
          Notifications are {isOn ? "enabled" : "disabled"}
        </span>
      </div>
    );
  },
  args: {
    size: "large",
  },
};
