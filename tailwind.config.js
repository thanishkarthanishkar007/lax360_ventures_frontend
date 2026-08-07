/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0A0714",
          soft: "#120B26",
          line: "#241a3f",
        },
        violet: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          900: "#3B1774",
        },
        iris: "#6D5EF8",
        paper: "#FCFBFF",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "violet-glow":
          "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(109,94,248,0.25), transparent 50%)",
        "grad-violet": "linear-gradient(135deg, #8B5CF6 0%, #6D5EF8 50%, #4C1D95 100%)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(139,92,246,0.45)",
        "glow-sm": "0 0 24px rgba(139,92,246,0.35)",
        card: "0 25px 70px -25px rgba(20,10,50,0.55)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "spin-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "spin-rev": { from: { transform: "rotate(360deg)" }, to: { transform: "rotate(0deg)" } },
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-20px) scale(1.08)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseline: {
          "0%": { strokeDashoffset: 400 },
          "100%": { strokeDashoffset: 0 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "spin-rev": "spin-rev 20s linear infinite",
        drift: "drift 10s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
