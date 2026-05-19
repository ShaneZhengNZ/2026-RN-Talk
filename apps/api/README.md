# @rn-talk/api

Tiny Express BFF that proxies and caches GitHub's `search/repositories` endpoint to power the trending-repos list in the mobile app.

## Why a BFF

The GitHub API doesn't expose a stable trending feed. We approximate it with `search/repositories?q=created:>YYYY-MM-DD&sort=stars`. The BFF:

- Shapes GitHub's payload down to the few fields the app actually renders.
- Caches results for 90 s in memory so the unauth rate limit (60 req/hour) doesn't bite during the demo.
- Validates the upstream response with Zod so a GitHub change surfaces as a 502, not a runtime crash on the device.

## Endpoints

- `GET /healthz` → `{ ok: true }`
- `GET /api/repos/trending?since=daily|weekly|monthly&language=` → `TrendingResponse` (schema in `@rn-talk/shared`)

## Running

```bash
cp apps/api/.env.example apps/api/.env   # optional: paste a GITHUB_TOKEN
bun install                              # from the repo root
bun run dev                              # turbo runs every app's dev
# or just this one:
bun --filter @rn-talk/api dev
```

The server listens on `http://localhost:4000` by default.

## GitHub token

The token is optional but recommended for live demos. Unauthenticated: 60 req/hour. Authenticated: 5000 req/hour. A fine-grained token with no scopes is enough for public-repo search.
