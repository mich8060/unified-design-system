import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { ScrollView } from "../../design-system/components/ScrollView";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const SCROLL_VIEW_PROPS: ComponentPropRow[] = [
  { prop: "direction", type: '"vertical" | "horizontal"', defaultValue: '"vertical"', description: "Controls which axis can scroll." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes for the root element." },
  { prop: "style", type: "CSSProperties", defaultValue: "-", description: "Inline styles for sizing and layout." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Content rendered inside the scroll container." },
  { prop: "...rest", type: "HTMLAttributes<HTMLDivElement>", defaultValue: "-", description: "Standard div attributes (id, data-*, aria-*, etc.)." },
];

const VERTICAL_SNIPPET = `<ScrollView direction="vertical" style={{ height: "180px" }}>
  {Array.from({ length: 12 }).map((_, index) => (
    <div key={index}>Row {index + 1}</div>
  ))}
</ScrollView>`;

const HORIZONTAL_SNIPPET = `<ScrollView direction="horizontal" style={{ width: "360px" }}>
  <div style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
    <span>Column A</span>
    <span>Column B</span>
    <span>Column C</span>
    <span>Column D</span>
  </div>
</ScrollView>`;

export function ScrollViewDemoPage() {
  return (
    <DocPageLayout
      title="ScrollView"
      description="ScrollView constrains overflow to a single axis using the direction prop."
    >
      <Layout direction="column" gap="24">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Vertical
          </Text>
          <ScrollView
            direction="vertical"
            style={{
              height: "180px",
              border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-8)",
              padding: "var(--uds-spacing-8)",
            }}
          >
            <Layout direction="column" gap="8">
              {Array.from({ length: 12 }).map((_, index) => (
                <Text key={index} as="p" variant="body-14" leading="regular">
                  Vertical row {index + 1}
                </Text>
              ))}
            </Layout>
          </ScrollView>
          <Code language="tsx" code={VERTICAL_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Horizontal
          </Text>
          <ScrollView
            direction="horizontal"
            style={{
              width: "360px",
              border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-8)",
              padding: "var(--uds-spacing-8)",
            }}
          >
            <div style={{ display: "inline-flex", gap: "var(--uds-spacing-12)", whiteSpace: "nowrap" }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Text key={index} as="span" variant="body-14" leading="regular">
                  Horizontal item {index + 1}
                </Text>
              ))}
            </div>
          </ScrollView>
          <Code language="tsx" code={HORIZONTAL_SNIPPET} />
        </Layout>

        <Divider variant="solid" />
        <ComponentPropsTable rows={SCROLL_VIEW_PROPS} title="ScrollView Props" />
      </Layout>
    </DocPageLayout>
  );
}
