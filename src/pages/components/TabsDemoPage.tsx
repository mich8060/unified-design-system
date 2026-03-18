import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Tabs } from "../../design-system/components/Tabs";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const TABS_PROPS: ComponentPropRow[] = [
  { prop: "tabs", type: "Array<{ id?: string | number; label: string; icon?: string; tag?: string | number | boolean; tagVariant?: string }>", defaultValue: "[]", description: "Tab item definitions." },
  { prop: "appearance", type: '"underline" | "block" | "block-inverted"', defaultValue: '"underline"', description: "Visual style for the tab list." },
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Tab list layout direction." },
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
  { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "neutral" },
  { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
  { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
  { id: "history", label: "History", icon: "ClockCounterClockwise", tag: "Label", tagVariant: "neutral" },
  { id: "archive", label: "Archive", icon: "ArchiveBox", tag: "Label", tagVariant: "neutral" },
];

const VERTICAL_TABS = [
  { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "neutral" },
  { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
  { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
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

const UNDERLINE_SNIPPET = `<Tabs
  tabs={[
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "activity", label: "Activity" },
  ]}
  appearance="underline"
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

const VERTICAL_UNDERLINE_SNIPPET = `<Tabs
  tabs={[
    { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "neutral" },
    { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
    { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
  ]}
  appearance="underline"
  orientation="vertical"
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

const VERTICAL_BLOCK_SNIPPET = `<Tabs
  tabs={[
    { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "neutral" },
    { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
    { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
  ]}
  appearance="block"
  orientation="vertical"
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

const VERTICAL_BLOCK_INVERTED_SNIPPET = `<Tabs
  tabs={[
    { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "sky" },
    { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
    { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
  ]}
  appearance="block-inverted"
  orientation="vertical"
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

const FILL_SNIPPET = `<Tabs
  tabs={[
    { id: "inbox", label: "Inbox", icon: "Tray", tag: "Label", tagVariant: "neutral" },
    { id: "assigned", label: "Assigned", icon: "UserCircle", tag: "Label", tagVariant: "neutral" },
    { id: "resolved", label: "Resolved", icon: "CheckCircle", tag: "Label", tagVariant: "neutral" },
  ]}
  appearance="underline"
  fill
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

const SCROLLABLE_SNIPPET = `<Tabs
  tabs={[
    { id: "all", label: "All" },
    { id: "open", label: "Open Requests" },
    { id: "pending", label: "Pending Review" },
    { id: "approved", label: "Approved" },
    { id: "denied", label: "Denied" },
    { id: "archived", label: "Archived" },
    { id: "drafts", label: "Drafts" },
    { id: "history", label: "History" },
  ]}
  appearance="underline"
  scrollable
  activeTab={activeTab}
  onTabChange={(index) => setActiveTab(index as number)}
/>`;

export function TabsDemoPage() {
  const [underlineActive, setUnderlineActive] = useState(0);
  const [blockActive, setBlockActive] = useState(0);
  const [blockInvertedActive, setBlockInvertedActive] = useState(0);
  const [fillActive, setFillActive] = useState(0);
  const [scrollableActive, setScrollableActive] = useState(0);
  const [verticalUnderlineActive, setVerticalUnderlineActive] = useState(0);
  const [verticalBlockActive, setVerticalBlockActive] = useState(0);
  const [verticalInvertedActive, setVerticalInvertedActive] = useState(0);

  return (
    <DocPageLayout
      title="Tabs"
      description="Tabs organize related content into a single container and let users switch context without leaving the page."
    >
      <Layout direction="column" gap="48">
        <Layout
          direction="column"
          gap="16"
          className="tabs-figma-component-capture"
          style={{
            padding: "var(--uds-spacing-24)",
            border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
            borderRadius: "var(--uds-radius-8)",
            background: "var(--uds-surface-primary)",
          }}
        >
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Tabs Component Set
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Component-focused layout for design handoff (horizontal + vertical variants).
          </Text>
          <Layout alignItems="flex-start" gap="24" wrap>
            <Layout direction="column" gap="8" style={{ minWidth: "320px" }}>
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Underline
              </Text>
              <Tabs tabs={BASE_TABS} appearance="underline" activeTab={0} />
            </Layout>
            <Layout direction="column" gap="8" style={{ minWidth: "320px" }}>
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Block
              </Text>
              <Tabs tabs={BASE_TABS} appearance="block" activeTab={0} />
            </Layout>
            <Layout direction="column" gap="8" style={{ minWidth: "320px" }}>
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Block Inverted
              </Text>
              <Tabs tabs={BASE_TABS} appearance="block-inverted" activeTab={0} />
            </Layout>
          </Layout>
          <Layout alignItems="flex-start" gap="24" wrap>
            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Vertical Underline
              </Text>
              <Tabs tabs={TABS_WITH_META} appearance="underline" orientation="vertical" activeTab={0} />
            </Layout>
            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Vertical Block
              </Text>
              <Tabs tabs={TABS_WITH_META} appearance="block" orientation="vertical" activeTab={0} />
            </Layout>
            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Vertical Block Inverted
              </Text>
              <Tabs
                tabs={TABS_WITH_META.map((tab, idx) => ({ ...tab, tagVariant: idx === 0 ? "sky" : "neutral" }))}
                appearance="block-inverted"
                orientation="vertical"
                activeTab={0}
              />
            </Layout>
          </Layout>
        </Layout>

        <Layout direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Horizontal Variants
          </Text>

          <Layout direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Underline
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="underline"
              activeTab={underlineActive}
              onTabChange={(index) => setUnderlineActive(index as number)}
            />
            <Code language="tsx" code={UNDERLINE_SNIPPET} />
          </Layout>

          <Layout direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Block
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="block"
              activeTab={blockActive}
              onTabChange={(index) => setBlockActive(index as number)}
            />
          </Layout>

          <Layout direction="column" gap="8">
            <Text as="h3" variant="body-16" weight="semibold" leading="regular">
              Block Inverted
            </Text>
            <Tabs
              tabs={BASE_TABS}
              appearance="block-inverted"
              activeTab={blockInvertedActive}
              onTabChange={(index) => setBlockInvertedActive(index as number)}
            />
          </Layout>
          <Code
            language="tsx"
            code={`<Tabs tabs={tabs} appearance="block" activeTab={activeTab} onTabChange={onTabChange} />
<Tabs tabs={tabs} appearance="block-inverted" activeTab={activeTab} onTabChange={onTabChange} />`}
          />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="16">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Vertical Tabs
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Vertical examples match the latest design direction, including icon + tag composition.
          </Text>

          <Layout alignItems="flex-start" gap="24" wrap>
            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Underline Vertical
              </Text>
              <Tabs
                tabs={VERTICAL_TABS}
                appearance="underline"
                orientation="vertical"
                activeTab={verticalUnderlineActive}
                onTabChange={(index) => setVerticalUnderlineActive(index as number)}
              />
            </Layout>

            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Block Vertical
              </Text>
              <Tabs
                tabs={VERTICAL_TABS}
                appearance="block"
                orientation="vertical"
                activeTab={verticalBlockActive}
                onTabChange={(index) => setVerticalBlockActive(index as number)}
              />
            </Layout>

            <Layout direction="column" gap="8">
              <Text as="h3" variant="body-16" weight="semibold" leading="regular">
                Block Inverted Vertical
              </Text>
              <Tabs
                tabs={VERTICAL_TABS.map((tab, idx) => ({
                  ...tab,
                  tagVariant: idx === 0 ? "sky" : "neutral",
                }))}
                appearance="block-inverted"
                orientation="vertical"
                activeTab={verticalInvertedActive}
                onTabChange={(index) => setVerticalInvertedActive(index as number)}
              />
            </Layout>
          </Layout>

          <Code language="tsx" code={VERTICAL_UNDERLINE_SNIPPET} />
          <Code language="tsx" code={VERTICAL_BLOCK_SNIPPET} />
          <Code language="tsx" code={VERTICAL_BLOCK_INVERTED_SNIPPET} />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="16">
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
          <Code language="tsx" code={FILL_SNIPPET} />
        </Layout>
        <Divider variant="solid" />

        <Layout direction="column" gap="16">
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
          <Code language="tsx" code={SCROLLABLE_SNIPPET} />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={TABS_PROPS} />
    </DocPageLayout>
  );
}
