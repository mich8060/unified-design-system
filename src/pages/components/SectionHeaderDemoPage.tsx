import { Button, Code, Divider, Layout, SectionHeader, Tag, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const SECTION_HEADER_PROPS: ComponentPropRow[] = [
  { prop: "eyebrow", type: "ReactNode", defaultValue: "-", description: "Optional small label shown above the title." },
  { prop: "title", type: "ReactNode", defaultValue: "-", description: "Primary section heading content." },
  { prop: "description", type: "ReactNode", defaultValue: "-", description: "Optional supporting text under the title." },
  { prop: "meta", type: "ReactNode", defaultValue: "-", description: "Optional metadata row (tags, status, timestamps)." },
  { prop: "actions", type: "ReactNode", defaultValue: "-", description: "Optional right-side action content." },
  { prop: "divider", type: "boolean", defaultValue: "false", description: "Adds a bottom divider when true." },
  { prop: "className", type: "string", defaultValue: '""', description: "Optional additional classes for the root." },
];

const BASIC_SNIPPET = `<SectionHeader
  eyebrow="Overview"
  title="Candidates"
  description="Review active candidates, monitor progress, and manage handoff steps."
/>`;

const ACTIONS_SNIPPET = `<SectionHeader
  eyebrow="Section Header"
  title="Open Requisitions"
  description="Track open roles and quickly create or export requisition details."
  actions={
    <>
      <Button label="Export" appearance="outline" />
      <Button label="New Requisition" />
    </>
  }
/>`;

const META_SNIPPET = `<SectionHeader
  title="Cardiology - Denver"
  description="Current status and assignment metadata for this workflow."
  meta={
    <>
      <Tag label="8 Active" color="green" />
      <Tag label="2 Needs Review" color="orange" />
      <Text as="span" variant="body-14" leading="regular">
        Updated 5 minutes ago
      </Text>
    </>
  }
/>;
`;

const FULL_SNIPPET = `<SectionHeader
  eyebrow="Pipeline"
  title="Anesthesiology - Phoenix"
  description="Use this layout for section intros that need context, status metadata, and immediate actions."
  divider
  meta={
    <>
      <Tag label="12 Active" color="blue" />
      <Tag label="3 At Risk" color="red" />
      <Text as="span" variant="body-14" leading="regular">
        Last synced 2 minutes ago
      </Text>
    </>
  }
  actions={
    <>
      <Button label="View Report" appearance="outline" />
      <Button label="Add Candidate" />
    </>
  }
/>;
`;

export function SectionHeaderDemoPage() {
  return (
    <DocPageLayout
      title="SectionHeader"
      description="SectionHeader is a reusable heading block for pages and sections with optional metadata and actions."
    >
      <Layout direction="column" gap="32">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic
          </Text>
          <SectionHeader
            eyebrow="Overview"
            title="Candidates"
            description="Review active candidates, monitor progress, and manage handoff steps."
          />
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Actions
          </Text>
          <SectionHeader
            eyebrow="Section Header"
            title="Open Requisitions"
            description="Track open roles and quickly create or export requisition details."
            actions={
              <>
                <Button label="Export" appearance="outline" />
                <Button label="New Requisition" />
              </>
            }
          />
          <Code language="tsx" code={ACTIONS_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Metadata
          </Text>
          <SectionHeader
            title="Cardiology - Denver"
            description="Current status and assignment metadata for this workflow."
            meta={
              <>
                <Tag label="8 Active" color="green" />
                <Tag label="2 Needs Review" color="orange" />
                <Text as="span" variant="body-14" leading="regular">
                  Updated 5 minutes ago
                </Text>
              </>
            }
          />
          <Code language="tsx" code={META_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Full Example (Meta + Actions + Divider)
          </Text>
          <SectionHeader
            eyebrow="Pipeline"
            title="Anesthesiology - Phoenix"
            description="Use this layout for section intros that need context, status metadata, and immediate actions."
            divider
            meta={
              <>
                <Tag label="12 Active" color="blue" />
                <Tag label="3 At Risk" color="red" />
                <Text as="span" variant="body-14" leading="regular">
                  Last synced 2 minutes ago
                </Text>
              </>
            }
            actions={
              <>
                <Button label="View Report" appearance="outline" />
                <Button label="Add Candidate" />
              </>
            }
          />
          <Code language="tsx" code={FULL_SNIPPET} />
        </Layout>

      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={SECTION_HEADER_PROPS} title="SectionHeader Props" />
    </DocPageLayout>
  );
}
