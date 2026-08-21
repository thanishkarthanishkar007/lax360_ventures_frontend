import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, Target } from "lucide-react";

const STATEMENTS = [
  {
    icon: Eye,
    title: "Our vision",
    desc: "To become a globally trusted technology and innovation partner, empowering businesses with intelligent digital solutions, engineering excellence, and future-ready technologies that drive sustainable growth and digital transformation.",
  },
  {
    icon: Target,
    title: "Our mission",
    desc: "At LAX360 Ventures, our mission is to deliver innovative, scalable, and high-quality technology solutions that solve real-world business challenges. We specialize in intelligent mobile applications, enterprise software, web platforms, AI-powered solutions, digital marketing, engineering CAD services, and business automation. We also empower future professionals through industry-focused internships, practical training, and hands-on project experience, creating lasting value for our clients and communities.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative bg-paper text-void py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-violet-600 uppercase mb-4">
            About us
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold leading-[1.05]">
            We're LAX360 Ventures.
          </h2>
          <p className="mt-6 text-void/65 text-base lg:text-lg leading-relaxed">
            Founded in India, LAX360 Ventures builds SaaS products that
            remove the busywork between a growing company and its next
            stage. What started as a single automation tool is now a
            connected suite spanning operations, sales, finance, and
            marketing — used by teams who'd rather spend time on customers
            than spreadsheets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {STATEMENTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-void/10 bg-white p-8 lg:p-10 shadow-card hover:border-violet-300 transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-4 text-sm lg:text-base text-void/65 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 rounded-3xl bg-void p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-violet-glow opacity-70" />
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-paper">
                Multiple products, one platform.
              </h3>
              <p className="mt-2 text-sm text-paper/60 max-w-md">
                Every LAX360 Ventures product shares the same data layer
                and login — start with one, add more as you grow.
              </p>
            </div>
            <Link
              to="/products"
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-grad-violet px-6 py-3 text-sm font-bold text-white shadow-glow-sm hover:shadow-glow transition-all"
            >
              See our products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
