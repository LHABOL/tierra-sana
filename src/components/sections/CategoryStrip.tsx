import Link from "next/link";
import {
  ChefHat,
  Droplets,
  Home,
  Sparkles,
  Wind,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/categories";

const ICONS: Record<string, LucideIcon> = {
  cocina: ChefHat,
  bano: Droplets,
  hogar: Home,
  multiusos: Sparkles,
  aromas: Wind,
  superficies: Layers,
};

const TINTS = ["bg-sage", "bg-olive-soft/25", "bg-stone/15", "bg-sage"];

/**
 * Fila de categorías como insignias circulares (icono + color de apoyo),
 * a modo de acceso rápido por espacio del hogar.
 */
export function CategoryStrip() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <EdgeVines tone="light" />
      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow">Nuestras categorías</p>
          <h2 className="mt-3 font-serif text-3xl">Explora por espacio.</h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, i) => {
            const Icon = ICONS[c.slug] ?? Sparkles;
            return (
              <Reveal key={c.slug} delay={i * 0.06} as="li">
                <Link
                  href={`/catalogo?categoria=${c.slug}`}
                  className="group flex flex-col items-center gap-4 text-center"
                >
                  <span
                    className={`flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-500 ease-organic group-hover:scale-105 ${TINTS[i % TINTS.length]}`}
                  >
                    <Icon
                      className="h-7 w-7 text-olive"
                      strokeWidth={1.3}
                      aria-hidden
                    />
                  </span>
                  <span className="text-[0.68rem] uppercase leading-tight tracking-[0.18em] text-ink/80">
                    {c.name}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
