import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@chg-ds/unified-design-system'
import { useDocsVersion } from '../versions/context'

export function DocsVersionSelect() {
  const { versionId, setDocsVersion, versionOptions } = useDocsVersion()

  return (
    <div className="flex min-w-0 flex-col gap-1 px-3 py-2">
      <label htmlFor="docs-site-version-select" className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
        Docs version
      </label>
      <Select value={versionId} onValueChange={setDocsVersion}>
        <SelectTrigger
          id="docs-site-version-select"
          inputSize="sm"
          className="w-full min-w-0 max-w-full shadow-none"
        >
          <SelectValue placeholder="Documentation version" />
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
