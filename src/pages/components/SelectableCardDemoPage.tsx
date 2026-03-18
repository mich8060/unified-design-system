import { ActionMenu } from "../../design-system/components/ActionMenu";
import { Icon } from "../../design-system/components/Icon";
import { SelectableCard } from "../../design-system/components/SelectableCard";
import { Status } from "../../design-system/components/Status";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Code } from "../../design-system/components/Code";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const SELECTABLE_CARD_PROPS: ComponentPropRow[] = [
  { prop: "selected", type: "boolean", defaultValue: "false", description: "Applies selected visual state and aria-pressed when interactive." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interactions and applies disabled visual treatment." },
  { prop: "onSelect", type: "() => void", defaultValue: "-", description: "Selection callback for interactive row/card behavior." },
  { prop: "leading", type: "ReactNode", defaultValue: "-", description: "Leading media/icon slot." },
  { prop: "title", type: "ReactNode", defaultValue: "-", description: "Primary title content." },
  { prop: "description", type: "ReactNode", defaultValue: "-", description: "Supporting description text." },
  { prop: "meta", type: "ReactNode", defaultValue: "-", description: "Optional metadata slot in the content column." },
  { prop: "status", type: "ReactNode", defaultValue: "-", description: "Status slot for badges/labels." },
  { prop: "trailing", type: "ReactNode", defaultValue: "-", description: "Trailing actions slot." },
];

const EXAMPLE_SNIPPET = `<SelectableCard
  selected={selectedId === "doc-1"}
  onSelect={() => setSelectedId("doc-1")}
  leading={<Icon name="File" size={20} />}
  title="Colorado License Renewal"
  description="Updated 2h ago"
  status={<Status label="Ready" variant="green" />}
  trailing={<ActionMenu items={[{ label: "View" }, { label: "Archive" }]} />}
/>\n`;

export function SelectableCardDemoPage() {
  const [selectedId, setSelectedId] = useState<string>("doc-1");

  return (
    <DocPageLayout
      title="SelectableCard"
      description="SelectableCard is a reusable selectable list/card primitive with leading, status, and trailing action slots."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Interactive Row Pattern
          </Text>
          <SelectableCard
            selected={selectedId === "doc-1"}
            onSelect={() => setSelectedId("doc-1")}
            leading={<Icon name="File" size={20} />}
            title="Colorado License Renewal"
            description="Updated 2h ago"
            status={<Status label="Ready" variant="green" />}
            trailing={<ActionMenu items={[{ label: "View" }, { label: "Archive" }]} />}
          />
          <SelectableCard
            selected={selectedId === "doc-2"}
            onSelect={() => setSelectedId("doc-2")}
            leading={<Icon name="FilePdf" size={20} />}
            title="DEA Certificate Verification"
            description="Updated 4h ago"
            status={<Status label="In Review" variant="yellow" />}
            trailing={<ActionMenu items={[{ label: "Open" }, { label: "Assign" }]} />}
          />
          <Code language="tsx" code={EXAMPLE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Disabled
          </Text>
          <SelectableCard
            disabled
            leading={<Icon name="Lock" size={20} />}
            title="Archived document"
            description="Selection disabled"
          />
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SELECTABLE_CARD_PROPS} />
    </DocPageLayout>
  );
}
