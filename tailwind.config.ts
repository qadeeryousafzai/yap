import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { navy: "#071A35", electric: "#1769FF", cyan: "#19D3E8", emerald: "#12B886", gold: "#F4B942" },
    fontFamily: { sans: ["var(--font-manrope)", "sans-serif"] },
    boxShadow: { glow: "0 20px 70px rgba(23,105,255,.2)" }
  } },
  plugins: [],
};
export default config;
