if (window.tailwind) {
  tailwind.config = {
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
            DEFAULT: "#6d3d45",
            50: "#f3eeeb",
            300: "#a08b86",
            700: "#5a3239",
            900: "#3d2a2e",
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
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll(".reveal");
  if (nodes.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("motion");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.16 }
  );

  for (const node of nodes) observer.observe(node);
});
