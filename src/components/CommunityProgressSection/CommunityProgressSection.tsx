import type { CSSProperties } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Wallet,
} from "lucide-react";

type ActivityPoint = {
  label: string;
  value: number;
};

type CommunityProgressSectionProps = {
  completedProjects?: number;
  totalProjects?: number;
  fundingRaised?: number;
  fundingGoal?: number;
  activity?: readonly ActivityPoint[];
};

const defaultActivity: readonly ActivityPoint[] = [
  { label: "Projects", value: 82 },
  { label: "Events", value: 64 },
  { label: "Stories", value: 58 },
  { label: "News", value: 72 },
];

function clampPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function percentage(part: number, total: number) {
  if (!Number.isFinite(part) || !Number.isFinite(total) || total <= 0) return 0;
  return clampPercentage(Math.round((part / total) * 100));
}

function formatPkr(value: number) {
  if (value >= 1_000_000_000) {
    return `PKR ${(value / 1_000_000_000).toFixed(1).replace(".0", "")}B`;
  }

  if (value >= 1_000_000) {
    return `PKR ${(value / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (value >= 1_000) {
    return `PKR ${(value / 1_000).toFixed(1).replace(".0", "")}K`;
  }

  return `PKR ${Math.max(0, value).toLocaleString("en-PK")}`;
}

function ProgressBar({
  value,
  colorClass,
  label,
}: {
  value: number;
  colorClass: string;
  label: string;
}) {
  const safeValue = clampPercentage(value);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className="relative h-2.5 overflow-hidden rounded-full bg-slate-100"
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ${colorClass}`}
        style={{ width: `${safeValue}%` }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>
    </div>
  );
}

