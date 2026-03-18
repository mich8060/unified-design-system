import { useState } from "react";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { PasswordInput } from "../../design-system/components/PasswordInput";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const PASSWORD_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current password value." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the value changes." },
  { prop: "showToggle", type: "boolean", defaultValue: "true", description: "Shows or hides password visibility toggle." },
  { prop: "initiallyVisible", type: "boolean", defaultValue: "false", description: "Sets initial visibility mode." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown in error state." },
];

export function PasswordInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="PasswordInput"
      description="PasswordInput wraps TextInput with password visibility toggling."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <PasswordInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Password"
          helperText="Use at least 8 characters."
          placeholder="Enter password"
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Toggle Options
        </Text>
        <PasswordInput value="examplepassword" readOnly showToggle />
        <PasswordInput value="examplepassword" readOnly showToggle={false} />
        <PasswordInput value="examplepassword" readOnly initiallyVisible />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size and States
        </Text>
        <PasswordInput value="Password123!" readOnly size="default" />
        <PasswordInput value="Password123!" readOnly size="compact" />
        <PasswordInput value="Password123!" readOnly state="error" errorText="Password does not meet policy." />
        <PasswordInput value="Password123!" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={PASSWORD_INPUT_PROPS} />
    </DocPageLayout>
  );
}
