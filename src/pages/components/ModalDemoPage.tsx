import { Badge } from "../../design-system/components/Badge";
import { Button } from "../../design-system/components/Button";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Modal } from "../../design-system/components/Modal";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const MODAL_PROPS: ComponentPropRow[] = [
  { prop: "open", type: "boolean", defaultValue: "false", description: "Controls whether the modal is visible." },
  { prop: "onClose", type: "() => void", defaultValue: "-", description: "Called when user requests close (backdrop, Escape, close button)." },
  { prop: "title", type: "string", defaultValue: "-", description: "Header title text." },
  { prop: "subtitle", type: "string", defaultValue: "-", description: "Optional supporting text in the header." },
  { prop: "badge", type: "ReactNode", defaultValue: "-", description: "Optional badge element shown next to title." },
  { prop: "footer", type: "ReactNode", defaultValue: "-", description: "Footer content, typically action buttons." },
  { prop: "size", type: '"small" | "default" | "large" | "fullscreen"', defaultValue: '"default"', description: "Sets modal width/size behavior." },
  { prop: "closeOnBackdrop", type: "boolean", defaultValue: "true", description: "Closes when clicking outside the panel." },
  { prop: "closeOnEscape", type: "boolean", defaultValue: "true", description: "Closes when pressing Escape." },
  { prop: "dismissible", type: "boolean", defaultValue: "false", description: "Adds a built-in close action button in the header area." },
  { prop: "headerActions", type: "ReactNode", defaultValue: "-", description: "Additional actions rendered in the header area." },
  { prop: "headerAlign", type: '"start" | "center" | "space-between"', defaultValue: '"start"', description: "Header layout alignment preset." },
  { prop: "footerAlign", type: '"start" | "center" | "end" | "space-between"', defaultValue: '"space-between"', description: "Footer layout alignment preset." },
  { prop: "bodyPadding", type: '"none" | "compact" | "default"', defaultValue: '"none"', description: "Optional body padding preset; children can still fully control spacing." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Body content inside the modal." },
];

type ModalKey =
  | "basic"
  | "small"
  | "default"
  | "large"
  | "fullscreen"
  | "layout-presets"
  | "no-backdrop-close"
  | "no-escape-close";

const BASIC_MODAL_SNIPPET = `<Modal
  open={activeModal === "basic"}
  onClose={closeModal}
  title="Basic Modal"
  subtitle="Launched from a UDS button trigger."
  badge={<Badge count={1} />}
  footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">
      Use modals for focused tasks that require user attention before returning to the page.
    </Text>
    <Text as="p" variant="body-14" leading="regular">
      Keep content concise and action-oriented.
    </Text>
  </Layout>
</Modal>`;

const SMALL_MODAL_SNIPPET = `<Modal size="small" open={activeModal === "small"} onClose={closeModal} title="Small Modal" subtitle="Compact width for simple confirmations." footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Small is ideal for brief prompts and short one-step actions.</Text>
    <Text as="p" variant="body-14" leading="regular">Reserve it for compact flows with minimal content.</Text>
  </Layout>
</Modal>`;

const DEFAULT_MODAL_SNIPPET = `<Modal size="default" open={activeModal === "default"} onClose={closeModal} title="Default Modal" subtitle="Balanced width for common tasks." footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Default is the standard size for most content and workflows.</Text>
    <Text as="p" variant="body-14" leading="regular">Use this when users need a balanced amount of context and action.</Text>
  </Layout>
</Modal>`;

const LARGE_MODAL_SNIPPET = `<Modal size="large" open={activeModal === "large"} onClose={closeModal} title="Large Modal" subtitle="Extra width for denser content." footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Large provides more horizontal room for detailed forms and layouts.</Text>
    <Text as="p" variant="body-14" leading="regular">It works well for denser content and multi-column structures.</Text>
  </Layout>
</Modal>`;

const FULLSCREEN_MODAL_SNIPPET = `<Modal size="fullscreen" open={activeModal === "fullscreen"} onClose={closeModal} title="Fullscreen Modal" subtitle="Uses the full viewport for immersive tasks." footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Fullscreen works well for multi-step workflows or content-heavy experiences.</Text>
    <Text as="p" variant="body-14" leading="regular">Consider this for immersive tasks requiring maximum workspace.</Text>
  </Layout>
</Modal>`;

const NO_BACKDROP_CLOSE_SNIPPET = `<Modal open={activeModal === "no-backdrop-close"} onClose={closeModal} title="Backdrop Close Disabled" subtitle="Clicking outside this modal will not close it." closeOnBackdrop={false} footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Use this when accidental dismissal could interrupt critical user actions.</Text>
    <Text as="p" variant="body-14" leading="regular">The modal can still be closed with the close button or footer actions.</Text>
  </Layout>
</Modal>`;

const NO_ESCAPE_CLOSE_SNIPPET = `<Modal open={activeModal === "no-escape-close"} onClose={closeModal} title="Escape Close Disabled" subtitle="Pressing Escape will not close this modal." closeOnEscape={false} footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}>
  <Layout direction="column" gap="0">
    <Text as="p" variant="body-14" leading="regular">Keep Escape disabled only for flows that must be explicitly completed or cancelled.</Text>
    <Text as="p" variant="body-14" leading="regular">Always provide clear Cancel and Confirm actions when doing this.</Text>
  </Layout>
</Modal>`;

const LAYOUT_PRESET_SNIPPET = `<Modal
  open={activeModal === "layout-presets"}
  onClose={closeModal}
  dismissible
  headerAlign="space-between"
  footerAlign="end"
  bodyPadding="compact"
  header={<Text as="h3" variant="heading-24">Request an Edit</Text>}
  headerActions={<Button size="xsmall" appearance="text" label="Help" />}
  footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
>
  <Text as="p" variant="body-14">Children can define their own spacing as needed.</Text>
</Modal>`;

function ModalFooter({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <Layout alignItems="center" gap="8">
      <Button label="Cancel" appearance="outline" onClick={onCancel} />
      <Button label="Confirm" onClick={onConfirm} />
    </Layout>
  );
}

export function ModalDemoPage() {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <DocPageLayout
      title="Modal"
      description="Modal displays focused content in an overlay and is launched here with UDS buttons."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Launch Modal
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Button label="Open Basic Modal" onClick={() => setActiveModal("basic")} />
          </Layout>
          <Code language="tsx" code={BASIC_MODAL_SNIPPET} />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Size Variants
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Button label="Small" appearance="outline" onClick={() => setActiveModal("small")} />
            <Button label="Default" appearance="outline" onClick={() => setActiveModal("default")} />
            <Button label="Large" appearance="outline" onClick={() => setActiveModal("large")} />
            <Button label="Fullscreen" appearance="outline" onClick={() => setActiveModal("fullscreen")} />
          </Layout>
          <Code language="tsx" code={SMALL_MODAL_SNIPPET} />
          <Code language="tsx" code={DEFAULT_MODAL_SNIPPET} />
          <Code language="tsx" code={LARGE_MODAL_SNIPPET} />
          <Code language="tsx" code={FULLSCREEN_MODAL_SNIPPET} />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Header and Footer Layout Presets
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Button
              label="Open Layout Preset Modal"
              appearance="outline"
              onClick={() => setActiveModal("layout-presets")}
            />
          </Layout>
          <Code language="tsx" code={LAYOUT_PRESET_SNIPPET} />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Close Behavior
          </Text>
          <Layout alignItems="center" gap="12" wrap>
            <Button
              label="Disable Backdrop Close"
              appearance="outline"
              onClick={() => setActiveModal("no-backdrop-close")}
            />
            <Button
              label="Disable Escape Close"
              appearance="outline"
              onClick={() => setActiveModal("no-escape-close")}
            />
          </Layout>
          <Code language="tsx" code={NO_BACKDROP_CLOSE_SNIPPET} />
          <Code language="tsx" code={NO_ESCAPE_CLOSE_SNIPPET} />
        </Layout>
      </Layout>

      <Modal
        open={activeModal === "basic"}
        onClose={closeModal}
        title="Basic Modal"
        subtitle="Launched from a UDS button trigger."
        badge={<Badge count={1} />}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Use modals for focused tasks that require user attention before returning to the page.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Keep content concise and action-oriented.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "small"}
        onClose={closeModal}
        title="Small Modal"
        subtitle="Compact width for simple confirmations."
        size="small"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Small is ideal for brief prompts and short one-step actions.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Reserve it for compact flows with minimal content.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "default"}
        onClose={closeModal}
        title="Default Modal"
        subtitle="Balanced width for common tasks."
        size="default"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Default is the standard size for most content and workflows.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Use this when users need a balanced amount of context and action.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "large"}
        onClose={closeModal}
        title="Large Modal"
        subtitle="Extra width for denser content."
        size="large"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Large provides more horizontal room for detailed forms and layouts.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            It works well for denser content and multi-column structures.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "fullscreen"}
        onClose={closeModal}
        title="Fullscreen Modal"
        subtitle="Uses the full viewport for immersive tasks."
        size="fullscreen"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Fullscreen works well for multi-step workflows or content-heavy experiences.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Consider this for immersive tasks requiring maximum workspace.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "layout-presets"}
        onClose={closeModal}
        dismissible
        headerAlign="space-between"
        footerAlign="end"
        bodyPadding="compact"
        header={<Text as="h3" variant="heading-24">Request an Edit</Text>}
        headerActions={<Button size="xsmall" appearance="text" label="Help" />}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14">
          Children can define their own spacing as needed.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "no-backdrop-close"}
        onClose={closeModal}
        title="Backdrop Close Disabled"
        subtitle="Clicking outside this modal will not close it."
        closeOnBackdrop={false}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Use this when accidental dismissal could interrupt critical user actions.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            The modal can still be closed with the close button or footer actions.
          </Text>
        </Layout>
      </Modal>

      <Modal
        open={activeModal === "no-escape-close"}
        onClose={closeModal}
        title="Escape Close Disabled"
        subtitle="Pressing Escape will not close this modal."
        closeOnEscape={false}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Layout direction="column" gap="0">
          <Text as="p" variant="body-14" leading="regular">
            Keep Escape disabled only for flows that must be explicitly completed or cancelled.
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Always provide clear Cancel and Confirm actions when doing this.
          </Text>
        </Layout>
      </Modal>

      <Divider variant="solid" />
      <ComponentPropsTable rows={MODAL_PROPS} />
    </DocPageLayout>
  );
}
