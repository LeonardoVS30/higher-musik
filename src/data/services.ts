import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'executive-production',
    number: '01',
    title: 'PRODUCCIÓN EJECUTIVA',
    image: '/images/services/executive-production.jpg',
    description:
      'Nos encargamos del proceso de producción de forma integral, desde una idea inicial hasta la ejecución final del proyecto. Trabajamos sobre el sonido, las sesiones, la producción de las canciones y la coordinación creativa para construir una propuesta completa alrededor de cada lanzamiento.',
  },
  {
    id: 'artist-development',
    number: '02',
    title: 'DESARROLLO DE ARTISTAS',
    image: '/images/services/artist-development.jpg',
    description:
      'Trabajamos sobre todo lo que rodea al artista más allá de la música: identidad, dirección creativa, estética, narrativa y posicionamiento. El objetivo es construir un universo propio y coherente que acompañe cada etapa del proyecto y fortalezca su presencia.',
  },
  {
    id: 'distribution-publishing',
    number: '03',
    title: 'DISTRIBUCIÓN & PUBLISHING',
    image: '/images/services/distribution-publishing.jpg',
    description:
      'Organizamos y acompañamos la circulación profesional de la música, cuidando lanzamientos, catálogo y oportunidades alrededor de cada obra.',
  },
]
