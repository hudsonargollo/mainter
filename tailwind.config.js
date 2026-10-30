/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FFCF21",
        "accent-dark": "#E4A800",
        "accent-soft": "rgba(255, 207, 33, 0.12)",
        royal: "#174A9C",
        "royal-dark": "#0F3570",
        "royal-soft": "rgba(23, 74, 156, 0.12)",
        primary: "#174A9C",
        "primary-dark": "#0E2E6B",
        "primary-soft": "rgba(23, 74, 156, 0.12)",
        "bg-900": "#0B172A",
        "bg-800": "#112650",
        "bg-700": "#16386E",
        ink: "#F6F3EE",
        "ink-subdued": "#C9C2B4",
        "ink-muted": "#9A9082",
        surface: "#F6F3EE",
        "surface-alt": "#EDE7DB",
        glass: "rgba(255, 255, 255, 0.07)",
        "glass-hover": "rgba(255, 255, 255, 0.12)",
        "glass-border": "rgba(255, 255, 255, 0.14)",
        "border-default": "rgba(255, 255, 255, 0.14)",
        "border-strong": "rgba(255, 255, 255, 0.22)",
      },
      backgroundColor: {
        "accent-soft/60": "rgba(255, 207, 33, 0.60)",
        "accent-soft/40": "rgba(255, 207, 33, 0.40)",
      },
      borderColor: {
        "accent-soft/60": "rgba(255, 207, 33, 0.60)",
        "accent-soft/40": "rgba(255, 207, 33, 0.40)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Segoe UI", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "accent-soft": "0 8px 24px rgba(255, 207, 33, 0.15)",
      },
    },
  },
  plugins: [],
};
