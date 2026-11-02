export interface CameraRange {
  start: number
  end: number
}

export interface JourneyBlend {
  from: number
  to: number
  mix: number
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export const smoothstep = (value: number) => {
  const t = clamp01(Number.isFinite(value) ? value : 0)
  return t * t * (3 - 2 * t)
}

const normalizedRange = (range: CameraRange): CameraRange => {
  const start = Number.isFinite(range.start) ? range.start : 0
  const end = Number.isFinite(range.end) ? range.end : start

  return start <= end ? { start, end } : { start: end, end: start }
}

export const resolveJourney = (
  scrollY: number,
  ranges: readonly CameraRange[],
): JourneyBlend => {
  if (ranges.length === 0) return { from: 0, to: 0, mix: 0 }

  const y = Number.isFinite(scrollY) ? scrollY : 0
  const first = normalizedRange(ranges[0])
  if (y <= first.end) return { from: 0, to: 0, mix: 0 }

  for (let index = 1; index < ranges.length; index += 1) {
    const current = normalizedRange(ranges[index])
    if (y > current.end) continue

    if (y >= current.start) {
      return { from: index, to: index, mix: 0 }
    }

    const previous = normalizedRange(ranges[index - 1])
    if (y <= previous.end || current.start <= previous.end) {
      return { from: index - 1, to: index - 1, mix: 0 }
    }

    const mix = smoothstep((y - previous.end) / (current.start - previous.end))
    return { from: index - 1, to: index, mix }
  }

  const last = ranges.length - 1
  return { from: last, to: last, mix: 0 }
}
