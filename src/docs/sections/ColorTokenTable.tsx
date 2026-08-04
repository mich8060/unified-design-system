import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import {
  Button,
  CheckIcon,
  CopyIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from '@chghealthcare/unified-design-system'

const CHECKERBOARD_BG: CSSProperties = {
  backgroundColor: '#e4e4e7',
  backgroundImage: `linear-gradient(45deg, #d4d4d8 25%, transparent 25%),
    linear-gradient(-45deg, #d4d4d8 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #d4d4d8 75%),
    linear-gradient(-45deg, transparent 75%, #d4d4d8 75%)`,
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0',
}

export type ColorTokenRow = {
  /** CSS custom property name without `var()`, e.g. `--uds-color-accent-green-500`. */
  token: string
  step?: string | number
  label?: string
  checkerboard?: boolean
}

function formatRgbAsHex(rgb: string): string {
  const match = rgb.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/)
  if (!match) return rgb

  const r = Math.round(Number(match[1]))
  const g = Math.round(Number(match[2]))
  const b = Math.round(Number(match[3]))
  const a = match[4] != null ? Number(match[4]) : 1

  if (a === 0) return 'transparent'

  const hex = [r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')
  return `#${hex}`.toLowerCase()
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked */
    }
  }, [value])

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      onClick={copy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
    >
      {copied ? (
        <CheckIcon size={16} weight="bold" aria-hidden />
      ) : (
        <CopyIcon size={16} weight="regular" aria-hidden />
      )}
    </Button>
  )
}

function ColorSwatch({
  token,
  checkerboard,
  swatchRef,
}: {
  token: string
  checkerboard?: boolean
  swatchRef: RefObject<HTMLDivElement | null>
}) {
  if (checkerboard) {
    return (
      <div className="relative size-10 shrink-0 overflow-hidden rounded-[length:var(--uds-radius-4)] border border-neutral-200 dark:border-neutral-700">
        <div className="absolute inset-0 dark:opacity-80" style={CHECKERBOARD_BG} aria-hidden />
        <div
          ref={swatchRef}
          className="absolute inset-0 rounded-[inherit]"
          style={{ backgroundColor: `var(${token})` }}
        />
      </div>
    )
  }

  return (
    <div
      ref={swatchRef}
      className="size-10 shrink-0 rounded-[length:var(--uds-radius-4)] border border-neutral-200 shadow-sm dark:border-neutral-700"
      style={{ backgroundColor: `var(${token})` }}
    />
  )
}

function ColorTokenTableRow({ row, whiteTable }: { row: ColorTokenRow; whiteTable?: boolean }) {
  const swatchRef = useRef<HTMLDivElement>(null)
  const [hex, setHex] = useState('—')
  const tokenValue = `var(${row.token})`
  const name = row.label ?? (row.step != null ? String(row.step) : '—')
  const cell = whiteTable
    ? whiteTableCell
    : 'border-b border-neutral-200 px-3 py-2 dark:border-neutral-800'
  const codeClass = whiteTable
    ? 'min-w-0 font-mono text-xs text-neutral-600'
    : 'min-w-0 font-mono text-xs text-neutral-600 dark:text-neutral-400'

  useLayoutEffect(() => {
    const el = swatchRef.current
    if (!el) return
    setHex(formatRgbAsHex(getComputedStyle(el).backgroundColor))
  }, [row.token])

  return (
    <tr className="group">
      <td className={cell}>
        <ColorSwatch token={row.token} checkerboard={row.checkerboard} swatchRef={swatchRef} />
      </td>
      <td
        className={cn(
          cell,
          'font-medium',
          whiteTable ? 'text-neutral-900' : 'text-neutral-900 dark:text-neutral-100',
        )}
      >
        {name}
      </td>
      <td className={cell}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <code className={cn(codeClass, 'break-all')}>{tokenValue}</code>
          <CopyButton value={tokenValue} label="token" />
        </div>
      </td>
      <td className={cell}>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <code className={codeClass}>{hex}</code>
          {hex !== '—' ? <CopyButton value={hex} label="hex" /> : null}
        </div>
      </td>
    </tr>
  )
}

