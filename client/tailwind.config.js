// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#cc5f3a",       // Orange
        teal: "#197f7f",     // Teal
        beige: "##eae2d8",    // Beige
        burgundy: "#8c3030",    // Burgundy
        accent: "#b2a897",     // Darker Beige
        lightBeige: "#d4cbbb",   // Light Beige
        grayDark: "#4b4b4b",      // Dark Gray
        background: "#e6e0d6", // Background Color
        card: "#d9d2c6", // Card Color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
        "3xs": "0.55rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        28: "7rem",
        36: "9rem",
        40: "10rem",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
      boxShadow: {
        inner: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "in-out-cubic": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
