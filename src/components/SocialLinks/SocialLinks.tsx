import Reveal from '../shared/Reveal'
import { socialIconMap } from '../shared/SocialIcons'
import { socialLinks } from '../../data/socialLinks'

export default function SocialLinks() {
  return (
    <section id="social" className="section-luxe relative !py-20 md:!py-28">
      <div className="container-hm">
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">07B — Señal abierta</p>
              <h2 className="font-display text-[clamp(3rem,6vw,6.5rem)] uppercase leading-[0.9] tracking-tightest">
                Encontranos afuera
              </h2>
            </div>
            <p className="max-w-xs font-body text-smoke">Música, sesiones y proceso en tiempo real.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-5">
            {socialLinks.map((social, index) => {
              const Icon = socialIconMap[social.name]
              const active = Boolean(social.url)
              return (
                <a
                  key={social.name}
                  href={social.url || undefined}
                  target={active ? '_blank' : undefined}
                  rel={active ? 'noreferrer' : undefined}
                  aria-disabled={!active}
                  className={`group flex min-h-48 flex-col justify-between border-b border-white/10 p-5 transition-colors duration-500 last:border-b-0 md:min-h-56 md:border-b-0 md:border-l md:first:border-l-0 ${
                    active
                      ? 'hover:bg-white/[0.035]'
                      : 'pointer-events-none opacity-[0.35]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest2 text-bone/[0.35]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {Icon && <Icon className="h-5 w-5 text-bone/[0.55] transition-colors group-hover:text-bone" />}
                  </div>
                  <div>
                    <p className="font-display text-2xl uppercase sm:text-3xl">{social.name}</p>
                    <span className="mt-3 block font-mono text-[9px] uppercase tracking-widest2 text-bone/[0.35]">
                      Abrir canal →
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
