/* eslint-disable react-refresh/only-export-components -- test util, not a Fast Refresh boundary */
import * as React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

export type RenderWithUdsOptions = Omit<RenderOptions, "wrapper"> & {
  /** Wrap with MemoryRouter (Menu / AppShell navigation). Default false. */
  withRouter?: boolean
  /** Initial MemoryRouter entries when `withRouter` is true. */
  routerEntries?: string[]
  /** Override `data-brand` for this render (setup defaults to `chg`). */
  brand?: string
}

function UdsProviders({
  children,
  withRouter,
  routerEntries,
  brand,
}: {
  children: React.ReactNode
  withRouter?: boolean
  routerEntries?: string[]
  brand?: string
}) {
  React.useEffect(() => {
    if (brand) document.documentElement.dataset.brand = brand
  }, [brand])

  if (withRouter) {
    return <MemoryRouter initialEntries={routerEntries ?? ["/"]}>{children}</MemoryRouter>
  }
  return <>{children}</>
}

/** RTL render with UDS brand + optional router wrapper. */
export function renderWithUds(ui: React.ReactElement, options: RenderWithUdsOptions = {}) {
  const { withRouter, routerEntries, brand, ...renderOptions } = options
  return render(ui, {
    ...renderOptions,
    wrapper: ({ children }) => (
      <UdsProviders withRouter={withRouter} routerEntries={routerEntries} brand={brand}>
        {children}
      </UdsProviders>
    ),
  })
}
