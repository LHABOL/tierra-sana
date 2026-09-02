import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export function BrandPhilosophy() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-24 md:py-36">
      <BotanicalBackdrop tone="light" density="normal" seed={5} />
      <div className="shell relative grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="max-w-lg">
            <p className="eyebrow">Filosofía</p>
            <h2 className="display mt-4">Limpiar sin dejar de cuidar.</h2>
            <p className="mt-8 text-base leading-relaxed text-stone">
              La marca busca ofrecer alternativas de limpieza inspiradas en
              ingredientes y procesos naturales, priorizando una experiencia de
              higiene efectiva, consciente y agradable.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone">
              Menos exceso, más esencia. Cada fórmula se piensa desde lo que el
              espacio realmente necesita, y desde el respeto por lo que lo
              rodea.
            </p>
            <div className="mt-10">
              <ButtonLink href="/nosotros" variant="outline">
                Sobre nosotros
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="up">
          <div className="relative">
            <ImagePlaceholder
              src={null}
              alt="Fotografía editorial de la marca"
              ratio="3 / 4"
              label="Fotografía de marca"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
