---
name: "HIGHER MUSIK"
description: "El Estudio Después de Medianoche: una identidad íntima, premium, nocturna y luminosa."
colors:
  midnight-black: "#050505"
  vinyl-black: "#0B0B0F"
  underground-violet: "#3A146B"
  ultraviolet-pulse: "#7C3AED"
  afterglow-magenta: "#FF2FA3"
  studio-light-white: "#F5F5F5"
  cold-ash: "#A1A1AA"
  glass-surface: "rgba(255, 255, 255, 0.025)"
  glass-border: "rgba(255, 255, 255, 0.09)"
  hairline-white: "rgba(255, 255, 255, 0.12)"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.8rem, 5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.333
    letterSpacing: "0.28em"
rounded:
  none: "0px"
  action: "8px"
  media: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  container-mobile: "24px"
  container-tablet: "40px"
  container-desktop: "64px"
  section-min: "96px"
  section-max: "160px"
components:
  button-ghost:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.studio-light-white}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.055)"
    textColor: "{colors.studio-light-white}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  glass-panel:
    backgroundColor: "{colors.glass-surface}"
    textColor: "{colors.studio-light-white}"
    rounded: "{rounded.media}"
    padding: "24px"
  media-frame:
    backgroundColor: "{colors.vinyl-black}"
    rounded: "{rounded.media}"
  nav-label:
    textColor: "{colors.studio-light-white}"
    typography: "{typography.label}"
  section-eyebrow:
    textColor: "{colors.cold-ash}"
    typography: "{typography.label}"
  section-title:
    textColor: "{colors.studio-light-white}"
    typography: "{typography.display}"
  artist-card:
    backgroundColor: "transparent"
    textColor: "{colors.studio-light-white}"
    rounded: "{rounded.media}"
    padding: "0px"
---

# Design System: HIGHER MUSIK

## Overview

**Creative North Star: "El Estudio Después de Medianoche"**

La identidad captura el instante en que una sesión nocturna se vuelve importante: el espacio permanece oscuro y contenido, mientras el logo, la música, las portadas y los artistas reciben una luz precisa. El resultado es íntimo y premium sin sentirse corporativo; moderno y vanguardista sin depender de clichés tecnológicos.

La composición combina escala editorial, navegación casi archivística y movimiento cinematográfico. El negro no es vacío decorativo: funciona como sala, silencio y concentración. El violeta y el magenta son señales breves de energía creativa, nunca iluminación ambiental permanente. La cultura urbana aparece mediante artistas, música, lenguaje y proceso real; no mediante grafiti, códigos visuales genéricos de trap, estética gaming ni recursos de discoteca neón.

**Key Characteristics:**

- Oscuridad dominante con luz focal, contraste alto y acentos escasos.
- Titulares condensados de gran escala junto a metadatos monoespaciados.
- Imágenes tratadas como portadas, archivo y evidencia del proceso creativo.
- Superficies precisas, sobrias y ligeramente translúcidas.
- Movimiento lento y editorial que responde al scroll y a la interacción.

## Colors

La paleta se comporta como una sala negra con instrumentos luminosos: los neutrales sostienen casi toda la superficie y los acentos aparecen como pulsos controlados.

### Primary

- **Pulso Ultravioleta:** acento principal para foco visible, selección de texto, halos radiales y momentos activos. Debe señalar energía o interacción, no rellenar grandes superficies.
- **Violeta Subsuelo:** profundidad cromática secundaria para transiciones, capas oscuras y continuidad entre el negro y el pulso brillante.

### Secondary

- **Magenta Afterglow:** destello de alta energía reservado para reflejos, gradientes especiales o momentos excepcionales de marca. No compite de forma permanente con Pulso Ultravioleta.

### Neutral

- **Negro Medianoche:** fondo dominante de página y escenario visual de todas las secciones.
- **Negro Vinilo:** fondo de medios, tarjetas y estados donde una capa necesita separarse sutilmente del escenario.
- **Blanco Luz de Estudio:** texto principal, logotipo luminoso y elementos que deben entrar en foco.
- **Ceniza Fría:** texto secundario, descripciones, metadatos y jerarquía silenciosa.
- **Superficie de Cristal:** velo translúcido para paneles y acciones sin aclarar la atmósfera general.
- **Borde de Cristal:** contorno tenue de paneles y marcos de medios.
- **Línea de Archivo:** divisores horizontales, capítulos y estructura editorial.

