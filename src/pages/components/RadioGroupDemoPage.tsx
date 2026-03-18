import { Divider, Layout, RadioGroup, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const RADIO_GROUP_PROPS: ComponentPropRow[] = [
  { prop: "options", type: "RadioGroupOption[]", defaultValue: "[]", description: "Selectable radio options." },
  { prop: "value", type: "string", defaultValue: "-", description: "Controlled selected value." },
  { prop: "defaultValue", type: "string", defaultValue: "-", description: "Initial value for uncontrolled usage." },
  { prop: "onChange", type: "(value: string) => void", defaultValue: "-", description: "Fires when selected value changes." },
  { prop: "name", type: "string", defaultValue: "generated", description: "Shared radio name for browser grouping behavior." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Optional group label." },
  { prop: "orientation", type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: "Option layout direction." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables all radios in the group." },
];

export function RadioGroupDemoPage() {
  return (
    <DocPageLayout title="RadioGroup" description="RadioGroup composes Radio options for single-choice selection.">
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Vertical</Text>
        <RadioGroup
          label="Preferred contact method"
          defaultValue="email"
          options={[
            { value: "email", label: "Email" },
            { value: "phone", label: "Phone" },
            { value: "text", label: "Text Message" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Horizontal</Text>
        <RadioGroup
          orientation="horizontal"
          defaultValue="weekly"
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Disabled</Text>
        <RadioGroup
          disabled
          defaultValue="onsite"
          options={[
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
            { value: "onsite", label: "On-site" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={RADIO_GROUP_PROPS} title="RadioGroup Props" />
    </DocPageLayout>
  );
}
