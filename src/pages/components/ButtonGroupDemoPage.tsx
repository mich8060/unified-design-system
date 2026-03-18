import { ButtonGroup, Code, Divider, Layout, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const BUTTON_GROUP_PROPS: ComponentPropRow[] = [
  { prop: "options", type: "ButtonGroupOption[]", defaultValue: "[]", description: "Button option objects rendered by the group." },
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Layout direction for grouped buttons." },
  { prop: "size", type: '"xsmall" | "small" | "default" | "large"', defaultValue: '"default"', description: "Default size passed to options without explicit size." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables all options in the group." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Optional custom button children when options are not provided." },
];

const HORIZONTAL_SNIPPET = `<ButtonGroup
  options={[
    { id: "cancel", label: "Cancel" },
    { id: "save", label: "Save" },
  ]}
/>`;

const VERTICAL_SNIPPET = `<ButtonGroup
  orientation="vertical"
  options={[
    { id: "draft", label: "Save Draft" },
    { id: "publish", label: "Publish" },
    { id: "archive", label: "Archive" },
  ]}
/>`;

export function ButtonGroupDemoPage() {
  return (
    <DocPageLayout title="ButtonGroup" description="ButtonGroup composes related Button actions with shared orientation and spacing.">
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Horizontal</Text>
        <ButtonGroup
          options={[
            { id: "cancel", label: "Cancel" },
            { id: "save", label: "Save" },
          ]}
        />
        <Code language="tsx" code={HORIZONTAL_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Vertical</Text>
        <ButtonGroup
          orientation="vertical"
          options={[
            { id: "draft", label: "Save Draft" },
            { id: "publish", label: "Publish" },
            { id: "archive", label: "Archive" },
          ]}
        />
        <Code language="tsx" code={VERTICAL_SNIPPET} />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={BUTTON_GROUP_PROPS} title="ButtonGroup Props" />
    </DocPageLayout>
  );
}
