import Reveal from '../shared/Reveal'
import { gallery } from '../../data/gallery'

const aspectClass: Record<string, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

const layout = [
  'md:col-span-5 md:row-span-3',
  'md:col-span-7 md:row-span-2',
  'md:col-span-3 md:row-span-2',
  'md:col-span-4 md:row-span-3',
  'md:col-span-5 md:row-span-2',
  'md:col-span-3 md:row-span-2',
]

export default function VisualGallery() {
  return (
    <section id="gallery" className="section-luxe relative overflow-hidden">
      <div className="container-hm">
        <Reveal>
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">04 — Universo visual</p>
              <h2 className="section-title">Adentro del sello</h2>
            </div>
            <p className="max-w-sm font-body text-smoke md:col-span-4 md:pb-2">
              El proceso, las noches y los espacios donde el sonido empieza a tomar forma.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-flow-dense md:grid-cols-12 md:auto-rows-[12vw] md:gap-6">
          {gallery.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.055} className={layout[index]}>
              <figure
                className={`premium-card media-frame group relative h-full overflow-hidden border border-white/[0.08] bg-ink md:aspect-auto ${aspectClass[item.aspect]}`}
              >
                <img
                  src={item.image}
                  alt={item.caption ?? 'Universo visual HIGHER MUSIK'}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[24%] transition-all duration-1000 ease-editorial group-hover:scale-[1.025] group-hover:grayscale-0"
                  onError={(event) => {
                    ;(event.currentTarget as HTMLImageElement).style.opacity = '0'
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-white/[0.025]" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <p className="font-body text-sm text-bone/80">{item.caption}</p>
                  <span className="font-mono text-[9px] tracking-widest2 text-bone/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
