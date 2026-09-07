"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { EdgeVines } from "@/components/ui/EdgeVines";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-olive text-ivory">
      <EdgeVines tone="dark" />
      <div className="shell relative grid w-full items-center gap-16 py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            className="eyebrow !text-ivory/60"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Productos de limpieza naturales
          </motion.p>

          <h1 className="mt-6 font-serif text-[clamp(2.8rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em]">
            {["Limpiar", "también puede", "ser natural."].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-ivory/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
          >
            Productos de limpieza inspirados en la naturaleza. Higiene efectiva,
            consciente y agradable para tu hogar.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
          >
            <ButtonLink
              href="/catalogo"
              className="!bg-ivory !text-olive hover:!bg-sage"
            >
              Descubrir productos
            </ButtonLink>
            <ButtonLink
              href="/nosotros"
              variant="ghost"
              className="!text-ivory/80 hover:!text-ivory"
            >
              Conocer la marca
            </ButtonLink>
          </motion.div>
        </div>

        {/* Área reservada para fotografía del producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="relative flex flex-col items-center justify-center border border-ivory/15 bg-ivory/[0.04] backdrop-blur-[1px]"
            style={{ aspectRatio: "4 / 5" }}
          >
            <svg
              viewBox="0 0 64 64"
              className="h-12 w-12 text-ivory/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.1}
            >
              <path d="M32 8C18 20 17 42 32 56C47 42 46 20 32 8Z" />
              <path d="M32 14V52" />
              <path d="M32 28C26 31 22 35 20 41" />
              <path d="M32 38C38 41 42 45 44 51" />
            </svg>
            <span className="mt-4 text-[0.6rem] uppercase tracking-[0.32em] text-ivory/50">
              Fotografía del producto
            </span>
            <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-ivory/30" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-ivory/30" />
          </div>
        </motion.div>
      </div>

      <motion.span
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.32em] text-ivory/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        {site.tagline}
      </motion.span>
    </section>
  );
}
