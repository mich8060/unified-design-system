import { useState } from "react";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { PhoneInput } from "../../design-system/components/PhoneInput";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const PHONE_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current phone value." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the value changes." },
  { prop: "onBlur", type: "FocusEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the field loses focus and validation runs." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown when validation fails." },
];

export function PhoneInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="PhoneInput"
      description="PhoneInput filters allowed characters, auto-formats US numbers, and validates on blur."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <PhoneInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Phone number"
          helperText="Enter a 10-digit US phone number."
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Formatting Examples
        </Text>
        <PhoneInput value="123" readOnly />
        <PhoneInput value="1234567" readOnly />
        <PhoneInput value="1234567890" readOnly />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size and States
        </Text>
        <PhoneInput value="(555) 123-4567" readOnly size="default" />
        <PhoneInput value="(555) 123-4567" readOnly size="compact" />
        <PhoneInput value="(555) 12" readOnly state="error" errorText="Enter a valid 10-digit phone number." />
        <PhoneInput value="(555) 123-4567" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={PHONE_INPUT_PROPS} />
    </DocPageLayout>
  );
}
