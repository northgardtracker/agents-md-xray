# Security Policy

Rootmark performs static analysis only. It does not execute code from
instruction files and makes no security guarantees.

This document covers how to report a security issue in the Rootmark tool
itself, and how the project handles such reports.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Rootmark, please report it
responsibly.

**Do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

Email: **security@rootmark.dev**

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Assessment**: Within 5 business days
- **Resolution**: Critical issues within 14 days

### Safe Harbor

Security research conducted in good faith under this policy is authorized
and we will not initiate legal action against researchers.

## Design Safety

Rootmark is designed to be safe by default:

- **Local files only**: The scanner reads local files and package metadata
  only.
- **Deterministic**: Checks are rule-based and do not depend on model calls.
- **No execution**: The scanner never executes commands found in instruction
  files.
- **Read-only**: It never writes to the scanned repository.
- **No telemetry**: No telemetry is collected.
- **No network by default**: There are no uploads or external API calls by
  default.

## What Rootmark does not do

Rootmark is **not** a security scanner. It does not:

- Detect vulnerabilities in dependencies or source code.
- Run untrusted code from instruction files.
- Make any guarantee that an AI agent will behave safely after reading a
  grounded instruction file.
- Serve as an official `AGENTS.md` validator or compliance certification.

Grounded verification reduces drift between `AGENTS.md`-style instructions
and the repository's actual package metadata. It is a maintenance aid, not
a safety guarantee.

If you believe a security issue exists in Rootmark itself, please report it
through this policy rather than opening a public issue.
