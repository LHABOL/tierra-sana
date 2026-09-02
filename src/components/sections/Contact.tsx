"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { Field } from "@/components/ui/Field";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

export function Contact({ bare = false }: { bare?: boolean }) {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <BotanicalBackdrop tone="light" density="normal" seed={13} />
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          {bare ? (
            <>
              <p className="eyebrow">Escríbenos</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">
                Cuéntanos qué necesitas.
              </h2>
            </>
          ) : (
            <>
              <p className="eyebrow">Contacto</p>
              <h2 className="display mt-4">Hablemos.</h2>
            </>
          )}
          <p className="mt-6 max-w-sm text-base leading-relaxed text-stone">
            ¿Tienes una duda sobre un producto, un pedido o una colaboración?
            Escríbenos y te respondemos a la brevedad.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
                WhatsApp
              </dt>
              <dd className="mt-1">
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {site.contact.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-olive-mid">
                Horario de atención
              </dt>
              <dd className="mt-1 text-stone">{site.contact.hours}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="flex h-full min-h-64 flex-col items-start justify-center border border-olive/15 bg-sage/30 p-10">
              <h3 className="font-serif text-2xl">Gracias por escribir.</h3>
              <p className="mt-3 max-w-sm text-sm text-stone">
                Hemos recibido tu mensaje. Te responderemos dentro del horario
                de atención.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-[0.7rem] uppercase tracking-[0.2em] text-olive underline underline-offset-4"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <Field label="Nombre" name="nombre" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Teléfono" name="telefono" type="tel" />
              <Field label="Asunto" name="asunto" />
              <div className="sm:col-span-2">
                <Field label="Mensaje" name="mensaje" as="textarea" required />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 bg-olive px-8 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition-all duration-500 ease-organic hover:bg-olive-deep hover:tracking-[0.28em]"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
