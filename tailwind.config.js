import typography from "./typography.tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        tg: {
          background: {
            DEFAULT: "var(--tg-theme-bg-color)",
            secondary: "var(--tg-theme-secondary-bg-color)",
            section: "var(--tg-theme-section-bg-color)",
          },
          header: {
            DEFAULT: "var(--tg-theme-header-bg-color)",
            section: "var(--tg-theme-section-header-text-color)",
          },
          text: {
            DEFAULT: "var(--tg-theme-text-color)",
            accent: "var(--tg-theme-accent-text-color)",
          },
          button: {
            DEFAULT: "var(--tg-theme-button-color)",
            tinted:
              "color-mix(in srgb, var(--tg-theme-link-color) 10%, transparent)",
            text: "var(--tg-theme-button-text-color)",
          },
          hint: "var(--tg-theme-hint-color)",
          subtitle: "var(--tg-theme-subtitle-text-color)",
          link: "var(--tg-theme-link-color)",
          destructive: "var(--tg-theme-destructive-text-color)",
        },
      }
    },
  },
  plugins: [typography],
}

