import { Leaf, Sparkles, Recycle, Home } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

const benefits = [
  {
    icon: Leaf,
    title: "Inspirado en la naturaleza",
    text: "Fórmulas pensadas desde una perspectiva más consciente, con ingredientes de origen natural.",
  },
  {
    icon: Sparkles,
    title: "Limpieza efectiva",
    text: "Productos diseñados para mantener tus espacios limpios en el uso diario.",
  },
  {
    icon: Recycle,
    title: "Consumo consciente",
    text: "Una alternativa para quienes buscan reducir el impacto de sus hábitos de limpieza.",
  },
  {
    icon: Home,
    title: "Para tu espacio",
    text: "Soluciones pensadas para formar parte de tu rutina, sin complicarla.",
  },
];

export function Benefits() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <BotanicalBackdrop tone="light" density="normal" seed={19} />
      <div className="shell">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Por qué Tierra Sana</p>
        <h2 className="display mt-4">Una forma distinta de limpiar.</h2>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08} as="div">
            <b.icon
              className="h-6 w-6 text-olive"
              strokeWidth={1.4}
              aria-hidden
            />
            <h3 className="mt-5 font-serif text-lg">{b.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone">{b.text}</p>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
