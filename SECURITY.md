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

- **No execution**: The scanner never executes commands found in instruction files
- **Read-only**: Only reads files, never writes to the scanned repository
- **No network**: No telemetry, no uploads, no external API calls
- **Local-first**: All analysis happens on your machine
