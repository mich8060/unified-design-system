import { test, expect } from "@playwright/test"

/** Narrow visual baselines on first docs example stages. */
const VISUAL_TARGETS = [
  { slug: "button", exampleId: undefined as string | undefined },
  { slug: "badge", exampleId: undefined },
  { slug: "status", exampleId: undefined },
  { slug: "avatar", exampleId: undefined },
] as const

test.describe("docs visual baselines", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
  })

  for (const target of VISUAL_TARGETS) {
    test(`${target.slug} first example`, async ({ page }) => {
      await page.goto(`/docs/components/${target.slug}`, { waitUntil: "networkidle" })
      await page.waitForFunction(() => document.fonts.ready)

      const stage = target.exampleId
        ? page.locator(`[data-docs-example="${target.exampleId}"]`)
        : page.locator("[data-docs-example]").first()

      await expect(stage).toBeVisible()
      await expect(stage).toHaveScreenshot(`${target.slug}-first-example.png`)
    })
  }
})
