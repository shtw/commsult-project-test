import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "40px",
        md: "15px",
        lg: "15px",
        xl: "15px",
      },
      screens: {
        sm: "640px",
        md: "750px",
        lg: "1024px",
        xl: "1170px",
      },
    },
    fontFamily: {
      heading: ["var(--font-capitolium)", ...fontFamily.sans],
      body: ["var(--font-roboto)", ...fontFamily.mono],
    },
    letterSpacing: {
      normal: "0",
      wide: "0.1px",
      wider: "0.2px",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        primary: {
          DEFAULT: "var(--primary)",
        },
        "primary-darken": {
          DEFAULT: "var(--primary-darken)",
        },
        "primary-lighten": {
          DEFAULT: "var(--primary-lighten)",
        },
        "primary-text": {
          DEFAULT: "var(--primary-text)",
        },
        "secondary-text": {
          DEFAULT: "var(--secondary-text)",
        },
        mute: {
          DEFAULT: "var(--mute)",
          200: "var(--mute-200)",
        },
        grey: {
          DEFAULT: "var(--grey)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
        },
        toggle: {
          DEFAULT: "var(--toggle)",
          foreground: "var(--toggle-foreground)",
          hover: "var(--toggle-hover)",
          "hover-foreground": "var(--toggle-hover-foreground)",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-down": "linear-gradient(210.75deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": "0 20px 29px 0 rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "collapsible-product-down": {
          from: { height: "0" },
          to: { opacity: "1", height: "calc(500px+var(--height))" },
        },
        "collapsible-product-up": {
          from: { height: "calc(500px+var(--height))" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "collapsible-2-down": "collapsible-down .5s ease",
        "collapsible-2-up": "collapsible-up 0.5s ease",
        "collapsible-product-down": "collapsible-product-down .5s ease-out",
        "collapsible-product-up": "collapsible-product-up .5s ease-out",
      },
    },
  },
  variants: {
    extends: {
      display: ["group-hover"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
