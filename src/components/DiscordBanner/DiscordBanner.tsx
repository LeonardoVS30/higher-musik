import Reveal from '../shared/Reveal'
import { discordUrl } from '../../data/socialLinks'

export default function DiscordBanner() {
  return (
    <section className="relative py-10">
      <div className="container-hm">
        <Reveal>
          <div className="relative overflow-hidden bg-ink px-8 py-12 sm:px-14 md:py-14">
            <div className="pointer-events-none absolute -left-1/4 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 bg-glow-violet blur-3xl" />
            <div className="noise-layer" />

            <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="display-huge text-3xl sm:text-4xl md:text-5xl">
                  Unite a Higher
                </h2>
                <p className="mt-3 max-w-sm font-body text-sm text-smoke">
                  Conectá con artistas, productores y creativos dando forma al
                  próximo sonido del sello.
                </p>
              </div>

              <a
                href={discordUrl || undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!discordUrl}
                className={`group inline-flex flex-shrink-0 items-center gap-3 border border-white/20 px-7 py-4 text-xs uppercase tracking-widest2 font-mono transition-all duration-300 ${
                  discordUrl
                    ? 'text-bone hover:border-electric hover:text-electric hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                    : 'pointer-events-none text-smoke/60'
                }`}
              >
                Unirse a Discord
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
