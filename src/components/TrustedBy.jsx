import { useState, useEffect } from "react";

const DEFAULT_COMPANIES = [
  "Apollo Clinic", "XYZ Hospital", "ABC College", "DEF School", "GHI Clinic",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

export default function TrustedBy() {
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/customers`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const names = data.map((c) => c.org).filter(Boolean);
          if (names.length > 0) setCompanies(names);
        }
      })
      .catch(() => {});
  }, []);

  const track = [...companies, ...companies, ...companies];

  return (
    <section className="relative bg-void border-y border-violet-500/10 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-6">
        <p className="text-center font-mono text-xs tracking-[0.3em] text-paper/35 uppercase">
          Trusted by leading healthcare & education organizations
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void to-transparent z-10" />
        <div className="flex gap-16 w-max animate-marquee">
          {track.map((name, i) => (
            <span
              key={i}
              className="font-display text-xl sm:text-2xl font-bold text-paper/25 whitespace-nowrap tracking-tight hover:text-violet-300/60 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
