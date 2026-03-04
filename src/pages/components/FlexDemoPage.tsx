import type { CSSProperties } from "react";
import { Divider, Flex, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const FLEX_PROPS: ComponentPropRow[] = [
  { prop: "direction", type: '"row" | "column"', defaultValue: '"row"', description: "Sets the flex direction." },
  { prop: "gap", type: "string", defaultValue: '"0"', description: "Spacing between children (supports UDS spacing tokens)." },
  { prop: "alignItems", type: "string", defaultValue: '"stretch"', description: "Cross-axis alignment for children." },
  { prop: "justifyContent", type: "string", defaultValue: '"flex-start"', description: "Main-axis alignment and distribution of children." },
  { prop: "wrap", type: "boolean", defaultValue: "false", description: "Allows items to wrap onto multiple lines when true." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expands the flex container to span 100% width." },
  { prop: "className", type: "string", defaultValue: '""', description: "Adds custom CSS classes to the root element." },
  { prop: "style", type: "object", defaultValue: "{}", description: "Applies inline styles to the root element." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Elements rendered inside the flex container." },
];

const itemStyle: CSSProperties = {
  padding: "var(--uds-spacing-8) var(--uds-spacing-12)",
  border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
  borderRadius: "var(--uds-radius-4)",
  backgroundColor: "var(--uds-surface-secondary)",
};

const codeBlockStyle: CSSProperties = {
  margin: 0,
  padding: "var(--uds-spacing-12)",
  border: "var(--uds-border-width-1) solid var(--uds-border-secondary)",
  borderRadius: "var(--uds-radius-4)",
  backgroundColor: "var(--uds-surface-secondary)",
  overflowX: "auto",
  whiteSpace: "pre",
};

const item = (label: string) => <div style={itemStyle}>{label}</div>;

export function FlexDemoPage() {
  return (
    <DocPageLayout
      title="Flex"
      description="Flex is a layout utility for arranging items with direction, spacing, alignment, and wrapping."
    >
      <Flex direction="column" gap="24">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Direction
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control the direction of flex items using the <code>direction</code> prop.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Row (default)
          </Text>
          <Flex direction="row" gap="8">
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Column
          </Text>
          <Flex direction="column" gap="8">
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Flex>

          <pre style={codeBlockStyle}>{`<Flex direction="row" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

<Flex direction="column" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`}</pre>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Gap
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control spacing between flex items using the <code>gap</code> prop with UDS gap tokens.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 4px</Text>
          <Flex direction="row" gap="4">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 8px</Text>
          <Flex direction="row" gap="8">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 16px</Text>
          <Flex direction="row" gap="16">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 24px</Text>
          <Flex direction="row" gap="24">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 32px</Text>
          <Flex direction="row" gap="32">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Flex>

          <pre style={codeBlockStyle}>{`<Flex direction="row" gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`}</pre>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Alignment
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control alignment of flex items using <code>alignItems</code> and <code>justifyContent</code> props.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Align Items: Center
          </Text>
          <Flex direction="row" alignItems="center" gap="8" style={{ minHeight: "64px" }}>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Justify Content: Space Between
          </Text>
          <Flex direction="row" justifyContent="space-between" gap="8" style={{ width: "100%" }}>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Flex>

          <pre style={codeBlockStyle}>{`<Flex
  direction="row"
  alignItems="center"
  justifyContent="space-between"
  gap="8"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`}</pre>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Bordered Layout Example
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Combine <code>fullWidth</code> with border tokens to create section wrappers and grouped content regions.
          </Text>

          <Flex
            direction="column"
            gap="12"
            fullWidth
            style={{
              border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-8)",
              padding: "var(--uds-spacing-16)",
            }}
          >
            <Text as="p" variant="body-14" leading="regular">Section title</Text>
            <Flex direction="row" gap="8" wrap>
              {item("Filter A")}
              {item("Filter B")}
              {item("Filter C")}
            </Flex>
          </Flex>

          <pre style={codeBlockStyle}>{`<Flex
  direction="column"
  gap="12"
  fullWidth
  style={{
    border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
    borderRadius: "var(--uds-radius-8)",
    padding: "var(--uds-spacing-16)",
  }}
>
  <Text>Section title</Text>
  <Flex direction="row" gap="8" wrap>
    <div>Filter A</div>
    <div>Filter B</div>
    <div>Filter C</div>
  </Flex>
</Flex>`}</pre>
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Wrap
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Allow flex items to wrap to the next line using the <code>wrap</code> prop.
          </Text>

          <Flex direction="row" gap="8" wrap style={{ maxWidth: "300px" }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} style={itemStyle}>Item {num}</div>
            ))}
          </Flex>

          <pre style={codeBlockStyle}>{`<Flex direction="row" gap="8" wrap style={{ maxWidth: "300px" }}>
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <div key={num}>Item {num}</div>
  ))}
</Flex>`}</pre>
        </Flex>

        <Divider variant="solid" />
        <ComponentPropsTable rows={FLEX_PROPS} title="Flex Props" />
      </Flex>
    </DocPageLayout>
  );
}
