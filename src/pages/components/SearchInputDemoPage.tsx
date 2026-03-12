import { useState } from "react";
import { Divider, Flex, SearchInput, Text } from "../../design-system";
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
];

export function SearchInputDemoPage() {
  const [value, setValue] = useState("");
  const [scope, setScope] = useState("all");

  return (
    <DocPageLayout
      title="SearchInput"
      description="SearchInput provides search semantics with a left magnifying glass icon."
    >
      <Flex direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <SearchInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="Search components"
          helperText="Try typing a component name."
        />
      </Flex>

      <Divider variant="solid" />

      <Flex direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <SearchInput value="Button" readOnly size="default" />
        <SearchInput value="Button" readOnly size="compact" />
      </Flex>

      <Divider variant="solid" />

      <Flex direction="column" gap="16">
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
      </Flex>

      <Divider variant="solid" />

      <Flex direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <SearchInput value="Button" readOnly state="default" />
        <SearchInput value="Button" readOnly state="focused" />
        <SearchInput value="Button" readOnly state="error" errorText="Search query is required." />
        <SearchInput value="Button" readOnly disabled />
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={SEARCH_INPUT_PROPS} />
    </DocPageLayout>
  );
}
