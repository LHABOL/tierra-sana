"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Devuelve un ref y un booleano `show` que pasa a true cuando el elemento
 * entra en viewport — o tras un breve fallback, para que ninguna animación
 * de entrada pueda dejar contenido oculto si el observer no dispara.
 */
export function useReveal(amount = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount,
    margin: "0px 0px -8% 0px",
  });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setFallback(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return { ref, show: inView || fallback };
}
