import { useState } from "react";
import { CurrencyInput, Divider, Layout, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const CURRENCY_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current currency value." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called on value change." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled state." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown in error state." },
];

export function CurrencyInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="CurrencyInput"
      description="CurrencyInput is a money entry field with left icon treatment and decimal input mode."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <CurrencyInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Amount"
          helperText="Enter a value in USD."
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <CurrencyInput value="1200.00" readOnly size="default" />
        <CurrencyInput value="1200.00" readOnly size="compact" />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <CurrencyInput value="1200.00" readOnly state="default" />
        <CurrencyInput value="1200.00" readOnly state="focused" />
        <CurrencyInput value="1200.00" readOnly state="error" errorText="Enter a valid amount." />
        <CurrencyInput value="1200.00" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={CURRENCY_INPUT_PROPS} />
    </DocPageLayout>
  );
}
