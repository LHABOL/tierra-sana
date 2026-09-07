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

### Cortina de lianas en las orillas (`EdgeVines`)

Se coloca **por sección** (`<EdgeVines tone="light|dark" />` como primer hijo de
un contenedor `relative isolate overflow-hidden`), **integrada en el fondo**:
va detrás del contenido (`-z-[1]`, encima del color de la sección pero debajo
del texto) y **se desplaza con el scroll** — no es fija.

- **Toque selvático denso**: cada orilla es una cortina de 4 tallos sinuosos
  juntos, con hojas (3 verdes), flores y zarcillos. `tone` fija los verdes:
  oscuros sobre marfil, claros sobre oliva/negro → contraste en ambos fondos.
  Ancho de orilla `clamp(84px, 15vw, 210px)`.
- **Movimiento como serpiente**, 100 % CSS (solo `transform`):
  · `vine-descend` — la tira baja despacio (90–108 s) con un serpenteo
    horizontal de ±6 px;
  · `vine-sway` — el conjunto cuelga desde arriba y se mece más lento
    (14–17 s, `transform-origin: top`).
  El tramo (`--tile` = 460 px) se repite en vertical → bucle sin salto.
- `aria-hidden`, `pointer-events-none`. `prefers-reduced-motion`: lianas
  quietas (`.vine-strip`, `.vine-sway { transform: none }`).

## Layout

- Contenedor `.shell`: máx. 1240px, padding lateral `clamp(1.25rem, 5vw, 3.5rem)`.
- Mucho espacio negativo. Secciones con `py-24`/`py-32`.
- Bordes sutiles (`olive/10–20`), sin sombras duras.
- Grids de producto: 1 col móvil → 2 col `sm` → 3 col `lg`.

## Fotografía

No hay fotos reales todavía. Cada hueco usa `ImagePlaceholder` con proporción
fija y etiqueta discreta ("Fotografía del producto"). Sustituir poblando
`image` en `src/lib/products.ts` — ver README.
