import { readFileSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

const PACKAGE_JSON_PATH = path.join(ROOT, "package.json")
const PACKAGE_NAME = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8")).name
const REGISTRY_BASE_URL = "http://localhost:5173/r"
const REGISTRY_NAMESPACE = "@uds"

const INDEX_PATH = path.join(ROOT, "src/index.ts")
const CONTRACT_PATH = path.join(ROOT, "ai/uds-contract.json")
const REGISTRY_PATH = path.join(ROOT, "registry.json")
const PUBLIC_REGISTRY_DIR = path.join(ROOT, "public/r")

const ROLE_BY_MODULE = {
  accordion: ["data-display"],
  alert: ["feedback"],
  "alert-dialog-uds": ["overlay"],
  "app-shell": ["layout", "first-party"],
  "aspect-ratio": ["layout"],
  "avatar-uds": ["data-display"],
  badge: ["feedback"],
  breadcrumb: ["navigation"],
  button: ["input"],
  "button-group": ["input"],
  calendar: ["input"],
  card: ["data-display"],
  chart: ["data-display", "first-party"],
  checkbox: ["input"],
  collapsible: ["layout"],
  combobox: ["input"],
  command: ["input"],
  "check-list": ["input", "first-party"],
  "context-menu": ["navigation"],
  "dialog-uds": ["overlay"],
  "description-list": ["data-display"],
  "docs-nav": ["navigation", "first-party"],
  direction: ["layout"],
  "dot-status": ["feedback"],
  drawer: ["overlay"],
  "dropdown-menu": ["navigation"],
  empty: ["feedback"],
  field: ["input"],
  "file-upload": ["input", "first-party"],
  "file-upload-cards": ["input", "first-party"],
  "hover-card": ["overlay"],
  "date-input": ["input", "input-group"],
  "date-range-input": ["input"],
  input: ["input"],
  "input-group": ["input"],
  "input-otp": ["input"],
  item: ["data-display", "first-party"],
  kbd: ["data-display"],
  label: ["input"],
  layout: ["layout", "first-party"],
  link: ["navigation"],
  medallion: ["feedback", "first-party"],
  menubar: ["navigation"],
  menu: ["navigation", "first-party"],
  "micro-calendar": ["data-display", "first-party"],
  "native-select": ["input"],
  "navigation-menu-uds": ["navigation"],
  "number-input": ["input"],
  pagination: ["navigation"],
  "password-input": ["input"],
  "phone-input": ["input"],
  popover: ["overlay"],
  progress: ["feedback"],
  "progress-circles": ["feedback"],
  "radio-group": ["input"],
  resizable: ["layout"],
  "scroll-area": ["layout"],
  "search-input": ["input"],
  select: ["input"],
  separator: ["layout"],
  "section-header": ["layout", "first-party"],
  "sheet-uds": ["overlay"],
  sidebar: ["navigation", "layout", "first-party"],
  skeleton: ["feedback"],
  slider: ["input"],
  sonner: ["feedback"],
  spinner: ["feedback"],
  statistics: ["data-display", "first-party"],
  status: ["feedback", "first-party"],
  steps: ["navigation", "first-party"],
  switch: ["input"],
  table: ["data-display"],
  tabs: ["navigation"],
  text: ["data-display", "first-party"],
  textarea: ["input"],
  "time-input": ["input"],
  "time-step-input": ["input"],
  "token-input": ["input"],
  toggle: ["input"],
  "toggle-group": ["input"],
  toolbar: ["navigation"],
  tooltip: ["overlay"],
  "url-input": ["input"],
  "uds-icons": ["utility", "first-party"],
  "use-mobile": ["utility"],
  utils: ["utility"],
  "uds-brand": ["utility", "first-party"],
}

const PREFERRED_EXPORTS = new Set([
  "AppShell",
  "Menu",
  "Badge",
  "Button",
  "Card",
  "CardContent",
  "CardFooter",
  "CardImage",
  "Dialog",
  "AlertDialog",
  "Sheet",
  "Sidebar",
  "SidebarContent",
  "SidebarFooter",
  "SidebarGroup",
  "SidebarGroupAction",
  "SidebarGroupContent",
  "SidebarGroupLabel",
  "SidebarHeader",
  "SidebarInset",
  "SidebarInput",
  "SidebarMenu",
  "SidebarMenuAction",
  "SidebarMenuBadge",
  "SidebarMenuButton",
  "SidebarMenuItem",
  "SidebarMenuSkeleton",
  "SidebarMenuSub",
  "SidebarMenuSubButton",
  "SidebarMenuSubItem",
  "SidebarProvider",
  "SidebarRail",
  "SidebarSeparator",
  "SidebarTrigger",
  "Status",
  "SectionHeader",
  "SectionHeaderActions",
  "SectionHeaderContent",
  "SectionHeaderDescription",
  "SectionHeaderTitle",
  "Medallion",
  "Item",
  "Table",
  "Tabs",
  "TooltipProvider",
  "Input",
  "Select",
])

const AVOID_DIRECT_EXPORTS = new Set([
  "BaseButton",
  "BaseButtonProps",
  "baseButtonVariants",
  "buttonSizeToBaseSize",
  "buttonThemeVariants",
  "buttonVariants",
  "resolveButtonClasses",
])

const RECIPE_DEFINITIONS = [
  {
    id: "auth-shell",
    title: "Authenticated Shell",
    file: "ai/recipes/auth-shell.md",
    description: "Base authenticated product shell with AppShell, Menu in the menu slot, and branded summary content.",
    defaults: ["AppShell", "Menu", "Card", "Button", "Status"],
  },
  {
    id: "workspace-dashboard",
    title: "Workspace Dashboard",
    file: "ai/recipes/workspace-dashboard.md",
    description: "Operational dashboard with branded metrics, queue summaries, and first-party emphasis components.",
    defaults: ["AppShell", "Menu", "Badge", "Medallion", "Status", "Card", "SectionHeader"],
  },
  {
    id: "detail-with-listview",
    title: "Detail With Listview",
    file: "ai/recipes/detail-with-listview.md",
    description: "Master-detail layout using the AppShell listview region instead of ad hoc split panes.",
    defaults: ["AppShell", "Menu", "Item", "Table", "Tabs"],
  },
  {
    id: "settings-form",
    title: "Settings Form",
    file: "ai/recipes/settings-form.md",
    description: "Preference or admin page that keeps UDS field chrome and uses AppShell for the surrounding layout.",
    defaults: ["AppShell", "Field", "Input", "Select", "Switch", "Button"],
  },
]

const REGISTRY_ITEMS = [
  {
    name: "uds-style",
    title: "UDS Style Contract",
    description: "Imports the published UDS stylesheet contract and documents the required package dependency.",
    type: "registry:style",
    categories: ["style", "theme"],
    files: [
      {
        target: "styles/uds.css",
        content: '@import "uds-tailwind-test/styles.css";\n',
      },
    ],
    docs:
      "Install `uds-tailwind-test`, import `styles/uds.css` from your app entrypoint, and keep your runtime component imports on the package root.",
  },
  {
    name: "app-shell",
    title: "UDS AppShell",
    description: "Wrapper export for the published AppShell layout surface.",
    type: "registry:item",
    categories: ["layout", "shell"],
    files: [{ target: "components/uds/app-shell.tsx", content: 'export { AppShell } from "uds-tailwind-test"\n' }],
  },
  {
    name: "sidebar",
    title: "UDS Sidebar",
    description: "Wrapper exports for the published UDS Sidebar primitives (in-page side panels — not the AppShell menu rail; use Menu there).",
    type: "registry:item",
    categories: ["layout", "navigation"],
    files: [
      {
        target: "components/uds/sidebar.tsx",
        content: `export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "uds-tailwind-test"
`,
      },
    ],
  },
  ...[
    ["button", "Button"],
    ["card", "Card"],
    ["badge", "Badge"],
    ["status", "Status"],
    ["medallion", "Medallion"],
    ["input", "Input"],
    ["select", "Select"],
    ["dialog", "Dialog"],
    ["sheet", "Sheet"],
    ["alert-dialog", "AlertDialog"],
    ["tabs", "Tabs"],
    ["table", "Table"],
    ["tooltip", "Tooltip"],
  ].map(([name, symbol]) => ({
    name,
    title: `UDS ${symbol}`,
    description: `Wrapper export for the published ${symbol} surface from ${PACKAGE_NAME}.`,
    type: "registry:item",
    categories: ["ui"],
    files: [{ target: `components/uds/${name}.tsx`, content: `export { ${symbol} } from "${PACKAGE_NAME}"\n` }],
  })),
]

async function main() {
  const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, "utf8"))
  const exportedModules = await getIndexExports()
  const componentCatalog = await buildCatalog(exportedModules)
  const contract = buildContract(packageJson.version, componentCatalog)
  const registry = buildRegistry(packageJson.version)

  await mkdir(path.dirname(CONTRACT_PATH), { recursive: true })
  await mkdir(PUBLIC_REGISTRY_DIR, { recursive: true })

  await writeJson(CONTRACT_PATH, contract)
  await writeJson(REGISTRY_PATH, registry)

  await Promise.all(
    registry.items.map((item) =>
      writeJson(path.join(PUBLIC_REGISTRY_DIR, `${item.name}.json`), item)
    )
  )
}

