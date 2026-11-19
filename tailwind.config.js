/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "4px",
      DEFAULT: "6px",
      md: "6px",
      lg: "6px",
      xl: "6px",
      "2xl": "6px",
      "3xl": "6px",
      full: "6px",
    },
    boxShadow: {
      sm: "none",
      DEFAULT: "none",
      md: "none",
      lg: "none",
      xl: "none",
      "2xl": "none",
      inner: "none",
      none: "none",
    },
    extend: {
      colors: {
        burgundy: {
          50: "#fbf0f3",
          100: "#f5dbe2",
          200: "#eabac7",
          300: "#dc8da3",
          400: "#c7597a",
          500: "#991336",
          DEFAULT: "#800020",
          700: "#66001a",
          800: "#4d0013",
          900: "#33000d",
          950: "#1a0006",
        },
        burgundyGray: {
          100: "#f4f1ec",
          200: "#ddd6cf",
          500: "#8a817a",
          900: "#2c2826",
        },
      },
      fontFamily: {
        sans: ["Noto Sans Arabic", "Tahoma", "Arial", "sans-serif"],
        serif: ["Noto Sans Arabic", "Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        burgundyTheme: {
          primary: "#800020",
          "primary-content": "#f7f4f0",
          secondary: "#8a817a",
          accent: "#a08b86",
          neutral: "#2c2826",
          "base-100": "#fffcf9",
          "base-200": "#f4f1ec",
          "base-content": "#2c2826",
          "--rounded-box": "6px",
          "--rounded-btn": "6px",
          "--rounded-badge": "6px",
        },
      },
      "light",
    ],
  },
};
