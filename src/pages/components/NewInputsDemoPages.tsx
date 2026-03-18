import { useMemo, useState } from "react";
import { CurrencyInput } from "../../design-system/components/CurrencyInput";
import { DateInput } from "../../design-system/components/DateInput";
import { DateRangeInput } from "../../design-system/components/DateRangeInput";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { PasswordInput } from "../../design-system/components/PasswordInput";
import { PhoneInput } from "../../design-system/components/PhoneInput";
import { SearchInput } from "../../design-system/components/SearchInput";
import { Text } from "../../design-system/components/Text";
import { TimeInput } from "../../design-system/components/TimeInput";
import { URLInput } from "../../design-system/components/URLInput";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";
import { DocPageLayout } from "../docs/DocPageLayout";

const SHARED_ROWS: ComponentPropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Current value for controlled usage." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called whenever the input value changes." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Optional visible label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Helper text under the input." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error text when state is error." },
];

const PHONE_ROWS: ComponentPropRow[] = [
  ...SHARED_ROWS,
  { prop: "onValidityChange", type: "(isValid: boolean) => void", defaultValue: "-", description: "Returns phone validity after formatting." },
  { prop: "maxDigits", type: "number", defaultValue: "10", description: "Maximum phone digits accepted." },
];

function InputStatesPreview({ children }: { children: React.ReactNode }) {
  return <Layout direction="column" gap="12">{children}</Layout>;
}

export function DateInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="DateInput" description="DateInput builds on TextInput with a date-native input type.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <DateInput value={value} onChange={(e) => setValue(e.target.value)} label="Date" placeholder="Select date" />
            <DateInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" label="Compact" />
            <DateInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Please select a date." label="Error" />
            <DateInput value="2026-03-01" readOnly state="disabled" label="Disabled" />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="DateInput Props" />
    </DocPageLayout>
  );
}

export function DateRangeInputDemoPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  return (
    <DocPageLayout
      title="DateRangeInput"
      description="DateRangeInput composes start/end dates into a single unified field with an em dash separator."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <DateRangeInput
              startValue={start}
              endValue={end}
              onStartChange={(e) => setStart(e.target.value)}
              onEndChange={(e) => setEnd(e.target.value)}
              startPlaceholder="MM/DD/YY"
              endPlaceholder="MM/DD/YY"
            />
            <DateRangeInput
              startValue={start}
              endValue={end}
              onStartChange={(e) => setStart(e.target.value)}
              onEndChange={(e) => setEnd(e.target.value)}
              size="compact"
              startPlaceholder="MM/DD/YY"
              endPlaceholder="MM/DD/YY"
            />
            <DateRangeInput
              startValue={start}
              endValue={end}
              onStartChange={(e) => setStart(e.target.value)}
              onEndChange={(e) => setEnd(e.target.value)}
              state="focused"
            />
            <DateRangeInput
              startValue={start}
              endValue={end}
              onStartChange={(e) => setStart(e.target.value)}
              onEndChange={(e) => setEnd(e.target.value)}
              state="error"
            />
            <DateRangeInput startValue="2026-03-01" endValue="2026-03-31" disabled />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="DateRangeInput Props" />
    </DocPageLayout>
  );
}

export function PasswordInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="PasswordInput" description="PasswordInput includes optional visibility toggle behavior.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter password" />
            <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} showToggle={false} placeholder="No toggle" />
            <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Password is required." />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="PasswordInput Props" />
    </DocPageLayout>
  );
}

export function PhoneInputDemoPage() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const validityLabel = useMemo(() => (isValid ? "Valid phone number" : "Enter 10 digits"), [isValid]);

  return (
    <DocPageLayout title="PhoneInput" description="PhoneInput formats and validates phone values while restricting allowed characters.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <PhoneInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onValidityChange={setIsValid}
              label="Phone Number"
              helperText={validityLabel}
            />
            <PhoneInput value="(555)123-4567" readOnly />
            <PhoneInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <PhoneInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Use a 10-digit phone number." />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={PHONE_ROWS} title="PhoneInput Props" />
    </DocPageLayout>
  );
}

export function CurrencyInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="CurrencyInput" description="CurrencyInput uses TextInput with currency affordances and decimal input mode.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <CurrencyInput value={value} onChange={(e) => setValue(e.target.value)} label="Amount" />
            <CurrencyInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <CurrencyInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Enter a valid amount." />
            <CurrencyInput value="1234.56" readOnly state="disabled" />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="CurrencyInput Props" />
    </DocPageLayout>
  );
}

export function SearchInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="SearchInput" description="SearchInput presets search semantics and icon behavior.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search components" />
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Search query is invalid." />
            <SearchInput value="Read-only search" readOnly />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="SearchInput Props" />
    </DocPageLayout>
  );
}

export function URLInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="URLInput" description="URLInput is optimized for web address entry with URL semantics.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <URLInput value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://" />
            <URLInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <URLInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="URL is invalid." />
            <URLInput value="https://www.chghealthcare.com" readOnly />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="URLInput Props" />
    </DocPageLayout>
  );
}

export function TimeInputDemoPage() {
  const [value, setValue] = useState("");
  return (
    <DocPageLayout title="TimeInput" description="TimeInput uses native time selection behavior on top of TextInput styles.">
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">Examples</Text>
          <InputStatesPreview>
            <TimeInput value={value} onChange={(e) => setValue(e.target.value)} />
            <TimeInput value={value} onChange={(e) => setValue(e.target.value)} size="compact" />
            <TimeInput value={value} onChange={(e) => setValue(e.target.value)} state="error" errorText="Select a valid time." />
            <TimeInput value="09:30" readOnly state="disabled" />
          </InputStatesPreview>
        </Layout>
      </Layout>
      <Divider variant="solid" />
      <ComponentPropsTable rows={SHARED_ROWS} title="TimeInput Props" />
    </DocPageLayout>
  );
}
