import { AirplaneIcon } from "@phosphor-icons/react/Airplane"
import { BriefcaseIcon } from "@phosphor-icons/react/Briefcase"
import { BuildingApartmentIcon } from "@phosphor-icons/react/BuildingApartment"
import { BuildingsIcon } from "@phosphor-icons/react/Buildings"
import { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank"
import { CalendarPlusIcon } from "@phosphor-icons/react/CalendarPlus"
import { ChartBarIcon } from "@phosphor-icons/react/ChartBar"
import { ClockIcon } from "@phosphor-icons/react/Clock"
import { EnvelopeIcon } from "@phosphor-icons/react/Envelope"
import { FolderOpenIcon } from "@phosphor-icons/react/FolderOpen"
import { GpsFixIcon } from "@phosphor-icons/react/GpsFix"
import { LayoutIcon } from "@phosphor-icons/react/Layout"
import { NotePencilIcon } from "@phosphor-icons/react/NotePencil"
import { SortDescendingIcon } from "@phosphor-icons/react/SortDescending"
import { UserListIcon } from "@phosphor-icons/react/UserList"
import { UsersIcon } from "@phosphor-icons/react/Users"
import { WalletIcon } from "@phosphor-icons/react/Wallet"
import type { MenuNavigationItem } from "./menu"

const DEFAULT_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "requests", label: "Requests", icon: BriefcaseIcon },
  { id: "providers", label: "Providers", icon: UsersIcon },
  { id: "calendar", label: "Calendar", icon: CalendarBlankIcon },
  { id: "reporting", label: "Reporting", icon: ChartBarIcon },
]

const LOCUM_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "schedule", label: "Schedule", icon: CalendarBlankIcon },
  { id: "job-board", label: "Job Board", icon: BriefcaseIcon },
  { id: "application", label: "Application", icon: NotePencilIcon },
  {
    id: "documents",
    label: "Documents",
    icon: FolderOpenIcon,
    children: [
      { id: "documents-credentialing", label: "Credentialing" },
      { id: "documents-financial", label: "Financial" },
    ],
  },
  { id: "time-entry", label: "Time Entry", icon: ClockIcon },
  { id: "travel", label: "Travel", icon: AirplaneIcon },
]

const CONNECT_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "requests", label: "Requests", icon: BriefcaseIcon },
  { id: "providers", label: "Providers", icon: UsersIcon },
  { id: "scheduling", label: "Scheduling", icon: CalendarPlusIcon },
  {
    id: "pooling",
    label: "Pooling",
    icon: UserListIcon,
    children: [
      { id: "pooling-open", label: "Open requisitions" },
      { id: "pooling-candidates", label: "Candidates" },
      { id: "pooling-matches", label: "Matches" },
      { id: "pooling-pipeline", label: "Pipeline" },
    ],
  },
  { id: "escalations", label: "Escalations", icon: SortDescendingIcon },
  { id: "calendar", label: "Calendar", icon: CalendarBlankIcon },
  { id: "reporting", label: "Reporting", icon: ChartBarIcon },
]

const LOCUMSMART_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "workflow", label: "Workflow", icon: FolderOpenIcon },
  { id: "crm", label: "CRM", icon: UsersIcon },
  { id: "analytics", label: "Analytics", icon: ChartBarIcon },
  { id: "administration", label: "Administration", icon: BuildingApartmentIcon },
]

const MODIO_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "reports", label: "Reports", icon: FolderOpenIcon },
  { id: "providers", label: "Providers", icon: UsersIcon },
  { id: "facilities", label: "Facilities", icon: BuildingsIcon },
  { id: "payors", label: "Payors", icon: WalletIcon },
  { id: "tracking", label: "Tracking", icon: GpsFixIcon },
]

const CAREERMD_NAV: MenuNavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutIcon },
  { id: "jobs", label: "Jobs", icon: BriefcaseIcon },
  { id: "employers", label: "Employers", icon: BuildingsIcon },
  { id: "candidates", label: "Candidates", icon: UsersIcon },
  { id: "messages", label: "Messages", icon: EnvelopeIcon },
  { id: "reporting", label: "Reporting", icon: ChartBarIcon },
]

const WIREFRAME_NAV: MenuNavigationItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: `menu-item-${i + 1}`,
  label: "Menu Item",
}))

const BRAND_NAVIGATION: Record<string, MenuNavigationItem[]> = {
  default: DEFAULT_NAV,
  chg: CONNECT_NAV,
  comphealth: LOCUM_NAV,
  gms: LOCUM_NAV,
  weatherby: LOCUM_NAV,
  connect: CONNECT_NAV,
  locumsmart: LOCUMSMART_NAV,
  modio: MODIO_NAV,
  careermd: CAREERMD_NAV,
  wireframe: WIREFRAME_NAV,
}

/**
 * Returns the default navigation items for the given brand.
 * Falls back to the `"default"` set if the brand is unknown.
 */
export function getDefaultNavigation(brand: string): MenuNavigationItem[] {
  return BRAND_NAVIGATION[brand] ?? DEFAULT_NAV
}
