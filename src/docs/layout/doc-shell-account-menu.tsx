import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  MoonIcon,
  SunIcon,
} from '@chghealthcare/unified-design-system'

export function AccountMenuPanel({
  light,
  onAppearanceChange,
  showAppearance = true,
}: {
  light: boolean
  onAppearanceChange: (mode: 'light' | 'dark') => void
  /** When false, hides theme controls (e.g. AppShell demo where DocShell owns document theme). */
  showAppearance?: boolean
}) {
  return (
    <>
      <DropdownMenuLabel>
        <span className="block truncate text-uds-14 font-uds-regular leading-uds-14 text-foreground">
          Emily Brown
        </span>
        <span className="block truncate text-uds-12 font-uds-regular leading-uds-12 text-muted-foreground">
          emily.brown@example.com
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {showAppearance ? (
        <>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={light ? 'light' : 'dark'}
            onValueChange={(v: string) => onAppearanceChange(v as 'light' | 'dark')}
          >
            <DropdownMenuRadioItem value="light">
              <SunIcon className="size-4" aria-hidden />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon className="size-4" aria-hidden />
              Dark
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
        </>
      ) : null}
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
    </>
  )
}
