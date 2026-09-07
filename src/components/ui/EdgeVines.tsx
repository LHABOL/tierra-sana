import type { CSSProperties } from "react";

/**
 * Lianas de selva en las **orillas** izquierda y derecha del sitio.
 *
 * - Dos lianas fijas a la ventana → acompañan toda la página; el centro queda
 *   libre.
 * - Toque selvático: tallos entrelazados + muchas hojas (verde profundo, medio
 *   y claro), flores pequeñas y zarcillos. El verde profundo da contraste sobre
 *   el marfil; los claros resaltan sobre el verde oscuro.
 * - Movimiento como serpiente, 100% CSS (solo `transform`):
 *     · `vine-descend` — la tira baja despacio con un serpenteo horizontal.
 *     · `vine-sway` — el contenedor cuelga desde arriba y se mece más lento.
 * - `aria-hidden`, `pointer-events-none`, `z-[5]` (delante del contenido, detrás
 *   de barra y paneles). `prefers-reduced-motion` deja las lianas quietas.
 */

const TILE_W = 190;
const TILE_H = 560; // px — alto de un tramo que se repite

/** hoja apuntando a la derecha, centrada en (0,0), ~28×16 antes de escalar */
const leaf = (x: number, y: number, s: number, rot: number, fill: string) =>
  `<path d='M0 0 C7 -10 20 -11 30 -2 C22 9 8 11 0 0Z' fill='${fill}' transform='translate(${x} ${y}) rotate(${rot}) scale(${s})'/>`;

/** flor de 5 pétalos + centro, centrada en (x,y) */
const flower = (x: number, y: number, s: number, petal: string) =>
  `<g transform='translate(${x} ${y}) scale(${s})'>` +
  [0, 72, 144, 216, 288]
    .map(
      (a) =>
        `<ellipse cx='0' cy='-6' rx='4' ry='6.6' fill='${petal}' transform='rotate(${a})'/>`,
    )
    .join("") +
  `<circle r='2.7' fill='#C9A24B'/></g>`;

const DEEP = "#5F7049";
const MID = "#8CA277";
const LITE = "#B7C89E";

const LEAVES = [
  leaf(44, 34, 1.15, -10, DEEP),
  leaf(34, 72, 1.0, 168, MID),
  leaf(52, 104, 1.2, 8, LITE),
  leaf(38, 140, 1.1, 175, DEEP),
  leaf(56, 176, 1.05, -18, MID),
  leaf(34, 214, 1.15, 160, DEEP),
  leaf(52, 250, 1.25, 6, MID),
  leaf(40, 288, 1.0, 172, LITE),
  leaf(58, 322, 1.1, -14, DEEP),
  leaf(34, 360, 1.2, 165, MID),
  leaf(54, 396, 1.05, 10, DEEP),
  leaf(38, 434, 1.15, 178, LITE),
  leaf(56, 470, 1.2, -12, MID),
  leaf(34, 508, 1.1, 160, DEEP),
  leaf(50, 542, 1.15, 8, MID),
  // hojas exteriores (hacia la orilla)
  leaf(30, 120, 1.0, 200, MID),
  leaf(28, 300, 1.05, 205, DEEP),
  leaf(30, 480, 1.0, 198, MID),
].join("");

const FLOWERS = [
  flower(70, 88, 1.05, "#EFE9D8"),
  flower(24, 200, 0.9, "#E9D8CF"),
  flower(74, 306, 1.0, "#EFE9D8"),
  flower(22, 420, 0.9, "#EFE9D8"),
  flower(70, 520, 0.95, "#E9D8CF"),
].join("");

const VINE_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}' fill='none'>` +
  // tallo principal (profundo → contrasta con el marfil)
  `<path d='M42 0 C70 62 14 116 42 178 C70 240 14 296 42 358 C64 410 24 466 42 560' stroke='${DEEP}' stroke-width='7' stroke-linecap='round'/>` +
  // tallo entrelazado
  `<path d='M42 0 C16 58 66 110 36 176 C8 238 62 292 36 356 C14 414 62 462 42 560' stroke='#79895F' stroke-width='3.4' stroke-linecap='round'/>` +
  // hilo fino
  `<path d='M42 0 C34 60 52 120 40 182 C28 244 52 300 40 362 C30 420 52 470 42 560' stroke='${MID}' stroke-width='1.8' stroke-linecap='round' stroke-opacity='0.8'/>` +
  // zarcillos
  `<path d='M42 60 q18 5 14 21 q-6 14 10 20' stroke='#79895F' stroke-width='2' stroke-linecap='round'/>` +
  `<path d='M40 240 q-18 5 -14 21 q6 14 -10 20' stroke='#79895F' stroke-width='2' stroke-linecap='round'/>` +
  `<path d='M42 400 q18 5 14 21 q-6 14 10 20' stroke='#79895F' stroke-width='2' stroke-linecap='round'/>` +
  `<path d='M40 500 q-16 5 -12 19 q6 12 -9 18' stroke='#79895F' stroke-width='1.8' stroke-linecap='round'/>` +
  LEAVES +
  FLOWERS +
  `</svg>`;

const VINE_URL = `url("data:image/svg+xml,${encodeURIComponent(VINE_SVG)}")`;

function Column({ side }: { side: "left" | "right" }) {
  const left = side === "left";

  const column: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    [side]: 0,
    width: "clamp(58px, 11vw, 168px)",
    overflow: "hidden",
    transform: left ? undefined : "scaleX(-1)",
  };
  const sway: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "50% 0",
    animation: `vine-sway ${left ? 13 : 16}s ease-in-out ${left ? "0s" : "-5s"} infinite`,
  };
  const strip: CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    top: `-${TILE_H}px`,
    height: `calc(100% + ${TILE_H * 2}px)`,
    backgroundImage: VINE_URL,
    backgroundRepeat: "repeat-y",
    backgroundSize: `100% ${TILE_H}px`,
    willChange: "transform",
    ["--tile" as string]: `${TILE_H}px`,
    animation: `vine-descend ${left ? 84 : 100}s linear ${left ? "0s" : "-38s"} infinite`,
  };

  return (
    <div style={column} className="vine-column">
      <div style={sway} className="vine-sway">
        <div style={strip} className="vine-strip" />
      </div>
    </div>
  );
}

export function EdgeVines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ opacity: 0.58 }}
    >
      <Column side="left" />
      <Column side="right" />
    </div>
  );
}
