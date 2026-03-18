import { Branding, Button, Code, Divider, Layout, Text, Toolbar } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TOOLBAR_PROPS: ComponentPropRow[] = [
  { prop: "left", type: "ReactNode", defaultValue: "-", description: "Content rendered in the left slot." },
  { prop: "center", type: "ReactNode", defaultValue: "-", description: "Content rendered in the center slot." },
  { prop: "right", type: "ReactNode", defaultValue: "-", description: "Content rendered in the right slot." },
  { prop: "className", type: "string", defaultValue: '""', description: "Optional additional classes for the root element." },
];

const TITLE_SNIPPET = `<Toolbar
  left={<Button appearance="outline" label="Back" icon="ArrowLeft" layout="icon-left" />}
  center="Candidates"
  right={<Button label="Add Candidate" />}
/>\n`;

const BRANDING_SNIPPET = `<Toolbar
  left={<Button appearance="outline" label="Menu" icon="List" layout="icon-left" />}
  center={<Branding brand="connect" symbol />}
  right={<Button appearance="soft" label="Export" icon="DownloadSimple" layout="icon-left" />}
/>\n`;

export function ToolbarDemoPage() {
  return (
    <DocPageLayout
      title="Toolbar"
      description="Toolbar creates a top bar with three flexible slots: left, center, and right."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Centered Title
        </Text>
        <Toolbar
          left={<Button appearance="outline" label="Back" icon="ArrowLeft" layout="icon-left" />}
          center="Candidates"
          right={<Button label="Add Candidate" />}
        />
        <Code language="tsx" code={TITLE_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Centered Branding
        </Text>
        <Toolbar
          left={<Button appearance="outline" label="Menu" icon="List" layout="icon-left" />}
          center={<Branding brand="connect" symbol />}
          right={<Button appearance="soft" label="Export" icon="DownloadSimple" layout="icon-left" />}
        />
        <Code language="tsx" code={BRANDING_SNIPPET} />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TOOLBAR_PROPS} title="Toolbar Props" />
    </DocPageLayout>
  );
}
