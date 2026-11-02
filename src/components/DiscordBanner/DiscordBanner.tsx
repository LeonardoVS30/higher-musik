import Reveal from '../shared/Reveal'
import { DiscordIcon, socialIconMap } from '../shared/SocialIcons'
import { discordUrl, socialLinks } from '../../data/socialLinks'

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
                <p className="eyebrow mb-5">06 — Comunidad</p>
                <h2 className="display-huge max-w-5xl text-[clamp(4rem,9vw,10rem)]">
                  No mires desde afuera.
                </h2>
              </div>

              <div className="md:col-span-4">
                <p className="mb-8 max-w-sm font-body leading-relaxed text-smoke">
                  Pedí acceso a la comunidad, compartí tu proceso y consultá los espacios de
                  feedback y placements disponibles.
                </p>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-action group inline-flex gap-3 !px-7 !py-4"
                >
                  <DiscordIcon className="h-5 w-5 text-electric transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  Unirse a Discord
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 mt-16 grid grid-cols-2 border-t border-white/10 text-left md:mt-20 md:grid-cols-5">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.name]
                const active = Boolean(social.url)

                return (
                  <a
                    key={social.name}
                    href={social.url || undefined}
                    target={active ? '_blank' : undefined}
                    rel={active ? 'noreferrer' : undefined}
                    aria-disabled={!active}
                    className={`group flex min-h-32 flex-col justify-between border-b border-r border-white/10 p-4 transition-colors last:col-span-2 md:min-h-36 md:border-b-0 md:last:col-span-1 md:last:border-r-0 ${
                      active ? 'hover:bg-white/[0.035]' : 'cursor-default opacity-40'
                    }`}
                  >
                    {Icon && (
                      <Icon className="h-5 w-5 text-bone/55 transition-colors group-hover:text-bone" />
                    )}
                    <span>
                      <span className="block font-display text-xl uppercase text-bone">
                        {social.name}
                      </span>
                      <span className="mt-2 block font-mono text-xs uppercase tracking-widest2 text-smoke">
                        {active ? 'Abrir canal →' : 'Próximamente'}
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
