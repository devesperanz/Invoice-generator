import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom1: "#333333",
        custom2: "#555555",
        custom3: "#455964",
        custom4: "#C62828",
        custom5: "#D71A60",
        custom6: "#7B1EA2",
        custom7: "#4526A0",
        custom8: "#283593",
        custom9: "#1664C0",
        custom10: "#0177BD",
        custom11: "#01685C",
        custom12: "#2F7C31",
        custom13: "#548B2F",
      },
    },
  },
  plugins: [],
};
export default config;
