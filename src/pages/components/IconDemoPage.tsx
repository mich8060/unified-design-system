import { useEffect } from "react";
import { useMemo } from "react";
import { Button } from "../../design-system/components/Button";
import { Divider } from "../../design-system/components/Divider";
import { Dropdown } from "../../design-system/components/Dropdown";
import { Layout } from "../../design-system/components/Layout";
import { Icon } from "../../design-system/components/Icon";
import { TextInput } from "../../design-system/components/TextInput";
import { Text } from "../../design-system/components/Text";
import { useState } from "react";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";

const iconAppearances = ["regular", "bold", "thin", "light", "duotone", "fill", "solid", "outline"] as const;
const iconSizes = [16, 20, 24, 32] as const;
type IconAppearanceOption = (typeof iconAppearances)[number];
type PhosphorIconModule = Record<string, unknown>;

const NON_ICON_EXPORTS = new Set(["Icon", "IconBase", "IconContext", "SSRBase"]);

const isPhosphorIconExport = ([key, value]: [string, unknown]) =>
  /^[A-Z][A-Za-z0-9]*$/.test(key) &&
  (typeof value === "function" ||
    (typeof value === "object" &&
      value !== null &&
      "render" in value &&
      typeof (value as { render?: unknown }).render === "function")) &&
  value !== null &&
  !NON_ICON_EXPORTS.has(key);

const ICON_PROPS: ComponentPropRow[] = [
  { prop: "name", type: "string", defaultValue: "-", description: "Phosphor icon name (PascalCase)." },
  { prop: "size", type: "number", defaultValue: "24", description: "Rendered icon size in px." },
  {
    prop: "appearance",
    type: '"regular" | "bold" | "thin" | "light" | "duotone" | "fill" | "solid" | "outline"',
    defaultValue: '"regular"',
    description: "Visual icon weight/style.",
  },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional classes on icon root." },
  {
    prop: "...rest",
    type: "SVGAttributes<SVGSVGElement>",
    defaultValue: "-",
    description: "Native svg attributes like aria-*, role, onClick.",
  },
];

export function IconDemoPage() {
  const [allIconNames, setAllIconNames] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppearance, setSelectedAppearance] = useState<IconAppearanceOption>("regular");
  const [isLoadingIcons, setIsLoadingIcons] = useState(true);
  const [visibleCount, setVisibleCount] = useState(300);

  useEffect(() => {
    let isMounted = true;
    void import("@phosphor-icons/react")
      .then((module) => {
        if (!isMounted) return;
        const names = Object.entries(module as PhosphorIconModule)
          .filter(isPhosphorIconExport)
          .map(([name]) => name)
          .filter((name) => !name.endsWith("Icon"))
          .filter((name, index, arr) => arr.indexOf(name) === index)
          .sort((a, b) => a.localeCompare(b));
        setAllIconNames(names);
      })
      .finally(() => {
        if (isMounted) setIsLoadingIcons(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredIconNames = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return allIconNames;
    return allIconNames.filter((iconName) => iconName.toLowerCase().includes(query));
  }, [allIconNames, searchTerm]);
  const visibleIconNames = useMemo(
    () => filteredIconNames.slice(0, visibleCount),
    [filteredIconNames, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(300);
  }, [searchTerm, selectedAppearance]);

  return (
    <DocPageLayout
      title="Icon"
      description="Icon wraps Phosphor iconography and supports consistent sizing and appearance options."
    >
      <Layout direction="column" gap="12">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Appearances
        </Text>
        <Layout alignItems="center" gap="16" wrap>
          {iconAppearances.map((appearance) => (
            <Layout key={appearance} direction="column" alignItems="center" gap="4">
              <Icon name="WarningCircle" appearance={appearance} />
              <Text as="span" variant="body-12" leading="regular">
                {appearance}
              </Text>
            </Layout>
          ))}
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="12">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Sizes
        </Text>
        <Layout alignItems="flex-end" gap="16" wrap>
          {iconSizes.map((size) => (
            <Layout key={size} direction="column" alignItems="center" gap="4">
              <Icon name="House" size={size} />
              <Text as="span" variant="body-12" leading="regular">
                {size}px
              </Text>
            </Layout>
          ))}
        </Layout>
      </Layout>
      <Divider variant="solid" />

      <Layout direction="column" gap="12">
        <Text as="h2" variant="heading-24" weight="medium" leading="regular">
          Icon Explorer
        </Text>
        <Layout alignItems="flex-end" gap="12" wrap>
          <Layout direction="column" gap="4" style={{ minWidth: "280px", flex: "1 1 320px" }}>
            <TextInput
              label="Search icons"
              placeholder="Try: House, Calendar, MagnifyingGlass"
              icon="MagnifyingGlass"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </Layout>
          <Layout direction="column" gap="4" style={{ minWidth: "220px" }}>
            <Dropdown
              placeholder="Weight"
              value={selectedAppearance}
              options={iconAppearances.map((appearance) => ({ value: appearance, label: appearance }))}
              onChange={(value) => {
                if (typeof value === "string" && iconAppearances.includes(value as IconAppearanceOption)) {
                  setSelectedAppearance(value as IconAppearanceOption);
                }
              }}
            />
          </Layout>
        </Layout>
        <Text as="p" variant="body-14" leading="regular">
          {isLoadingIcons
            ? "Loading icons..."
            : `Showing ${visibleIconNames.length} of ${filteredIconNames.length} filtered icons (${allIconNames.length} total).`}
        </Text>
        <Layout gap="12" wrap>
          {visibleIconNames.map((name) => (
            <Layout
              key={name}
              direction="column"
              alignItems="center"
              gap="8"
              style={{
                width: "120px",
                padding: "var(--uds-spacing-12)",
                border: "1px solid var(--uds-color-neutrals-200)",
                borderRadius: "var(--uds-radius-8)",
              }}
            >
              <Icon name={name} size={24} appearance={selectedAppearance} />
              <Text as="span" variant="body-12" leading="regular" style={{ textAlign: "center" }}>
                {name}
              </Text>
            </Layout>
          ))}
        </Layout>
        {!isLoadingIcons && filteredIconNames.length > visibleCount ? (
          <Layout>
            <Button onClick={() => setVisibleCount((current) => current + 300)} appearance="secondary">
              Load more icons
            </Button>
          </Layout>
        ) : null}
      </Layout>

      <Divider variant="solid" />
      <ComponentPropsTable rows={ICON_PROPS} />
    </DocPageLayout>
  );
}
