import { useState } from "react";
import { ActionMenu } from "../../design-system/components/ActionMenu";
import { Button } from "../../design-system/components/Button";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { TextInput } from "../../design-system/components/TextInput";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

type ActionItem = {
  id?: string;
  label?: string;
  icon?: string;
  shortcut?: string;
  active?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  divider?: boolean;
  items?: ActionItem[];
  onClick?: (...args: unknown[]) => void;
};

const ACTION_MENU_PROPS: ComponentPropRow[] = [
  { prop: "trigger", type: "ReactNode", defaultValue: "-", description: "Element that opens the menu (usually Button)." },
  { prop: "items", type: "ActionItem[]", defaultValue: "[]", description: "Menu item configuration including submenus and dividers." },
  { prop: "placement", type: '"bottom-start" | "bottom-end" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end"', defaultValue: '"bottom-start"', description: "Where the menu opens relative to the trigger." },
  { prop: "variant", type: '"default" | "autosuggest" | "search"', defaultValue: '"default"', description: "Adds input-driven autosuggest or embedded-search filtering." },
  { prop: "searchPlaceholder", type: "string", defaultValue: '"Search..."', description: "Placeholder text for the embedded search field on the search variant." },
  { prop: "noResultsText", type: "string", defaultValue: '"No results found"', description: "Message shown when filtering returns no items." },
  { prop: "fullWidth", type: "boolean", defaultValue: "false", description: "When true, menu width matches trigger width." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables trigger and menu interaction." },
  { prop: "onOpenChange", type: "(isOpen: boolean) => void", defaultValue: "-", description: "Fires when menu opens/closes." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional root classes." },
  { prop: "menuClassName", type: "string", defaultValue: '""', description: "Additional classes on menu panel." },
];

const BASIC_ITEMS: ActionItem[] = [
  { id: "edit", label: "Edit", icon: "PencilSimple" },
  { id: "duplicate", label: "Duplicate", icon: "Copy" },
  { id: "delete", label: "Delete", icon: "Trash" },
];

const DIVIDER_ITEMS: ActionItem[] = [
  { id: "edit", label: "Edit", icon: "PencilSimple" },
  { id: "duplicate", label: "Duplicate", icon: "Copy" },
  { divider: true },
  { id: "archive", label: "Archive", icon: "ArchiveBox" },
  { id: "delete", label: "Delete", icon: "Trash" },
];

const DISABLED_ITEMS: ActionItem[] = [
  { id: "edit", label: "Edit", icon: "PencilSimple" },
  { id: "duplicate", label: "Duplicate", icon: "Copy" },
  { id: "delete", label: "Delete", icon: "Trash", disabled: true },
];

const DESTRUCTIVE_ITEMS: ActionItem[] = [
  { id: "edit", label: "Edit", icon: "PencilSimple" },
  { id: "duplicate", label: "Duplicate", icon: "Copy" },
  { divider: true },
  { id: "delete", label: "Delete", icon: "Trash", destructive: true },
];

const SHORTCUT_ITEMS: ActionItem[] = [
  { id: "cut", label: "Cut", icon: "Scissors", shortcut: "Cmd+X" },
  { id: "copy", label: "Copy", icon: "Copy", shortcut: "Cmd+C" },
  { id: "paste", label: "Paste", icon: "ClipboardText", shortcut: "Cmd+V" },
];

const AUTOSUGGEST_ITEMS: ActionItem[] = [
  { id: "appointment", label: "Appointment", icon: "CalendarDots" },
  { id: "application", label: "Application", icon: "FileText" },
  { id: "approval", label: "Approval", icon: "CheckCircle" },
  { id: "archive", label: "Archive", icon: "ArchiveBox" },
  { id: "assessment", label: "Assessment", icon: "ClipboardText" },
];

const SEARCH_ITEMS: ActionItem[] = [
  { id: "cardiology", label: "Cardiology", icon: "Heartbeat" },
  { id: "dermatology", label: "Dermatology", icon: "Stethoscope" },
  { id: "emergency", label: "Emergency Medicine", icon: "FirstAid" },
  { id: "family", label: "Family Medicine", icon: "UsersThree" },
  { id: "neurology", label: "Neurology", icon: "Brain" },
  { id: "orthopedics", label: "Orthopedics", icon: "Bone" },
  { id: "pediatrics", label: "Pediatrics", icon: "Baby" },
];

const MULTILEVEL_ITEMS: ActionItem[] = [
  { id: "edit", label: "Edit", icon: "PencilSimple" },
  {
    id: "share",
    label: "Share",
    icon: "ShareNetwork",
    items: [
      { id: "share-email", label: "Email", icon: "EnvelopeSimple" },
      { id: "share-slack", label: "Slack", icon: "ChatCircle" },
    ],
  },
  {
    id: "export",
    label: "Export",
    icon: "Export",
    items: [
      { id: "export-pdf", label: "PDF", icon: "FilePdf" },
      {
        id: "export-more",
        label: "More Formats",
        items: [
          { id: "export-json", label: "JSON", icon: "Code" },
          { id: "export-xml", label: "XML", icon: "FileCode" },
        ],
      },
    ],
  },
];

const PLACEMENTS = [
  { label: "Bottom Start", placement: "bottom-start" as const },
  { label: "Bottom End", placement: "bottom-end" as const },
  { label: "Top Start", placement: "top-start" as const },
  { label: "Top End", placement: "top-end" as const },
];

export function ActionMenuDemoPage() {
  const [autosuggestValue, setAutosuggestValue] = useState("");

  return (
    <DocPageLayout
      title="ActionMenu"
      description="ActionMenu groups contextual commands into a compact, keyboard-accessible dropdown."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic Usage
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
            items={BASIC_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Dividers
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
            items={DIVIDER_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Disabled Items
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
            items={DISABLED_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Destructive Actions
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
            items={DESTRUCTIVE_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            With Keyboard Shortcuts
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
            items={SHORTCUT_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Autosuggest Variant
          </Text>
          <ActionMenu
            variant="autosuggest"
            trigger={
              <TextInput
                value={autosuggestValue}
                onChange={(event) => setAutosuggestValue(event.target.value)}
                placeholder="Type a command..."
                icon="MagnifyingGlass"
              />
            }
            items={AUTOSUGGEST_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Search Variant
          </Text>
          <ActionMenu
            variant="search"
            searchPlaceholder="Search specialties..."
            trigger={<Button appearance="outline" label="Filter Specialties" layout="icon-right" icon="CaretDown" />}
            items={SEARCH_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Multilevel Menus
          </Text>
          <ActionMenu
            trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
            items={MULTILEVEL_ITEMS as unknown[]}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Trigger Variations
          </Text>
          <Layout alignItems="center" gap="16" wrap>
            <ActionMenu
              trigger={<Button appearance="outline" layout="icon-only" icon="DotsThree" aria-label="More actions" />}
              items={BASIC_ITEMS as unknown[]}
            />
            <ActionMenu
              trigger={<Button appearance="outline" label="Actions" layout="icon-right" icon="CaretDown" />}
              items={BASIC_ITEMS as unknown[]}
            />
            <ActionMenu
              trigger={<Button appearance="primary" label="Options" />}
              items={BASIC_ITEMS as unknown[]}
            />
          </Layout>
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Placement Options
          </Text>
          <Layout alignItems="center" gap="24" wrap>
            {PLACEMENTS.map((placement) => (
              <Layout
                key={placement.placement}
                direction="column"
                gap="8"
                style={{ minWidth: 200, minHeight: 120, justifyContent: "center", alignItems: "center" }}
              >
                <Text as="span" variant="body-14" leading="regular">
                  {placement.label}
                </Text>
                <ActionMenu
                  placement={placement.placement}
                  trigger={<Button appearance="outline" label={placement.label} />}
                  items={BASIC_ITEMS as unknown[]}
                />
              </Layout>
            ))}
          </Layout>
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={ACTION_MENU_PROPS} />
    </DocPageLayout>
  );
}
