import { useEffect, useRef, useState, type ChangeEvent } from 'react'

interface AudioPlayerProps {
  src: string
  accent?: 'electric' | 'flare'
}

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src, accent = 'electric' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      setCurrent(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoaded = () => setDuration(audio.duration)
    const onEnd = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {
        // Autoplay / missing-file guard — fails silently, button stays usable.
      })
    }
    setPlaying(!playing)
  }

  const onScrub = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const value = Number(e.target.value)
    audio.currentTime = (value / 100) * duration
    setProgress(value)
  }

  const accentColor = accent === 'flare' ? '#FF2FA3' : '#7C3AED'

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        onClick={toggle}
        aria-label={playing ? 'Pausar' : 'Reproducir'}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-bone transition-all duration-300 hover:border-electric hover:text-electric hover:shadow-[0_0_16px_rgba(124,58,237,0.3)]"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="1" y="0" width="4" height="14" />
            <rect x="9" y="0" width="4" height="14" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M0 0L14 7L0 14V0Z" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onScrub}
          style={{ accentColor }}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15"
          aria-label="Buscar en la pista"
        />
      </div>

      <span className="font-mono text-xs text-smoke tabular-nums">
        {formatTime(current)} / {formatTime(duration)}
      </span>
    </div>
  )
}
