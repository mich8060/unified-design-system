import type { CSSProperties } from "react";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Flex } from "../../design-system/components/Flex";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const FLEX_PROPS: ComponentPropRow[] = [
  { prop: "direction", type: '"row" | "column"', defaultValue: '"row"', description: "Sets the flex direction." },
  { prop: "gap", type: "string", defaultValue: '"0"', description: "Spacing between children (supports UDS spacing tokens)." },
  { prop: "alignItems", type: "string", defaultValue: '"stretch"', description: "Cross-axis alignment for children." },
  { prop: "justifyContent", type: "string", defaultValue: '"flex-start"', description: "Main-axis alignment and distribution of children." },
  { prop: "top", type: "boolean", defaultValue: "false", description: "Shorthand vertical start alignment (`alignItems` for row, `justifyContent` for column)." },
  { prop: "bottom", type: "boolean", defaultValue: "false", description: "Shorthand vertical end alignment (`alignItems` for row, `justifyContent` for column)." },
  { prop: "left", type: "boolean", defaultValue: "false", description: "Shorthand horizontal start alignment (`justifyContent` for row, `alignItems` for column)." },
  { prop: "right", type: "boolean", defaultValue: "false", description: "Shorthand horizontal end alignment (`justifyContent` for row, `alignItems` for column)." },
  { prop: "itemsPerRow", type: "number", defaultValue: "-", description: "For row layouts, fixes how many items appear in each row and wraps the rest." },
  { prop: "ItemsPerRow", type: "number", defaultValue: "-", description: "Alias of `itemsPerRow`." },
  { prop: "wrap", type: "boolean", defaultValue: "false", description: "Allows items to wrap onto multiple lines when true." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expands the flex container to span 100% width." },
  { prop: "span", type: "boolean", defaultValue: "false", description: "Applies `flex: 1` to all first-level children." },
  { prop: "Flex.Full", type: "compound child", defaultValue: "-", description: "Wrap a specific child to apply `flex: 1` selectively." },
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

const item = (label: string) => <div style={itemStyle}>{label}</div>;

const DIRECTION_SNIPPET = `<Flex direction="row" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

<Flex direction="column" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`;

const TOP_BOTTOM_LEFT_RIGHT_SNIPPET = `<Flex direction="row" top left gap="8" style={{ minHeight: "96px" }}>
  <div>Top Left</div>
  <div>Aligned</div>
</Flex>

<Flex direction="row" bottom right gap="8" style={{ minHeight: "96px" }}>
  <div>Bottom Right</div>
  <div>Aligned</div>
</Flex>`;

const GAP_SNIPPET = `<Flex direction="row" gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`;

const ALIGNMENT_SNIPPET = `<Flex
  direction="row"
  alignItems="center"
  justifyContent="space-between"
  gap="8"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`;

const SPAN_SNIPPET = `<Flex direction="row" gap="8" span>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`;

const FLEX_FULL_SNIPPET = `<Flex direction="row" gap="8" style={{ width: "100%" }}>
  <Flex.Full>
    <div>Grows</div>
  </Flex.Full>
  <div>Natural width</div>
</Flex>`;

const BORDERED_LAYOUT_SNIPPET = `<Flex
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
</Flex>`;

const WRAP_SNIPPET = `<Flex direction="row" gap="8" wrap style={{ maxWidth: "300px" }}>
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <div key={num}>Item {num}</div>
  ))}
</Flex>`;

const ITEMS_PER_ROW_SNIPPET = `<Flex direction="row" gap="8" itemsPerRow={3}>
  {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"].map((label) => (
    <div key={label}>{label}</div>
  ))}
</Flex>`;

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

          <Code language="tsx" code={DIRECTION_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Top & Bottom / Left & Right
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use <code>top</code>, <code>bottom</code>, <code>left</code>, and <code>right</code> as alignment shorthands.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Top Left
          </Text>
          <Flex
            direction="row"
            top
            left
            gap="8"
            style={{ minHeight: "96px", border: "var(--uds-border-width-1) dashed var(--uds-border-secondary)" }}
          >
            {item("Top")}
            {item("Left")}
            {item("Aligned")}
          </Flex>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Bottom Right
          </Text>
          <Flex
            direction="row"
            bottom
            right
            gap="8"
            style={{ minHeight: "96px", border: "var(--uds-border-width-1) dashed var(--uds-border-secondary)" }}
          >
            {item("Bottom")}
            {item("Right")}
            {item("Aligned")}
          </Flex>

          <Code language="tsx" code={TOP_BOTTOM_LEFT_RIGHT_SNIPPET} />
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

          <Code language="tsx" code={GAP_SNIPPET} />
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

          <Code language="tsx" code={ALIGNMENT_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Span
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Set <code>span</code> to apply <code>flex: 1</code> to all first-level children.
          </Text>

          <Flex direction="row" gap="8" span>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Flex>

          <Code language="tsx" code={SPAN_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Selective Full Child
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use <code>Flex.Full</code> when only specific children should grow with <code>flex: 1</code>.
          </Text>

          <Flex direction="row" gap="8" style={{ width: "100%" }}>
            <Flex.Full>{item("Grows")}</Flex.Full>
            {item("Natural width")}
          </Flex>

          <Code language="tsx" code={FLEX_FULL_SNIPPET} />
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

          <Code language="tsx" code={BORDERED_LAYOUT_SNIPPET} />
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

          <Code language="tsx" code={WRAP_SNIPPET} />
        </Flex>

        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Items Per Row
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Set <code>itemsPerRow</code> (or <code>ItemsPerRow</code>) to keep a fixed number of items per row and wrap the rest.
          </Text>

          <Flex direction="row" gap="8" itemsPerRow={3}>
            {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"].map((label) => (
              <div key={label} style={itemStyle}>{label}</div>
            ))}
          </Flex>

          <Code language="tsx" code={ITEMS_PER_ROW_SNIPPET} />
        </Flex>

        <Divider variant="solid" />
        <ComponentPropsTable rows={FLEX_PROPS} title="Flex Props" />
      </Flex>
    </DocPageLayout>
  );
}
