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
### Papel tapiz floral (`BotanicalBackdrop`)

Está presente en **todas las secciones y páginas** del sitio: un patrón SVG de
flores pequeñas de colores suaves que se repite (mosaico de 270–460 px según
`density`), en opacidad baja (0.26 sobre marfil / 0.30 sobre oliva) para que
acompañe sin competir con el contenido.

- Colores que armonizan con la identidad: verde salvia, rosa polvo, ocre,
  terracota, azul apagado (versiones luminosas sobre fondos oscuros).
- Movimiento "temblado": **dos capas** sobredimensionadas del patrón se mecen
  muy lento en órbitas opuestas (`@keyframes botanical-orbit-a` / `-b`,
  translate ≤ 1.8 %, 42 s). Solo `transform` → compuesto en GPU, sin JS.
- El mosaico se genera como data-URI a partir de la paleta, así que no hay
  ningún nodo por flor (una capa, dos `<div>` de fondo).

Props:

| prop | valores | efecto |
|------|---------|--------|
| `tone` | `"light"` / `"dark"` | paleta y opacidad según el fondo |
| `density` | `"sparse"` · `"normal"` · `"lush"` | tamaño del mosaico (menos = más flores) |
| `seed` | número | desfase de fase por sección (sin desajuste de hidratación) |
| `opacity` | 0–1 | multiplicador (p. ej. `0.7` sobre el catálogo) |

La sección contenedora lleva `relative isolate overflow-hidden` y la capa
`-z-[1]`, para quedar por encima del fondo pero detrás del contenido.

Todo respeta `prefers-reduced-motion` (la regla global congela las animaciones).

## Layout

- Contenedor `.shell`: máx. 1240px, padding lateral `clamp(1.25rem, 5vw, 3.5rem)`.
- Mucho espacio negativo. Secciones con `py-24`/`py-32`.
- Bordes sutiles (`olive/10–20`), sin sombras duras.
- Grids de producto: 1 col móvil → 2 col `sm` → 3 col `lg`.

## Fotografía

No hay fotos reales todavía. Cada hueco usa `ImagePlaceholder` con proporción
fija y etiqueta discreta ("Fotografía del producto"). Sustituir poblando
`image` en `src/lib/products.ts` — ver README.
