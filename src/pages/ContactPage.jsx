import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, Link2, Camera, MessageCircle, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

const DETAILS = [
  {
    icon: MapPin,
    label: "Office address",
    value: "4th Floor, Prestige Tech Park, Bengaluru, Karnataka 560103, India",
  },
  { icon: Mail, label: "Email", value: "hello@lax360.example", href: "mailto:hello@lax360.example" },
  { icon: Phone, label: "Phone number", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Clock, label: "Business hours", value: "Mon–Fri, 9:00 AM – 6:30 PM IST" },
];

const SOCIALS = [
  { icon: Link2, label: "LinkedIn" },
  { icon: Camera, label: "Instagram" },
  { icon: MessageCircle, label: "Twitter / X" },
];

export default function ContactPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="📞 Contact"
          title="We'd love to hear from you."
          description="Questions about a product, a partnership, or just want to say hello — reach us directly, or drop by our office."
        />

        <section className="relative bg-void pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-start">
            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-violet-500/15 glass p-8 lg:p-10"
            >
              <div className="space-y-6">
                {DETAILS.map((d) => {
                  const Icon = d.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-violet-300 mb-1">
                          {d.label}
                        </p>
                        <p className="text-sm sm:text-base text-paper/80 leading-relaxed">{d.value}</p>
                      </div>
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={d.label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-8 pt-8 border-t border-violet-500/10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-violet-300 mb-4">
                  Social media
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href="#"
                        aria-label={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/20 text-paper/60 hover:text-violet-300 hover:border-violet-400 transition-colors"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>

              <Link
                to="/book-demo"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-grad-violet px-6 py-3 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all duration-300"
              >
                Prefer to book a demo instead?
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-violet-500/15 overflow-hidden h-[420px] lg:h-full min-h-[420px] relative"
            >
              <iframe
                title="LAX360 Ventures office location"
                src="https://www.google.com/maps?q=Prestige+Tech+Park,+Bengaluru,+India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
