import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Layers, Hospital, Stethoscope, ArrowUpRight, CheckCircle2, Box } from "lucide-react";

const DEFAULT_PRODUCTS = [
  {
    icon: Users,
    name: "CRM",
    tag: "Customer Relationship",
    desc: "A CRM built for fast-moving sales teams — pipeline, outreach, and forecasting in one view.",
    points: ["Deal pipeline automation", "Built-in email sequencing", "Forecast accuracy scoring"],
  },
  {
    icon: Layers,
    name: "ERP",
    tag: "Enterprise Resource Planning",
    desc: "Unify finance, inventory, procurement, and HR operations on one connected backbone.",
    points: ["Multi-department workflows", "Real-time financial reporting", "Role-based access control"],
  },
  {
    icon: Hospital,
    name: "Hospital Management",
    tag: "Healthcare",
    desc: "End-to-end hospital operations — patient records, admissions, billing, and staff scheduling.",
    points: ["Electronic health records", "Bed & ward management", "Insurance & billing workflows"],
  },
  {
    icon: Stethoscope,
    name: "Clinic Management",
    tag: "Healthcare",
    desc: "Appointment booking, patient history, and billing built for clinics and small practices.",
    points: ["Online appointment booking", "Digital patient records", "Automated billing & reminders"],
  },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

function ProductCard({ p, i }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  
  const Icon = p.icon || (p.name.includes("Hospital") ? Hospital : p.name.includes("Clinic") ? Stethoscope : p.name.includes("ERP") ? Layers : Users);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="perspective"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        className="preserve-3d group relative rounded-3xl border border-violet-500/15 glass p-8 h-full flex flex-col hover:border-violet-400/50 transition-colors duration-300"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
            <Icon size={22} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-full">
            {p.tag || "Product"}
          </span>
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-paper">{p.name}</h3>
        <p className="mt-3 text-sm text-paper/55 leading-relaxed">{p.desc || p.description}</p>
        <ul className="mt-5 space-y-2 flex-1">
          {(p.points || []).map((pt) => (
            <li key={pt} className="flex items-center gap-2 text-xs text-paper/50">
              <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
              {pt}
            </li>
          ))}
        </ul>
        <Link to="/products" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 group-hover:text-violet-200">
          Explore {p.name}
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Products() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="products" className="relative bg-void py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-fade opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-violet-300 uppercase mb-4">
              Product suite
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-paper leading-[1.05]">
              One platform,
              <br /> Multiple ways to grow.
            </h2>
          </div>
          <p className="max-w-sm text-paper/50 text-sm">
            Use one product standalone or combine all four — every LAX360
            Ventures app shares the same data layer and login.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <ProductCard p={p} i={i} key={p.id || p.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
