import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Status } from "@/components/ui/status"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Status", () => {
  it("renders with outlined appearance by default", () => {
    renderWithUds(<Status>Active</Status>)
    const status = screen.getByText("Active")
    expect(status).toHaveAttribute("data-slot", "status")
    expect(status).toHaveAttribute("data-appearance", "outlined")
  })

  it("supports compact size", () => {
    renderWithUds(
      <Status size="compact" variant="success">
        Done
      </Status>,
    )
    expect(screen.getByText("Done")).toHaveAttribute("data-size", "compact")
  })
})
