import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "../Text";
import { Container } from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "inline-radio",
      options: ["default", "transparent"],
    },
    padding: {
      control: "select",
      options: ["none", "xsmall", "small", "default", "large", "xlarge"],
    },
  },
  args: {
    appearance: "transparent",
    padding: "large",
    children: (
      <Text as="p" variant="body-14" leading="regular">
        Container content
      </Text>
    ),
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Transparent: Story = {
  args: {
    appearance: "transparent",
  },
};

export const LargePadding: Story = {
  args: {
    padding: "large",
  },
};
