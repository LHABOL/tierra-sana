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

### Hojas cayendo (`FallingLeaves`)

Una **sola capa fija a la ventana** (`position: fixed`), montada una vez en
`layout.tsx`, con ~26 hojas pequeñas (12–28 px) que caen despacio de arriba a
abajo con un balanceo suave. Al estar fija, el efecto acompaña el scroll por
**todo el largo de la página**.

- Colores oliva / salvia / tierra que se leen igual sobre marfil y sobre verde
  profundo; opacidad 0.14–0.30 por hoja para no competir con el contenido.
- Movimiento 100 % CSS: `@keyframes leaf-fall` (caída lineal, 20–42 s) en el
  `<div>` exterior + `leaf-sway` (vaivén lateral + giro, 4–8 s) en el interior.
  Solo `transform` → compuesto en GPU, sin JavaScript.
- Reparto determinista (PRNG `mulberry32` sembrado) → sin desajustes de
  hidratación. Va por delante del contenido (`z-[5]`) pero por debajo de la
  barra (`z-40`) y de los paneles (`z-50`); `pointer-events-none`.
- `prefers-reduced-motion`: sin caída — las hojas quedan repartidas y quietas
  (regla `.leaf-fall { transform: translateY(var(--rest)) }`).

## Layout

- Contenedor `.shell`: máx. 1240px, padding lateral `clamp(1.25rem, 5vw, 3.5rem)`.
- Mucho espacio negativo. Secciones con `py-24`/`py-32`.
- Bordes sutiles (`olive/10–20`), sin sombras duras.
- Grids de producto: 1 col móvil → 2 col `sm` → 3 col `lg`.

## Fotografía

No hay fotos reales todavía. Cada hueco usa `ImagePlaceholder` con proporción
fija y etiqueta discreta ("Fotografía del producto"). Sustituir poblando
`image` en `src/lib/products.ts` — ver README.
