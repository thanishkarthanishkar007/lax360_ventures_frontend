import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, Cloud, HeartPulse, LineChart } from "lucide-react";
import Logo from "./Logo";

const NODES = [
  { icon: LineChart, label: "CRM", pos: "left-2 top-10" },
  { icon: HeartPulse, label: "Hospital", pos: "right-4 top-24" },
  { icon: Boxes, label: "AI", pos: "left-10 bottom-16" },
  { icon: Cloud, label: "Cloud", pos: "right-2 bottom-8" },
];

const PARTICLE_COUNT = 70;

/* Stage timeline for the one-time materialization sequence */
const STAGE_MS = {
  grid: 250,
  scan: 850,
  particles: 1550,
  outline: 2500,
  letters: 3450,
  reveal: 4300,
  idle: 5200,
};

function HoloGrid({ active }) {
  return (
    <motion.div
      className="absolute h-44 w-44 rounded-2xl"
      style={{
        backgroundImage:
          "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
        WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 72%)",
        maskImage: "radial-gradient(circle, black 35%, transparent 72%)",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: active ? [0, 0.6, 0.35] : 0, scale: active ? 1 : 0.85 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}

function ScanLines({ active }) {
  if (!active) return null;
  return (
    <div className="absolute h-44 w-44 overflow-hidden rounded-2xl pointer-events-none">
      {[0, 0.35].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(96,165,250,0.55), rgba(139,92,246,0.65), transparent)",
            filter: "blur(2px)",
          }}
          initial={{ left: "-15%" }}
          animate={{ left: "115%" }}
          transition={{ duration: 1, delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function ConvergingParticles({ active }) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 100;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          delay: Math.random() * 0.6,
          size: 1 + Math.random() * 1.8,
          color: Math.random() > 0.5 ? "#A78BFA" : "#7DD3FC",
        };
      }),
    []
  );
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 5px ${p.color}` }}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={active ? { x: 0, y: 0, opacity: [0, 1, 0] } : { x: p.x, y: p.y, opacity: 0 }}
          transition={{ duration: 1, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

function WireframeShield({ drawOutline, drawLetters, fadeOut }) {
  const shieldPath = "M50 6 L88 20 L88 54 C88 83 70 96 50 103 C30 96 12 83 12 54 L12 20 Z";
  const lPath = "M37 36 L37 72 L58 72";
  const aStroke1 = "M56 72 L67 36 L78 72";
  const aBar = "M60 60 L73 60";

  return (
    <motion.svg
      viewBox="0 0 100 110"
      className="absolute h-24 w-24"
      style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.85))" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeOut ? 0 : drawOutline ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.path
        d={shieldPath}
        fill="none"
        stroke="#A78BFA"
        strokeWidth="1.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawOutline ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d={lPath}
        fill="none"
        stroke="#7DD3FC"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawLetters ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
      />
      <motion.path
        d={aStroke1}
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawLetters ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
      />
      <motion.path
        d={aBar}
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawLetters ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export default function HologramLogo() {
  const [ms, setMs] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      setMs(now - start);
      if (now - start < STAGE_MS.idle + 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const gridOn = ms >= STAGE_MS.grid;
  const scanOn = ms >= STAGE_MS.scan && ms < STAGE_MS.particles + 400;
  const particlesOn = ms >= STAGE_MS.particles && ms < STAGE_MS.outline + 300;
  const outlineOn = ms >= STAGE_MS.outline;
  const lettersOn = ms >= STAGE_MS.letters;
  const revealed = ms >= STAGE_MS.reveal;
  const wireframeFade = ms >= STAGE_MS.reveal;
  const idle = ms >= STAGE_MS.idle;

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-0 left-8 h-56 w-56 rounded-full bg-violet-600/30 blur-3xl animate-drift" />
        <div className="absolute bottom-4 right-4 h-64 w-64 rounded-full bg-iris/20 blur-3xl animate-drift" style={{ animationDelay: "2s" }} />
      </div>

      {/* Circular stage — unchanged from the existing design */}
      <div className="relative h-full w-full rounded-full border border-violet-500/25 bg-void-soft/70 glass overflow-hidden shadow-glow">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(196,181,253,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 h-10 w-3/5 rounded-full bg-violet-500/40 blur-2xl" />

        {/* Hologram materialization stack, centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <HoloGrid active={gridOn && !revealed} />
          <ScanLines active={scanOn} />
          <ConvergingParticles active={particlesOn} />

          <motion.div
            className="relative h-24 w-24 flex items-center justify-center"
            animate={
              idle
                ? {
                    scale: hovering ? 1.05 : [1, 1.03, 1],
                    y: hovering ? -6 : [0, -3, 0],
                  }
                : {}
            }
            transition={
              hovering
                ? { duration: 0.35, ease: "easeOut" }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
          >
            <WireframeShield drawOutline={outlineOn} drawLetters={lettersOn} fadeOut={wireframeFade} />

            {/* Full-color logo, crossfades in once the wireframe finishes */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <Logo
                className="h-24 w-24"
                style={{
                  filter: hovering
                    ? "drop-shadow(0 0 36px rgba(139,92,246,0.75))"
                    : "drop-shadow(0 0 18px rgba(139,92,246,0.4))",
                }}
              />

              {/* left-to-right light sweep on reveal */}
              {revealed && (
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.1, delay: 1.1 }}
                >
                  <motion.div
                    className="absolute top-0 bottom-0 w-8"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), rgba(139,92,246,0.4), transparent)",
                      filter: "blur(3px)",
                      mixBlendMode: "screen",
                    }}
                    initial={{ left: "-20%" }}
                    animate={{ left: "120%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </motion.div>
              )}

              {/* hover energy pulse */}
              {hovering && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-violet-300/60"
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* ambient rotating ring, part of the existing circular background */}
        <div className="absolute inset-6 rounded-full border border-dashed border-violet-300/15 animate-spin-slow" />
      </div>

      {/* Floating product chips — unchanged */}
      {NODES.map((n, i) => {
        const Icon = n.icon;
        return (
          <motion.div
            key={n.label}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className={`absolute ${n.pos} flex flex-col items-center gap-1.5`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-grad-violet text-white shadow-glow-sm border border-white/20">
              <Icon size={17} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-violet-200 bg-void/70 px-2 py-0.5 rounded-full whitespace-nowrap">
              {n.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
