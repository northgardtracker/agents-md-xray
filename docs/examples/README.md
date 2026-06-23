# Examples Gallery

This directory contains curated examples of agent instruction files. Each example is a **synthetic** `.md` file, not an `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or `.github/copilot-instructions.md` that the scanner would auto-discover. They live in `docs/examples/` so they can illustrate patterns without being treated as live repo instructions.

If you want to test the scanner against a real instruction file, copy an example to `AGENTS.md` at the root of a throwaway repo and run `rootmark verify .`.

## Gallery

| File | Demonstrates | Related scanner rules |
|:-----|:-------------|:----------------------|
| [`good-minimal.md`](good-minimal.md) | A compact, complete instruction file with all five required sections. | `required-section.setup`, `required-section.test`, `required-section.style`, `required-section.safety`, `required-section.pr` |
| [`good-monorepo.md`](good-monorepo.md) | A monorepo-style instruction file with root commands and per-package guidance. | `required-section.*`, `stale-command.missing-package-script` (if scripts go missing) |
| [`bad-bloated.md`](bad-bloated.md) | Mixed concerns, duplicated reference material, hidden contradictions, and stale commands. | `context-bloat.too-long`, `stale-command.missing-package-script` |
| [`bad-dangerous.md`](bad-dangerous.md) | Patterns that trigger each of the four `dangerous-instruction.*` rules. | `dangerous-instruction.system-override`, `dangerous-instruction.skip-tests`, `dangerous-instruction.reckless-write`, `dangerous-instruction.secret-exposure` |

## Why these examples are synthetic

The scanner walks the working tree and only inspects files with instruction-file names (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `copilot-instructions.md`). The files in this directory use names like `good-minimal.md` so they are visible to you, the reader, but invisible to the scanner.

To verify, run the scanner against this repo and confirm that no file under `docs/examples/` appears in the output:

```bash
node dist/cli.js verify .
```

The reported `instruction files:` line should list only `AGENTS.md` (or equivalent real instruction files at the repo root).

## What these examples cover

Each example is paired with the scanner rules it illustrates. The goal is not to game the scanner, but to teach patterns that map cleanly to current rules:

- **Required sections** — `setup`, `test`, `style`, `safety`, `pr`. Both good examples include all five.
- **Dangerous instructions** — every `dangerous-instruction.*` rule has a matching phrase in `bad-dangerous.md`.
- **Context bloat** — `bad-bloated.md` shows the shape of bloat without going over the 900-word threshold; the file itself explains why bloat is harmful.
- **Stale commands** — `bad-bloated.md` references scripts (`test:e2e`, `test:load`, etc.) that would not exist in a real `package.json`.

## What these examples do not cover

These are roadmap items, not implemented in the current CLI:

- Nested `AGENTS.md` conflict detection — [issue #3](https://github.com/northgardtracker/rootmark/issues/3).
- MCP config scanning — [issue #4](https://github.com/northgardtracker/rootmark/issues/4).
- Auto-fix mode — [issue #5](https://github.com/northgardtracker/rootmark/issues/5).
- GitHub Action PR comments — [issue #2](https://github.com/northgardtracker/rootmark/issues/2).
- Hosted dashboards, telemetry, or a configuration file — out of scope by design.

The gallery documents only behavior implemented in the current CLI.
