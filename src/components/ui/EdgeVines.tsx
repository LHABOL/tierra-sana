import type { CSSProperties } from "react";

/**
 * Marco de selva en los **4 bordes** de una sección, **en el fondo**
 * (detrás del contenido, se desplaza con el scroll).
 *
 * - La liana es un fotograma del video de referencia, recortado y con el fondo
 *   gris eliminado por chroma-key (`/public/vines/vine-strip.webp` ~47 KB;
 *   `.png` de respaldo).
 * - 4 bandas (`Band`): la lámina horizontal se rota 90° para los lados y se
 *   voltea para el borde inferior. Dos capas desfasadas media baldosa disimulan
 *   la costura de la repetición y dan profundidad.
 * - **Sin línea de marco**: cada banda lleva una máscara en degradado que la
 *   funde progresivamente hacia el centro → las lianas se disuelven en el fondo,
 *   no se ve el borde recto del recorte.
 * - Movimiento tipo serpiente, 100% CSS: `@keyframes vine-serpent` (vaivén
 *   lateral + giro ≤ 0.8°) con `animation-direction: alternate` → va y vuelve,
 *   nunca “salta”. Propiedades `translate`/`rotate` → compuesto en GPU.
 * - Además, 4 grupos de hojas grandes (`CornerLeaf`) en cada esquina, dibujadas
 *   en SVG, con un vaivén tenue propio (`leaf-sway`) para reforzar el
 *   carácter de selva sin saturar el centro de la sección.
 * - `tone` aclara los verdes sobre fondos oscuros.
 * - Va detrás del contenido (`-z-[1]`; la sección necesita `relative isolate
 *   overflow-hidden`). `aria-hidden`, `pointer-events-none`.
 * - `prefers-reduced-motion` deja las lianas y las hojas quietas.
 */

const THICK = "clamp(96px, 15vw, 210px)";
const IMG = 'url("/vines/vine-strip.webp")';

// degradado que funde la banda hacia el centro (denso en la orilla → nada)
const FADE_H =
  "linear-gradient(to bottom, #000 0%, #000 5%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.15) 72%, transparent 100%)";
const FADE_V =
  "linear-gradient(to right, #000 0%, #000 5%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.15) 72%, transparent 100%)";

type Tone = "light" | "dark";
type Edge = "top" | "bottom" | "left" | "right";

function Band({ edge, tone }: { edge: Edge; tone: Tone }) {
  const horizontal = edge === "top" || edge === "bottom";

  const fade = horizontal ? FADE_H : FADE_V;
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
    WebkitMaskImage: fade,
    maskImage: fade,
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
        ? "brightness(1.06) saturate(1.04)"
        : "saturate(1.02) contrast(1.03)",
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

type Corner = "tl" | "tr" | "bl" | "br";

// Dos siluetas de hoja tropical (proporción distinta) reutilizadas y
// espejadas/rotadas por esquina para que el ramo no se vea repetido.
const LEAF_A =
  "M50 2C18 10 4 34 6 62C34 60 54 44 58 18C60 12 56 6 50 2Z M8 60C20 52 30 42 34 30";
const LEAF_B =
  "M46 4C20 4 4 22 4 46C26 48 44 36 50 16C52 10 50 6 46 4Z M8 44C18 38 26 30 30 20";

const CORNER_ORIGIN: Record<Corner, CSSProperties> = {
  tl: { top: 0, left: 0, transformOrigin: "0% 0%" },
  tr: { top: 0, right: 0, transformOrigin: "100% 0%" },
  bl: { bottom: 0, left: 0, transformOrigin: "0% 100%" },
  br: { bottom: 0, right: 0, transformOrigin: "100% 100%" },
};

// Rotación base por esquina para que las hojas "crezcan" hacia el centro.
const CORNER_ROTATE: Record<Corner, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
};

function CornerLeaf({ corner, tone }: { corner: Corner; tone: Tone }) {
  const color = tone === "dark" ? "#8A9A7B" : "#5B6B4A";
  const base = CORNER_ROTATE[corner];

  return (
    <div
      className="absolute"
      style={{
        ...CORNER_ORIGIN[corner],
        width: "clamp(120px, 20vw, 260px)",
        height: "clamp(120px, 20vw, 260px)",
      }}
    >
      <svg
        viewBox="0 0 64 64"
        className="leaf-sway absolute inset-0"
        style={{
          transform: `rotate(${base}deg)`,
          transformOrigin: "0 0",
          opacity: tone === "dark" ? 0.4 : 0.34,
          animationDelay: "0s",
        }}
        fill={color}
        stroke={color}
        strokeWidth={0.6}
      >
        <path d={LEAF_A} />
      </svg>
      <svg
        viewBox="0 0 64 64"
        className="leaf-sway absolute inset-0"
        style={{
          transform: `rotate(${base + 24}deg) scale(0.72)`,
          transformOrigin: "0 0",
          opacity: tone === "dark" ? 0.3 : 0.26,
          animationDelay: "-4s",
          animationDirection: "alternate-reverse",
        }}
        fill={color}
        stroke={color}
        strokeWidth={0.6}
      >
        <path d={LEAF_B} />
      </svg>
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
      style={{ opacity: opacity ?? (tone === "dark" ? 0.5 : 0.52) }}
    >
      <Band edge="top" tone={tone} />
      <Band edge="bottom" tone={tone} />
      <Band edge="left" tone={tone} />
      <Band edge="right" tone={tone} />

      <CornerLeaf corner="tl" tone={tone} />
      <CornerLeaf corner="tr" tone={tone} />
      <CornerLeaf corner="bl" tone={tone} />
      <CornerLeaf corner="br" tone={tone} />
    </div>
  );
}
