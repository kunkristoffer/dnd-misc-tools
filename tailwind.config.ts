import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d1b2a",
        foreground: "#1b263b",
        panel: "#415a77",
        primary: "#e0e1dd",
        secondary: "#778da9",
      },
    },
    keyframes: {
      sway: {
        "0%": { transform: "rotate(-6deg)" },
        "50%": { transform: "rotate(6deg)" },
        "100%": { transform: "rotate(-6deg)" },
      },
    },
    animation: {
      'swaying': 'sway 8s infinite',
    },
  },
  plugins: [],
} satisfies Config;
