import { HouseIcon } from "@phosphor-icons/react/House"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Menu } from "@/components/ui/menu"
import { renderWithUds } from "@/test/helpers/render-with-uds"

const nav = [
  { id: "home", label: "Home", icon: HouseIcon },
  { id: "settings", label: "Settings", icon: HouseIcon },
]

describe("Menu", () => {
  it("renders navigation items", () => {
    renderWithUds(
      <Menu navigationItems={nav} activeId="home" brand="chg" />,
      { withRouter: true },
    )
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument()
  })

  it("notifies onNavigationSelect", async () => {
    const user = userEvent.setup()
    const onNavigationSelect = vi.fn()
    renderWithUds(
      <Menu
        navigationItems={nav}
        activeId="home"
        brand="chg"
        onNavigationSelect={onNavigationSelect}
      />,
      { withRouter: true },
    )
    await user.click(screen.getByRole("button", { name: "Settings" }))
    expect(onNavigationSelect).toHaveBeenCalled()
    expect(onNavigationSelect.mock.calls[0]?.[0]).toBe("settings")
  })
})
