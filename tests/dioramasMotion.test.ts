import assert from 'node:assert/strict'
import test from 'node:test'

import {
  shouldShowDioramasFallback,
  getDioramasRuntime,
  shouldUseDioramasScroll,
} from '../src/components/Experience/dioramasMotion.ts'

test('does not start cinematic scrolling when reduced motion is requested', () => {
  assert.equal(shouldUseDioramasScroll(true), false)
})

test('starts cinematic scrolling when reduced motion is not requested', () => {
  assert.equal(shouldUseDioramasScroll(false), true)
})

test('recomputes mobile camera and render limits when the viewport crosses the breakpoint', () => {
  assert.deepEqual(getDioramasRuntime(1280, 2), {
    mobile: false,
    pixelRatio: 1.5,
    frameInterval: 0,
  })
  assert.deepEqual(getDioramasRuntime(390, 2), {
    mobile: true,
    pixelRatio: 1.15,
    frameInterval: 1000 / 30,
  })
})

test('keeps the static logo hidden unless the 3D world reports a fallback', () => {
  assert.equal(shouldShowDioramasFallback('loading'), false)
  assert.equal(shouldShowDioramasFallback('ready'), false)
  assert.equal(shouldShowDioramasFallback('fallback'), true)
})
