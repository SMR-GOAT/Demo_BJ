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
            DEFAULT: "#800020",
            50: "#fbf0f3",
            300: "#dc8da3",
            700: "#66001a",
            900: "#33000d",
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
  const topics = document.querySelectorAll(".comparison-topic");
  for (const topic of topics) {
    topic.addEventListener("click", () => {
      const wasSelected = topic.getAttribute("aria-pressed") === "true";
      for (const other of topics) {
        const selected = other === topic && !wasSelected;
        other.setAttribute("aria-pressed", String(selected));
        other.closest("tr").classList.toggle("is-selected", selected);
      }
    });
  }

  const nodes = document.querySelectorAll(".reveal, .notification-bell");
  if (nodes.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -24px 0px", threshold: 0.08 }
  );

  document.documentElement.classList.add("motion");
  for (const node of nodes) observer.observe(node);
});
