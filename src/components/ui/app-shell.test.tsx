import { HouseIcon } from "@phosphor-icons/react/House"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { AppShell } from "@/components/ui/app-shell"
import { Menu } from "@/components/ui/menu"
import { renderWithUds } from "@/test/helpers/render-with-uds"

describe("AppShell", () => {
  it("renders chrome, menu, and main regions", () => {
    renderWithUds(
      <AppShell enableRouterOutlet={false} brand="chg">
        <AppShell.Menu>
          <Menu
            navigationItems={[{ id: "home", label: "Home", icon: HouseIcon }]}
            activeId="home"
          />
        </AppShell.Menu>
        <AppShell.Main>
          <p>Page content</p>
        </AppShell.Main>
      </AppShell>,
      { withRouter: true },
    )

    expect(document.querySelector('[data-slot="appshell-chrome"]')).toBeTruthy()
    expect(document.querySelector('[data-slot="uds-menu-root"]')).toBeTruthy()
    expect(screen.getByRole("main")).toHaveTextContent("Page content")
    expect(screen.getByRole("search")).toBeInTheDocument()
  })

  it("toggles menu expanded state from header control", async () => {
    const user = userEvent.setup()
    renderWithUds(
      <AppShell enableRouterOutlet={false} brand="chg" defaultMenuExpanded>
        <AppShell.Menu>
          <Menu
            navigationItems={[{ id: "home", label: "Home", icon: HouseIcon }]}
            activeId="home"
          />
        </AppShell.Menu>
        <AppShell.Main>Body</AppShell.Main>
      </AppShell>,
      { withRouter: true },
    )

    const menu = document.querySelector('[data-slot="uds-menu-root"]')
    expect(menu).toHaveAttribute("data-expanded", "true")
    await user.click(screen.getByRole("button", { name: /collapse menu/i }))
    expect(menu).toHaveAttribute("data-expanded", "false")
  })
})
