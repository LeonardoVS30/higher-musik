import type { Service } from '../../types'

interface ServiceItemProps {
  service: Service
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover brightness-90 transition-all duration-700 ease-editorial group-hover:scale-[1.03] group-hover:brightness-100"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      </div>

      <div className="mt-5 flex items-baseline gap-4 transition-transform duration-400 ease-editorial group-hover:-translate-y-1">
        <span className="font-mono text-sm text-smoke">{service.number}</span>
        <h3 className="font-display uppercase text-xl leading-none transition-colors duration-300 group-hover:text-electric sm:text-2xl">
          {service.title}
        </h3>
      </div>

      <p className="mt-3 font-body text-sm leading-relaxed text-smoke opacity-90 transition-opacity duration-300 group-hover:opacity-100">
        {service.description}
      </p>
    </div>
  )
}
