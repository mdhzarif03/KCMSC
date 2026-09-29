import type { Config } from "tailwindcss";

// Tokens transcribed directly from
// "K. C. Model School & College — Website Colour Palette & Digital Brand Guide".
// Do not introduce additional saturated colours outside this system —
// see the brand guide's hierarchy: core green > neutral > support > accent.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#176B45", // Primary Green — nav, buttons, links, headings
          dark: "#124C36" // Dark Green — header/footer, hover states
        },
        soft: {
          green: "#6F8F7D" // Soft Green — secondary accents, subtle backgrounds
        },
        brass: "#B59A4A", // Muted Brass — dividers, small highlights, active indicators
        brick: "#B94A4A", // Brick Red — important accents, notices (use sparingly)
        burgundy: "#7F3035", // deep red accent — rare emphasis only
        background: "#F7F5EF", // Warm Off-White — primary page background
        surface: "#EFEEE7", // Soft Cream — cards, panels, form areas
        ink: {
          DEFAULT: "#242824", // Charcoal — primary text
          muted: "#69716B" // Slate Grey — secondary text
        },
        border: "#D9D8CF" // Border Grey — structural neutral
      },
      fontFamily: {
        // Editorial serif for headings, restrained sans for body/UI.
        // Add actual font files/next/font wiring in a follow-up phase —
        // this only reserves the token names so components don't
        // hardcode font stacks ad hoc.
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        bangla: ["var(--font-bangla)", "'Noto Sans Bengali'", "system-ui", "sans-serif"]
      },
      maxWidth: {
        content: "80rem"
      }
    }
  },
  plugins: []
};

export default config;
