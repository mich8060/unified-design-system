import { useEffect } from "react";
import { Branding } from "../../design-system/components/Branding";
import { Button } from "../../design-system/components/Button";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Layout } from "../../design-system/components/Layout";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const BRANDS = [
  "design-system",
  "connect",
  "comphealth",
  "weatherby",
  "modio",
  "locumsmart",
  "wireframe",
] as const;

const BRANDING_PROPS: ComponentPropRow[] = [
  { prop: "brand", type: "string", defaultValue: "-", description: "Brand key to render when inherit is false." },
  { prop: "symbol", type: "boolean", defaultValue: "false", description: "Render symbol-only variant." },
  { prop: "inherit", type: "boolean", defaultValue: "false", description: "Read active brand from html[data-brand]." },
  { prop: "size", type: '"small" | "default" | "large"', defaultValue: '"default"', description: "Logo/symbol size variant." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on root." },
];

const FULL_LOGO_SNIPPET = `{["design-system", "connect", "comphealth"].map((brand) => (
  <Branding key={brand} brand={brand} />
))}`;

const SYMBOL_SNIPPET = `{["design-system", "connect", "comphealth"].map((brand) => (
  <Branding key={brand} brand={brand} symbol />
))}`;

const SIZE_SNIPPET = `<Branding brand="design-system" size="small" />
<Branding brand="design-system" size="default" />
<Branding brand="design-system" size="large" />

<Branding brand="design-system" symbol size="small" />
<Branding brand="design-system" symbol size="default" />
<Branding brand="design-system" symbol size="large" />`;

const INHERIT_SNIPPET = `<Button label="connect" onClick={() => document.documentElement.setAttribute("data-brand", "connect")} />
<Button label="comphealth" onClick={() => document.documentElement.setAttribute("data-brand", "comphealth")} />

<Branding inherit />
<Branding inherit symbol />`;

export function BrandingDemoPage() {
  const [activeBrand, setActiveBrand] = useState<(typeof BRANDS)[number]>("design-system");

  useEffect(() => {
    document.documentElement.setAttribute("data-brand", activeBrand);
  }, [activeBrand]);

  return (
    <DocPageLayout
      title="Branding"
      description="Branding renders full logos and symbols for each supported brand identity."
    >
      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Full Logos
        </Text>
        <Layout direction="column" gap="12">
          {BRANDS.map((brand) => (
            <Layout key={`logo-${brand}`} alignItems="center" gap="12">
              <Text as="span" variant="body-14" weight="medium" leading="regular">
                {brand}
              </Text>
              <Branding brand={brand} />
            </Layout>
          ))}
        </Layout>
        <Code language="tsx" code={FULL_LOGO_SNIPPET} />
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Symbols
        </Text>
        <Layout alignItems="center" gap="16" wrap>
          {BRANDS.map((brand) => (
            <Branding key={`symbol-${brand}`} brand={brand} symbol />
          ))}
        </Layout>
        <Code language="tsx" code={SYMBOL_SNIPPET} />
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Size Variants
        </Text>
        <Layout direction="column" gap="12">
          <Layout alignItems="center" gap="12">
            <Text as="span" variant="body-14" weight="medium" leading="regular">
              Logo sizes:
            </Text>
            <Branding brand="design-system" size="small" />
            <Branding brand="design-system" size="default" />
            <Branding brand="design-system" size="large" />
          </Layout>
          <Layout alignItems="center" gap="12">
            <Text as="span" variant="body-14" weight="medium" leading="regular">
              Symbol sizes:
            </Text>
            <Branding brand="design-system" symbol size="small" />
            <Branding brand="design-system" symbol size="default" />
            <Branding brand="design-system" symbol size="large" />
          </Layout>
        </Layout>
        <Code language="tsx" code={SIZE_SNIPPET} />
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="16">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Inherit Mode
        </Text>
        <Layout alignItems="center" gap="8" wrap>
          {BRANDS.map((brand) => (
            <Button
              key={`brand-switch-${brand}`}
              label={brand}
              size="xsmall"
              appearance={activeBrand === brand ? "primary" : "outline"}
              onClick={() => setActiveBrand(brand)}
            />
          ))}
        </Layout>
        <Layout alignItems="center" gap="12">
          <Branding inherit />
          <Branding inherit symbol />
        </Layout>
        <Code language="tsx" code={INHERIT_SNIPPET} />
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={BRANDING_PROPS} />
    </DocPageLayout>
  );
}
