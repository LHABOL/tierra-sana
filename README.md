# Tierra Sana

Sitio e-commerce para una marca de productos de limpieza naturales.
Estética minimalista, premium, natural y editorial.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS 3** para estilos
- **Framer Motion** para microanimaciones (fade-in, fade-up, parallax ligero, hover)
- **lucide-react** para iconografía

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start
```

## Estructura

```
src/
  app/                    Rutas (App Router)
    page.tsx              Home
    catalogo/             Catálogo con filtro por categoría
    producto/[slug]/      Detalle de producto (SSG + JSON-LD)
    carrito/              Página de carrito
    checkout/             Checkout (estructura lista para pasarela)
    nosotros/ contacto/ ubicacion/
    politicas/ terminos/ privacidad/
    sitemap.ts robots.ts
  components/
    layout/               Navbar, Footer, MobileMenu
    providers/            CartProvider (estado + localStorage)
    cart/                 CartDrawer, CartView, AddToCartButton, QuantitySelector
    products/             ProductCard, ProductDetail, CategoryFilter
    sections/             Hero, BrandPhilosophy, ProductCatalog, Benefits,
                          QuoteSection, Contact, Location
    ui/                   Reveal, EdgeVines (lianas de selva en las orillas),
                          ImagePlaceholder, Button, Field, PageHeader, Wordmark,
                          SearchOverlay, LegalPage
  lib/
    products.ts           FUENTE ÚNICA del catálogo
    categories.ts         Categorías
    site.ts               Datos de marca (contacto, ubicación, envío, redes)
    types.ts  format.ts
  hooks/
    useScrolled.ts
```

## Cómo cambiar contenido

### Productos

Todo el catálogo vive en [`src/lib/products.ts`](src/lib/products.ts).
Cada producto define nombre, precio, descripción, categoría, ingredientes,
presentación, disponibilidad, etc. Ningún componente visual necesita tocarse.

### Fotografías

Los productos usan `image: null` → se muestra un **placeholder premium** con las
proporciones correctas. Para publicar fotos reales:

1. Coloca la imagen en `public/productos/` (o usa una URL/CDN).
2. En `products.ts`, cambia `image: null` por `image: "/productos/mi-foto.jpg"`.

`ImagePlaceholder` cambia automáticamente a `next/image` optimizada.

### Datos de marca

Contacto, WhatsApp, dirección, horarios, costo de envío y redes sociales están
en [`src/lib/site.ts`](src/lib/site.ts).

## Carrito

Estado global con React Context + `useReducer`, persistido en `localStorage`
(`tierra-sana:cart`). Panel lateral (`CartDrawer`) y página completa (`/carrito`).

## Checkout y pagos

`/checkout` recoge contacto, dirección, método de envío y muestra el resumen.
La sección de **Pago** está marcada como punto de integración para
**Mercado Pago** o **Stripe**. El sitio **no** almacena datos de tarjetas.

## SEO

- Metadata + Open Graph por página (`generateMetadata`)
- `sitemap.xml` y `robots.txt` generados
- JSON-LD `Product` en las páginas de detalle
- Jerarquía de encabezados y `alt` en imágenes

## Marco de selva (lianas + hojas de esquina)

`EdgeVines` (`<EdgeVines tone="light|dark" />`, por sección) dibuja lianas
fotográficas en los **4 bordes**, **en el fondo**: detrás del contenido
(`-z-[1]`) y se desplazan con el scroll. La liana es un fotograma del video de
referencia recortado y sin fondo (`public/vines/vine-strip.webp`, ~82 KB; el
`.png` queda de respaldo). El mosaico está espejado → se repite sin costura.
Cada banda lleva una `mask-image` en degradado que la funde hacia el centro
→ las lianas se disuelven en el fondo, sin línea de marco. Además, cada
esquina suma un par de hojas grandes en SVG (`CornerLeaf`) para un carácter
de selva más denso. Movimiento tipo serpiente 100% CSS para las lianas
(`@keyframes vine-serpent`, va y vuelve, nunca "salta") y un vaivén propio muy
tenue para las hojas (`@keyframes leaf-sway`); dos capas desfasadas rompen la
repetición. Se ajusta en
[`src/components/ui/EdgeVines.tsx`](src/components/ui/EdgeVines.tsx). La sección
contenedora necesita `relative isolate overflow-hidden`.
`prefers-reduced-motion` deja las lianas y las hojas quietas.

## Logotipo

`Wordmark` (navbar/footer) usa el **sello oficial real** de la marca:
`public/imagenes/logo-tierra-sana.webp` (+ `.png` de respaldo), recortado del
archivo que entregó el cliente (`public/imagenes/Logo Tierra sana.jpeg`) —
se le quitó el subtítulo ("Cosméticos · Higiene · Limpieza natural") y el
fondo blanco de alrededor (queda transparente). El sello conserva su propio
verde, por lo que se muestra un poco más alto que la barra de navegación
para que "TIERRA SANA" siga siendo legible. `LogoMark` (el ícono de tres
hojas en SVG, sin el sello) vive en el mismo archivo
([`src/components/ui/Wordmark.tsx`](src/components/ui/Wordmark.tsx)) y se
usa como acento decorativo pequeño en `BrandPhilosophy` y en el CTA final de
inicio.

Para volver a generar el recorte a partir del JPEG original (por ejemplo si
llega una versión con más resolución), el flujo con `ffmpeg` fue: recortar al
óvalo del sello, pintar la franja del subtítulo con el verde del sello
(`~#6B8973`) y usar el canal azul (`b(X,Y)`) para construir el canal alfa —
separa mejor el blanco puro del crema de las hojas que un `colorkey` normal,
que confundía ambos colores.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion` (Reveal, EdgeVines, QuoteSection)
- `:focus-visible` coherente con la marca
- Componentes server por defecto; cliente solo donde hay interacción
- Animaciones con `transform`/`opacity`, `whileInView` con `once: true`
