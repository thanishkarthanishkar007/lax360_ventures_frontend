import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-void">
        <div className="absolute inset-0 bg-violet-glow" />
        <div className="absolute inset-0 grid-fade opacity-40" />
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-violet-300 uppercase mb-5"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-paper"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base lg:text-lg text-paper/60 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
