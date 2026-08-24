import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../shared/Reveal'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const statementX = useTransform(scrollYProgress, [0, 1], ['4%', '-22%'])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-luxe relative flex min-h-[110svh] items-center overflow-hidden"
    >
      <motion.img
        style={reducedMotion ? undefined : { y: imageY, scale: 1.12 }}
        src="/images/gallery/about-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-[-8%] h-[116%] w-full object-cover grayscale-[55%] opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/[0.68] to-void/60" />
      <div className="noise-layer" />

      <div className="container-hm relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-5">03 — ¿Qué es Higher Musik?</p>
            <h2 className="section-title max-w-4xl">
              Crecer nunca fue un acto individual.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-12">
          <Reveal delay={0.12}>
            <div className="border-l border-white/15 pl-6 md:pl-8">
              <p className="text-pretty font-body text-lg leading-relaxed text-bone/75">
                HIGHER MUSIK conecta artistas, productores y creativos bajo una misma visión:
                construir una estructura donde el talento, el trabajo y las conexiones crezcan juntos.
              </p>
              <p className="mt-7 font-body leading-relaxed text-smoke">
                Una comunidad profesional respaldada por personas que entienden el proceso desde
                adentro —del estudio al lanzamiento, de la identidad al escenario.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  ['01', 'Sonido'],
                  ['02', 'Dirección'],
                  ['03', 'Comunidad'],
                ].map(([number, label]) => (
                  <div key={number}>
                    <span className="font-mono text-[9px] tracking-widest2 text-bone/[0.35]">{number}</span>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest2 text-bone/70">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.p
        style={reducedMotion ? undefined : { x: statementX }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 z-0 whitespace-nowrap font-display text-[14vw] uppercase leading-none tracking-tightest text-white/[0.035]"
      >
        Sonido · Cultura · Dirección · Sonido · Cultura · Dirección
      </motion.p>
    </section>
  )
}
