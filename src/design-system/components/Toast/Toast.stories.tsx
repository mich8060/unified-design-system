import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Toast from "./Toast";
import Button from "../Button/Button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["success", "error", "warning", "info"],
      description: "Semantic variant — determines the default icon and color treatment.",
    },
    appearance: {
      control: { type: "inline-radio" },
      options: ["icon", "dot-indicator", "avatar"],
      description: "Leading element style.",
    },
    actions: {
      control: { type: "inline-radio" },
      options: ["none", "close", "subtle", "buttons"],
      description: "Which action controls are rendered.",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["default", "condensed"],
      description: "Controls overall density. Condensed hides the message line.",
    },
    title: {
      control: { type: "text" },
      description: "Primary heading text.",
    },
    message: {
      control: { type: "text" },
      description: "Supporting message text (hidden in condensed size).",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to show the leading icon.",
    },
    showClose: {
      control: { type: "boolean" },
      description: "Whether to show the close button (requires actions: 'close').",
    },
    primaryActionLabel: {
      control: { type: "text" },
      description: "Label for the primary inline action.",
    },
    secondaryActionLabel: {
      control: { type: "text" },
      description: "Label for the secondary inline action.",
    },
    onClose: { action: "closed" },
    onPrimaryAction: { action: "primaryAction" },
    onSecondaryAction: { action: "secondaryAction" },
  },
  args: {
    variant: "info",
    appearance: "icon",
    actions: "none",
    size: "default",
    title: "Update available",
    message: "A new version of the application is ready to install.",
    showIcon: true,
    showClose: true,
    primaryActionLabel: "Install now",
    secondaryActionLabel: "Dismiss",
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------
export const AllVariants: Story = {
  name: "All Variants",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="success"
        title="Profile submitted"
        message="Your credentialing profile has been sent for review."
        actions="close"
      />
      <Toast
        variant="error"
        title="Submission failed"
        message="We couldn't save your changes. Please try again or contact support."
        actions="close"
      />
      <Toast
        variant="warning"
        title="License expiring soon"
        message="Dr. Baxter's California license expires in 14 days."
        actions="close"
      />
      <Toast
        variant="info"
        title="Sync in progress"
        message="Importing provider data from the external registry. This may take a moment."
        actions="close"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export const WithCloseButton: Story = {
  name: "Actions — Close Button",
  render: (_args) => {
    const [visible, setVisible] = React.useState(true);
    return (
      <div style={{ padding: "24px", maxWidth: "480px" }}>
        {visible ? (
          <Toast
            variant="info"
            title="Document ready"
            message="Your signed contract is ready to download."
            actions="close"
            onClose={() => setVisible(false)}
          />
        ) : (
          <Button label="Show toast again" appearance="outline" onClick={() => setVisible(true)} />
        )}
      </div>
    );
  },
};

export const WithSubtleActions: Story = {
  name: "Actions — Subtle (text links)",
  render: (_args) => (
    <div style={{ padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="warning"
        title="Unsaved changes"
        message="Your assignment edits have not been saved yet."
        actions="subtle"
        primaryActionLabel="Save now"
        secondaryActionLabel="Discard"
      />
    </div>
  ),
};

export const WithButtonActions: Story = {
  name: "Actions — Buttons",
  render: (_args) => (
    <div style={{ padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="info"
        title="New assignment request"
        message="A locum tenens request for March 24–28 has been sent to you."
        actions="buttons"
        primaryActionLabel="Accept"
        secondaryActionLabel="Decline"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Appearance — leading element style
// ---------------------------------------------------------------------------
export const AppearanceDotIndicator: Story = {
  name: "Appearance — Dot Indicator",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="success"
        appearance="dot-indicator"
        title="Credential verified"
        message="Board certification confirmed via primary source."
        actions="close"
      />
      <Toast
        variant="error"
        appearance="dot-indicator"
        title="Verification failed"
        message="Unable to confirm DEA registration. Manual review required."
        actions="close"
      />
    </div>
  ),
};

export const AppearanceAvatar: Story = {
  name: "Appearance — Avatar",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="info"
        appearance="avatar"
        avatarInitials="DR"
        title="Dr. Rivera left a comment"
        message="Please review the updated availability window before confirming."
        actions="close"
      />
      <Toast
        variant="success"
        appearance="avatar"
        avatarInitials="AL"
        title="Andrea L. accepted the shift"
        message="March 18 – 22 in Phoenix, AZ is now confirmed."
        actions="close"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Size — condensed
// ---------------------------------------------------------------------------
export const CondensedSize: Story = {
  name: "Size — Condensed",
  render: (_args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "24px", maxWidth: "480px" }}>
      <Toast
        variant="success"
        size="condensed"
        title="Changes saved"
        message="This message is hidden in condensed mode."
        actions="close"
      />
      <Toast
        variant="error"
        size="condensed"
        title="Export failed"
        message="This message is hidden in condensed mode."
        actions="close"
      />
      <Toast
        variant="warning"
        size="condensed"
        title="Action required"
        actions="close"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Undo pattern
// ---------------------------------------------------------------------------
export const UndoPattern: Story = {
  name: "Undo Pattern",
  render: (_args) => {
    const [visible, setVisible] = React.useState(false);
    const [undone, setUndone] = React.useState(false);

    const handleDelete = () => {
      setUndone(false);
      setVisible(true);
    };

    const handleUndo = () => {
      setUndone(true);
      setVisible(false);
    };

    return (
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
        <Button label="Delete provider record" appearance="destructive" onClick={handleDelete} />
        {undone && <p style={{ margin: 0, fontSize: "14px" }}>Record restored successfully.</p>}
        {visible && (
          <Toast
            variant="info"
            title="Provider record deleted"
            message="The record has been removed. You have 30 seconds to undo."
            actions="subtle"
            primaryActionLabel="Undo"
            secondaryActionLabel="Dismiss"
            onPrimaryAction={handleUndo}
            onSecondaryAction={() => setVisible(false)}
          />
        )}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Stacked toasts — queue example
// ---------------------------------------------------------------------------
export const StackedToasts: Story = {
  name: "Stacked Notifications",
  render: (_args) => {
    const initial = [
      { id: 1, variant: "success" as const, title: "Shift confirmed", message: "March 18 in Denver, CO is now locked in." },
      { id: 2, variant: "warning" as const, title: "Document expiring", message: "ACLS certification expires in 7 days." },
      { id: 3, variant: "info" as const, title: "New message", message: "The facility coordinator sent you a note." },
    ];
    const [toasts, setToasts] = React.useState(initial);

    const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

    return (
      <div
        style={{
          position: "relative",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "480px",
        }}
      >
        {toasts.length === 0 && (
          <Button label="Reset" appearance="outline" onClick={() => setToasts(initial)} />
        )}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            message={t.message}
            actions="close"
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    );
  },
};
