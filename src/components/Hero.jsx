import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import heroVideo from "../assets/videos/hero-bg.mp4";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-24 sm:pt-36 lg:pt-40 lg:pb-32 overflow-hidden scroll-mt-28 lg:scroll-mt-32">
      {/* Background Video Layer - z-0 with z-10 content on top */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-85 dark:opacity-90"
        />
        {/* Soft overlay so text remains readable */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-void-fade to-transparent pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md px-4 py-1.5 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-violet-700 dark:text-violet-200 font-semibold">
            LAX360 Ventures · SaaS Product Suite
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] text-slate-900 dark:text-paper drop-shadow-sm"
        >
          Transform Your Business
          <br />
          with <span className="text-gradient">Smart Digital</span>
          <br />
          Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-700 dark:text-paper/75 leading-relaxed font-medium"
        >
          LAX360 Ventures builds and scales SaaS products that help teams
          automate operations, understand customers, and grow revenue —
          all from one connected platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/book-demo"
            className="group inline-flex items-center gap-2 rounded-full bg-grad-violet px-8 py-4 font-bold text-white text-base shadow-glow hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <Play size={11} fill="currentColor" />
            </span>
            Get Demo
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-xs text-slate-600 dark:text-paper/50 font-medium"
        >
          No credit card required · Response within 24 hours
        </motion.p>
      </div>
    </section>
  );
}
