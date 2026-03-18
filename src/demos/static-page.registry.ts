export interface StaticPageDefinition {
  path: string;
  label: string;
  category: "getting-started" | "foundations" | "patterns";
  moduleDir: "docs" | "patterns";
  moduleFile: string;
  exportName: string;
  shellless?: boolean;
}

const staticPage = (
  path: string,
  label: string,
  category: StaticPageDefinition["category"],
  moduleDir: StaticPageDefinition["moduleDir"],
  moduleFile: string,
  exportName: string,
  shellless = false
): StaticPageDefinition => ({
  path,
  label,
  category,
  moduleDir,
  moduleFile,
  exportName,
  shellless,
});

export const STATIC_PAGES: readonly StaticPageDefinition[] = [
  staticPage("/getting-started", "Overview", "getting-started", "docs", "GettingStartedPage", "GettingStartedPage"),
  staticPage(
    "/getting-started/installation",
    "Installation",
    "getting-started",
    "docs",
    "InstallationPage",
    "InstallationPage"
  ),
  staticPage(
    "/docs/components-overview",
    "Components Overview",
    "getting-started",
    "docs",
    "ComponentsOverviewPage",
    "ComponentsOverviewPage"
  ),
  staticPage("/sample-item", "Sample Item", "getting-started", "docs", "SampleItemPage", "SampleItemPage"),
  staticPage("/docs/tokens", "Design Tokens", "foundations", "docs", "DesignTokensPage", "DesignTokensPage"),
  staticPage(
    "/foundations/typography",
    "Typography",
    "foundations",
    "docs",
    "TypographyPage",
    "TypographyPage"
  ),
  staticPage(
    "/foundations/colors-primitives",
    "Colors",
    "foundations",
    "docs",
    "FoundationsPage",
    "FoundationsPage"
  ),
  staticPage("/patterns/checklist", "Checklist", "patterns", "patterns", "ChecklistPatternPage", "ChecklistPatternPage"),
  staticPage(
    "/patterns/providers-card",
    "Providers Card",
    "patterns",
    "patterns",
    "ProvidersCardPatternPage",
    "ProvidersCardPatternPage"
  ),
  staticPage(
    "/patterns/section-header",
    "Section Header",
    "patterns",
    "patterns",
    "SectionHeaderPatternPage",
    "SectionHeaderPatternPage"
  ),
];

export const PATTERN_NAV_ITEMS = STATIC_PAGES.filter((entry) => entry.category === "patterns").map((entry) => ({
  label: entry.label,
  path: entry.path,
}));

export function getStaticPageByPath(pathname: string): StaticPageDefinition | undefined {
  return STATIC_PAGES.find((entry) => entry.path === pathname);
}
