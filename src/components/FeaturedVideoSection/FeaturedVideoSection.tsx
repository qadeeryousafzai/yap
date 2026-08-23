import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mic,
  Play,
  Sparkles,
  Video,
} from "lucide-react";

type FeaturedVideoSectionProps = {
  videoId?: string;
  videoTitle?: string;
  posterImage?: string;
};

const YAP_CHANNEL_URL = "https://www.youtube.com/@youthassociationofpakistan";

export default function FeaturedVideoSection({
  videoId,
  videoTitle =
    "Nasir Gondal's Inspiring Talk | Indigenous Entrepreneurship Conference 2024",
  posterImage = "/images/video/yap-featured-video.jpg",
}: FeaturedVideoSectionProps) {
  const safeVideoId =
    videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null;

  const theme = {
    "--ngo-navy": "#071a2e",
    "--ngo-green": "#086843",
    "--ngo-gold": "#f4b942",
  } as CSSProperties;

  return (
    <section
      style={theme}
      aria-labelledby="featured-video-heading"
      className="relative overflow-hidden bg-[var(--ngo-navy)] py-16 font-sans text-white sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="yap-video-grid absolute inset-0 opacity-35" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--ngo-green)]/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[var(--ngo-gold)]/[0.07] blur-3xl" />
        <div className="absolute right-[8%] top-8 h-28 w-28 rounded-full border-[20px] border-white/[0.025]" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8 xl:gap-20">
        {/* Content */}
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--ngo-gold)]" />
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-emerald-300 sm:text-xs">
              Featured Video
            </p>
          </div>

          <h2
            id="featured-video-heading"
            className="mt-5 text-3xl font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Inside YAP
            <span className="block text-[var(--ngo-gold)]">Programs</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Watch conversations, field stories and practical learning sessions led
            by people creating meaningful opportunities for young Pakistanis.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
              <Clock3 className="h-4 w-4 text-[var(--ngo-gold)]" />
              <span className="mt-2 block text-sm font-black text-white">13:28</span>
              <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-wider text-white/35">
                Duration
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
              <Mic className="h-4 w-4 text-emerald-300" />
              <span className="mt-2 block text-sm font-black text-white">Talk</span>
              <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-wider text-white/35">
                Format
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-sky-300" />
              <span className="mt-2 block text-sm font-black text-white">2024</span>
              <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-wider text-white/35">
                Conference
              </span>
            </div>
          </div>

          <Link
            href={YAP_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 inline-flex h-12 items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-5 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:border-[var(--ngo-gold)] hover:bg-[var(--ngo-gold)] hover:text-[var(--ngo-navy)]"
          >
            View All Videos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Video */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[var(--ngo-green)]/20 via-transparent to-[var(--ngo-gold)]/15 blur-xl" />

          <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[#020b14] p-2 shadow-[0_35px_90px_rgba(0,0,0,0.35)] sm:p-3">
            <div className="flex items-center justify-between gap-3 px-2 pb-2 pt-0.5 sm:px-3 sm:pb-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--ngo-green)] text-[10px] font-black text-white">
                  YAP
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-black text-white sm:text-xs">
                    Youth Association of Pakistan
                  </span>
                  <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-wider text-white/30">
                    Featured Story
                  </span>
                </span>
              </div>
              <Video className="h-4 w-4 shrink-0 text-white/30" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[20px] bg-slate-950">
              {safeVideoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${safeVideoId}?rel=0&modestbranding=1`}
                  title={videoTitle}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <>
                  <Image
                    src={posterImage}
                    alt={`${videoTitle} video poster`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />
                  <Link
                    href={YAP_CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Watch ${videoTitle} on the YAP YouTube channel`}
                    className="group/play absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/15 text-white shadow-2xl backdrop-blur-md transition duration-300 group-hover/play:scale-110 group-hover/play:border-[var(--ngo-gold)] group-hover/play:bg-[var(--ngo-gold)] group-hover/play:text-[var(--ngo-navy)] sm:h-20 sm:w-20">
                      <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" />
                    </span>
                  </Link>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <p className="max-w-xl text-sm font-black leading-5 text-white sm:text-lg sm:leading-6">
                      {videoTitle}
                    </p>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                      Watch on the official YAP channel
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-white/10 bg-[var(--ngo-green)] px-4 py-3 shadow-xl sm:block">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-emerald-100">
              Real people
            </p>
            <p className="mt-1 text-xs font-black text-white">Real community impact</p>
          </div>
        </div>
      </div>

      <style>{`
        .yap-video-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to right, black, transparent 85%);
          -webkit-mask-image: linear-gradient(to right, black, transparent 85%);
        }
      `}</style>
    </section>
  );
}