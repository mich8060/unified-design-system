import * as React from "react"

import { cn } from "@/lib/utils"

import connectMark from "../../../public/branding/svg/connect-brand-mark.svg?url"
import connectWordmark from "../../../public/branding/svg/connect-wordmark.svg?url"
import comphealthMark from "../../../public/branding/svg/comphealth-brand-mark.svg?url"
import comphealthWordmark from "../../../public/branding/svg/comphealth-wordmark.svg?url"
import locumsmartMark from "../../../public/branding/svg/locumsmart-brand-mark.svg?url"
import locumsmartWordmark from "../../../public/branding/svg/locumsmart-wordmark.svg?url"
import modioMark from "../../../public/branding/svg/modio-brand-mark.svg?url"
import modioWordmark from "../../../public/branding/svg/modio-wordmark.svg?url"
import unifiedDesignSystemMark from "../../../public/branding/svg/unified-design-system-brand-mark.svg?url"
import unifiedDesignSystemWordmark from "../../../public/branding/svg/unified-design-system-wordmark.svg?url"
import weatherbyMark from "../../../public/branding/svg/weatherby-brand-mark.svg?url"
import weatherbyWordmark from "../../../public/branding/svg/weatherby-wordmark.svg?url"
import wireframeMark from "../../../public/branding/svg/wireframe-brand-mark.svg?url"
import wireframeWordmark from "../../../public/branding/svg/wireframe-wordmark.svg?url"

export type BrandingAppearance =
  | "Connect"
  | "CHG"
  | "Locumsmart"
  | "Wireframe"
  | "MyWeatherby"
  | "MyCompHealth"
  | "Modio"
  | "Design System"

const SVG_ASSETS: Record<BrandingAppearance, { mark: string; wordmark: string }> =
  {
  Wireframe: {
    mark: wireframeMark,
    wordmark: wireframeWordmark,
  },
  Connect: {
    mark: connectMark,
    wordmark: connectWordmark,
  },
  CHG: {
    mark: wireframeMark,
    wordmark: wireframeWordmark,
  },
  Locumsmart: {
    mark: locumsmartMark,
    wordmark: locumsmartWordmark,
  },
  Modio: {
    mark: modioMark,
    wordmark: modioWordmark,
  },
  MyWeatherby: {
    mark: weatherbyMark,
    wordmark: weatherbyWordmark,
  },
  MyCompHealth: {
    mark: comphealthMark,
    wordmark: comphealthWordmark,
  },
  "Design System": {
    mark: unifiedDesignSystemMark,
    wordmark: unifiedDesignSystemWordmark,
  },
}

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
  const label =
    appearance === "Design System"
      ? symbol
        ? "UNIFIED DS mark"
        : "UNIFIED DS logo"
      : `${appearance}${symbol ? " mark" : " logo"}`

  const src = symbol ? SVG_ASSETS[appearance].mark : SVG_ASSETS[appearance].wordmark

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
    </div>
  )
}

export { Branding }
