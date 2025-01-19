/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./**/index.html", "./src/**/*.{js,ts,jsx,tsx,mjs,cjs}"],
  theme: {
    screens: {
      md: "834px",
      lg: "1440px",
      sm: { max: "400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        serif: ["Poppins", ...defaultTheme.fontFamily.serif],
        mono: ["Nosifer", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "sm-leading-none": [
          "0.875rem",
          {
            lineHeight: "1",
          },
        ],
        "lg-leading-none": [
          "1.125rem",
          {
            lineHeight: "1",
          },
        ],
        "xl-leading-none": [
          "1.25rem",
          {
            lineHeight: "1",
          },
        ],
        "2xl-leading-none": [
          "1.5rem",
          {
            lineHeight: "1",
          },
        ],
        "3xl-leading-none": [
          "1.875rem",
          {
            lineHeight: "1",
          },
        ],
        "5xl-50": [
          "3.125rem",
          {
            lineHeight: "1",
          },
        ],
      },
      colors: {
        "deep-blue": "#004E89",
        "custom-coral": "#D24343",
        "light-sky-blue": "#E6F0FA",
        "warm-beige": "#FFECD1",
        "light-gray": "#F2F4F6",
        "golden-yellow": "#FFC107",
        "accent-teal": "#20C997",
        "natural-charcoal": "#333",
      },
      height: {
        6.5: "1.5625rem",
        7.5: "1.875rem",
        13: "3.125rem",
        25: "6.25rem",
        70: "16.875rem",
        110: "27.5rem",
        120: "33.5rem",
      },
      width: {
        6.5: "1.5625rem",
        7.5: "1.875rem",
        13: "3.125rem",
        25: "6.25rem",
      },
      padding: {
        3.75: "15px",
        7.5: "30px",
        15: "60px",
        23: "90px",
      },
      margin: {
        7.5: "30px",
        15: "60px",
      },
      inset: {
        7.5: "30px",
      },
      gap: {
        7.5: "30px",
        12.5: "50px",
        15: "60px",
      },
      boxShadow: {
        md: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      gridTemplateRows: {
        hero: "min-content 30px min-content",
        heroMd: "min-content 90px min-content",
        locationCard: "min-content 1fr 30px",
        locationCardMd: "min-content 1fr 60px",
      },
      gridTemplateColumns: {
        hero: "20px 1fr 20px",
        heroMd: "30px 1fr 30px",
        heroLg: "1fr 1000px 1fr",
      },
      borderRadius: {
        big: "200px",
        bigger: "400px",
      },
    },
  },
  plugins: [],
};
