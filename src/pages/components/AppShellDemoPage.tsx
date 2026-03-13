import { Avatar } from "../../design-system/components/Avatar";
import { useMemo, useState } from "react";
import { Button } from "../../design-system/components/Button";
import type { CSSProperties } from "react";
import { Code } from "../../design-system/components/Code";
import { Divider } from "../../design-system/components/Divider";
import { Dropdown } from "../../design-system/components/Dropdown";
import { Flex } from "../../design-system/components/Flex";
import { Menu } from "../../design-system/components/Menu";
import { SearchInput } from "../../design-system/components/SearchInput";
import { Tag } from "../../design-system/components/Tag";
import { Text } from "../../design-system/components/Text";
import { Toggle } from "../../design-system/components/Toggle";
import { DocPageLayout } from "../docs/DocPageLayout";
import { ComponentPropsTable, type ComponentPropRow } from "../docs/ComponentPropsTable";
import { doctorList } from "../../design-system/assets/images/doctors";

const APP_SHELL_PROPS: ComponentPropRow[] = [
  { prop: "brand", type: "string", defaultValue: '"default"', description: "Brand namespace class applied to shell root (`brand-*`)." },
  { prop: "theme", type: '"light" | "dark"', defaultValue: '"light"', description: "Theme namespace class applied to shell root (`theme-*`)." },
  { prop: "layout", type: "ShellLayoutConfig", defaultValue: "defaultLayout", description: "Layout and density configuration object." },
  { prop: "slots", type: "AppShellSlots", defaultValue: "{}", description: "Optional overrides for Header, Sidebar, Breadcrumb, Footer, SubNav." },
  { prop: "skipToContent", type: "boolean", defaultValue: "true", description: "Renders keyboard-accessible skip link that jumps to main content." },
  { prop: "skipToContentLabel", type: "string", defaultValue: '"Skip to content"', description: "Accessible label text shown for the skip link." },
  { prop: "mainContentId", type: "string", defaultValue: "generated", description: "Optional custom id for the main content target used by skip link." },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "Compound regions using `AppShell.Menu`, `AppShell.Content`, `AppShell.Listview`, `AppShell.Main`." },
  { prop: "className", type: "string", defaultValue: '""', description: "Additional CSS classes on shell root." },
];

const LAYOUT_CONFIG_PROPS: ComponentPropRow[] = [
  { prop: "sidebar", type: "boolean", defaultValue: "true", description: "Shows/hides the left navigation rail." },
  { prop: "footer", type: "boolean", defaultValue: "true", description: "Shows/hides shell footer region." },
  { prop: "container", type: '"max" | "fluid" | "none"', defaultValue: '"max"', description: "Main content container behavior." },
  { prop: "padding", type: '"standard" | "none"', defaultValue: '"standard"', description: "Main content padding mode." },
  { prop: "density", type: '"comfortable" | "compact"', defaultValue: '"comfortable"', description: "Global spacing density mode." },
];

const COMPOSITION_RULES = [
  "Use `AppShell` as the top-level wrapper for full app screens.",
  "Put primary navigation in `AppShell.Menu` and route content in `AppShell.Main`.",
  "Use `AppShell.Listview` for optional left-side contextual lists.",
  "Switch brand/theme at the shell root instead of hardcoding styles in components.",
];

const BASIC_APP_SHELL_EXAMPLE = `<AppShell brand="default" theme="light">
  <AppShell.Menu>
    <Menu navItems={NAV_ITEMS} />
  </AppShell.Menu>

  <AppShell.Content>
    <AppShell.Main>
      <DashboardPage />
    </AppShell.Main>
  </AppShell.Content>
</AppShell>`;

const LISTVIEW_APP_SHELL_EXAMPLE = `<AppShell brand="comphealth" theme="dark">
  <AppShell.Menu>
    <Menu navItems={NAV_ITEMS} />
  </AppShell.Menu>

  <AppShell.Content>
    <AppShell.Listview>
      <CandidateList />
    </AppShell.Listview>

    <AppShell.Main>
      <CandidateDetail />
    </AppShell.Main>
  </AppShell.Content>
</AppShell>`;

