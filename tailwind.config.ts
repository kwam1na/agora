import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    // screens: {

    // },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        smm: "800px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          100: "hsl(338, 81%, 90%)",
          200: "hsl(338, 81%, 80%)",
          300: "hsl(338, 81%, 70%)",
          400: "hsl(338, 81%, 60%)",
          500: "hsl(338, 81%, 50%)", // Base color
          600: "hsl(338, 81%, 45%)",
          700: "hsl(338, 81%, 35%)",
          800: "hsl(338, 81%, 25%)",
          900: "hsl(338, 81%, 15%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(0, 68%, 50%)",
          foreground: "hsl(var(--destructive-foreground))",
          100: "hsl(0, 68%, 90%)",
          200: "hsl(0, 68%, 80%)",
          300: "hsl(0, 68%, 70%)",
          400: "hsl(0, 68%, 60%)",
          500: "hsl(0, 68%, 50%)", // Base color
          600: "hsl(0, 68%, 45%)",
          700: "hsl(0, 68%, 35%)",
          800: "hsl(0, 68%, 25%)",
          900: "hsl(0, 68%, 15%)",
        },
        success: {
          DEFAULT: "hsl(140, 68%, 50%)",
          foreground: "hsl(140, 68%, 50%)",
          100: "hsl(140, 68%, 90%)",
          200: "hsl(140, 68%, 80%)",
          300: "hsl(140, 68%, 70%)",
          400: "hsl(140, 68%, 60%)",
          500: "hsl(140, 68%, 50%)", // Base color
          600: "hsl(140, 68%, 45%)",
          700: "hsl(140, 68%, 35%)",
          800: "hsl(140, 68%, 25%)",
          900: "hsl(140, 68%, 15%)",
        },
        grey: {
          DEFAULT: "hsl(209, 12%, 50%)",
          foreground: "hsl(209, 12%, 50%)",
          100: "hsl(209, 12%, 90%)",
          200: "hsl(209, 12%, 80%)",
          300: "hsl(209, 12%, 70%)",
          400: "hsl(209, 12%, 60%)",
          500: "hsl(209, 12%, 50%)", // Base color
          600: "hsl(209, 12%, 45%)",
          700: "hsl(209, 12%, 35%)",
          800: "hsl(209, 12%, 25%)",
          900: "hsl(209, 12%, 15%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
