import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link2, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const DEFAULT_TEAM = [
  { initials: "AK", name: "Arjun Kapoor", role: "Founder & CEO" },
  { initials: "SR", name: "Sana Rahman", role: "Head of Product" },
  { initials: "VN", name: "Vikram Nair", role: "Engineering Lead" },
  { initials: "MP", name: "Meera Pillai", role: "Head of Design" },
  { initials: "DK", name: "Devesh Kumar", role: "VP Sales" },
  { initials: "RT", name: "Riya Thomas", role: "Customer Success Lead" },
  { initials: "AJ", name: "Aditya Joshi", role: "Head of Marketing" },
  { initials: "NS", name: "Neha Singh", role: "Finance Lead" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:8080" : "https://lax360-ventures-backend.onrender.com");

export default function TeamsPage() {
  const [team, setTeam] = useState(DEFAULT_TEAM);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teams`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our team"
          title="The people building LAX360 Ventures."
          description="A small, senior team spanning product, engineering, design, and customer success — spread across India and working close to our customers."
        />

        <section className="relative bg-void pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((m, i) => {
                const initials = m.initials || (m.name ? m.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2) : "TM");
                return (
                  <motion.div
                    key={m.id || m.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group rounded-3xl border border-violet-500/15 glass p-6 text-center hover:border-violet-400/50 transition-colors duration-300"
                  >
                    <div className="relative mx-auto mb-5 h-20 w-20">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-400/40 group-hover:animate-spin-slow" />
                      <div className="absolute inset-2 rounded-full bg-grad-violet flex items-center justify-center font-display text-lg text-white font-bold">
                        {initials}
                      </div>
                    </div>
                    <h3 className="font-display text-base font-bold text-paper">{m.name}</h3>
                    <p className="mt-1 text-xs font-mono uppercase tracking-wider text-violet-300">{m.role}</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/20 text-paper/50 hover:text-violet-300 hover:border-violet-400 transition-colors" aria-label="Profile link">
                        <Link2 size={14} />
                      </a>
                      <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/20 text-paper/50 hover:text-violet-300 hover:border-violet-400 transition-colors" aria-label="Email">
                        <Mail size={14} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative bg-paper text-void py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
              We're always looking for good people.
            </h2>
            <p className="mt-4 text-void/60 max-w-xl mx-auto">
              If you'd rather build the product than just use it, reach out —
              we'd love to hear from you.
            </p>
            <a
              href="mailto:careers@lax360.example"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-grad-violet px-7 py-3.5 font-bold text-white text-sm shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              careers@lax360.example
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
