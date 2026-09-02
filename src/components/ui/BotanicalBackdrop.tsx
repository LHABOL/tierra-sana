import { clsx } from "clsx";
import type { CSSProperties } from "react";

/**
 * Papel tapiz floral que acompaña TODO el sitio.
 *
 * - Un patrón de flores pequeñas y de colores suaves (que armonizan con el
 *   fondo) se repite por toda la sección → cobertura uniforme siempre visible.
 * - Movimiento "temblado": dos capas del patrón que se desplazan MUY lento en
 *   direcciones y velocidades distintas → un vaivén orgánico y sutil.
 *   Solo se anima `background-position` (compuesto en GPU, sin JavaScript).
 * - Decorativo: `aria-hidden`, `pointer-events-none`, detrás del contenido.
 * - Respeta `prefers-reduced-motion` vía la regla global de globals.css.
 *
 * tone: "light" (marfil) usa flores en verde salvia / tierra;
 * tone: "dark" (oliva/negro) usa versiones luminosas.
 */

type Density = "sparse" | "normal" | "lush";

// tamaño del mosaico en px — menor = más flores por pantalla
const TILE: Record<Density, number> = { sparse: 460, normal: 360, lush: 270 };

/** 6 flores diminutas repartidas en un mosaico de 220×220, colores variados. */
function tile(colors: string[]): string {
  const [a, b, c, d, e, f] = colors;
  const flower = (
    x: number,
    y: number,
    s: number,
    petal: string,
    center: string,
    rot = 0,
  ) =>
    `<g transform='translate(${x} ${y}) rotate(${rot}) scale(${s})' fill='${petal}'>` +
    `<ellipse rx='7' ry='2.9'/>` +
    `<ellipse rx='7' ry='2.9' transform='rotate(60)'/>` +
    `<ellipse rx='7' ry='2.9' transform='rotate(120)'/>` +
    `<circle r='2.6' fill='${center}'/></g>`;
  const bud = (x: number, y: number, s: number, col: string, rot = 0) =>
    `<g transform='translate(${x} ${y}) rotate(${rot}) scale(${s})'>` +
    `<path d='M0 -9 C6 -3 6 5 0 11 C-6 5 -6 -3 0 -9Z' fill='${col}'/></g>`;

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'>` +
    flower(36, 42, 1.5, a, d, 12) +
    flower(150, 24, 1.1, b, e, -20) +
    flower(188, 124, 1.7, c, a, 40) +
    bud(72, 132, 1.35, e, 18) +
    flower(28, 172, 1.3, d, b, -8) +
    flower(124, 186, 1.15, f, c, 25) +
    bud(200, 204, 1.2, b, -14) +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const PALETTES: Record<"light" | "dark", string[]> = {
  light: ["#6F8556", "#B98476", "#C2A15C", "#A46A45", "#6E8A90", "#8CA063"],
  dark: ["#D7E7B8", "#F2E7C6", "#F0C7B4", "#EFD69B", "#B7D3CC", "#E4B9A6"],
};

export function BotanicalBackdrop({
  tone = "light",
  density = "normal",
  seed = 1,
  className,
  opacity,
}: {
  tone?: "light" | "dark";
  density?: Density;
  /** desfase del patrón entre secciones */
  seed?: number;
  className?: string;
  /** multiplicador global de opacidad (por defecto 1) */
  opacity?: number;
}) {
  const url = tile(PALETTES[tone]);
  const size = TILE[density];
  const base = (tone === "dark" ? 0.3 : 0.26) * (opacity ?? 1);
  // fase distinta por sección → no se repite el mismo encuadre
  const dA = -(((seed * 13) % 80) + 1);
  const dB = -(((seed * 23) % 100) + 1);

  const layer = (
    bgSize: number,
    posX: number,
    posY: number,
    anim: string,
    delay: number,
  ): CSSProperties => ({
    position: "absolute",
    inset: "-16%",
    backgroundImage: url,
    backgroundRepeat: "repeat",
    backgroundSize: `${bgSize}px ${bgSize}px`,
    backgroundPosition: `${posX}px ${posY}px`,
    animation: `${anim} 42s ease-in-out ${delay}s infinite`,
    willChange: "transform",
  });

  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0 -z-[1] overflow-hidden",
        className,
      )}
      style={{ opacity: base }}
    >
      <div style={layer(size, (seed * 31) % size, (seed * 17) % size, "botanical-orbit-a", dA)} />
      <div
        style={{
          ...layer(
            Math.round(size * 1.55),
            (seed * 41) % size,
            (seed * 7) % size,
            "botanical-orbit-b",
            dB,
          ),
          opacity: 0.7,
        }}
      />
    </div>
  );
}
