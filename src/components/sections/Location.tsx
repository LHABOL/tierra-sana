import { MapPin, Clock, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export function Location({ bare = false }: { bare?: boolean }) {
  const { location, contact } = site;

  return (
    <section
      id="ubicacion"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <BotanicalBackdrop tone="light" density="normal" seed={17} />
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          {bare ? (
            <>
              <p className="eyebrow">Dirección</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                Nuestro punto de venta.
              </h2>
            </>
          ) : (
            <>
              <p className="eyebrow">Ubicación</p>
              <h2 className="display mt-4">Encuéntranos.</h2>
            </>
          )}

          <ul className="mt-10 space-y-7 text-sm">
            <li className="flex gap-4">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-olive"
                strokeWidth={1.4}
              />
              <span className="leading-relaxed">
                {location.street}
                <br />
                {location.city}, {location.state} · C.P. {location.zip}
                <br />
                {location.country}
              </span>
            </li>
            <li className="flex gap-4">
              <Clock
                className="mt-0.5 h-5 w-5 shrink-0 text-olive"
                strokeWidth={1.4}
              />
              <span className="leading-relaxed">{location.hours}</span>
            </li>
            <li className="flex gap-4">
              <Phone
                className="mt-0.5 h-5 w-5 shrink-0 text-olive"
                strokeWidth={1.4}
              />
              <a href={`tel:${contact.phone}`} className="link-underline">
                {contact.phone}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative w-full overflow-hidden border border-olive/15 bg-sage/40"
            style={{ aspectRatio: "16 / 11" }}
          >
            {location.mapEmbedSrc ? (
              <iframe
                src={location.mapEmbedSrc}
                title={`Mapa — ${site.name}`}
                className="absolute inset-0 h-full w-full grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0">
                {/* Retícula sutil que evoca un plano */}
                <div
                  className="absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#3C4A32 1px, transparent 1px), linear-gradient(90deg, #3C4A32 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                      "radial-gradient(circle at 50% 50%, black, transparent 75%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-olive/70">
                  <MapPin className="h-8 w-8" strokeWidth={1.2} />
                  <span className="text-[0.6rem] uppercase tracking-[0.32em]">
                    Mapa interactivo
                  </span>
                  <span className="text-xs text-olive/50">
                    Listo para integrar Google Maps
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
