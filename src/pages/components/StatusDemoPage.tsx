import { Code, Divider, Layout, Status, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const STATUS_PROPS: ComponentPropRow[] = [
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Optional status label text." },
  { prop: "variant", type: "string", defaultValue: '"blue"', description: "DotStatus color variant passed through to the status dot." },
  {
    prop: "appearance",
    type: '"light-gray" | "white" | "transparent"',
    defaultValue: '"light-gray"',
    description: "Controls status surface and border treatment.",
  },
  { prop: "shape", type: '"pill" | "rounded"', defaultValue: '"pill"', description: "Controls border radius style." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and reduces emphasis." },
  { prop: "onClick", type: "(event) => void", defaultValue: "-", description: "Renders as a button when provided." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the root element." },
];

const BASIC_SNIPPET = `<Status label="Online" variant="green" />
<Status label="Pending" variant="orange" />
<Status label="Alert" variant="red" />`;

const APPEARANCE_SNIPPET = `<Status label="Light Gray" appearance="light-gray" variant="blue" />
<Status label="White" appearance="white" variant="blue" />
<Status label="Transparent" appearance="transparent" variant="blue" />`;

const SHAPE_SNIPPET = `<Status label="Pill" shape="pill" variant="cyan" />
<Status label="Rounded" shape="rounded" variant="cyan" />`;

export function StatusDemoPage() {
  return (
    <DocPageLayout
      title="Status"
      description="Status combines a DotStatus indicator and optional text label for compact inline state display."
    >
      <Layout direction="column" gap="32">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic
          </Text>
          <Layout gap="12" wrap alignItems="center">
            <Status label="Online" variant="green" />
            <Status label="Pending" variant="orange" />
            <Status label="Alert" variant="red" />
          </Layout>
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Appearance Variants
          </Text>
          <Layout gap="12" wrap alignItems="center">
            <Status label="Light Gray" appearance="light-gray" variant="blue" />
            <Status label="White" appearance="white" variant="blue" />
            <Status label="Transparent" appearance="transparent" variant="blue" />
          </Layout>
          <Code language="tsx" code={APPEARANCE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Shape Variants
          </Text>
          <Layout gap="12" wrap alignItems="center">
            <Status label="Pill" shape="pill" variant="cyan" />
            <Status label="Rounded" shape="rounded" variant="cyan" />
          </Layout>
          <Code language="tsx" code={SHAPE_SNIPPET} />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={STATUS_PROPS} title="Status Props" />
    </DocPageLayout>
  );
}
