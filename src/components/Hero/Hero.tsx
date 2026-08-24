import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { siteConfig } from '../../data/site'

const HeroLogo3D = lazy(() => import('./HeroLogo3D'))

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const logoY = useTransform(scrollYProgress, [0, 0.45, 1], [0, -16, -150])
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.96, 0.72])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.58, 1], [1, 0.86, 0.08])
  const copyY = useTransform(scrollYProgress, [0, 0.48, 1], [0, -12, -70])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.42, 0.82], [1, 0.82, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18, 0.42], [0.72, 0.72, 0])
  const veilOpacity = useTransform(scrollYProgress, [0.35, 1], [0, 0.88])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[155svh] md:h-[165svh]"
    >
      <h1 className="sr-only">Higher Musik</h1>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-void">
        <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[88vh] w-[88vh] -translate-x-1/2 bg-glow-violet opacity-[0.55] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[46vh] w-[80vw] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="noise-layer" />

        <div className="absolute left-1/2 top-14 z-[5] h-[49svh] max-h-[690px] min-h-[330px] w-[112vw] max-w-[1040px] -translate-x-1/2 sm:top-10 sm:h-[65svh] md:top-5 md:h-[73svh]">
          <motion.div
            style={reducedMotion ? undefined : { y: logoY, scale: logoScale, opacity: logoOpacity }}
            className="h-full w-full"
          >
            <Suspense
              fallback={
                <img
                  src="/images/branding/hm-mark-large.png"
                  alt="Logo de Higher Musik"
                  className="h-full w-full object-contain opacity-75"
                />
              }
            >
              <HeroLogo3D />
            </Suspense>
          </motion.div>
        </div>

        <motion.div
          style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="container-hm absolute inset-x-0 bottom-10 z-10 md:bottom-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6"
          >
            Sello musical — sesiones nocturnas
          </motion.p>

          <div className="mt-6 flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-sm font-body text-smoke"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#about"
                className="ghost-action group inline-flex items-center gap-3"
              >
                Conocé Higher
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#release"
                className="eyebrow text-bone/70 link-underline transition-colors hover:text-bone"
              >
                Escuchar ahora
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={reducedMotion ? undefined : { opacity: cueOpacity }}
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-bone/[0.45]">
            Descubrí el colectivo
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-bone/50 to-transparent" />
        </motion.div>

        <motion.div
          style={reducedMotion ? undefined : { opacity: veilOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[8] bg-void"
        />
      </div>
    </section>
  )
}
