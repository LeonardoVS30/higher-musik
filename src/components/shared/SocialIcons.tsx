import type { ReactElement } from 'react'

interface IconProps {
  className?: string
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 3.5c.6 2 2.1 3.4 4.2 3.7v2.6c-1.5 0-2.9-.4-4.2-1.3v6.4a5.4 5.4 0 1 1-4.6-5.4v2.7a2.7 2.7 0 1 0 2 2.6V3.5H14Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function KickIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 4h4v5l5-5h6l-6.5 6.5L19 18h-6l-5-5v5H4V4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 10.2c3-1 6.8-.6 9.2 1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7.8 13.1c2.4-.7 5.4-.4 7.4.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8.2 15.9c1.9-.5 4.1-.3 5.7.8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  )
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7.2 6.7A15.5 15.5 0 0 1 12 6c1.7 0 3.3.2 4.8.7 1.3 1.8 2.1 4.2 2.3 6.8-1.6 1.2-3.1 1.9-4.7 2.3l-1.1-1.5m-2.6 0-1.1 1.5c-1.6-.4-3.1-1.1-4.7-2.3.2-2.6 1-5 2.3-6.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="11.8" r="1" fill="currentColor" />
      <circle cx="14.5" cy="11.8" r="1" fill="currentColor" />
    </svg>
  )
}

export const socialIconMap: Record<string, (props: IconProps) => ReactElement> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  Kick: KickIcon,
  Spotify: SpotifyIcon,
  YouTube: YouTubeIcon,
  Discord: DiscordIcon,
}
