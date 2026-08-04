import { screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Branding } from "@/components/ui/branding"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Branding", () => {
  it("renders wordmark with accessible label", async () => {
    renderWithUds(<Branding appearance="CHG" />)
    const mark = screen.getByRole("img", { name: /CHG logo/i })
    expect(mark).toHaveAttribute("data-slot", "branding")
    await waitFor(() => {
      expect(mark.querySelector("img")).toBeTruthy()
    })
  })

  it("renders symbol mark variant", () => {
    renderWithUds(<Branding appearance="CHG" symbol />)
    expect(screen.getByRole("img", { name: /CHG mark/i })).toHaveAttribute("data-symbol", "true")
  })
})
