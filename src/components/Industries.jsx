import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse, GraduationCap, Wallet, Landmark, ShoppingBag, Factory, Truck,
  Building2, Hotel, HardHat, ShieldCheck, Scale, Rocket, ShoppingCart, ArrowRight,
} from "lucide-react";

const ICON_MAP = {
  HeartPulse, GraduationCap, Wallet, Landmark, ShoppingBag, Factory, Truck,
  Building2, Hotel, HardHat, ShieldCheck, Scale, Rocket, ShoppingCart
};

const DEFAULT_INDUSTRIES = [
  { icon: "HeartPulse", name: "Healthcare", desc: "Patient ops, provider scheduling, and care coordination at scale." },
  { icon: "GraduationCap", name: "Education", desc: "Admissions, LMS integrations, and student cohort tracking." },
  { icon: "Wallet", name: "Finance", desc: "Ledgers, reconciliation, and reporting your auditors will thank you for." },
  { icon: "Landmark", name: "Banking", desc: "Secure, compliant workflows for accounts, lending, and transactions." },
  { icon: "ShoppingBag", name: "Retail", desc: "Inventory, POS, and omnichannel customer journeys in one view." },
  { icon: "Factory", name: "Manufacturing", desc: "Production tracking, supply chain visibility, and quality control." },
  { icon: "Truck", name: "Logistics", desc: "Fleet visibility, route automation, and real-time delivery tracking." },
  { icon: "Building2", name: "Real Estate", desc: "Deal pipelines, listings, and tenant relationship management." },
  { icon: "Hotel", name: "Hospitality", desc: "Bookings, guest experience, and staff operations, unified." },
  { icon: "HardHat", name: "Construction", desc: "Project timelines, site resources, and contractor coordination." },
  { icon: "ShieldCheck", name: "Insurance", desc: "Claims processing, underwriting workflows, and policy management." },
  { icon: "Scale", name: "Government", desc: "Citizen services and public-sector workflows built for compliance." },
  { icon: "Rocket", name: "Startups", desc: "Move fast with tooling that scales from first hire to Series B." },
  { icon: "ShoppingCart", name: "E-commerce", desc: "Orders, fulfillment, and customer journeys, end to end." },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

function IndustryCard({ ind, i }) {
  const [open, setOpen] = useState(false);
  const Icon = ICON_MAP[ind.icon] || HeartPulse;
  const description = ind.desc || ind.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      className="group relative flex flex-col rounded-2xl border border-violet-500/15 glass px-5 py-6 cursor-pointer hover:border-violet-400/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 group-hover:bg-grad-violet group-hover:text-white transition-all duration-300">
          <Icon size={20} />
        </span>
        <ArrowRight
          size={16}
          className={`text-violet-300/70 transition-all duration-300 ${
            open ? "opacity-100 translate-x-0.5" : "opacity-0 -translate-x-1"
          }`}
        />
      </div>

      <h3 className="mt-4 font-display text-sm font-bold text-paper">{ind.name}</h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-2.5 text-xs text-paper/55 leading-relaxed">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Industries() {
  const [industries, setIndustries] = useState(DEFAULT_INDUSTRIES);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/industries`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setIndustries(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="industries" className="relative bg-void py-24 lg:py-32 overflow-hidden scroll-mt-28 lg:scroll-mt-32">
      <div className="absolute inset-0 bg-violet-glow opacity-50" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-[0.3em] text-violet-300 uppercase mb-4">
            Industries we serve
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-paper leading-[1.05]">
            Built to flex across sectors.
          </h2>
          <p className="mt-4 text-paper/50 text-sm">
            Hover or tap a card to see how we fit your industry.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <IndustryCard ind={ind} i={i} key={ind.id || ind.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
