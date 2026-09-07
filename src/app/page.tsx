import { Suspense } from "react";
import { EdgeVines } from "@/components/ui/EdgeVines";
import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Benefits } from "@/components/sections/Benefits";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Contact } from "@/components/sections/Contact";
import { Location } from "@/components/sections/Location";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getFeatured } from "@/lib/products";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <Hero />

      <BrandPhilosophy />

      <QuoteSection tone="ink">
        La limpieza empieza por elegir mejor.
      </QuoteSection>

      <Suspense fallback={null}>
        <ProductCatalog
          items={featured}
          eyebrow="Nuestra selección"
          title="Los esenciales."
          intro="Un punto de partida: las fórmulas que resuelven la mayor parte de la limpieza de una casa."
        />
      </Suspense>

      <section className="relative isolate overflow-hidden pb-24">
        <EdgeVines tone="light" />
        <div className="shell">
        <Reveal className="border-t border-olive/10 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Categorías</p>
              <h2 className="mt-3 font-serif text-3xl">Explora por espacio.</h2>
            </div>
            <ButtonLink href="/catalogo" variant="ghost">
              Ver catálogo completo
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalogo?categoria=${c.slug}`}
                  className="group flex items-baseline justify-between border-b border-olive/10 pb-4 pt-2 transition-colors hover:border-olive"
                >
                  <span className="font-serif text-xl">{c.name}</span>
                  <span className="max-w-[55%] text-right text-xs text-stone">
                    {c.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        </div>
      </section>

      <Benefits />

      <QuoteSection tone="olive">
        Tu espacio merece algo más que químicos y etiquetas.
      </QuoteSection>

      <Contact />

      <Location />

      <section className="relative isolate overflow-hidden bg-sage/40 py-24">
        <EdgeVines tone="light" />
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow">{site.name}</p>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-tight">
              Higiene inspirada en la naturaleza. Pureza para tu espacio,
              respeto para lo que lo rodea.
            </p>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/catalogo">Descubrir productos</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
