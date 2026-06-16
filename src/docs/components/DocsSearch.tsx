import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SearchInputProps } from '@chghealthcare/unified-design-system'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  buildDocsSearchIndex,
  docsSearchResultValue,
  groupDocsSearchResults,
} from '../search-index'
import { useDocsVersionBundle } from '../versions/context'

export function useDocsHeaderSearch(): {
  headerSearchProps: SearchInputProps
  searchDialog: ReactNode
} {
  const navigate = useNavigate()
  const bundle = useDocsVersionBundle()
  const [open, setOpen] = useState(false)

  const searchIndex = useMemo(
    () => buildDocsSearchIndex(bundle.navigation, bundle.catalog, bundle.getAllShadcnUiComponents()),
    [bundle],
  )

  const groupedResults = useMemo(() => groupDocsSearchResults(searchIndex), [searchIndex])

  const openSearch = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const headerSearchProps = useMemo<SearchInputProps>(
    () => ({
      readOnly: true,
      placeholder: 'Search documentation…',
      'aria-label': 'Search documentation',
      'aria-haspopup': 'dialog',
      'aria-expanded': open,
      onFocus: (event) => {
        event.currentTarget.blur()
        openSearch()
      },
      onClick: openSearch,
      onKeyDown: (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openSearch()
        }
      },
      submitButtonType: 'button',
      submitButtonAriaLabel: 'Open search',
      onSubmitButtonClick: openSearch,
    }),
    [open, openSearch],
  )

  const searchDialog = (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search documentation"
      description="Find pages in the design system documentation"
      className="top-[12%] w-[calc(100%-2rem)] max-w-3xl sm:max-w-3xl"
    >
      <Command className="rounded-none border-0 shadow-none">
        <CommandInput placeholder="Search documentation…" />
        <CommandList className="max-h-[min(32rem,60vh)]">
          <CommandEmpty>No pages found.</CommandEmpty>
          {groupedResults.map(({ group, items }) => (
            <CommandGroup key={group} heading={group}>
              {items.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={docsSearchResultValue(entry)}
                  onSelect={() => {
                    navigate(entry.route)
                    setOpen(false)
                  }}
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate font-medium">{entry.label}</span>
                    {entry.description ? (
                      <span className="truncate text-xs text-muted-foreground">{entry.description}</span>
                    ) : null}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )

  return { headerSearchProps, searchDialog }
}
