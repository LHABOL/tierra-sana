# Tierra Sana — Dirección de arte

## Concepto

Marca de productos de limpieza **naturales de alta gama**. Cruce entre
cosmética natural, editorial de diseño y tienda premium para el hogar.
Nunca supermercado, nunca químico industrial.

Palabras guía: naturaleza · limpieza · pureza · bienestar · elegancia ·
confianza · minimalismo · responsabilidad ambiental · calidad premium.

## Color

| Rol | Nombre | HEX |
|-----|--------|-----|
| Principal | Verde militar / oliva profundo | `#3C4A32` |
| Oliva más oscuro (hover) | `olive-deep` | `#2B3524` |
| Oliva medio (apoyo) | `olive-mid` | `#5B6B4A` |
| Oliva claro | `olive-soft` | `#8A9A7B` |
| Salvia muy tenue | `sage` | `#DDE3D5` |
| Secundario | Negro cálido | `#14140F` |
| Fondo | Blanco roto / marfil | `#F6F4EC` |
| Gris cálido (texto secundario) | `stone` | `#8C877B` |

Sin colores saturados. El negro da contraste y elegancia; el verde, naturaleza.
Definidos en `tailwind.config.ts` y espejados en `globals.css :root`.

## Tipografía

- **Serif — Fraunces** (`--font-serif`): títulos, precios, citas. Peso 400/500,
  con cursiva para acentos. `letter-spacing` negativo en display.
- **Sans — Inter** (`--font-sans`): cuerpo, navegación, etiquetas.
  Mayúsculas + `tracking` amplio (`0.2em`–`0.32em`) para eyebrows y botones.

Escala display: `clamp(2.6rem, 7vw, 5.4rem)`.

## Movimiento

**Sin scrollytelling.** Navegación convencional. Microanimaciones casi
imperceptibles con Framer Motion:

- `Reveal`: fade + 16px de desplazamiento, `once: true`, ease `[0.16,1,0.3,1]`.
- Hero: máscara de líneas que suben + fade escalonado.
- `QuoteSection`: parallax de ±24px sobre el texto.
- Hover botones: la flecha aparece y el `tracking` se abre ligeramente.

### Marco de lianas reales (`EdgeVines`)

Se coloca **por sección** (`<EdgeVines tone="light|dark" />` como primer hijo de
un contenedor `relative isolate overflow-hidden`), **en el fondo**: detrás del
contenido (`-z-[1]`) y **se desplaza con el scroll**.

- **Liana real, sin fondo**: es un fotograma del video de referencia recortado
  y con el fondo gris eliminado por chroma-key
  (`/public/vines/vine-strip.webp`, ~82 KB · `.png` de respaldo). El mosaico
  está espejado → se repite sin costura a lo ancho.
- **4 bordes** (`Band` top/bottom/left/right): la lámina horizontal se rota 90°
  para los lados y se voltea para el borde inferior; grosor
  `clamp(96px, 15vw, 210px)`.
- **Sin línea de marco**: cada banda lleva `mask-image` en degradado
  (`FADE_H` / `FADE_V`) que la funde progresivamente hacia el centro → las
  lianas se disuelven en el fondo, no se ve el borde recto del recorte.
- **Movimiento como serpiente**, 100 % CSS: `@keyframes vine-serpent` (vaivén
  lateral ±20 px + giro ≤ 0.8°) con `animation-direction: alternate` → **va y
  vuelve, nunca salta**. Dos capas desfasadas rompen la simetría del espejo.
  Propiedades `translate`/`rotate` → compuesto en GPU.
- `tone` aplica un `filter` (aclara los verdes sobre oliva/negro).
- `aria-hidden`, `pointer-events-none`. `prefers-reduced-motion`: lianas
  quietas (`.vine-strip { translate:0; rotate:0 }`).

## Layout

- Contenedor `.shell`: máx. 1240px, padding lateral `clamp(1.25rem, 5vw, 3.5rem)`.
- Mucho espacio negativo. Secciones con `py-24`/`py-32`.
- Bordes sutiles (`olive/10–20`), sin sombras duras.
- Grids de producto: 1 col móvil → 2 col `sm` → 3 col `lg`.

## Fotografía

No hay fotos reales todavía. Cada hueco usa `ImagePlaceholder` con proporción
fija y etiqueta discreta ("Fotografía del producto"). Sustituir poblando
`image` en `src/lib/products.ts` — ver README.
