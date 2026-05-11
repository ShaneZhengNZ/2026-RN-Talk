# Talk Plan: Modern React Native in 60 Minutes

A live build with Claude Code — Expo, TypeScript, TanStack Query, Zod, EAS, and the modern dev stack.

**Speaker:** Shane Zheng — Technical Team Lead @ Link Engine Management
**Audience:** Juniors and students at a local IT club
**Duration:** 60 minutes
**Format:** Live demo (audience watches on phones via Expo Go for the main build, Android EAS dev-client QR for the closing reveal)

---

## Status at a glance

**Locked**

- 60-minute agenda structure
- Distribution strategy: Expo Go for main demo, Android-only EAS QR for the dev-client reveal
- Demo app: trending GitHub repos, served via a thin Express BFF
- Full stack and tooling inventory
- Testing approach (Option B — pre-baked infrastructure, Claude Code writes the specs live)
- Marketing one-pager (delivered)

**Open**

- `CLAUDE.md` content
- Live-demo starting state (what's in the empty RN repo at t=0)
- Unistyles before/after example
- Prompt scripts for each of the three loops
- Slide deck outline
- Risk + pre-flight concrete checklist
- Full dry-run against a timer

---

## 1. Objectives

The talk succeeds if every junior in the room leaves able to answer three questions.

What does a modern, production-grade React Native project look like in 2026? Not a tutorial app — a real one, with the choices a senior engineer would actually ship.

Why does each library or pattern in the stack exist, and what problem does it solve? The talk should send people home with a list of things they didn't know existed, and a one-line reason each.

How do you use an AI pair programmer (Claude Code) as a senior engineer would — driving it, reviewing its output, knowing when to overrule it?

If a single junior in the room takes one library or tool home and tries it next weekend, the talk worked.

## 2. Audience

Juniors and students at a local IT club. Mixed backgrounds, mostly stronger in web (HTML/CSS/JS) than in mobile-specific concerns. Genuinely curious about both React Native and AI-assisted development. Watching the build mostly, with their phones on Expo Go during the main demo, and an Android-only EAS install QR for the dev-client reveal at the end.

A junior audience changes one thing in talk design: every new concept needs a one-sentence motivation. The talk's structure is built around *motivating* the next library or pattern with the limitation of the previous one — that's what makes the stack land instead of feeling like a name-drop.

## 3. Narrative arc

Four acts.

**Setup.** Frame the talk, show the finished product, plant the seeds. About 12 minutes.

**Build.** Three live loops with Claude Code, in Expo Go, audience watching their own phones light up. About 31 minutes.

**Reveal.** "Everything you just saw was the polite version. Here's how a senior engineer would actually ship this." Unistyles, dev client, EAS Build. About 12 minutes.

**Empower.** Junior takeaway, Q&A. About 5 minutes.

The reveal act is the one that makes the talk juicy. The build act is where they learn to fish. The reveal is where they see the ocean.

## 4. Detailed agenda

```
0:00 – 0:05  Hook
0:05 – 0:10  RN in 2026 + Claude Code framing
0:10 – 0:14  Stack + modern dev tools + the BFF
0:14 – 0:23  Loop 1 — Scaffold (9 min)
0:23 – 0:40  Loop 2 — Real data + tests (17 min)
0:40 – 0:46  Loop 3 — Detail screen + typed routes (6 min)
0:46 – 0:57  Reveal — Unistyles + dev client + EAS Build (11 min)
0:57 – 1:00  Junior takeaway + Q&A
```

### 0:00 – 0:05 — Hook

Show finished app on screen-mirrored phone. QR for Expo Go on slide (iOS + Android both work). Frame the hour. *"By the end, you'll know how this app was built, how it got onto a real device, and how to use AI without becoming dependent on it."*

### 0:05 – 0:10 — RN in 2026 + Claude Code framing

Slide-driven. Why Expo, why one codebase, why now. Frame Claude Code as a pair programmer: not a magic wand, but "an engineer who reads docs faster than you." This is where to plant the *"you stay in charge"* message that supports the closing takeaway.

### 0:10 – 0:14 — Stack + modern dev tools + the BFF

One slide with the full stack and tools inventory (see Section 5). One slide on the BFF concept: *"Our backend isn't GitHub. It's a small Express app that proxies GitHub and caches the response — here's why we did that, in one breath."* Curl one endpoint live, JSON appears, move on. Show `CLAUDE.md` briefly — narrate that *defining the conventions* is itself an engineering act.

### 0:14 – 0:23 — Loop 1 — Scaffold

`bun create expo-app`, Expo Router screen, list with mock data, `expo-image` for fast image rendering, theme tokens in `src/theme.ts`. Read every diff aloud. Phones update.

### 0:23 – 0:40 — Loop 2 — Real data + tests

The teaching beat of the talk. Three sub-beats:

**0:23 – 0:32 — Implementation (9 min).** API client, Zod schemas, TanStack Query hook with proper loading + error + empty states. Wire to the list screen. Phones light up with real data. Real cheer moment.

**0:32 – 0:34 — Test setup tour (2 min).** Pull up a slide showing the pre-baked test infrastructure: `vitest.config.ts` for the BFF, `jest.config.js` + `jest.setup.ts` for mobile, MSW handlers wired up, scripts in `package.json`. Narrate each piece in one sentence. The point isn't to teach the configs in depth — it's to show juniors what a properly-set-up test environment looks like.

**0:34 – 0:40 — Claude writes the tests (6 min).** Hand it to Claude Code: *"Write a Vitest test for the BFF's `/api/repos/trending` endpoint, mocking the GitHub upstream, asserting the reshaped response. Then write an RN Testing Library test for the trending-repos screen using MSW to mock my BFF, asserting loading → success states."* Read the diff aloud. Run `bun run test`. Green. Cheer moment #2.

### 0:40 – 0:46 — Loop 3 — Detail screen + typed routes

Expo Router file-based detail route, typed route params, navigation. No animation polish — the time goes to the reveal instead.

### 0:46 – 0:57 — Reveal — Unistyles + dev client + EAS Build

**Why Unistyles (3 min).** Pull up a slide showing the same tag pill component in plain `StyleSheet` vs `react-native-unistyles` with variants. The diff sells Unistyles in 30 seconds. Then explain: variants, themes, one styling system for web + native, no re-renders on theme change.

**Why this needs a dev client (2 min).** Unistyles requires the New Architecture. Expo Go can't host that. Introduce the dev-client concept.

**EAS Build (5 min).** Run `eas build --profile development` live. Show the dashboard queuing. *"And here's one I built earlier"* — pull up your phone (screen-mirrored, now running the dev-client version), Android install QR on the slide. Brief mention of EAS Update for OTA. Repo link stays up.

**Wrap (1 min).** Repo + QR stay on the slide.

### 0:57 – 1:00 — Junior takeaway + Q&A

Three habits when working with AI: read every diff, ask Claude to explain its choices, treat it as a mentor who can be wrong. Then Q&A.

## 5. The juicy stack — what we use and why

One sentence of justification per piece. This is the slide.

**Expo SDK** — managed RN, the default path in 2026, removes 90% of native config pain.

**Expo Router** — file-based routing. Mental model matches Next.js, which juniors likely know. Plus typed routes — compile-time safety on navigation params.

**TypeScript (strict)** — non-negotiable. Catches whole classes of bugs at compile time.

**TanStack Query** — server state. Handles caching, refetching, loading, errors, retries. Replaces ~80% of code juniors usually hand-roll.

**Zod** — runtime validation. The "don't trust the wire" library. Pairs with TanStack Query so every response is parsed and typed end-to-end.

**plain `StyleSheet.create`** — for the main demo, deliberately. The contrast in the closing makes Unistyles land harder.

**`expo-image`** — drop-in replacement for `Image`, dramatically better performance, built-in caching. One-line swap.

**Express** — for the BFF. Familiar to juniors who've touched Node, doesn't distract from the React Native story.

**`react-native-unistyles` (closing).** Production-grade styling. Web + native, variants at compile time, no re-renders on theme change. Requires the New Architecture, which motivates the dev-client beat.

**EAS Build (closing).** Cloud builds. No Xcode, no Android Studio, no Mac required.

**EAS Update (closing, brief).** OTA updates without app-store roundtrips.

**Deliberately not in the stack for this talk:** Zustand/Redux (no need), Reanimated (too time-expensive for the value), MMKV (no use case), React Hook Form (no forms), Sentry (off-topic). Each worth a Q&A mention if asked.

## 6. Modern dev tools

Six tools earn screen time during the build, visible in `package.json` and config files. Four more get a "weekend reading" mention.

### On the build slide

**Volta.** Node toolchain manager. Auto-switches versions based on `package.json`'s `"volta"` field. Faster than nvm. *"Volta pins Node — Bun is everything else."*

**Bun.** Package manager + script runner. About 25× faster than npm. Used here for `install` and `run` only; runtimes stay on Node (safe choice, avoids compatibility risk on stage).

**Biome.** Formatter + linter, replaces ESLint + Prettier. Rust-written, ~25× faster. Single config, single command.

**Lefthook.** Git hooks manager. YAML config, parallel hooks, replaces Husky + lint-staged in one tool. Faster than Husky.

**Syncpack.** Monorepo dependency version sync. Catches the "React is v18 in mobile, v19 in api" trap before it bites.

**Turborepo.** Task orchestration and caching for the monorepo. One-slide mention.

### Worth a weekend (closing slide)

**Knip** — finds unused exports, files, and dependencies. The "tidy up the repo" tool nobody knows about.

**commitlint + conventional commits** — pairs with Lefthook. Sets juniors up for downstream tooling (changelogs, semantic versioning).

**Bruno** — git-friendly Postman alternative. Collections live in your repo as `.bru` files.

**tsx** — modern TypeScript execution for Node, drop-in `ts-node` replacement.

## 7. The juicy practices

Twelve practices, each mapped to where it lands in the agenda. This is what makes the talk a masterclass rather than a tutorial.

1. **`CLAUDE.md` as a first-class engineering artifact.** Shown at minute ~12. Teaches juniors that *defining the rules* is engineering work.
2. **The BFF pattern with server-side caching.** Minute 10–14, then implicit throughout Loop 2. Teaches: don't always call third-party APIs from the client. Senior-engineer lesson juniors almost never hear.
3. **Shared types across the monorepo.** One TypeScript type imported by both Express and React Native. Loop 2. Teaches end-to-end type safety.
4. **TanStack Query for server state.** Loop 2. Teaches: stop hand-rolling `fetch` + `useState` + `useEffect`.
5. **Zod runtime validation.** Loop 2. Teaches: compile-time types aren't enough; the wire is untyped.
6. **Loading + error + empty states as first-class UI.** Loop 2. Teaches: this isn't optional.
7. **Expo Router with typed routes.** Loop 1 + Loop 3. Teaches: navigation params can be type-safe.
8. **`EXPO_PUBLIC_*` env variable conventions.** Loop 1 / Loop 2. Teaches: secrets vs public config.
9. **`expo-image` over `Image`.** Loop 1 polish. Teaches: there are better defaults.
10. **The AI pair workflow itself.** Woven through Loops 1–3. Prompt → review → refine. The meta-lesson of the entire talk.
11. **Testing as part of the dev cycle, with proper infrastructure.** Loop 2 sub-beats 2 and 3. Teaches: tests are easy when the setup is right, and AI handles the boilerplate.
12. **Unistyles + dev client + EAS Build (motivated, not introduced).** Reveal. Teaches: production-grade tooling exists when you need it, and is one command away.

## 8. Unit testing approach

**Decision: Option B — pre-baked infrastructure, Claude Code writes the specs live.**

The teaching split: juniors see the *infrastructure* (which is pre-baked and worth seeing), then watch Claude Code write the actual specs (which is what AI is great at).

### Stack

**Backend (Express).** Vitest + Supertest. Vitest is the modern Jest replacement: faster, ESM-native, drop-in API compatibility, native TypeScript. Supertest gives you HTTP-level testing of Express endpoints. The pattern: mock the GitHub upstream, hit your BFF endpoint, assert the reshaped response.

**Mobile (RN).** Jest + `@testing-library/react-native` + MSW. Jest is still the de facto for RN in 2026 (Vitest's RN support isn't there yet). RN Testing Library gives the same `getByText` / `getByRole` API juniors know from web. MSW (Mock Service Worker) mocks at the `fetch` level — render the screen, MSW intercepts, assert loading → success states.

**Shared types.** Vitest if needed; usually unnecessary.

**End-to-end (slide mention only).** Maestro. YAML-based, dramatically friendlier than Detox, the modern pick for RN E2E.

### Placement

Inside Loop 2, not bolted on afterward. Tests are part of the development cycle, not an afterthought — that's the lesson. See agenda for the three sub-beats.

## 9. Materials inventory

What we need to produce before the talk.

**A monorepo.** `apps/api` (Express BFF), `apps/mobile` (RN), shared types in `packages/types`. pnpm or bun workspaces. Three roles: backup if the live demo dies, reference for the audience after the talk, source of the "finished product" you screen-mirror in the hook.

**A starting-state RN app.** The t=0 of the live build. Expo project scaffolded, TypeScript strict, Expo Router configured, `EXPO_PUBLIC_API_BASE_URL` in `.env`, no-op API client stub, fonts loaded, empty `app/index.tsx`. `expo-image` and TanStack Query installed but unused. `jest.config.js`, `jest.setup.ts` with MSW boot, sample passing test. `biome.json`, `lefthook.yml`, `volta` field in `package.json`. `CLAUDE.md` in place.

**A starting-state Express BFF.** Fully built and running. `vitest.config.ts`, sample passing test, MSW handlers if used for upstream mocking. Pre-warmed response cache so the talk survives venue wifi failure.

**A pre-built EAS dev client.** Uploaded to internal distribution, with an Android-only install QR ready to put on the closing slide.

**A slide deck.** Approximately 10–12 slides total: title, finished-product hook (with Expo Go QR), RN in 2026, stack + dev tools (one or two slides), BFF concept, light loop transitions, test setup config slide (side-by-side panels of `vitest.config.ts`, `jest.config.js`, `jest.setup.ts`), Unistyles before/after, EAS dashboard screenshot, Android install QR, junior takeaway, repo link.

**A 30-second fallback recording** of the working app, in case both the live demo and the backup repo somehow die.

**A public GitHub repo** with the finished monorepo, ready to be made public the moment you walk off stage.

**A marketing one-pager** (already produced).

## 10. Pre-talk preparation checklist

### The week before

Build the full monorepo and run it end-to-end at least three times.

Configure `CLAUDE.md` against the real repo and iterate until Claude Code produces clean output for each of the three loops. Test each prompt at least twice — once cold, once warm — to confirm the output stays in scope.

Submit the EAS dev-client build. Takes 10–15 minutes in the cloud — do not leave this to the day-of.

Pre-warm the BFF cache so the demo survives a wifi failure. The cache means even if the venue wifi dies, your server keeps serving cached data over your local network.

Generate the Android install QR from the EAS internal-distribution URL and bake it into the closing slide.

Dry-run the full 60 minutes against a timer at least once end-to-end (see Task #9).

### The day of

Charge phone fully.

Bring USB cable and screen-mirroring setup (QuickTime for iOS, scrcpy as backup for Android).

Confirm venue wifi. If unreliable, set up a cellular hotspot. Connect your laptop and phone to the same network so they can reach the local BFF.

Test screen-share resolution from where you'll stand. The text on the test-setup slide is the hardest to read from the back of the room — verify it's legible.

Open every tab and terminal you'll need *before* the talk starts. Never alt-tab into *"wait, what was that command"* on stage. Recommended state: editor with the starting-state repo open, terminal with `bun run dev` ready to fire, browser tabs for the EAS dashboard, slide deck, and the GitHub repo.

Have the backup repo on a separate git branch and confirm `git checkout loop-1-end`, `loop-2-end`, `loop-3-end` all work.

## 11. Risk and contingency

Risks, ranked by likelihood × impact.

**Venue wifi dies.** *Likelihood: medium. Impact: high.* Mitigation: cellular hotspot as backup, BFF runs locally so it's wifi-independent, pre-warmed cache, audience phones already connected to Expo Go before the build starts.

**Claude Code produces something broken on stage.** *Likelihood: medium. Impact: low if handled, high if not.* This is actually *good* on stage if handled well — it's a teaching moment about reviewing AI output. Backup: git checkpoints at end of each loop (`git tag loop-1-end`, `loop-2-end`, `loop-3-end`), so worst case you `git checkout` to the prior good state and keep moving.

**You realize live you're behind on time.** *Likelihood: medium. Impact: medium.* Each loop has a clear "minimum acceptable end state." Loop 3 can be cut entirely if Loops 1–2 ran long — the talk still works, the reveal still lands.

**EAS dashboard slow to load or has an outage.** *Likelihood: low. Impact: medium.* Pre-load the dashboard in a tab before the talk starts. Take screenshots as a slide-deck fallback in case the live dashboard refuses to cooperate.

**Catastrophic everything-broken.** *Likelihood: very low. Impact: very high.* The 30-second fallback recording is the floor. You can still narrate the slides, the architecture, and the lessons. The audience will not know you were supposed to do a live build if you don't tell them.

**Audience phones don't connect to Expo Go.** *Likelihood: low. Impact: low.* Demo still works on your screen-mirrored phone. Briefly call it out with a "if you're not seeing it on your phone, the wifi might be a bit flaky — you'll still see everything on the screen."

## 12. Open items

These are the implementation tasks that flow from this plan.

`CLAUDE.md` — write the actual file. Sections: project context (2–3 lines); stack (short list); file structure; API client and Zod conventions; TanStack Query conventions; testing conventions (Vitest + Jest + MSW); behavioral guardrails ("ask before installing libraries", "prefer minimal diffs", "when unsure, ask one clarifying question"); style (function components, named exports except for Expo Router route files, no `any`).

Starting-state RN repo — list every file and dep that's pre-baked at t=0. Includes Babel config (no Unistyles plugin yet — that comes in the closing), TypeScript config, Expo Router setup, theme tokens, env scaffolding, the test infrastructure, all six dev tools wired up.

Starting-state Express BFF — fully built and tested. Trending endpoint, repo detail endpoint, GitHub proxy with a personal access token in `.env`, in-memory or filesystem cache with a generous TTL.

Unistyles before/after example — pick the exact component (likely the language or topic tag pill on a repo card) and prepare the side-by-side slide.

Prompt scripts for each of the three loops — the actual words you'll type into Claude Code, plus the accept/reject narration you'll provide in voice.

Slide deck — outline first, then build. Approximately 10–12 slides.

Concrete pre-flight checklist on the printed page you bring to the venue.

Full dry-run against a timer.

---

## Appendix — Marketing one-pager

Already delivered. Title: *"Modern React Native in 60 Minutes."* Subtitle: *"A live build with Claude Code — Expo, TypeScript, TanStack Query, Zod, EAS, and the modern dev stack."* Bio: *"Technical Team Lead @ Link Engine Management · 20+ years across OOP, frontend & mobile. C#, .NET, Python, TypeScript, React & React Native."* Accent color `#A86FD9` — a brightened version of the Link brand purple `#3F1951`, harmonized with the logo's purple mascot body.
