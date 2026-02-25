# CLAUDE.md

This file provides project guidance for Claude and Claude-based coding agents.

## UDS Is The App Shell

For this repository, `UDS` is not a leaf UI component. It is the application shell.

- Always build full app/page layout recommendations inside `<UDS>`.
- Compose shell regions with `UDS.Menu`, `UDS.Content`, `UDS.Main`, `UDS.Listview`, and `UDS.Panel`.
- Do not propose alternative top-level app wrappers unless the user explicitly asks for non-UDS layout.

## Component Usage Rule

Before generating code that uses a component, read that component AI context file:

`src/ui/<ComponentName>/<ComponentName>.ai.md`

If more than one component is involved, read each related `.ai.md` file first.
