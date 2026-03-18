import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Field from "./Field";
import TextInput from "../TextInput/TextInput";
import Textarea from "../Textarea/Textarea";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the input.",
    },
    state: {
      control: "inline-radio",
      options: ["default", "error"],
      description: "Visual state of the field — affects label and helper text color.",
    },
    required: {
      control: "boolean",
      description: "Appends an asterisk to the label when true.",
    },
    helperMessage: {
      control: "text",
      description: "Helper or error text rendered below the input.",
    },
    maxLength: {
      control: "number",
      description: "Enables a live character-count indicator when set.",
    },
    value: {
      control: "text",
      description: "Current value used for the character-count calculation.",
    },
    infoIcon: {
      control: "text",
      description: "Phosphor icon name rendered as an info trigger next to the label.",
    },
    onInfoClick: {
      action: "onInfoClick",
      description: "Callback fired when the info icon is clicked.",
    },
  },
  args: {
    label: "Field label",
    state: "default",
    required: false,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "First name",
    helperMessage: "Enter your legal first name.",
  },
  render: (args) => (
    <Field {...args}>
      <TextInput placeholder="Jane" />
    </Field>
  ),
};

export const Required: Story = {
  args: {
    label: "Email address",
    required: true,
    helperMessage: "We will only use this to send account notifications.",
  },
  render: (args) => (
    <Field {...args}>
      <TextInput type="email" placeholder="you@example.com" />
    </Field>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "Email address",
    required: true,
    state: "error",
    helperMessage: "Please enter a valid email address.",
  },
  render: (args) => (
    <Field {...args}>
      <TextInput
        type="email"
        value="not-an-email"
        state="error"
        onChange={() => undefined}
      />
    </Field>
  ),
};

export const WithCharacterCount: Story = {
  render: function CharacterCountStory(args) {
    const [value, setValue] = React.useState("");
    return (
      <Field {...args} value={value} maxLength={200}>
        <Textarea
          placeholder="Tell us about yourself..."
          value={value}
          onChange={(e) => setValue(String((e as React.ChangeEvent<HTMLTextAreaElement>).target.value))}
        />
      </Field>
    );
  },
  args: {
    label: "Bio",
    maxLength: 200,
    helperMessage: "A short description shown on your profile.",
  },
};

export const WithInfoIcon: Story = {
  args: {
    label: "National Provider Identifier",
    infoIcon: "Info",
    helperMessage: "Your 10-digit NPI number issued by CMS.",
  },
  render: (args) => (
    <Field {...args}>
      <TextInput placeholder="1234567890" maxLength={10} />
    </Field>
  ),
};

export const WithTextarea: Story = {
  args: {
    label: "Additional notes",
    helperMessage: "Include any relevant context for the recruiter.",
  },
  render: (args) => (
    <Field {...args}>
      <Textarea placeholder="Add notes here..." />
    </Field>
  ),
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    helperMessage: "A helper message can appear without a label.",
  },
  render: (args) => (
    <Field {...args}>
      <TextInput placeholder="Search providers..." />
    </Field>
  ),
};
