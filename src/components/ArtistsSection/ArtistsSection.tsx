import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import Reveal from '../shared/Reveal'
import ArtistCard from '../ArtistCard/ArtistCard'
import { artists } from '../../data/artists'

export default function ArtistsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e: PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    isDown.current = true
    setDragging(true)
    startX.current = e.clientX
    startScroll.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    const el = trackRef.current
    if (!el || !isDown.current) return
    const delta = e.clientX - startX.current
    el.scrollLeft = startScroll.current - delta
  }

  const endDrag = () => {
    isDown.current = false
    setDragging(false)
  }

  const onWheel = (e: WheelEvent) => {
    const el = trackRef.current
    if (!el) return
    // Convert vertical wheel intent into horizontal travel for desktop mice.
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY
    }
  }

  return (
    <section id="artists" className="relative py-10 md:py-14">
      <div className="container-hm">
        <Reveal>
          <p className="eyebrow mb-4">01 — Roster</p>
          <h2 className="display-huge text-4xl sm:text-5xl md:text-6xl mb-4">
            Roster
          </h2>
          <p className="mb-8 max-w-md font-body text-sm text-smoke">
            Artistas y productores que forman parte del colectivo.
          </p>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
        className={`no-scrollbar flex snap-x snap-proximity gap-8 overflow-x-auto pb-4 pl-6 pr-6 md:gap-12 md:pl-10 lg:gap-14 lg:pl-16 ${
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {artists.map((artist) => (
          <div key={artist.id} className="flex-shrink-0 snap-center">
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </section>
  )
}
