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
        orangeLight: "#e58b6c",       // Light Orange
        teal: "#197f7f",     // Teal
        tealLight: "#4ca3a3",     // Teal
        burgundy: "#8c3030",    // Burgundy
        burgundyLight: "#a54a4a",    // Light Burgundy
        accent: "#b2a897",     // Darker Beige
        grayLighter: "#8c8c8c",      // Lighter Gray
        grayLight: "#6f6f6f",      // Light Gray
        grayDark: "#4b4b4b",      // Dark Gray
        grayDarker: "#3a3a3a",      // Darker Gray
        lightBeige: "#ede9e1",   // Light Beige
        background: "#e6e0d6", // Background Color (base Beige)
        card: "#d9d2c6", // Card (Light Beige)
        softNeutral: "#d1ccc4", // Soft Taupe/Neutral Background
        mushroom: "#cfc9bf" // Muted Mushroom Gray
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
