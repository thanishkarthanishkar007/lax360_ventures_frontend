import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

const PRODUCT_OPTIONS = ["FlowOps", "PulseCRM", "LedgerIQ", "SignalDesk", "Full platform bundle"];
// Defaults to the deployed backend so the production build works with zero
// configuration. For local development, set VITE_API_BASE_URL=http://localhost:8080
// in a .env file (see .env.example) to talk to your local Spring Boot server instead.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://lax360-ventures-backend.onrender.com";

export default function DemoForm({ onSubmitted }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    product: PRODUCT_OPTIONS[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/demo-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          mobileNumber: form.mobile,
          company: form.company,
          product: form.product,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      onSubmitted?.(form);
    } catch (err) {
      setError(err.message || "Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl rounded-3xl border border-violet-500/15 glass p-10 sm:p-12"
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-grad-violet text-white shadow-glow-sm">
            <Send size={22} />
          </div>
          <h3 className="font-display text-2xl font-extrabold text-paper">Request received</h3>
          <p className="mt-2 text-sm text-paper/55 max-w-xs">
            Thanks, {form.name.split(" ")[0] || "there"}! Our team will reach
            out about {form.product} shortly.
          </p>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs tracking-[0.35em] text-violet-300 uppercase mb-3 text-center">
            Get started
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-paper text-center mb-9">
            Book your demo
          </h3>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2.5">
                Full name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl bg-void border border-violet-500/20 px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2.5">
                Work email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl bg-void border border-violet-500/20 px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2.5">
                Mobile number
              </label>
              <input
                required
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full rounded-2xl bg-void border border-violet-500/20 px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2.5">
                Company
              </label>
              <input
                required
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-2xl bg-void border border-violet-500/20 px-5 py-4 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2.5">
                Interested in
              </label>
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className="w-full rounded-2xl bg-void border border-violet-500/20 px-5 py-4 text-sm text-paper focus:border-violet-400 focus:outline-none"
              >
                {PRODUCT_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-grad-violet px-6 py-4 text-base font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  Sending <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Request demo <Send size={16} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
