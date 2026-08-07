import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import HologramLogo from "./HologramLogo";

export default function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-24 lg:pt-48 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-void overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-void/70" />
        <div className="absolute inset-0 bg-violet-glow" />
        <div className="absolute inset-0 grid-fade opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-violet-200">
              LAX360 Ventures · SaaS Product Suite
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] text-paper"
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
            className="mt-7 max-w-lg text-base lg:text-lg text-paper/65 leading-relaxed"
          >
            LAX360 Ventures builds and scales SaaS products that help teams
            automate operations, understand customers, and grow revenue —
            all from one connected platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              to="/book-demo"
              className="group inline-flex items-center gap-2 rounded-full bg-grad-violet px-7 py-3.5 font-bold text-white text-sm shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
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
            className="mt-6 text-xs text-paper/40"
          >
            No credit card required · Response within 24 hours
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <HologramLogo />
        </motion.div>
      </div>
    </section>
  );
}
