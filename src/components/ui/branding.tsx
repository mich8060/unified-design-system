"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type BrandingAppearance =
  | "Connect"
  | "CHG"
  | "Locumsmart"
  | "Wireframe"
  | "MyWeatherby"
  | "MyCompHealth"
  | "Modio"
  | "Design System"

type SvgLoader = () => Promise<string>

const SVG_LOADERS: Record<BrandingAppearance, { mark: SvgLoader; wordmark: SvgLoader }> = {
  Wireframe: {
    mark: () => import("../../../public/branding/svg/wireframe-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/wireframe-wordmark.svg?url").then(m => m.default),
  },
  Connect: {
    mark: () => import("../../../public/branding/svg/connect-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/connect-wordmark.svg?url").then(m => m.default),
  },
  CHG: {
    mark: () => import("../../../public/branding/svg/unified-design-system-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/unified-design-system-wordmark.svg?url").then(m => m.default),
  },
  Locumsmart: {
    mark: () => import("../../../public/branding/svg/locumsmart-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/locumsmart-wordmark.svg?url").then(m => m.default),
  },
  Modio: {
    mark: () => import("../../../public/branding/svg/modio-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/modio-wordmark.svg?url").then(m => m.default),
  },
  MyWeatherby: {
    mark: () => import("../../../public/branding/svg/weatherby-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/weatherby-wordmark.svg?url").then(m => m.default),
  },
  MyCompHealth: {
    mark: () => import("../../../public/branding/svg/comphealth-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/comphealth-wordmark.svg?url").then(m => m.default),
  },
  "Design System": {
    mark: () => import("../../../public/branding/svg/unified-design-system-brand-mark.svg?url").then(m => m.default),
    wordmark: () => import("../../../public/branding/svg/unified-design-system-wordmark.svg?url").then(m => m.default),
  },
}

// Module-level cache so each brand/variant pair loads at most once.
const urlCache = new Map<string, string>()

export type BrandingProps = React.ComponentProps<"div"> & {
  /** Product / brand row from the design system. */
  appearance?: BrandingAppearance
  /** When true, render the square mark only (64×64). Otherwise full wordmark (200×80). */
  symbol?: boolean
  /** Wordmark only: how artwork sits in the frame (`start` matches typical left-aligned lockups). */
  wordmarkAlign?: "start" | "center"
}

function Branding({
  className,
  appearance = "Wireframe",
  symbol = false,
  wordmarkAlign = "start",
  ...props
}: BrandingProps) {
  const variant = symbol ? "mark" : "wordmark"
  const cacheKey = `${appearance}:${variant}`

  const [src, setSrc] = React.useState<string>(() => urlCache.get(cacheKey) ?? "")

  React.useEffect(() => {
    if (urlCache.has(cacheKey)) {
      setSrc(urlCache.get(cacheKey)!)
      return
    }
    let active = true
    SVG_LOADERS[appearance]?.[variant]?.().then(url => {
      urlCache.set(cacheKey, url)
      if (active) setSrc(url)
    })
    return () => { active = false }
  }, [cacheKey, appearance, variant])

  const label =
    appearance === "Design System"
      ? symbol ? "UNIFIED DS mark" : "UNIFIED DS logo"
      : `${appearance}${symbol ? " mark" : " logo"}`

  return (
    <div
      data-slot="branding"
      data-appearance={appearance}
      data-symbol={symbol ? "true" : "false"}
      role="img"
      aria-label={label}
      className={cn(
        "relative flex overflow-hidden",
        symbol
          ? "size-16 shrink-0 items-center justify-center"
          : wordmarkAlign === "center"
            ? "h-20 w-[200px] shrink-0 items-center justify-center"
            : "h-20 w-[200px] shrink-0 items-center justify-start",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          alt=""
          src={src}
          draggable={false}
          className={cn(
            "h-full w-full object-contain",
            symbol || wordmarkAlign === "center" ? "object-center" : "object-left",
            "dark:brightness-0 dark:invert"
          )}
        />
      ) : null}
    </div>
  )
}

export { Branding }
