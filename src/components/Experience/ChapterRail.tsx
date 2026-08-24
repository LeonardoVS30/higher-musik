import { useEffect, useState } from 'react'

const chapters = [
  { id: 'artists', number: '01', label: 'Roster' },
  { id: 'release', number: '02', label: 'Release' },
  { id: 'about', number: '03', label: 'Higher' },
  { id: 'gallery', number: '04', label: 'Archivo' },
  { id: 'services', number: '05', label: 'Servicios' },
  { id: 'store', number: '06', label: 'Store' },
  { id: 'community', number: '07', label: 'Comunidad' },
  { id: 'playlist', number: '08', label: 'Selects' },
  { id: 'contact-cta', number: '09', label: 'Contacto' },
]

export default function ChapterRail() {
  const [active, setActive] = useState(chapters[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting)
        if (current) setActive(current.target.id)
      },
      { rootMargin: '-42% 0px -48%', threshold: 0 },
    )

    chapters.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Capítulos de la página"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {chapters.map((chapter) => {
        const selected = active === chapter.id
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-current={selected ? 'location' : undefined}
            className="group flex items-center gap-3 py-1"
          >
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.24em] transition-all duration-500 ${
                selected ? 'translate-x-0 text-bone/70' : 'translate-x-2 text-transparent'
              }`}
            >
              {chapter.number} · {chapter.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                selected ? 'w-8 bg-bone/70' : 'w-3 bg-bone/20 group-hover:w-5 group-hover:bg-bone/[0.45]'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}
