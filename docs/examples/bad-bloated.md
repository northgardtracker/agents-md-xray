# Bad Bloated Example

This is a **synthetic** example illustrating how an `AGENTS.md` file can become bloated over time. It mixes setup, API reference, deployment, monitoring, and team norms in one place. Real-world bloat is usually much worse.

> Note: this file is intentionally kept small enough to stay readable. The scanner's `context-bloat.too-long` rule warns at 900 words and fails at 1600. The goal here is to show the *shape* of bloat, not its full size.

## Setup commands

- Install dependencies: `pnpm install`
- Configure database: `psql -h db.internal -U app -c "CREATE DATABASE app;"`
- Set up Redis: `redis-cli CONFIG SET maxmemory 2gb`
- Provision S3 buckets for `dev`, `staging`, `prod`
- Request VPN access from IT
- Install Docker Desktop
- Add the staging SSH key to your `~/.ssh/config`
- Subscribe to `#eng-announce` and `#oncall` Slack channels

## Test commands

- Run unit tests: `pnpm test`
- Run end-to-end tests: `pnpm test:e2e`
- Run load tests: `pnpm test:load`
- Run security audit: `pnpm audit`
- Run mutation tests: `pnpm test:mutate`
- Run visual regression: `pnpm test:visual`
- Manually click through the dashboard
- Ask QA to verify on staging

## API reference

The `/api/users` endpoint accepts a `GET` request and returns a list of user objects. Each user has `id`, `name`, `email`, and `createdAt`. Use `?limit=50` to control page size.

The `/api/posts` endpoint accepts `GET`, `POST`, `PUT`, `DELETE`. Authentication is required via `Authorization: Bearer <token>`.

The `/api/search` endpoint accepts `GET` with `?q=<query>`. Results are paginated and ranked by recency.

## Deployment

- Build: `docker build -t app:latest .`
- Push: `docker push registry.internal/app:latest`
- Deploy to staging: `kubectl apply -f k8s/staging/`
- Deploy to prod: `kubectl apply -f k8s/prod/` (requires approval)
- Rollback: `kubectl rollout undo deployment/app`

## Monitoring

- Grafana dashboard: https://grafana.internal/d/app
- PagerDuty schedule: app-oncall
- Log search: https://logs.internal
- Error tracking: https://errors.internal
- Status page: https://status.internal

## Code style

- Use TypeScript.
- Two-space indent.
- Single quotes for strings.
- No semicolons? Yes semicolons. Pick one and stick to it.
- We use both ESLint and Prettier.
- We sometimes run `pnpm lint --fix` before commit.

## Safety boundaries

- Never commit secrets.
- Do not push to main.
- Be careful with database migrations.

## Pull request expectations

- Open PRs against `main`.
- Get one reviewer approval.
- Squash and merge.

## Why this is bad

The problems with this file are not just length. They are:

- **Mixed concerns** — setup, API reference, deployment, monitoring, and team norms are all in one place.
- **Duplication** — API reference material should live in `docs/api/`, not in agent instructions.
- **Hidden contradictions** — "No semicolons? Yes semicolons." is the kind of drift that confuses agents.
- **Stale commands** — many referenced scripts (`test:e2e`, `test:load`, `test:mutate`, `test:visual`) probably do not exist in `package.json`.
- **Context cost** — an agent re-reads this file on every task and burns tokens on irrelevant material.
- **Reference vs policy** — a maintainer cannot easily diff "what changed in policy" versus "what changed in API docs".

The scanner flags files over 900 words. This example is intentionally kept smaller so you can read it, but real-world bloat is usually much worse.
