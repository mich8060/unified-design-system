import { useState } from "react";
import { Divider, Flex, Tabs, Text } from "../../design-system";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TABS_PROPS: ComponentPropRow[] = [
  { prop: "tabs", type: "Array<{ id?: string | number; label: string; icon?: string; tag?: string | number; tagVariant?: string }>", defaultValue: "[]", description: "Tab item definitions." },
  { prop: "appearance", type: '"underline" | "block" | "block-inverted"', defaultValue: '"underline"', description: "Visual style for the tab list." },
  { prop: "activeTab", type: "number", defaultValue: "0", description: "Index of the active tab (0-based)." },
  { prop: "fill", type: "boolean", defaultValue: "false", description: "Whether tabs stretch to fill available width." },
  { prop: "scrollable", type: "boolean", defaultValue: "false", description: "Enables horizontal scrolling controls when tabs overflow." },
  { prop: "onTabChange", type: "(index: number, tab: object) => void", defaultValue: "-", description: "Called when active tab changes." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on tab list root." },
];

const BASE_TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "activity", label: "Activity" },
];

const TABS_WITH_META = [
  { id: "inbox", label: "Inbox", icon: "Tray", tag: 12, tagVariant: "red" },
  { id: "assigned", label: "Assigned", icon: "UserCircle", tag: 4, tagVariant: "blue" },
  { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: 18, tagVariant: "green" },
];

const SCROLLABLE_TABS = [
  { id: "all", label: "All" },
  { id: "open", label: "Open Requests" },
  { id: "pending", label: "Pending Review" },
  { id: "approved", label: "Approved" },
  { id: "denied", label: "Denied" },
  { id: "archived", label: "Archived" },
  { id: "drafts", label: "Drafts" },
  { id: "history", label: "History" },
];

export function TabsDemoPage() {
  const [underlineActive, setUnderlineActive] = useState(0);
  const [blockActive, setBlockActive] = useState(0);
  const [blockInvertedActive, setBlockInvertedActive] = useState(0);
  const [fillActive, setFillActive] = useState(0);
  const [scrollableActive, setScrollableActive] = useState(0);

  return (
    <DocPageLayout
      title="Tabs"
      description="Tabs organize related content into a single container and let users switch context without leaving the page."
    >
      <Flex direction="column" gap="48">
        <Flex direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Appearance Variants
          </Text>

          <Flex direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Underline
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="underline"
              activeTab={underlineActive}
              onTabChange={(index) => setUnderlineActive(index as number)}
            />
          </Flex>

          <Flex direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Block
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="block"
              activeTab={blockActive}
              onTabChange={(index) => setBlockActive(index as number)}
            />
          </Flex>

          <Flex direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Block Inverted
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="block-inverted"
              activeTab={blockInvertedActive}
              onTabChange={(index) => setBlockInvertedActive(index as number)}
            />
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Fill Variant
          </Text>
          <Tabs
            tabs={TABS_WITH_META}
            appearance="underline"
            fill
            activeTab={fillActive}
            onTabChange={(index) => setFillActive(index as number)}
          />
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Scrollable Variant
          </Text>
          <Tabs
            tabs={SCROLLABLE_TABS}
            appearance="underline"
            scrollable
            activeTab={scrollableActive}
            onTabChange={(index) => setScrollableActive(index as number)}
          />
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TABS_PROPS} />
    </DocPageLayout>
  );
}
