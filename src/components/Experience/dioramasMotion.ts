export function shouldUseDioramasScroll(reducedMotion: boolean) {
  return !reducedMotion
}

export type DioramasWorldStatus = 'loading' | 'ready' | 'fallback'

export function shouldShowDioramasFallback(status: DioramasWorldStatus) {
  return status === 'fallback'
}

export interface DioramasRuntime {
  mobile: boolean
  pixelRatio: number
  frameInterval: number
}

export function getDioramasRuntime(
  viewportWidth: number,
  devicePixelRatio: number,
): DioramasRuntime {
  const mobile = viewportWidth < 768

  return {
    mobile,
    pixelRatio: Math.min(devicePixelRatio, mobile ? 1.15 : 1.5),
    frameInterval: mobile ? 1000 / 30 : 0,
  }
}
