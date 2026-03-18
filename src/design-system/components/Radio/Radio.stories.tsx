import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Radio from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether this radio button is selected.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the radio button and prevents interaction.",
    },
    label: {
      control: "text",
      description: "Label text rendered next to the radio button.",
    },
    value: {
      control: "text",
      description: "The value submitted with a form or passed to onChange.",
    },
    name: {
      control: "text",
      description: "Groups radio buttons so only one can be selected at a time.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when this radio button is selected.",
    },
  },
  args: {
    checked: false,
    disabled: false,
    label: "Option A",
    value: "option-a",
    name: "radio-group",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Full-time",
    value: "full-time",
    checked: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Part-time",
    value: "part-time",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Contract (unavailable in your region)",
    value: "contract",
    checked: false,
    disabled: true,
  },
};

export const DisabledSelected: Story = {
  args: {
    label: "Locum tenens (pre-selected)",
    value: "locum-tenens",
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    value: "no-label",
    checked: false,
  },
};

export const ControlledGroup: Story = {
  render: function ControlledRadioGroupStory() {
    const options = [
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "locum-tenens", label: "Locum tenens" },
      { value: "per-diem", label: "Per diem" },
    ];
    const [selected, setSelected] = React.useState("full-time");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name="employment-type"
            value={opt.value}
            label={opt.label}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
          />
        ))}
      </div>
    );
  },
};

export const GroupWithDisabledOption: Story = {
  render: function GroupWithDisabledStory() {
    const options = [
      { value: "light", label: "Light duty", disabled: false },
      { value: "moderate", label: "Moderate duty", disabled: false },
      { value: "heavy", label: "Heavy duty (not available)", disabled: true },
    ];
    const [selected, setSelected] = React.useState("light");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name="duty-level"
            value={opt.value}
            label={opt.label}
            checked={selected === opt.value}
            disabled={opt.disabled}
            onChange={() => !opt.disabled && setSelected(opt.value)}
          />
        ))}
      </div>
    );
  },
};
