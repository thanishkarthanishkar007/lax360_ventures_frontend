import { HeartPulse, GraduationCap, Quote } from "lucide-react";

const CLIENTS = [
  {
    org: "Apollo Clinic",
    type: "Healthcare",
    icon: HeartPulse,
    quote: "PulseCRM cut our patient follow-up no-shows by half within the first quarter.",
    person: "Head of Operations",
  },
  {
    org: "XYZ Hospital",
    type: "Healthcare",
    icon: HeartPulse,
    quote: "LedgerIQ automated our insurance billing reconciliation — what took days now takes hours.",
    person: "Finance Director",
  },
  {
    org: "ABC College",
    type: "Education",
    icon: GraduationCap,
    quote: "FlowOps automated our admissions workflow end-to-end, from application to enrollment.",
    person: "Admissions Lead",
  },
  {
    org: "DEF School",
    type: "Education",
    icon: GraduationCap,
    quote: "SignalDesk helped us track parent engagement across every communication channel.",
    person: "Communications Manager",
  },
  {
    org: "GHI Clinic",
    type: "Healthcare",
    icon: HeartPulse,
    quote: "Onboarding took less than a week, and our front-desk team picked it up immediately.",
    person: "Practice Manager",
  },
];

export default function Testimonials() {
  const track = [...CLIENTS, ...CLIENTS];
  return (
    <section id="testimonials" className="relative bg-paper py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <p className="font-mono text-xs tracking-[0.3em] text-violet-600 uppercase mb-4">
          Our customers
        </p>
        <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-void leading-[1.05]">
          Organizations that run on LAX360
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-paper to-transparent z-10" />
        <div className="flex gap-6 w-max animate-marquee">
          {track.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="w-[340px] shrink-0 rounded-3xl border border-void/10 bg-white p-7 shadow-card">
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-grad-violet text-white shadow-glow-sm">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-void leading-tight">{c.org}</p>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-violet-600">{c.type}</p>
                  </div>
                </div>
                <Quote size={18} className="text-violet-300 mb-2" fill="currentColor" strokeWidth={0} />
                <p className="text-sm text-void/70 leading-relaxed">&ldquo;{c.quote}&rdquo;</p>
                <p className="mt-5 text-xs text-void/45">— {c.person}, {c.org}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
