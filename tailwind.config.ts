import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00FFE1",
          magenta: "#FF00F5",
          blue: "#00A3FF",
        },
        glass: "rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        scanlines: "linear-gradient(rgba(255,255,255,0.02) 50%, transparent 50%)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      boxShadow: {
        neon: "0 0 15px rgba(0,255,225,0.5), 0 0 30px rgba(255,0,245,0.25)"
      }
    }
  },
  plugins: []
};
export default config;
