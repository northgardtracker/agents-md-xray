# Contributing to Rootmark

Thank you for your interest in contributing to Rootmark! Here's how to get
started.

## Maintainer Packet

Every pull request **must** include the Maintainer Packet in the PR
description. PRs that omit it will be sent back for revision. The packet is:

```
### What this PR does

### How to verify (operator copy-paste, ≤2 commands + expected output)

### Risks / what could break

### Decision: [ ] merge  [ ] reject — reason:
```

Keep the "How to verify" section short. Two commands and the expected
output is the target. Reviewers should be able to copy-paste and confirm.

## Scope discipline

v0.1 is grounded verification only. PRs that expand scope beyond that
without prior discussion will be rejected. Specifically, v0.1 does **not**
include:

- Command execution
- Non-Node ecosystem grounding
- Prose mining or writing-style linting
- LLM / semantic checks
- Vulnerability or CVE detection
- Auto-fix / auto-write to instruction files
- A configuration file (design only at this point)

See [ROADMAP.md](ROADMAP.md) for the full "Not doing in v0.1" list and
[docs/decisions.md](docs/decisions.md) for the reasoning behind the scope.

## Development setup

```bash
# Clone the repo
git clone https://github.com/northgardtracker/rootmark.git
cd rootmark

# Install dependencies
pnpm install

# Run the full validation pipeline
pnpm run ci
```

After installing, a smoke test of the CLI:

```bash
node dist/cli.js verify .
```

## Available scripts

| Script | Description |
|:-------|:------------|
| `pnpm dev` | Run CLI in development mode via tsx |
| `pnpm build` | Compile TypeScript to dist/ |
| `pnpm test` | Run tests with Vitest |
| `pnpm typecheck` | Type-check without emitting |
| `pnpm lint` | Run ESLint |
| `pnpm run ci` | Run typecheck + test + build |

## Adding a new rule

1. Create `src/rules/your-rule.ts` exporting a function matching
   `(file: string, text: string) => Finding[]`.
2. Import and call it in `src/scanner.ts`.
3. Add tests in `test/scanner.test.ts` with a fixture if needed.
4. Include remediation text in every finding.

## Code style

- **TypeScript strict mode** — no `any`, no implicit returns.
- **ESM only** — use `.js` extensions in imports.
- **Deterministic rules** — no network calls, no randomness in rules.
- **Side-effect free** — rules must not modify the filesystem.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new rule for duplicate sections
fix: handle Windows paths in stale-commands
docs: improve README quick start section
test: add edge case for empty AGENTS.md
```

## Pull request process

1. Fork the repo and create a feature branch.
2. Make your changes with tests.
3. Run `pnpm run ci` to verify everything passes.
4. Fill in the Maintainer Packet in the PR description.
5. Open the PR and respond to review feedback.

## Release and npm rules

- Do not publish to npm.
- Do not create tags.
- Do not create GitHub releases.
- Do not modify `NPM_TOKEN`, trusted publishing, or release automation.

Releases are owned by the maintainer and follow
[`docs/release-process.md`](docs/release-process.md). Contributors do not
publish.

## Reporting issues

- Use the [bug report template](https://github.com/northgardtracker/rootmark/issues/new?template=bug_report.md) for bugs.
- Use the [feature request template](https://github.com/northgardtracker/rootmark/issues/new?template=feature_request.md) for new ideas.
- Use the [false positive report template](https://github.com/northgardtracker/rootmark/issues/new?template=false_positive_report.md) when Rootmark reported a finding that you believe is wrong.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
