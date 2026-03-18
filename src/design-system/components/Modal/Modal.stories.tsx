import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Modal from "./Modal";
import Button from "../Button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Whether the modal is visible.",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["small", "default", "large", "fullscreen"],
      description: "Controls the maximum width of the modal panel.",
    },
    title: {
      control: { type: "text" },
      description: "Header title text.",
    },
    subtitle: {
      control: { type: "text" },
      description: "Header subtitle text rendered below the title.",
    },
    dismissible: {
      control: { type: "boolean" },
      description: "When true, renders a close (X) button in the header.",
    },
    closeOnBackdrop: {
      control: { type: "boolean" },
      description: "Close the modal when clicking the overlay backdrop.",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Close the modal when pressing the Escape key.",
    },
    headerAlign: {
      control: { type: "inline-radio" },
      options: ["start", "center", "space-between"],
      description: "Horizontal alignment of the header content.",
    },
    footerAlign: {
      control: { type: "inline-radio" },
      options: ["start", "center", "end", "space-between"],
      description: "Horizontal alignment of the footer content.",
    },
    bodyPadding: {
      control: { type: "inline-radio" },
      options: ["none", "compact", "default"],
      description: "Padding applied to the modal body.",
    },
    onClose: { action: "closed" },
  },
  args: {
    open: false,
    size: "default",
    dismissible: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    headerAlign: "start",
    footerAlign: "space-between",
    bodyPadding: "default",
    title: "Modal title",
    subtitle: "Optional supporting subtitle",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — fully interactive, trigger button opens the modal
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Modal" appearance="primary" onClick={() => setOpen(true)} />
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button label="Cancel" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Save changes" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0 }}>
            This is the modal body content. You can place any React content here — forms,
            descriptions, tables, or anything else your workflow requires.
          </p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------
export const SmallSize: Story = {
  name: "Size — Small",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Small Modal" appearance="primary" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="small"
          title="Confirm action"
          dismissible
          footer={
            <>
              <Button label="Cancel" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Confirm" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Are you sure you want to proceed? This action cannot be undone.
          </p>
        </Modal>
      </div>
    );
  },
};

export const LargeSize: Story = {
  name: "Size — Large",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Large Modal" appearance="primary" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="large"
          title="Review provider profile"
          subtitle="Check all details before submitting for approval"
          dismissible
          footer={
            <>
              <Button label="Save as draft" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Submit for review" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ margin: 0 }}>
              <strong>Provider:</strong> Dr. Emily Baxter, MD
            </p>
            <p style={{ margin: 0 }}>
              <strong>Specialty:</strong> Internal Medicine
            </p>
            <p style={{ margin: 0 }}>
              <strong>License state:</strong> California
            </p>
            <p style={{ margin: 0 }}>
              <strong>License expiry:</strong> December 31, 2026
            </p>
            <p style={{ margin: 0 }}>
              <strong>Credentialing status:</strong> In progress — awaiting primary source verification
            </p>
          </div>
        </Modal>
      </div>
    );
  },
};

export const FullscreenSize: Story = {
  name: "Size — Fullscreen",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Fullscreen Modal" appearance="primary" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="fullscreen"
          title="Contract editor"
          subtitle="Review and edit the locum tenens agreement"
          dismissible
          footer={
            <>
              <Button label="Discard changes" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Save contract" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Full document content would appear here. Use the fullscreen size for complex workflows
            such as document editors, data entry forms with many fields, or multi-step wizards.
          </p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Dismissible
// ---------------------------------------------------------------------------
export const WithDismissButton: Story = {
  name: "Dismissible — With Close Button",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Modal" appearance="outline" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit contact details"
          subtitle="Changes are saved automatically"
          dismissible
          footer={
            <Button label="Done" appearance="primary" onClick={() => setOpen(false)} />
          }
        >
          <p style={{ margin: 0 }}>
            The X button in the header allows users to close the modal without completing the
            primary action. It respects the same <code>onClose</code> callback.
          </p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// No backdrop close — forces an explicit action
// ---------------------------------------------------------------------------
export const NoBackdropClose: Story = {
  name: "Close on Backdrop — Disabled",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Modal" appearance="outline" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Unsaved changes"
          subtitle="You must choose an action to continue"
          closeOnBackdrop={false}
          closeOnEscape={false}
          dismissible={false}
          footer={
            <>
              <Button label="Discard" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Save changes" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0 }}>
            You have unsaved changes. Clicking outside or pressing Escape will not close this
            modal — you must explicitly choose to save or discard.
          </p>
        </Modal>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Footer alignment variants
// ---------------------------------------------------------------------------
export const FooterAlignments: Story = {
  name: "Footer Alignments",
  render: (_args) => {
    const [openModal, setOpenModal] = React.useState<string | null>(null);
    const alignments: Array<"start" | "center" | "end" | "space-between"> = [
      "start",
      "center",
      "end",
      "space-between",
    ];
    return (
      <div style={{ padding: "48px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {alignments.map((align) => (
          <Button
            key={align}
            label={`Footer: ${align}`}
            appearance="outline"
            onClick={() => setOpenModal(align)}
          />
        ))}
        {alignments.map((align) => (
          <Modal
            key={align}
            open={openModal === align}
            onClose={() => setOpenModal(null)}
            title={`Footer alignment: ${align}`}
            dismissible
            footerAlign={align}
            footer={
              <>
                <Button label="Cancel" appearance="outline" onClick={() => setOpenModal(null)} />
                <Button label="Confirm" appearance="primary" onClick={() => setOpenModal(null)} />
              </>
            }
          >
            <p style={{ margin: 0 }}>
              The footer action buttons are aligned to the <strong>{align}</strong> position.
            </p>
          </Modal>
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom header override
// ---------------------------------------------------------------------------
export const CustomHeader: Story = {
  name: "Custom Header Slot",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Modal" appearance="primary" onClick={() => setOpen(true)} />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          dismissible
          header={
            <div>
              <div style={{ fontSize: "18px", fontWeight: 600 }}>Schedule assignment</div>
              <div style={{ fontSize: "13px", color: "var(--uds-text-secondary)", marginTop: "4px" }}>
                Week of March 18 – 24, 2026
              </div>
            </div>
          }
          footer={
            <>
              <Button label="Cancel" appearance="outline" onClick={() => setOpen(false)} />
              <Button label="Assign shift" appearance="primary" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0 }}>
            The <code>header</code> prop accepts any ReactNode and replaces the default
            title/subtitle/badge rendering with fully custom content.
          </p>
        </Modal>
      </div>
    );
  },
};
