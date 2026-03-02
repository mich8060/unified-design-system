import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Accordion, { AccordionItem } from "./Accordion";

type AccordionItemProps = React.ComponentProps<typeof AccordionItem>;
type AccordionProps = React.ComponentProps<typeof Accordion>;
type AccordionStoryArgs = AccordionItemProps & {
  containerClassName?: string;
  variant?: AccordionProps["variant"];
};

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: { AccordionItem },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Header text for the accordion item.",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Whether the item starts expanded.",
    },
    className: {
      control: "text",
      description: "Additional CSS class for AccordionItem.",
    },
    id: {
      control: "text",
      description:
        "Optional base id for ARIA linkage. If omitted, a sanitized id is generated from label/useId.",
    },
    variant: {
      control: "inline-radio",
      options: ["default", "secondary"],
      description: "Visual style variant for the accordion container.",
    },
    onToggle: {
      action: "toggled",
      description: "Called when the item is toggled.",
    },
    containerClassName: {
      control: "text",
      description: "Additional CSS class for Accordion container.",
    },
    children: {
      control: "text",
      description: "Item body content.",
    },
  },
  args: {
    label: "Section title",
    defaultExpanded: false,
    id: "",
    variant: "default",
    className: "",
    containerClassName: "",
    children: "Accordion content",
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderSingleItem = ({ containerClassName, variant, ...itemArgs }: AccordionStoryArgs) => (
  <Accordion className={containerClassName} variant={variant}>
    <AccordionItem {...itemArgs} />
  </Accordion>
);

export const Playground: Story = {
  render: renderSingleItem,
};

export const MultipleItems: Story = {
  render: ({ containerClassName, variant }) => (
    <Accordion className={containerClassName} variant={variant}>
      <AccordionItem label="What is UDS?">
        Unified Design System is a shared component library and token foundation.
      </AccordionItem>
      <AccordionItem label="How do I install it?">
        Install the package and import global styles before rendering components.
      </AccordionItem>
      <AccordionItem label="Can I customize styles?">
        Yes. Use className plus existing UDS token variables for customization.
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultExpanded: Story = {
  args: {
    label: "Initially open section",
    defaultExpanded: true,
    children: "This content starts expanded via defaultExpanded.",
  },
  render: renderSingleItem,
};

export const WithCustomClassNames: Story = {
  args: {
    containerClassName: "accordion--custom",
    className: "accordion-item--custom",
    label: "Custom class example",
    children: "Use this story to validate className passthrough behavior.",
  },
  render: renderSingleItem,
};

export const OnToggleCallback: Story = {
  args: {
    label: "Toggle me",
    children: "Check the Actions panel for onToggle events.",
  },
  render: renderSingleItem,
};

export const SecondaryVariant: Story = {
  args: {
    variant: "secondary",
    label: "Secondary surface variant",
    children: "This variant uses a secondary surface background and full bordered container.",
  },
  render: renderSingleItem,
};

export const AriaWithCustomId: Story = {
  args: {
    id: "account-settings",
    label: "Account settings",
    children:
      "This story demonstrates explicit id linkage for aria-controls/aria-labelledby.",
  },
  render: renderSingleItem,
};

export const AriaIdFromComplexLabel: Story = {
  args: {
    label: "Billing & Payments (Q1/Q2) #2026",
    children:
      "The component sanitizes label text into a valid id for ARIA attributes.",
  },
  render: renderSingleItem,
};
