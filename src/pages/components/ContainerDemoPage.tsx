import { Code } from "../../design-system/components/Code";
import { Container } from "../../design-system/components/Container";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const CONTAINER_PROPS: ComponentPropRow[] = [
  { prop: "surface", type: '"default" | "panel" | "subtle-panel" | "list" | "card-selectable" | "scroll-region" | "transparent"', defaultValue: '"transparent"', description: "Structural surface preset for common layout shells." },
  { prop: "border", type: '"default" | "subtle" | "none"', defaultValue: '"default"', description: "Tokenized border treatment." },
  { prop: "radius", type: '"none" | "sm" | "md" | "lg"', defaultValue: '"md"', description: "Tokenized corner radius." },
  { prop: "overflow", type: '"visible" | "hidden" | "auto" | "clip"', defaultValue: '"visible"', description: "Overflow handling for panel/list wrappers." },
  { prop: "padding", type: '"none" | "xsmall" | "small" | "default" | "large" | "xlarge"', defaultValue: '"large"', description: "Unified padding scale." },
  { prop: "paddingX", type: '"none" | "xsmall" | "small" | "default" | "large" | "xlarge"', defaultValue: "-", description: "Horizontal override for padding." },
  { prop: "paddingY", type: '"none" | "xsmall" | "small" | "default" | "large" | "xlarge"', defaultValue: "-", description: "Vertical override for padding." },
  { prop: "appearance", type: '"default" | "transparent"', defaultValue: "-", description: "Deprecated alias retained for backward compatibility. Prefer `surface`." },
];

const BASIC_SNIPPET = `<Container>
  <Text as="p" variant="body-14" leading="regular">
    Container content
  </Text>
</Container>`;

const SURFACE_SNIPPET = `<Container surface="panel">Panel</Container>
<Container surface="subtle-panel">Subtle panel</Container>
<Container surface="list">List shell</Container>
<Container surface="card-selectable">Selectable card shell</Container>
<Container surface="scroll-region">Scroll region shell</Container>
<Container surface="transparent">Transparent</Container>`;

const STRUCTURE_SNIPPET = `<Container surface="panel" border="subtle" radius="lg" overflow="hidden">
  Structural shell with tokenized border/radius/overflow.
</Container>`;

const PADDING_SNIPPET = `<Container padding="none">No padding</Container>
<Container padding="small">Small padding</Container>
<Container padding="default">Default padding</Container>
<Container padding="large">Large padding</Container>
<Container paddingX="large" paddingY="small">
  Horizontal: large, Vertical: small
</Container>`;

const LEGACY_SNIPPET = `<Container appearance="default">Legacy default appearance</Container>
<Container appearance="transparent">Legacy transparent appearance</Container>`;

export function ContainerDemoPage() {
  return (
    <DocPageLayout
      title="Container"
      description="Container provides reusable structural shells with tokenized surface, border, radius, overflow, and spacing controls."
    >
      <Layout direction="column" gap="48">
        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Basic
          </Text>
          <Container>
            <Text as="p" variant="body-14" leading="regular">
              Container content
            </Text>
          </Container>
          <Code language="tsx" code={BASIC_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Surface Presets
          </Text>
          <Layout direction="column" gap="8">
            <Container surface="panel"><Text as="span" variant="body-14">Panel</Text></Container>
            <Container surface="subtle-panel"><Text as="span" variant="body-14">Subtle panel</Text></Container>
            <Container surface="list"><Text as="span" variant="body-14">List shell</Text></Container>
            <Container surface="card-selectable"><Text as="span" variant="body-14">Selectable card shell</Text></Container>
            <Container surface="scroll-region"><Text as="span" variant="body-14">Scroll region shell</Text></Container>
            <Container surface="transparent"><Text as="span" variant="body-14">Transparent</Text></Container>
          </Layout>
          <Code language="tsx" code={SURFACE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Border, Radius, Overflow
          </Text>
          <Container surface="panel" border="subtle" radius="lg" overflow="hidden">
            <Text as="p" variant="body-14" leading="regular">
              Structural shell with tokenized border/radius/overflow.
            </Text>
          </Container>
          <Code language="tsx" code={STRUCTURE_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Padding Examples
          </Text>
          <Layout direction="column" gap="8">
            <Container padding="none"><Text as="span" variant="body-14">No padding</Text></Container>
            <Container padding="small"><Text as="span" variant="body-14">Small padding</Text></Container>
            <Container padding="default"><Text as="span" variant="body-14">Default padding</Text></Container>
            <Container padding="large"><Text as="span" variant="body-14">Large padding</Text></Container>
            <Container paddingX="large" paddingY="small">
              <Text as="span" variant="body-14">Horizontal: large, Vertical: small</Text>
            </Container>
          </Layout>
          <Code language="tsx" code={PADDING_SNIPPET} />
        </Layout>

        <Divider variant="solid" />

        <Layout direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Legacy Appearance (Deprecated)
          </Text>
          <Layout direction="column" gap="8">
            <Container appearance="default"><Text as="span" variant="body-14">Legacy default appearance</Text></Container>
            <Container appearance="transparent"><Text as="span" variant="body-14">Legacy transparent appearance</Text></Container>
          </Layout>
          <Code language="tsx" code={LEGACY_SNIPPET} />
        </Layout>
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={CONTAINER_PROPS} />
    </DocPageLayout>
  );
}
