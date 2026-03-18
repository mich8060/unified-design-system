import { Divider } from "../../design-system/components/Divider";
import { Dropdown } from "../../design-system/components/Dropdown";
import { Field } from "../../design-system/components/Field";
import { Layout } from "../../design-system/components/Layout";
import { TextInput } from "../../design-system/components/TextInput";
import { Textarea } from "../../design-system/components/Textarea";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const FIELD_PROPS: ComponentPropRow[] = [
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Field label displayed above the control." },
  { prop: "state", type: '"default" | "error"', defaultValue: '"default"', description: "Field-level visual state for text and metadata." },
  { prop: "required", type: "boolean", defaultValue: "false", description: "Adds required indicator to the label." },
  { prop: "helperMessage", type: "ReactNode", defaultValue: "-", description: "Supporting message displayed below the control." },
  { prop: "maxLength", type: "number", defaultValue: "-", description: "Shows character counter when provided with value." },
  { prop: "value", type: "string | number", defaultValue: "-", description: "Current input value used by the character counter." },
  { prop: "infoIcon", type: "string", defaultValue: "-", description: "Optional icon name shown in the label row." },
  { prop: "onInfoClick", type: "() => void", defaultValue: "-", description: "Callback fired when the info icon is clicked." },
  { prop: "id", type: "string", defaultValue: "auto-generated", description: "Control id used for label association." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Wrapped input control (TextInput, Dropdown, Textarea, etc)." },
];

const ROLE_OPTIONS = [
  { value: "designer", label: "Designer" },
  { value: "engineer", label: "Engineer" },
  { value: "product-manager", label: "Product Manager" },
];

const toInputValue = (next: unknown): string =>
  typeof next === "string" ? next : String(next ?? "");

export function FieldDemoPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<unknown>();
  const [notes, setNotes] = useState("");
  const [showInfoMessage, setShowInfoMessage] = useState(false);

  return (
    <DocPageLayout
      title="Field"
      description="Field wraps form controls with consistent label, helper messaging, required indication, and metadata."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <Field label="Work Email" helperMessage="Use your company email address.">
          <TextInput
            value={email}
            onChange={(event) => {
              const next =
                typeof event === "object" && event !== null && "target" in event
                  ? (event as { target?: { value?: unknown } }).target?.value
                  : event;
              setEmail(toInputValue(next));
            }}
            placeholder="you@company.com"
            type="email"
          />
        </Field>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Required and Info
        </Text>
        <Field
          label="Role"
          required
          infoIcon="Info"
          onInfoClick={() => setShowInfoMessage((previous) => !previous)}
          helperMessage={showInfoMessage ? "Choose the role that best matches the user." : " "}
        >
          <Dropdown
            options={ROLE_OPTIONS}
            value={role}
            onChange={(value: unknown) => setRole(value)}
            placeholder="Select role"
          />
        </Field>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Error and Disabled States
        </Text>
        <Field
          label="Email (Error)"
          state="error"
          required
          helperMessage="Please enter a valid email address."
        >
          <TextInput value="invalid-email" state="error" readOnly />
        </Field>
        <Field label="Department (Disabled)" helperMessage="This field is managed by IT.">
          <TextInput value="Clinical Operations" disabled readOnly />
        </Field>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Textarea Composition
        </Text>
        <Field
          label="Notes"
          helperMessage="Provide additional context for this request."
          maxLength={200}
          value={notes}
        >
          <Textarea
            value={notes}
            onChange={(event) => {
              const next =
                typeof event === "object" && event !== null && "target" in event
                  ? (event as { target?: { value?: unknown } }).target?.value
                  : event;
              setNotes(toInputValue(next));
            }}
            placeholder="Add details..."
          />
        </Field>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={FIELD_PROPS} />
    </DocPageLayout>
  );
}
