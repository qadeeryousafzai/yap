import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";

type MarqueeTone = "green" | "navy" | "gold";

type NgoImpactMarqueeProps = {
  items?: readonly string[];
  label?: string;
  tone?: MarqueeTone;
  speedSeconds?: number;
};

const defaultItems = [
  "Youth Association of Pakistan",
  "Empowering Young Leaders",
  "Community Projects",
  "Skills Development",
  "Volunteer Action",
  "Youth Association of Pakistan",
];

const toneStyles = {
  green: {
    bar: "border-emerald-400/20 bg-[var(--ngo-green)] text-white",
    badge: "bg-[var(--ngo-gold)] text-[var(--ngo-navy)]",
    separator: "text-[var(--ngo-gold)]",
  },
  navy: {
    bar: "border-white/10 bg-[var(--ngo-navy)] text-white",
    badge: "bg-[var(--ngo-green)] text-white",
    separator: "text-[var(--ngo-gold)]",
  },
  gold: {
    bar: "border-amber-300 bg-[var(--ngo-gold)] text-[var(--ngo-navy)]",
    badge: "bg-[var(--ngo-navy)] text-white",
    separator: "text-[var(--ngo-green)]",
  },
} as const;

export default function NgoImpactMarquee({
  items = defaultItems,
  label = "Our Movement",
  tone = "green",
  speedSeconds = 34,
}: NgoImpactMarqueeProps) {
  const safeSpeed = Math.min(80, Math.max(12, speedSeconds));
  const styles = toneStyles[tone];
  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
    "--ngo-marquee-speed": `${safeSpeed}s`,
  } as CSSProperties;

  const group = (
    <div className="flex min-w-max shrink-0 items-center">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center whitespace-nowrap px-5 text-[10px] font-black uppercase tracking-[0.18em] sm:px-7 sm:text-[11px] lg:px-8"
        >
          <span className={`mr-5 text-sm sm:mr-7 ${styles.separator}`}>✦</span>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <section
      style={theme}
      aria-label={`${label} highlights`}
      className={`border-y font-sans ${styles.bar}`}
    >
      <div className="mx-auto flex h-[52px] max-w-[1440px] items-center overflow-hidden px-4 sm:h-14 sm:px-6 lg:px-8">
        <div
          className={`relative z-10 flex h-8 shrink-0 items-center gap-2 rounded-xl px-3 text-[9px] font-black uppercase tracking-[0.14em] shadow-lg sm:px-4 sm:text-[10px] ${styles.badge}`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {label}
        </div>

        <div className="yap-standalone-marquee min-w-0 flex-1 overflow-hidden">
          <div className="yap-standalone-marquee-track flex w-max">
            {group}
            <div aria-hidden="true">{group}</div>
          </div>
        </div>
      </div>

      <style>{`
        .yap-standalone-marquee-track {
          animation: yap-standalone-marquee var(--ngo-marquee-speed) linear infinite;
          will-change: transform;
        }

        .yap-standalone-marquee:hover .yap-standalone-marquee-track {
          animation-play-state: paused;
        }

        @keyframes yap-standalone-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .yap-standalone-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}