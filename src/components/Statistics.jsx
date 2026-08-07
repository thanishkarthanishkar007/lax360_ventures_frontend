import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const STATS = [
  { to: 120, suffix: "+", label: "Active companies" },
  { to: 4, suffix: "", label: "SaaS products" },
  { to: 99.9, suffix: "%", decimals: 1, label: "Platform uptime" },
  { to: 2.4, prefix: "$", suffix: "M+", decimals: 1, label: "Revenue processed" },
];

function Counter({ to, suffix = "", prefix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals]);

  return (
    <span ref={ref} className="font-display text-4xl lg:text-5xl font-extrabold text-paper">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="relative bg-void py-20 lg:py-24 border-y border-violet-500/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center lg:text-left"
            >
              <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
              <p className="mt-2 text-xs lg:text-sm text-paper/45 uppercase tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
