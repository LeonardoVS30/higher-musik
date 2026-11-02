import type { Artist } from '../../types'


interface ArtistCardProps {
  artist: Artist
  index: number
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <div className="premium-card group flex w-[68vw] max-w-[300px] flex-shrink-0 select-none flex-col gap-5 sm:w-[38vw] lg:w-[22vw]">
      <div className="media-frame relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden border border-white/[0.09] bg-ink transition-colors duration-500 group-hover:border-white/20">
        <span className="absolute left-4 top-4 z-10 font-mono text-[10px] tracking-widest2 text-bone/[0.55]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <img
          src={artist.image}
          alt={artist.name}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-center grayscale-[28%] transition-all duration-1000 ease-editorial group-hover:scale-[1.045] group-hover:grayscale-0"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/[0.55] via-transparent to-white/[0.025]" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-void via-void/[0.88] to-transparent p-5 opacity-100 transition-all duration-500 ease-editorial md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <p className="font-body text-sm text-bone/75">Descubrí su música y consultá sus cifras actuales en Spotify.</p>
          <a
            href={artist.links.spotify}
            target="_blank"
            rel="noreferrer"
            className="mt-5 w-fit font-mono text-[9px] uppercase tracking-widest2 text-bone transition-colors hover:text-white focus-visible:text-white"
          >
            Abrir perfil ↗
          </a>
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-white/10 pt-4">
        <span className="font-display text-lg uppercase tracking-wide text-bone/85 transition-colors duration-300 group-hover:text-bone sm:text-xl">
          {artist.name}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest2 text-bone/[0.35]">
          {artist.role}
        </span>
      </div>
    </div>
  )
}
