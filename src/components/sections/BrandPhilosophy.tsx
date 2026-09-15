import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { LogoMark } from "@/components/ui/Wordmark";

export function BrandPhilosophy() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-24 md:py-32">
      <EdgeVines tone="light" />
      <div className="shell relative grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-sage/40">
            <ImagePlaceholder
              src={null}
              alt="Fotografía editorial de la marca"
              ratio="4 / 5"
              label="Fotografía de marca"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-full rounded-[2rem]"
            />
            <div className="pointer-events-none absolute inset-x-6 bottom-6">
              <p className="max-w-[16rem] font-serif text-2xl leading-snug text-olive-deep">
                Limpieza que respeta la naturaleza.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="up">
          <div className="flex h-full flex-col justify-between rounded-[2rem] bg-olive px-8 py-10 text-ivory sm:px-12 sm:py-14">
            <div>
              <LogoMark className="h-7 w-7 text-ivory/70" />
              <p className="eyebrow mt-6 !text-ivory/60">Filosofía</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                Hogares más limpios, planeta más feliz.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
                Fórmulas pensadas desde ingredientes y procesos naturales:
                menos exceso, más esencia, y respeto por lo que rodea a tu
                espacio.
              </p>
            </div>
            <div className="mt-10">
              <ButtonLink
                href="/nosotros"
                variant="ghost"
                className="!text-ivory/90 hover:!text-ivory"
              >
                Conoce nuestro impacto
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
