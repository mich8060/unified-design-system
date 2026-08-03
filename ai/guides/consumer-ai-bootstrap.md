# Consumer AI bootstrap (Cursor, Claude Code, generic)

Package docs under `design-language/` and `ai/indexes/` are **cold storage** until they are on the agent **hot path**. Designers and PMs should **not** run a CLI for this — **setup agents** (or an engineer on a starter/upgrade PR) own the step.

## Who runs what

| Role | Action |
|------|--------|
| Designer / PM | Paste a setup prompt (or clone a starter that already has hot-path stubs). Never run `uds-copy-ai-rules`. |
| Setup agent | After `npm install`, run `npx uds-copy-ai-rules` before composing UI. Commit the written files. |
| Starter template | Bake in `.cursor/rules/uds.mdc` (and/or `CLAUDE.md` / `AGENTS.md`) so greenfield has zero bootstrap step. |

From the **consumer app** root (agent-owned):

```bash
npx uds-copy-ai-rules
# or one tool: npx uds-copy-ai-rules --tool=cursor
```

Then **commit** the generated hot-path files so every later session loads them. The package has **no `postinstall`** that mutates the consumer app.

Canonical composition rules: [`../consumer-ai/COMPOSITION.md`](../consumer-ai/COMPOSITION.md)

## Install matrix

| Tool | Copy from package | Into consumer app |
|------|-------------------|-------------------|
| **Cursor** | `…/ai/consumer-ai/cursor/uds.mdc` | `.cursor/rules/uds.mdc` (`alwaysApply: true`) |
| **Claude Code** | `…/ai/consumer-ai/claude/CLAUDE.md` | Project-root `CLAUDE.md` (or merge the UDS section) |
| **Generic / AGENTS** | `…/ai/consumer-ai/generic/AGENTS.md` | Project-root `AGENTS.md` (or merge) |
| **GitHub Copilot** | `…/ai/consumer-ai/generic/copilot-instructions.md` | `.github/copilot-instructions.md` |

Manual copy (if you prefer not to use the bin):

```bash
mkdir -p .cursor/rules
cp node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/cursor/uds.mdc .cursor/rules/uds.mdc
```

Claude Code:

```bash
cp node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/claude/CLAUDE.md ./CLAUDE.md
```

Generic:

```bash
cp node_modules/@chghealthcare/unified-design-system/ai/consumer-ai/generic/AGENTS.md ./AGENTS.md
```

## Why this is required

Coding agents auto-load project-root instructions (AGENTS / CLAUDE / `.cursor/rules`). They do **not** automatically walk `node_modules/.../design-language/`. Without this step, agents invent layouts from model priors even when the package contains the correct rules.

## After upgrading UDS

On the **upgrade PR** (agent or engineer — not designers/PMs):

1. Reinstall / refresh the package (npm / tgz).
2. Re-run `npx uds-copy-ai-rules` (or re-merge) if the composition block changed, then **commit**.
3. Prefer recipe/example files from the new package version.

## Related

- [`AI_USAGE.md`](../../AI_USAGE.md)
- [`setup.md`](../../setup.md)
- Package [`AGENTS.md`](../../AGENTS.md) (full Hard rules for maintainers and consumers who copy it)
