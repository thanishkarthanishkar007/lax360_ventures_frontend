import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Send } from "lucide-react";

const PRODUCT_OPTIONS = ["CRM", "ERP", "Hospital Management", "Clinic Management", "Full platform bundle"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", product: PRODUCT_OPTIONS[0] });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-void py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-violet-glow opacity-60" />

      {/* CTA banner */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-paper leading-[1.05]"
        >
          Ready to break your
          <br />
          growth <span className="text-gradient">barriers?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-paper/60 max-w-xl mx-auto"
        >
          Start a free 14-day trial, or book a live walkthrough with our team
          to see LAX360 Ventures on your own data.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#demo-form"
            className="group inline-flex items-center gap-2 rounded-full bg-grad-violet px-7 py-3.5 font-bold text-white text-sm shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Demo
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Demo request form */}
      <div id="demo-form" className="max-w-xl mx-auto px-6 lg:px-10 relative scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-violet-500/15 glass p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-grad-violet text-white shadow-glow-sm">
                <Send size={22} />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-paper">Request received</h3>
              <p className="mt-2 text-sm text-paper/55 max-w-xs">
                Thanks, {form.name.split(" ")[0] || "there"}! Our team will
                reach out about {form.product} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-mono uppercase tracking-wider text-violet-300 hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <p className="font-mono text-xs tracking-[0.3em] text-violet-300 uppercase mb-2 text-center">
                Get started
              </p>
              <h3 className="font-display text-2xl font-extrabold text-paper text-center mb-6">
                Book your demo
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                    Full name
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-void border border-violet-500/20 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                    Work email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-void border border-violet-500/20 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                    Company
                  </label>
                  <input
                    required
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-void border border-violet-500/20 px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                    Interested in
                  </label>
                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-void border border-violet-500/20 px-4 py-3 text-sm text-paper focus:border-violet-400 focus:outline-none"
                  >
                    {PRODUCT_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-grad-violet px-6 py-3.5 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Request demo <Send size={15} />
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-paper/35 pt-1">
                  <Mail size={12} /> or email us at hello@lax360.example
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
