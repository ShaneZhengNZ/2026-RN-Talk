# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React Native app built with Expo (managed workflow), TypeScript strict. Talks to a separate Express BFF over HTTP — the BFF is a sibling app, not part of this app's workspace.

## Stack

- **Expo SDK** with **Expo Router** — file-based routing, typed routes enabled.
- **TypeScript strict** — `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` all on.
- **TanStack Query** for all server state. No hand-rolled `fetch` + `useState` + `useEffect`.
- **Zod** at every wire boundary. No response is trusted until it's parsed.
- **react-native-unistyles** for all styling — variants, themes, no re-renders on theme change.
- **expo-image** for all images (never `Image` from `react-native`).

## Commands

Package manager is **Bun**. Linter/formatter is **Biome**.

- `bun install` — install
- `bun run start` — Expo dev server
- `bun run lint` / `bun run lint:fix` — Biome
- `bun run typecheck` — `tsc --noEmit`
- `bun run test` — Jest suite
- `bun run test path/to/file.test.tsx` — single file
- `bun run test -t "name of test"` — single test by name

After any code change, run `typecheck`, `lint`, and the relevant tests before declaring done.

## Layout

- `app/` — Expo Router route files. Default exports only here.
- `src/api/` — fetch wrappers, query hooks, Zod schemas.
- `src/components/` — reusable UI. Named exports.
- `src/hooks/` — non-data hooks.
- `src/theme.ts` — Unistyles theme + tokens. No hardcoded colors anywhere else.

## Data layer

Every endpoint has three pieces in `src/api/`: a Zod schema, a typed fetcher, and a TanStack Query hook. The schema is the source of truth — types are inferred via `z.infer`, never declared separately.

The fetcher parses the response with `.parse()` (not `.safeParse()` unless the caller handles both branches). A parse failure is a real error and should surface as a query error, not a silent fallback.

Loading, error, and empty states are first-class UI — every screen that consumes a query renders all three. Don't ship a spinner-forever screen.

## TypeScript style

No `any`. No `as` casts except at validated boundaries (the output of `z.parse` is the only place a wide type legitimately narrows). Prefer discriminated unions over optional fields. Use `type` aliases unless declaration merging is actually needed.

## React Native style

Function components and hooks only. One component per file unless they're trivial siblings. `expo-image` for every image. Touchable elements get `accessibilityLabel` and `accessibilityRole`. Styles live in a Unistyles `createStyleSheet` at the bottom of the file — not inline, not in shared globals.

## Testing

Jest + `@testing-library/react-native` + **MSW** for HTTP mocking. Tests assert what the user sees (`getByRole`, `getByText`), not component internals. Render through a `QueryClientProvider` with a fresh client per test. Colocate test files 1:1 with their source: `Foo.tsx` → `Foo.test.tsx`.

## Working with Claude Code in this repo

- Ask before adding a new dependency. Justify the choice in one line.
- Prefer minimal diffs. Don't refactor code that isn't part of the task.
- When the request is ambiguous, ask one clarifying question before writing code — not five.
- Don't leave `TODO` or `FIXME` comments. Either do it or surface the gap in chat.
- Don't widen a type to silence an error. Fix the underlying mismatch.
- Don't introduce new patterns when an existing one in the repo applies — match what's already there.

## Anti-patterns (do not do these)

- `useEffect` + `useState` to fetch data (use TanStack Query)
- Untyped route params (use Expo Router's typed routes)
- Inline `require()` for remote images
- Hardcoded colors, spacing, or font sizes outside `theme.ts`
- Class components, default exports outside `app/`, barrel `index.ts` files
- Silent `try/catch` that swallows errors
