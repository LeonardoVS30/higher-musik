import assert from 'node:assert/strict'
import test from 'node:test'

import {
  resolveJourney,
  smoothstep,
  type CameraRange,
} from '../src/components/Experience/dioramasJourney.ts'
import {
  DIORAMAS_SECTION_IDS,
  getDioramasShot,
} from '../src/components/Experience/dioramasShots.ts'

const ranges: readonly CameraRange[] = [
  { start: 0, end: 100 },
  { start: 200, end: 300 },
  { start: 400, end: 500 },
]

test('holds the active camera while scroll is inside a section range', () => {
  assert.deepEqual(resolveJourney(50, ranges), { from: 0, to: 0, mix: 0 })
  assert.deepEqual(resolveJourney(250, ranges), { from: 1, to: 1, mix: 0 })
})

test('uses cubic smoothstep while crossing a gap between sections', () => {
  assert.equal(smoothstep(0.25), 0.15625)
  assert.equal(smoothstep(0.5), 0.5)
  assert.deepEqual(resolveJourney(150, ranges), { from: 0, to: 1, mix: 0.5 })
})

test('clamps camera indices before the first and after the last range', () => {
  assert.deepEqual(resolveJourney(-100, ranges), { from: 0, to: 0, mix: 0 })
  assert.deepEqual(resolveJourney(900, ranges), { from: 2, to: 2, mix: 0 })
})

test('resolves zero-length and overlapping ranges without invalid values', () => {
  const zeroLength = resolveJourney(100, [
    { start: 100, end: 100 },
    { start: 100, end: 100 },
  ])
  const overlapping = resolveJourney(150, [
    { start: 0, end: 200 },
    { start: 100, end: 300 },
  ])

  assert.deepEqual(zeroLength, { from: 0, to: 0, mix: 0 })
  assert.deepEqual(overlapping, { from: 0, to: 0, mix: 0 })
  assert.equal(Number.isFinite(zeroLength.mix), true)
  assert.equal(Number.isFinite(overlapping.mix), true)
})

test('returns a safe default when no sections are measured', () => {
  assert.deepEqual(resolveJourney(200, []), { from: 0, to: 0, mix: 0 })
})

test('maps every page section to finite desktop and mobile camera targets', () => {
  assert.deepEqual(DIORAMAS_SECTION_IDS, [
    'top',
    'artists',
    'release',
    'about',
    'services',
    'store',
    'community',
    'contact-cta',
  ])

  for (const id of DIORAMAS_SECTION_IDS) {
    const shot = getDioramasShot(id)

    for (const mode of [shot.desktop, shot.mobile]) {
      assert.equal(mode.camera.every(Number.isFinite), true, `${id} camera`)
      assert.equal(mode.lookAt.every(Number.isFinite), true, `${id} lookAt`)
      assert.equal(Number.isFinite(mode.fov), true, `${id} fov`)
      assert.equal(Number.isFinite(mode.logoScale), true, `${id} logoScale`)
      assert.equal(Number.isFinite(mode.ringScale), true, `${id} ringScale`)
    }
  }
})

test('falls back to the nearest valid opening shot for an unknown section', () => {
  assert.equal(getDioramasShot('missing-section').id, 'top')
})
