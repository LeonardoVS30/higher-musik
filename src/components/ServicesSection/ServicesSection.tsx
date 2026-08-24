import Reveal from '../shared/Reveal'
import ServiceItem from '../ServiceItem/ServiceItem'
import { services } from '../../data/services'

export default function ServicesSection() {
  return (
    <section id="services" className="section-luxe relative">
      <div className="container-hm">
        <Reveal>
          <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">05 — Qué hacemos</p>
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
      </div>
    </section>
  )
}
