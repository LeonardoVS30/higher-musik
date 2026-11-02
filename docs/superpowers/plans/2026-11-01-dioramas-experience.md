# HIGHER MUSIK Dioramas Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero-only 3D treatment with a lightweight, persistent Dioramas-style world whose camera and energy state follow every existing page section.

**Architecture:** A pure journey module measures and resolves section camera blends; a single fixed `DioramasWorld` owns the Three.js renderer and consumes those states. `App` mounts the world once, while the current content tree stays intact and `Hero` stops creating a second WebGL renderer.

**Tech Stack:** React 18, TypeScript, Three.js 0.185, Framer Motion, Lenis 1.3, Node test runner, Vite.

**Spec:** `docs/superpowers/specs/2026-11-01-dioramas-experience-design.md`

## Global Constraints

- Preserve `DESIGN.md`, `PRODUCT.md`, existing content, route IDs, data files, and all unrelated dirty-worktree changes.
- No external service, credential, generated model, GLB, new animation framework, or fabricated content.
- Reduced motion must render a static frame and disable pointer/press motion.
- Touch keeps native scrolling; mobile rendering is capped near 30 fps and DPR 1.15.
- Stage only exact task files; never use `git add -A` or overwrite unrelated edits.

## Review Focus

- Missing or reordered section IDs must fall back to a valid nearest shot instead of producing `NaN` camera values.
- Zero-height or overlapping ranges must resolve deterministically without division by zero.
- WebGL construction or texture loading failure must leave the complete page and static hero logo visible.
- Reduced-motion users must not start continuous animation or pointer/press responses.
- Resize, tab visibility, HMR, and unmount must not leave duplicate canvases, animation frames, or event listeners.

---

### Task 1: Journey resolver

**Files:**
- Create: `src/components/Experience/dioramasJourney.ts`
- Create: `tests/dioramasJourney.test.ts`

**Interfaces:**
- Produces: `CameraRange`, `JourneyBlend`, `smoothstep(value)`, and `resolveJourney(scrollY, ranges)` for the renderer.

- [ ] **Step 1: Write failing tests** for hold ranges, eased gaps, zero-length ranges, and scroll positions outside the measured document.
- [ ] **Step 2: Run** `npm test -- tests/dioramasJourney.test.ts` and confirm the assertions fail because the resolver is missing.
- [ ] **Step 3: Implement** `resolveJourney(scrollY: number, ranges: readonly CameraRange[]): JourneyBlend` with clamped indices and cubic smoothstep.
- [ ] **Step 4: Run** `npm test -- tests/dioramasJourney.test.ts` and then `npm test`; expect all tests to pass.
- [ ] **Step 5: Commit only** the resolver and its test with `feat: add Dioramas journey resolver` if the user requests a commit.

### Task 2: Persistent procedural world

**Files:**
- Create: `src/components/Experience/DioramasWorld.tsx`
- Create: `src/components/Experience/dioramasShots.ts`
- Test: `tests/dioramasJourney.test.ts`

**Interfaces:**
- Consumes: `resolveJourney(scrollY, ranges)` from Task 1 and existing section IDs from `App`.
- Produces: default React component `DioramasWorld` with no props.

- [ ] **Step 1: Add failing table assertions** proving every current section ID maps to finite desktop and mobile camera targets.
- [ ] **Step 2: Run the targeted test** and confirm it fails for the missing shot table.
- [ ] **Step 3: Implement the shot table** for `top`, `artists`, `release`, `about`, `services`, `store`, `community`, and `contact-cta`.
- [ ] **Step 4: Implement `DioramasWorld`** with one renderer, the existing logo texture, layered holographic planes, restrained rings/waveform particles, pointer damping, press pulse, measured section ranges, and full cleanup.
- [ ] **Step 5: Add static/WebGL/reduced-motion fallbacks** and mobile DPR/frame-rate limits from the spec.
- [ ] **Step 6: Run** `npm test` and `npm run build`; expect zero failures.
- [ ] **Step 7: Commit only** the world, shot table, resolver test additions, and required package metadata if requested.

### Task 3: Integrate the world without disturbing content

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Hero/Hero.tsx`
- Modify: `src/index.css`
- Delete only if now unused: `src/components/Hero/HeroLogo3D.tsx`

**Interfaces:**
- Consumes: `DioramasWorld` from Task 2.
- Produces: one fixed decorative canvas behind the unchanged section tree.

- [ ] **Step 1: Mount `DioramasWorld` once** beside `DioramasScroll` in `App`.
- [ ] **Step 2: Replace the hero's local WebGL renderer** with the existing static logo fallback while preserving all hero copy, links, and current scroll transforms.
- [ ] **Step 3: Add only the CSS needed** for the fixed world, content contrast veils, `overflow-x: clip`, and reduced-motion visibility; reuse existing tokens.
- [ ] **Step 4: Run** `npm test`, `npm run lint`, and `npm run build`; expect tests/build to pass and lint to have no new warning.
- [ ] **Step 5: Commit only** the integration files if requested.

### Task 4: Visual and performance verification

**Files:**
- Modify only files identified by observed defects in Tasks 1–3.

**Interfaces:**
- Consumes: the complete local site.
- Produces: verified desktop and mobile experience with no console errors.

- [ ] **Step 1: Start the local Vite server** and inspect scroll stops at hero, roster, release, services, store, and contact on 1280×800.
- [ ] **Step 2: Inspect 390×844** for content legibility, native touch behavior, static/fallback composition, and horizontal overflow.
- [ ] **Step 3: Inspect reduced motion and WebGL failure paths**; all content and the static logo must remain visible.
- [ ] **Step 4: Check console output and renderer lifecycle**, then fix only confirmed defects.
- [ ] **Step 5: Run one fresh final verification:** `npm test && npm run lint && npm run build`.
