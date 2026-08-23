import { useRef } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../shared/Reveal'
import { gallery } from '../../data/gallery'

const aspectClass: Record<string, string> = {
  portrait: 'aspect-[3/4] w-[46vw] sm:w-[28vw] lg:w-[16vw]',
  landscape: 'aspect-[4/3] w-[60vw] sm:w-[36vw] lg:w-[22vw]',
  square: 'aspect-square w-[46vw] sm:w-[28vw] lg:w-[16vw]',
}

export default function VisualGallery() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-8 md:py-12">
      <div className="container-hm">
        <Reveal>
          <p className="eyebrow mb-3">04 — Universo visual</p>
          <h2 className="display-huge text-3xl sm:text-4xl md:text-5xl mb-6">
            Adentro del sello
          </h2>
        </Reveal>
      </div>

      <div className="overflow-hidden pl-6 md:pl-10 lg:pl-16">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab gap-4 pb-4 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -1600, right: 0 }}
          dragElastic={0.08}
        >
          {gallery.map((item) => (
            <div
              key={item.id}
              className={`group relative flex-shrink-0 overflow-hidden bg-ink ${aspectClass[item.aspect]}`}
            >
              <img
                src={item.image}
                alt={item.caption ?? 'Universo visual HIGHER MUSIK'}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover contrast-100 transition-all duration-700 ease-editorial group-hover:scale-[1.03] group-hover:contrast-110"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-glow-violet opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/80 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <p className="eyebrow">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
