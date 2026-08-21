import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Shield } from "lucide-react";
import Logo from "./Logo";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/teams", label: "Teams" },
  { to: "/customers", label: "Customers" },
  { to: "/contact", label: "Contact Us" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 rounded-full bg-void/95 backdrop-blur-xl border border-violet-500/15 transition-all duration-300 ${
          scrolled ? "mx-4 lg:mx-auto py-2.5" : "py-3"
        }`}
      >
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <div className="leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-paper block">
              LAX<span className="text-gradient font-extrabold">360</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-violet-300/70 block -mt-0.5">
              VENTURES
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {LINKS.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                  active ? "text-paper bg-violet-500/15" : "text-paper/65 hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/25 text-paper hover:border-violet-400 hover:text-violet-300 transition-all duration-300"
            aria-label="Toggle Theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-violet-600" />}
          </button>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 px-5 py-2.5 text-sm font-bold text-paper hover:border-violet-400 hover:text-violet-200 transition-all duration-300"
          >
            Login / Signup
          </Link>
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 rounded-full bg-grad-violet px-5 py-2.5 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300"
          >
            Get Demo
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/25 text-paper"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-violet-600" />}
          </button>
          <button className="text-paper p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden mx-4 mt-2 rounded-3xl glass border border-violet-500/15"
          >
            <div className="flex flex-col px-6 py-5 gap-4">
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-base font-semibold text-paper/80 hover:text-paper">
                  {l.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full border border-violet-500/25 px-5 py-3 text-sm font-bold text-paper">
                Login / Signup
              </Link>
              <Link to="/book-demo" onClick={() => setOpen(false)} className="inline-flex justify-center rounded-full bg-grad-violet px-5 py-3 text-sm font-bold text-white">
                Get Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
