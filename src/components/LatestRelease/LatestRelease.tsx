import Reveal from '../shared/Reveal'
import AudioPlayer from '../AudioPlayer/AudioPlayer'
import { latestRelease } from '../../data/releases'

const platformLinks: Array<{ key: keyof typeof latestRelease.links; label: string }> = [
  { key: 'spotify', label: 'Spotify' },
  { key: 'appleMusic', label: 'Apple Music' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'soundcloud', label: 'SoundCloud' },
]

export default function LatestRelease() {
  const available = platformLinks.filter((p) => latestRelease.links[p.key])

  return (
    <section id="release" className="relative py-10 md:py-14">
      <div className="container-hm">
        <p className="eyebrow mb-6">02 — {latestRelease.type} destacado</p>

        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="group relative h-40 w-40 flex-shrink-0 overflow-hidden bg-ink transition-shadow duration-500 ease-editorial hover:shadow-[0_0_36px_rgba(255,47,163,0.16)] sm:h-44 sm:w-44 md:h-52 md:w-52">
              <img
                src={latestRelease.cover}
                alt={`Portada de ${latestRelease.title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 ease-editorial group-hover:scale-[1.04] group-hover:contrast-110"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-glow-flare opacity-20 transition-opacity duration-500 group-hover:opacity-35" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="display-huge text-3xl sm:text-4xl md:text-5xl">
                {latestRelease.title}
              </h2>
              <p className="mt-1 font-body text-base text-smoke">{latestRelease.artist}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest2 text-smoke">
                {latestRelease.produced}
              </p>

              <div className="mt-5 max-w-sm">
                <AudioPlayer src={latestRelease.audioSnippet} />
              </div>

              {available.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-5">
                  {available.map((p) => (
                    <a
                      key={p.key}
                      href={latestRelease.links[p.key]}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline eyebrow text-bone/80 hover:text-bone transition-colors"
                    >
                      {p.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
