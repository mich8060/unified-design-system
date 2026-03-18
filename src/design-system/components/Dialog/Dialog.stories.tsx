import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Dialog from "./Dialog";
import Button from "../Button/Button";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Whether the dialog is visible.",
    },
    intent: {
      control: { type: "inline-radio" },
      options: ["info", "success", "warning", "destructive"],
      description: "Semantic intent — controls icon and primary button appearance.",
    },
    title: {
      control: { type: "text" },
      description: "Dialog heading.",
    },
    description: {
      control: { type: "text" },
      description: "Supporting text rendered below the title.",
    },
    confirmLabel: {
      control: { type: "text" },
      description: "Label for the primary action button.",
    },
    cancelLabel: {
      control: { type: "text" },
      description: "Label for the cancel button.",
    },
    showCancel: {
      control: { type: "boolean" },
      description: "Whether to render the cancel button.",
    },
    loading: {
      control: { type: "boolean" },
      description: "Shows a loading spinner on the confirm button.",
    },
    closeOnBackdrop: {
      control: { type: "boolean" },
      description: "Dismiss the dialog when clicking the overlay backdrop.",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Dismiss the dialog when pressing the Escape key.",
    },
    onClose: { action: "closed" },
    onConfirm: { action: "confirmed" },
    onCancel: { action: "cancelled" },
  },
  args: {
    open: false,
    intent: "info",
    title: "Are you sure?",
    description: "This action will update your account settings. You can change these at any time.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    showCancel: true,
    loading: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — fully interactive
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Dialog" appearance="primary" onClick={() => setOpen(true)} />
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Intent variants
// ---------------------------------------------------------------------------
export const IntentInfo: Story = {
  name: "Intent — Info",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Info Dialog" appearance="primary" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="info"
          title="New feature available"
          description="A new credentialing workflow has been released. Would you like to explore the updated experience now?"
          confirmLabel="Explore now"
          cancelLabel="Maybe later"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const IntentSuccess: Story = {
  name: "Intent — Success",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Success Dialog" appearance="primary" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="success"
          title="Profile submitted"
          description="Your provider profile has been submitted for credentialing review. You'll receive an email notification once the review is complete."
          confirmLabel="View status"
          cancelLabel="Close"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const IntentWarning: Story = {
  name: "Intent — Warning",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Warning Dialog" appearance="outline" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="warning"
          title="License expiring soon"
          description="Dr. Sarah Chen's medical license in Texas expires in 14 days. Assignments in that state may be affected if the license is not renewed."
          confirmLabel="Renew now"
          cancelLabel="Remind me later"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const IntentDestructive: Story = {
  name: "Intent — Destructive",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Delete account" appearance="destructive" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="destructive"
          title="Delete provider record"
          description="This will permanently remove the provider record, all associated assignments, and credentialing history. This action cannot be undone."
          confirmLabel="Delete permanently"
          cancelLabel="Keep record"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Loading state on confirm
// ---------------------------------------------------------------------------
export const ConfirmLoading: Story = {
  name: "Confirm — Loading State",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2500);
    };

    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Dialog" appearance="primary" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="warning"
          title="Archive assignment?"
          description="This assignment will be moved to the archive. You can restore it at any time from the archive view."
          confirmLabel="Archive"
          loading={loading}
          onClose={() => !loading && setOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// No cancel button — alert-only
// ---------------------------------------------------------------------------
export const AlertOnly: Story = {
  name: "No Cancel Button — Alert",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Alert" appearance="outline" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="info"
          title="Session expires in 5 minutes"
          description="Your session is about to expire due to inactivity. Save your work and refresh to continue."
          confirmLabel="Understood"
          showCancel={false}
          closeOnBackdrop={false}
          closeOnEscape={false}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// All intents side by side
// ---------------------------------------------------------------------------
export const AllIntents: Story = {
  name: "All Intents",
  render: (_args) => {
    const [openIntent, setOpenIntent] = React.useState<string | null>(null);

    const intents: Array<{
      intent: "info" | "success" | "warning" | "destructive";
      title: string;
      description: string;
      confirmLabel: string;
    }> = [
      {
        intent: "info",
        title: "New feature available",
        description: "Explore the redesigned scheduling workflow released this week.",
        confirmLabel: "Learn more",
      },
      {
        intent: "success",
        title: "Submission complete",
        description: "Your credentialing documents have been received and are under review.",
        confirmLabel: "View submission",
      },
      {
        intent: "warning",
        title: "License expiring",
        description: "One or more licenses will expire within 30 days.",
        confirmLabel: "Review licenses",
      },
      {
        intent: "destructive",
        title: "Remove provider",
        description: "This will permanently delete the provider and all associated records.",
        confirmLabel: "Delete",
      },
    ];

    return (
      <div style={{ padding: "48px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {intents.map(({ intent, title, description, confirmLabel }) => (
          <Button
            key={intent}
            label={`${intent.charAt(0).toUpperCase()}${intent.slice(1)}`}
            appearance="outline"
            onClick={() => setOpenIntent(intent)}
          />
        ))}
        {intents.map(({ intent, title, description, confirmLabel }) => (
          <Dialog
            key={intent}
            open={openIntent === intent}
            intent={intent}
            title={title}
            description={description}
            confirmLabel={confirmLabel}
            onClose={() => setOpenIntent(null)}
            onConfirm={() => setOpenIntent(null)}
          />
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom icon override
// ---------------------------------------------------------------------------
export const CustomIcon: Story = {
  name: "Custom Icon Override",
  render: (_args) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ padding: "48px", display: "flex", justifyContent: "center" }}>
        <Button label="Open Dialog" appearance="outline" onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          intent="info"
          icon="CloudArrowUp"
          title="Upload to cloud storage"
          description="Your files will be securely uploaded and accessible from any device. Uploads over 100 MB may take a few minutes."
          confirmLabel="Start upload"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};
