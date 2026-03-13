import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../Flex";
import { Medallion } from "./Medallion";

const meta = {
  title: "Components/Medallion",
  component: Medallion,
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: ["circle", "square", "roundedSquare", "diamond"] },
    size: { control: "inline-radio", options: ["small", "default", "large", "xl"] },
    color: {
      control: "select",
      options: [
        "transparent",
        "neutral",
        "red",
        "orange",
        "yellow",
        "emerald",
        "green",
        "sky",
        "cyan",
        "blue",
        "indigo",
        "purple",
        "fuchsia",
        "magenta",
        "inverse",
      ],
    },
  },
  args: {
    icon: "FileText",
    shape: "circle",
    size: "default",
    color: "neutral",
  },
} satisfies Meta<typeof Medallion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <Flex alignItems="center" gap="12" wrap>
      <Medallion shape="circle" color="blue" />
      <Medallion shape="square" color="blue" />
      <Medallion shape="roundedSquare" color="blue" />
      <Medallion shape="diamond" color="blue" />
    </Flex>
  ),
};
