import type { Config } from "tailwindcss";

// Our Little Company palette: high-end minimalist. Black, white, and one red.
// No per-brand colors, no gradients, no soft shadows: type, whitespace, and
// hairline rules do all the work.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff", // white base
        card: "#fafafa", // barely-raised surfaces
        ink: "#0a0a0a", // near-black text and inverted sections
        muted: "#5c5c5c", // secondary text
        faint: "#9a9a9a", // tertiary / captions
        line: "#e8e8e8", // hairline borders on white
        "line-dark": "#2a2a2a", // hairline borders on black
        pop: "#e10600", // the one red
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Archivo"', '"Inter"', "ui-sans-serif", "sans-serif"],
      },
      maxWidth: { content: "78rem", prose: "46rem" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
