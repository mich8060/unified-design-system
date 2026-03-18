import { useNavigate } from "react-router-dom";
import { Button } from "../../design-system/components/Button";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Tag } from "../../design-system/components/Tag";
import { Text } from "../../design-system/components/Text";
import { COMPONENT_DEMOS } from "../../demos/component-demo.registry";
import { PageHeaderMeta } from "./PageHeaderMeta";

export function ComponentsOverviewPage() {
  const navigate = useNavigate();

  return (
    <Layout className="app-shell__demo-page" direction="column" gap="0">
      <Layout className="app-shell__page-header" direction="column" gap="8">
        <Layout className="app-shell__page-header-inner" direction="column" gap="8">
          <PageHeaderMeta
            title="Components Overview Template"
            description="Custom canvas for manual layout. Keep this page as your editable artboard."
          />
        </Layout>
      </Layout>

      <Layout className="app-shell__contentInner" direction="column" gap="16">
        <Layout alignItems="center" gap="12" wrap>
          <Button label="Add Tile" icon="Plus" layout="icon-left" />
          <Button appearance="outline" label="Duplicate Section" icon="Copy" layout="icon-left" />
          <Button appearance="ghost" label="Reset Canvas" icon="ArrowCounterClockwise" layout="icon-left" />
        </Layout>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--uds-spacing-12)",
          }}
        >
          <Layout
            direction="column"
            gap="8"
            style={{
              minHeight: "260px",
              padding: "var(--uds-spacing-16)",
              border: "var(--uds-border-width-1) dashed var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-12)",
              background: "var(--uds-surface-brand-primary)",
            }}
          >
            <Text as="h3" variant="heading-20" weight="medium" leading="regular">
              Hero Tile
            </Text>
            <Text as="p" variant="body-14" leading="regular">
              Drag your primary composition here.
            </Text>
          </Layout>
          <Layout
            direction="column"
            gap="8"
            style={{
              minHeight: "180px",
              padding: "var(--uds-spacing-16)",
              border: "var(--uds-border-width-1) dashed var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-12)",
              background: "var(--uds-surface-primary)",
            }}
          >
            <Text as="h3" variant="heading-20" weight="medium" leading="regular">
              Tile A
            </Text>
            <Text as="p" variant="body-14" leading="regular">
              Placeholder zone.
            </Text>
          </Layout>
          <Layout
            direction="column"
            gap="8"
            style={{
              minHeight: "180px",
              padding: "var(--uds-spacing-16)",
              border: "var(--uds-border-width-1) dashed var(--uds-border-primary)",
              borderRadius: "var(--uds-radius-12)",
              background: "var(--uds-surface-secondary)",
            }}
          >
            <Text as="h3" variant="heading-20" weight="medium" leading="regular">
              Tile B
            </Text>
            <Text as="p" variant="body-14" leading="regular">
              Placeholder zone.
            </Text>
          </Layout>
        </div>

        <Divider variant="solid" />

        <Layout direction="column" gap="10">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Component Palette ({COMPONENT_DEMOS.length})
          </Text>
          <Text as="p" variant="body-14" leading="regular">
            Every component is represented below. Click a chip to jump to its dedicated demo.
          </Text>
          <Layout alignItems="center" gap="8" wrap>
            {COMPONENT_DEMOS.map((entry) => (
              <Tag
                key={entry.slug}
                label={entry.label}
                color="blue"
                solid
                rounded
                onClick={() => navigate(`/components/${entry.slug}`)}
              />
            ))}
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}
