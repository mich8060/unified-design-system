import { useState } from "react";
import { Divider, Layout, Text, TimeInput } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TIME_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current time value in HH:MM format." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the selected time changes." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled state." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown in error state." },
];

export function TimeInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="TimeInput"
      description="TimeInput provides native time picking behavior for schedules and appointments."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <TimeInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Start time"
          helperText="Select a time in local timezone."
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <TimeInput value="09:00" readOnly size="default" />
        <TimeInput value="09:00" readOnly size="compact" />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <TimeInput value="09:00" readOnly state="default" />
        <TimeInput value="09:00" readOnly state="focused" />
        <TimeInput value="09:00" readOnly state="error" errorText="Please choose a valid time." />
        <TimeInput value="09:00" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TIME_INPUT_PROPS} />
    </DocPageLayout>
  );
}
