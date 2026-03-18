import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Dropdown from "./Dropdown";

const canvasStyle: React.CSSProperties = {
  minHeight: 320,
  padding: "80px 120px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  overflow: "visible",
};

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text shown when no option is selected.",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["default", "compact"],
      description: "Visual size of the trigger input.",
    },
    state: {
      control: { type: "inline-radio" },
      options: ["default", "focused", "error", "disabled"],
      description: "Visual state of the dropdown trigger.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "When true, disables interaction with the dropdown.",
    },
    searchable: {
      control: { type: "boolean" },
      description: "Adds a search input to filter the option list.",
    },
    menuFullWidth: {
      control: { type: "boolean" },
      description: "When true, the option menu matches the trigger width.",
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "left-start",
      ],
      description: "Preferred position of the options menu.",
    },
    onChange: { action: "changed" },
  },
  args: {
    placeholder: "Select an option",
    size: "default",
    state: "default",
    disabled: false,
    searchable: false,
    menuFullWidth: true,
    placement: "bottom-start",
    options: [
      { value: "internal-medicine", label: "Internal Medicine" },
      { value: "emergency-medicine", label: "Emergency Medicine" },
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "radiology", label: "Radiology" },
      { value: "psychiatry", label: "Psychiatry" },
    ],
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — controlled selection
// ---------------------------------------------------------------------------
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    return (
      <div style={{ ...canvasStyle, flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ width: 280 }}>
          <Dropdown
            {...args}
            value={value}
            onChange={(v) => setValue(v as string)}
          />
        </div>
        {value && (
          <p style={{ margin: 0, fontSize: "14px", color: "var(--uds-text-secondary)" }}>
            Selected: <strong>{value}</strong>
          </p>
        )}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// With a pre-selected value
// ---------------------------------------------------------------------------
export const WithPreselectedValue: Story = {
  name: "Pre-Selected Value",
  render: (_args) => {
    const [value, setValue] = React.useState("anesthesiology");
    const options = [
      { value: "internal-medicine", label: "Internal Medicine" },
      { value: "emergency-medicine", label: "Emergency Medicine" },
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "radiology", label: "Radiology" },
      { value: "psychiatry", label: "Psychiatry" },
    ];
    return (
      <div style={{ ...canvasStyle, alignItems: "flex-start" }}>
        <div style={{ width: 280 }}>
          <Dropdown
            options={options}
            value={value}
            placeholder="Select specialty"
            onChange={(v) => setValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Compact size
// ---------------------------------------------------------------------------
export const CompactSize: Story = {
  name: "Size — Compact",
  render: (_args) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const options = [
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "locum", label: "Locum tenens" },
      { value: "per-diem", label: "Per diem" },
    ];
    return (
      <div style={{ ...canvasStyle, alignItems: "flex-start" }}>
        <div style={{ width: 200 }}>
          <Dropdown
            options={options}
            value={value}
            size="compact"
            placeholder="Employment type"
            onChange={(v) => setValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------
export const ErrorState: Story = {
  name: "State — Error",
  render: (_args) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const options = [
      { value: "ca", label: "California" },
      { value: "tx", label: "Texas" },
      { value: "fl", label: "Florida" },
      { value: "ny", label: "New York" },
      { value: "il", label: "Illinois" },
    ];
    return (
      <div style={{ ...canvasStyle, flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: 280 }}>
          <Dropdown
            options={options}
            value={value}
            state="error"
            placeholder="Select license state"
            onChange={(v) => setValue(v as string)}
          />
        </div>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--uds-system-destructive-primary)" }}>
          A license state is required to continue.
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Disabled state
// ---------------------------------------------------------------------------
export const DisabledState: Story = {
  name: "State — Disabled",
  render: (_args) => (
    <div style={{ ...canvasStyle, alignItems: "flex-start" }}>
      <div style={{ width: 280 }}>
        <Dropdown
          options={[
            { value: "pending", label: "Pending review" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
          ]}
          value="pending"
          disabled
          placeholder="Status"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Searchable dropdown
// ---------------------------------------------------------------------------
export const Searchable: Story = {
  name: "Searchable",
  render: (_args) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const specialties = [
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "cardiology", label: "Cardiology" },
      { value: "dermatology", label: "Dermatology" },
      { value: "emergency-medicine", label: "Emergency Medicine" },
      { value: "family-medicine", label: "Family Medicine" },
      { value: "gastroenterology", label: "Gastroenterology" },
      { value: "hospitalist", label: "Hospitalist" },
      { value: "internal-medicine", label: "Internal Medicine" },
      { value: "neurology", label: "Neurology" },
      { value: "obstetrics", label: "Obstetrics & Gynecology" },
      { value: "oncology", label: "Oncology" },
      { value: "orthopedics", label: "Orthopedic Surgery" },
      { value: "pediatrics", label: "Pediatrics" },
      { value: "psychiatry", label: "Psychiatry" },
      { value: "radiology", label: "Radiology" },
      { value: "surgery", label: "General Surgery" },
      { value: "urology", label: "Urology" },
    ];
    return (
      <div style={{ ...canvasStyle, alignItems: "flex-start" }}>
        <div style={{ width: 300 }}>
          <Dropdown
            options={specialties}
            value={value}
            searchable
            placeholder="Search specialty"
            onChange={(v) => setValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// String options (shorthand)
// ---------------------------------------------------------------------------
export const StringOptions: Story = {
  name: "String Options (shorthand)",
  render: (_args) => {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    return (
      <div style={{ ...canvasStyle, alignItems: "flex-start" }}>
        <div style={{ width: 240 }}>
          <Dropdown
            options={["Active", "Inactive", "On hold", "Pending approval"]}
            value={value}
            placeholder="Select status"
            onChange={(v) => setValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Side-by-side sizes
// ---------------------------------------------------------------------------
export const SizeComparison: Story = {
  name: "Size Comparison",
  render: (_args) => {
    const [v1, setV1] = React.useState<string | undefined>(undefined);
    const [v2, setV2] = React.useState<string | undefined>(undefined);
    const options = [
      { value: "morning", label: "Morning shift" },
      { value: "afternoon", label: "Afternoon shift" },
      { value: "night", label: "Night shift" },
    ];
    return (
      <div style={{ ...canvasStyle, alignItems: "flex-start", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <label style={{ fontSize: "12px", color: "var(--uds-text-secondary)" }}>Default</label>
          <div style={{ width: 220 }}>
            <Dropdown
              options={options}
              value={v1}
              size="default"
              placeholder="Shift preference"
              onChange={(v) => setV1(v as string)}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
          <label style={{ fontSize: "12px", color: "var(--uds-text-secondary)" }}>Compact</label>
          <div style={{ width: 220 }}>
            <Dropdown
              options={options}
              value={v2}
              size="compact"
              placeholder="Shift preference"
              onChange={(v) => setV2(v as string)}
            />
          </div>
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// In a form context
// ---------------------------------------------------------------------------
export const InFormContext: Story = {
  name: "In a Form",
  render: (_args) => {
    const [specialty, setSpecialty] = React.useState<string | undefined>(undefined);
    const [state, setState] = React.useState<string | undefined>(undefined);

    const specialties = [
      { value: "emergency-medicine", label: "Emergency Medicine" },
      { value: "hospitalist", label: "Hospitalist" },
      { value: "internal-medicine", label: "Internal Medicine" },
      { value: "radiology", label: "Radiology" },
    ];

    const licenseStates = [
      { value: "ca", label: "California" },
      { value: "tx", label: "Texas" },
      { value: "fl", label: "Florida" },
      { value: "ny", label: "New York" },
      { value: "wa", label: "Washington" },
    ];

    return (
      <div style={{ padding: "48px", maxWidth: "480px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="specialty-dropdown"
              style={{ fontSize: "14px", fontWeight: 500, color: "var(--uds-text-primary)" }}
            >
              Specialty
            </label>
            <Dropdown
              id="specialty-dropdown"
              options={specialties}
              value={specialty}
              placeholder="Select specialty"
              onChange={(v) => setSpecialty(v as string)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="state-dropdown"
              style={{ fontSize: "14px", fontWeight: 500, color: "var(--uds-text-primary)" }}
            >
              License state
            </label>
            <Dropdown
              id="state-dropdown"
              options={licenseStates}
              value={state}
              placeholder="Select state"
              onChange={(v) => setState(v as string)}
            />
          </div>
        </div>
      </div>
    );
  },
};
