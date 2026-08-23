import { motion } from 'framer-motion'
import { siteConfig } from '../../data/site'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden pb-16 pt-32"
    >
      {/* Ambient glow — the recurring signature motif */}
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 bg-glow-violet blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[50vh] w-[50vh] bg-glow-flare blur-3xl opacity-60" />
      <div className="noise-layer" />

      <div className="container-hm relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-6"
        >
          Sello musical — sesiones nocturnas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-huge text-gradient-glow text-[19vw] sm:text-[16vw] md:text-[13vw] lg:text-[11vw]"
        >
          HIGHER
          <br />
          MUSIK
        </motion.h1>

        <div className="mt-10 flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
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
              className="group inline-flex items-center gap-3 border border-white/15 px-6 py-3 text-xs uppercase tracking-widest2 font-mono text-bone transition-all duration-300 hover:border-electric hover:text-electric hover:shadow-[0_0_18px_rgba(124,58,237,0.35)]"
            >
              Conocé Higher
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#release"
              className="eyebrow text-bone/70 link-underline hover:text-bone transition-colors"
            >
              Escuchar ahora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
