import { CheckboxGroup, Divider, Layout, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const CHECKBOX_GROUP_PROPS: ComponentPropRow[] = [
  { prop: "options", type: "CheckboxGroupOption[]", defaultValue: "[]", description: "Selectable checkbox options." },
  { prop: "values", type: "string[]", defaultValue: "-", description: "Controlled selected values." },
  { prop: "defaultValues", type: "string[]", defaultValue: "[]", description: "Initial values for uncontrolled usage." },
  { prop: "onChange", type: "(values: string[]) => void", defaultValue: "-", description: "Fires when selected values change." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Optional group label." },
  { prop: "orientation", type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: "Option layout direction." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables all checkboxes in the group." },
];

export function CheckboxGroupDemoPage() {
  return (
    <DocPageLayout title="CheckboxGroup" description="CheckboxGroup composes Checkbox options for multi-select choices.">
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Vertical</Text>
        <CheckboxGroup
          label="Specialties"
          defaultValues={["anesthesiology"]}
          options={[
            { value: "anesthesiology", label: "Anesthesiology" },
            { value: "cardiology", label: "Cardiology" },
            { value: "neurology", label: "Neurology" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Horizontal</Text>
        <CheckboxGroup
          orientation="horizontal"
          defaultValues={["remote", "hybrid"]}
          options={[
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
            { value: "onsite", label: "On-site" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">Disabled</Text>
        <CheckboxGroup
          disabled
          defaultValues={["email"]}
          options={[
            { value: "email", label: "Email Alerts" },
            { value: "sms", label: "SMS Alerts" },
            { value: "push", label: "Push Notifications" },
          ]}
        />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={CHECKBOX_GROUP_PROPS} title="CheckboxGroup Props" />
    </DocPageLayout>
  );
}
