"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

type Direction = "up" | "down" | "none";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  amount?: number;
}

/**
 * Envoltura de aparición progresiva. Fade + desplazamiento mínimo, una sola vez.
 * - Respeta prefers-reduced-motion.
 * - Fallback: si el IntersectionObserver no dispara (o tarda), el contenido
 *   se muestra igualmente tras un breve tiempo, para no dejar nada oculto.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as = "div",
  amount = 0.2,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, show } = useReveal(amount);
  const offset = direction === "none" ? 0 : direction === "down" ? -16 : 16;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={variants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}
