import Reveal from '../shared/Reveal'
import ServiceItem from '../ServiceItem/ServiceItem'
import { services } from '../../data/services'

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-14 md:py-20 lg:py-24">
      <div className="container-hm">
        <Reveal>
          <p className="eyebrow mb-4">05 — Qué hacemos</p>
          <h2 className="display-huge text-4xl sm:text-5xl md:text-6xl mb-4">
            Servicios
          </h2>
          <p className="mb-6 max-w-lg font-body text-smoke md:mb-8">
            Parte de la estructura profesional que sostiene al ecosistema
            HIGHER.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.12}>
              <ServiceItem service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
