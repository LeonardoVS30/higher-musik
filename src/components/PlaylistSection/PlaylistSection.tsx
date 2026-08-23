import Reveal from '../shared/Reveal'
import { playlist } from '../../data/playlist'

export default function PlaylistSection() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container-hm grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative flex aspect-square w-full max-w-md items-center justify-center">
            <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-50" />
            <img
              src={playlist.cover}
              alt={`Logo de ${playlist.name}`}
              loading="lazy"
              className="relative z-10 h-2/3 w-2/3 object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.25)]"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
              }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow mb-4">08 — Playlist oficial</p>
          <h2 className="display-huge text-4xl sm:text-5xl md:text-6xl">
            {playlist.name}
          </h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-smoke">
            {playlist.curatedBy}
          </p>
          <p className="mt-6 max-w-md font-body text-smoke">{playlist.description}</p>

          <a
            href={playlist.url || undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!playlist.url}
            className={`group mt-10 inline-flex items-center gap-3 border border-white/15 px-6 py-3 text-xs uppercase tracking-widest2 font-mono transition-all duration-300 ${
              playlist.url
                ? 'text-bone hover:border-electric hover:text-electric hover:shadow-[0_0_18px_rgba(124,58,237,0.35)]'
                : 'pointer-events-none text-smoke/60'
            }`}
          >
            Escuchar en Spotify
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
