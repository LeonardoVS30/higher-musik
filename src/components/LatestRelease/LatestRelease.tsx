import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'
import { latestRelease } from '../../data/releases'

const platformLinks: Array<{ key: keyof typeof latestRelease.links; label: string }> = [
  { key: 'spotify', label: 'Spotify' },
  { key: 'appleMusic', label: 'Apple Music' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'soundcloud', label: 'SoundCloud' },
]

export default function LatestRelease() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const available = platformLinks.filter((platform) => latestRelease.links[platform.key])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const backdropX = useTransform(scrollYProgress, [0, 1], ['8%', '-14%'])
  const coverY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const copyY = useTransform(scrollYProgress, [0, 1], [-30, 35])

  return (
    <section
      ref={sectionRef}
      id="release"
      className="relative flex min-h-[115svh] items-center overflow-hidden py-28"
    >
      <motion.p
        style={reducedMotion ? undefined : { x: backdropX }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[25vw] uppercase leading-none tracking-tightest text-white/[0.028]"
      >
        {latestRelease.title} · {latestRelease.title}
      </motion.p>

      <div className="container-hm relative z-10">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <p className="eyebrow">02 — {latestRelease.type} destacado</p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-bone/[0.35] sm:block">
            Higher Musik · {latestRelease.date}
          </p>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
          <motion.figure
            style={reducedMotion ? undefined : { y: coverY }}
            className="group relative md:col-span-6 lg:col-span-5"
          >
            <div className="media-frame relative aspect-square overflow-hidden border border-white/10 bg-ink">
              <img
                src={latestRelease.cover}
                alt={`Portada de ${latestRelease.title}`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[10%] transition-all duration-1000 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
                onError={(event) => {
                  ;(event.currentTarget as HTMLImageElement).style.opacity = '0'
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/[0.35] via-transparent to-white/[0.035]" />
              <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/[0.55]">
                HM — 0026
              </span>
            </div>
          </motion.figure>

          <motion.div
            style={reducedMotion ? undefined : { y: copyY }}
            className="md:col-span-6 lg:col-span-7 lg:pl-8"
          >
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-bone/40">
              New release · Now playing
            </p>
            <h2 className="display-huge text-[clamp(4rem,9vw,10rem)]">
              {latestRelease.title}
            </h2>
            <div className="mt-5 flex flex-col gap-2 border-l border-white/15 pl-5">
              <p className="font-body text-lg text-bone/80">{latestRelease.artist}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest2 text-smoke">
                {latestRelease.produced}
              </p>
            </div>

            <div className="mt-10 max-w-xl border-y border-white/10 py-7">
              <SpotifyPlayer
                trackId={latestRelease.spotifyTrackId}
                highlightAt={latestRelease.highlightAt}
              />
            </div>

            {available.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-6">
                {available.map((platform) => (
                  <a
                    key={platform.key}
                    href={latestRelease.links[platform.key]}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline eyebrow text-bone/70 transition-colors hover:text-bone"
                  >
                    {platform.label} →
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
