/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        // تدرجات العنابي الكاملة (استخدام: bg-burgundy-500 أو text-burgundy)
        burgundy: {
          50: "#FBF0F3",
          100: "#F5DBE2",
          200: "#EABAC7",
          300: "#DC8DA3",
          400: "#C7597A",
          500: "#991336",
          DEFAULT: "#800020", // الدرجة الأساسية: bg-burgundy
          700: "#66001A",
          800: "#4D0013",
          900: "#33000D",
          950: "#1A0006",
        },
        // درجات الرمادي المشتقة من نفس زاوية اللون (Saturation Tones)
        burgundyGray: {
          100: "#F5F2F3", // خلفيات هادئة
          200: "#D4C5C9", // حدود وفواصل
          500: "#8C737A", // نصوص فرعية خافتة
          900: "#261C1E", // نصوص داكنة بديلة للأسود
        },
      },

      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        burgundyTheme: {
          primary: "#800020", // العنابي الملكي كزر وعنصر أساسي
          "primary-content": "#ffffff", // لون النص فوق الزر الأساسي
          secondary: "#C7597A", // تدرج فرعي (Burgundy 400)
          accent: "#DC8DA3", // تدرج مميز (Burgundy 300)
          neutral: "#261C1E", // خلفيات داكنة أو نصوص (Burgundy Gray 900)
          "base-100": "#ffffff", // خلفية الصفحة الرئيسية
          "base-200": "#FBF0F3", // خلفية الحاويات والبطاقات (Burgundy 50)
          "base-content": "#261C1E", // لون النصوص الافتراضية
        },
      },
      "light",
      "dark",
    ],
  },
};
