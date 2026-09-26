import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d9b5",
          300: "#e9be85",
          400: "#de9c53",
          500: "#d58234",
          600: "#c76a28",
          700: "#a55223",
          800: "#854223",
          900: "#6c381f",
          950: "#3a1b0f",
        },
        earth: {
          50: "#f7f5f0",
          100: "#ebe7da",
          200: "#d9d1b8",
          300: "#c3b58f",
          400: "#b09d6f",
          500: "#a18c5e",
          600: "#8a7350",
          700: "#705b43",
          800: "#5f4d3c",
          900: "#524235",
          950: "#2e231c",
        },
        warm: {
          50: "#faf5f2",
          100: "#f3e8e0",
          200: "#e7cfc1",
          300: "#d7ae98",
          400: "#c68a6e",
          500: "#ba7155",
          600: "#ac5f49",
          700: "#8f4d3e",
          800: "#744137",
          900: "#5f3830",
          950: "#331b17",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
