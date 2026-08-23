import type { Product } from '../types'

// Reemplazar con datos reales de producto.
// Agregar un checkoutUrl cuando Stripe / Gumroad / Lemon Squeezy esté conectado.
// Sin uno, la tarjeta muestra "PRÓXIMAMENTE" en vez de "COMPRAR AHORA".
export const products: Product[] = [
  {
    id: 'kit-nocturne',
    name: 'NOCTURNE',
    category: 'KIT DE BATERÍA',
    producer: 'HIGHER MUSIK',
    price: 29,
    currency: 'USD',
    image: '/images/store/kit-nocturne.jpg',
    previewAudio: '/audio/kit-nocturne-preview.mp3',
    description: 'Batería oscura y atmosférica, pensada para sesiones nocturnas.',
    checkoutUrl: '',
  },
  {
    id: 'kit-frequency',
    name: 'FREQUENCY',
    category: 'LIBRERÍA DE SAMPLES',
    producer: 'HIGHER MUSIK',
    price: 39,
    currency: 'USD',
    image: '/images/store/kit-frequency.jpg',
    previewAudio: '/audio/kit-frequency-preview.mp3',
    description: 'Loops melódicos con textura, para R&B alternativo y trap.',
    checkoutUrl: '',
  },
  {
    id: 'kit-afterhours',
    name: 'AFTER HOURS',
    category: 'PACK DE PRESETS',
    producer: 'HIGHER MUSIK',
    price: 24,
    currency: 'USD',
    image: '/images/store/kit-afterhours.jpg',
    previewAudio: '/audio/kit-afterhours-preview.mp3',
    description: 'Presets de synth ambient para producciones cinematográficas y minimalistas.',
    checkoutUrl: '',
  },
  {
    id: 'kit-lowlight',
    name: 'LOW LIGHT',
    category: 'LOOP KIT',
    producer: 'HIGHER MUSIK',
    price: 34,
    currency: 'USD',
    image: '/images/store/kit-lowlight.jpg',
    previewAudio: '/audio/kit-lowlight-preview.mp3',
    description: 'Loops de guitarra y teclados con clima oscuro, para trap y R&B.',
    checkoutUrl: '',
  },
]
