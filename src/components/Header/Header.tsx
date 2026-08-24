import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '../../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setScrolled(window.scrollY > 24)
      document.documentElement.style.setProperty('--hm-scroll', String(window.scrollY / maxScroll))
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--hm-scroll')
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-editorial ${
        scrolled ? 'border-b border-white/[0.07] bg-void/[0.72] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-bone/60 to-[#8d7aa8]"
        style={{ transform: 'scaleX(var(--hm-scroll, 0))' }}
      />
      <div className="container-hm flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="HIGHER MUSIK — inicio">
          <img
            src="/images/branding/hm-brand.png"
            alt="HIGHER MUSIK mark"
            className="h-9 w-auto"
          />
          <span className="hidden sm:block font-display uppercase tracking-widest text-sm text-bone">
            Higher Musik
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline eyebrow text-bone/80 hover:text-bone transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="ghost-action hidden !px-5 !py-2 md:inline-flex"
          >
            Contacto
          </a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${
                menuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-bone transition-transform duration-300 ${
                menuOpen ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden fixed inset-0 top-20 bg-void/98 backdrop-blur-sm"
          >
            <nav className="container-hm flex flex-col gap-8 pt-12">
              {siteConfig.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="font-display uppercase text-4xl text-bone"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: siteConfig.nav.length * 0.05 }}
                className="eyebrow mt-4 inline-flex w-fit border border-white/15 px-5 py-3 text-electric"
              >
                Contacto
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
