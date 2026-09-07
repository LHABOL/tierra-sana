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

## Lianas de selva en las orillas

`EdgeVines` se coloca **por sección** (`<EdgeVines tone="light|dark" />`) e va
**en el fondo**: detrás del contenido (`-z-[1]`, sobre el color de la sección) y
se desplaza con el scroll. Cada orilla es una cortina densa de tallos sinuosos
con hojas, flores y zarcillos; `tone` fija los verdes para que contrasten con
marfil o con oliva. Bajan despacio con un serpenteo horizontal y un vaivén más
lento —como una serpiente. Solo se anima `transform` (`@keyframes vine-descend`
+ `vine-sway` en `globals.css`), sin JavaScript. Para ajustarlo se edita
[`src/components/ui/EdgeVines.tsx`](src/components/ui/EdgeVines.tsx). La sección
contenedora necesita `relative isolate overflow-hidden`.
`prefers-reduced-motion` deja las lianas quietas.

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion` (Reveal, EdgeVines, QuoteSection)
- `:focus-visible` coherente con la marca
- Componentes server por defecto; cliente solo donde hay interacción
- Animaciones con `transform`/`opacity`, `whileInView` con `once: true`
