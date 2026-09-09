import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import previewRestaurant from "../assets/images/preview-restaurant.png";
import previewJewellery from "../assets/images/preview-jewellery.png";
import previewGym from "../assets/images/preview-gym.png";
import previewTextiles from "../assets/images/preview-textiles.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Restaurants – 3D Animated Web",
    tag: "3D Animated Web",
    slug: "food-hotel-demo-web.vercel.app",
    liveUrl: "https://food-hotel-demo-web.vercel.app/?utm_source=chatgpt.com",
    index: "#1",
    image: previewRestaurant,
  },
  {
    id: "2",
    name: "Jewellery – Animated Web",
    tag: "Animated Web",
    slug: "jewellery-web-demo-five.vercel.app",
    liveUrl: "https://jewellery-web-demo-five.vercel.app/?utm_source=chatgpt.com",
    index: "#2",
    image: previewJewellery,
  },
  {
    id: "3",
    name: "Gym – Cursor Interactive Web",
    tag: "Cursor Interactive Web",
    slug: "gym-web-nine-phi.vercel.app",
    liveUrl: "https://gym-web-nine-phi.vercel.app/?utm_source=chatgpt.com",
    index: "#3",
    image: previewGym,
  },
  {
    id: "4",
    name: "Textiles – Scrolling Web",
    tag: "Scrolling Web",
    slug: "textiles-web.vercel.app",
    liveUrl: "https://textiles-web.vercel.app/?utm_source=chatgpt.com",
    index: "#4",
    image: previewTextiles,
  },
];

const IMAGE_MAP = {
  "1": previewRestaurant,
  "2": previewJewellery,
  "3": previewGym,
  "4": previewTextiles,
  "Restaurants – 3D Animated Web": previewRestaurant,
  "Jewellery – Animated Web": previewJewellery,
  "Gym – Cursor Interactive Web": previewGym,
  "Textiles – Scrolling Web": previewTextiles,
};

function ProductBrowserCard({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="group rounded-2xl border border-violet-500/20 bg-void-soft/80 backdrop-blur-md overflow-hidden flex flex-col hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.18)] transition-all duration-300"
    >
      {/* Top Browser Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-violet-500/10">
        {/* Mac colored window controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm" />
        </div>

        {/* Center URL slug pill */}
        <div className="px-3 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-paper/60 truncate max-w-[200px]">
          {p.slug}
        </div>

        {/* Index badge */}
        <span className="text-xs font-mono font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
          {p.index}
        </span>
      </div>

      {/* Website Preview Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-soft/90 via-transparent to-transparent opacity-40 pointer-events-none" />
      </div>

      {/* Card Content & Action Buttons */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white/[0.01]">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-400 mb-1.5 block">
            {p.tag}
          </span>
          <h3 className="font-display text-xl font-bold text-paper leading-snug">
            {p.name}
          </h3>
        </div>

        <div className="flex items-center gap-3 pt-5 mt-auto">
          {/* GitHub Button - opens Demo Request Form */}
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-500/30 bg-white/5 hover:bg-violet-500/15 text-xs font-bold text-paper hover:text-white transition-all duration-200"
          >
            <GithubIcon className="text-paper/80" />
            GitHub
          </Link>

          {/* Live Demo Button - opens live URL */}
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-grad-violet text-white text-xs font-bold shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200"
          >
            Live Demo
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
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
          const valid = data.filter((p) => !["CRM", "ERP", "Hospital Management", "Clinic Management"].includes(p.name));
          if (valid.length > 0) {
            setProducts(valid.map((p, i) => ({
              ...p,
              image: p.imageUrl && (p.imageUrl.startsWith("http") || p.imageUrl.startsWith("data:"))
                ? p.imageUrl
                : IMAGE_MAP[p.id] || IMAGE_MAP[p.name] || (i === 0 ? previewRestaurant : i === 1 ? previewJewellery : i === 2 ? previewGym : previewTextiles),
              index: p.index || `#${i + 1}`,
              slug: p.slug || (p.liveUrl ? p.liveUrl.replace(/https?:\/\//, '').split('/')[0] : `product-${i + 1}.vercel.app`),
              liveUrl: p.liveUrl || (i === 0 ? "https://food-hotel-demo-web.vercel.app/" : i === 1 ? "https://jewellery-web-demo-five.vercel.app/" : i === 2 ? "https://gym-web-nine-phi.vercel.app/" : "https://textiles-web.vercel.app/"),
            })));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="products" className="relative bg-void py-24 lg:py-32 overflow-hidden scroll-mt-28 lg:scroll-mt-32">
      <div className="absolute inset-0 grid-fade opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-violet-300 uppercase mb-4">
              Featured Products
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-paper leading-[1.05]">
              Interactive Web Experiences,
              <br /> Built to Convert.
            </h2>
          </div>
          <p className="max-w-sm text-paper/50 text-sm">
            High-performance 3D animated web applications crafted for luxury dining, haute joaillerie, athletic clubs, and couture fashion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <ProductBrowserCard p={p} i={i} key={p.id || p.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
