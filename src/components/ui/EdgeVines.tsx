import type { CSSProperties } from "react";

/**
 * Marco fino de liana real en los **4 bordes** de una sección, **en el fondo**
 * (detrás del contenido, se desplaza con el scroll).
 *
 * - La liana es un fotograma del video de referencia, recortado y con el fondo
 *   gris eliminado por chroma-key (`/public/vines/vine-strip.webp` ~47 KB;
 *   `.png` de respaldo).
 * - 4 bandas (`Band`): la lámina horizontal se rota 90° para los lados y se
 *   voltea para el borde inferior. Dos capas desfasadas media baldosa disimulan
 *   la costura de la repetición y dan profundidad.
 * - Movimiento tipo serpiente, 100% CSS: `@keyframes vine-serpent` (vaivén
 *   lateral + giro ≤ 0.8°) con `animation-direction: alternate` → va y vuelve,
 *   nunca “salta”. Propiedades `translate`/`rotate` → compuesto en GPU.
 * - `tone` aclara los verdes sobre fondos oscuros.
 * - Va detrás del contenido (`-z-[1]`; la sección necesita `relative isolate
 *   overflow-hidden`). `aria-hidden`, `pointer-events-none`.
 * - `prefers-reduced-motion` deja las lianas quietas.
 */

const THICK = "clamp(46px, 8vw, 116px)";
const IMG = 'url("/vines/vine-strip.webp")';

type Tone = "light" | "dark";
type Edge = "top" | "bottom" | "left" | "right";

function Band({ edge, tone }: { edge: Edge; tone: Tone }) {
  const horizontal = edge === "top" || edge === "bottom";

  const clip: CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    ...(horizontal
      ? { left: 0, right: 0, [edge]: 0, height: THICK }
      : { top: 0, bottom: 0, [edge]: 0, width: THICK }),
    transform:
      edge === "bottom"
        ? "scaleY(-1)"
        : edge === "right"
          ? "scaleX(-1)"
          : undefined,
  };

  const rot: CSSProperties = horizontal
    ? { position: "absolute", inset: 0 }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        height: THICK,
        width: "320vh",
        transformOrigin: "0 0",
        transform: `translateX(${THICK}) rotate(90deg)`,
      };

  const strip = (
    op: number,
    posX: number,
    dur: number,
    delay: number,
  ): CSSProperties => ({
    position: "absolute",
    inset: 0,
    opacity: op,
    backgroundImage: IMG,
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto 100%",
    backgroundPositionX: `${posX}px`,
    filter:
      tone === "dark"
        ? "brightness(1.18) saturate(1.08)"
        : "saturate(1.04) contrast(1.05)",
    willChange: "transform",
    animation: `vine-serpent ${dur}s ease-in-out ${delay}s infinite alternate`,
  });

  return (
    <div style={clip}>
      <div style={rot}>
        <div style={strip(1, 0, 15, 0)} className="vine-strip" />
        <div style={strip(0.55, 340, 20, -6)} className="vine-strip" />
      </div>
    </div>
  );
}

export function EdgeVines({
  tone = "light",
  opacity,
}: {
  tone?: Tone;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
      style={{ opacity: opacity ?? (tone === "dark" ? 0.42 : 0.46) }}
    >
      <Band edge="top" tone={tone} />
      <Band edge="bottom" tone={tone} />
      <Band edge="left" tone={tone} />
      <Band edge="right" tone={tone} />
    </div>
  );
}
