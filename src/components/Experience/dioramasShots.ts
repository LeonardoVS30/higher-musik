export type Vec3Tuple = readonly [number, number, number]

export interface DioramasShotState {
  camera: Vec3Tuple
  lookAt: Vec3Tuple
  fov: number
  logoScale: number
  logoRotation: number
  ringScale: number
  particleOpacity: number
  energy: number
}

export interface DioramasShot {
  id: string
  desktop: DioramasShotState
  mobile: DioramasShotState
}

export const DIORAMAS_SECTION_IDS = [
  'top',
  'artists',
  'release',
  'about',
  'services',
  'store',
  'community',
  'contact-cta',
] as const

const shot = (
  id: (typeof DIORAMAS_SECTION_IDS)[number],
  desktop: DioramasShotState,
  mobile: DioramasShotState,
): DioramasShot => ({ id, desktop, mobile })

export const DIORAMAS_SHOTS: readonly DioramasShot[] = [
  shot(
    'top',
    {
      camera: [0, 0.08, 8.2],
      lookAt: [0, 0, 0],
      fov: 34,
      logoScale: 1.12,
      logoRotation: -0.025,
      ringScale: 1,
      particleOpacity: 0.56,
      energy: 0.72,
    },
    {
      camera: [0, 0.1, 9.8],
      lookAt: [0, 0, 0],
      fov: 40,
      logoScale: 0.92,
      logoRotation: -0.018,
      ringScale: 0.92,
      particleOpacity: 0.36,
      energy: 0.56,
    },
  ),
  shot(
    'artists',
    {
      camera: [-2.65, 0.46, 8.65],
      lookAt: [-0.15, 0.05, 0],
      fov: 38,
      logoScale: 0.88,
      logoRotation: 0.12,
      ringScale: 1.18,
      particleOpacity: 0.44,
      energy: 0.48,
    },
    {
      camera: [-0.72, 0.4, 10.4],
      lookAt: [0, 0.08, 0],
      fov: 42,
      logoScale: 0.76,
      logoRotation: 0.06,
      ringScale: 1.04,
      particleOpacity: 0.3,
      energy: 0.38,
    },
  ),
  shot(
    'release',
    {
      camera: [2.34, -0.24, 7.45],
      lookAt: [0.12, -0.06, 0],
      fov: 32,
      logoScale: 1.04,
      logoRotation: -0.11,
      ringScale: 1.3,
      particleOpacity: 0.62,
      energy: 0.86,
    },
    {
      camera: [0.82, -0.18, 9.5],
      lookAt: [0.04, 0, 0],
      fov: 38,
      logoScale: 0.86,
      logoRotation: -0.055,
      ringScale: 1.14,
      particleOpacity: 0.4,
      energy: 0.66,
    },
  ),
  shot(
    'about',
    {
      camera: [0.12, 1.92, 9.7],
      lookAt: [0, 0.22, 0],
      fov: 40,
      logoScale: 0.8,
      logoRotation: 0.04,
      ringScale: 0.86,
      particleOpacity: 0.34,
      energy: 0.34,
    },
    {
      camera: [0.06, 0.86, 10.6],
      lookAt: [0, 0.14, 0],
      fov: 43,
      logoScale: 0.72,
      logoRotation: 0.025,
      ringScale: 0.82,
      particleOpacity: 0.24,
      energy: 0.28,
    },
  ),
  shot(
    'services',
    {
      camera: [-2.05, -0.72, 8.85],
      lookAt: [-0.08, -0.08, 0],
      fov: 37,
      logoScale: 0.86,
      logoRotation: 0.13,
      ringScale: 1.08,
      particleOpacity: 0.4,
      energy: 0.52,
    },
    {
      camera: [-0.62, -0.34, 10.15],
      lookAt: [0, -0.06, 0],
      fov: 41,
      logoScale: 0.76,
      logoRotation: 0.06,
      ringScale: 0.98,
      particleOpacity: 0.28,
      energy: 0.42,
    },
  ),
  shot(
    'store',
    {
      camera: [2.72, 0.8, 9.15],
      lookAt: [0.15, 0.08, 0],
      fov: 39,
      logoScale: 0.9,
      logoRotation: -0.14,
      ringScale: 1.14,
      particleOpacity: 0.46,
      energy: 0.58,
    },
    {
      camera: [0.76, 0.42, 10.35],
      lookAt: [0.04, 0.04, 0],
      fov: 42,
      logoScale: 0.78,
      logoRotation: -0.065,
      ringScale: 1.02,
      particleOpacity: 0.32,
      energy: 0.46,
    },
  ),
  shot(
    'community',
    {
      camera: [-0.34, -1.62, 8.3],
      lookAt: [0, -0.18, 0],
      fov: 35,
      logoScale: 0.98,
      logoRotation: 0.08,
      ringScale: 1.24,
      particleOpacity: 0.58,
      energy: 0.7,
    },
    {
      camera: [-0.1, -0.72, 9.82],
      lookAt: [0, -0.08, 0],
      fov: 40,
      logoScale: 0.82,
      logoRotation: 0.04,
      ringScale: 1.1,
      particleOpacity: 0.38,
      energy: 0.56,
    },
  ),
  shot(
    'contact-cta',
    {
      camera: [0, 0.02, 11.15],
      lookAt: [0, 0, 0],
      fov: 42,
      logoScale: 0.72,
      logoRotation: 0,
      ringScale: 0.76,
      particleOpacity: 0.24,
      energy: 0.26,
    },
    {
      camera: [0, 0, 11.8],
      lookAt: [0, 0, 0],
      fov: 44,
      logoScale: 0.66,
      logoRotation: 0,
      ringScale: 0.72,
      particleOpacity: 0.2,
      energy: 0.22,
    },
  ),
]

const shotById = new Map(DIORAMAS_SHOTS.map((entry) => [entry.id, entry]))

export const getDioramasShot = (id: string) =>
  shotById.get(id) ?? DIORAMAS_SHOTS[0]