### Named Rules

**The Controlled Pulse Rule.** Pulso Ultravioleta y Magenta Afterglow son señales breves; la mayor parte de cada pantalla permanece neutral.

**The Black Has Layers Rule.** Negro Medianoche domina, pero Negro Vinilo, cristal, bordes y gradientes construyen profundidad sin convertir la interfaz en una masa plana.

**The No Urban Costume Rule.** La identidad urbana proviene del contenido y la cultura real; no se añaden grafitis, cadenas, texturas de muro, llamas ni símbolos genéricos de trap.

## Typography

**Display Font:** Anton (con `sans-serif` como respaldo)

**Body Font:** Inter (con `sans-serif` como respaldo)
**Label/Mono Font:** IBM Plex Mono (con `monospace` como respaldo)

**Character:** Anton aporta presencia comprimida y escala de cartel; Inter mantiene la lectura limpia; IBM Plex Mono convierte navegación, capítulos, estados y créditos en un sistema de archivo técnico. La combinación es contundente sin ser agresiva.

### Hierarchy

- **Display** (400, escala fluida, interlineado 0.86): títulos de sección y nombres protagonistas; siempre en mayúsculas, compactos y con espaciado negativo.
- **Headline** (400, escala fluida, interlineado 0.88): nombres de servicios y títulos editoriales secundarios.
- **Title** (400, 1.5–1.875rem, interlineado 1): nombres de artistas, productos y elementos de tarjeta.
- **Body** (400, 1rem, interlineado 1.5): descripciones y narrativa; el color Ceniza Fría reduce intensidad sin sacrificar legibilidad.
- **Label** (400, 0.75rem, interletraje 0.28em): navegación, capítulos, eyebrows, precios y metadatos; normalmente en mayúsculas.

### Named Rules

**The Three Voices Rule.** Anton habla, Inter explica e IBM Plex Mono cataloga; no intercambiar sus funciones por conveniencia.

**The Compressed Stage Rule.** Los titulares grandes usan líneas cerradas y ancho visual concentrado; nunca se suavizan con pesos ligeros o tipografías redondeadas.

## Layout

El sitio usa un contenedor centrado de hasta 1400px, con márgenes laterales progresivos de 24px en móvil, 40px desde tablet y 64px en escritorio. Las secciones respiran entre 96px y 160px verticales mediante una escala fluida. La estructura alterna grandes escenas inmersivas, grillas editoriales de 12 columnas y carriles horizontales que permiten descubrir artistas sin convertir la página en un catálogo convencional.

Los puntos de cambio observados son 640px, 768px, 1024px y 1280px. Por debajo de 768px, la navegación se convierte en menú de pantalla completa, las grillas colapsan y las acciones se apilan. A partir de 768px aparecen composiciones de 12 columnas; a 1280px se suma el rail fijo de capítulos. La densidad se mantiene baja: pocos elementos, grandes pausas y una sola jerarquía dominante por región.

**The Chapter Rhythm Rule.** Cada sección se lee como un capítulo: eyebrow, título o pieza protagonista, contenido de apoyo y una separación tenue antes del siguiente bloque.

**The One Stage Rule.** Una región puede tener una imagen, palabra o logo dominante; el resto acompaña y no compite por escala.

## Elevation & Depth

El sistema usa profundidad por capas: fondos negros diferenciados, cristal tenue, gradientes sobre imágenes, desenfoques ambientales y parallax. No hay sombras permanentes en reposo. Las sombras aparecen solo durante interacción, especialmente cuando una tarjeta premium se eleva unos píxeles y recibe un `drop-shadow` oscuro. Los paneles de cristal usan desenfoque de fondo, borde fino y una superficie blanca casi imperceptible.

### Shadow Vocabulary

- **Elevación interactiva:** `drop-shadow(0 20px 42px rgba(0, 0, 0, 0.34))`; solo para hover de tarjetas premium junto con elevación y una rotación mínima.
- **Halo ultravioleta:** gradiente radial violeta difuso; ambienta héroes o llamadas clave sin convertirse en un bloque de color.
- **Halo afterglow:** gradiente radial magenta todavía más restringido; reservado para momentos excepcionales.

### Named Rules

**The Shadow on Contact Rule.** Las superficies son planas y precisas en reposo; la sombra confirma interacción, nunca estatus decorativo.

