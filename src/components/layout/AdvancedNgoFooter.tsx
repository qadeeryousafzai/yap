"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  Heart,
  Mail,
  MapPin,
  MoveUp,
  Phone,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

const quickLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Leadership", href: "/about/leadership" },
  { label: "Projects", href: "/projects" },
  { label: "News & Stories", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

const programLinks: FooterLink[] = [
  { label: "Youth Empowerment", href: "/our-work/youth-empowerment" },
  { label: "Education & Skills", href: "/our-work/education" },
  { label: "Climate Action", href: "/our-work/climate-action" },
  { label: "Health & Wellbeing", href: "/our-work/health" },
  { label: "Community Service", href: "/our-work/community-service" },
  { label: "Humanitarian Support", href: "/our-work/humanitarian-support" },
];

const impactItems = [
  "50,000+ young people reached",
  "35+ active districts",
  "120+ community projects",
  "5,000+ registered volunteers",
  "Youth-led change across Pakistan",
];

function LogoMark() {
  return (
    <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[var(--ngo-green)] text-white shadow-[0_12px_30px_rgba(8,104,67,0.3)]">
      <span className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-[var(--ngo-gold)]/90" />
      <span className="absolute -bottom-4 -left-3 h-10 w-10 rounded-full border-[7px] border-white/15" />
      <span className="relative text-xl font-black tracking-[-0.08em]">YAP</span>
    </span>
  );
}

function SocialLinks() {
  const links = [
    { label: "Facebook", mark: "f", href: "https://facebook.com" },
    { label: "Instagram", mark: "ig", href: "https://instagram.com" },
    { label: "LinkedIn", mark: "in", href: "https://linkedin.com" },
    { label: "YouTube", mark: "▶", href: "https://youtube.com" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {links.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Follow us on ${social.label}`}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-black text-white/75 transition duration-300 hover:-translate-y-1 hover:border-[var(--ngo-gold)] hover:bg-[var(--ngo-gold)] hover:text-[var(--ngo-navy)]"
        >
          {social.mark}
        </a>
      ))}
    </div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">
        {children}
      </h3>
      <span className="mt-3 flex items-center gap-1">
        <span className="h-1 w-8 rounded-full bg-[var(--ngo-gold)]" />
        <span className="h-1 w-1 rounded-full bg-[var(--ngo-green)]" />
        <span className="h-1 w-1 rounded-full bg-[var(--ngo-green)]" />
      </span>
    </div>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/55 transition hover:translate-x-1 hover:text-white"
          >
            <ChevronRight className="h-3.5 w-3.5 text-[var(--ngo-green)] transition group-hover:text-[var(--ngo-gold)]" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ImpactMarquee() {
  const group = (
    <div className="flex min-w-max shrink-0 items-center">
      {impactItems.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-white/85 sm:px-7 sm:text-xs"
        >
          <span className="mr-5 text-[var(--ngo-gold)] sm:mr-7">✦</span>
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="ngo-footer-marquee min-w-0 flex-1 overflow-hidden">
      <div className="ngo-footer-marquee-track flex w-max">
        {group}
        <div aria-hidden="true">{group}</div>
      </div>
    </div>
  );
}

export default function AdvancedNgoFooter() {
  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={theme} className="relative overflow-hidden bg-[var(--ngo-navy)] font-sans text-white">
      {/* IMPACT MARQUEE */}
      <div className="border-y border-white/10 bg-[var(--ngo-green)]">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <span className="z-10 flex h-7 shrink-0 items-center gap-2 rounded-lg bg-[var(--ngo-gold)] px-3 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--ngo-navy)] sm:text-[10px]">
            <Globe2 className="h-3.5 w-3.5" />
            Our Impact
          </span>
          <ImpactMarquee />
        </div>
      </div>

      {/* DONATION + NEWSLETTER CTA */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[48px] border-white/[0.025]" />
          <div className="absolute -bottom-24 left-[38%] h-64 w-64 rounded-full bg-[var(--ngo-green)]/10 blur-3xl" />
          <div className="ngo-footer-grid absolute inset-0 opacity-30" />
        </div>

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ngo-gold)]/25 bg-[var(--ngo-gold)]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--ngo-gold)]">
              <Heart className="h-3.5 w-3.5 fill-current" />
              Together, we create change
            </span>
            <h2 className="mt-4 max-w-xl text-2xl font-black leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-[38px]">
              Pakistan&apos;s future is young.
              <span className="block text-[var(--ngo-gold)]">Let&apos;s shape it together.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
              Your support helps young people gain skills, lead community projects,
              and build a stronger, more inclusive Pakistan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/donate"
                className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-[var(--ngo-gold)] px-5 text-sm font-black text-[var(--ngo-navy)] shadow-[0_12px_28px_rgba(244,185,66,0.18)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                <Heart className="h-4 w-4 fill-current" />
                Make a Donation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/get-involved/volunteer"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              >
                <Users className="h-4 w-4 text-[var(--ngo-gold)]" />
                Become a Volunteer
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <div className="rounded-[19px] bg-white p-5 text-slate-900 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-[var(--ngo-green)]">
                  <Send className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black tracking-[-0.02em] text-[var(--ngo-navy)]">
                    Stories worth sharing
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Get project updates, opportunities and inspiring youth stories in your inbox.
                  </p>
                </div>
              </div>

              <form action="/api/newsletter" method="POST" className="mt-5">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="group flex h-12 min-w-0 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-[var(--ngo-green)] focus-within:bg-white focus-within:ring-4 focus-within:ring-[var(--ngo-green)]/10">
                    <Mail className="ml-4 h-[18px] w-[18px] shrink-0 text-slate-400 group-focus-within:text-[var(--ngo-green)]" />
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="Enter your email address"
                      className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--ngo-green)] px-5 text-sm font-black text-white transition hover:bg-[var(--ngo-navy)]"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--ngo-green)]" />
                  No spam. Unsubscribe whenever you want.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER CONTENT */}
      <div className="relative">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[var(--ngo-green)]/[0.06] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8">
            <Link href="/" aria-label="Youth Association of Pakistan home" className="inline-flex items-center gap-3">
              <LogoMark />
              <span>
                <span className="block text-lg font-black tracking-[-0.025em] text-white">
                  Youth Association
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--ngo-gold)]">
                  <span className="h-px w-4 bg-[var(--ngo-green)]" />
                  of Pakistan
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-white/55">
              Empowering young Pakistanis through leadership, education, community
              service and meaningful opportunities to create lasting national impact.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-white/65">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--ngo-gold)]" />
                Transparent
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-white/65">
                <Globe2 className="h-3.5 w-3.5 text-[var(--ngo-gold)]" />
                Nationwide
              </span>
            </div>

            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList links={quickLinks} />
          </div>

          {/* Programs */}
          <div className="lg:col-span-3">
            <FooterHeading>Our Programs</FooterHeading>
            <FooterLinkList links={programLinks} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact Us</FooterHeading>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=Islamabad,Pakistan"
                target="_blank"
                rel="noreferrer"
                className="group flex gap-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--ngo-gold)] transition group-hover:border-[var(--ngo-green)] group-hover:bg-[var(--ngo-green)] group-hover:text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-white/35">
                    Head Office
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-white/65 transition group-hover:text-white">
                    Islamabad, Pakistan
                  </span>
                </span>
              </a>

              <a href="tel:+92511234567" className="group flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--ngo-gold)] transition group-hover:border-[var(--ngo-green)] group-hover:bg-[var(--ngo-green)] group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-white/35">
                    Call Us
                  </span>
                  <span className="mt-1 block text-[13px] text-white/65 transition group-hover:text-white">
                    +92 51 123 4567
                  </span>
                </span>
              </a>

              <a href="mailto:info@yap.org.pk" className="group flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--ngo-gold)] transition group-hover:border-[var(--ngo-green)] group-hover:bg-[var(--ngo-green)] group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-white/35">
                    Email Us
                  </span>
                  <span className="mt-1 block text-[13px] text-white/65 transition group-hover:text-white">
                    info@yap.org.pk
                  </span>
                </span>
              </a>

              <div className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--ngo-gold)]">
                  <Clock3 className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-white/35">
                    Working Hours
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-white/65">
                    Mon to Fri, 9:00 AM to 5:00 PM
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSPARENCY BAR */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-5 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <Link
            href="/about/reports"
            className="group flex max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 transition hover:border-[var(--ngo-green)] hover:bg-white/[0.06]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--ngo-green)]/20 text-[var(--ngo-gold)]">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-black text-white">Accountability & Transparency</span>
              <span className="mt-0.5 block truncate text-[10px] text-white/40">
                View our annual reports, policies and organizational documents
              </span>
            </span>
            <ExternalLink className="h-4 w-4 text-white/30 transition group-hover:text-[var(--ngo-gold)]" />
          </Link>

          <div className="flex items-center gap-2 md:justify-end">
            <Link
              href="/get-involved/membership"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-xs font-black text-white/70 transition hover:border-[var(--ngo-gold)] hover:text-white"
            >
              <Users className="h-3.5 w-3.5 text-[var(--ngo-gold)]" />
              Join the Movement
            </Link>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/[0.07] bg-[#04111f]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-5 text-[11px] text-white/40 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Youth Association of Pakistan. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Use
            </Link>
            <Link href="/safeguarding" className="transition hover:text-white">
              Safeguarding
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 font-black text-white/65 transition hover:border-[var(--ngo-gold)] hover:bg-[var(--ngo-gold)] hover:text-[var(--ngo-navy)]"
            >
              Back to top
              <MoveUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ngo-footer-marquee-track {
          animation: ngo-footer-marquee 34s linear infinite;
        }

        .ngo-footer-marquee:hover .ngo-footer-marquee-track {
          animation-play-state: paused;
        }

        .ngo-footer-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent);
        }

        @keyframes ngo-footer-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ngo-footer-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </footer>
  );
}