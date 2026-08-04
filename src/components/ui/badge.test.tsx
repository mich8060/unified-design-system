import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Badge } from "@/components/ui/badge"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Badge", () => {
  it("renders label text", () => {
    renderWithUds(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
    expect(screen.getByText("New")).toHaveAttribute("data-slot", "badge")
  })

  it("supports outlined appearance with accent", () => {
    renderWithUds(
      <Badge accent="green" appearance="outlined">
        Draft
      </Badge>,
    )
    expect(screen.getByText("Draft")).toHaveAttribute("data-appearance", "outlined")
    expect(screen.getByText("Draft")).toHaveAttribute("data-accent", "green")
  })
})

