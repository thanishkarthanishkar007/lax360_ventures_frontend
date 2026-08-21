import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, X } from "lucide-react";
import Logo from "../components/Logo";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // No auth backend is wired up yet — this is UI only for now.
  };

  return (
    <div className="min-h-screen bg-void relative flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-violet-glow opacity-60" />
      <div className="absolute inset-0 grid-fade opacity-30" />

      <Link
        to="/"
        aria-label="Close"
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-paper/60 hover:text-paper hover:border-violet-400 transition-colors z-10"
      >
        <X size={18} />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl border border-violet-500/15 glass p-8 sm:p-10"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <Logo className="h-9 w-9" />
          <div className="leading-none text-left">
            <span className="font-display text-lg font-extrabold text-paper block">
              LAX<span className="text-gradient">360</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-violet-300/70 block -mt-0.5">
              VENTURES
            </span>
          </div>
        </Link>

        {/* Mode toggle */}
        <div className="relative grid grid-cols-2 rounded-full bg-void border border-violet-500/20 p-1 mb-8">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative z-10 py-2.5 text-sm font-bold rounded-full transition-colors duration-300 ${
                mode === m ? "text-void" : "text-paper/60 hover:text-paper"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
          <motion.div
            className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-paper"
            animate={{ x: mode === "login" ? 4 : "calc(100% + 4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === "login" ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 12 : -12 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/35" />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-void border border-violet-500/20 pl-11 pr-4 py-3.5 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/35" />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-void border border-violet-500/20 pl-11 pr-4 py-3.5 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-paper/45 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/35" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-void border border-violet-500/20 pl-11 pr-11 py-3.5 text-sm text-paper placeholder:text-paper/30 focus:border-violet-400 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/35 hover:text-paper/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <a href="#" className="text-xs text-violet-300 hover:text-violet-200">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-grad-violet px-6 py-3.5 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
            >
              {mode === "login" ? "Log In" : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </motion.form>
        </AnimatePresence>

        <p className="mt-7 text-center text-sm text-paper/50">
          {mode === "login" ? "New to LAX360 Ventures?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-violet-300 hover:text-violet-200"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
