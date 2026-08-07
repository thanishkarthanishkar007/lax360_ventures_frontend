import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const PARTICLE_COUNT = 40;

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0);
  // 0: dark + grid, 1: streaks, 2: particles converge + logo, 3: tagline, 4: zoom-out/exit

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map(() => ({
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 600,
        delay: Math.random() * 0.4,
      })),
    []
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 800),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 3400),
      setTimeout(() => setStage(4), 5000),
      setTimeout(() => onComplete?.(), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[100] bg-void overflow-hidden flex items-center justify-center"
        animate={stage === 4 ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeIn" }}
      >
        {/* Grid emerges */}
        <motion.div
          className="absolute inset-0 grid-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 0 ? 0.5 : 0 }}
          transition={{ duration: 1.2 }}
        />

        {/* Purple light streaks */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          {[
            "M -100 200 L 700 450",
            "M 1700 150 L 800 430",
            "M -100 750 L 750 480",
            "M 1700 800 L 850 470",
            "M 300 -50 L 780 400",
            "M 1300 -50 L 850 420",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="url(#streak-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                stage >= 1
                  ? { pathLength: 1, opacity: [0, 1, 0.4] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.3, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
          <defs>
            <linearGradient id="streak-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Converging particles */}
        {stage >= 2 &&
          stage < 4 &&
          particles.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-violet-300"
              style={{ left: "50%", top: "50%" }}
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 1.5 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: 0.3 }}
              transition={{ duration: 1.1, delay: p.delay, ease: "easeIn" }}
            />
          ))}

        {/* Logo assembly */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, filter: "blur(8px)" }}
            animate={
              stage >= 2
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.4, filter: "blur(8px)" }
            }
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <Logo className="h-14 w-14" />
            <div className="leading-none text-left">
              <span className="font-display text-4xl font-extrabold tracking-tight text-paper block">
                LAX<span className="text-gradient font-extrabold">360</span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.3em] text-violet-300/80 block mt-1">
                VENTURES
              </span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-mono text-xs sm:text-sm tracking-[0.15em] text-paper/60 text-center max-w-sm px-6"
          >
            Empowering Businesses Through Intelligent Digital Solutions.
          </motion.p>
        </div>

        {/* skip button */}
        <button
          onClick={() => onComplete?.()}
          className="absolute bottom-8 right-8 font-mono text-[11px] uppercase tracking-widest text-paper/35 hover:text-paper/70 transition-colors"
        >
          Skip intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
