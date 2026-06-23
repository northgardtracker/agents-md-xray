# Good Monorepo Example

This is a **synthetic** example of an `AGENTS.md` for a pnpm workspace with multiple packages. It covers root-level commands, per-package boundaries, and nested instruction files.

## Setup commands

- Install workspace dependencies: `pnpm install`
- Build all packages: `pnpm run build`

## Test commands

- Run full validation: `pnpm run ci`
- Test every package: `pnpm -r test`
- Test a single package: `pnpm -F @scope/web test`

## Code style

- Use TypeScript strict mode across all packages.
- Lint the workspace: `pnpm run lint`
- Format with the project's formatter before commit.

## Safety boundaries

- Do not edit generated files under `packages/*/dist/`.
- Ask before editing lockfile files (`pnpm-lock.yaml`).
- Never bypass per-package tests when changing cross-package APIs.

## Pull request expectations

- Run `pnpm run ci` before requesting review.
- Open separate PRs per package when changes are scoped to one package.
- Update the relevant package-level `AGENTS.md` when changing package conventions.

## Nested instructions

- Each package may add its own `AGENTS.md` for package-specific commands and boundaries.
- Nested files should only add detail, not contradict root rules.
- Inheritance and conflict detection across nested files is a [roadmap item](https://github.com/northgardtracker/rootmark/issues/3) for the scanner, not yet implemented.
