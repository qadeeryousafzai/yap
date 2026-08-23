"use client";

import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo.png"
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Globe2,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";

type NavChild = {
  label: string;
  href: string;
  description?: string;
  icon?: typeof Users;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Who We Are",
        href: "/about",
        description: "Our story, purpose and values",
        icon: Users,
      },
      {
        label: "Leadership",
        href: "/about/leadership",
        description: "Meet our executive team",
        icon: ShieldCheck,
      },
      {
        label: "Our Network",
        href: "/about/network",
        description: "Chapters across Pakistan",
        icon: Globe2,
      },
      {
        label: "Reports & Transparency",
        href: "/about/reports",
        description: "Annual reports and governance",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Our Work",
    href: "/our-work",
    children: [
      {
        label: "Youth Empowerment",
        href: "/our-work/youth-empowerment",
        description: "Leadership and civic participation",
        icon: Users,
      },
      {
        label: "Education & Skills",
        href: "/our-work/education",
        description: "Learning and employability programs",
        icon: BookOpen,
      },
      {
        label: "Climate Action",
        href: "/our-work/climate-action",
        description: "Youth-led environmental initiatives",
        icon: Leaf,
      },
      {
        label: "Health & Wellbeing",
        href: "/our-work/health",
        description: "Community health and awareness",
        icon: Activity,
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      {
        label: "Become a Member",
        href: "/get-involved/membership",
        description: "Join Pakistan's youth network",
        icon: Users,
      },
      {
        label: "Volunteer With Us",
        href: "/get-involved/volunteer",
        description: "Give your time and skills",
        icon: Heart,
      },
      {
        label: "Partner With Us",
        href: "/get-involved/partnerships",
        description: "Create measurable impact together",
        icon: Globe2,
      },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Latest News", href: "/news", icon: Bell },
      { label: "Events", href: "/events", icon: Globe2 },
      { label: "Photo Gallery", href: "/gallery", icon: Activity },
      { label: "Publications", href: "/publications", icon: BookOpen },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const announcements = [
  "Applications are open for the National Youth Leadership Program 2026",
  "Join our upcoming community service drive in Islamabad",
  "New volunteer opportunities are now available across Pakistan",
];

const impactItems = [
  "50,000+ young people reached",
  "35+ active districts",
  "120+ community projects",
  "Join. Lead. Transform.",
];

function LogoMark() {
  return (
   <><Image src={Logo} alt="Logo" width={80} /></>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  const links = [
    { label: "Facebook", text: "f", href: "https://facebook.com" },
    { label: "Instagram", text: "ig", href: "https://instagram.com" },
    { label: "LinkedIn", text: "in", href: "https://linkedin.com" },
    { label: "YouTube", text: "▶", href: "https://youtube.com" },
  ];

  return (
    <div className="flex items-center gap-2">
      {links.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          className={`grid place-items-center rounded-full border border-white/15 bg-white/5 font-bold text-white/80 transition hover:-translate-y-0.5 hover:border-(--ngo-gold) hover:bg-(--ngo-gold) hover:text-(--ngo-navy) ${
            compact ? "h-8 w-8 text-[10px]" : "h-9 w-9 text-xs"
          }`}
        >
          {social.text}
        </Link>
      ))}
    </div>
  );
}

function Marquee({ items, speed = "32s" }: { items: string[]; speed?: string }) {
  const group = (
    <div className="ngo-marquee-group flex min-w-max shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center whitespace-nowrap px-5">
          <span className="mr-5 h-1.5 w-1.5 rounded-full bg-(--ngo-gold)" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="ngo-marquee overflow-hidden" style={{ "--marquee-speed": speed } as CSSProperties}>
      <div className="ngo-marquee-track flex w-max">
        {group}
        <div aria-hidden="true">{group}</div>
      </div>
    </div>
  );
}

function SearchForm({ mobile = false }: { mobile?: boolean }) {
  return (
    <form
      action="/search"
      method="GET"
      role="search"
      className={`group flex items-center overflow-hidden border bg-slate-50 transition focus-within:border-(--ngo-green) focus-within:bg-white focus-within:ring-4 focus-within:ring-(--ngo-green)/10 ${
        mobile
          ? "h-12 w-full rounded-xl border-slate-200"
          : "h-12 w-full max-w-xl rounded-2xl border-slate-200"
      }`}
    >
      <Search className="ml-4 h-5 w-5 shrink-0 text-slate-400 transition group-focus-within:text-(--ngo-green)" />
      <input
        type="search"
        name="q"
        placeholder="Search programs, projects and news..."
        aria-label="Search the website"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="mr-1.5 rounded-xl bg-(--ngo-navy) px-4 py-2 text-xs font-bold text-white transition hover:bg-(--ngo-green)"
      >
        Search
      </button>
    </form>
  );
}

export default function AdvancedNgoHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  useEffect(() => {
    setMenuOpen(false);
    setOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = drawerRef.current?.querySelector<HTMLElement>(
      "button, a, input, [tabindex]:not([tabindex='-1'])",
    );
    window.setTimeout(() => focusable?.focus(), 50);

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !drawerRef.current) return;

    const elements = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ),
    );

    if (!elements.length) return;
    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        style={theme}
        className="sticky top-0 z-50 w-full font-sans text-slate-900 shadow-[0_10px_30px_rgba(2,12,27,0.08)]"
      >
        {/* LAYER 1: contact details + announcements + social links */}
        <div className="bg-(--ngo-navy) text-white">
          <div className="mx-auto flex h-10 max-w-360 items-center px-4 sm:px-6 lg:px-8">
            <div className="hidden shrink-0 items-center gap-5 text-[11px] font-medium xl:flex">
              <Link href="tel:+923123456789" className="flex items-center gap-1.5 text-white/70 transition hover:text-white">
                <Phone className="h-3.5 w-3.5 text-(--ngo-gold)" />
                +92-312-3456789
              </Link>
              <Link href="mailto:info@yap.org.pk" className="flex items-center gap-1.5 text-white/70 transition hover:text-white">
                <Mail className="h-3.5 w-3.5 text-(--ngo-gold)" />
                info@yap.org.pk
              </Link>
            </div>

            <div className="flex min-w-0 flex-1 items-center overflow-hidden xl:mx-8">
              <span className="z-10 flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-(--ngo-gold) px-2.5 text-[9px] font-black uppercase tracking-[0.14em] text-(--ngo-navy) sm:text-[10px]">
                <Bell className="h-3 w-3" />
                Updates
              </span>
              <div className="min-w-0 flex-1 text-[11px] font-medium text-white/75 sm:text-xs">
                <Marquee items={announcements} speed="38s" />
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-4 xl:flex">
              <SocialLinks compact />
              <button type="button" className="flex items-center gap-1.5 text-[11px] font-bold text-white/75 transition hover:text-white">
                <Globe2 className="h-3.5 w-3.5 text-(--ngo-gold)" />
                English
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* LAYER 2: brand identity + search + primary actions */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-19.5 max-w-360 items-center gap-5 px-4 sm:h-23 sm:px-6 lg:px-8">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3" aria-label="Youth Association of Pakistan home">
              <LogoMark />
              <span className="min-w-0">
                <span className="block truncate text-base font-black leading-tight tracking-tight text-(--ngo-navy) sm:text-lg">
                  Youth Association
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-(--ngo-green) sm:text-[10px]">
                  <span className="h-px w-4 bg-(--ngo-gold)" />
                  of Pakistan
                </span>
              </span>
            </Link>

            <div className="hidden flex-1 justify-center lg:flex">
              <SearchForm />
            </div>

            <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
              <Link
                href="/get-involved/volunteer"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-extrabold text-(--ngo-navy) transition hover:-translate-y-0.5 hover:border-(--ngo-green) hover:text-(--ngo-green) hover:shadow-lg"
              >
                <Users className="h-4 w-4" />
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-(--ngo-green) px-5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(8,104,67,0.22)] transition hover:-translate-y-0.5 hover:bg-(--ngo-navy) hover:shadow-xl"
              >
                <Heart className="h-4 w-4 fill-current" />
                Donate Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <Link
                href="/donate"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-(--ngo-green) px-3 text-xs font-extrabold text-white sm:px-4"
              >
                <Heart className="h-3.5 w-3.5 fill-current" />
                Donate
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-(--ngo-navy) transition hover:border-(--ngo-green) hover:bg-(--ngo-green) hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* LAYER 3: main navigation + impact marquee */}
        <div className="hidden h-13.5 bg-(--ngo-green) text-white lg:block">
          <div className="mx-auto flex h-full max-w-360 items-stretch px-8">
            <nav aria-label="Primary navigation" className="flex shrink-0 items-stretch">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <div key={item.label} className="group relative flex items-stretch">
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1 px-3 text-[12px] font-extrabold transition xl:px-4 xl:text-[13px] ${
                        active ? "bg-white/12 text-white" : "text-white/85 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />}
                      {active && <span className="absolute inset-x-3 bottom-0 h-0.75 rounded-t-full bg-(--ngo-gold)" />}
                    </Link>

                    {item.children && (
                      <div className="invisible absolute left-0 top-full w-142.5 translate-y-3 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-[0_24px_70px_rgba(2,12,27,0.2)]">
                          <div className="grid grid-cols-2 gap-1">
                            {item.children.map((child) => {
                              const Icon = child.icon ?? ArrowRight;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="group/child flex gap-3 rounded-xl p-3 transition hover:bg-emerald-50"
                                >
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-(--ngo-green) transition group-hover/child:bg-(--ngo-green) group-hover/child:text-white">
                                    <Icon className="h-4.5 w-4.5" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-1 text-sm font-extrabold text-(--ngo-navy)">
                                      {child.label}
                                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover/child:translate-x-0 group-hover/child:opacity-100" />
                                    </span>
                                    {child.description && (
                                      <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <Link
                            href={item.href}
                            className="mt-1 flex items-center justify-between rounded-xl bg-(--ngo-navy) px-4 py-3 text-xs font-bold text-white transition hover:bg-(--ngo-green)"
                          >
                            Explore all {item.label.toLowerCase()}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="ml-auto flex min-w-0 flex-1 items-center overflow-hidden border-l border-white/15 bg-black/10 pl-2">
              <span className="z-10 shrink-0 rounded-lg bg-(--ngo-gold) px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-(--ngo-navy)">
                Our Impact
              </span>
              <div className="min-w-0 flex-1 text-[11px] font-semibold text-white/80">
                <Marquee items={impactItems} speed="30s" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-70 bg-(--ngo-navy)/65 backdrop-blur-sm transition duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={theme}
      />

      {/* Mobile off-canvas navigation */}
      <div
        id="mobile-navigation"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        onKeyDown={trapFocus}
        style={theme}
        className={`fixed right-0 top-0 z-80 flex h-dvh w-[min(92vw,410px)] flex-col bg-white shadow-[-25px_0_70px_rgba(2,12,27,0.25)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="relative overflow-hidden bg-(--ngo-navy) p-5 text-white">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-22 border-white/5" />
          <div className="absolute -bottom-10 left-1/3 h-24 w-24 rounded-full bg-(--ngo-green)/40 blur-xl" />
          <div className="relative flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark />
              <span>
                <span className="block text-sm font-black">Youth Association</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-(--ngo-gold)">
                  of Pakistan
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 transition hover:rotate-90 hover:bg-white hover:text-(--ngo-navy)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-5">
            <SearchForm mobile />
          </div>
        </div>

        <nav className="ngo-scrollbar flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile primary navigation">
          <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Explore
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const expanded = openSection === item.label;

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex h-12 items-center justify-between rounded-xl px-3 text-sm font-extrabold transition ${
                      active
                        ? "bg-emerald-50 text-(--ngo-green)"
                        : "text-(--ngo-navy) hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ArrowRight className={`h-4 w-4 ${active ? "opacity-100" : "opacity-30"}`} />
                  </Link>
                );
              }

              return (
                <div key={item.label} className="overflow-hidden rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOpenSection(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    className={`flex h-12 w-full items-center justify-between px-3 text-left text-sm font-extrabold transition ${
                      active || expanded
                        ? "bg-emerald-50 text-(--ngo-green)"
                        : "text-(--ngo-navy) hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="ml-4 space-y-1 border-l-2 border-emerald-100 py-2 pl-3">
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-extrabold text-(--ngo-green) hover:bg-emerald-50"
                        >
                          View all {item.label.toLowerCase()}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-(--ngo-green)"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/get-involved/volunteer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-(--ngo-navy)"
            >
              <Users className="h-4 w-4 text-(--ngo-green)" />
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-(--ngo-green) text-xs font-extrabold text-white"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate Now
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="space-y-1 text-[10px] font-semibold text-slate-500">
              <Link href="mailto:info@yap.org.pk" className="flex items-center gap-1.5 hover:text-(--ngo-green)">
                <Mail className="h-3 w-3" /> info@yap.org.pk
              </Link>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Islamabad, Pakistan
              </span>
            </div>
            <div className="[&_a]:border-slate-200 [&_a]:bg-white [&_a]:text-(--ngo-navy)">
              <SocialLinks compact />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ngo-marquee-track {
          animation: ngo-marquee var(--marquee-speed, 32s) linear infinite;
        }

        .ngo-marquee:hover .ngo-marquee-track {
          animation-play-state: paused;
        }

        @keyframes ngo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .ngo-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .ngo-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .ngo-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 99px;
          background: #cbd5e1;
        }

        @media (prefers-reduced-motion: reduce) {
          .ngo-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </>
  );
}