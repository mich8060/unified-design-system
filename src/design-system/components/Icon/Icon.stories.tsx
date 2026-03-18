import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Icon from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description:
        "Phosphor icon name in PascalCase (e.g. \"House\", \"MagnifyingGlass\", \"ArrowRight\"). See phosphoricons.com for the full catalogue.",
    },
    size: {
      control: { type: "number" },
      description: "Icon size in pixels. Defaults to 24.",
    },
    appearance: {
      control: { type: "inline-radio" },
      options: ["regular", "bold", "thin", "light", "duotone", "fill", "solid", "outline"],
      description: "Render style variant. Maps to Phosphor icon weights.",
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["primary", "secondary", "tertiary", "placeholder", "disabled"],
      description: "Semantic color tone applied via CSS variable.",
    },
  },
  args: {
    name: "House",
    size: 24,
    appearance: "regular",
    tone: "primary",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Playground — fully interactive, reflects all controls
// ---------------------------------------------------------------------------
export const Playground: Story = {};

// ---------------------------------------------------------------------------
// All appearance / weight variants for a single icon
// ---------------------------------------------------------------------------
export const AllAppearances: Story = {
  name: "All Appearances",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
      {(["regular", "bold", "thin", "light", "duotone", "fill", "solid", "outline"] as const).map(
        (appearance) => (
          <div
            key={appearance}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <Icon name="Star" size={32} appearance={appearance} />
            <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{appearance}</span>
          </div>
        )
      )}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// All tone variants
// ---------------------------------------------------------------------------
export const AllTones: Story = {
  name: "All Tones",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
      {(["primary", "secondary", "tertiary", "placeholder", "disabled"] as const).map((tone) => (
        <div
          key={tone}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Icon name="Bell" size={32} tone={tone} />
          <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{tone}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Size scale
// ---------------------------------------------------------------------------
export const SizeScale: Story = {
  name: "Size Scale",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-end" }}>
      {[12, 16, 20, 24, 32, 40, 48, 64].map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Icon name="Gear" size={size} />
          <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Common UI icon set — a practical reference catalogue
// ---------------------------------------------------------------------------
export const CommonIcons: Story = {
  name: "Common UI Icons",
  render: (_args) => {
    const icons = [
      "House",
      "MagnifyingGlass",
      "Bell",
      "Gear",
      "User",
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
      "Check",
      "X",
      "Plus",
      "Minus",
      "Trash",
      "PencilSimple",
      "DownloadSimple",
      "UploadSimple",
      "Eye",
      "EyeSlash",
      "Lock",
      "LockOpen",
      "Calendar",
      "Clock",
      "Warning",
      "Info",
      "CheckCircle",
      "XCircle",
      "Question",
      "ChevronDown",
      "ChevronRight",
    ];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {icons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              width: "80px",
            }}
          >
            <Icon name={name} size={24} />
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Fill appearance showcase — commonly used for active / selected states
// ---------------------------------------------------------------------------
export const FillAppearance: Story = {
  name: "Fill Appearance",
  args: {
    name: "Heart",
    size: 40,
    appearance: "fill",
    tone: "primary",
  },
};

// ---------------------------------------------------------------------------
// Invalid / missing icon — component renders nothing (no crash)
// ---------------------------------------------------------------------------
export const InvalidIconName: Story = {
  name: "Invalid Icon Name (graceful no-op)",
  args: {
    name: "ThisIconDoesNotExist",
    size: 32,
  },
};

// ---------------------------------------------------------------------------
// Duotone showcase
// ---------------------------------------------------------------------------
export const Duotone: Story = {
  name: "Duotone Appearance",
  render: (_args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
      {["CloudSun", "Package", "Briefcase", "ChartBar", "Database", "Rocket"].map((name) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Icon name={name} size={36} appearance="duotone" />
          <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
