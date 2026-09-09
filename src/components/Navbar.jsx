import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/teams", label: "Teams" },
  { to: "/customers", label: "Customers" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 bg-void/95 backdrop-blur-xl border-b border-violet-500/15 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-void/50" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-3.5 lg:py-4">
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

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active ? "text-paper bg-violet-500/15" : "text-paper/65 hover:text-paper"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 rounded-full bg-grad-violet px-5 py-2.5 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300"
          >
            Get Demo
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
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
            className="lg:hidden overflow-hidden border-t border-violet-500/15 bg-void/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-5 gap-4 max-w-7xl mx-auto">
              {LINKS.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-base font-semibold text-paper/80 hover:text-paper">
                  {l.label}
                </Link>
              ))}
              <Link to="/book-demo" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-grad-violet px-5 py-3 text-sm font-bold text-white">
                Get Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
