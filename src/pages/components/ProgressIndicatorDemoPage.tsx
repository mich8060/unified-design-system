import { useState } from "react";
import { Divider, Flex, ProgressIndicator, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const PROGRESS_INDICATOR_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "number", defaultValue: "0", description: "Current value used to calculate progress." },
  { prop: "max", type: "number", defaultValue: "100", description: "Maximum value used for percentage calculation." },
  {
    prop: "variant",
    type: '"default" | "blue" | "green" | "success" | "orange" | "warning" | "red" | "error" | "purple"',
    defaultValue: '"default"',
    description: "Color variant for the fill and value marker.",
  },
  { prop: "size", type: '"small" | "medium" | "large"', defaultValue: '"medium"', description: "Height/spacing scale for the progress bar." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Optional label shown with the progress indicator." },
  { prop: "showLabel", type: "boolean", defaultValue: "true", description: "Controls whether the label is rendered." },
  { prop: "showValue", type: "boolean", defaultValue: "false", description: "When true, defaults value label position to right." },
  { prop: "labelPosition", type: '"false" | "right" | "bottom" | "top-floating" | "bottom-floating"', defaultValue: '"false"', description: "Position of the percentage value label." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the root element." },
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
      <Text as="h3" variant="heading-20" weight="medium" leading="regular">
        {title}
      </Text>
      <Text as="p" variant="body-14" leading="regular">
        {description}
      </Text>
      <Flex direction="column" gap="16" style={{ maxWidth: "640px" }}>
        {children}
      </Flex>
    </Flex>
  );
}

export function ProgressIndicatorDemoPage() {
  const [value, setValue] = useState(64);

  return (
    <DocPageLayout
      title="ProgressIndicator"
      description="ProgressIndicator shows linear completion and loading states with configurable size, color, and value-label positions."
    >
      <Flex direction="column" gap="40">
        <DemoBlock
          title="Default"
          description="Standard progress indicator with optional right-aligned percentage."
        >
          <ProgressIndicator value={value} max={100} label="Application progress" />
          <ProgressIndicator value={value} max={100} label="Application progress" showValue />
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Color Variants"
          description="Use variants to align progress visuals with semantic or brand intent."
        >
          <ProgressIndicator value={72} variant="default" label="Default" showValue />
          <ProgressIndicator value={72} variant="blue" label="Blue" showValue />
          <ProgressIndicator value={72} variant="green" label="Green / Success" showValue />
          <ProgressIndicator value={72} variant="orange" label="Orange / Warning" showValue />
          <ProgressIndicator value={72} variant="red" label="Red / Error" showValue />
          <ProgressIndicator value={72} variant="purple" label="Purple" showValue />
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Sizes"
          description="Small, medium, and large adapt the visual density of the progress bar."
        >
          <ProgressIndicator value={value} size="small" label="Small" showValue />
          <ProgressIndicator value={value} size="medium" label="Medium" showValue />
          <ProgressIndicator value={value} size="large" label="Large" showValue />
        </DemoBlock>

        <Divider variant="solid" />

        <DemoBlock
          title="Value Label Positions"
          description="Position value labels to match context and available space."
        >
          <ProgressIndicator value={58} label="Right Value" labelPosition="right" />
          <ProgressIndicator value={58} label="Bottom Value" labelPosition="bottom" />
          <ProgressIndicator value={58} label="Top Floating Value" labelPosition="top-floating" />
          <ProgressIndicator value={58} label="Bottom Floating Value" labelPosition="bottom-floating" />
        </DemoBlock>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={PROGRESS_INDICATOR_PROPS} title="ProgressIndicator Props" />
    </DocPageLayout>
  );
}
