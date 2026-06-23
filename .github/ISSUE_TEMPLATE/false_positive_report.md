---
name: False Positive Report
about: Report a Rootmark finding that you believe is wrong
title: "[FALSE POSITIVE] "
labels: false-positive
assignees: ""
---

Rootmark v0.1 may emit findings that turn out to be incorrect for your
repository. Use this template to help the maintainer reproduce and triage
the report.

## Instruction snippet

Paste the smallest snippet of the `AGENTS.md` (or other instruction file)
that triggers the finding. Use a fenced code block so whitespace is
preserved.

```markdown
<!-- paste here -->
```

## Repo manifest

Paste the relevant slice of your `package.json` (typically the `scripts`,
`packageManager`, and `workspaces` fields) so the maintainer can see what
Rootmark is grounding against.

```json
{
  "scripts": { /* ... */ },
  "packageManager": "/* ... */",
  "workspaces": [ /* ... */ ]
}
```

## What Rootmark reported

- Rule ID: [e.g. `stale-command.missing-package-script`]
- Severity: [error / warning / info]
- File: [e.g. `AGENTS.md`]
- Evidence: [the matched command line, e.g. `pnpm deploy`]

```bash
# Full output, if available:
rootmark verify . --format json
```

## What you expected

What Rootmark should have done instead. For example: "should have reported
`verified` because `deploy` is defined under a workspace alias" or "should
not have flagged this line at all because it is inside a Markdown comment".

## Environment

- OS: [e.g. Windows 11, macOS 15, Ubuntu 24.04]
- Node.js version: [e.g. 20.x]
- Rootmark version: [e.g. 0.1.0]
- `packageManager` field value: [e.g. `pnpm@10.29.3`]
- Workspace / monorepo tool: [pnpm workspaces / npm workspaces / Turborepo / Nx / none]
