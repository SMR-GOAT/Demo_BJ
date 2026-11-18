
    
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          burgundy: {
            DEFAULT: "var(--brand-primary)",
            50: "#fbf0f3",
            300: "#dc8da3",
            900: "#33000d",
          },
          burgundyGray: {
            100: "#f5f2f3",
            200: "#d4c5c9",
            900: "#261c1e",
          },
        },
      },
    },
  };
}