import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Plug, Headset } from "lucide-react";

const REASONS = [
  {
    icon: Gauge,
    title: "Built for speed",
    desc: "Sub-200ms response times across every product, even at enterprise scale.",
  },
  {
    icon: Plug,
    title: "Connects everywhere",
    desc: "200+ native integrations plus an open API for anything custom.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    desc: "SOC 2-aligned infrastructure, encryption at rest and in transit, granular roles.",
  },
  {
    icon: Headset,
    title: "Real human support",
    desc: "A dedicated success manager from onboarding through renewal — not a ticket queue.",
  },
];

export default function WhyLax360() {
  return (
    <section id="why" className="relative bg-paper text-void py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-violet-600 uppercase mb-4">
            Why LAX360
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold leading-[1.05]">
            The infrastructure teams trust to run on.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-void/10 bg-white p-7 shadow-card hover:-translate-y-1.5 hover:border-violet-300 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-void/60 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
