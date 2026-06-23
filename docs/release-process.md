# Release process and publishing guardrails

This document is for maintainers. It explains how `rootmark` releases are created, what the automation handles, and what must be done manually.

## Overview

Releases are automated through a GitHub Actions workflow (`.github/workflows/release.yml`). The workflow triggers when a git tag matching `v*` is pushed.

## What maintainers must do before a release

1. **Ensure `main` is green**
   ```bash
   pnpm run ci
   node dist/cli.js verify .
   node dist/cli.js verify . --format json
   ```

2. **Update `package.json` version**
   Bump the `version` field to the new semver value (e.g. `0.1.4`). This is the only version change for the release.

3. **Update `CHANGELOG.md`**
   Add a new section for the release version with accurate highlights and changes.

4. **Commit and merge the version bump**
   Open a normal PR with the version and changelog changes. Do not include release workflow changes, trusted publishing config, secrets, or unrelated changes.

5. **Create and push a git tag**
   After the version bump PR is merged to `main`:
   ```bash
   git checkout main
   git pull --ff-only
   git tag v0.1.4
   git push origin v0.1.4
   ```

   Pushing the tag automatically triggers the release workflow.

## What the release workflow does automatically

The workflow (`.github/workflows/release.yml`) performs the following:

1. **Checkout, install, build, and test**
   - Runs `pnpm install --frozen-lockfile`
   - Runs `pnpm build`
   - Runs `pnpm test`

2. **Idempotent npm publish check**
   - Reads `package.json` name and version.
   - Runs `npm view "$PACKAGE_NAME@$PACKAGE_VERSION" version`.
   - If the version already exists on npm, it **skips publishing**.
   - If the version does not exist, it publishes with:
     ```bash
     npm publish --access public
     ```
   - This guardrail prevents accidental republishing of an already-published version.

3. **Publish via npm Trusted Publishing / OIDC**
   - The workflow has `permissions: id-token: write`, which lets `npm publish` obtain an OIDC token from GitHub Actions.
   - The npm package has a Trusted Publisher configured for this workflow (`release.yml`), so `npm publish` authenticates directly with npm and no `NPM_TOKEN` is required.
   - Traditional token-based publishing has been disabled on the npm package.
   - The workflow upgrades `npm` to the latest version before publishing, because npm Trusted Publishing requires a modern `npm` CLI.

4. **Create GitHub Release**
   - Uses `softprops/action-gh-release@v2`.
   - Generates release notes automatically.
   - **Note:** This step runs even if npm publish is skipped.

## Guardrails

- **Do not publish manually.** Use the workflow only.
- **Do not create tags without updating `package.json` and `CHANGELOG.md` first.**
- **Do not push tags from non-`main` branches** unless there is an explicit reason.
- **Do not modify `.github/workflows/release.yml`** without explicit maintainer approval.
- **Do not modify npm Trusted Publisher settings** in the npm package UI without explicit maintainer approval.
- **No `NPM_TOKEN` is used.** Publishing uses npm Trusted Publishing / OIDC only.
- **Normal documentation and code PRs must not include version bumps, tags, or release metadata.**
- **Already-published npm versions cannot be overwritten.** The workflow skips publish if the version exists.

## Verify a release

After the workflow finishes, confirm the release is live:

```bash
npm view rootmark version
npx rootmark --version
```

Check the GitHub Releases page for the generated release notes.

## Current state

- Current package version: `0.1.4`
- Current npm version: pending release of `0.1.4` (npm Trusted Publishing migration in progress)
- Release workflow is idempotent for npm publish.
