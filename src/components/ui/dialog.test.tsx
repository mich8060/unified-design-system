import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-uds"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Dialog", () => {
  it("opens from trigger and exposes dialog role", async () => {
    const user = userEvent.setup()
    renderWithUds(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
            <DialogDescription>More information</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Open dialog" }))
    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByRole("heading", { name: "Details" })).toBeInTheDocument()
  })
})
