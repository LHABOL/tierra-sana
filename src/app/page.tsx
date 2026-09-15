import { Suspense } from "react";
import { EdgeVines } from "@/components/ui/EdgeVines";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BrandPhilosophy } from "@/components/sections/BrandPhilosophy";
import { CategoryStrip } from "@/components/sections/CategoryStrip";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Benefits } from "@/components/sections/Benefits";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Contact } from "@/components/sections/Contact";
import { Location } from "@/components/sections/Location";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Wordmark";
import { getFeatured } from "@/lib/products";
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
          eyebrow="Productos destacados"
          title="Favoritos de nuestra comunidad."
          intro="Un punto de partida: las fórmulas que resuelven la mayor parte de la limpieza de una casa."
        />
      </Suspense>

      <CategoryStrip />

      <Benefits />

      <QuoteSection tone="olive">
        Tu espacio merece algo más que químicos y etiquetas.
      </QuoteSection>

      <Contact />

      <Location />

      <section className="relative isolate overflow-hidden bg-sage/40 pb-24 pt-4">
        <svg
          aria-hidden
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-16 w-full text-ivory"
        >
          <path
            fill="currentColor"
            d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,16 L1440,0 L0,0 Z"
          />
        </svg>
        <EdgeVines tone="light" />
        <div className="shell relative pt-20 text-center">
          <Reveal>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-olive/25 bg-ivory">
              <LogoMark className="h-8 w-8 text-olive" />
            </span>
            <p className="eyebrow mt-8">{site.name}</p>
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
