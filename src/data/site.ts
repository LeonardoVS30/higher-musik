export const siteConfig = {
  name: 'HIGHER MUSIK',
  email: 'highermusikgroup@gmail.com',
  tagline: 'Sonido. Cultura. Dirección.',
  nav: [
    { label: 'Artistas', href: '#artists' },
    { label: 'Lanzamientos', href: '#release' },
    { label: 'Servicios', href: '#services' },
    { label: 'Tienda', href: '#store' },
    { label: 'Comunidad', href: '#community' },
    { label: 'Nosotros', href: '#about' },
  ],
}

export const contactEmailUrl = (subject: string) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
