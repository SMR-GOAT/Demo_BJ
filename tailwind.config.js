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
          50: "#f3eeeb",
          100: "#e7ded9",
          200: "#d3c4be",
          300: "#a08b86",
          400: "#8d6e73",
          500: "#7a5560",
          DEFAULT: "#6d3d45",
          700: "#5a3239",
          800: "#4a2b31",
          900: "#3d2a2e",
          950: "#24181a",
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
          primary: "#6d3d45",
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
