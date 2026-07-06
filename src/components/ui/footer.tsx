import * as React from "react"

import { cn } from "@/lib/utils"

export type FooterLink = {
  label: string
  href: string
}

export type FooterProps = React.ComponentProps<"footer"> & {
  /** Copyright text displayed on the left. */
  copyright?: string
  /** Navigation links displayed in the Content slot on the right (Links=On). */
  links?: FooterLink[]
  /** Custom Content slot — replaces the default link nav when `links` is provided. */
  children?: React.ReactNode
}

function Footer({
  className,
  children,
  copyright = `\u00A9 ${new Date().getFullYear()} CHG Management, Inc. All rights reserved.`,
  links,
  ...props
}: FooterProps) {
  const showLinks = links != null && links.length > 0

  return (
    <footer
      data-slot="uds-footer"
      className={cn(
        "flex h-10 shrink-0 items-center gap-[length:var(--uds-gap-12)] border-t border-[var(--uds-border-primary)] bg-[var(--uds-surface-primary)] px-[length:var(--uds-gap-16)] py-[length:var(--uds-gap-8)] text-xs text-[var(--uds-text-tertiary)]",
        className,
      )}
      {...props}
    >
      {showLinks ? (
        <>
          <span className="min-w-0 flex-1">{copyright}</span>
          {children ?? (
            <nav
              aria-label="Footer links"
              className="flex shrink-0 items-center gap-[length:var(--uds-gap-16)]"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[var(--uds-text-primary)] hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </>
      ) : (
        <span>{copyright}</span>
      )}
    </footer>
  )
}

export { Footer }
