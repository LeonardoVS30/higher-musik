import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'creative-direction',
    number: '01',
    title: 'DIRECCIÓN CREATIVA',
    image: '/images/services/executive-production.jpg',
    description:
      'Construimos una dirección clara para cada proyecto: concepto, identidad visual, narrativa y decisiones creativas que conectan la música con una presencia coherente.',
  },
  {
    id: 'mixing-mastering',
    number: '02',
    title: 'MEZCLA Y MÁSTER',
    image: '/images/services/distribution-publishing.jpg',
    description:
      'Llevamos cada canción desde la sesión hasta una entrega sólida y competitiva, cuidando balance, profundidad, carácter y traducción entre sistemas.',
  },
  {
    id: 'artist-development',
    number: '03',
    title: 'DESARROLLO DE ARTISTAS',
    image: '/images/services/artist-development.jpg',
    description:
      'Trabajamos identidad, estética, narrativa y posicionamiento para construir un universo propio que acompañe cada etapa del proyecto.',
  },
]
