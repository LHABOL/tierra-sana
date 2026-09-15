import { Leaf, HeartHandshake, Recycle, Home } from "lucide-react";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  { icon: Leaf, label: "Ingredientes naturales" },
  { icon: HeartHandshake, label: "Libre de crueldad animal" },
  { icon: Recycle, label: "Biodegradables" },
  { icon: Home, label: "Un hogar más verde" },
];

/**
 * Franja compacta de atributos de marca: icono + etiqueta, separados por
 * divisores finos. Pensada como pausa breve entre secciones, no como bloque
 * de contenido largo.
 */
export function Benefits() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      <EdgeVines tone="light" />
      <div className="shell">
        <ul className="grid grid-cols-2 divide-olive/10 sm:grid-cols-4 sm:divide-x">
          {benefits.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 0.08}
              as="li"
              className="flex flex-col items-center gap-3 border-b border-olive/10 px-4 py-8 text-center sm:border-b-0 sm:py-0"
            >
              <b.icon className="h-6 w-6 text-olive" strokeWidth={1.3} aria-hidden />
              <span className="text-[0.68rem] uppercase leading-tight tracking-[0.16em] text-ink/75">
                {b.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
