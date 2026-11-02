import { useState } from 'react'
import Reveal from '../shared/Reveal'
import { contactEmailUrl, siteConfig } from '../../data/site'

export default function ContactCTA() {
  const [copyStatus, setCopyStatus] = useState('')
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopyStatus('Correo copiado')
    } catch {
      setCopyStatus('No se pudo copiar. Seleccioná la dirección para copiarla manualmente.')
    }
  }
  return (
    <section id="contact-cta" className="relative flex min-h-[70svh] items-center overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 bg-glow-violet opacity-20 blur-3xl" />

      <div className="container-hm relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-8">07 — Hablemos</p>
          <h2 className="section-title">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-6 max-w-md font-mono text-xs uppercase tracking-widest2 text-smoke">
            Artistas · Productores · Comunidad
          </p>
          <a
            href={contactEmailUrl('Contacto — Higher Musik')}
            className="ghost-action mt-10 inline-flex"
          >
            Hablemos →
          </a>
          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="select-all break-all font-body text-sm text-smoke">{siteConfig.email}</span>
            <button onClick={copyEmail} className="link-underline text-sm">Copiar correo</button>
            <p role="status" className="min-h-5 text-sm text-smoke">{copyStatus}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