export default function CommunityProgressSection({
  completedProjects = 14,
  totalProjects = 19,
  fundingRaised = 34_800_000,
  fundingGoal = 48_000_000,
  activity = defaultActivity,
}: CommunityProgressSectionProps) {
  const projectPercentage = percentage(completedProjects, totalProjects);
  const fundingPercentage = percentage(fundingRaised, fundingGoal);
  const normalizedActivity = activity.length ? activity : defaultActivity;
  const averageActivity = Math.round(
    normalizedActivity.reduce((sum, item) => sum + clampPercentage(item.value), 0) /
      normalizedActivity.length,
  );

  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  return (
    <section
      style={theme}
      aria-labelledby="community-progress-heading"
      className="relative overflow-hidden bg-white py-16 font-sans sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-emerald-100/35 blur-3xl" />
        <div className="absolute -right-16 top-10 h-52 w-52 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--ngo-gold)]" />
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--ngo-green)] sm:text-xs">
                Impact Graphs
              </p>
            </div>
            <h2
              id="community-progress-heading"
              className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-[var(--ngo-navy)] sm:text-4xl lg:text-[44px]"
            >
              Community Progress Snapshot
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              A clear view of project delivery, campaign resources and ongoing program activity.
            </p>
          </div>

          <Link
            href="/about/reports"
            className="group inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black uppercase tracking-[0.08em] text-[var(--ngo-navy)] transition hover:border-[var(--ngo-green)] hover:bg-[var(--ngo-green)] hover:text-white"
          >
            Full Impact Report
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Project completion */}
          <article className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#f8fafb] p-5 shadow-[0_10px_35px_rgba(7,26,46,0.04)] transition duration-500 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_24px_60px_rgba(7,26,46,0.1)] sm:p-6">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl transition group-hover:bg-emerald-200/70" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-[var(--ngo-green)] transition group-hover:bg-[var(--ngo-green)] group-hover:text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Project Completion
                </p>
              </div>

              <span className="text-4xl font-black leading-none tracking-[-0.06em] text-[var(--ngo-navy)] sm:text-5xl">
                {projectPercentage}
                <span className="ml-0.5 text-lg text-[var(--ngo-green)]">%</span>
              </span>
            </div>

            <div className="mt-8">
              <ProgressBar
                value={projectPercentage}
                colorClass="bg-[var(--ngo-green)]"
                label={`${projectPercentage}% of projects completed`}
              />
              <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-500">
                <span>{completedProjects} completed</span>
                <span>{Math.max(0, totalProjects - completedProjects)} in progress</span>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-3">
              <TrendingUp className="h-4 w-4 shrink-0 text-[var(--ngo-green)]" />
              <p className="text-[11px] leading-5 text-slate-500">
                <strong className="font-black text-[var(--ngo-navy)]">{completedProjects} of {totalProjects}</strong>{" "}
                tracked projects have reached completion.
              </p>
            </div>
          </article>

          {/* Campaign funding */}
          <article className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#f8fafb] p-5 shadow-[0_10px_35px_rgba(7,26,46,0.04)] transition duration-500 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_24px_60px_rgba(7,26,46,0.1)] sm:p-6">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-100/70 blur-2xl transition group-hover:bg-sky-200/70" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
                  <Wallet className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Campaign Funding
                </p>
              </div>

              <span className="text-4xl font-black leading-none tracking-[-0.06em] text-[var(--ngo-navy)] sm:text-5xl">
                {fundingPercentage}
                <span className="ml-0.5 text-lg text-sky-600">%</span>
              </span>
            </div>

            <div className="mt-8">
              <ProgressBar
                value={fundingPercentage}
                colorClass="bg-sky-500"
                label={`${fundingPercentage}% of campaign funding goal raised`}
              />
              <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-500">
                <span>{formatPkr(fundingRaised)} raised</span>
                <span>{formatPkr(fundingGoal)} goal</span>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-white bg-white/80 p-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    Remaining
                  </p>
                  <p className="mt-1 text-sm font-black text-[var(--ngo-navy)]">
                    {formatPkr(Math.max(0, fundingGoal - fundingRaised))}
                  </p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-sky-600">
                  <TrendingUp className="h-4 w-4" />
                </span>
              </div>
            </div>
          </article>

          {/* Program activity */}
          <article className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#f8fafb] p-5 shadow-[0_10px_35px_rgba(7,26,46,0.04)] transition duration-500 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(7,26,46,0.1)] sm:p-6">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-100/70 blur-2xl transition group-hover:bg-amber-200/75" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-[var(--ngo-gold)] group-hover:text-[var(--ngo-navy)]">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Program Activity
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-amber-700">
                <Activity className="h-3 w-3" />
                Active
              </span>
            </div>

            <div
              role="img"
              aria-label={`Program activity index averaging ${averageActivity}% across ${normalizedActivity.length} categories`}
              className="mt-6 flex h-[132px] items-end gap-2 rounded-2xl border border-white bg-white/80 px-3 pb-3 pt-5"
            >
              {normalizedActivity.map((item, index) => {
                const safeValue = clampPercentage(item.value);
                const colors = [
                  "bg-[var(--ngo-green)]",
                  "bg-emerald-400",
                  "bg-[var(--ngo-gold)]",
                  "bg-sky-500",
                ];

                return (
                  <div key={`${item.label}-${index}`} className="group/bar flex h-full min-w-0 flex-1 flex-col justify-end">
                    <span className="mb-1 text-center text-[8px] font-black text-slate-400 opacity-0 transition group-hover/bar:opacity-100">
                      {safeValue}%
                    </span>
                    <div
                      className={`min-h-2 w-full rounded-t-lg transition-[height,filter] duration-500 group-hover/bar:brightness-110 ${colors[index % colors.length]}`}
                      style={{ height: `${safeValue}%` }}
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="mt-3 grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${normalizedActivity.length}, minmax(0, 1fr))`,
              }}
            >
              {normalizedActivity.map((item, index) => (
                <span
                  key={`${item.label}-label-${index}`}
                  className="truncate text-center text-[8px] font-bold uppercase tracking-[0.04em] text-slate-400"
                  title={item.label}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}