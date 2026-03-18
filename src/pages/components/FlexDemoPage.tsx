import type { CSSProperties } from "react";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Statistics } from "../../design-system/components/Statistics";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const FLEX_PROPS: ComponentPropRow[] = [
  { prop: "direction", type: '"row" | "column"', defaultValue: '"row"', description: "Sets the flex direction." },
  { prop: "appearance", type: '"full" | "equal" | "right" | "left"', defaultValue: '"full"', description: "Applies preset two-column layout ratios for page/content composition." },
  { prop: "gap", type: "string", defaultValue: '"0"', description: "Spacing between children (supports UDS spacing tokens)." },
  { prop: "alignItems", type: "string", defaultValue: '"stretch"', description: "Cross-axis alignment for children." },
  { prop: "justifyContent", type: "string", defaultValue: '"flex-start"', description: "Main-axis alignment and distribution of children." },
  { prop: "itemsPerRow", type: "number", defaultValue: "-", description: "For row layouts, fixes how many items appear in each row and wraps the rest." },
  { prop: "wrap", type: "boolean", defaultValue: "false", description: "Allows items to wrap onto multiple lines when true." },
  { prop: "mt / mb / pl", type: "string | number", defaultValue: "-", description: "Convenience spacing props for margin-top, margin-bottom, and padding-left." },
  { prop: "minWidth", type: "string | number", defaultValue: "-", description: "Sets minimum width on the container." },
  { prop: "shrink / grow", type: "number", defaultValue: "-", description: "Applies flex-shrink and flex-grow directly on the layout container." },
  { prop: "fullHeight", type: "boolean", defaultValue: "false", description: "Expands container to 100% height." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "Expands the container to 100% width and applies `flex: 1` to first-level children." },
  { prop: "Layout.Fill", type: "compound child", defaultValue: "-", description: "Wrap a specific child to apply `flex: 1` selectively." },
];

const itemStyle: CSSProperties = {
  padding: "var(--uds-spacing-8) var(--uds-spacing-12)",
  border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
  borderRadius: "var(--uds-radius-4)",
  backgroundColor: "var(--uds-surface-secondary)",
};

const item = (label: string) => <div style={itemStyle}>{label}</div>;

const DIRECTION_SNIPPET = `<Layout direction="row" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>

<Layout direction="column" gap="8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>`;

const APPEARANCE_SNIPPET = `<Layout appearance="equal" gap="12">
  <div>Column A</div>
  <div>Column B</div>
</Layout>

<Layout appearance="right" gap="12">
  <div>Sidebar</div>
  <div>Main content</div>
</Layout>

<Layout appearance="left" gap="12">
  <div>Main content</div>
  <div>Sidebar</div>
</Layout>`;

const GAP_SNIPPET = `<Layout direction="row" gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>`;

const ALIGNMENT_SNIPPET = `<Layout
  direction="row"
  alignItems="center"
  justifyContent="space-between"
  gap="8"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>`;

const FULL_WIDTH_SNIPPET = `<Layout direction="row" gap="8" fullWidth>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Layout>`;

const FLEX_FILL_SNIPPET = `<Layout direction="row" gap="8" style={{ width: "100%" }}>
  <Layout.Fill>
    <div>Grows</div>
  </Layout.Fill>
  <div>Natural width</div>
</Layout>`;

const BORDERED_LAYOUT_SNIPPET = `<Layout
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
  <Layout direction="row" gap="8" wrap>
    <div>Filter A</div>
    <div>Filter B</div>
    <div>Filter C</div>
  </Layout>
</Layout>`;

const WRAP_SNIPPET = `<Layout direction="row" gap="8" wrap style={{ maxWidth: "300px" }}>
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <div key={num}>Item {num}</div>
  ))}
</Layout>`;

const ITEMS_PER_ROW_SNIPPET = `<Layout direction="row" gap="8" itemsPerRow={3}>
  {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"].map((label) => (
    <div key={label}>{label}</div>
  ))}
</Layout>`;

const ITEMS_PER_ROW_STATISTICS_SNIPPET = `<Layout direction="row" gap="8" itemsPerRow={3}>
  <Statistics label="Total Placements" value="159" helperText="Year to date" icon="Briefcase" iconAccent="blue" />
  <Statistics label="Total Revenue" value="$1.58M" helperText="Net billed" icon="CurrencyDollar" iconAccent="green" />
  <Statistics label="Active Providers" value="138" helperText="Currently on assignment" icon="Users" iconAccent="indigo" />
  <Statistics label="Avg. Fill Time" value="10.8 days" helperText="Across all specialties" icon="Timer" iconAccent="amber" />
  <Statistics label="Renewal Rate" value="74%" helperText="Provider contract renewals" icon="ArrowsCounterClockwise" iconAccent="cyan" />
  <Statistics label="Client Satisfaction" value="4.7 / 5" helperText="Average facility rating" icon="Star" iconAccent="yellow" />
</Layout>`;

const SPACING_SAFETY_SNIPPET = `<Layout
  direction="row"
  gap="8"
  mt="12"
  mb="12"
  pl="8"
  minWidth="0"
  shrink={0}
  grow={1}
  wrap
>
  <div>Item A</div>
  <div>Item B</div>
</Layout>`;

