/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./**/index.html", "./src/**/*.{js,ts,jsx,tsx,mjs,cjs}"],
  theme: {
    screens: {
      md: "834px",
      lg: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        serif: ["Poppins", ...defaultTheme.fontFamily.serif],
        mono: ["Nosifer", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "xl-leading-none": [
          "1.25rem",
          {
            lineHeight: "1",
          },
        ],
      },
      colors: {
        "deep-blue": "#004E89",
        "custom-coral": "#FF6B6B",
        "light-sky-blue": "#E6F0FA",
        "warm-beige": "#FFECD1",
        "light-gray": "#F2F4F6",
        "natural-charcoal": "#333333",
        "golden-yellow": "#FFC107",
        "accent-teal": "#20C997",
      },
    },
  },
  plugins: [],
};
