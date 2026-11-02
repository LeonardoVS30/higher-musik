# HIGHER MUSIK Dioramas Experience Design

## Intent

Turn the current single-page site into a continuous cinematic 3D journey using the Dioramas method: one persistent world, section-specific camera states, eased transitions, a discoverable interaction, and deliberate mobile/reduced-motion fallbacks. Preserve the existing HIGHER MUSIK content, navigation, data files, and the locked visual system in `DESIGN.md`.

## Goals

- Keep one fixed Three.js canvas alive across the page instead of limiting 3D to the hero.
- Give every existing section a distinct, composed camera state without changing its content hierarchy.
- Use the supplied HIGHER MUSIK logo as the scene's protagonist, supported by restrained procedural rings, waveform lines, and particles.
- Add one signature interaction: pointer or press energy that bends light and briefly expands the waveform around the logo.
- Keep scroll native on touch, use the already installed Lenis layer for wheel smoothing, and respect `prefers-reduced-motion`.
- Keep the scene lightweight enough for the existing Vite/React deployment: no GLB download, no AI generation, no external runtime service.

## Non-goals

- Do not import Dioramas' 330 MB model library or copy one of its fictional brands.
- Do not use `fal.ai`, Meshy, credentials, or paid generation.
- Do not rewrite the site's verified copy, roster, releases, services, store, or navigation.
- Do not replace the current design tokens, fonts, restrained violet palette, or content components.
- Do not add a second animation framework; Framer Motion, Three.js, and Lenis remain the runtime stack.

## Approaches considered

### Full Dioramas fork

Copy the framework, post stack, examples, and models into the project. This gives maximum visual fidelity but adds hundreds of megabytes, duplicate build infrastructure, more dependencies, and a high regression risk. Rejected.

### Hero-only adaptation

Improve the current holographic logo and leave the rest of the site unchanged. This is the smallest change but does not satisfy Dioramas' defining principle that the 3D scene is the page. Rejected.

### Persistent procedural world — selected

Build a focused React/Three.js scene from the existing logo and procedural geometry, mount it once in `App`, and drive camera targets from the real section positions. This applies Dioramas' method while preserving the current product and keeping download weight controlled.

## Experience

- **Hero:** close frontal logo, slow arrival, restrained ultraviolet edge light.
- **Roster:** camera shifts laterally and the particle field opens into a constellation.
- **Release:** camera lowers and the rings read like record grooves around the featured single.
- **About:** wider, quieter composition with reduced particle energy.
- **Services:** three staggered waveform bands suggest production layers.
- **Store:** logo recedes and the rings become a precise product-stage halo.
- **Community/contact:** scene returns frontal, gathers the particles, and ends with a calm resolved frame.
- **Signature interaction:** pointer movement introduces subtle parallax; pressing anywhere outside an interactive control produces one short energy pulse. It never captures clicks or blocks the UI.

## Performance and accessibility

- Desktop DPR capped at 1.5; mobile DPR capped at 1.15 and render rate capped near 30 fps.
- Pause rendering when the canvas is outside the document visibility lifecycle.
- Dispose every geometry, material, texture, observer, and event listener on unmount.
- Reduced motion shows one static composed frame and disables pointer/press responses and Lenis.
- WebGL failure falls back to the existing static logo with all content usable.
- The canvas is decorative (`aria-hidden`) and never receives focus.

## Constraints

- Work around the current dirty worktree; do not revert or reformat unrelated user changes.
- Reuse `public/images/branding/hm-mark-large.png` and existing colour tokens.
- New behavioral math must be test-first and runnable with the existing Node test command.
- Verify with tests, lint, production build, and desktop/mobile visual inspection.
