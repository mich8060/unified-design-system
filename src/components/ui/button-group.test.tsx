import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("ButtonGroup", () => {
  it("renders grouped buttons", () => {
    renderWithUds(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole("button", { name: "One" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Two" })).toBeInTheDocument()
  })
})
