"use client";

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBgImage from "@/assets/images/About/about-banner.jpg"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pause,
  Play,
  Users,
} from "lucide-react";

type Slide = {
  id: number;
  image: string;
  imageAlt: string;
  imagePosition: string;
  eyebrow: string;
  title: string;
  description: string;
  alignment: "center" | "center";
  overlay: string;
};

const AUTO_PLAY_MS = 6500;

const slides: Slide[] = [
  {
    id: 1,
    image: HeroBgImage,
    imageAlt: "Youth Association of Pakistan community leadership gathering",
    imagePosition: "center 38%",
    eyebrow: "Youth Association of Pakistan",
    title: "Empowering communities with skill, purpose, and leadership.",
    description:
      "From local training to national initiatives, YAP supports youth to create lasting social change.",
    alignment: "center",
    overlay:
      "linear-gradient(90deg, rgba(2, 25, 20, 0.93) 0%, rgba(3, 28, 24, 0.82) 50%, rgba(4, 25, 27, 0.56) 100%)",
  },
  {
    id: 2,
    image: "/assets/images/About/about-banner.jpg",
    imageAlt: "Young Pakistani changemakers celebrating community achievement",
    imagePosition: "center 44%",
    eyebrow: "Youth Association of Pakistan",
    title: "Turning youth potential into measurable community impact.",
    description:
      "We build opportunities through education, livelihood programs, and social action led by young changemakers.",
    alignment: "center",
    overlay:
      "linear-gradient(180deg, rgba(4, 31, 35, 0.7) 0%, rgba(3, 29, 31, 0.76) 52%, rgba(3, 24, 25, 0.84) 100%)",
  },
];

