import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import CeoImage from "@/assets/images/About/about-banner.jpg"
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  Laptop,
  TrendingUp,
  Users,
} from "lucide-react";

const milestones = [
  {
    year: "2015",
    title: "Organization",
    description:
      "YAP began with a focused mission to close education and skill gaps for young people.",
    icon: BookOpen,
  },
  {
    year: "2017",
    title: "Expansion",
    description:
      "Operations expanded across regions to support more communities through local partnerships.",
    icon: Globe2,
  },
  {
    year: "2020",
    title: "Digital Shift",
    description:
      "Hybrid and online learning paths helped our programs maintain momentum in uncertain times.",
    icon: Laptop,
  },
  {
    year: "2024",
    title: "Growing Impact",
    description:
      "Our reach grew through programs focused on education, employability and youth leadership.",
    icon: TrendingUp,
  },
];

export default function AboutYapSection() {
  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  return (
    <section
      style={theme}
      aria-labelledby="about-yap-heading"
      className="relative overflow-hidden bg-[#effbf6] py-16 font-sans sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-1/3 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
        <div className="absolute -right-24 top-10 h-64 w-64 rounded-full border-[38px] border-white/45" />
        <div className="absolute bottom-0 right-0 h-48 w-48 bg-gradient-to-tl from-amber-100/40 to-transparent" />
        <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 select-none text-[180px] font-black tracking-[-0.1em] text-white/40 xl:block">
          YAP
        </span>
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 xl:gap-20">
        {/* Image panel */}
        <div className="relative mx-auto w-full max-w-[620px] lg:mx-0">
          <div className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-[28px] border-2 border-[var(--ngo-gold)]/35 sm:block" />
          <div className="absolute -bottom-5 -right-5 hidden h-36 w-36 rounded-full bg-[var(--ngo-green)]/10 sm:block" />

          <div className="group relative min-h-[520px] overflow-hidden rounded-[30px] border-[6px] border-white bg-[var(--ngo-navy)] shadow-[0_30px_80px_rgba(7,26,46,0.16)] sm:min-h-[620px]">
            <Image
              src={CeoImage}
              alt="Youth Association of Pakistan representative addressing a youth conference"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center transition duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ngo-navy)] via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-2xl backdrop-blur-md sm:p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.26em] text-emerald-200">
                  Youth Association of Pakistan
                </p>
                <p className="mt-2 text-lg font-black leading-tight tracking-[-0.025em] sm:text-xl">
                  Empowering Communities Through Youth
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 top-8 rounded-2xl border border-white bg-[var(--ngo-gold)] p-3 text-[var(--ngo-navy)] shadow-xl sm:-right-5 sm:top-10 sm:p-4">
            <span className="block text-2xl font-black leading-none sm:text-3xl">2015</span>
            <span className="mt-1 block text-[8px] font-black uppercase tracking-[0.17em]">
              Our journey began
            </span>
          </div>
        </div>

        {/* Story content */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--ngo-gold)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[var(--ngo-green)] sm:text-xs">
              About YAP
            </p>
          </div>

          <h2
            id="about-yap-heading"
            className="mt-5 max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.045em] text-[var(--ngo-navy)] sm:text-4xl lg:text-5xl xl:text-[56px]"
          >
            Building futures with practical action,
            <span className="text-[var(--ngo-green)]"> not promises.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            We design programs that move young people from potential to progress
            through education access, skill building, livelihood support and local
            leadership opportunities.
          </p>

          {/* Statistics */}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="group flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_rgba(7,26,46,0.05)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-[var(--ngo-green)] transition group-hover:bg-[var(--ngo-green)] group-hover:text-white">
                <Users className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-2xl font-black leading-none tracking-[-0.04em] text-[var(--ngo-green)] sm:text-3xl">
                  50K+
                </span>
                <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                  Direct Beneficiaries
                </span>
              </span>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_10px_30px_rgba(7,26,46,0.05)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600 transition group-hover:bg-[var(--ngo-gold)] group-hover:text-[var(--ngo-navy)]">
                <Globe2 className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-2xl font-black leading-none tracking-[-0.04em] text-[var(--ngo-green)] sm:text-3xl">
                  5
                </span>
                <span className="mt-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                  Regions Reached
                </span>
              </span>
            </div>
          </div>

          <Link
            href="/about"
            className="group mt-6 inline-flex h-12 items-center gap-2 rounded-2xl bg-[var(--ngo-navy)] px-5 text-xs font-black uppercase tracking-[0.1em] text-white shadow-[0_12px_28px_rgba(7,26,46,0.14)] transition hover:-translate-y-0.5 hover:bg-[var(--ngo-green)] hover:shadow-xl"
          >
            Explore Full Story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          {/* Timeline */}
          <div className="mt-9">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Our Journey
              </p>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <article
                    key={milestone.year}
                    className="group relative overflow-hidden rounded-2xl border border-white bg-white/75 p-4 shadow-[0_8px_24px_rgba(7,26,46,0.035)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black tracking-[0.12em] text-[var(--ngo-green)]">
                        {milestone.year}
                      </span>
                      <Icon className="h-4 w-4 text-slate-300 transition group-hover:text-[var(--ngo-gold)]" />
                    </div>
                    <h3 className="mt-3 text-sm font-black text-[var(--ngo-navy)]">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                      {milestone.description}
                    </p>
                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--ngo-green)] transition-all duration-500 group-hover:w-full" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}