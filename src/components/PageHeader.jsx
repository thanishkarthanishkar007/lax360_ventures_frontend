import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description, bgImage }) {
  return (
    <section className="relative pt-44 pb-16 sm:pt-48 sm:pb-20 lg:pt-52 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bgImage ? (
          <>
            <img
              src={bgImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-60 dark:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 bg-white/40 dark:bg-void/60 backdrop-blur-[1px]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-void">
            <div className="absolute inset-0 bg-violet-glow" />
            <div className="absolute inset-0 grid-fade opacity-40" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void-fade to-transparent pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-violet-700 dark:text-violet-300 uppercase mb-5 font-semibold"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-slate-900 dark:text-paper drop-shadow-sm"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base lg:text-lg text-slate-700 dark:text-paper/70 leading-relaxed font-medium"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
