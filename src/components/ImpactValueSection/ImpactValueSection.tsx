import type { CSSProperties } from "react";
import { ShieldCheck, Target, Users } from "lucide-react";

const values = [
  {
    title: "Mission Focused",
    description:
      "Every initiative is designed around long-term youth empowerment outcomes.",
    icon: Target,
    accent: "green",
    number: "01",
  },
  {
    title: "Community Driven",
    description:
      "Programs are co-created with local communities and field volunteers.",
    icon: Users,
    accent: "blue",
    number: "02",
  },
  {
    title: "Transparent Impact",
    description:
      "We share progress openly and track impact with clear indicators.",
    icon: ShieldCheck,
    accent: "gold",
    number: "03",
  },
] as const;

const accentStyles = {
  green: {
    card: "border-emerald-100 hover:border-emerald-300",
    icon: "bg-emerald-50 text-[var(--ngo-green)] group-hover:bg-[var(--ngo-green)] group-hover:text-white",
    glow: "bg-emerald-200/45",
    line: "bg-[var(--ngo-green)]",
  },
  blue: {
    card: "border-sky-100 hover:border-sky-300",
    icon: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    glow: "bg-sky-200/45",
    line: "bg-sky-500",
  },
  gold: {
    card: "border-amber-100 hover:border-amber-300",
    icon: "bg-amber-50 text-amber-600 group-hover:bg-[var(--ngo-gold)] group-hover:text-[var(--ngo-navy)]",
    glow: "bg-amber-200/50",
    line: "bg-[var(--ngo-gold)]",
  },
} as const;

export default function ImpactValuesSection() {
  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  return (
    <section
      style={theme}
      aria-labelledby="impact-values-heading"
      className="relative overflow-hidden border-b border-slate-100 bg-[#f6f9f8] py-10 font-sans sm:py-12 lg:py-14"
    >
      <h2 id="impact-values-heading" className="sr-only">
        Our values and approach
      </h2>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-20 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-4 px-4 sm:px-6 md:grid-cols-3 lg:gap-5 lg:px-8">
        {values.map((value) => {
          const Icon = value.icon;
          const styles = accentStyles[value.accent];

          return (
            <article
              key={value.title}
              className={`group relative min-h-[185px] overflow-hidden rounded-[22px] border bg-white p-5 shadow-[0_8px_30px_rgba(7,26,46,0.035)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(7,26,46,0.1)] sm:p-6 ${styles.card}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition duration-500 group-hover:opacity-100 ${styles.glow}`}
              />

              <span className="absolute right-5 top-5 text-[10px] font-black tracking-[0.18em] text-slate-200 transition group-hover:text-slate-300">
                {value.number}
              </span>

              <div
                className={`grid h-11 w-11 place-items-center rounded-2xl transition duration-500 group-hover:-rotate-3 group-hover:scale-105 ${styles.icon}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </div>

              <h3 className="mt-5 text-base font-black tracking-[-0.02em] text-[var(--ngo-navy)] sm:text-lg">
                {value.title}
              </h3>
              <p className="mt-2 max-w-sm text-[13px] leading-5 text-slate-500 sm:text-sm sm:leading-6">
                {value.description}
              </p>

              <span
                className={`absolute bottom-0 left-0 h-1 w-0 rounded-r-full transition-all duration-500 group-hover:w-full ${styles.line}`}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}