import "@testing-library/jest-dom/vitest"

import { afterEach, beforeEach } from "vitest"
import { cleanup } from "@testing-library/react"

import "@/styles.css"

function installDomPolyfills() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => {
      // Treat unit tests as desktop AppShell viewport (lg+).
      const desktop = query.includes("min-width: 1024px")
      const mobileMax = /max-width:\s*767px/.test(query)
      return {
        matches: desktop ? true : mobileMax ? false : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }
    },
  })

  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 1280,
  })

  // Radix Select / PointerEvent APIs missing in jsdom
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {}
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {}
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {}
  }
}

installDomPolyfills()

beforeEach(() => {
  document.documentElement.dataset.brand = "chg"
})

afterEach(() => {
  cleanup()
})
