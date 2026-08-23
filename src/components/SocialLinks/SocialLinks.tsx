import Reveal from '../shared/Reveal'
import { socialIconMap } from '../shared/SocialIcons'
import { socialLinks } from '../../data/socialLinks'

export default function SocialLinks() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container-hm flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow mb-8">07 — Seguinos</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:gap-x-10 md:gap-x-14">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.name]
              const active = Boolean(social.url)
              return (
                <a
                  key={social.name}
                  href={social.url || undefined}
                  target={active ? '_blank' : undefined}
                  rel={active ? 'noreferrer' : undefined}
                  aria-label={social.name}
                  aria-disabled={!active}
                  title={social.name}
                  className={`group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 transition-all duration-300 ease-editorial sm:h-[4.5rem] sm:w-[4.5rem] ${
                    active
                      ? 'text-bone hover:scale-[1.06] hover:border-electric hover:text-electric hover:shadow-[0_0_24px_rgba(124,58,237,0.35)]'
                      : 'pointer-events-none text-smoke/40'
                  }`}
                >
                  {Icon && <Icon className="h-6 w-6 sm:h-7 sm:w-7" />}
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
