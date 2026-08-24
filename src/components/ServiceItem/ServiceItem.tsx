import type { Service } from '../../types'

interface ServiceItemProps {
  service: Service
  reverse?: boolean
}

export default function ServiceItem({ service, reverse = false }: ServiceItemProps) {
  return (
    <article className="group grid gap-8 border-t border-white/[0.12] pt-6 md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
      <div
        className={`media-frame relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-ink md:col-span-7 ${
          reverse ? 'md:order-2' : ''
        }`}
      >
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover grayscale-[32%] transition-all duration-1000 ease-editorial group-hover:scale-[1.025] group-hover:grayscale-0"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/[0.45] via-transparent to-white/[0.025]" />
      </div>

      <div className={`relative md:col-span-5 ${reverse ? 'md:order-1' : ''}`}>
        <span
          aria-hidden="true"
          className="absolute -top-16 right-0 font-display text-[clamp(7rem,14vw,13rem)] leading-none text-white/[0.035]"
        >
          {service.number}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Capítulo {service.number}
        </span>
        <h3 className="mt-7 max-w-2xl font-display text-[clamp(2.8rem,5vw,6rem)] uppercase leading-[0.88] tracking-tightest">
          {service.title}
        </h3>
        <p className="mt-7 max-w-xl font-body leading-relaxed text-smoke">
          {service.description}
        </p>
        <div className="mt-10 flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest2 text-bone/[0.35]">
          <span className="h-px w-10 bg-bone/[0.35]" />
          Higher Musik Direction
        </div>
      </div>
    </article>
  )
}
