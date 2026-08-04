import { test, expect } from "@playwright/test"

import { SHADCN_UI_SLUGS } from "../../src/docs/shadcn-ui-registry"

/**
 * Smoke every documented component route. Section slugs may redirect
 * (`/docs/components/header` → `/docs/sections/header`); follow redirects.
 */
test.describe("docs component routes", () => {
  for (const slug of SHADCN_UI_SLUGS) {
    test(`loads /docs/components/${slug}`, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (err) => {
        errors.push(err.message)
      })

      const response = await page.goto(`/docs/components/${slug}`, {
        waitUntil: "domcontentloaded",
      })
      expect(response, `no response for ${slug}`).toBeTruthy()
      expect(response!.ok() || response!.status() === 304, `HTTP ${response!.status()} for ${slug}`).toBeTruthy()

      await expect(page.locator("body")).toBeVisible()
      expect(errors, `page errors on ${slug}:\n${errors.join("\n")}`).toEqual([])
    })
  }
})
