import { Button, Divider, Flex, Text, Tooltip } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TOOLTIP_PROPS: ComponentPropRow[] = [
  {
    prop: "content",
    type: "ReactNode",
    defaultValue: "-",
    description: "Content rendered inside the tooltip panel.",
  },
  {
    prop: "placement",
    type: '"top" | "bottom" | "left" | "right"',
    defaultValue: '"top"',
    description: "Placement of the tooltip relative to its trigger.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "When true, tooltip behavior is disabled.",
  },
  {
    prop: "children",
    type: "ReactNode",
    defaultValue: "-",
    description: "Trigger element that reveals the tooltip on hover.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: '""',
    description: "Additional classes for the tooltip wrapper.",
  },
];

function DemoBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap="10">
      <Text as="h2" variant="heading-24" weight="medium" leading="regular">
        {title}
      </Text>
      <Text as="p" variant="body-14" leading="regular">
        {description}
      </Text>
      {children}
    </Flex>
  );
}

export function TooltipDemoPage() {
  return (
    <DocPageLayout
      title="Tooltip"
      description="Tooltip provides contextual guidance on hover without adding persistent UI clutter."
    >
      <Flex direction="column" gap="40">
        <DemoBlock
          title="Basic"
          description="Use a short message to clarify icon-only or compact controls."
        >
          <Flex alignItems="center" gap="16" wrap>
            <Tooltip content="Create new item">
              <Button label="Hover me" appearance="outline" />
            </Tooltip>
          </Flex>
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Placement Variants"
          description="Choose placement based on available space around the trigger."
        >
          <Flex alignItems="center" gap="16" wrap>
            <Tooltip content="Top placement" placement="top">
              <Button label="Top" appearance="outline" />
            </Tooltip>
            <Tooltip content="Bottom placement" placement="bottom">
              <Button label="Bottom" appearance="outline" />
            </Tooltip>
            <Tooltip content="Left placement" placement="left">
              <Button label="Left" appearance="outline" />
            </Tooltip>
            <Tooltip content="Right placement" placement="right">
              <Button label="Right" appearance="outline" />
            </Tooltip>
          </Flex>
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Rich Content"
          description="Content can include formatting or other inline elements."
        >
          <Flex alignItems="center" gap="16" wrap>
            <Tooltip
              placement="bottom"
              content={
                <span>
                  Created on <strong>Jan 15, 2026</strong>
                </span>
              }
            >
              <Button label="Metadata" appearance="outline" />
            </Tooltip>
          </Flex>
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Disabled"
          description="Disable tooltip behavior when guidance is not needed in a state."
        >
          <Flex alignItems="center" gap="16" wrap>
            <Tooltip content="This tooltip is disabled" disabled>
              <Button label="No tooltip" appearance="outline" />
            </Tooltip>
          </Flex>
        </DemoBlock>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TOOLTIP_PROPS} title="Tooltip Props" />
    </DocPageLayout>
  );
}
