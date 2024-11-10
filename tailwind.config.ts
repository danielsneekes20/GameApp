import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#222328",
        secondary: "#0d0f22",
        darkGrey: "#1c1d22",
        "white-opacity-15": "rgba(255, 255, 255, 0.15)",
      },
      boxShadow: {
        custom: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backdropBlur: {
        custom: "2px",
      },
      gridTemplateColumns: {
        "auto-fill-200": "repeat(auto-fill, minmax(240px, 1fr))",
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(circle at top left, #1a1a4a, #0f0f3b 40%, #07071a 100%)",
        gradient:
          "linear-gradient(12deg, rgba(89,0,255,1) 0%, rgba(2,0,36,1) 69%, rgba(2,0,36,1) 85%)",
        "gradient-darker":
          "linear-gradient(12deg, rgba(2,0,36,1) 26%, rgba(89,0,255,0.6474964985994398) 42%, rgba(2,0,36,1)",
      },
    },
  },
  plugins: [],
};
export default config;
