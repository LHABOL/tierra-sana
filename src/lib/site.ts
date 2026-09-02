/**
 * Datos globales de la marca. Centralizados para que cualquier cambio
 * (contacto, dirección, redes, envío) se haga en un solo lugar.
 */
export const site = {
  name: "Tierra Sana",
  shortName: "Tierra Sana",
  tagline: "Limpieza que vuelve a lo esencial.",
  description:
    "Productos de limpieza naturales para el hogar. Fórmulas inspiradas en ingredientes y procesos naturales: higiene efectiva, consciente y agradable.",
  url: "https://tierrasana.mx",
  locale: "es_MX",
  currency: "MXN",

  contact: {
    email: "hola@tierrasana.mx",
    phone: "+52 55 1234 5678",
    whatsapp: "+52 55 1234 5678",
    whatsappUrl: "https://wa.me/525512345678",
    hours: "Lunes a viernes, 9:00 – 18:00 h",
  },

  location: {
    street: "Av. de los Insurgentes Sur 1234, Col. Del Valle",
    city: "Ciudad de México",
    state: "CDMX",
    zip: "03100",
    country: "México",
    hours: "Lunes a sábado, 10:00 – 19:00 h",
    // Reemplazar por el src real de Google Maps cuando esté disponible.
    mapEmbedSrc: "",
  },

  shipping: {
    flatRate: 149,
    freeThreshold: 899,
    estimate: "3 a 5 días hábiles",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
} as const;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Ubicación", href: "/ubicacion" },
] as const;
