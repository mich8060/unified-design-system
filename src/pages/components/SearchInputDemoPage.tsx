import { useState } from "react";
import { Divider, Layout, SearchInput, Text } from "../../design-system";
import { Code } from "../../design-system/components/Code";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const SEARCH_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current search query." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called on query change." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled state." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Supporting helper copy." },
  { prop: "dropdownOptions", type: "Array<{ label: string; value: string }>", defaultValue: "-", description: "Shows an inline dropdown at the end of the input when provided." },
  { prop: "dropdownValue", type: "string", defaultValue: "-", description: "Selected inline dropdown value." },
  { prop: "onDropdownChange", type: "(value: string) => void", defaultValue: "-", description: "Called when inline dropdown selection changes." },
  { prop: "dropdownPlaceholder", type: "string", defaultValue: '"All"', description: "Placeholder shown in the inline dropdown." },
  { prop: "width", type: '"sm" | "md" | "lg" | "full"', defaultValue: '"md"', description: "Preset width behavior for common search layouts." },
  { prop: "context", type: '"default" | "toolbar"', defaultValue: '"default"', description: "Context preset for toolbar/filter row usage." },
];

const BASIC_SNIPPET = `<SearchInput
  value={value}
  onChange={(event) => setValue(event.target.value)}
  label="Search components"
  helperText="Try typing a component name."
/>\n`;

const SIZE_SNIPPET = `<SearchInput value="Button" readOnly size="default" />
<SearchInput value="Button" readOnly size="compact" />\n`;

const INLINE_DROPDOWN_SNIPPET = `<SearchInput
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Search resources"
  dropdownOptions={[
    { label: "All", value: "all" },
    { label: "Providers", value: "providers" },
    { label: "Facilities", value: "facilities" },
  ]}
  dropdownValue={scope}
  onDropdownChange={setScope}
  dropdownPlaceholder="All"
/>\n`;

const WIDTH_CONTEXT_SNIPPET = `<SearchInput size="compact" width="sm" context="toolbar" placeholder="Find documents" />
<SearchInput size="compact" width="md" context="toolbar" placeholder="Find providers" />
<SearchInput width="full" placeholder="Full width search" />\n`;

const STATE_SNIPPET = `<SearchInput value="Button" readOnly state="default" />
<SearchInput value="Button" readOnly state="focused" />
<SearchInput
  value="Button"
  readOnly
  state="error"
  errorText="Search query is required."
/>
<SearchInput value="Button" readOnly disabled />\n`;

export function SearchInputDemoPage() {
  const [value, setValue] = useState("");
  const [scope, setScope] = useState("all");

  return (
    <DocPageLayout
      title="SearchInput"
      description="SearchInput provides search semantics with a left magnifying glass icon."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <SearchInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Search components"
          helperText="Try typing a component name."
        />
        <Code language="tsx" code={BASIC_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <SearchInput value="Button" readOnly size="default" />
        <SearchInput value="Button" readOnly size="compact" />
        <Code language="tsx" code={SIZE_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Inline Dropdown
        </Text>
        <SearchInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search resources"
          dropdownOptions={[
            { label: "All", value: "all" },
            { label: "Providers", value: "providers" },
            { label: "Facilities", value: "facilities" },
          ]}
          dropdownValue={scope}
          onDropdownChange={setScope}
          dropdownPlaceholder="All"
        />
        <Code language="tsx" code={INLINE_DROPDOWN_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Width + Context Presets
        </Text>
        <SearchInput size="compact" width="sm" context="toolbar" placeholder="Find documents" />
        <SearchInput size="compact" width="md" context="toolbar" placeholder="Find providers" />
        <SearchInput width="full" placeholder="Full width search" />
        <Code language="tsx" code={WIDTH_CONTEXT_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <SearchInput value="Button" readOnly state="default" />
        <SearchInput value="Button" readOnly state="focused" />
        <SearchInput value="Button" readOnly state="error" errorText="Search query is required." />
        <SearchInput value="Button" readOnly disabled />
        <Code language="tsx" code={STATE_SNIPPET} />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={SEARCH_INPUT_PROPS} />
    </DocPageLayout>
  );
}
