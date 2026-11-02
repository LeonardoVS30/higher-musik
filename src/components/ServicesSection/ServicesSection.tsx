import Reveal from '../shared/Reveal'
import ServiceItem from '../ServiceItem/ServiceItem'
import { services } from '../../data/services'
import { contactEmailUrl } from '../../data/site'

export default function ServicesSection() {
  return (
    <section id="services" className="section-luxe relative">
      <div className="container-hm">
        <Reveal>
          <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">04 — Qué hacemos</p>
              <h2 className="section-title">Servicios</h2>
            </div>
            <p className="max-w-md font-body text-smoke md:col-span-4 md:pb-2">
              Estrategia, producción y estructura para convertir una visión artística en una obra sostenible.
            </p>
          </div>
        </Reveal>

        <div className="space-y-24 md:space-y-36">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={0.05}>
              <ServiceItem service={service} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-20 border-t border-white/10 pt-8 md:mt-28 md:flex md:items-center md:justify-between">
            <p className="max-w-xl font-body text-lg text-bone/75">
              ¿Tenés un proyecto en marcha? Contanos qué necesitás y vemos cómo impulsarlo.
            </p>
            <a
              href={contactEmailUrl('Quiero contratar un servicio')}
              className="ghost-action mt-6 inline-flex md:mt-0"
            >
              Contanos tu proyecto →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
