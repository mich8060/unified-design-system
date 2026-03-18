import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { DotStatus } from "../../design-system/components/DotStatus";
import { Layout } from "../../design-system/components/Layout";
import { Icon } from "../../design-system/components/Icon";
import { Medallion } from "../../design-system/components/Medallion";
import { Toast } from "../../design-system/components/Toast";
import type { ToastActions } from "../../design-system/components/Toast/Toast.types";
import { Avatar } from "../../design-system/components/Avatar";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TOAST_PROPS: ComponentPropRow[] = [
  { prop: "title", type: "ReactNode", defaultValue: '"Successfully saved!"', description: "Primary toast heading." },
  { prop: "message", type: "ReactNode", defaultValue: '"Anyone with a link can now view this file."', description: "Secondary supporting text (shown in default size)." },
  { prop: "leading", type: "ReactNode", defaultValue: "variant icon", description: "Leading slot for icon, dot status, avatar, or any custom node." },
  { prop: "icon", type: "string | ReactNode", defaultValue: "variant icon", description: "Legacy icon override used when `leading` is not provided." },
  { prop: "variant", type: '"success" | "error" | "warning" | "info"', defaultValue: '"info"', description: "Visual tone for leading indicator." },
  { prop: "actions", type: '"none" | "close" | "subtle" | "buttons"', defaultValue: '"none"', description: "Action region variant on the trailing side/bottom." },
  { prop: "size", type: '"default" | "condensed"', defaultValue: '"default"', description: "Toast density and content layout." },
  { prop: "onClose", type: "() => void", defaultValue: "-", description: "Close icon callback for `actions='close'`." },
  { prop: "onPrimaryAction", type: "() => void", defaultValue: "-", description: "Primary action callback for subtle/buttons variants." },
  { prop: "onSecondaryAction", type: "() => void", defaultValue: "-", description: "Secondary action callback for subtle/buttons variants." },
];

const ACTIONS: ToastActions[] = ["none", "close", "subtle", "buttons"];

const LEADING_SLOT_SNIPPET = `<Toast
  leading={<Icon name="CheckCircle" size={32} />}
  variant="success"
/>
<Toast
  leading={<DotStatus variant="blue" size="medium" />}
  variant="info"
/>
<Toast
  leading={<Avatar initials="EB" size="default" />}
  variant="success"
/>
<Toast
  leading={<Medallion icon="CheckCircle" size="default" color="green" />}
  variant="success"
/>`;

const ACTIONS_SNIPPET = `<Toast leading={<Icon name="CheckCircle" size={32} />} actions="none" />
<Toast leading={<Icon name="CheckCircle" size={32} />} actions="close" onClose={() => {}} />
<Toast leading={<Icon name="CheckCircle" size={32} />} actions="subtle" />
<Toast leading={<Icon name="CheckCircle" size={32} />} actions="buttons" />`;

const CONDENSED_SNIPPET = `<Toast leading={<Icon name="CheckCircle" size={32} />} size="condensed" actions="none" />
<Toast leading={<Icon name="CheckCircle" size={32} />} size="condensed" actions="close" onClose={() => {}} />
<Toast leading={<Icon name="CheckCircle" size={32} />} size="condensed" actions="subtle" />
<Toast leading={<Icon name="CheckCircle" size={32} />} size="condensed" actions="buttons" />`;

export function ToastDemoPage() {
  return (
    <DocPageLayout
      title="Toast"
      description="Toast uses a flexible leading slot plus action and size variants."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Leading Slot Examples
          </Text>
          <Text as="p" variant="body-14" leading="regular" tone="secondary">
            Use any component in the leading slot. Common patterns are icon, dot status, and avatar.
          </Text>
        </Layout>

        <Layout direction="column" gap="12" style={{ maxWidth: 640 }}>
          <Toast className="uds-toast--demo-relative" leading={<Icon name="CheckCircle" size={32} />} variant="success" />
          <Toast className="uds-toast--demo-relative" leading={<DotStatus variant="blue" size="medium" />} variant="info" />
          <Toast className="uds-toast--demo-relative" leading={<Avatar initials="EB" size="default" />} variant="success" />
          <Toast className="uds-toast--demo-relative" leading={<Medallion icon="CheckCircle" size="default" color="green" />} variant="success" />
        </Layout>
        <Code language="tsx" code={LEADING_SLOT_SNIPPET} />

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Actions
          </Text>
          <Layout direction="column" gap="12" style={{ maxWidth: 640 }}>
            {ACTIONS.map((actions) => (
              <Toast
                key={`actions-${actions}`}
                className="uds-toast--demo-relative"
                leading={<Icon name="CheckCircle" size={32} />}
                actions={actions}
                variant="success"
                onClose={() => {}}
                onPrimaryAction={() => {}}
                onSecondaryAction={() => {}}
              />
            ))}
          </Layout>
          <Code language="tsx" code={ACTIONS_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Condensed Size
          </Text>
          <Layout direction="column" gap="12" style={{ maxWidth: 640 }}>
            {ACTIONS.map((actions) => (
              <Toast
                key={`condensed-${actions}`}
                className="uds-toast--demo-relative"
                leading={<Icon name="CheckCircle" size={32} />}
                size="condensed"
                actions={actions}
                variant="success"
                onClose={() => {}}
                onPrimaryAction={() => {}}
                onSecondaryAction={() => {}}
              />
            ))}
          </Layout>
          <Code language="tsx" code={CONDENSED_SNIPPET} />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TOAST_PROPS} title="Toast Props" />
    </DocPageLayout>
  );
}
