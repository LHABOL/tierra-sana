"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { clsx } from "clsx";
import { useReveal } from "@/hooks/useReveal";
import { BotanicalBackdrop } from "@/components/ui/BotanicalBackdrop";

/**
 * Frase grande como pausa visual entre secciones.
 * Parallax extremadamente ligero sobre el texto.
 */
export function QuoteSection({
  children,
  tone = "olive",
}: {
  children: React.ReactNode;
  tone?: "olive" | "ivory" | "ink";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { ref: quoteRef, show } = useReveal(0.4);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  const palette = {
    olive: "bg-olive text-ivory",
    ivory: "bg-sage/40 text-olive",
    ink: "bg-ink text-ivory",
  }[tone];

  return (
    <section
      ref={ref}
      className={clsx("relative isolate overflow-hidden py-28 md:py-40", palette)}
    >
      <BotanicalBackdrop
        tone={tone === "ivory" ? "light" : "dark"}
        density="normal"
        seed={tone === "ink" ? 31 : tone === "olive" ? 37 : 41}
      />
      <div className="shell" ref={quoteRef as never}>
        <motion.blockquote
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-serif text-[clamp(1.8rem,4.5vw,3.4rem)] leading-[1.15] tracking-[-0.01em]"
        >
          {children}
        </motion.blockquote>
      </div>
    </section>
  );
}
