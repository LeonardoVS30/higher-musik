import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import { shouldUseDioramasScroll } from './dioramasMotion'

export default function DioramasScroll() {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: Lenis | undefined

    const syncMotionPreference = () => {
      if (shouldUseDioramasScroll(motionQuery.matches)) {
        if (lenis) return

        // Dioramas scroll preset, adapted to the existing Framer Motion scene.
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1,
        })
        return
      }

      lenis?.destroy()
      lenis = undefined
    }

    const onMotionPreferenceChange = () => syncMotionPreference()
    syncMotionPreference()
    motionQuery.addEventListener('change', onMotionPreferenceChange)

    return () => {
      motionQuery.removeEventListener('change', onMotionPreferenceChange)
      lenis?.destroy()
    }
  }, [])

  return null
}
