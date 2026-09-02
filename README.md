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
    ui/                   Reveal, BotanicalBackdrop (flores de fondo · templates),
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

## Papel tapiz floral

`BotanicalBackdrop` pone un patrón de flores pequeñas de colores suaves detrás
de **todas las secciones y páginas**, con un vaivén "temblado" muy lento (dos
capas del patrón que se mecen en órbitas opuestas). Es CSS puro: el mosaico es
un SVG data-URI y solo se anima `transform` (`@keyframes botanical-orbit-a/-b`
en `globals.css`). Props: `tone` (`light`/`dark`, ajusta paleta y opacidad al
fondo), `density` (`sparse`/`normal`/`lush`), `seed` (desfase por sección),
`opacity`. La sección contenedora usa `relative isolate overflow-hidden`.
Detalles en
[`src/components/ui/BotanicalBackdrop.tsx`](src/components/ui/BotanicalBackdrop.tsx).

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion` (Reveal, BotanicalBackdrop, QuoteSection)
- `:focus-visible` coherente con la marca
- Componentes server por defecto; cliente solo donde hay interacción
- Animaciones con `transform`/`opacity`, `whileInView` con `once: true`
