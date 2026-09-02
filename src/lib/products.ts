import type { Product } from "./types";

/**
 * CATÁLOGO — fuente única de datos.
 *
 * Para publicar fotografías reales, reemplaza `image` por la ruta o URL
 * de la imagen (p. ej. "/productos/multiusos.jpg"). Mientras sea `null`,
 * la interfaz muestra un placeholder premium con las proporciones correctas.
 * Ningún componente visual necesita cambiar.
 */
export const products: Product[] = [
  {
    slug: "limpiador-multiusos-eucalipto",
    name: "Limpiador Multiusos",
    category: "multiusos",
    tagline: "Limpieza natural para diferentes superficies.",
    description:
      "Una fórmula equilibrada para el uso diario en la mayoría de las superficies lavables del hogar. Levanta el polvo y la grasa ligera sin dejar película ni olor persistente, y se aclara con facilidad.",
    price: 149,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Tensioactivos de origen vegetal",
      "Vinagre de alcohol",
      "Aceite esencial de eucalipto",
      "Extracto de romero",
    ],
    usage:
      "Aplica directamente sobre la superficie o sobre un paño húmedo. Deja actuar unos segundos y retira con un paño limpio. No requiere enjuague en superficies no porosas.",
    benefits: [
      "Multisuperficie de uso diario",
      "Se aclara sin dejar residuo",
      "Aroma natural discreto",
    ],
    available: true,
    featured: true,
    image: null,
    more:
      "Formulado con una concentración moderada de tensioactivos vegetales para que sea efectivo sin resecar las manos. El envase está pensado para ser rellenado con nuestros refill de 1 L.",
  },
  {
    slug: "desengrasante-cocina-limon",
    name: "Desengrasante de Cocina",
    category: "cocina",
    tagline: "Contra la grasa cotidiana de estufa y campana.",
    description:
      "Pensado para la grasa que se acumula en la zona de cocción. Ablanda los depósitos recientes y facilita el arrastre en campanas, azulejos y frentes de estufa.",
    price: 169,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Bicarbonato de sodio",
      "Tensioactivos de coco",
      "Ácido cítrico",
      "Aceite esencial de limón",
    ],
    usage:
      "Rocía sobre la superficie fría, deja actuar de 2 a 5 minutos y retira con un paño o esponja húmeda. Repite en zonas con mucha acumulación.",
    benefits: [
      "Actúa sobre grasa reciente",
      "Apto para acero, azulejo y esmalte",
      "Aroma cítrico natural",
    ],
    available: true,
    featured: true,
    image: null,
    more:
      "No contiene sosa cáustica ni disolventes derivados del petróleo. Para grasa muy incrustada, recomendamos aplicar dos veces en lugar de aumentar el tiempo de contacto.",
  },
  {
    slug: "limpiador-bano-menta",
    name: "Limpiador de Baño",
    category: "bano",
    tagline: "Frescura y cuidado para superficies húmedas.",
    description:
      "Para la limpieza regular de lavabos, regaderas y azulejos. Ayuda a mantener a raya las marcas de agua y la sensación de humedad, con un acabado limpio y fresco.",
    price: 159,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Ácido cítrico",
      "Ácido láctico",
      "Tensioactivos vegetales",
      "Aceite esencial de menta",
    ],
    usage:
      "Aplica sobre la superficie húmeda, distribuye con esponja y deja actuar 3 minutos. Enjuaga con agua. Uso semanal para mantenimiento.",
    benefits: [
      "Reduce marcas de agua y cal ligera",
      "Acabado fresco de menta",
      "Uso frecuente sin dañar juntas",
    ],
    available: true,
    image: null,
    more:
      "Los ácidos de esta fórmula son de origen fermentativo. En superficies de piedra natural (mármol, travertino) recomendamos usar el Cuidado de Superficies en su lugar.",
  },
  {
    slug: "limpiador-pisos-lavanda",
    name: "Limpiador de Pisos",
    category: "hogar",
    tagline: "Para trapear con un aroma tenue y natural.",
    description:
      "Diluible en cubeta para la limpieza de pisos de loseta, porcelanato y superficies selladas. Deja el ambiente con una nota de lavanda muy ligera, sin saturar.",
    price: 179,
    presentation: "1 L (concentrado)",
    ingredients: [
      "Agua purificada",
      "Tensioactivos de origen vegetal",
      "Glicerina vegetal",
      "Aceite esencial de lavanda",
      "Conservador aprobado para ecológicos",
    ],
    usage:
      "Diluye 2 tapas en 5 L de agua. Trapea sin necesidad de enjuague. Para suciedad intensa, aumenta a 3 tapas.",
    benefits: [
      "Rinde hasta 25 cubetas",
      "Aroma de lavanda discreto",
      "No deja piso pegajoso",
    ],
    available: true,
    featured: true,
    image: null,
    more:
      "El formato concentrado reduce el plástico y el transporte por litro efectivo. No recomendado para madera sin sellar ni pisos laminados sensibles al agua.",
  },
  {
    slug: "jabon-trastes-naranja",
    name: "Jabón para Trastes",
    category: "cocina",
    tagline: "Espuma suave para el lavado a mano.",
    description:
      "Lavavajillas a mano de espuma moderada que enjuaga rápido y deja los trastes sin película. Cuida la piel en lavados frecuentes.",
    price: 129,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Tensioactivos de coco y maíz",
      "Glicerina vegetal",
      "Ácido cítrico",
      "Aceite esencial de naranja dulce",
    ],
    usage:
      "Aplica unas gotas en la esponja húmeda. Una pequeña cantidad es suficiente. Enjuaga con agua.",
    benefits: [
      "Enjuague rápido, sin residuo",
      "Espuma moderada y estable",
      "Aroma de naranja natural",
    ],
    available: true,
    image: null,
    more:
      "La espuma moderada es intencional: más espuma no significa más limpieza y sí más agua de enjuague. Biodegradabilidad primaria conforme a norma vigente.",
  },
  {
    slug: "limpiavidrios-hierbabuena",
    name: "Limpiavidrios",
    category: "multiusos",
    tagline: "Cristales y espejos sin marcas.",
    description:
      "Fórmula ligera para vidrios, espejos y superficies brillantes. Se evapora de forma pareja para un acabado transparente sin pasadas repetidas.",
    price: 139,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Alcohol de caña",
      "Vinagre de alcohol",
      "Tensioactivo vegetal (trazas)",
      "Aceite esencial de hierbabuena",
    ],
    usage:
      "Rocía a 20 cm y retira con paño de microfibra o papel. Trabaja en zonas pequeñas y evita la luz directa del sol.",
    benefits: [
      "Acabado sin marcas ni halos",
      "Secado rápido y parejo",
      "Aroma fresco muy tenue",
    ],
    available: true,
    image: null,
    more:
      "El alcohol proviene de fermentación de caña. Para ventanales grandes en exterior, humedece primero con agua para arrastrar el polvo grueso.",
  },
  {
    slug: "aromatizante-textil-cedro",
    name: "Aromatizante Textil",
    category: "aromas",
    tagline: "Un velo de aroma para ropa de cama y sofás.",
    description:
      "Bruma ligera para refrescar textiles entre lavados. Notas de cedro y bergamota que se asientan en minutos sin dejar la tela húmeda.",
    price: 189,
    presentation: "250 ml",
    ingredients: [
      "Agua purificada",
      "Alcohol de caña",
      "Solubilizante de origen vegetal",
      "Aceite esencial de cedro",
      "Aceite esencial de bergamota",
    ],
    usage:
      "Agita y rocía a 30 cm sobre el textil. Deja secar antes de usar. No aplicar sobre seda ni cuero.",
    benefits: [
      "Refresca entre lavados",
      "Aroma que no empalaga",
      "Secado rápido sin mancha",
    ],
    available: true,
    image: null,
    more:
      "Sin almizcles sintéticos. La bergamota utilizada es libre de bergapteno (FCF), por lo que no fototoxifica los textiles claros.",
  },
  {
    slug: "ambientador-difusor-bosque",
    name: "Ambientador de Difusión",
    category: "aromas",
    tagline: "Aroma constante y bajo, para toda la habitación.",
    description:
      "Recarga para difusor de varillas con una mezcla forestal serena. Pensada para percibirse de fondo, no para llenar el aire.",
    price: 219,
    presentation: "200 ml",
    ingredients: [
      "Base vegetal de difusión",
      "Aceite esencial de pino",
      "Aceite esencial de vetiver",
      "Aceite esencial de naranja",
    ],
    usage:
      "Vierte en el recipiente e introduce de 5 a 7 varillas. Voltéalas una vez por semana para regular la intensidad.",
    benefits: [
      "Difusión pareja de 6 a 8 semanas",
      "Sin llama ni electricidad",
      "Intensidad regulable con las varillas",
    ],
    available: false,
    image: null,
    more:
      "La base es libre de DPG (dipropilenglicol). Incluye tapón de transporte para evitar derrames. Varillas de ratán vendidas por separado.",
  },
  {
    slug: "cuidado-superficies-madera",
    name: "Cuidado de Superficies",
    category: "superficies",
    tagline: "Nutre y protege madera, piedra y acero.",
    description:
      "Emulsión ligera para el mantenimiento de superficies nobles. Limpia el polvo fino y deja una capa protectora mate que realza la veta sin engrasar.",
    price: 239,
    presentation: "300 ml",
    ingredients: [
      "Agua purificada",
      "Cera de carnauba",
      "Aceite de linaza",
      "Tensioactivo vegetal suave",
      "Aceite esencial de naranja (trazas)",
    ],
    usage:
      "Agita bien. Aplica una capa fina con paño seco siguiendo la veta. Pule a los 5 minutos con paño limpio. Uso mensual.",
    benefits: [
      "Acabado mate natural",
      "Apto para mármol y acero inoxidable",
      "Realza la veta sin oscurecer",
    ],
    available: true,
    image: null,
    more:
      "No apto para tablas de corte en contacto directo con alimentos. Para esas piezas recomendamos aceite mineral de uso alimentario.",
  },
  {
    slug: "quitamanchas-textil-coco",
    name: "Quitamanchas Textil",
    category: "hogar",
    tagline: "Pretratamiento para manchas recientes.",
    description:
      "Gel de aplicación puntual para actuar sobre manchas antes del lavado. Trabaja bien sobre café, aceite ligero y salsa cuando se aplica pronto.",
    price: 159,
    presentation: "200 ml",
    ingredients: [
      "Agua purificada",
      "Tensioactivos de coco",
      "Enzimas de origen vegetal",
      "Percarbonato de sodio",
      "Glicerina vegetal",
    ],
    usage:
      "Aplica sobre la mancha, frota suavemente y deja actuar 10 minutos. Lava como de costumbre. Prueba antes en telas delicadas.",
    benefits: [
      "Actúa sobre manchas recientes",
      "Compatible con color y blanco",
      "Sin blanqueadores clorados",
    ],
    available: true,
    image: null,
    more:
      "Las enzimas pierden actividad con agua muy caliente: usa agua tibia. No indicado para lana, seda ni prendas con etiqueta de lavado en seco.",
  },
  {
    slug: "limpiador-inodoro-arrayan",
    name: "Limpiador de Inodoro",
    category: "bano",
    tagline: "Gel adherente para la taza.",
    description:
      "Gel de viscosidad media que se adhiere a las paredes de la taza para un contacto prolongado. Deja una nota herbal fresca tras el enjuague.",
    price: 145,
    presentation: "500 ml",
    ingredients: [
      "Agua purificada",
      "Ácido cítrico",
      "Ácido láctico",
      "Espesante de celulosa",
      "Aceite esencial de arrayán",
    ],
    usage:
      "Aplica bajo el borde, deja actuar 10 minutos, cepilla y tira de la cadena. Uso 2 veces por semana.",
    benefits: [
      "Se adhiere para un contacto más largo",
      "Ataca marcas de agua y cal ligera",
      "Aroma herbal tras el enjuague",
    ],
    available: true,
    image: null,
    more:
      "Compatible con fosas sépticas: no contiene amonios cuaternarios ni cloro que interrumpan la actividad biológica del tanque.",
  },
  {
    slug: "polvo-limpiador-mineral",
    name: "Polvo Limpiador Mineral",
    category: "superficies",
    tagline: "Abrasivo suave para incrustaciones puntuales.",
    description:
      "Polvo de acción mecánica fina para ollas, juntas y superficies resistentes. Alternativa a los cremosos abrasivos, con menos agua en la fórmula.",
    price: 119,
    presentation: "350 g",
    ingredients: [
      "Bicarbonato de sodio",
      "Carbonato de calcio micronizado",
      "Ácido cítrico",
      "Tensioactivo vegetal en polvo",
      "Aceite esencial de limón (trazas)",
    ],
    usage:
      "Espolvorea sobre la superficie húmeda, frota con esponja y enjuaga. No usar sobre acrílico, vidrio pulido ni superficies delicadas.",
    benefits: [
      "Abrasión controlada y fina",
      "Formato seco: más producto, menos plástico",
      "Rinde para meses de uso puntual",
    ],
    available: true,
    image: null,
    more:
      "El carbonato de calcio tiene una dureza menor que el cuarzo, por lo que raya menos que muchos abrasivos comerciales. Aun así, prueba siempre en una zona oculta.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.tagline, p.description, p.category]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
