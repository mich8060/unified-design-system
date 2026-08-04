import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Field + Input", () => {
  it("associates label text with the field group", () => {
    renderWithUds(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input aria-label="Email" defaultValue="" />
      </Field>,
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-slot", "field")
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument()
  })

  it("accepts typed input", async () => {
    const user = userEvent.setup()
    renderWithUds(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input aria-label="Name" />
      </Field>,
    )
    const input = screen.getByRole("textbox", { name: "Name" })
    await user.type(input, "Ada")
    expect(input).toHaveValue("Ada")
  })

  it("marks invalid fields", () => {
    renderWithUds(
      <Field data-invalid="true">
        <FieldLabel>Email</FieldLabel>
        <Input aria-label="Email" aria-invalid />
      </Field>,
    )
    expect(screen.getByRole("group")).toHaveAttribute("data-invalid", "true")
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true")
  })
})
