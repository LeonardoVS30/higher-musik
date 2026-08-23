import Reveal from '../shared/Reveal'

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-14 md:py-20 lg:py-24">
      <img
        src="/images/gallery/about-bg.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/40" />
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 bg-glow-violet opacity-60 blur-3xl" />
      <div className="noise-layer" />

      <div className="container-hm relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-4">03 — ¿Qué es Higher Musik?</p>
            <h2 className="display-huge text-4xl sm:text-5xl md:text-6xl">
              El <span className="text-electric">colectivo</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <Reveal delay={0.15} className="space-y-6 font-body text-smoke">
            <p>
              HIGHER MUSIK nace de la idea de que el crecimiento no tiene por
              qué ser individual. Somos artistas, productores y creativos
              conectados por una misma visión: construir una estructura donde
              el talento, el trabajo y las conexiones puedan crecer juntos.
            </p>
            <p>
              Ser parte de HIGHER significa formar parte de una comunidad
              profesional, respaldada por personas que entienden el proceso
              desde adentro.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
