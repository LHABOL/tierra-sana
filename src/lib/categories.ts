import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "cocina",
    name: "Cocina",
    description: "Grasa, aromas y superficies de contacto con alimentos.",
  },
  {
    slug: "bano",
    name: "Baño",
    description: "Cal, humedad y frescura para el espacio más exigente.",
  },
  {
    slug: "hogar",
    name: "Hogar",
    description: "Pisos, textiles y rincones de uso diario.",
  },
  {
    slug: "multiusos",
    name: "Multiusos",
    description: "Una fórmula equilibrada para casi todo.",
  },
  {
    slug: "aromas",
    name: "Aromas",
    description: "Ambiente y ropa con notas naturales, sin saturar.",
  },
  {
    slug: "superficies",
    name: "Cuidado de superficies",
    description: "Madera, acero y piedra tratados con delicadeza.",
  },
];

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
