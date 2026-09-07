import type { CSSProperties } from "react";

/**
 * Hojas cayendo de fondo, a lo largo de TODO el sitio.
 *
 * Una sola capa fija a la ventana (`position: fixed`) con hojas pequeñas que
 * caen despacio, de arriba a abajo, con un balanceo suave. Como la capa está
 * fija, el efecto acompaña el scroll por toda la página.
 *
 * - Movimiento 100% CSS (`@keyframes leaf-fall` + `leaf-sway`, solo
 *   `transform`) → compuesto en GPU, sin JavaScript.
 * - Reparto determinista (PRNG sembrado) → sin desajustes de hidratación.
 * - Colores oliva / salvia / tierra que se leen igual sobre marfil y sobre
 *   verde profundo, a opacidad baja para no competir con el contenido.
 * - Decorativa: `aria-hidden`, `pointer-events-none`, por delante del contenido
 *   pero por debajo de la barra y los paneles (z-index moderado).
 * - Respeta `prefers-reduced-motion`: sin caída, hojas quietas y repartidas.
 */

const COUNT = 26;

const COLORS = [
  "#5E6E48", // oliva
  "#7C8A5A", // salvia
  "#94A06E", // salvia claro
  "#8A6B3D", // tierra
  "#A98C55", // ocre claro
  "#6C8064", // eucalipto
  "#B0A277", // caqui
];

const LEAF_PATHS = [
  "M12 1C7 6 5 15 12 23C19 15 17 6 12 1Z",
  "M12 2C4 7 4 17 12 22C20 17 20 7 12 2Z",
  "M12 3C8 6 8 14 12 21C16 14 16 6 12 3Z",
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FallingLeaves() {
  const rnd = mulberry32(20260907);

  const leaves = Array.from({ length: COUNT }, (_, i) => {
    const size = 13 + Math.round(rnd() * 18); // 13–31 px
    const left = +(rnd() * 100).toFixed(2);
    const rest = +(4 + rnd() * 88).toFixed(1); // reposo (reduced-motion), vh
    const color = COLORS[Math.floor(rnd() * COLORS.length)];
    const path = LEAF_PATHS[Math.floor(rnd() * LEAF_PATHS.length)];
    const fallDur = 20 + Math.round(rnd() * 22); // 20–42 s (lento, suave)
    const swayDur = 4 + +(rnd() * 4).toFixed(2); // 4–8 s
    const delay = -+(rnd() * fallDur).toFixed(2);
    const drift = 10 + Math.round(rnd() * 26);
    const rot = Math.round(rnd() * 360);
    const swayAmt = 16 + Math.round(rnd() * 26);
    const op = 0.2 + rnd() * 0.2; // 0.20–0.40 por hoja
    return {
      i,
      size,
      left,
      rest,
      color,
      path,
      fallDur,
      swayDur,
      delay,
      drift,
      rot,
      swayAmt,
      op,
    };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {leaves.map((l) => {
        const outer: CSSProperties = {
          position: "absolute",
          top: 0,
          left: `${l.left}%`,
          width: l.size,
          height: l.size,
          opacity: l.op,
          animation: `leaf-fall ${l.fallDur}s linear ${l.delay}s infinite`,
          ["--rest" as string]: `${l.rest}vh`,
        };
        const inner: CSSProperties = {
          width: "100%",
          height: "100%",
          willChange: "transform",
          animation: `leaf-sway ${l.swayDur}s ease-in-out ${l.delay}s infinite`,
          ["--x1" as string]: `${-l.drift}px`,
          ["--x2" as string]: `${l.drift}px`,
          ["--r1" as string]: `${l.rot - l.swayAmt}deg`,
          ["--r2" as string]: `${l.rot + l.swayAmt}deg`,
        };
        return (
          <div key={l.i} className="leaf-fall" style={outer}>
            <div style={inner}>
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <path d={l.path} fill={l.color} />
                <path
                  d="M12 3Q12 12 12 21"
                  fill="none"
                  stroke="#000"
                  strokeOpacity={0.12}
                  strokeWidth={1}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
