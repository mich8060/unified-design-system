import * as React from "react"

type AppShellFooterHostApi = {
  host: HTMLElement | null
  setHost: (node: HTMLElement | null) => void
}

const AppShellFooterHostContext = React.createContext<AppShellFooterHostApi | null>(
  null,
)

/**
 * Registers a DOM node as the AppShell footer portal target (used by `MainContent`).
 * When mounted, `AppShell.Footer` renders into this node instead of `.appshell--footer`.
 */
function useRegisterAppShellFooterHost() {
  const ctx = React.useContext(AppShellFooterHostContext)

  return React.useCallback(
    (node: HTMLElement | null) => {
      ctx?.setHost(node)
    },
    [ctx],
  )
}

export { AppShellFooterHostContext, useRegisterAppShellFooterHost }
export type { AppShellFooterHostApi }
