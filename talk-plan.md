# Talk Plan: Modern React Native in 60 Minutes

A live build with Claude Code — Expo, TypeScript, TanStack Query, Zod, EAS, and the modern dev stack.

**Speaker:** Shane Zheng — Technical Team Lead @ Link Engine Management
**Audience:** Juniors and students at a local IT club
**Duration:** 60 minutes
**Format:** Live demo running on Shane's dev client, screen-mirrored to the projector. Android EAS internal-distribution QR available from the start of the talk for any audience member who wants to install the dev client and follow along — best-case bonus, never depended on.

---

## Status at a glance

**Locked**

- 60-minute agenda structure (revised for Option 2 — Unistyles throughout, dev client from minute zero)
- Distribution strategy: screen-mirror primary, Android EAS QR available best-case
- Demo app: trending GitHub repos, served via a thin Express BFF
- Full stack and tooling inventory — Unistyles is the only styling system, used from day 1
- Testing approach (Option B — pre-baked infrastructure, Claude Code writes the specs live)
- `CLAUDE.md` written and committed
- Marketing one-pager (delivered)

**Open**

- Live-demo starting state (what's in the RN repo at t=0)
- Prompt scripts for each of the three loops
- Slide deck (outline + build)
- Concrete pre-flight checklist
- Full dry-run against a timer

---

## 1. Objectives

The talk succeeds if every junior in the room leaves able to answer three questions.

What does a modern, production-grade React Native project look like in 2026? Not a tutorial app — a real one, with the choices a senior engineer would actually ship.

Why does each library or pattern in the stack exist, and what problem does it solve? The talk should send people home with a list of things they didn't know existed, and a one-line reason each.

How do you use an AI pair programmer (Claude Code) as a senior engineer would — driving it, reviewing its output, knowing when to overrule it?

If a single junior in the room takes one library or tool home and tries it next weekend, the talk worked.

## 2. Audience

Juniors and students at a local IT club. Mixed backgrounds, mostly stronger in web (HTML/CSS/JS) than in mobile-specific concerns. Genuinely curious about both React Native and AI-assisted development. Watching the build on the projector via a screen-mirrored phone running the dev client. Any Android attendee who installs the EAS dev-client APK via the QR on the opening slide can follow along on their own phone — a best-case bonus, not a requirement.

A junior audience changes one thing in talk design: every new concept needs a one-sentence motivation. The talk's structure is built around *motivating* the next library or pattern with the limitation of the previous one — that's what makes the stack land instead of feeling like a name-drop.

## 3. Narrative arc

Four acts.

**Setup.** Frame the talk, show the finished product, plant the seeds. About 14 minutes.

**Build.** Three live loops with Claude Code, screen-mirrored from a dev client on Shane's phone. Unistyles is in use from minute zero. About 34 minutes.

**Closing.** Why this stack works the way it does — a quick walkthrough of what Unistyles bought us in the code, followed by how the app got onto a real device via EAS Build. About 7 minutes.

**Empower.** Junior takeaway, Q&A. About 5 minutes.

The build act is where they learn to fish. The closing reframes what they just saw with a senior-engineer lens — and shows them how to actually ship it.

## 4. Detailed agenda

```
0:00 – 0:05  Hook
0:05 – 0:10  RN in 2026 + Claude Code framing
0:10 – 0:14  Stack + modern dev tools + the BFF
0:14 – 0:23  Loop 1 — Scaffold (9 min)
0:23 – 0:40  Loop 2 — Real data + tests (17 min)
0:40 – 0:48  Loop 3 — Detail screen + typed routes + pull-to-refresh (8 min)
0:48 – 0:55  Closing — Unistyles walkthrough + dev client + EAS Build (7 min)
0:55 – 1:00  Junior takeaway + Q&A
```

### 0:00 – 0:05 — Hook

Show finished app on screen-mirrored phone. Android EAS install QR on the slide ("Android attendees: scan to install and follow along — iOS, you'll watch on the screen"). Frame the hour. *"By the end, you'll know how this app was built, how it got onto a real device, and how to use AI without becoming dependent on it."*

### 0:05 – 0:10 — RN in 2026 + Claude Code framing

Slide-driven. Why Expo, why one codebase, why now. Frame Claude Code as a pair programmer: not a magic wand, but "an engineer who reads docs faster than you." Plant the *"you stay in charge"* message that supports the closing takeaway.

### 0:10 – 0:14 — Stack + modern dev tools + the BFF

One slide with the full stack and tools inventory (see Section 5). One slide on the BFF concept: *"Our backend isn't GitHub. It's a small Express app that proxies GitHub and caches the response — here's why we did that, in one breath."* Curl one endpoint live, JSON appears, move on. Show `CLAUDE.md` briefly — narrate that *defining the conventions* is itself an engineering act.

### 0:14 – 0:23 — Loop 1 — Scaffold

Expo Router file-based screen, list of repos with mock data, `expo-image` for fast image rendering, theme tokens already in `src/theme.ts`, Unistyles variants from the start (tag pill colored by language). Read every diff aloud. Screen updates.

### 0:23 – 0:40 — Loop 2 — Real data + tests

The teaching beat of the talk. Three sub-beats:

**0:23 – 0:32 — Implementation (9 min).** API client, Zod schemas, TanStack Query hook with proper loading + error + empty states. Wire to the list screen. Real data flows. Real cheer moment.

**0:32 – 0:34 — Test setup tour (2 min).** Pull up a slide showing the pre-baked test infrastructure: `vitest.config.ts` for the BFF, `jest.config.js` + `jest.setup.ts` for mobile, MSW handlers wired up, scripts in `package.json`. Narrate each piece in one sentence. The point isn't to teach the configs in depth — it's to show juniors what a properly-set-up test environment looks like.

**0:34 – 0:40 — Claude writes the tests (6 min).** Hand it to Claude Code: *"Write a Vitest test for the BFF's `/api/repos/trending` endpoint, mocking the GitHub upstream, asserting the reshaped response. Then write an RN Testing Library test for the trending-repos screen using MSW to mock my BFF, asserting loading → success states."* Read the diff aloud. Run `bun run test`. Green. Cheer moment #2.

### 0:40 – 0:48 — Loop 3 — Detail screen + typed routes + pull-to-refresh

Expo Router file-based detail route with typed params, navigation, and a pull-to-refresh on the list. The polish loop. Highlights what typed routes catch at compile time.

### 0:48 – 0:55 — Closing — Unistyles walkthrough + dev client + EAS Build

**Unistyles walkthrough (2 min).** Pull up the tag pill component you've been using since Loop 1. Walk through the Unistyles variant pattern — variants, themes, web/native parity, no re-renders. *"This is what's been quietly making the styling clean. Worth knowing about."* Not a reveal — a callout.

**Why a dev client (1 min).** *"Notice we haven't used Expo Go all talk. Unistyles needs the New Architecture, plus production apps eventually want native modules. That means a dev client."* Introduce the concept.

**EAS Build (4 min).** Run `eas build --profile development` live. Show the dashboard queuing. *"And here's the one running on my phone right now."* Android install QR stays up on the closing slide. Brief mention of EAS Update for OTA.

### 0:55 – 1:00 — Junior takeaway + Q&A

Three habits when working with AI: read every diff, ask Claude to explain its choices, treat it as a mentor who can be wrong. Then Q&A — five minutes is enough for two or three good questions.

## 5. The juicy stack — what we use and why

One sentence of justification per piece. This is the slide.

**Expo SDK** — managed RN, the default path in 2026, removes 90% of native config pain.

**Expo Router** — file-based routing. Mental model matches Next.js, which juniors likely know. Plus typed routes — compile-time safety on navigation params.

**TypeScript (strict)** — non-negotiable. Catches whole classes of bugs at compile time.

**TanStack Query** — server state. Handles caching, refetching, loading, errors, retries. Replaces ~80% of code juniors usually hand-roll.

**Zod** — runtime validation. The "don't trust the wire" library. Pairs with TanStack Query so every response is parsed and typed end-to-end.

**`react-native-unistyles`** — used from day 1. Variants at compile time, themes, web + native parity, no re-renders on theme change. Locked as the only styling system; `StyleSheet` from `react-native` is forbidden in this codebase.

**`expo-image`** — drop-in replacement for `Image`, dramatically better performance, built-in caching. One-line swap.

**Express** — for the BFF. Familiar to juniors who've touched Node, doesn't distract from the React Native story.

**EAS Build** — cloud builds. No Xcode, no Android Studio, no Mac required. Covered in the closing as "how this app got onto a real device."

**EAS Update (brief mention in closing)** — OTA updates without app-store roundtrips.

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
12. **Unistyles, dev client, and EAS Build as a connected story.** Unistyles is in the code from Loop 1, surfaces explicitly in the closing walkthrough. Then framed: this stack needs the New Architecture, which needs a dev client, which means EAS Build. Teaches: production-grade tooling exists when you need it, and is one command away.

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

**A starting-state RN app.** The t=0 of the live build. Expo project scaffolded, TypeScript strict, Expo Router configured, `EXPO_PUBLIC_API_BASE_URL` in `.env`, no-op API client stub, fonts loaded, empty `app/index.tsx`. `expo-image` and TanStack Query installed but unused. **Unistyles fully wired**: `react-native-unistyles/plugin` in `babel.config.js`, `StyleSheet.configure(...)` called once at startup, `src/theme.ts` and `src/breakpoints.ts` defined with the design tokens. `jest.config.js`, `jest.setup.ts` with MSW boot, sample passing test. `biome.json`, `lefthook.yml`, `volta` field in `package.json`. `CLAUDE.md` in place.

**A starting-state Express BFF.** Fully built and running. `vitest.config.ts`, sample passing test, MSW handlers if used for upstream mocking. Pre-warmed response cache so the talk survives venue wifi failure.

**A pre-built EAS dev client.** Uploaded to internal distribution, with an Android-only install QR ready to put on the closing slide.

**A slide deck.** Approximately 10–12 slides total: title, finished-product hook (with Android EAS install QR), RN in 2026, stack + dev tools (one or two slides), BFF concept, light loop transitions, test setup config slide (side-by-side panels of `vitest.config.ts`, `jest.config.js`, `jest.setup.ts`), Unistyles code walkthrough, EAS dashboard screenshot, Android install QR, junior takeaway, repo link.

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

**Venue wifi dies.** *Likelihood: medium. Impact: medium.* The demo runs on your dev client over local network to the BFF — wifi only matters for the EAS Build dashboard at the end. Mitigation: cellular hotspot as backup, BFF runs locally on your laptop, pre-warmed cache. EAS dashboard pre-loaded with screenshots-on-slides as a fallback.

**Claude Code produces something broken on stage.** *Likelihood: medium. Impact: low if handled, high if not.* This is actually *good* on stage if handled well — it's a teaching moment about reviewing AI output. Backup: git checkpoints at end of each loop (`git tag loop-1-end`, `loop-2-end`, `loop-3-end`), so worst case you `git checkout` to the prior good state and keep moving.

**You realize live you're behind on time.** *Likelihood: medium. Impact: medium.* Each loop has a clear "minimum acceptable end state." Loop 3 can be cut entirely if Loops 1–2 ran long — the talk still works, the reveal still lands.

**EAS dashboard slow to load or has an outage.** *Likelihood: low. Impact: medium.* Pre-load the dashboard in a tab before the talk starts. Take screenshots as a slide-deck fallback in case the live dashboard refuses to cooperate.

**Catastrophic everything-broken.** *Likelihood: very low. Impact: very high.* The 30-second fallback recording is the floor. You can still narrate the slides, the architecture, and the lessons. The audience will not know you were supposed to do a live build if you don't tell them.

**Pre-installed Android attendees don't sync.** *Likelihood: low. Impact: very low.* Demo runs on your screen-mirrored phone regardless. If a few Android attendees can follow on their own devices, great — if not, no one notices.

## 12. Open items

These are the implementation tasks that flow from this plan.

**Starting-state RN repo** — every file and dep that's pre-baked at t=0. Expo project with TypeScript strict, Expo Router, `expo-image` + TanStack Query installed (unused), **Unistyles fully wired** (Babel plugin + `StyleSheet.configure` + `src/theme.ts`), Biome + Lefthook + Volta pinned, Jest + MSW pre-configured with a sample passing test. `CLAUDE.md` is in place.

**Starting-state Express BFF** — fully built and tested. Trending endpoint, repo detail endpoint, GitHub proxy with a personal access token in `.env`, in-memory or filesystem cache with a generous TTL. Vitest + Supertest tests.

**Prompt scripts for each of the three loops** — the actual words you'll type into Claude Code, plus the accept/reject narration you'll provide in voice.

**Slide deck** — outline first, then build. Approximately 10–12 slides.

**Concrete pre-flight checklist** on the printed page you bring to the venue.

**Full dry-run against a timer.**

---

## Appendix — Marketing one-pager

Already delivered. Title: *"Modern React Native in 60 Minutes."* Subtitle: *"A live build with Claude Code — Expo, TypeScript, TanStack Query, Zod, EAS, and the modern dev stack."* Bio: *"Technical Team Lead @ Link Engine Management · 20+ years across OOP, frontend & mobile. C#, .NET, Python, TypeScript, React & React Native."* Accent color `#A86FD9` — a brightened version of the Link brand purple `#3F1951`, harmonized with the logo's purple mascot body.
