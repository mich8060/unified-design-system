import { DescriptionList } from "../../design-system/components/DescriptionList";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Code } from "../../design-system/components/Code";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const DESCRIPTION_LIST_PROPS: ComponentPropRow[] = [
  { prop: "items", type: "Array<{ label: ReactNode; value: ReactNode; id?: string }>", defaultValue: "-", description: "Rows rendered in key-value order." },
  { prop: "density", type: '"default" | "compact"', defaultValue: '"default"', description: "Controls row padding density." },
  { prop: "labelWidth", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls the fixed label column width." },
  { prop: "variant", type: '"default" | "separators"', defaultValue: '"default"', description: "Controls surface treatment and border behavior." },
  { prop: "bordered", type: "boolean", defaultValue: "true", description: "Shows the outer border and row separators." },
  { prop: "fullWidth", type: "boolean", defaultValue: "true", description: "Expands list to fill parent width when true." },
];

const DEFAULT_SNIPPET = `<DescriptionList
  items={[
    { label: "Provider", value: "Dr. Jane Smith" },
    { label: "Status", value: "Active" },
    { label: "Specialty", value: "Cardiology" },
  ]}
/>`;

const COMPACT_SNIPPET = `<DescriptionList
  density="compact"
  labelWidth="sm"
  bordered
  items={[
    { label: "NPI", value: "1234567890" },
    { label: "License", value: "CO-12345" },
    { label: "Expires", value: "2027-06-30" },
  ]}
/>`;

const SEPARATORS_SNIPPET = `<DescriptionList
  variant="separators"
  bordered={false}
  fullWidth={false}
  density="compact"
  labelWidth="sm"
  items={[
    { label: "Author", value: "@Michael-Stevens" },
    { label: "Last updated", value: "March 18, 2026" },
    { label: "Version", value: "x.y.z PAGE" },
  ]}
/>`;

export function DescriptionListDemoPage() {
  return (
    <DocPageLayout
      title="DescriptionList"
      description="DescriptionList renders compact, consistent metadata rows for side panels, cards, and detail views."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Default
          </Text>
          <DescriptionList
            items={[
              { label: "Provider", value: "Dr. Jane Smith" },
              { label: "Status", value: "Active" },
              { label: "Specialty", value: "Cardiology" },
            ]}
          />
          <Code language="tsx" code={DEFAULT_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Compact Density
          </Text>
          <DescriptionList
            density="compact"
            labelWidth="sm"
            bordered
            items={[
              { label: "NPI", value: "1234567890" },
              { label: "License", value: "CO-12345" },
              { label: "Expires", value: "2027-06-30" },
            ]}
          />
          <Code language="tsx" code={COMPACT_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Separators Variant
          </Text>
          <DescriptionList
            variant="separators"
            bordered={false}
            fullWidth={false}
            density="compact"
            labelWidth="sm"
            items={[
              { label: "Author", value: "@Michael-Stevens" },
              { label: "Last updated", value: "March 18, 2026" },
              { label: "Version", value: "x.y.z PAGE" },
            ]}
          />
          <Code language="tsx" code={SEPARATORS_SNIPPET} />
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={DESCRIPTION_LIST_PROPS} />
    </DocPageLayout>
  );
}
