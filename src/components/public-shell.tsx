"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const workLinks = [
  ["Projects", "/projects"],
  ["Community gallery", "/gallery"],
  ["Support our work", "/donate"],
];
const primaryNavLinks = [
  ["Home", "/"],
  ["About us", "/about"],
];
const secondaryNavLinks = [
  ["Blogs", "/stories"],
  ["Events", "/events"],
  ["Contact us", "/contact"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-0 text-white transition-all duration-300 lg:px-6 ${scrolled ? "pt-0 lg:pt-3" : "pt-0 lg:pt-4"}`}
      >
        <div
          className={`container-yap flex h-[72px] items-center justify-between border border-white/10 px-4 backdrop-blur-xl transition-all duration-300 sm:px-5 md:h-[82px] lg:h-[76px] lg:rounded-2xl lg:px-6 ${scrolled ? "bg-[#07583d]/95 shadow-xl shadow-black/15 ring-1 ring-emerald-300/10" : "bg-[#073d2c]/72 shadow-lg shadow-black/10"}`}
        >
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 md:gap-3"
            aria-label="Youth Association of Pakistan home"
          >
            <Image
              src="/assets/logo.png"
              width={2048}
              height={1512}
              alt=""
              className="h-10 w-auto object-contain md:h-11"
            />
            <span className="text-[10px] font-extrabold leading-tight tracking-[.08em] sm:text-[12px] md:text-[13px]">
              YOUTH ASSOCIATION
              <br />
              <span className="font-medium text-white/70">OF PAKISTAN</span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-1 xl:flex"
          >
            {primaryNavLinks.map(([label, href]) => (
              <Link
                key={href}
                className="rounded-full px-2.5 py-2.5 text-xs font-semibold text-white/85 transition hover:bg-white/10 hover:text-lime-300 2xl:px-3 2xl:text-[13px]"
                href={href}
              >
                {label}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setWorkOpen(true)}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <button
                type="button"
                aria-expanded={workOpen}
                aria-haspopup="true"
                onClick={() => setWorkOpen(!workOpen)}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-2.5 text-xs font-semibold text-white/85 transition hover:bg-white/10 hover:text-lime-300 2xl:px-3 2xl:text-[13px]"
              >
                Our work{" "}
                <ChevronDown
                  size={15}
                  className={`transition-transform ${workOpen ? "rotate-180" : ""}`}
                />
              </button>
              {workOpen && (
                <div className="absolute left-0 top-full w-56 rounded-2xl border border-white/10 bg-[#073d2c] p-2 shadow-2xl">
                  {workLinks.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setWorkOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-lime-300"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {secondaryNavLinks.map(([label, href]) => (
              <Link
                key={href}
                className="rounded-full px-2.5 py-2.5 text-xs font-semibold text-white/85 transition hover:bg-white/10 hover:text-lime-300 2xl:px-3 2xl:text-[13px]"
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="hidden items-center gap-2 rounded-full bg-[#c6ef55] px-3 py-3 text-xs font-extrabold text-[#113b2b] transition hover:-translate-y-0.5 hover:bg-[#d4f77c] xl:flex 2xl:px-4 2xl:text-[13px]"
            >
              Join YAP <ArrowUpRight size={16} />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10 xl:hidden"
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-[#041d15]/65 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-modal="true"
        role="dialog"
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,420px)] flex-col bg-[#073d2c] px-6 pb-8 pt-5 text-white shadow-2xl transition-transform duration-300 ease-out sm:px-8 xl:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
            aria-label="YAP home"
          >
            <Image
              src="/assets/logo.png"
              width={2048}
              height={1512}
              alt=""
              className="h-10 w-auto"
            />
            <span className="text-xs font-extrabold leading-tight tracking-wide">
              YOUTH ASSOCIATION
              <br />
              <span className="font-medium text-white/70">OF PAKISTAN</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
          >
            <X size={21} />
          </button>
        </div>
        <nav className="mt-8 grid gap-1" aria-label="Mobile main navigation">
          <p className="eyebrow mb-2 px-3 text-lime-300">Explore</p>
          {primaryNavLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3.5 text-lg font-semibold transition hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
          <div className="my-3 border-t border-white/15" />
          <p className="eyebrow mb-2 px-3 text-lime-300">Our work</p>
          {workLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3.5 text-lg font-semibold transition hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
          <div className="my-3 border-t border-white/15" />
          {secondaryNavLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3.5 text-lg font-semibold transition hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-white/5 p-5">
          <p className="text-sm leading-6 text-white/70">
            Bring your ideas and help shape a brighter future for young people
            across Pakistan.
          </p>
          <Link
            href="/membership"
            onClick={closeMenu}
            className="mt-5 flex items-center justify-between rounded-full bg-[#c6ef55] px-5 py-4 text-sm font-extrabold text-[#113b2b]"
          >
            Become a member <ArrowUpRight size={17} />
          </Link>
        </div>
      </aside>
    </>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#082f24] text-white">
      <div
        className="border-y border-white/10 bg-[#c6ef55] py-3 text-[#113b2b]"
        aria-label="Youth-led, community-powered change"
      >
        <div className="footer-marquee flex w-max items-center gap-5 whitespace-nowrap text-xs font-extrabold uppercase tracking-[.18em] sm:text-sm">
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="flex items-center gap-5">
              <span>Youth-led change</span>
              <span aria-hidden="true">✳</span>
              <span>Stronger communities</span>
              <span aria-hidden="true">✳</span>
              <span>A brighter future</span>
              <span aria-hidden="true">✳</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container-yap grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.2fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="YAP home"
          >
            <Image
              src="/assets/logo.png"
              width={2048}
              height={1512}
              alt=""
              className="h-[50px] w-auto"
            />
            <b className="text-sm leading-5">
              Youth Association
              <br />
              of Pakistan
            </b>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            We bring young people together to build skills, serve communities,
            and shape a brighter future.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-lime-300">
            <a
              className="transition hover:text-white"
              href="https://www.instagram.com/"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              className="transition hover:text-white"
              href="https://www.facebook.com/"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              className="transition hover:text-white"
              href="https://www.youtube.com/"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>
        <div>
          <p className="eyebrow text-lime-300">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-white/75">
            <Link className="transition hover:text-lime-300" href="/about">
              Our story
            </Link>
            <Link className="transition hover:text-lime-300" href="/projects">
              Projects
            </Link>
            <Link className="transition hover:text-lime-300" href="/events">
              Events
            </Link>
            <Link className="transition hover:text-lime-300" href="/stories">
              Stories
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-lime-300">Get involved</p>
          <div className="mt-5 grid gap-3 text-sm text-white/75">
            <Link className="transition hover:text-lime-300" href="/membership">
              Membership
            </Link>
            <Link className="transition hover:text-lime-300" href="/volunteer">
              Volunteer
            </Link>
            <Link className="transition hover:text-lime-300" href="/careers">
              Careers
            </Link>
            <Link className="transition hover:text-lime-300" href="/donate">
              Support our work
            </Link>
            <Link className="transition hover:text-lime-300" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-lime-300">Stay connected</p>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Stories of change and opportunities to help—occasionally in your
            inbox.
          </p>
          <form
            action="/api/newsletter"
            method="post"
            className="mt-4 flex min-w-0 rounded-full border border-white/20 bg-white/5 p-1 focus-within:border-lime-300"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/45"
            />
            <button
              aria-label="Subscribe to the newsletter"
              className="flex shrink-0 items-center justify-center rounded-full bg-lime-300 px-4 py-2 text-sm font-extrabold text-[#113b2b] transition hover:bg-white"
            >
              <ArrowUpRight size={17} />
            </button>
          </form>
        </div>
      </div>
      <div className="container-yap flex flex-col gap-4 border-t border-white/10 py-5 text-center text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>
          © {new Date().getFullYear()} Youth Association of Pakistan. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-5">
          <Link className="transition hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="transition hover:text-white" href="/terms">
            Terms
          </Link>
          <Link className="transition hover:text-white" href="/contact">
            Contact
          </Link>
        </div>
        <Link
          href="/membership"
          className="inline-flex items-center justify-center gap-2 font-bold text-lime-300 transition hover:text-white"
        >
          Make a difference <ArrowDownRight size={15} />
        </Link>
      </div>
    </footer>
  );
}
