import Reveal from '../shared/Reveal'
import { playlist } from '../../data/playlist'

export default function PlaylistSection() {
  return (
    <section id="playlist" className="section-luxe relative">
      <div className="container-hm grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="glass-panel relative flex aspect-square w-full max-w-xl items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-20" />
            <img
              src={playlist.cover}
              alt={`Logo de ${playlist.name}`}
              loading="lazy"
              className="relative z-10 h-2/3 w-2/3 object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.38)]"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
              }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow mb-4">08 — Playlist oficial</p>
          <h2 className="section-title">
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
            className={`ghost-action group mt-10 inline-flex gap-3 ${
              playlist.url
                ? ''
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
