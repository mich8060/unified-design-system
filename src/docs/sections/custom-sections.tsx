import { Icon } from '@chghealthcare/unified-design-system'
import type { DocSection } from '../types'
import { getBrandNavigationMenusSections } from './BrandNavigationMenusFoundation'
import { getColorsFoundationSections } from './ColorsFoundation'
import { getTypographyFoundationSections } from './TypographyFoundation'

export function getCustomSections(slug: string): DocSection[] | undefined {
  switch (slug) {
    case 'brand-navigation-menus':
      return getBrandNavigationMenusSections()
    case 'colors':
      return getColorsFoundationSections()
    case 'display':
      return [
        sec(
          'display',
          'Core display modes',
          `<div className="flex flex-wrap gap-2">
  <div className="rounded border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900">block (stack)</div>
  <div className="inline-flex rounded border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-600">inline-flex</div>
  <div className="hidden">hidden</div>
</div>`,
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-neutral-600 dark:bg-neutral-900">
              default block
            </div>
            <div className="inline-flex rounded border border-dashed border-neutral-400 px-3 py-2 text-sm dark:border-neutral-500">
              inline-flex chip
            </div>
          </div>,
        ),
        sec(
          'stacking',
          'Relative parent, absolute child',
          `<div className="relative h-24 rounded-lg bg-neutral-200 dark:bg-neutral-800">
  <div className="absolute bottom-2 right-2 rounded bg-neutral-900 px-2 py-1 text-xs text-white dark:bg-neutral-100 dark:text-neutral-900">
    absolute
  </div>
</div>`,
          <div className="relative h-24 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            <div className="absolute bottom-2 right-2 rounded bg-neutral-900 px-2 py-1 text-xs text-white dark:bg-neutral-100 dark:text-neutral-900">
              absolute
            </div>
          </div>,
        ),
      ]
    case 'flexbox':
      return [
        sec(
          'row',
          'Flex row with justify-between and gap',
          `<div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
  <span className="text-sm font-medium">Title</span>
  <button type="button" className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900">Action</button>
</div>`,
          <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <span className="text-sm font-medium">Title</span>
            <button
              type="button"
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Action
            </button>
          </div>,
        ),
      ]
    case 'grid':
      return [
        sec(
          'responsive-grid',
          'Responsive grid columns',
          `<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
  <div className="h-16 rounded bg-neutral-200 dark:bg-neutral-800" />
  <div className="h-16 rounded bg-neutral-300 dark:bg-neutral-700" />
  <div className="col-span-2 h-16 rounded bg-neutral-200 sm:col-span-1 dark:bg-neutral-800" />
</div>`,
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="h-16 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-16 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="col-span-2 h-16 rounded bg-neutral-200 sm:col-span-1 dark:bg-neutral-800" />
          </div>,
        ),
      ]
    case 'spacing':
      return [
        sec(
          'padding-margin',
          'Spacing scale',
          `<div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
  <div className="mt-4 rounded bg-neutral-100 p-4 dark:bg-neutral-800">Inner pad + margin-top</div>
</div>`,
          <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div className="mt-4 rounded bg-neutral-100 p-4 dark:bg-neutral-800">Inner pad + margin-top</div>
          </div>,
        ),
      ]
    case 'sizing':
      return [
        sec(
          'width-height',
          'Fractional width and max-width',
          `<div className="w-full max-w-md rounded border border-neutral-200 p-4 dark:border-neutral-700">
  <div className="h-2 w-3/4 rounded-full bg-neutral-900 dark:bg-neutral-100" />
</div>`,
          <div className="w-full max-w-md rounded border border-neutral-200 p-4 dark:border-neutral-700">
            <div className="h-2 w-3/4 rounded-full bg-neutral-900 dark:bg-neutral-100" />
          </div>,
        ),
      ]
    case 'typography':
      return getTypographyFoundationSections()
    case 'surfaces':
      return [
        sec(
          'uds-surfaces',
          'UDS surface & text tokens',
          `<div className="space-y-4">
  <div className="grid gap-3 sm:grid-cols-2">
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-primary p-4">
      <p className="text-sm font-medium text-uds-text-primary">Primary</p>
      <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-primary</p>
    </div>
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-secondary p-4">
      <p className="text-sm font-medium text-uds-text-primary">Secondary</p>
      <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-secondary</p>
    </div>
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-tertiary p-4">
      <p className="text-sm font-medium text-uds-text-primary">Tertiary</p>
      <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-tertiary</p>
    </div>
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-quaternary p-4">
      <p className="text-sm font-medium text-uds-text-primary">Quaternary</p>
      <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-quaternary</p>
    </div>
  </div>
  <div className="grid gap-3 sm:grid-cols-2">
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-brand-primary p-4">
      <p className="text-sm font-medium text-uds-text-primary">Brand primary</p>
      <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-brand-primary</p>
    </div>
    <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-inverse p-4">
      <p className="text-sm font-medium text-uds-text-inverse">Inverse</p>
      <p className="mt-1 text-xs text-uds-text-tertiary">--uds-surface-inverse + --uds-text-inverse</p>
    </div>
  </div>
</div>`,
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-primary p-4">
                <p className="text-sm font-medium text-uds-text-primary">Primary</p>
                <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-primary</p>
              </div>
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-secondary p-4">
                <p className="text-sm font-medium text-uds-text-primary">Secondary</p>
                <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-secondary</p>
              </div>
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-tertiary p-4">
                <p className="text-sm font-medium text-uds-text-primary">Tertiary</p>
                <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-tertiary</p>
              </div>
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-quaternary p-4">
                <p className="text-sm font-medium text-uds-text-primary">Quaternary</p>
                <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-quaternary</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-brand-primary p-4">
                <p className="text-sm font-medium text-uds-text-primary">Brand primary</p>
                <p className="mt-1 text-xs text-uds-text-secondary">--uds-surface-brand-primary</p>
              </div>
              <div className="rounded-[var(--uds-radius-12)] border border-uds-border-primary bg-uds-surface-inverse p-4">
                <p className="text-sm font-medium text-uds-text-inverse">Inverse</p>
                <p className="mt-1 text-xs text-uds-text-tertiary">--uds-surface-inverse + --uds-text-inverse</p>
              </div>
            </div>
          </div>,
        ),
      ]
    case 'borders':
      return [
        sec(
          'radius',
          'Border and radius',
          `<div className="rounded-xl border-2 border-dashed border-neutral-400 p-4 dark:border-neutral-500">
  Dashed border
</div>`,
          <div className="rounded-xl border-2 border-dashed border-neutral-400 p-4 dark:border-neutral-500">
            Dashed border
          </div>,
        ),
      ]
    case 'effects':
      return [
        sec(
          'shadow-ring',
          'Shadow and ring',
          `<button type="button" className="rounded-lg bg-white px-4 py-2 shadow-md ring-2 ring-neutral-900/10 ring-offset-2 dark:bg-neutral-900 dark:ring-white/20">
  Focus ring
</button>`,
          <button
            type="button"
            className="rounded-lg bg-white px-4 py-2 shadow-md ring-2 ring-neutral-900/10 ring-offset-2 dark:bg-neutral-900 dark:ring-white/20"
          >
            Focus ring
          </button>,
        ),
      ]
    case 'filters':
      return [
        sec(
          'blur',
          'Backdrop blur card',
          `<div className="rounded-xl bg-white/70 p-6 shadow-xl backdrop-blur-md dark:bg-neutral-950/70">
  Frosted surface
</div>`,
          <div className="rounded-xl bg-white/70 p-6 shadow-xl backdrop-blur-md dark:bg-neutral-950/70">
            Frosted surface
          </div>,
        ),
      ]
    case 'transforms':
      return [
        sec(
          'rotate-scale',
          'Transform utilities',
          `<div className="inline-block rotate-3 scale-95 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg transition hover:rotate-0 hover:scale-100 dark:border-neutral-700 dark:bg-neutral-900">
  Hover to reset
</div>`,
          <div className="inline-block rotate-3 scale-95 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg transition hover:rotate-0 hover:scale-100 dark:border-neutral-700 dark:bg-neutral-900">
            Hover to reset
          </div>,
        ),
      ]
    case 'transitions-animation':
      return [
        sec(
          'transition',
          'Duration and easing',
          `<div className="h-12 w-12 rounded-full bg-violet-500 transition-all duration-500 ease-out hover:translate-x-4 hover:bg-fuchsia-500" />`,
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-violet-500 transition-all duration-500 ease-out hover:translate-x-4 hover:bg-fuchsia-500" />
            <span className="text-xs text-neutral-500">Hover the dot</span>
          </div>,
        ),
      ]
    case 'interactivity':
      return [
        sec(
          'cursor',
          'Cursor and select',
          `<div className="cursor-progress select-none rounded border border-neutral-200 p-3 text-sm dark:border-neutral-700">
  Progress cursor · text not selectable
</div>`,
          <div className="cursor-progress select-none rounded border border-neutral-200 p-3 text-sm dark:border-neutral-700">
            Progress cursor · text not selectable
          </div>,
        ),
      ]
    case 'tables':
      return [
        sec(
          'table',
          'Semantic table',
          `<table className="w-full table-auto border-collapse text-left text-sm">
  <thead><tr className="border-b border-neutral-200 dark:border-neutral-700"><th className="p-2">Col A</th><th className="p-2">Col B</th></tr></thead>
  <tbody><tr className="border-b border-neutral-100 dark:border-neutral-800"><td className="p-2">a1</td><td className="p-2">b1</td></tr></tbody>
</table>`,
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="p-2">Col A</th>
                <th className="p-2">Col B</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100 dark:border-neutral-800">
                <td className="p-2">a1</td>
                <td className="p-2">b1</td>
              </tr>
            </tbody>
          </table>,
        ),
      ]
    case 'iconography':
      return [
        sec(
          'phosphor-examples',
          'Phosphor icons via `Icon`',
          `import { Icon } from "@chghealthcare/unified-design-system"

// Decorative: pair with text or aria-label on controls
<Icon name="HouseIcon" className="size-6 text-neutral-700 dark:text-neutral-200" aria-hidden />
<Icon name="MagnifyingGlassIcon" className="size-6 text-neutral-700 dark:text-neutral-200" aria-hidden />
<Icon name="BellIcon" className="size-6 text-neutral-700 dark:text-neutral-200" aria-hidden />
// …additional names come from UDS_ICON_REGISTRY (Phosphor \`@phosphor-icons/react\`)`,
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Stroke / fill color
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Icon name="CircleIcon" className="size-8 text-violet-600 dark:text-violet-400" aria-hidden />
                <Icon name="MagnifyingGlassIcon" className="size-8 text-emerald-600 dark:text-emerald-400" aria-hidden />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Example glyphs (registered set)
              </p>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                {(
                  [
                    ['HouseIcon', 'House'],
                    ['MagnifyingGlassIcon', 'Search'],
                    ['BellIcon', 'Bell'],
                    ['CalendarBlankIcon', 'Calendar'],
                    ['UserIcon', 'User'],
                    ['UsersThreeIcon', 'Users'],
                    ['GearSixIcon', 'Settings'],
                    ['EnvelopeIcon', 'Mail'],
                    ['CheckCircleIcon', 'Success'],
                    ['WarningCircleIcon', 'Warning'],
                    ['AirplaneIcon', 'Travel'],
                    ['CameraIcon', 'Camera'],
                    ['ChartBarIcon', 'Charts'],
                    ['WalletIcon', 'Wallet'],
                    ['SparkleIcon', 'Sparkle'],
                    ['ChatCircleDotsIcon', 'Chat'],
                    ['PhoneIcon', 'Phone'],
                    ['FileTextIcon', 'Document'],
                    ['FolderOpenIcon', 'Folder'],
                    ['LayoutIcon', 'Layout'],
                  ] as const
                ).map(([name, label]) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-3 dark:border-neutral-700 dark:bg-neutral-900/50"
                    title={name}
                  >
                    <Icon name={name} className="size-6 text-neutral-800 dark:text-neutral-100" aria-hidden />
                    <span className="text-center text-[10px] leading-tight text-neutral-500 dark:text-neutral-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          'Icons are Phosphor React components re-exported through `UDS_ICON_REGISTRY` in `src/components/ui/uds-icons.tsx`. Add a new import from `@phosphor-icons/react`, register it there, and use `<Icon name="…Icon" />` so apps never import the vendor package directly.',
        ),
      ]
    case 'accessibility':
      return [
        sec(
          'sr-only',
          'Screen reader text',
          `<button type="button" className="rounded bg-neutral-900 px-3 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900">
  Save
  <span className="sr-only">and publish changes</span>
</button>`,
          <button
            type="button"
            className="rounded bg-neutral-900 px-3 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Save
            <span className="sr-only">and publish changes</span>
          </button>,
        ),
      ]
    default:
      return undefined
  }
}

function sec(
  id: string,
  title: string,
  code: string,
  preview: DocSection['preview'],
  description?: string,
): DocSection {
  return { id, title, code, preview, description }
}
