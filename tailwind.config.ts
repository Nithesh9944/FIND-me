import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18212b",
        paper: "#f5f2eb",
        coral: "#ef7658",
        mint: "#bddfd1"
      }
    }
  },
  plugins: []
};

export default config;
