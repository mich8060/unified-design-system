import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Header } from "@/components/ui/header"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("Header", () => {
  it("renders search field by default", () => {
    renderWithUds(<Header brand="chg" />)
    expect(screen.getByRole("search")).toBeInTheDocument()
    expect(screen.getByRole("searchbox", { name: "Search" })).toBeInTheDocument()
  })

  it("shows menu toggle and calls onMenuToggle", async () => {
    const user = userEvent.setup()
    const onMenuToggle = vi.fn()
    renderWithUds(
      <Header showMenuToggle menuExpanded onMenuToggle={onMenuToggle} brand="chg" />,
    )
    await user.click(screen.getByRole("button", { name: /collapse menu/i }))
    expect(onMenuToggle).toHaveBeenCalledOnce()
  })

  it("renders title identity when headerVariant is title", () => {
    renderWithUds(
      <Header headerVariant="title" headerTitle="Internal Tool" hideSearch brand="chg" />,
    )
    expect(screen.getByText("Internal Tool")).toBeInTheDocument()
  })
})