const COMPACT_LAYOUT_EXAMPLE = `<AppShell
  brand="weatherby"
  theme="light"
  layout={{ density: "compact", container: "fluid", padding: "standard" }}
>
  <AppShell.Menu>
    <Menu navItems={NAV_ITEMS} />
  </AppShell.Menu>

  <AppShell.Content>
    <AppShell.Main>
      <ReportsPage />
    </AppShell.Main>
  </AppShell.Content>
</AppShell>`;

const LIVE_PREVIEW_MENU_ITEMS = [
  { label: "Search", icon: "MagnifyingGlass", path: "/components/app-shell/search" },
  { label: "Calendar", icon: "CalendarBlank", path: "/components/app-shell/calendar" },
  { label: "Assignments", icon: "ClipboardText", path: "/components/app-shell" },
  { label: "Edit", icon: "PencilSimple", path: "/components/app-shell/edit" },
  { label: "Archive", icon: "ArchiveBox", path: "/components/app-shell/archive" },
];

type DoctorRecord = {
  name: string;
  image: string;
  initials: string;
};

const ALL_DOCTORS = doctorList as DoctorRecord[];
const PREVIEW_DOCTORS = ALL_DOCTORS.slice(0, 8);
const DOCTOR_OPTIONS = ALL_DOCTORS.map((doctor) => ({
  value: doctor.name,
  label: doctor.name,
}));

const PREVIEW_FRAME: CSSProperties = {
  border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
  borderRadius: "var(--uds-radius-8)",
  overflow: "hidden",
  backgroundColor: "var(--uds-surface-primary)",
};

const PREVIEW_HEADER: CSSProperties = {
  padding: "var(--uds-spacing-8) var(--uds-spacing-12)",
  borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
  backgroundColor: "var(--uds-surface-secondary)",
};

const PREVIEW_REGION: CSSProperties = {
  border: "var(--uds-border-width-1) dashed var(--uds-border-primary)",
  borderRadius: "var(--uds-radius-4)",
  padding: "var(--uds-spacing-10)",
};

type DocumentCategory = "provider" | "credential" | "contract" | "compliance";
type DocumentUrgency = "action" | "recent" | "archived";

type DocumentRecord = {
  id: string;
  title: string;
  category: DocumentCategory;
  owner: string;
  updatedAt: string;
  urgency: DocumentUrgency;
};

const DOCUMENT_SCOPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "provider", label: "Providers" },
  { value: "credential", label: "Credentials" },
  { value: "contract", label: "Contracts" },
  { value: "compliance", label: "Compliance" },
];

const PANEL_SHOW_MORE_COUNT = 3;

const PREVIEW_DOCUMENTS: DocumentRecord[] = [
  { id: "doc-1", title: "Colorado License Renewal", category: "credential", owner: "Dr. Alexis Hall", updatedAt: "2h ago", urgency: "action" },
  { id: "doc-2", title: "DEA Certificate Verification", category: "credential", owner: "Dr. Jordan Reeves", updatedAt: "4h ago", urgency: "action" },
  { id: "doc-3", title: "Assignment Contract Addendum", category: "contract", owner: "Dr. Casey Morgan", updatedAt: "Today", urgency: "action" },
  { id: "doc-4", title: "Provider Profile Summary", category: "provider", owner: "Dr. Jordan Reeves", updatedAt: "Today", urgency: "recent" },
  { id: "doc-5", title: "References Packet", category: "provider", owner: "Dr. Alexis Hall", updatedAt: "Yesterday", urgency: "recent" },
  { id: "doc-6", title: "Malpractice Insurance", category: "compliance", owner: "Dr. Casey Morgan", updatedAt: "Yesterday", urgency: "recent" },
  { id: "doc-7", title: "Legacy Assignment Notes", category: "contract", owner: "Dr. Jordan Reeves", updatedAt: "Last week", urgency: "archived" },
  { id: "doc-8", title: "Archived Credential Scan", category: "credential", owner: "Dr. Alexis Hall", updatedAt: "Last month", urgency: "archived" },
];

const GROUP_META: Record<DocumentUrgency, { label: string; badgeColor: "red" | "blue" | "neutral" }> = {
  action: { label: "Needs Action", badgeColor: "red" },
  recent: { label: "Recent", badgeColor: "blue" },
  archived: { label: "Archived", badgeColor: "neutral" },
};

