import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta TIERRA SANA — espejo de globals.css :root
        olive: {
          DEFAULT: "#3C4A32", // verde militar profundo (principal)
          deep: "#2B3524",
          mid: "#5B6B4A", // verde oliva más claro (apoyo)
          soft: "#8A9A7B",
        },
        sage: "#DDE3D5", // verde salvia muy tenue
        ink: "#14140F", // negro cálido (secundario)
        ivory: "#F6F4EC", // blanco roto / marfil
        stone: "#8C877B", // gris cálido
        bark: "#6B4A2E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.16em",
        wide2: "0.32em",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-14px,0) rotate(3deg)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(10px,-8px,0) rotate(-2deg)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 18s ease-in-out infinite",
        drift: "drift 24s ease-in-out infinite",
        "fade-in": "fade-in 1.2s ease forwards",
      },
      maxWidth: {
        shell: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
