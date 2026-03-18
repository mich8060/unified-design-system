import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const DIVIDER_PROPS: ComponentPropRow[] = [
  {
    prop: "variant",
    type: '"line" | "solid"',
    defaultValue: '"line"',
    description: "Visual divider style.",
  },
  {
    prop: "label",
    type: "string",
    defaultValue: "-",
    description: "Optional text shown inside the divider line.",
  },
  {
    prop: "icon",
    type: "string | ReactNode",
    defaultValue: "-",
    description: "Optional icon name or custom icon content.",
  },
  {
    prop: "alignment",
    type: '"left" | "center" | "right"',
    defaultValue: '"center"',
    description: "Positions divider content for the line variant.",
  },
  {
    prop: "labelWithIcon",
    type: "boolean",
    defaultValue: "false",
    description: "When true, icon appears inline with label text.",
  },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on divider root." },
  {
    prop: "...rest",
    type: "HTMLAttributes<HTMLDivElement>",
    defaultValue: "-",
    description: "Native attributes like id, data-*, and aria-*.",
  },
];

export function DividerDemoPage() {
  return (
    <DocPageLayout
      title="Divider"
      description="Divider creates visual separation between related content groups with optional label and icon treatments."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic Variants
          </Text>
          <Layout direction="column" gap="16">
            <Divider />
            <Divider variant="solid" />
          </Layout>
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Label and Icon
          </Text>
          <Layout direction="column" gap="16">
            <Divider label="Section Break" />
            <Divider icon="Star" />
            <Divider label="Add New Item" icon="Plus" labelWithIcon />
            <Divider label="Notifications" icon="Bell" />
          </Layout>
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Alignment
          </Text>
          <Layout direction="column" gap="16">
            <Divider label="Left aligned" alignment="left" />
            <Divider label="Center aligned" alignment="center" />
            <Divider label="Right aligned" alignment="right" />
          </Layout>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={DIVIDER_PROPS} />
    </DocPageLayout>
  );
}