async function getIndexExports() {
  const indexSource = await readFile(INDEX_PATH, "utf8")
  const modules = []

  for (const match of indexSource.matchAll(/export\s+\*\s+from\s+["'](.+?)["']/g)) {
    modules.push(match[1])
  }

  for (const match of indexSource.matchAll(/export\s+\{[^}]+\}\s+from\s+["'](.+?)["']/g)) {
    if (!modules.includes(match[1])) modules.push(match[1])
  }

  return modules
}

async function buildCatalog(modules) {
  const items = []

  for (const specifier of modules) {
    const modulePath = resolveModule(specifier)
    const moduleSource = await readFile(modulePath, "utf8")
    const moduleId = path.basename(specifier)
    const exportEntries = collectNamedExports(moduleSource)
    const roles = ROLE_BY_MODULE[moduleId] ?? ["utility"]

    for (const entry of exportEntries) {
      items.push({
        name: entry.name,
        exportKind: entry.kind,
        module: specifier.replace(/^\.\//, ""),
        roles,
        recommendation: getRecommendation(entry.name, entry.kind, roles),
      })
    }
  }

  return items
    .filter((item, index, self) => self.findIndex((candidate) => candidate.name === item.name) === index)
    .sort((a, b) => a.name.localeCompare(b.name))
}

function collectNamedExports(source) {
  const entries = []

  for (const match of source.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g)) {
    entries.push({ name: match[1], kind: "component" })
  }

  for (const match of source.matchAll(/export\s+(?:const|let|var|class)\s+([A-Za-z0-9_]+)/g)) {
    entries.push({ name: match[1], kind: /^[A-Z]/.test(match[1]) ? "component" : "utility" })
  }

  for (const match of source.matchAll(/export\s+type\s+([A-Za-z0-9_]+)/g)) {
    entries.push({ name: match[1], kind: "type" })
  }

  for (const match of source.matchAll(/export\s+interface\s+([A-Za-z0-9_]+)/g)) {
    entries.push({ name: match[1], kind: "type" })
  }

  for (const match of source.matchAll(/export\s+type\s*\{([^}]+)\}(?:\s+from\s+["'][^"']+["'])?/g)) {
    entries.push(...parseNamedList(match[1], "type"))
  }

  for (const match of source.matchAll(/export\s*\{([^}]+)\}(?:\s+from\s+["'][^"']+["'])?/g)) {
    entries.push(...parseNamedList(match[1], "utility"))
  }

  return entries.filter((entry) => entry.name !== "default")
}

function parseNamedList(list, fallbackKind) {
  return list
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const sourceName = part.split(/\s+as\s+/i)[1] ?? part.split(/\s+as\s+/i)[0]
      const name = sourceName.trim()
      return {
        name,
        kind: fallbackKind === "utility" && /^[A-Z]/.test(name) ? "component" : fallbackKind,
      }
    })
}

