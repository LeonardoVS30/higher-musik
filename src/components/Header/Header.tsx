import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const dialog = dialogRef.current!
    const menuButton = menuButtonRef.current
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    closeOnDesktop()
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      dialog.close()
      document.body.style.overflow = previousOverflow
      menuButton?.focus()
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
            ref={menuButtonRef}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menú de navegación"
        onCancel={() => setMenuOpen(false)}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto border-0 bg-void p-0 text-bone backdrop:bg-void"
      >
            <div className="container-hm flex h-20 items-center justify-end">
              <button onClick={() => setMenuOpen(false)} className="ghost-action inline-flex">Cerrar menú</button>
            </div>
            <nav className="container-hm flex flex-col gap-8 py-8">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display uppercase text-4xl text-bone"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="eyebrow mt-4 inline-flex w-fit border border-white/15 px-5 py-3 text-electric"
              >
                Contacto
              </a>
            </nav>
      </dialog>
    </header>
  )
}
