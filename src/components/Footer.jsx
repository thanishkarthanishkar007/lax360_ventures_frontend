import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Link2, Camera, MessageCircle } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Restaurants – 3D Web", to: "/products" },
  { label: "Jewellery – Animated Web", to: "/products" },
  { label: "Gym – Cursor Interactive", to: "/products" },
  { label: "Textiles – Scrolling Web", to: "/products" },
];

const COLUMNS = [
  {
    title: "Products",
    links: PRODUCT_LINKS,
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Teams", to: "/teams" },
      { label: "Industries", to: "/industries" },
      { label: "Customers", to: "/customers" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Book Demo", to: "/book-demo" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-violet-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 pb-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <div className="leading-none">
                <span className="font-display text-lg font-extrabold text-paper block">
                  LAX<span className="text-gradient">360</span>
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-violet-300/70 block -mt-0.5">
                  VENTURES
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-paper/45 max-w-xs">
              A SaaS product suite for teams who want to automate operations,
              understand customers, and grow revenue from one platform.
            </p>
            <div className="mt-6 flex gap-3">
              {[Link2, Camera, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/20 text-paper/55 hover:text-violet-300 hover:border-violet-400 transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-mono uppercase tracking-wider text-violet-300 mb-4">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className={`text-sm transition-colors ${
                          l.label.includes("More")
                            ? "font-semibold text-violet-400 hover:text-violet-300"
                            : "text-paper/55 hover:text-paper"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-violet-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-paper/35">© {new Date().getFullYear()} LAX360 Ventures. All rights reserved.</p>
          <p className="text-xs text-paper/35">Transform your business with smart digital solutions.</p>
        </div>
      </div>
    </footer>
  );
}
