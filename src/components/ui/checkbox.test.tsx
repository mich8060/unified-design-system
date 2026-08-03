import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Checkbox } from "@/components/ui/checkbox"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Checkbox", () => {
  it("toggles checked state", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    renderWithUds(<Checkbox aria-label="Accept" onCheckedChange={onCheckedChange} />)
    const box = screen.getByRole("checkbox", { name: "Accept" })
    expect(box).not.toBeChecked()
    await user.click(box)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    renderWithUds(<Checkbox aria-label="Accept" disabled onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole("checkbox", { name: "Accept" }))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})
