import {
  CaretDownIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
  useMenuRail,
} from '@chghealthcare/unified-design-system'
import { shouldShowDocsVersionSelector } from '../doc-site-version'
import { useDocsVersion } from '../versions/context'

export function DocsVersionSelect() {
  const { expanded } = useMenuRail()
  const { versionId, setDocsVersion, versionOptions } = useDocsVersion()

  if (!shouldShowDocsVersionSelector()) {
    return null
  }
  const activeOption = versionOptions.find((o) => o.id === versionId)
  const activeLabel = activeOption?.label ?? versionId

  if (!expanded) {

    return (
      <div className="flex shrink-0 flex-col items-center border-b border-solid border-neutral-200 py-2 dark:border-neutral-800">
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Documentation version"
                  className={cn(
                    'flex size-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[4px] transition-colors',
                    'text-[var(--uds-text-primary)] hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    'outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                    'dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950',
                  )}
                >
                  <CaretDownIcon size={20} weight="bold" aria-hidden />
                  <span className="max-w-[52px] truncate text-[9px] font-medium leading-none">{activeLabel}</span>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Documentation version
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent side="right" align="start" sideOffset={8} className="min-w-48">
            <DropdownMenuRadioGroup value={versionId} onValueChange={setDocsVersion}>
              {versionOptions.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="shrink-0 border-b border-solid border-neutral-200 p-2 dark:border-neutral-800">
      <Select key={versionId} value={versionId} onValueChange={setDocsVersion}>
        <SelectTrigger
          inputSize="sm"
          aria-label="Documentation version"
          className="w-full min-w-0 max-w-full shadow-none"
        >
          <SelectValue placeholder="Documentation version">{activeLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">
          {versionOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
