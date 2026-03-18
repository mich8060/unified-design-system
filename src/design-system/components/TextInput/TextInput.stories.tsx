import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import TextInput from "./TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "compact"],
      description: "Size variant of the input.",
    },
    state: {
      control: "inline-radio",
      options: ["default", "focused", "error", "disabled"],
      description: "Visual state of the input.",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "HTML input type.",
    },
    iconPosition: {
      control: "inline-radio",
      options: ["left", "right"],
      description: "Position of the optional icon.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input, overriding the state prop.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when input is empty.",
    },
    value: {
      control: "text",
      description: "Controlled value of the input.",
    },
    label: {
      control: "text",
      description: "Optional visible label rendered above the input.",
    },
    helperText: {
      control: "text",
      description: "Helper text rendered below the input.",
    },
    errorText: {
      control: "text",
      description: "Error message rendered below the input when in error state.",
    },
    icon: {
      control: "text",
      description: "Phosphor icon name (e.g. \"MagnifyingGlass\", \"Envelope\").",
    },
    onChange: {
      action: "onChange",
      description: "Callback fired when the input value changes.",
    },
    onBlur: {
      action: "onBlur",
      description: "Callback fired when the input loses focus.",
    },
    onFocus: {
      action: "onFocus",
      description: "Callback fired when the input gains focus.",
    },
    onIconClick: {
      action: "onIconClick",
      description: "Callback fired when the icon button is clicked.",
    },
  },
  args: {
    size: "default",
    state: "default",
    type: "text",
    disabled: false,
    placeholder: "Enter a value",
    iconPosition: "right",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your name",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Full name",
    placeholder: "Jane Smith",
    helperText: "Enter your first and last name.",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    helperText: "We will never share your email with anyone.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    value: "not-an-email",
    state: "error",
    errorText: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    value: "jsmith",
    disabled: true,
    helperText: "Contact your administrator to change your username.",
  },
};

export const CompactSize: Story = {
  args: {
    size: "compact",
    placeholder: "Search...",
    icon: "MagnifyingGlass",
    iconPosition: "left",
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: "Envelope",
    iconPosition: "left",
  },
};

export const WithClickableIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon: "Eye",
    iconPosition: "right",
  },
};

export const PasswordWithToggle: Story = {
  render: function PasswordToggleStory(args) {
    const [visible, setVisible] = React.useState(false);
    return (
      <TextInput
        {...args}
        type={visible ? "text" : "password"}
        icon={visible ? "EyeSlash" : "Eye"}
        iconPosition="right"
        onIconClick={() => setVisible((v) => !v)}
      />
    );
  },
  args: {
    label: "Password",
    placeholder: "Enter your password",
    value: "s3cr3tP@ss",
  },
};
