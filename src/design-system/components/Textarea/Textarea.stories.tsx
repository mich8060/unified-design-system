import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "compact"],
      description: "Size variant — controls the minimum height of the textarea.",
    },
    state: {
      control: "inline-radio",
      options: ["default", "focused", "error", "disabled"],
      description: "Visual state of the textarea.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea, overriding the state prop.",
    },
    resize: {
      control: "boolean",
      description: "Whether the user can manually resize the textarea.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the textarea is empty.",
    },
    value: {
      control: "text",
      description: "Controlled value of the textarea.",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when the textarea value changes.",
    },
    onBlur: {
      action: "onBlur",
      description: "Callback fired when the textarea loses focus.",
    },
    onFocus: {
      action: "onFocus",
      description: "Callback fired when the textarea gains focus.",
    },
  },
  args: {
    size: "default",
    state: "default",
    disabled: false,
    resize: true,
    placeholder: "Enter text here...",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Describe your experience...",
  },
};

export const WithValue: Story = {
  args: {
    value:
      "Board-certified hospitalist with 8 years of experience in acute care settings. Comfortable with Epic and Cerner EHR systems.",
    placeholder: "Describe your experience...",
  },
};

export const CompactSize: Story = {
  args: {
    size: "compact",
    placeholder: "Add a brief note...",
  },
};

export const ErrorState: Story = {
  args: {
    state: "error",
    value: "N/A",
    placeholder: "Please provide more detail...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "This field is locked for editing by an administrator.",
    placeholder: "Not editable",
  },
};

export const NoResize: Story = {
  args: {
    resize: false,
    placeholder: "This textarea cannot be resized by the user.",
  },
};

export const ControlledWithCharacterLimit: Story = {
  render: function CharLimitStory(args) {
    const MAX = 300;
    const [value, setValue] = React.useState("");
    const remaining = MAX - value.length;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Textarea
          {...args}
          value={value}
          onChange={(e) =>
            setValue((e as React.ChangeEvent<HTMLTextAreaElement>).target.value.slice(0, MAX))
          }
          placeholder="Tell us about your ideal assignment..."
        />
        <span style={{ fontSize: "12px", textAlign: "right" }}>
          {remaining} characters remaining
        </span>
      </div>
    );
  },
  args: {
    size: "default",
    state: "default",
  },
};
