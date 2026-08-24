interface SpotifyPlayerProps {
  trackId: string
  highlightAt: string
}

export default function SpotifyPlayer({ trackId, highlightAt }: SpotifyPlayerProps) {
  return (
    <div>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        title="Reproductor de ALTOKE en Spotify"
        width="100%"
        height="152"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="block border-0"
      />
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[9px] uppercase tracking-widest2 text-bone/[0.45]">
          Momento destacado · {highlightAt}
        </span>
        <a
          href={`https://open.spotify.com/track/${trackId}`}
          target="_blank"
          rel="noreferrer"
          className="link-underline font-mono text-[9px] uppercase tracking-widest2 text-bone/70"
        >
          Abrir en Spotify ↗
        </a>
      </div>
    </div>
  )
}
