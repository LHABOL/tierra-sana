import type { CSSProperties } from "react";

/**
 * Cortina de lianas de selva en las **orillas** de una sección, **integrada en
 * el fondo** (detrás del contenido, se desplaza con el scroll — no fija).
 *
 * - Varias lianas juntas por orilla, con flora pegada: hojas, flores y
 *   zarcillos. `tone` elige los verdes según el fondo de la sección para que
 *   contrasten (verdes oscuros sobre marfil, verdes claros sobre oliva/negro).
 * - Movimiento como serpiente, 100% CSS (solo `transform`):
 *     · `vine-descend` — la tira baja despacio con un serpenteo horizontal.
 *     · `vine-sway` — el conjunto se mece más lento, colgando desde arriba.
 * - Va detrás del contenido (`-z-[1]`, la sección debe tener `relative isolate
 *   overflow-hidden`). `aria-hidden`, `pointer-events-none`.
 * - `prefers-reduced-motion` deja las lianas quietas.
 */

const TILE_W = 220;
const TILE_H = 460;

type Tone = "light" | "dark";

interface Palette {
  stemA: string;
  stemB: string;
  thread: string;
  leaf: [string, string, string];
  flower: [string, string];
}

const PALETTES: Record<Tone, Palette> = {
  // lianas oscuras para fondos claros (marfil)
  light: {
    stemA: "#4F5D3B",
    stemB: "#657450",
    thread: "#7C8C5B",
    leaf: ["#5C6C44", "#7A8B58", "#93A472"],
    flower: ["#C8D3AE", "#B58A5E"],
  },
  // lianas claras para fondos oscuros (oliva / negro)
  dark: {
    stemA: "#93A26E",
    stemB: "#AEBD8C",
    thread: "#C2CFA4",
    leaf: ["#9DB07F", "#BCCB9F", "#8CA277"],
    flower: ["#EFE9D8", "#E7D6CC"],
  },
};

const leaf = (x: number, y: number, s: number, rot: number, fill: string) =>
  `<path d='M0 0 C7 -10 20 -11 30 -2 C22 9 8 11 0 0Z' fill='${fill}' transform='translate(${x} ${y}) rotate(${rot}) scale(${s})'/>`;

const flower = (x: number, y: number, s: number, petal: string) =>
  `<g transform='translate(${x} ${y}) scale(${s})'>` +
  [0, 72, 144, 216, 288]
    .map(
      (a) =>
        `<ellipse cx='0' cy='-6' rx='4' ry='6.6' fill='${petal}' transform='rotate(${a})'/>`,
    )
    .join("") +
  `<circle r='2.6' fill='#C9A24B'/></g>`;

/** una liana sinuosa que empieza y acaba en la misma x (tilea en vertical) */
function strand(baseX: number, amp: number, width: number, p: Palette) {
  const x1 = baseX + amp;
  const x2 = baseX - amp;
  const path = `M${baseX} 0 C${x1} 58 ${x2} 110 ${baseX} 172 C${x1} 234 ${x2} 286 ${baseX} 344 C${x1} 396 ${x2} 430 ${baseX} 460`;
  const [lA, lB, lC] = p.leaf;
  const dir = baseX < TILE_W / 2 ? 1 : -1; // hojas hacia el centro
  let s = `<path d='${path}' stroke='${p.stemB}' stroke-width='${width}' stroke-linecap='round'/>`;
  s += `<path d='${path}' stroke='${p.thread}' stroke-width='${Math.max(1.3, width * 0.4)}' stroke-linecap='round' stroke-opacity='0.75' transform='translate(${dir * 3} 0)'/>`;
  // hojas a lo largo del tallo
  const ys = [26, 66, 108, 150, 194, 238, 282, 326, 372, 418];
  ys.forEach((y, i) => {
    const lx = baseX + (i % 2 === 0 ? amp * 0.5 : -amp * 0.5);
    const fill = [lA, lB, lC][i % 3];
    const rot = i % 2 === 0 ? (dir > 0 ? -14 : 194) : dir > 0 ? 200 : -20;
    s += leaf(lx, y, 0.9 + (i % 3) * 0.14, rot, fill);
  });
  return s;
}

function buildVine(tone: Tone): string {
  const p = PALETTES[tone];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE_W}' height='${TILE_H}' viewBox='0 0 ${TILE_W} ${TILE_H}' fill='none'>` +
    strand(24, 12, 4.2, p) +
    strand(66, 16, 6.5, p) +
    strand(112, 13, 4.6, p) +
    strand(168, 10, 3.4, p) +
    // zarcillos
    `<path d='M66 70 q18 5 14 21 q-6 14 10 20' stroke='${p.thread}' stroke-width='2' stroke-linecap='round'/>` +
    `<path d='M112 250 q-16 5 -12 19 q6 12 -9 18' stroke='${p.thread}' stroke-width='1.8' stroke-linecap='round'/>` +
    `<path d='M24 380 q16 5 12 19 q-6 12 9 18' stroke='${p.thread}' stroke-width='1.8' stroke-linecap='round'/>` +
    // flores
    flower(92, 96, 1.0, p.flower[0]) +
    flower(40, 210, 0.9, p.flower[1]) +
    flower(120, 300, 1.0, p.flower[0]) +
    flower(150, 400, 0.85, p.flower[0]) +
    flower(30, 430, 0.9, p.flower[1]) +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const VINE = { light: buildVine("light"), dark: buildVine("dark") };

function Column({ side, tone }: { side: "left" | "right"; tone: Tone }) {
  const left = side === "left";
  const column: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    [side]: 0,
    width: "clamp(84px, 15vw, 210px)",
    overflow: "hidden",
    transform: left ? undefined : "scaleX(-1)",
  };
  const sway: CSSProperties = {
    position: "absolute",
    inset: 0,
    transformOrigin: "50% 0",
    animation: `vine-sway ${left ? 14 : 17}s ease-in-out ${left ? "0s" : "-6s"} infinite`,
  };
  const strip: CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    top: `-${TILE_H}px`,
    height: `calc(100% + ${TILE_H * 2}px)`,
    backgroundImage: VINE[tone],
    backgroundRepeat: "repeat-y",
    backgroundSize: `100% ${TILE_H}px`,
    willChange: "transform",
    ["--tile" as string]: `${TILE_H}px`,
    animation: `vine-descend ${left ? 90 : 108}s linear ${left ? "0s" : "-40s"} infinite`,
  };
  return (
    <div style={column} className="vine-column">
      <div style={sway} className="vine-sway">
        <div style={strip} className="vine-strip" />
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
      style={{ opacity: opacity ?? (tone === "dark" ? 0.52 : 0.5) }}
    >
      <Column side="left" tone={tone} />
      <Column side="right" tone={tone} />
    </div>
  );
}
