import type { ReactNode } from "react";
import { Button } from "../../design-system/components/Button";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Tag } from "../../design-system/components/Tag";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";

const BASIC_SNIPPET = `<SectionHeaderBlock
  eyebrow="Overview"
  title="Candidates"
  description="Review active candidates, monitor progress, and manage handoff steps for this pipeline."
/>`;

const ACTIONS_SNIPPET = `<SectionHeaderBlock
  eyebrow="Section Header Pattern"
  title="Open Requisitions"
  description="Track open roles and quickly create or export requisition details."
  actions={
    <>
      <Button label="Export" appearance="outline" />
      <Button label="New Requisition" />
    </>
  }
/>`;

const META_SNIPPET = `<SectionHeaderBlock
  eyebrow="Pipeline"
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
  actions={
    <>
      <Button label="View Report" appearance="outline" />
      <Button label="Assign Candidate" />
    </>
  }
/>;
`;

function SectionHeaderBlock({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Layout
      direction="column"
      gap="12"
      style={{
        border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
        borderRadius: "var(--uds-radius-8)",
        padding: "var(--uds-spacing-20)",
        backgroundColor: "var(--uds-surface-primary)",
      }}
    >
      <Layout justifyContent="space-between" alignItems="flex-start" gap="16" wrap>
        <Layout direction="column" gap="8" style={{ maxWidth: "760px" }}>
          {eyebrow ? (
            <Text as="span" variant="body-12" weight="semibold" leading="regular">
              {eyebrow}
            </Text>
          ) : null}
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            {title}
          </Text>
          {description ? (
            <Text as="p" variant="body-16" leading="regular">
              {description}
            </Text>
          ) : null}
          {meta ? <Layout alignItems="center" gap="8" wrap>{meta}</Layout> : null}
        </Layout>
        {actions ? <Layout alignItems="center" gap="8" wrap>{actions}</Layout> : null}
      </Layout>
    </Layout>
  );
}

export function SectionHeaderPatternPage() {
  return (
    <DocPageLayout
      title="Section Header"
      description="Section Header is a reusable pattern for page and section intros using existing UDS primitives."
    >
      <Layout direction="column" gap="32">
        <Layout direction="column" gap="10">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            Basic
          </Text>
          <SectionHeaderBlock
            eyebrow="Overview"
            title="Candidates"
            description="Review active candidates, monitor progress, and manage handoff steps for this pipeline."
          />
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            With Actions
          </Text>
          <SectionHeaderBlock
            eyebrow="Section Header Pattern"
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

        <Layout direction="column" gap="10">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            With Metadata
          </Text>
          <SectionHeaderBlock
            eyebrow="Pipeline"
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
            actions={
              <>
                <Button label="View Report" appearance="outline" />
                <Button label="Assign Candidate" />
              </>
            }
          />
          <Code language="tsx" code={META_SNIPPET} />
        </Layout>
      </Layout>
    </DocPageLayout>
  );
}
