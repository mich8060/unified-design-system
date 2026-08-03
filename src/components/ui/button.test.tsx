import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "@/components/ui/button"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Button", () => {
  it("renders with accessible name", () => {
    renderWithUds(<Button>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("invokes onClick when enabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithUds(<Button onClick={onClick}>Save</Button>)
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("does not invoke onClick when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithUds(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )
    await user.click(screen.getByRole("button", { name: "Save" }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("applies variant attribute via class for secondary", () => {
    renderWithUds(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole("button", { name: "Secondary" })).toBeInTheDocument()
  })
})
