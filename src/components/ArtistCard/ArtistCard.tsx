import type { Artist } from '../../types'

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="group flex flex-shrink-0 select-none flex-col items-center gap-4">
      <div className="relative h-36 w-36 flex-shrink-0 overflow-hidden rounded-full border border-white/10 bg-ink transition-all duration-500 ease-editorial sm:h-44 sm:w-44 md:h-52 md:w-52 group-hover:scale-[1.03] group-hover:border-white/20 group-hover:shadow-[0_0_36px_rgba(124,58,237,0.28)]">
        <img
          src={artist.image}
          alt={artist.name}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-center grayscale-[15%] transition-all duration-700 ease-editorial group-hover:scale-[1.08] group-hover:grayscale-0"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-0 transition-opacity duration-500 group-hover:opacity-25" />
      </div>

      <span className="font-display uppercase text-sm tracking-wide text-bone/80 transition-colors duration-300 group-hover:text-bone sm:text-base">
        {artist.name}
      </span>
    </div>
  )
}
