import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const heroSource = readFileSync(new URL('../src/components/Hero/Hero.tsx', import.meta.url), 'utf8')
const scrollSource = readFileSync(
  new URL('../src/components/Experience/DioramasScroll.tsx', import.meta.url),
  'utf8',
)
const worldSource = readFileSync(
  new URL('../src/components/Experience/DioramasWorld.tsx', import.meta.url),
  'utf8',
)
const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

test('mounts exactly one persistent Dioramas world', () => {
  assert.equal((appSource.match(/<DioramasWorld\s*\/>/g) ?? []).length, 1)
})

test('keeps the hero static logo as fallback instead of creating a second renderer', () => {
  assert.equal(heroSource.includes('HeroLogo3D'), false)
  assert.equal(heroSource.includes('dioramas-static-logo'), true)
})

test('styles the fixed world and reveals the static logo when WebGL is unavailable', () => {
  assert.equal(cssSource.includes('.dioramas-world'), true)
  assert.equal(cssSource.includes("html[data-dioramas-fallback='true'] .dioramas-static-logo"), true)
  assert.equal(cssSource.includes("html[data-dioramas-ready='true'] .dioramas-static-logo"), true)
})

test('loads Lenis base styles so native smooth scrolling cannot fight the scroll engine', () => {
  assert.equal(scrollSource.includes("import 'lenis/dist/lenis.css'"), true)
})

test('reacts when reduced-motion preference changes after the page has loaded', () => {
  assert.equal(
    scrollSource.includes("motionQuery.addEventListener('change', onMotionPreferenceChange)"),
    true,
  )
  assert.equal(
    worldSource.includes("motionQuery.addEventListener('change', onMotionPreferenceChange)"),
    true,
  )
})

test('remeasures camera ranges when section dimensions change', () => {
  assert.equal(worldSource.includes('journeyResizeObserver.observe(section)'), true)
  assert.equal(worldSource.includes('journeyResizeObserver.disconnect()'), true)
})
