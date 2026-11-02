import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'


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
  const veilOpacity = useTransform(scrollYProgress, [0.35, 1], [0, 0.88])
  const routes = [
    { label: 'Servicios', detail: 'Impulsá tu proyecto', href: '#services', primary: true },
    { label: 'Comunidad', detail: 'Feedback y conexiones', href: '#community', primary: true },
    { label: 'Lanzamientos', detail: 'Escuchá ALTOKE', href: '#release', primary: false },
    {
      label: 'Herramientas',
      detail: 'Explorá Higher Store',
      href: '#store',
      primary: false,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[155svh] md:h-[165svh]"
    >
      <h1 className="sr-only">Higher Musik</h1>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-void/40">
        <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[88vh] w-[88vh] -translate-x-1/2 bg-glow-violet opacity-[0.55] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[46vh] w-[80vw] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="noise-layer" />

        <div className="absolute left-1/2 top-14 z-[5] h-[32svh] max-h-[690px] min-h-[220px] w-[85vw] max-w-[1040px] -translate-x-1/2 sm:top-10 sm:h-[65svh] sm:w-[112vw] md:top-5 md:h-[73svh]">
          <motion.div
            style={reducedMotion ? undefined : { y: logoY, scale: logoScale, opacity: logoOpacity }}
            className="h-full w-full"
          >
            <img
              src="/images/branding/hm-mark-large.png"
              alt="Logo de Higher Musik"
              className="dioramas-static-logo h-full w-full object-contain"
            />
          </motion.div>
        </div>

        <motion.div
          style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="container-hm absolute inset-x-0 bottom-10 z-10 md:bottom-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="font-display text-[clamp(1.9rem,4vw,3.8rem)] uppercase leading-[0.9] tracking-tightest text-bone">
              Comunidad creativa para música urbana.
            </p>
            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-smoke md:text-base">
              Artistas y productores que crean, desarrollan y conectan proyectos de trap, R&amp;B,
              reggaetón, rap y sonidos afines.
            </p>
          </motion.div>

          <motion.nav
            aria-label="Explorar Higher Musik"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 grid grid-cols-2 border-y border-white/10 md:grid-cols-4"
          >
            {routes.map((route, index) => (
              <a
                key={route.label}
                href={route.href}
                className={`group min-h-20 border-white/10 px-3 py-3 transition-colors duration-300 odd:border-r md:min-h-24 md:border-r md:px-4 md:py-4 md:last:border-r-0 ${
                  route.primary
                    ? 'bg-white/[0.035] hover:bg-white/[0.07]'
                    : 'text-bone/65 hover:bg-white/[0.025] hover:text-bone'
                }`}
              >
                <span className="font-mono text-xs tracking-[0.24em] text-bone/35">
                  0{index + 1}
                </span>
                <span className="mt-1.5 block font-display text-lg uppercase leading-none md:text-xl">
                  {route.label}
                </span>
                <span className="mt-1.5 block font-body text-xs leading-tight text-smoke transition-colors group-hover:text-bone/70">
                  {route.detail} →
                </span>
              </a>
            ))}
          </motion.nav>
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
