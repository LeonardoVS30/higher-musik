export interface ArtistLinks {
  spotify?: string
  instagram?: string
}

export interface Artist {
  id: string
  name: string
  image: string
  role: string
  featured: boolean
  links: ArtistLinks
  spotifyStats: {
    monthlyListeners: number
    topTrack: string
    topTrackStreams: number
  }
}

export type ReleaseType = 'Single' | 'EP' | 'Album'

export interface StreamingLinks {
  spotify?: string
  appleMusic?: string
  youtube?: string
  soundcloud?: string
}

export interface Release {
  id: string
  artist: string
  title: string
  type: ReleaseType
  produced: string
  date: string
  cover: string
  spotifyTrackId: string
  highlightAt: string
  links: StreamingLinks
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  image: string
}

export interface Product {
  id: string
  name: string
  category: string
  producer: string
  price: number
  currency: string
  image: string
  previewAudio?: string
  description: string
  checkoutUrl?: string
}

export interface GalleryItem {
  id: string
  image: string
  caption?: string
  aspect: 'portrait' | 'landscape' | 'square'
}

export interface SocialLink {
  name: string
  url: string
}

export interface PlaylistInfo {
  name: string
  cover: string
  description: string
  curatedBy: string
  url: string
}
