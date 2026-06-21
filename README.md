<p align="center">
  <br />
  <code>&nbsp;┌─────────────────────────────────────────┐&nbsp;</code><br />
  <code>&nbsp;│&nbsp;&nbsp;agents-md-xray&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;</code><br />
  <code>&nbsp;│&nbsp;&nbsp;X-ray for AGENTS.md and instruction&nbsp;&nbsp;&nbsp;│&nbsp;</code><br />
  <code>&nbsp;│&nbsp;&nbsp;drift in AI coding agent repos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;</code><br />
  <code>&nbsp;└─────────────────────────────────────────┘&nbsp;</code><br />
  <br />
  <a href="https://www.npmjs.com/package/agents-md-xray"><img src="https://img.shields.io/npm/v/agents-md-xray?style=flat-square&color=cb3837" alt="npm version" /></a>
  <a href="https://github.com/wolfhound115/agents-md-xray/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/wolfhound115/agents-md-xray/ci.yml?branch=main&style=flat-square&label=CI" alt="CI" /></a>
  <a href="https://github.com/wolfhound115/agents-md-xray/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
  <a href="https://github.com/wolfhound115/agents-md-xray/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

## Why this exists

AI coding agents — Codex, Claude Code, Cursor, GitHub Copilot, Gemini CLI — read instruction files before editing code. When those files are **missing**, **stale**, **bloated**, or **unsafe**, agents waste tokens, skip validation, or make overly broad changes.

`agents-md-xray` turns agent instructions into a **reviewable, testable artifact** — just like you lint your code, now you can lint your agent instructions.

## Quick Start

```bash
npx agents-md-xray scan .
```

That's it. It auto-discovers `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md`.

## Features

- 🔍 **Auto-discovery** — Finds all agent instruction files recursively
- ⚠️ **Dangerous instruction detection** — Catches prompt injection, test skipping, secret exposure
- 📏 **Context bloat analysis** — Warns when instructions are too long for efficient agent use
- 🔗 **Stale command detection** — Verifies `pnpm run <script>` references match `package.json`
- 📋 **Required section checks** — Ensures setup, test, style, safety, and PR sections exist
- 📊 **Multiple output formats** — Text, JSON, and SARIF for CI/CD integration
- 🎯 **Configurable fail threshold** — Fail CI on `fail`, `warn`, or `info` severity

## Installation

```bash
# npm
npm install -g agents-md-xray

# pnpm
pnpm add -g agents-md-xray

# Or use directly — no install needed
npx agents-md-xray scan .
```

## Usage

### Scan a repository

```bash
# Default scan with text output
agents-md-xray scan .

# JSON output for automation
agents-md-xray scan . --json

# Fail CI on any warning or worse
agents-md-xray scan . --fail-on warn

# Scan a specific directory
agents-md-xray scan ./packages/my-lib
```

### Example Output

```
agents-md-xray score: 64/100
instruction files: AGENTS.md

[FAIL] dangerous-instruction.system-override (AGENTS.md)
  Potentially dangerous instruction: Instruction override language can behave like prompt injection.
  Evidence: ignore previous instructions
  Fix: Replace with a scoped, auditable rule that says when the agent should ask for approval.

[FAIL] stale-command.missing-package-script (AGENTS.md)
  Referenced npm script does not exist: Instruction references script "deploy", but package.json does not define it.
  Evidence: pnpm run deploy
  Fix: Add "deploy" to package.json scripts, or update the agent instruction.

[WARN] context-bloat.too-long (AGENTS.md)
  Instruction file may be too large: This file has about 1200 words.
  Fix: Move long reference material into docs/ and keep AGENTS.md focused on commands, boundaries, and invariants.
```

## Checks

| ID | Severity | What it checks |
|:---|:---------|:---------------|
| `instruction-file.missing` | 🔴 fail | No AGENTS.md / CLAUDE.md / GEMINI.md found |
| `required-section.setup` | 🔴 fail | Missing setup/install commands section |
| `required-section.test` | 🔴 fail | Missing test/validation commands section |
| `required-section.style` | 🟡 warn | Missing code style conventions section |
| `required-section.safety` | 🟡 warn | Missing safety boundaries section |
| `required-section.pr` | 🟡 warn | Missing PR/review expectations section |
| `dangerous-instruction.system-override` | 🔴 fail | Prompt injection pattern ("ignore previous instructions") |
| `dangerous-instruction.skip-tests` | 🔴 fail | Blanket test-skipping instruction |
| `dangerous-instruction.reckless-write` | 🔴 fail | Overly broad write permission |
| `dangerous-instruction.secret-exposure` | 🔴 fail | Instruction to print secrets or env vars |
| `context-bloat.too-long` | 🟡/🔴 | File exceeds 900 words (warn) or 1600 words (fail) |
| `stale-command.missing-package-script` | 🔴 fail | Referenced npm script doesn't exist in package.json |

## CI Integration

### GitHub Actions

```yaml
name: Lint Agent Instructions
on:
  pull_request:
    paths:
      - 'AGENTS.md'
      - 'CLAUDE.md'
      - 'GEMINI.md'
      - '.github/copilot-instructions.md'

jobs:
  xray:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx agents-md-xray scan . --fail-on warn
```

## Design Principles

1. **Deterministic first** — Rule-based checks before LLM analysis
2. **Local-first** — No telemetry, no upload by default
3. **Safe by default** — Never execute untrusted configs while scanning
4. **CI-friendly** — Stable exit codes and machine-readable output
5. **Maintainer-oriented** — Findings include actionable remediation

## Roadmap

- [x] CLI scanner with text/JSON output
- [x] Required section detection
- [x] Dangerous instruction detection
- [x] Context bloat analysis
- [x] Stale command detection
- [ ] 🚧 GitHub Action with PR comments
- [ ] 🚧 SARIF output for GitHub Code Scanning
- [ ] 📋 Nested AGENTS.md conflict detection
- [ ] 📋 MCP config inventory and risk preview
- [ ] 📋 Auto-fix mode for safe, mechanical improvements

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [agents-md-xray contributors](https://github.com/wolfhound115/agents-md-xray/graphs/contributors)

---

<p align="center">
  <sub>If you find agents-md-xray useful, please consider giving it a ⭐ on GitHub!</sub>
  <br />
  <sub>Built for the agentic coding era 🤖</sub>
</p>
