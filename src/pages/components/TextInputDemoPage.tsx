import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { TextInput } from "../../design-system/components/TextInput";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TEXT_INPUT_PROPS: ComponentPropRow[] = [
  { prop: "value", type: "string | number | readonly string[]", defaultValue: "-", description: "Current input value." },
  { prop: "onChange", type: "ChangeEventHandler<HTMLInputElement>", defaultValue: "-", description: "Called on value change." },
  { prop: "type", type: "string", defaultValue: '"text"', description: "Input type such as text, email, password." },
  { prop: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Visual size variant." },
  { prop: "state", type: '"default" | "focused" | "error" | "disabled"', defaultValue: '"default"', description: "Visual state token." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Native disabled state (overrides state)." },
  { prop: "icon", type: "string | ReactNode", defaultValue: "-", description: "Optional icon name or custom icon node." },
  { prop: "iconPosition", type: '"left" | "right"', defaultValue: '"right"', description: "Icon placement." },
  { prop: "onIconClick", type: "MouseEventHandler<HTMLButtonElement>", defaultValue: "-", description: "When provided, icon becomes clickable button." },
  { prop: "label", type: "ReactNode", defaultValue: "-", description: "Visible field label." },
  { prop: "helperText", type: "ReactNode", defaultValue: "-", description: "Helper text below input." },
  { prop: "errorText", type: "ReactNode", defaultValue: "-", description: "Error text shown when state is error." },
];

export function TextInputDemoPage() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <DocPageLayout
      title="TextInput"
      description="TextInput supports standard entry, icon affordances, and stateful form experiences."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Basic Usage
        </Text>
        <TextInput
          value={email}
          onChange={(e) => {
            const next =
              typeof e === "object" && e !== null && "target" in e
                ? (e as { target?: { value?: unknown } }).target?.value
                : e;
            setEmail(typeof next === "string" ? next : String(next ?? ""));
          }}
          placeholder="Enter your email"
          type="email"
        />
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Icon Variants
        </Text>
        <Layout direction="column" gap="12">
          <TextInput
            value={search}
            onChange={(e) => {
              const next =
                typeof e === "object" && e !== null && "target" in e
                  ? (e as { target?: { value?: unknown } }).target?.value
                  : e;
              setSearch(typeof next === "string" ? next : String(next ?? ""));
            }}
            placeholder="Search components"
            icon="MagnifyingGlass"
            iconPosition="right"
          />
          <TextInput
            value={search}
            onChange={(e) => {
              const next =
                typeof e === "object" && e !== null && "target" in e
                  ? (e as { target?: { value?: unknown } }).target?.value
                  : e;
              setSearch(typeof next === "string" ? next : String(next ?? ""));
            }}
            placeholder="Search components"
            icon="MagnifyingGlass"
            iconPosition="left"
          />
          <TextInput
            value={password}
            onChange={(e) => {
              const next =
                typeof e === "object" && e !== null && "target" in e
                  ? (e as { target?: { value?: unknown } }).target?.value
                  : e;
              setPassword(typeof next === "string" ? next : String(next ?? ""));
            }}
            placeholder="Password with clickable icon"
            type={passwordVisible ? "text" : "password"}
            icon={passwordVisible ? "EyeSlash" : "Eye"}
            iconPosition="right"
            onIconClick={() => setPasswordVisible((prev) => !prev)}
          />
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <Layout direction="column" gap="12">
          <TextInput value="Default size" readOnly size="default" />
          <TextInput value="Compact size" readOnly size="compact" />
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          State Variants
        </Text>
        <Layout direction="column" gap="12">
          <TextInput value="Default state" readOnly state="default" />
          <TextInput value="Focused state token" readOnly state="focused" />
          <TextInput value="Error state token" readOnly state="error" errorText="This field has an error." />
          <TextInput value="Disabled state token" readOnly state="disabled" />
          <TextInput value="Disabled prop" readOnly disabled />
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Label and Supporting Text
        </Text>
        <Layout direction="column" gap="12">
          <TextInput
            value={email}
            onChange={(e) => {
              const next =
                typeof e === "object" && e !== null && "target" in e
                  ? (e as { target?: { value?: unknown } }).target?.value
                  : e;
              setEmail(typeof next === "string" ? next : String(next ?? ""));
            }}
            label="Work Email"
            helperText="Use your company email address."
            placeholder="you@company.com"
            type="email"
          />
          <TextInput
            value={email}
            onChange={(e) => {
              const next =
                typeof e === "object" && e !== null && "target" in e
                  ? (e as { target?: { value?: unknown } }).target?.value
                  : e;
              setEmail(typeof next === "string" ? next : String(next ?? ""));
            }}
            label="Work Email"
            state="error"
            errorText="Please enter a valid email."
            placeholder="you@company.com"
            type="email"
          />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TEXT_INPUT_PROPS} />
    </DocPageLayout>
  );
}
