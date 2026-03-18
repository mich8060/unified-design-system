import { useState } from "react";
import { DateInput } from "../../design-system/components/DateInput";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const DATE_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current date value in YYYY-MM-DD format." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the selected date changes." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled state." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown in error state." },
];

export function DateInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="DateInput"
      description="DateInput provides a native date picker field for single-date selection."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <DateInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Appointment date"
          helperText="Select one date."
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <DateInput value="2026-03-04" readOnly size="default" />
        <DateInput value="2026-03-04" readOnly size="compact" />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <DateInput value="2026-03-04" readOnly state="default" />
        <DateInput value="2026-03-04" readOnly state="focused" />
        <DateInput value="2026-03-04" readOnly state="error" errorText="Please choose a valid date." />
        <DateInput value="2026-03-04" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={DATE_INPUT_PROPS} />
    </DocPageLayout>
  );
}
