import * as UDS from "@mich8060/unified-design-system"

export function renderTree(node: any) {
  const Component = (UDS as any)[node.type]

  if (!Component) {
    throw new Error(`Unknown component ${node.type}`)
  }

  return Component(node.props)
}