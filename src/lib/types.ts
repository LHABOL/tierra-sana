export type CategorySlug =
  | "cocina"
  | "bano"
  | "hogar"
  | "multiusos"
  | "aromas"
  | "superficies";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Product {
  /** Identificador único y URL amigable */
  slug: string;
  name: string;
  category: CategorySlug;
  /** Descripción breve para tarjeta de catálogo */
  tagline: string;
  /** Descripción larga para la página de detalle */
  description: string;
  /** Precio en MXN */
  price: number;
  /** Presentación, p. ej. "500 ml" */
  presentation: string;
  ingredients: string[];
  usage: string;
  benefits: string[];
  available: boolean;
  featured?: boolean;
  /**
   * Imagen del producto. Cuando exista una fotografía real,
   * basta con reemplazar esta ruta (o URL) — el componente no cambia.
   * Si es null, se muestra un placeholder premium.
   */
  image: string | null;
  /** Notas adicionales para "Más sobre este producto" */
  more: string;
}

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
  lineTotal: number;
}
