# Why AGENTS.md Matters

AI coding agents — Codex, Claude Code, Cursor, GitHub Copilot, Gemini CLI —
read instruction files before editing your code. The most common ones are:

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.github/copilot-instructions.md`

Whatever lives in those files becomes part of the agent's context on every
task. That makes them load-bearing repo artifacts, not notes.

## What goes wrong

When instruction files are missing, stale, or out of sync with the
repository, three things tend to happen:

- **Bad edits.** An agent that does not know your test command will guess.
  An agent that does not know your style will improvise. An agent that does
  not know your package manager will run the wrong tool.
- **Wasted tokens.** Long instruction files cost you on every request, even
  when the agent only needs one section.
- **Skipped validation.** If your test commands are missing, stale, or hard
  to find, the agent will skip them. Sometimes silently.

## Treat instruction files as code

`AGENTS.md` and friends deserve the same review discipline as `package.json`,
CI configs, and migration scripts:

- Review them in pull requests.
- Verify them in CI against the repository's actual package metadata.
- Update them when commands, scripts, or package metadata change.

## What this tool does

Rootmark is a CLI that grounds the commands written in `AGENTS.md`-style
instruction files against the repository's actual package metadata:

- **Static** — rule-based, no LLM analysis, deterministic output.
- **Local** — reads files from disk, never uploads content, no telemetry.
- **Grounded** — every command reference is checked against
  `package.json` scripts, `packageManager`, lockfiles, and pnpm workspaces.
- **CI-friendly** — stable exit codes, pretty, JSON, and SARIF output.

It does **not** grade writing style, mine prose, scan for vulnerabilities, or
guarantee agent safety. See [What it does NOT do](../README.md#what-it-does-not-do-v01)
for the full list.

## What this tool does not do

It does not, today, execute discovered commands, scan for vulnerabilities,
mine prose, run LLM/semantic checks, publish hosted services, post SARIF to
GitHub Code Scanning on its own, or auto-write instruction files. These
items are tracked on the [roadmap](../ROADMAP.md). The scanner is
intentionally narrow so its findings stay trustworthy.
