# Why AGENTS.md Matters

AI coding agents — Codex, Claude Code, Cursor, GitHub Copilot, Gemini CLI — read instruction files before editing your code. The most common ones are:

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.github/copilot-instructions.md`

Whatever lives in those files becomes part of the agent's context on every task. That makes them load-bearing repo artifacts, not notes.

## What goes wrong

When instruction files are missing, stale, bloated, or unsafe, four things tend to happen:

- **Bad edits.** An agent that does not know your test command will guess. An agent that does not know your style will improvise. An agent that does not know your safety boundaries will overstep.
- **Wasted tokens.** Long instruction files cost you on every request, even when the agent only needs one section.
- **Skipped validation.** If your test commands are missing, stale, or hard to find, the agent will skip them. Sometimes silently.
- **Risky changes.** Phrases that grant overly broad write permission or that ask the agent to disregard prior context turn your repo into a write-everywhere target.

## Treat instruction files as code

`AGENTS.md` and friends deserve the same review discipline as `package.json`, CI configs, and migration scripts:

- Review them in pull requests.
- Lint them in CI.
- Test them by running the scanner against your own repo.
- Update them when commands, scripts, or boundaries change.

## What this tool does

`agents-md-xray` is a CLI that scans agent instruction files and reports findings:

- **Static** — rule-based, no LLM analysis, deterministic output.
- **Local** — reads files from disk, never uploads content, no telemetry.
- **Reviewable** — every finding has a clear rule ID, message, evidence, and remediation.
- **CI-friendly** — stable exit codes, pretty, JSON, and SARIF output.

It catches the categories listed in the [README](../README.md#checks): missing required sections, dangerous instructions, context bloat, and stale command references.

## What this tool does not do

It does not, today, provide hosted services, dashboards, PR comments, MCP config scanning, auto-fix, telemetry, or a configuration file. Those items are tracked on the [roadmap](../README.md#roadmap). The scanner is intentionally narrow so its findings stay trustworthy.
