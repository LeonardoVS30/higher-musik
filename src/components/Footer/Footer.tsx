import { siteConfig } from '../../data/site'

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 py-12">
      <div className="container-hm flex flex-col items-center gap-8">
        <img
          src="/images/branding/hm-mark.png"
          alt="HIGHER MUSIK"
          className="h-8 w-auto opacity-90"
        />

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left w-full">
          <p className="font-mono text-xs text-smoke">
            © 2026 HIGHER MUSIK. Todos los derechos reservados. (Buenos Aires, Argentina)
          </p>

          <a
            href={`mailto:${siteConfig.email}`}
            className="link-underline font-mono text-xs text-bone/80 hover:text-bone transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
