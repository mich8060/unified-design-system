import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet-uds"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Sheet", () => {
  it("opens a right-side panel from trigger", async () => {
    const user = userEvent.setup()
    renderWithUds(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Inspect</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Inspector</SheetTitle>
          </SheetHeader>
          <SheetBody>Panel body</SheetBody>
        </SheetContent>
      </Sheet>,
    )

    await user.click(screen.getByRole("button", { name: "Inspect" }))
    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByRole("heading", { name: "Inspector" })).toBeInTheDocument()
    expect(within(dialog).getByText("Panel body")).toBeInTheDocument()
  })
})
