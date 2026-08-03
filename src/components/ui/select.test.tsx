import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Select", () => {
  it("renders trigger with the selected value", () => {
    renderWithUds(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Apple</SelectItem>
          <SelectItem value="b">Banana</SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })
    expect(trigger).toHaveTextContent("Apple")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("opens the listbox on click", async () => {
    const user = userEvent.setup()
    renderWithUds(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Apple</SelectItem>
          <SelectItem value="b">Banana</SelectItem>
        </SelectContent>
      </Select>,
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })
    await user.click(trigger)
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true")
    })
    expect(await screen.findByRole("listbox")).toBeInTheDocument()
  })
})
