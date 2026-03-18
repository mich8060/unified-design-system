import { useState } from "react";
import { Divider, Layout, Text, TextInput } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const URL_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current URL value." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the URL changes." },
  { prop: "type", type: '"url"', defaultValue: '"url"', description: "Uses native URL input semantics." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error copy shown in error state." },
];

export function URLInputDemoPage() {
  const [value, setValue] = useState("");

  return (
    <DocPageLayout
      title="URLInput"
      description="URLInput demos URL entry behavior using TextInput with native url type."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <TextInput
          type="url"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Website"
          placeholder="https://example.com"
          helperText="Include protocol when possible."
        />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <TextInput type="url" value="https://example.com" readOnly size="default" />
        <TextInput type="url" value="https://example.com" readOnly size="compact" />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <TextInput type="url" value="https://example.com" readOnly state="default" />
        <TextInput type="url" value="https://example.com" readOnly state="focused" />
        <TextInput type="url" value="not-a-url" readOnly state="error" errorText="Enter a valid URL." />
        <TextInput type="url" value="https://example.com" readOnly disabled />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={URL_INPUT_PROPS} />
    </DocPageLayout>
  );
}
