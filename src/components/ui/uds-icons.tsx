/**
 * UDS icon surface: Phosphor is wired here only (per-icon deep imports so Vite
 * does not prebundle the entire `@phosphor-icons/react` barrel). Apps should
 * import `Icon` (and optional `IconContext`) from the published package instead
 * of `@phosphor-icons/react` directly so a future vendor swap is limited to this file.
 *
 * Use `<Icon name="MagnifyingGlassIcon" … />`. Add new keys to `UDS_ICON_REGISTRY`
 * (and the export list) when a glyph is missing.
 */
import * as React from "react"

import { AirplaneIcon } from "@phosphor-icons/react/Airplane"
import { ArrowClockwiseIcon } from "@phosphor-icons/react/ArrowClockwise"
import { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft"
import { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight"
import { ArrowsInIcon } from "@phosphor-icons/react/ArrowsIn"
import { ArrowsOutIcon } from "@phosphor-icons/react/ArrowsOut"
import { ArrowUpIcon } from "@phosphor-icons/react/ArrowUp"
import { ArrowUpRightIcon } from "@phosphor-icons/react/ArrowUpRight"
import { BellIcon } from "@phosphor-icons/react/Bell"
import { BookmarkIcon } from "@phosphor-icons/react/Bookmark"
import { BriefcaseIcon } from "@phosphor-icons/react/Briefcase"
import { BuildingApartmentIcon } from "@phosphor-icons/react/BuildingApartment"
import { BuildingsIcon } from "@phosphor-icons/react/Buildings"
import { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank"
import { CalendarPlusIcon } from "@phosphor-icons/react/CalendarPlus"
import { CameraIcon } from "@phosphor-icons/react/Camera"
import { CarIcon } from "@phosphor-icons/react/Car"
import { CaretDoubleLeftIcon } from "@phosphor-icons/react/CaretDoubleLeft"
import { CaretDoubleRightIcon } from "@phosphor-icons/react/CaretDoubleRight"
import { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
import { CaretLeftIcon } from "@phosphor-icons/react/CaretLeft"
import { CaretRightIcon } from "@phosphor-icons/react/CaretRight"
import { CaretUpIcon } from "@phosphor-icons/react/CaretUp"
import { ChartBarIcon } from "@phosphor-icons/react/ChartBar"
import { ChatCircleDotsIcon } from "@phosphor-icons/react/ChatCircleDots"
import { CheckCircleIcon } from "@phosphor-icons/react/CheckCircle"
import { CheckIcon } from "@phosphor-icons/react/Check"
import { CircleIcon } from "@phosphor-icons/react/Circle"
import { CirclesThreeIcon } from "@phosphor-icons/react/CirclesThree"
import { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch"
import { ClockIcon } from "@phosphor-icons/react/Clock"
import { CopyIcon } from "@phosphor-icons/react/Copy"
import { CurrencyCircleDollarIcon } from "@phosphor-icons/react/CurrencyCircleDollar"
import { DiamondsFourIcon } from "@phosphor-icons/react/DiamondsFour"
import { DotsThreeIcon } from "@phosphor-icons/react/DotsThree"
import { DotsThreeVerticalIcon } from "@phosphor-icons/react/DotsThreeVertical"
import { DownloadSimpleIcon } from "@phosphor-icons/react/DownloadSimple"
import { EnvelopeIcon } from "@phosphor-icons/react/Envelope"
import { EyeIcon } from "@phosphor-icons/react/Eye"
import { EyeSlashIcon } from "@phosphor-icons/react/EyeSlash"
import { FileIcon } from "@phosphor-icons/react/File"
import { FileTextIcon } from "@phosphor-icons/react/FileText"
import { FolderOpenIcon } from "@phosphor-icons/react/FolderOpen"
import { FunnelIcon } from "@phosphor-icons/react/Funnel"
import { GearSixIcon } from "@phosphor-icons/react/GearSix"
import { GitBranchIcon } from "@phosphor-icons/react/GitBranch"
import { GpsFixIcon } from "@phosphor-icons/react/GpsFix"
import { HeartbeatIcon } from "@phosphor-icons/react/Heartbeat"
import { HospitalIcon } from "@phosphor-icons/react/Hospital"
import { HouseIcon } from "@phosphor-icons/react/House"
import { ImageIcon } from "@phosphor-icons/react/Image"
import { InfoIcon } from "@phosphor-icons/react/Info"
import { LayoutIcon } from "@phosphor-icons/react/Layout"
import { LightbulbIcon } from "@phosphor-icons/react/Lightbulb"
import { LightningIcon } from "@phosphor-icons/react/Lightning"
import { ListChecksIcon } from "@phosphor-icons/react/ListChecks"
import { ListIcon } from "@phosphor-icons/react/List"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass"
import { MapTrifoldIcon } from "@phosphor-icons/react/MapTrifold"
import { MinusIcon } from "@phosphor-icons/react/Minus"
import { MoonIcon } from "@phosphor-icons/react/Moon"
import { NotePencilIcon } from "@phosphor-icons/react/NotePencil"
import { PaletteIcon } from "@phosphor-icons/react/Palette"
import { PenNibIcon } from "@phosphor-icons/react/PenNib"
import { PhoneIcon } from "@phosphor-icons/react/Phone"
import { PlusCircleIcon } from "@phosphor-icons/react/PlusCircle"
import { PlusIcon } from "@phosphor-icons/react/Plus"
import { PresentationChartIcon } from "@phosphor-icons/react/PresentationChart"
import { QuestionIcon } from "@phosphor-icons/react/Question"
import { RocketLaunchIcon } from "@phosphor-icons/react/RocketLaunch"
import { ShapesIcon } from "@phosphor-icons/react/Shapes"
import { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple"
import { SlidersIcon } from "@phosphor-icons/react/Sliders"
import { SortAscendingIcon } from "@phosphor-icons/react/SortAscending"
import { SortDescendingIcon } from "@phosphor-icons/react/SortDescending"
import { SparkleIcon } from "@phosphor-icons/react/Sparkle"
import { SquaresFourIcon } from "@phosphor-icons/react/SquaresFour"
import { StackIcon } from "@phosphor-icons/react/Stack"
import { SunIcon } from "@phosphor-icons/react/Sun"
import { TextBIcon } from "@phosphor-icons/react/TextB"
import { TextItalicIcon } from "@phosphor-icons/react/TextItalic"
import { UploadSimpleIcon } from "@phosphor-icons/react/UploadSimple"
import { UserIcon } from "@phosphor-icons/react/User"
import { UserListIcon } from "@phosphor-icons/react/UserList"
import { UsersIcon } from "@phosphor-icons/react/Users"
import { UsersThreeIcon } from "@phosphor-icons/react/UsersThree"
import { WalletIcon } from "@phosphor-icons/react/Wallet"
import { WarningCircleIcon } from "@phosphor-icons/react/WarningCircle"
import { WarningIcon } from "@phosphor-icons/react/Warning"
import { XCircleIcon } from "@phosphor-icons/react/XCircle"
import { XIcon } from "@phosphor-icons/react/X"
export { AirplaneIcon } from "@phosphor-icons/react/Airplane"
export { ArrowClockwiseIcon } from "@phosphor-icons/react/ArrowClockwise"
export { ArrowLeftIcon } from "@phosphor-icons/react/ArrowLeft"
export { ArrowRightIcon } from "@phosphor-icons/react/ArrowRight"
export { ArrowsInIcon } from "@phosphor-icons/react/ArrowsIn"
export { ArrowsOutIcon } from "@phosphor-icons/react/ArrowsOut"
export { ArrowUpIcon } from "@phosphor-icons/react/ArrowUp"
export { ArrowUpRightIcon } from "@phosphor-icons/react/ArrowUpRight"
export { BellIcon } from "@phosphor-icons/react/Bell"
export { BookmarkIcon } from "@phosphor-icons/react/Bookmark"
export { BriefcaseIcon } from "@phosphor-icons/react/Briefcase"
export { BuildingApartmentIcon } from "@phosphor-icons/react/BuildingApartment"
export { BuildingsIcon } from "@phosphor-icons/react/Buildings"
export { CalendarBlankIcon } from "@phosphor-icons/react/CalendarBlank"
export { CalendarPlusIcon } from "@phosphor-icons/react/CalendarPlus"
export { CameraIcon } from "@phosphor-icons/react/Camera"
export { CarIcon } from "@phosphor-icons/react/Car"
export { CaretDoubleLeftIcon } from "@phosphor-icons/react/CaretDoubleLeft"
export { CaretDoubleRightIcon } from "@phosphor-icons/react/CaretDoubleRight"
export { CaretDownIcon } from "@phosphor-icons/react/CaretDown"
export { CaretLeftIcon } from "@phosphor-icons/react/CaretLeft"
export { CaretRightIcon } from "@phosphor-icons/react/CaretRight"
export { CaretUpIcon } from "@phosphor-icons/react/CaretUp"
export { ChartBarIcon } from "@phosphor-icons/react/ChartBar"
export { ChatCircleDotsIcon } from "@phosphor-icons/react/ChatCircleDots"
export { CheckCircleIcon } from "@phosphor-icons/react/CheckCircle"
export { CheckIcon } from "@phosphor-icons/react/Check"
export { CircleIcon } from "@phosphor-icons/react/Circle"
export { CirclesThreeIcon } from "@phosphor-icons/react/CirclesThree"
export { CircleNotchIcon } from "@phosphor-icons/react/CircleNotch"
export { ClockIcon } from "@phosphor-icons/react/Clock"
export { CopyIcon } from "@phosphor-icons/react/Copy"
export { CurrencyCircleDollarIcon } from "@phosphor-icons/react/CurrencyCircleDollar"
export { DiamondsFourIcon } from "@phosphor-icons/react/DiamondsFour"
export { DotsThreeIcon } from "@phosphor-icons/react/DotsThree"
export { DotsThreeVerticalIcon } from "@phosphor-icons/react/DotsThreeVertical"
export { DownloadSimpleIcon } from "@phosphor-icons/react/DownloadSimple"
export { EnvelopeIcon } from "@phosphor-icons/react/Envelope"
export { EyeIcon } from "@phosphor-icons/react/Eye"
export { EyeSlashIcon } from "@phosphor-icons/react/EyeSlash"
export { FileIcon } from "@phosphor-icons/react/File"
export { FileTextIcon } from "@phosphor-icons/react/FileText"
export { FolderOpenIcon } from "@phosphor-icons/react/FolderOpen"
export { FunnelIcon } from "@phosphor-icons/react/Funnel"
export { GearSixIcon } from "@phosphor-icons/react/GearSix"
export { GitBranchIcon } from "@phosphor-icons/react/GitBranch"
export { GpsFixIcon } from "@phosphor-icons/react/GpsFix"
export { HeartbeatIcon } from "@phosphor-icons/react/Heartbeat"
export { HospitalIcon } from "@phosphor-icons/react/Hospital"
export { HouseIcon } from "@phosphor-icons/react/House"
export { ImageIcon } from "@phosphor-icons/react/Image"
export { InfoIcon } from "@phosphor-icons/react/Info"
export { LayoutIcon } from "@phosphor-icons/react/Layout"
export { LightbulbIcon } from "@phosphor-icons/react/Lightbulb"
export { LightningIcon } from "@phosphor-icons/react/Lightning"
export { ListChecksIcon } from "@phosphor-icons/react/ListChecks"
export { ListIcon } from "@phosphor-icons/react/List"
export { MagnifyingGlassIcon } from "@phosphor-icons/react/MagnifyingGlass"
export { MapTrifoldIcon } from "@phosphor-icons/react/MapTrifold"
export { MinusIcon } from "@phosphor-icons/react/Minus"
export { MoonIcon } from "@phosphor-icons/react/Moon"
export { NotePencilIcon } from "@phosphor-icons/react/NotePencil"
export { PaletteIcon } from "@phosphor-icons/react/Palette"
export { PenNibIcon } from "@phosphor-icons/react/PenNib"
export { PhoneIcon } from "@phosphor-icons/react/Phone"
export { PlusCircleIcon } from "@phosphor-icons/react/PlusCircle"
export { PlusIcon } from "@phosphor-icons/react/Plus"
export { PresentationChartIcon } from "@phosphor-icons/react/PresentationChart"
export { QuestionIcon } from "@phosphor-icons/react/Question"
export { RocketLaunchIcon } from "@phosphor-icons/react/RocketLaunch"
export { ShapesIcon } from "@phosphor-icons/react/Shapes"
export { SidebarSimpleIcon } from "@phosphor-icons/react/SidebarSimple"
export { SlidersIcon } from "@phosphor-icons/react/Sliders"
export { SortAscendingIcon } from "@phosphor-icons/react/SortAscending"
export { SortDescendingIcon } from "@phosphor-icons/react/SortDescending"
export { SparkleIcon } from "@phosphor-icons/react/Sparkle"
export { SquaresFourIcon } from "@phosphor-icons/react/SquaresFour"
export { StackIcon } from "@phosphor-icons/react/Stack"
export { SunIcon } from "@phosphor-icons/react/Sun"
export { TextBIcon } from "@phosphor-icons/react/TextB"
export { TextItalicIcon } from "@phosphor-icons/react/TextItalic"
export { UploadSimpleIcon } from "@phosphor-icons/react/UploadSimple"
export { UserIcon } from "@phosphor-icons/react/User"
export { UserListIcon } from "@phosphor-icons/react/UserList"
export { UsersIcon } from "@phosphor-icons/react/Users"
export { UsersThreeIcon } from "@phosphor-icons/react/UsersThree"
export { WalletIcon } from "@phosphor-icons/react/Wallet"
export { WarningCircleIcon } from "@phosphor-icons/react/WarningCircle"
export { WarningIcon } from "@phosphor-icons/react/Warning"
export { XCircleIcon } from "@phosphor-icons/react/XCircle"
export { XIcon } from "@phosphor-icons/react/X"
export { IconContext } from "@phosphor-icons/react/dist/lib/context"
const UDS_ICON_REGISTRY = {
  AirplaneIcon,
  ArrowClockwiseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsInIcon,
  ArrowsOutIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  BuildingApartmentIcon,
  BuildingsIcon,
  CalendarBlankIcon,
  CalendarPlusIcon,
  CameraIcon,
  CarIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChartBarIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleIcon,
  CirclesThreeIcon,
  CircleNotchIcon,
  ClockIcon,
  CopyIcon,
  CurrencyCircleDollarIcon,
  DiamondsFourIcon,
  DotsThreeIcon,
  DotsThreeVerticalIcon,
  DownloadSimpleIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  FileIcon,
  FileTextIcon,
  FolderOpenIcon,
  FunnelIcon,
  GearSixIcon,
  GitBranchIcon,
  GpsFixIcon,
  HeartbeatIcon,
  HospitalIcon,
  HouseIcon,
  ImageIcon,
  InfoIcon,
  LayoutIcon,
  LightbulbIcon,
  LightningIcon,
  ListChecksIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MapTrifoldIcon,
  MinusIcon,
  MoonIcon,
  NotePencilIcon,
  PaletteIcon,
  PenNibIcon,
  PhoneIcon,
  PlusCircleIcon,
  PlusIcon,
  PresentationChartIcon,
  QuestionIcon,
  RocketLaunchIcon,
  ShapesIcon,
  SidebarSimpleIcon,
  SlidersIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  SparkleIcon,
  SquaresFourIcon,
  StackIcon,
  SunIcon,
  TextBIcon,
  TextItalicIcon,
  UploadSimpleIcon,
  UserIcon,
  UserListIcon,
  UsersIcon,
  UsersThreeIcon,
  WalletIcon,
  WarningCircleIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} as const

export type IconName = keyof typeof UDS_ICON_REGISTRY

type IconGlyphRest = Omit<React.ComponentPropsWithoutRef<(typeof UDS_ICON_REGISTRY)["CircleIcon"]>, "ref">

export type IconProps = { name: IconName } & IconGlyphRest

/** Renders a design-system icon by export name (e.g. `"CircleIcon"`). */
export function Icon({ name, ...rest }: IconProps) {
  const Comp = UDS_ICON_REGISTRY[name]
  return React.createElement(Comp, rest as React.ComponentProps<typeof Comp>)
}
