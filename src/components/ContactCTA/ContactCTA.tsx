import Reveal from '../shared/Reveal'
import { siteConfig } from '../../data/site'

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 bg-glow-violet opacity-40 blur-3xl" />

      <div className="container-hm relative z-10 text-center">
        <Reveal>
          <h2 className="display-huge text-3xl sm:text-4xl md:text-5xl">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-3 max-w-md font-mono text-xs uppercase tracking-widest2 text-smoke">
            Artistas · Productores · Comunidad
          </p>
        </Reveal>
      </div>
    </section>
  )
}