function SlideActions({
  centered,
  interactive,
}: {
  centered: boolean;
  interactive: boolean;
}) {
  return (
    <div
      className={`ngo-hero-reveal mt-7 flex flex-col gap-3 sm:flex-row ${
        centered ? "sm:justify-center" : "sm:justify-center"
      }`}
      style={{ "--reveal-delay": "380ms" } as CSSProperties}
    >
      <Link
        href="/donate"
        tabIndex={interactive ? undefined : -1}
        className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-(--ngo-green) shadow-[0_14px_36px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-(--ngo-gold) hover:text-(--ngo-navy) hover:shadow-xl sm:h-14 sm:px-7 sm:text-base"
      >
        <Heart className="h-4 w-4 fill-current" />
        Support a Campaign
        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>

      <Link
        href="/get-involved/volunteer"
        tabIndex={interactive ? undefined : -1}
        className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/4 px-6 text-sm font-black text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-(--ngo-navy) sm:h-14 sm:px-7 sm:text-base"
      >
        <Users className="h-4 w-4" />
        Become a Volunteer
        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>
    </div>
  );
}

export default function AdvancedNgoHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
    "--slide-duration": `${AUTO_PLAY_MS}ms`,
  } as CSSProperties;

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const autoplayRunning = isPlaying && !isHovered && isPageVisible && !reduceMotion;

  useEffect(() => {
    if (!autoplayRunning) return;

    const timer = window.setTimeout(nextSlide, AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoplayRunning, nextSlide]);

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => {
      setReduceMotion(media.matches);
      if (media.matches) setIsPlaying(false);
    };

    handleMotionPreference();
    media.addEventListener("change", handleMotionPreference);
    return () => media.removeEventListener("change", handleMotionPreference);
  }, []);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select")) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousSlide();
    }

    if (event.key === " ") {
      event.preventDefault();
      setIsPlaying((playing) => !playing);
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchStartX.current - endX;
    touchStartX.current = null;

    if (Math.abs(distance) < 55) return;
    if (distance > 0) nextSlide();
    else previousSlide();
  };

  return (
    <section
      style={theme}
      role="region"
      aria-roledescription="carousel"
      aria-label="Youth Association of Pakistan highlights"
      aria-live="off"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/hero relative h-[calc(100svh-118px)] min-h-147.5 max-h-190 w-full overflow-hidden bg-(--ngo-navy) outline-none lg:h-[calc(100svh-186px)] lg:min-h-155 lg:max-h-205"
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const active = index === activeIndex;
        const centered = slide.alignment === "center";
        const Heading = index === 0 ? "h1" : "h2";

        return (
          <article
            key={slide.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={!active}
            className={`ngo-hero-slide absolute inset-0 transition-opacity duration-1100 ease-out ${
              active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              sizes="100vw"
              draggable={false}
              
              style={{ objectPosition: slide.imagePosition }}
              className={`ngo-hero-image object-cover transition-transform duration-9000 ease-out ${
                active ? "scale-105" : "scale-110"
              }`}
            />

            <div className="absolute inset-0" style={{ background: slide.overlay }} />
            <div className="ngo-hero-vignette absolute inset-0" />
            <div className="ngo-hero-grain pointer-events-none absolute inset-0 opacity-[0.055]" />

            {/* Content */}
            <div className="relative mx-auto flex h-full max-w-360 items-center px-4 pb-20 pt-14 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28 lg:pt-16">
              <div
                className={`w-full ${
                  centered
                    ? "mx-auto max-w-235 text-center"
                    : "max-w-205 text-left"
                }`}
              >
                <div
                  className={`ngo-hero-reveal flex items-center gap-3 ${
                    centered ? "justify-center" : "justify-start"
                  }`}
                  style={{ "--reveal-delay": "80ms" } as CSSProperties}
                >
                  <span className="hidden h-px w-8 bg-[var(--ngo-gold)] sm:block" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 sm:text-xs sm:tracking-[0.34em] lg:text-[13px]">
                    {slide.eyebrow}
                  </span>
                  <span className="hidden h-px w-8 bg-[var(--ngo-gold)] sm:block" />
                </div>

                <Heading
                  className={`ngo-hero-reveal mt-5 text-[clamp(2.75rem,8.2vw,5rem)] font-black leading-[0.96] tracking-[-0.055em] text-white drop-shadow-[0_5px_24px_rgba(0,0,0,0.28)] ${
                    centered ? "mx-auto max-w-[930px]" : "max-w-[800px]"
                  }`}
                  style={{ "--reveal-delay": "170ms" } as CSSProperties}
                >
                  {slide.title}
                </Heading>

                <p
                  className={`ngo-hero-reveal mt-6 text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:text-xl ${
                    centered ? "mx-auto max-w-[820px]" : "max-w-[760px]"
                  }`}
                  style={{ "--reveal-delay": "290ms" } as CSSProperties}
                >
                  {slide.description}
                </p>

                <SlideActions centered={centered} interactive={active} />
              </div>
            </div>
          </article>
        );
      })}

      {/* Decorative side label */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 xl:flex xl:-rotate-90 xl:items-center xl:gap-3 xl:origin-left">
        <span className="h-px w-12 bg-white/25" />
        <span className="text-[9px] font-black uppercase tracking-[0.32em] text-white/35">
          Join · Lead · Transform
        </span>
      </div>

      {/* Previous and next controls */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Show previous slide"
        className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/15 text-white opacity-0 backdrop-blur-md transition duration-300 hover:border-white hover:bg-white hover:text-(--ngo-navy) focus:opacity-100 group-hover/hero:opacity-100 md:grid lg:left-7"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Show next slide"
        className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/15 text-white opacity-0 backdrop-blur-md transition duration-300 hover:border-white hover:bg-white hover:text-(--ngo-navy) focus:opacity-100 group-hover/hero:opacity-100 md:grid lg:right-7"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Bottom navigation */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-360 items-end justify-between gap-4 px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:max-w-105">
            <span className="shrink-0 text-[10px] font-black tracking-[0.2em] text-white/80">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <div className="flex min-w-0 flex-1 items-center gap-2" role="tablist" aria-label="Choose a slide">
              {slides.map((slide, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show slide ${index + 1}`}
                    onClick={() => goToSlide(index)}
                    className="group/dot relative h-7 min-w-0 flex-1 overflow-hidden rounded-full outline-none"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-0.75 -translate-y-1/2 rounded-full bg-white/25 transition group-hover/dot:bg-white/40" />
                    {active && (
                      <span
                        key={`${activeIndex}-${autoplayRunning}`}
                        className={`ngo-hero-progress absolute left-0 top-1/2 h-0.75 -translate-y-1/2 rounded-full bg-(--ngo-gold) ${
                          autoplayRunning ? "" : "ngo-hero-progress-paused"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <span className="shrink-0 text-[10px] font-black tracking-[0.2em] text-white/40">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            disabled={reduceMotion}
            aria-label={
              reduceMotion
                ? "Automatic slides are disabled by your reduced motion preference"
                : isPlaying
                  ? "Pause automatic slides"
                  : "Play automatic slides"
            }
            aria-pressed={!isPlaying}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-(--ngo-navy) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:bg-black/10 disabled:hover:text-white"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
        </div>
      </div>

      {/* Mobile swipe hint */}
      <div className="pointer-events-none absolute bottom-16 right-4 z-20 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/35 sm:hidden">
        Swipe
        <ArrowRight className="h-3 w-3" />
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {slides.length}: {slides[activeIndex].title}
      </span>

    </section>
  );
}