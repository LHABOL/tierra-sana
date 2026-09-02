import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Benefits } from "@/components/sections/Benefits";
import { ButtonLink } from "@/components/ui/Button";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La filosofía de Tierra Sana: limpieza inspirada en ingredientes y procesos naturales, con respeto por el entorno.",
  alternates: { canonical: "/nosotros" },
};

const pillars = [
  {
    n: "01",
    title: "Formulación consciente",
    text: "Partimos de ingredientes de origen natural y concentraciones moderadas. Efectivo no es sinónimo de agresivo.",
  },
  {
    n: "02",
    title: "Transparencia",
    text: "Cada producto lista sus ingredientes y su modo de uso. Sin promesas que no podamos sostener.",
  },
  {
    n: "03",
    title: "Menos envase",
    text: "Formatos concentrados y rellenables para reducir el plástico por litro efectivo de producto.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Limpiar sin dejar de cuidar."
        intro="Nacimos de una idea simple: la limpieza del hogar no tendría que elegir entre ser efectiva y ser respetuosa."
      />

      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <BotanicalBackdrop tone="light" density="normal" seed={83} />
        <div className="shell">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="max-w-lg">
              <p className="eyebrow">La marca</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                Higiene inspirada en la naturaleza.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-stone">
                Tierra Sana busca ofrecer alternativas de limpieza inspiradas en
                ingredientes y procesos naturales, priorizando una experiencia
                de higiene efectiva, consciente y agradable.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Trabajamos con fórmulas sencillas, aromas discretos de aceites
                esenciales y envases pensados para durar. Lo esencial, bien
                hecho.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ImagePlaceholder
              src={null}
              alt="Retrato editorial de la marca"
              ratio="3 / 4"
              label="Fotografía de marca"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <span className="font-serif text-2xl text-olive/40">{p.n}</span>
              <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <QuoteSection tone="olive">La naturaleza también sabe cuidar.</QuoteSection>

      <Benefits />

      <section className="relative isolate overflow-hidden bg-sage/40 py-20">
        <BotanicalBackdrop tone="light" density="normal" seed={89} />
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-serif text-2xl">
            Conoce la selección completa de productos.
          </p>
          <ButtonLink href="/catalogo">Ir al catálogo</ButtonLink>
        </div>
      </section>
    </>
  );
}
