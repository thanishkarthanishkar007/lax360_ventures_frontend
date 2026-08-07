import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import DemoForm from "../components/DemoForm";

export default function BookDemoPage() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const goHome = () => navigate("/");

  // A short pause after submission so the success state is visible,
  // then move on to the home page automatically.
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(goHome, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <div className="min-h-screen bg-void relative flex items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-violet-glow opacity-60" />
      <div className="absolute inset-0 grid-fade opacity-30" />

      <button
        onClick={goHome}
        aria-label="Skip to home"
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-paper/60 hover:text-paper hover:border-violet-400 transition-colors z-10"
      >
        <X size={18} />
      </button>

      <div className="relative flex flex-col items-center gap-5">
        <DemoForm onSubmitted={() => setDone(true)} />

        {done ? (
          <button
            onClick={goHome}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors"
          >
            Continue to Home <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={goHome}
            className="text-xs font-mono uppercase tracking-widest text-paper/35 hover:text-paper/60 transition-colors"
          >
            Skip for now →
          </button>
        )}
      </div>
    </div>
  );
}
