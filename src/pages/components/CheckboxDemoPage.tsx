import { useMemo } from "react";
import { Checkbox } from "../../design-system/components/Checkbox";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const CHECKBOX_PROPS: ComponentPropRow[] = [
  {
    prop: "checked",
    type: "boolean",
    defaultValue: "false",
    description: "Checked state for controlled usage.",
  },
  {
    prop: "onChange",
    type: "(checked: boolean) => void",
    defaultValue: "-",
    description: "Called when the checkbox value changes.",
  },
  {
    prop: "label",
    type: "string",
    defaultValue: "-",
    description: "Label text rendered next to the checkbox.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables interaction and applies disabled styling.",
  },
  {
    prop: "indeterminate",
    type: "boolean",
    defaultValue: "false",
    description: "Displays partial-selection state (commonly for Select All).",
  },
  {
    prop: "id",
    type: "string",
    defaultValue: "auto-generated",
    description: "Optional id used for input/label association.",
  },
];

export function CheckboxDemoPage() {
  const [basicChecked, setBasicChecked] = useState(true);
  const [statesChecked, setStatesChecked] = useState(true);
  const [statesIndeterminate, setStatesIndeterminate] = useState(false);
  const [items, setItems] = useState([false, false, false]);

  const allSelected = useMemo(() => items.every(Boolean), [items]);
  const someSelected = useMemo(() => items.some(Boolean), [items]);

  const handleSelectAll = (checked: boolean) => {
    setItems((prev) => prev.map(() => checked));
  };

  const handleItemToggle = (index: number, checked: boolean) => {
    setItems((prev) => prev.map((value, itemIndex) => (itemIndex === index ? checked : value)));
  };

  return (
    <DocPageLayout
      title="Checkbox"
      description="Checkbox lets users select one or more options. Use indeterminate state for partial group selection."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="8">
          <Text as="h2" variant="heading-24" weight="bold" leading="regular">
            Basic Usage
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            A simple checkbox for selecting an option. Use checkboxes when users need to make
            multiple selections from a set of options.
          </Text>
          <Layout direction="column" gap="12">
            <Checkbox label="Unchecked checkbox" checked={false} onChange={() => {}} />
            <Checkbox
              label="Checked checkbox"
              checked={basicChecked}
              onChange={(checked: boolean) => setBasicChecked(checked)}
            />
            <Checkbox label="Disabled unchecked" checked={false} disabled onChange={() => {}} />
            <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="8">
          <Text as="h2" variant="heading-24" weight="bold" leading="regular">
            Indeterminate State
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            The indeterminate state is used when some but not all items in a group are selected.
            This is commonly used with &quot;Select All&quot; functionality.
          </Text>
          <Layout direction="column" gap="12">
            <Checkbox
              label="Select All"
              checked={allSelected}
              indeterminate={someSelected && !allSelected}
              onChange={(checked: boolean) => handleSelectAll(checked)}
            />
            <Layout direction="column" gap="12" style={{ paddingLeft: "24px" }}>
              <Checkbox
                label="Item 1"
                checked={items[0]}
                onChange={(checked: boolean) => handleItemToggle(0, checked)}
              />
              <Checkbox
                label="Item 2"
                checked={items[1]}
                onChange={(checked: boolean) => handleItemToggle(1, checked)}
              />
              <Checkbox
                label="Item 3"
                checked={items[2]}
                onChange={(checked: boolean) => handleItemToggle(2, checked)}
              />
            </Layout>
          </Layout>
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="8">
          <Text as="h2" variant="heading-24" weight="bold" leading="regular">
            Different States
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Checkboxes support unchecked, checked, disabled, and indeterminate states.
          </Text>
          <Layout direction="column" gap="12">
            <Checkbox label="Default checkbox" checked={false} onChange={() => {}} />
            <Checkbox
              label="Checked checkbox"
              checked={statesChecked}
              onChange={(checked: boolean) => setStatesChecked(checked)}
            />
            <Checkbox
              label="Indeterminate checkbox"
              checked={false}
              indeterminate={statesIndeterminate}
              onChange={(checked: boolean) => setStatesIndeterminate(!checked)}
            />
            <Checkbox label="Disabled unchecked" checked={false} disabled onChange={() => {}} />
            <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
          </Layout>
        </Layout>

        <Divider variant="solid" />
        <ComponentPropsTable rows={CHECKBOX_PROPS} />
      </Layout>
    </DocPageLayout>
  );
}
