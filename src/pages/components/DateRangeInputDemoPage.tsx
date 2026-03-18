import { useState } from "react";
import { Code } from "../../design-system/components/Code";
import { DateRangeInput } from "../../design-system/components/DateRangeInput";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const DATE_RANGE_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "startValue", type: "string", defaultValue: "-", description: "Start date value in YYYY-MM-DD format." },
  { prop: "endValue", type: "string", defaultValue: "-", description: "End date value in YYYY-MM-DD format." },
  { prop: "onStartChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the start date changes." },
  { prop: "onEndChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called when the end date changes." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables both date inputs." },
];

const BASIC_SNIPPET = `const [startValue, setStartValue] = useState("");
const [endValue, setEndValue] = useState("");

<DateRangeInput
  startValue={startValue}
  endValue={endValue}
  onStartChange={(event) => setStartValue(event.target.value)}
  onEndChange={(event) => setEndValue(event.target.value)}
/>`;

const SIZE_SNIPPET = `<DateRangeInput
  startValue="2026-03-01"
  endValue="2026-03-07"
  size="default"
/>
<DateRangeInput
  startValue="2026-03-01"
  endValue="2026-03-07"
  size="compact"
/>`;

const STATE_SNIPPET = `<DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="default" />
<DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="focused" />
<DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="error" />
<DateRangeInput startValue="2026-03-01" endValue="2026-03-07" disabled />`;

export function DateRangeInputDemoPage() {
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");

  return (
    <DocPageLayout
      title="DateRangeInput"
      description="DateRangeInput composes two date fields for start and end date selection."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <DateRangeInput
          startValue={startValue}
          endValue={endValue}
          onStartChange={(event) => setStartValue(event.target.value)}
          onEndChange={(event) => setEndValue(event.target.value)}
        />
        <Code language="tsx" code={BASIC_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" size="default" />
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" size="compact" />
        <Code language="tsx" code={SIZE_SNIPPET} />
      </Layout>

      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="default" />
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="focused" />
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" state="error" />
        <DateRangeInput startValue="2026-03-01" endValue="2026-03-07" disabled />
        <Code language="tsx" code={STATE_SNIPPET} />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={DATE_RANGE_INPUT_PROPS} />
    </DocPageLayout>
  );
}
