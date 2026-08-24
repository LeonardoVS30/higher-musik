import Reveal from '../shared/Reveal'
import { siteConfig } from '../../data/site'

export default function ContactCTA() {
  return (
    <section id="contact-cta" className="relative flex min-h-[70svh] items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 bg-glow-violet opacity-20 blur-3xl" />

      <div className="container-hm relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-8">El próximo capítulo</p>
          <h2 className="section-title">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-6 max-w-md font-mono text-xs uppercase tracking-widest2 text-smoke">
            Artistas · Productores · Comunidad
          </p>
          <a href={`mailto:${siteConfig.email}`} className="ghost-action mt-10 inline-flex">
            Hablemos →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
