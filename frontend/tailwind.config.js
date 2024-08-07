/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },

    screens: {
      xsm: "300px",
      sm: "400px",
      md: "520px",
      lg: "750px",
      xl: "1024px",
      "2xl": "1400px",
    },

    fontFamily: {
      title: ["Kanit", "serif"],
      intro: ["Patua One", "serif"],
      introSub: ["Rubik Scribble", "system-ui"],
      kanit: ["Kanit", "sans-serif"],
      noto: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      colors: {
        //Custom color
        nav: "#475569",
        white: "white",
        mixedShadow: "#828fb1",
        gray: "#94a3b8",
        zinc: "#e5e7eb",
        slate: "#e5e7eb",
        login: "#2563eb",
        black: "#1e293b",
        card: "#24406e",
        yellow: "yellow",
        green: "green",
        red: "red",
        blue: "#2563eb",
        upload: "#f2f2f0",
        zinc100: "#f4f4f5",
        lime200: "#d9f99d",
        blue950: "#172554",
        ///
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
};