**The Glass Is a Veil Rule.** El cristal separa capas con baja opacidad y blur, pero jamás vuelve gris o lechosa la interfaz.

## Shapes

La geometría es sobria: esquinas rectas para la arquitectura general, acciones suavemente curvadas con radio de 8px y medios o paneles con radio de 12px. Los bordes son finos y translúcidos; las líneas horizontales estructuran capítulos, listas y tarjetas. Los círculos o píldoras no forman parte del lenguaje principal.

**The Tight Corners Rule.** Las curvas suavizan el contacto sin volver amable o juguetona la marca: 8px para acciones, 12px para medios y paneles, 0px para la estructura editorial.

## Components

### Buttons

- **Shape:** rectángulo preciso con curvatura contenida (8px).
- **Primary:** acción fantasma sobre superficie casi transparente, borde blanco tenue, texto Blanco Luz de Estudio y padding de 12px × 24px.
- **Hover / Focus:** el fondo y el borde se aclaran con una transición de 300ms; el foco usa un contorno Pulso Ultravioleta de 2px con 3px de separación.
- **Secondary:** enlace monoespaciado con subrayado que crece desde la derecha y cambia su origen al entrar en hover.

### Cards / Containers

- **Corner Style:** medios y paneles usan curvas contenidas (12px); listas editoriales pueden conservar bordes rectos.
- **Background:** Negro Vinilo para marcos de medios y Superficie de Cristal para paneles destacados.
- **Shadow Strategy:** sin sombra en reposo; elevación interactiva solo en tarjetas señaladas como premium.
- **Border:** Borde de Cristal o Línea de Archivo, nunca un contorno opaco.
- **Internal Padding:** 20–24px en tarjetas regulares y 32–40px en composiciones destacadas.

### Navigation

La barra principal mide 80px de alto y comienza transparente. Después del scroll adopta Negro Medianoche translúcido, blur fuerte, borde inferior tenue y una línea de progreso. Los enlaces usan IBM Plex Mono en mayúsculas; el hover revela un subrayado animado. En móvil, la navegación ocupa el viewport bajo el header y usa Anton a gran escala. El rail lateral de capítulos aparece solo en escritorio amplio y muestra una línea más larga para el capítulo activo.

### Artist Card

Combina retrato vertical 4:5, índice monoespaciado, nombre condensado y metadatos de Spotify. La imagen parte con desaturación parcial y recupera color mientras escala ligeramente en hover. La capa informativa permanece accesible en móvil y se revela mediante hover o foco dentro de la tarjeta en escritorio.

### Media Frame

Las portadas, fotografías y escenas se presentan en Negro Vinilo con borde tenue y curva de 12px. Una capa de gradiente oscuro protege el texto superpuesto. El tratamiento base reduce ligeramente la saturación; la interacción devuelve color sin aplicar filtros vistosos.

### Section Header

Cada capítulo usa una etiqueta monoespaciada Ceniza Fría y un título Anton de escala fluida. En bloques editoriales, una línea inferior o superior de baja opacidad alinea metadatos y refuerza la sensación de archivo.

## Do's and Don'ts

### Do:

- **Do** reservar la mayor escala visual para una sola pieza protagonista por región.
- **Do** usar Negro Vinilo, cristal tenue, bordes y gradientes para construir capas dentro de Negro Medianoche.
- **Do** mantener Pulso Ultravioleta y Magenta Afterglow como acentos breves y significativos.
- **Do** expresar cultura urbana mediante artistas, música, créditos, proceso, comunidad y contenido auténtico.
- **Do** mantener estados de foco visibles y respetar `prefers-reduced-motion`.
- **Do** usar fotografía y portadas con tratamiento editorial, desaturación moderada y recuperación de color en interacción.

### Don't:

- **Don't** usar grafiti, texturas de muro, estética gaming, discoteca neón ni clichés visuales de trap.
- **Don't** convertir el violeta o el magenta en fondos saturados de pantalla completa.
- **Don't** añadir sombras permanentes, tarjetas flotantes genéricas o grandes brillos decorativos sin función.
- **Don't** mezclar las funciones de Anton, Inter e IBM Plex Mono.
- **Don't** redondear todo en píldoras ni introducir formas juguetonas que rompan la precisión sobria.
- **Don't** llenar cada sección con múltiples llamadas, etiquetas o adornos que compitan entre sí.
