import { useState } from "react";
import { Divider, Flex, Text } from "../../design-system";
import Accordion, { AccordionItem } from "../../design-system/components/Accordion/Accordion";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const faqItems = [
  {
    label: "What is Accordion used for?",
    content:
      "Accordion helps organize dense information by revealing content only when users need it."
  },
  {
    label: "Can I start with a section open?",
    content:
      "Yes. Use the defaultExpanded prop on an AccordionItem to render it open on first load."
  },
  {
    label: "Should I nest accordions?",
    content:
      "Avoid nested accordions whenever possible. Use clear section labels and concise content instead."
  }
];

const ACCORDION_PROPS: ComponentPropRow[] = [
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "AccordionItem elements." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on accordion container." },
  {
    prop: "variant",
    type: '"default" | "secondary"',
    defaultValue: '"default"',
    description: "Visual style variant for the accordion container.",
  },
];

const ACCORDION_ITEM_PROPS: ComponentPropRow[] = [
  { prop: "label", type: "string", defaultValue: "-", description: "Header text for the item trigger." },
  { prop: "defaultExpanded", type: "boolean", defaultValue: "false", description: "Initial expanded state on first render." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Body content shown when expanded." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on item wrapper." },
  { prop: "onToggle", type: "(expanded: boolean) => void", defaultValue: "-", description: "Fires whenever expanded state changes." },
  {
    prop: "...rest",
    type: "HTMLAttributes<HTMLDivElement>",
    defaultValue: "-",
    description: "Native attributes like id, data-*, aria-*.",
  },
];

export function AccordionDemoPage() {
  const [toggleState, setToggleState] = useState("Not toggled yet");

  return (
    <DocPageLayout
      title="Accordion"
      description="Accordion progressively discloses content so pages stay scannable while still providing detail."
    >
      <Flex direction="column" gap="48">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            FAQ Example
          </Text>
          <Accordion>
            {faqItems.map((item, index) => (
              <AccordionItem key={item.label} label={item.label} defaultExpanded={index === 0}>
                <Text as="p" variant="body-16" leading="regular">
                  {item.content}
                </Text>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Item States
          </Text>
          <Accordion>
            <AccordionItem label="Collapsed by default">
              <Text as="p" variant="body-16" leading="regular">
                This item starts collapsed.
              </Text>
            </AccordionItem>
            <AccordionItem label="Expanded by default" defaultExpanded>
              <Text as="p" variant="body-16" leading="regular">
                This item starts expanded via defaultExpanded.
              </Text>
            </AccordionItem>
          </Accordion>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Secondary Variant
          </Text>
          <Accordion variant="secondary">
            <AccordionItem label="Secondary container style">
              <Text as="p" variant="body-16" leading="regular">
                This accordion uses the secondary surface background with a full 1px border and 4px radius.
              </Text>
            </AccordionItem>
            <AccordionItem label="Works with multiple items">
              <Text as="p" variant="body-16" leading="regular">
                Use this variant when you want a contained accordion treatment instead of divider-only rows.
              </Text>
            </AccordionItem>
          </Accordion>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            onToggle Callback
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Last toggle state: {toggleState}
          </Text>
          <Accordion>
            <AccordionItem
              label="Toggle me"
              onToggle={(expanded) => setToggleState(expanded ? "Expanded" : "Collapsed")}
            >
              <Text as="p" variant="body-16" leading="regular">
                Expanding/collapsing this item updates the callback state above.
              </Text>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={ACCORDION_PROPS} />
      <ComponentPropsTable rows={ACCORDION_ITEM_PROPS} />
    </DocPageLayout>
  );
}
