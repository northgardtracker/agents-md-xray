# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

Email: **security@agents-md-xray.dev**

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

`agents-md-xray` is designed to be safe by default:

- **Local files only**: The scanner reads local files and package metadata only
- **Deterministic**: Checks are rule-based and do not depend on model calls
- **No execution**: The scanner never executes commands found in instruction files
- **Read-only**: It never writes to the scanned repository
- **No telemetry**: No telemetry is collected
- **No network by default**: There are no uploads or external API calls by default

If you believe a security issue exists, please report it through this policy rather than opening a public issue.