function getRecommendation(name, kind, roles) {
  if (AVOID_DIRECT_EXPORTS.has(name)) return "avoid-directly"
  if (kind === "type") return "allowed"
  if (PREFERRED_EXPORTS.has(name)) return "preferred"
  if (roles.includes("utility")) return "allowed"
  return "allowed"
}

function buildContract(version, componentCatalog) {
  return {
    generatedAt: new Date().toISOString(),
    generatedFrom: ["src/index.ts", "package.json", "scripts/generate-ai-artifacts.mjs"],
    package: {
      name: PACKAGE_NAME,
      version,
      primaryEntry: PACKAGE_NAME,
      styleImport: `${PACKAGE_NAME}/styles.css`,
    },
    imports: {
      allowed: [PACKAGE_NAME, `${PACKAGE_NAME}/styles.css`],
      forbiddenPatterns: [
        "src/components/ui/*",
        "dist/*",
        "@/*",
        "*-base",
        "*-core",
        "*-theme",
        "*-uds",
      ],
    },
    layoutDefaults: {
      authenticatedScreens: {
        defaultShell: "AppShell",
        menuSlot:
          "Compose AppShell.menu with the package Menu component. AppShell CSS offsets the body from [data-slot=uds-menu-root]. Do not put Sidebar* in menu unless you own rail positioning CSS.",
        mainContent:
          "Put page UI in AppShell.Main. enableRouterOutlet defaults true (bundled Outlet before main children); set false for static apps. Use nested React Router layout routes when the outlet is enabled.",
        listview:
          "Optional listview prop. Master-detail: only .appshell--main scrolls; list body uses data-slot=appshell-listview-scroll inside a flex column. See ai/recipes/detail-with-listview.md.",
        footer: "Optional. Use only when the screen needs persistent summary or status chrome.",
        appShellGuide: "ai/guides/appshell-navigation.md",
        menuBrand:
          "Menu defaults to brand id chg (CHG wordmark). Override with Menu brand prop; use brandStorageKey only when persisting a user choice. Do not use docs-site-data-brand in consumer apps.",
        menuHeaderIdentity:
          "headerVariant brand (default): CHG product logos via Branding. headerVariant title: plain-text headerTitle/headerShortTitle for internal or non-product apps without an approved lockup—see ai/guides/menu-header-identity.md. Do not use title mode for standard CHG product shells.",
        menuHeaderGuide: "ai/guides/menu-header-identity.md",
      },
      viewportFill: [
        "Ensure html, body, and #root span the viewport.",
        'Apply a shell class such as "min-h-dvh w-full min-w-0".',
      ],
    },
    componentCatalog,
    stylingRules: {
      radiusPolicy: {
        summary:
          "Current shipped components are the source of truth. Prefer 4px for standard rectangular application chrome, while preserving existing 8px/12px radii for overlays and selected themed primitives. Circular and pill shapes remain allowed when intrinsic to the component.",
        rectangularChrome: "Prefer square or 4px corners for routine layout, form, and status surfaces.",
        allowedSemanticExceptions: [
          "Overlay panels and menus that already ship with 8px radii.",
          "Decorative or media surfaces that already ship with 12px radii.",
          "Circle and pill semantics for avatars, indicators, toggles, and medallions.",
        ],
      },
      colorPolicy: {
        summary:
          "Use shipped UDS tokens and component variants. Prefer brand-linked emphasis through Badge, Status, Medallion, tinted cards, and token-backed surfaces before inventing custom accents.",
      },
      darkMode: {
        convention: "Use the existing .dark class convention.",
      },
      cssVariables: {
        overrides: "Consumers may override published CSS variables. Do not bypass the package stylesheet contract.",
      },
    },
    screenRecipes: RECIPE_DEFINITIONS,
    antiPatterns: [
      "Do not build a bespoke outer shell with raw div/aside markup when AppShell plus Menu already fits the screen.",
      "Do not put Sidebar* in AppShell.menu and add fixed inset-y-0 rail CSS — use Menu in menu.",
      "Do not use AppShell props sidebarWidth, showListview, or mainClassName — they are not on the published API.",
      "Do not use CSS that collapses .appshell--main > :first-child to fix layout.",
      "Do not assume consumer-only react-router-dom fills AppShell without a layout route under the same router.",
      "Do not import from src/components/ui/*, dist/*, or repo-local aliases in consumer code.",
      "Do not invent a parallel component system for buttons, fields, badges, or status treatments when package exports exist.",
      "Do not default to stock shadcn layout patterns when UDS-specific first-party components are available.",
    ],
    references: [
      "src/index.ts",
      "examples/consumer-react/src/App.tsx",
      "ai/examples/auth-shell.tsx",
      "ai/examples/workspace-dashboard.tsx",
      "ai/examples/detail-with-listview.tsx",
      "ai/examples/settings-form.tsx",
      "ai/guides/appshell-navigation.md",
      "ai/appshell.schema.json",
      "AI_USAGE.md",
      "setup.md",
    ],
    registry: {
      namespace: REGISTRY_NAMESPACE,
      localUrlTemplate: `${REGISTRY_BASE_URL}/{name}.json`,
      items: REGISTRY_ITEMS.map((item) => item.name),
    },
  }
}

