import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../shared/Reveal'
import ArtistCard from '../ArtistCard/ArtistCard'
import { artists } from '../../data/artists'

export default function ArtistsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [desktop, setDesktop] = useState(false)
  const [travel, setTravel] = useState(0)
  const scrollDriven = desktop && !reducedMotion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -travel])
  const progress = useTransform(scrollYProgress, [0.08, 0.92], [0, 1])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const measure = () => {
      setDesktop(media.matches)
      const track = trackRef.current
      if (track) {
        setTravel(Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.1))
      }
    }
    const observer = new ResizeObserver(measure)

    if (trackRef.current) observer.observe(trackRef.current)
    media.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    measure()

    return () => {
      observer.disconnect()
      media.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="artists"
      style={{ height: scrollDriven ? `calc(100svh + ${travel}px)` : 'auto' }}
      className="roster-transition relative z-20 -mt-[65svh]"
    >
      <div className="pt-[14svh] md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden md:pt-20">
        <div className="container-hm relative z-10">
          <Reveal>
            <div className="mb-10 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow mb-4">01 — Roster</p>
                <h2 className="section-title">Roster</h2>
              </div>
              <div className="flex max-w-sm items-end gap-6 md:pb-2">
                <p className="font-body text-smoke">
                  Una constelación de artistas construyendo el próximo sonido.
                </p>
                <span className="hidden font-mono text-[10px] uppercase tracking-widest2 text-bone/[0.35] md:block">
                  Scroll →
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="no-scrollbar overflow-x-auto md:overflow-visible">
          <motion.div
            ref={trackRef}
            style={scrollDriven ? { x } : undefined}
            className="flex w-max snap-x snap-proximity gap-5 pb-12 pl-6 pr-[10vw] md:gap-7 md:pl-10 lg:gap-8 lg:pl-16"
          >
            {artists.map((artist, index) => (
              <div key={artist.id} className="flex-shrink-0 snap-center">
                <ArtistCard artist={artist} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {scrollDriven && (
          <div className="container-hm absolute inset-x-0 bottom-7">
            <div className="h-px overflow-hidden bg-white/10">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-bone/[0.65]" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