export function LayoutDemoPage() {
  return (
    <DocPageLayout
      title="Layout"
      description="Layout is a utility for arranging items with direction, spacing, alignment, and wrapping."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Direction
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control the direction of flex items using the <code>direction</code> prop.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Row (default)
          </Text>
          <Layout direction="row" gap="8">
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Column
          </Text>
          <Layout direction="column" gap="8">
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Layout>

          <Code language="tsx" code={DIRECTION_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Appearance
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use <code>appearance</code> presets for common two-column page splits.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            equal (50/50)
          </Text>
          <Layout appearance="equal" gap="12">
            {item("Column A")}
            {item("Column B")}
          </Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            right (33/66)
          </Text>
          <Layout appearance="right" gap="12">
            {item("Sidebar")}
            {item("Main content")}
          </Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            left (66/33)
          </Text>
          <Layout appearance="left" gap="12">
            {item("Main content")}
            {item("Sidebar")}
          </Layout>

          <Code language="tsx" code={APPEARANCE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Gap
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control spacing between flex items using the <code>gap</code> prop with UDS gap tokens.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 4px</Text>
          <Layout direction="row" gap="4">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 8px</Text>
          <Layout direction="row" gap="8">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 16px</Text>
          <Layout direction="row" gap="16">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 24px</Text>
          <Layout direction="row" gap="24">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">Gap 32px</Text>
          <Layout direction="row" gap="32">{item("Item 1")}{item("Item 2")}{item("Item 3")}</Layout>

          <Code language="tsx" code={GAP_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Alignment
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Control alignment of flex items using <code>alignItems</code> and <code>justifyContent</code> props.
          </Text>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Align Items: Center
          </Text>
          <Layout direction="row" alignItems="center" gap="8" style={{ minHeight: "64px" }}>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Layout>

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Justify Content: Space Between
          </Text>
          <Layout direction="row" justifyContent="space-between" gap="8" style={{ width: "100%" }}>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Layout>

          <Code language="tsx" code={ALIGNMENT_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Full Width
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use <code>fullWidth</code> to make the container 100% wide and have first-level children share available space.
          </Text>

          <Layout direction="row" gap="8" fullWidth>
            {item("Item 1")}
            {item("Item 2")}
            {item("Item 3")}
          </Layout>

          <Code language="tsx" code={FULL_WIDTH_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Selective Full Child
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use <code>Layout.Fill</code> when only specific children should grow with <code>flex: 1</code>.
          </Text>

          <Layout direction="row" gap="8" style={{ width: "100%" }}>
            <Layout.Fill>{item("Grows")}</Layout.Fill>
            {item("Natural width")}
          </Layout>

          <Code language="tsx" code={FLEX_FILL_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Bordered Layout Example
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Combine <code>fullWidth</code> with border tokens to create section wrappers and grouped content regions.
          </Text>

          <Layout
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
            <Layout direction="row" gap="8" wrap>
              {item("Filter A")}
              {item("Filter B")}
              {item("Filter C")}
            </Layout>
          </Layout>

          <Code language="tsx" code={BORDERED_LAYOUT_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Wrap
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Allow flex items to wrap to the next line using the <code>wrap</code> prop.
          </Text>

          <Layout direction="row" gap="8" wrap style={{ maxWidth: "300px" }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} style={itemStyle}>Item {num}</div>
            ))}
          </Layout>

          <Code language="tsx" code={WRAP_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Spacing and Safety Props
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Use shorthand spacing and flex safety props when composing dense app layouts.
          </Text>
          <Layout direction="row" gap="8" mt="12" mb="12" pl="8" minWidth="0" shrink={0} grow={1} wrap>
            {item("Item A")}
            {item("Item B")}
            {item("Item C")}
          </Layout>
          <Code language="tsx" code={SPACING_SAFETY_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Items Per Row
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Set <code>itemsPerRow</code> to keep a fixed number of items per row and wrap the rest.
          </Text>

          <Layout direction="row" gap="8" itemsPerRow={3}>
            {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7"].map((label) => (
              <div key={label} style={itemStyle}>{label}</div>
            ))}
          </Layout>

          <Code language="tsx" code={ITEMS_PER_ROW_SNIPPET} />

          <Text as="h3" variant="body-16" weight="semibold" leading="regular">
            Statistics Cards (3 Per Row)
          </Text>
          <Layout direction="row" gap="8" itemsPerRow={3}>
            <Statistics label="Total Placements" value="159" helperText="Year to date" icon="Briefcase" iconAccent="blue" />
            <Statistics label="Total Revenue" value="$1.58M" helperText="Net billed" icon="CurrencyDollar" iconAccent="green" />
            <Statistics label="Active Providers" value="138" helperText="Currently on assignment" icon="Users" iconAccent="indigo" />
            <Statistics label="Avg. Fill Time" value="10.8 days" helperText="Across all specialties" icon="Timer" iconAccent="amber" />
            <Statistics label="Renewal Rate" value="74%" helperText="Provider contract renewals" icon="ArrowsCounterClockwise" iconAccent="cyan" />
            <Statistics label="Client Satisfaction" value="4.7 / 5" helperText="Average facility rating" icon="Star" iconAccent="yellow" />
          </Layout>

          <Code language="tsx" code={ITEMS_PER_ROW_STATISTICS_SNIPPET} />
        </Layout>

        <Divider variant="solid" />
        <ComponentPropsTable rows={FLEX_PROPS} title="Layout Props" />
      </Layout>
    </DocPageLayout>
  );
}

// Backward-compatible page export.
export const FlexDemoPage = LayoutDemoPage;