export function AppShellDemoPage() {
  const [showListview, setShowListview] = useState(true);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [panelQuery, setPanelQuery] = useState("");
  const [panelScope, setPanelScope] = useState("all");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<DocumentUrgency, boolean>>({
    action: false,
    recent: false,
    archived: true,
  });
  const [expandedGroups, setExpandedGroups] = useState<Record<DocumentUrgency, boolean>>({
    action: false,
    recent: false,
    archived: false,
  });
  const [selectedDoctorName, setSelectedDoctorName] = useState(
    PREVIEW_DOCTORS[0]?.name ?? "",
  );
  const selectedDoctor =
    ALL_DOCTORS.find((doctor) => doctor.name === selectedDoctorName) ??
    PREVIEW_DOCTORS[0];
  const filteredDocuments = useMemo(() => {
    const normalizedQuery = panelQuery.trim().toLowerCase();
    return PREVIEW_DOCUMENTS.filter((doc) => {
      const matchesScope = panelScope === "all" ? true : doc.category === panelScope;
      const haystack = `${doc.title} ${doc.owner} ${doc.category}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 ? true : haystack.includes(normalizedQuery);
      return matchesScope && matchesQuery;
    });
  }, [panelQuery, panelScope]);

  const groupedDocuments = useMemo(
    () => ({
      action: filteredDocuments.filter((doc) => doc.urgency === "action"),
      recent: filteredDocuments.filter((doc) => doc.urgency === "recent"),
      archived: filteredDocuments.filter((doc) => doc.urgency === "archived"),
    }),
    [filteredDocuments],
  );

  const toggleGroup = (group: DocumentUrgency) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  return (
    <DocPageLayout
      title="AppShell"
      description="AppShell provides the application-level layout contract for menu, content regions, theme, brand, and density."
    >
      <Flex direction="column" gap="48">
        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Compound Regions
          </Text>
          <Flex direction="column" gap="8">
            <Text as="p" variant="body-16" leading="regular">
              `AppShell.Menu` renders the sidebar area.
            </Text>
            <Text as="p" variant="body-16" leading="regular">
              `AppShell.Content` wraps content sections and can include `AppShell.Listview` and `AppShell.Main`.
            </Text>
            <Text as="p" variant="body-16" leading="regular">
              `AppShell.Main` is the primary route content surface.
            </Text>
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Composition Rules
          </Text>
          <Flex as="ul" direction="column" gap="8">
            {COMPOSITION_RULES.map((rule) => (
              <Text as="li" key={rule} variant="body-16" leading="regular">
                {rule}
              </Text>
            ))}
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Live Preview
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Toggle regions to preview `Listview + Main` side-by-side, then slide a right-side panel in and out.
          </Text>
          <Flex style={{ width: "100%", overflowX: "auto", paddingBottom: "var(--uds-spacing-4)" }}>
            <Flex
              style={{
                border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                borderRadius: "var(--uds-radius-8)",
                backgroundColor: "var(--uds-surface-primary)",
                overflow: "hidden",
                width: "1280px",
                minWidth: "1280px",
                height: "800px",
              }}
              direction="column"
              gap="0"
            >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              wrap
              gap="12"
              style={{
                padding: "var(--uds-spacing-10) var(--uds-spacing-12)",
                borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                backgroundColor: "var(--uds-surface-secondary)",
              }}
            >
              <Flex alignItems="center" gap="12" wrap>
                <Flex alignItems="center" gap="8">
                  <Toggle checked={showListview} onChange={setShowListview} size="small" />
                  <Text as="span" variant="body-14" leading="regular">
                    Listview
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="8">
                  <Toggle checked={showSidePanel} onChange={setShowSidePanel} size="small" />
                  <Text as="span" variant="body-14" leading="regular">
                    Side Panel
                  </Text>
                </Flex>
                <Flex alignItems="center" gap="8" style={{ minWidth: 260 }}>
                  <Text as="span" variant="body-14" leading="regular">
                    Doctor
                  </Text>
                  <Dropdown
                    options={DOCTOR_OPTIONS}
                    value={selectedDoctorName}
                    onChange={(value) => {
                      if (typeof value === "string") setSelectedDoctorName(value);
                    }}
                    size="compact"
                    placement="bottom-start"
                  />
                </Flex>
              </Flex>
              <Button
                appearance="outline"
                size="xsmall"
                label={showSidePanel ? "Close Side Panel" : "Open Side Panel"}
                onClick={() => setShowSidePanel((prev) => !prev)}
              />
            </Flex>

            <Flex
              className="app-shell__body"
              style={{ flex: 1, minHeight: 0, backgroundColor: "var(--uds-surface-primary)" }}
            >
              <aside className="app-shell__sidebar" style={{ position: "relative" }}>
                <Menu
                  className="example"
                  defaultExpanded={false}
                  navItems={LIVE_PREVIEW_MENU_ITEMS}
                  showSearch
                  showBrandSwitcher
                  showModeToggle={false}
                  showUser={false}
                />
              </aside>

              <Flex style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden" }}>
                <Flex
                  direction="column"
                  style={{
                    width: showListview ? 240 : 0,
                    transition: "width 220ms ease",
                    overflow: "hidden",
                    borderRight: showListview
                      ? "var(--uds-border-width-1) solid var(--uds-border-primary)"
                      : "none",
                    backgroundColor: "var(--uds-surface-primary)",
                    flexShrink: 0,
                  }}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                      padding: "var(--uds-spacing-10) var(--uds-spacing-12)",
                      borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                      minWidth: 240,
                    }}
                  >
                    <Text as="span" variant="body-14" weight="semibold" leading="regular">
                      Assignments
                    </Text>
                    <Text as="span" variant="body-12" leading="regular">
                      8
                    </Text>
                  </Flex>
                  <Flex direction="column" style={{ minWidth: 240 }}>
                    {PREVIEW_DOCTORS.map((doctor) => (
                      <Flex
                        key={doctor.name}
                        alignItems="center"
                        gap="8"
                        onClick={() => setSelectedDoctorName(doctor.name)}
                        style={{
                          padding: "var(--uds-spacing-10) var(--uds-spacing-12)",
                          borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                          backgroundColor:
                            doctor.name === selectedDoctorName
                              ? "var(--uds-surface-tertiary)"
                              : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          src={doctor.image}
                          name={doctor.name}
                          initials={doctor.initials}
                          size="small"
                          alt={`${doctor.name} avatar`}
                        />
                        <Text as="span" variant="body-14" leading="regular">
                          {doctor.name}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>

                <Flex direction="column" style={{ flex: 1, minWidth: 0 }}>
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                      padding: "var(--uds-spacing-12)",
                      borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                    }}
                  >
                    <Text as="span" variant="body-16" weight="semibold" leading="regular">
                      Assignment Details
                    </Text>
                    <Button appearance="outline" size="xsmall" label="Message" />
                  </Flex>
                  <Flex
                    direction="column"
                    gap="12"
                    style={{ padding: "var(--uds-spacing-12)", maxWidth: 720 }}
                  >
                    <Text as="h4" variant="heading-24" weight="medium" leading="regular">
                      {selectedDoctor?.name ?? "Doctor"}
                    </Text>
                    <Text as="p" variant="body-14" leading="regular">
                      Cardiology · Denver, CO
                    </Text>
                    <Divider variant="solid" style={{ width: "100%" }} />
                    <Text as="p" variant="body-16" leading="regular">
                      Main section stays side-by-side with Listview. Turn on Side Panel to see it overlay from the right.
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  direction="column"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 280,
                    transform: showSidePanel ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 220ms ease",
                    borderLeft: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                    backgroundColor: "var(--uds-surface-secondary)",
                    boxShadow: "var(--uds-shadow-lg)",
                    zIndex: "var(--uds-elevation-overlay)",
                  }}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                      padding: "var(--uds-spacing-10) var(--uds-spacing-12)",
                      borderBottom: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                      minWidth: 280,
                    }}
                  >
                    <Text as="span" variant="body-14" weight="semibold" leading="regular">
                      Side Panel
                    </Text>
                    <Button appearance="ghost" size="xsmall" label="Close" onClick={() => setShowSidePanel(false)} />
                  </Flex>
                  <Flex direction="column" gap="8" style={{ padding: "var(--uds-spacing-10)", minWidth: 280 }}>
                    <SearchInput
                      size="compact"
                      placeholder="Search documents"
                      value={panelQuery}
                      onChange={(event) => setPanelQuery(event.target.value)}
                      dropdownOptions={DOCUMENT_SCOPE_OPTIONS}
                      dropdownValue={panelScope}
                      onDropdownChange={(value) => setPanelScope(value)}
                      dropdownPlaceholder="All"
                    />
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text as="span" variant="body-12" leading="regular">
                        Showing {filteredDocuments.length} docs
                      </Text>
                      <Button
                        appearance="text"
                        size="xsmall"
                        label="Clear"
                        onClick={() => {
                          setPanelQuery("");
                          setPanelScope("all");
                        }}
                      />
                    </Flex>

                    {(Object.keys(groupedDocuments) as DocumentUrgency[]).map((groupKey) => {
                      const docs = groupedDocuments[groupKey];
                      const isCollapsed = collapsedGroups[groupKey];
                      const isExpanded = expandedGroups[groupKey];
                      const visibleDocs =
                        isExpanded || docs.length <= PANEL_SHOW_MORE_COUNT
                          ? docs
                          : docs.slice(0, PANEL_SHOW_MORE_COUNT);
                      const hiddenCount = docs.length - visibleDocs.length;
                      const meta = GROUP_META[groupKey];

                      return (
                        <Flex
                          key={groupKey}
                          direction="column"
                          gap="6"
                          style={{
                            border: "var(--uds-border-width-1) solid var(--uds-border-primary)",
                            borderRadius: "var(--uds-radius-6)",
                            backgroundColor: "var(--uds-surface-primary)",
                            padding: "var(--uds-spacing-8)",
                          }}
                        >
                          <Flex alignItems="center" justifyContent="space-between">
                            <Flex alignItems="center" gap="6">
                              <Text as="span" variant="body-14" weight="semibold" leading="regular">
                                {meta.label}
                              </Text>
                              <Tag label={String(docs.length)} color={meta.badgeColor} solid rounded />
                            </Flex>
                            <Button
                              appearance="text"
                              size="xsmall"
                              label={isCollapsed ? "Expand" : "Collapse"}
                              onClick={() => toggleGroup(groupKey)}
                            />
                          </Flex>

                          {!isCollapsed ? (
                            <>
                              {visibleDocs.length > 0 ? (
                                <Flex direction="column" gap="4">
                                  {visibleDocs.map((doc) => (
                                    <Flex
                                      key={doc.id}
                                      direction="column"
                                      gap="2"
                                      style={{
                                        padding: "var(--uds-spacing-6)",
                                        borderRadius: "var(--uds-radius-4)",
                                        backgroundColor: "var(--uds-surface-secondary)",
                                      }}
                                    >
                                      <Text as="span" variant="body-14" weight="semibold" leading="regular">
                                        {doc.title}
                                      </Text>
                                      <Text as="span" variant="body-12" leading="regular">
                                        {doc.owner} • {doc.updatedAt}
                                      </Text>
                                    </Flex>
                                  ))}
                                </Flex>
                              ) : (
                                <Text as="span" variant="body-12" leading="regular">
                                  No matching documents.
                                </Text>
                              )}

                              {hiddenCount > 0 ? (
                                <Button
                                  appearance="text"
                                  size="xsmall"
                                  label={`Show ${hiddenCount} more`}
                                  onClick={() =>
                                    setExpandedGroups((prev) => ({ ...prev, [groupKey]: true }))
                                  }
                                />
                              ) : null}
                            </>
                          ) : null}
                        </Flex>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h2" variant="heading-24" weight="medium" leading="regular">
            Examples
          </Text>
          <Text as="p" variant="body-16" leading="regular">
            Start with a minimal shell, then add optional regions (`Listview`) and layout configuration as your page needs grow.
          </Text>
        </Flex>

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            Basic Shell
          </Text>
          <Flex direction="column" gap="0" style={PREVIEW_FRAME}>
            <Flex style={PREVIEW_HEADER}>
              <Text as="span" variant="body-14" weight="semibold" leading="regular">
                brand-default + theme-light
              </Text>
            </Flex>
            <Flex style={{ minHeight: 180 }}>
              <Flex
                direction="column"
                style={{
                  ...PREVIEW_REGION,
                  width: 140,
                  margin: "var(--uds-spacing-10)",
                  backgroundColor: "var(--uds-surface-tertiary)",
                }}
              >
                <Text as="span" variant="body-14" weight="semibold" leading="regular">
                  AppShell.Menu
                </Text>
              </Flex>
              <Flex direction="column" style={{ flex: 1, margin: "var(--uds-spacing-10) var(--uds-spacing-10) var(--uds-spacing-10) 0" }}>
                <Flex style={{ ...PREVIEW_REGION, minHeight: 120 }}>
                  <Text as="span" variant="body-14" weight="semibold" leading="regular">
                    AppShell.Main
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Code language="tsx" code={BASIC_APP_SHELL_EXAMPLE} />
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            Shell with Listview
          </Text>
          <Flex direction="column" gap="0" style={PREVIEW_FRAME}>
            <Flex style={PREVIEW_HEADER}>
              <Text as="span" variant="body-14" weight="semibold" leading="regular">
                brand-comphealth + theme-dark
              </Text>
            </Flex>
            <Flex style={{ minHeight: 200 }}>
              <Flex
                direction="column"
                style={{
                  ...PREVIEW_REGION,
                  width: 140,
                  margin: "var(--uds-spacing-10)",
                  backgroundColor: "var(--uds-surface-tertiary)",
                }}
              >
                <Text as="span" variant="body-14" weight="semibold" leading="regular">
                  AppShell.Menu
                </Text>
              </Flex>
              <Flex direction="column" style={{ flex: 1, margin: "var(--uds-spacing-10) var(--uds-spacing-10) var(--uds-spacing-10) 0" }} gap="8">
                <Flex style={{ ...PREVIEW_REGION, minHeight: 72 }}>
                  <Text as="span" variant="body-14" weight="semibold" leading="regular">
                    AppShell.Listview
                  </Text>
                </Flex>
                <Flex style={{ ...PREVIEW_REGION, minHeight: 98 }}>
                  <Text as="span" variant="body-14" weight="semibold" leading="regular">
                    AppShell.Main
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Code language="tsx" code={LISTVIEW_APP_SHELL_EXAMPLE} />
        </Flex>
        <Divider variant="solid" />

        <Flex direction="column" gap="12">
          <Text as="h3" variant="heading-20" weight="medium" leading="regular">
            Compact + Fluid Layout
          </Text>
          <Flex direction="column" gap="0" style={PREVIEW_FRAME}>
            <Flex style={PREVIEW_HEADER}>
              <Text as="span" variant="body-14" weight="semibold" leading="regular">
                density-compact + container-fluid + padding-standard
              </Text>
            </Flex>
            <Flex style={{ minHeight: 180 }}>
              <Flex
                direction="column"
                style={{
                  ...PREVIEW_REGION,
                  width: 120,
                  margin: "var(--uds-spacing-8)",
                  padding: "var(--uds-spacing-8)",
                }}
              >
                <Text as="span" variant="body-12" weight="semibold" leading="regular">
                  Menu
                </Text>
              </Flex>
              <Flex direction="column" style={{ flex: 1, margin: "var(--uds-spacing-8) var(--uds-spacing-8) var(--uds-spacing-8) 0" }}>
                <Flex style={{ ...PREVIEW_REGION, minHeight: 132, padding: "var(--uds-spacing-8)" }}>
                  <Text as="span" variant="body-12" weight="semibold" leading="regular">
                    Main (compact spacing)
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Code language="tsx" code={COMPACT_LAYOUT_EXAMPLE} />
        </Flex>
      </Flex>

      <Divider variant="solid" />
      <ComponentPropsTable rows={APP_SHELL_PROPS} />
      <ComponentPropsTable rows={LAYOUT_CONFIG_PROPS} title="Layout Config" />
    </DocPageLayout>
  );
}
