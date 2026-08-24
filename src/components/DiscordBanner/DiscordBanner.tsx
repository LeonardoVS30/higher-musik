import Reveal from '../shared/Reveal'
import { discordUrl } from '../../data/socialLinks'

export default function DiscordBanner() {
  return (
    <section id="community" className="relative flex min-h-[72svh] items-center overflow-hidden py-24">
      <div className="container-hm">
        <Reveal>
          <div className="relative overflow-hidden border-y border-white/10 px-2 py-16 md:py-24">
            <div className="pointer-events-none absolute -left-1/4 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 bg-glow-violet opacity-[0.22] blur-3xl" />
            <p
              aria-hidden="true"
              className="absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[22vw] uppercase leading-none text-white/[0.025]"
            >
              Higher
            </p>
            <div className="noise-layer" />

            <div className="relative z-10 grid gap-12 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="eyebrow mb-5">07 — Comunidad</p>
                <h2 className="display-huge max-w-5xl text-[clamp(4rem,9vw,10rem)]">
                  No mires desde afuera.
                </h2>
              </div>

              <div className="md:col-span-4">
                <p className="mb-8 max-w-sm font-body leading-relaxed text-smoke">
                  Entrá al espacio donde artistas, productores y creativos comparten proceso,
                  conexiones y oportunidades reales.
                </p>
                <a
                  href={discordUrl || undefined}
                  target={discordUrl ? '_blank' : undefined}
                  rel={discordUrl ? 'noreferrer' : undefined}
                  aria-disabled={!discordUrl}
                  className={`ghost-action group inline-flex gap-3 !px-7 !py-4 ${
                    discordUrl ? '' : 'pointer-events-none text-smoke/60'
                  }`}
                >
                  Unirse a Discord
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
