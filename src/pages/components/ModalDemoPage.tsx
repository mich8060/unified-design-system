import { useState } from "react";
import { Badge, Button, Divider, Flex, Modal, Text } from "../../design-system";
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
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Body content inside the modal." },
];

type ModalKey =
  | "basic"
  | "small"
  | "default"
  | "large"
  | "fullscreen"
  | "no-backdrop-close"
  | "no-escape-close";

function ModalFooter({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <Flex alignItems="center" gap="8">
      <Button label="Cancel" appearance="outline" onClick={onCancel} />
      <Button label="Confirm" onClick={onConfirm} />
    </Flex>
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
      <Flex direction="column" gap="48">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Launch Modal
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Button label="Open Basic Modal" onClick={() => setActiveModal("basic")} />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Size Variants
          </Text>
          <Flex alignItems="center" gap="12" wrap>
            <Button label="Small" appearance="outline" onClick={() => setActiveModal("small")} />
            <Button label="Default" appearance="outline" onClick={() => setActiveModal("default")} />
            <Button label="Large" appearance="outline" onClick={() => setActiveModal("large")} />
            <Button label="Fullscreen" appearance="outline" onClick={() => setActiveModal("fullscreen")} />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Close Behavior
          </Text>
          <Flex alignItems="center" gap="12" wrap>
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
          </Flex>
        </Flex>
      </Flex>

      <Modal
        open={activeModal === "basic"}
        onClose={closeModal}
        title="Basic Modal"
        subtitle="Launched from a UDS button trigger."
        badge={<Badge count={1} />}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Use modals for focused tasks that require user attention before returning to the page.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "small"}
        onClose={closeModal}
        title="Small Modal"
        subtitle="Compact width for simple confirmations."
        size="small"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Small is ideal for brief prompts and short one-step actions.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "default"}
        onClose={closeModal}
        title="Default Modal"
        subtitle="Balanced width for common tasks."
        size="default"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Default is the standard size for most content and workflows.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "large"}
        onClose={closeModal}
        title="Large Modal"
        subtitle="Extra width for denser content."
        size="large"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Large provides more horizontal room for detailed forms and layouts.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "fullscreen"}
        onClose={closeModal}
        title="Fullscreen Modal"
        subtitle="Uses the full viewport for immersive tasks."
        size="fullscreen"
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Fullscreen works well for multi-step workflows or content-heavy experiences.
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
        <Text as="p" variant="body-14" leading="regular">
          Use this when accidental dismissal could interrupt critical user actions.
        </Text>
      </Modal>

      <Modal
        open={activeModal === "no-escape-close"}
        onClose={closeModal}
        title="Escape Close Disabled"
        subtitle="Pressing Escape will not close this modal."
        closeOnEscape={false}
        footer={<ModalFooter onCancel={closeModal} onConfirm={closeModal} />}
      >
        <Text as="p" variant="body-14" leading="regular">
          Keep Escape disabled only for flows that must be explicitly completed or cancelled.
        </Text>
      </Modal>

      <Divider variant="solid" />
      <ComponentPropsTable rows={MODAL_PROPS} />
    </DocPageLayout>
  );
}
