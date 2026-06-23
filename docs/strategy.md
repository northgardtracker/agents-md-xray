# Strategy

The initial wedge is not a generic MCP security gateway. That market is
crowded.

The wedge is: ground the Node/npm/pnpm commands written in agent instruction
files against the repository's actual package metadata, in CI, without
executing anything.

Phase 1 (v0.1): grounded verification — extract npm/pnpm commands from
`AGENTS.md` / `CLAUDE.md` / `GEMINI.md` and check them against
`package.json` scripts, `packageManager`, lockfiles, and pnpm workspaces.
Phase 2: GitHub Action polish — composite action, sticky PR summary comment,
stable CI outputs.
Phase 3 (later): optional MCP config inventory without executing untrusted
commands.
Phase 4 (later, opt-in only): LLM-assisted suggestions behind an explicit
flag.
