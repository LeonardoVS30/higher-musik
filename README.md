# HIGHER MUSIK — Official Website

Sitio web oficial del sello discográfico HIGHER MUSIK. Construido con
React + Vite + TypeScript y Tailwind CSS.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Esto levanta un servidor local (por defecto en `http://localhost:5173`).

## Build de producción

```bash
npm run build
```

Los archivos optimizados quedan en la carpeta `dist/`.

Para previsualizar el build de producción localmente:

```bash
npm run preview
```

## Estructura del proyecto

```text
src/
├── components/       # Un componente por sección/pieza de UI
├── data/              # Todo el contenido editable vive acá
├── types/             # Tipos de TypeScript compartidos
├── App.tsx            # Ensambla todas las secciones en orden
├── main.tsx           # Entry point de React
└── index.css          # Tailwind + estilos globales/utilidades

public/
├── images/
│   ├── artists/        # Fotos de artistas
│   ├── releases/        # Portadas de releases
│   ├── gallery/         # Galería visual del sello
│   ├── store/          # Imágenes de productos de la tienda
│   ├── playlist/        # Portada de la playlist oficial
│   └── branding/         # Logo y assets de marca
└── audio/               # Snippets de audio (releases y productos)
```

## Cómo editar contenido

Todo el contenido está centralizado en `src/data/`, así que **no hace falta
tocar los componentes** para actualizar información:

| Qué quiero cambiar          | Archivo                     |
| ---------------------------- | ---------------------------- |
| Artistas del roster          | `src/data/artists.ts`        |
| Último release               | `src/data/releases.ts`       |
| Servicios                    | `src/data/services.ts`       |
| Productos de la tienda       | `src/data/products.ts`       |
| Galería visual               | `src/data/gallery.ts`        |
| Redes sociales y Discord     | `src/data/socialLinks.ts`    |
| Playlist oficial             | `src/data/playlist.ts`       |
| Nombre del sello, nav, email | `src/data/site.ts`            |

### Reemplazar imágenes placeholder

Las imágenes que vienen con el proyecto (`public/images/artists/`,
`public/images/gallery/`, `public/images/store/`, etc.) son **placeholders
generados** con la paleta de la marca — no son fotos reales. Reemplazalas
por las fotos definitivas manteniendo el mismo nombre de archivo, o
actualizá la ruta correspondiente en el archivo de datos.

### Agregar un producto nuevo a la tienda

En `src/data/products.ts`, agregá un nuevo objeto al array `products`:

```ts
{
  id: 'kit-nuevo',
  name: 'NOMBRE DEL KIT',
  category: 'DRUM KIT',
  producer: 'HIGHER MUSIK',
  price: 29,
  currency: 'USD',
  image: '/images/store/kit-nuevo.jpg',
  previewAudio: '/audio/kit-nuevo-preview.mp3',
  description: 'Descripción corta del producto.',
  checkoutUrl: '', // dejar vacío hasta tener el link de compra
}
```

Mientras `checkoutUrl` esté vacío, el botón muestra "Coming soon". En
cuanto se complete con un link real (Stripe, Gumroad, Lemon Squeezy,
etc.), el botón cambia automáticamente a "Buy now".

### Habilitar links (Discord, redes, streaming)

Todos los links opcionales (Discord, Instagram, Spotify, etc.) se
comportan igual: si el campo `url` está vacío en el archivo de datos
correspondiente, el link se muestra deshabilitado visualmente. Basta con
completar la URL para que se active.

## Notas importantes

- **No se afirman colaboraciones reales.** Los artistas cargados por
  defecto son placeholders (`ARTIST NAME`) pensados para ser
  reemplazados por datos reales del roster.
- **Checkout de la tienda:** la arquitectura está preparada para
  integrar Stripe, Shopify, Gumroad o Lemon Squeezy vía `checkoutUrl`,
  pero no incluye un backend de pagos — eso se conecta después.
- **Accesibilidad:** el sitio respeta `prefers-reduced-motion`, tiene
  estados de foco visibles y usa elementos semánticos.

## Stack técnico

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animaciones y reveals de scroll)