export type ColorTokenTableProps = {
  rows: ColorTokenRow[]
  /** Column heading for the name/step column. */
  nameHeader?: string
  className?: string
  /** Force a white table surface (colors foundation page). */
  whiteTable?: boolean
}

function ColorRampTabSwatch({ token }: { token: string }) {
  return (
    <span
      className={cn(
        'block size-8 shrink-0 rounded-full border border-neutral-200',
        'group-data-[state=active]:border-2 group-data-[state=active]:border-neutral-900',
        'dark:group-data-[state=active]:border-neutral-100',
      )}
      style={{ backgroundColor: `var(${token})` }}
      aria-hidden
    />
  )
}

export type ColorRampTab = {
  value: string
  label: string
  /** CSS custom property for the tab swatch (typically the 500 step). */
  swatchToken: string
  rows: ColorTokenRow[]
}

export type ColorRampTabsProps = {
  tabs: ColorRampTab[]
  defaultValue?: string
  /** Scroll swatches horizontally when there are many ramps (accent hues). */
  scrollableTabs?: boolean
  className?: string
  whiteTable?: boolean
}

export function ColorRampTabs({
  tabs,
  defaultValue,
  scrollableTabs = false,
  className,
  whiteTable = true,
}: ColorRampTabsProps) {
  const initial = defaultValue ?? tabs[0]?.value

  if (!tabs.length) return null

  return (
    <Tabs defaultValue={initial} className={cn('w-full min-w-0', className)}>
      <TabsList
        variant="line"
        fill={false}
        className={cn(
          'mb-4 h-auto w-fit max-w-full justify-start gap-[length:var(--uds-spacing-16)] border-0 bg-transparent p-0',
          /* Beat line-variant TabsList bottom track. */
          'group-data-[orientation=horizontal]/tabs:border-b-0',
          scrollableTabs ? 'overflow-x-auto flex-nowrap' : 'flex-wrap',
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            aria-label={tab.label}
            className={cn(
              'group h-auto w-auto shrink-0 rounded-full border-0 bg-transparent shadow-none after:hidden',
              /* Beat line-variant TabsTrigger px-6/py-3 (group-data selectors). */
              'group-data-[variant=line]/tabs-list:p-0 group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:py-0',
              'focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
              'dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950',
            )}
          >
            <ColorRampTabSwatch token={tab.swatchToken} />
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="min-w-0 outline-none">
          <ColorTokenTable rows={tab.rows} whiteTable={whiteTable} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

const whiteTableCell =
  'border-b border-neutral-200 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-200'
const whiteTableHead = cn(whiteTableCell, 'font-medium')

export function ColorTokenTable({ rows, nameHeader = 'Step', className, whiteTable }: ColorTokenTableProps) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-[length:var(--uds-radius-8)] border border-neutral-200',
        whiteTable ? 'bg-white dark:border-neutral-200' : 'dark:border-neutral-700',
        className,
      )}
    >
      <table className="w-full min-w-[min(100%,520px)] border-collapse text-left text-sm">
        <thead>
          <tr>
            <th
              className={cn(
                'w-14 border-b border-neutral-200 px-3 py-2 font-medium',
                whiteTable
                  ? whiteTableHead
                  : 'bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100',
              )}
            >
              Swatch
            </th>
            <th
              className={cn(
                'border-b border-neutral-200 px-3 py-2 font-medium',
                whiteTable
                  ? whiteTableHead
                  : 'bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100',
              )}
            >
              {nameHeader}
            </th>
            <th
              className={cn(
                'border-b border-neutral-200 px-3 py-2 font-medium',
                whiteTable
                  ? whiteTableHead
                  : 'bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100',
              )}
            >
              Token
            </th>
            <th
              className={cn(
                'border-b border-neutral-200 px-3 py-2 font-medium',
                whiteTable
                  ? whiteTableHead
                  : 'bg-neutral-50 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-100',
              )}
            >
              Hex
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <ColorTokenTableRow key={row.token} row={row} whiteTable={whiteTable} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
