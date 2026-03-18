import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox and prevents interaction.",
    },
    indeterminate: {
      control: "boolean",
      description: "Shows the indeterminate dash state. Only applies when checked is false.",
    },
    label: {
      control: "text",
      description: "Label text rendered next to the checkbox.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired with the new boolean checked value.",
    },
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    label: "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Remember me",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Email notifications",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all specialties",
    checked: false,
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Enable two-factor authentication",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Standard background check (required)",
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    checked: false,
  },
};

export const ControlledGroup: Story = {
  render: function ControlledGroupStory() {
    const options = [
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "oncology", label: "Oncology" },
    ];
    const [selected, setSelected] = React.useState<string[]>(["cardiology"]);

    const allChecked = selected.length === options.length;
    const someChecked = selected.length > 0 && !allChecked;

    const toggleAll = () => {
      setSelected(allChecked ? [] : options.map((o) => o.value));
    };

    const toggleOption = (value: string) => {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox
          label="All specialties"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {options.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              checked={selected.includes(opt.value)}
              onChange={() => toggleOption(opt.value)}
            />
          ))}
        </div>
      </div>
    );
  },
};