function buildRegistry(version) {
  const items = REGISTRY_ITEMS.map((item) => buildRegistryItem(item, version))

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "uds",
    homepage: "http://localhost:5173",
    items,
  }
}

function buildRegistryItem(item, version) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    author: "Unified Design System",
    categories: item.categories,
    dependencies: [`${PACKAGE_NAME}@${version}`],
    docs:
      item.docs ??
      "These registry items are thin wrappers around the published package surface. Import styles from `uds-tailwind-test/styles.css` at the app root.",
    meta: {
      package: PACKAGE_NAME,
      registryBaseUrl: REGISTRY_BASE_URL,
      localOnly: true,
    },
    files: item.files.map((file) => ({
      path: `registry/uds/${path.basename(file.target)}`,
      type: "registry:file",
      target: file.target,
      content: file.content,
    })),
  }
}

function resolveModule(specifier) {
  const relativePath = specifier.replace(/^\.\//, "")
  if (specifier.endsWith(".ts") || specifier.endsWith(".tsx")) {
    return path.join(ROOT, "src", relativePath)
  }

  const candidateTsx = path.join(ROOT, "src", `${relativePath}.tsx`)
  const candidateTs = path.join(ROOT, "src", `${relativePath}.ts`)

  return relativePath.includes("lib/utils") ||
    relativePath.includes("hooks/") ||
    relativePath.startsWith("lib/")
    ? candidateTs
    : candidateTsx
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
