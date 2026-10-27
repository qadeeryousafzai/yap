import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  BookOpenCheck,
  Sprout,
  UsersRound,
  MoveUpRight,
} from "lucide-react";
import { Header, Footer } from "@/components/public-shell";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const focus = [
  {
    icon: BookOpenCheck,
    number: "01",
    title: "Learning for life",
    text: "Opening doors through education, mentorship, and practical skills for the next generation.",
  },
  {
    icon: UsersRound,
    number: "02",
    title: "Communities that thrive",
    text: "Backing local leadership and bringing people together to solve challenges close to home.",
  },
  {
    icon: Sprout,
    number: "03",
    title: "A future worth protecting",
    text: "Helping young people care for the environment and build resilience where it matters most.",
  },
];
export default async function Home() {
  let projects: {
    title: string;
    slug: string;
    description: string;
    location: string;
    imageUrl: string;
    category: string;
  }[] = [];
  let counts = { projects: 0, events: 0, members: 0 };
  try {
    const [records, projectCount, eventCount, memberCount] = await Promise.all([
      db.project.findMany({
        where: { status: "ONGOING" },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 3,
        select: {
          title: true,
          slug: true,
          description: true,
          location: true,
          imageUrl: true,
          category: { select: { name: true } },
        },
      }),
      db.project.count({ where: { status: "ONGOING" } }),
      db.event.count({
        where: { status: "PUBLISHED", startsAt: { gte: new Date() } },
      }),
      db.member.count({ where: { active: true } }),
    ]);
    projects = records
      .filter((p) => p.imageUrl)
      .map((p) => ({
        ...p,
        category: p.category?.name ?? "COMMUNITY",
        location: p.location ?? "Pakistan",
        imageUrl: p.imageUrl!,
      }));
    counts = {
      projects: projectCount,
      events: eventCount,
      members: memberCount,
    };
  } catch {
    /* Fresh installs can render before migrations are applied. */
  }
  const statText = counts.members
    ? counts.members.toLocaleString() + "+"
    : "One shared purpose";
  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[760px] bg-[#06291e] text-white md:min-h-[850px]">
        <Image
          src="/assets/banner_01.jpeg"
          alt="Young people coming together at a YAP community gathering"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06291e]/70 via-transparent to-[#06291e]/20" />
        <Header />
        <div className="container-yap relative flex min-h-[760px] items-center justify-center pb-32 pt-28 text-center md:min-h-[850px] md:justify-start md:pb-20 md:pt-24 md:text-left">
          <div className="w-full max-w-[770px] pb-4 md:pb-0">
            <div className="reveal mb-6 flex items-center justify-center gap-3 md:mb-8 md:justify-start">
              <span className="h-px w-10 bg-lime-300" />
              <span className="eyebrow text-lime-300">
                A youth-led movement · Pakistan
              </span>
            </div>
            <h1
              className="reveal text-balance text-[clamp(2.5rem,10vw,7.4rem)] font-extrabold leading-[1.02] tracking-[-.07em] sm:text-[clamp(3rem,8vw,7.4rem)] md:leading-[.98] md:tracking-[-.075em]"
              style={{ animationDelay: ".1s" }}
            >
              Young energy.
              <br />
              <span className="text-[#c6ef55]">Lasting change.</span>
            </h1>
            <p
              className="reveal mx-auto mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 md:mx-0 md:mt-8 md:text-lg"
              style={{ animationDelay: ".2s" }}
            >
              We believe every young person can help shape a better Pakistan.
              Together, we’re building skills, supporting communities, and
              creating room for hope to grow.
            </p>
            <div
              className="reveal mt-7 flex flex-wrap justify-center gap-3 md:mt-9 md:justify-start"
              style={{ animationDelay: ".3s" }}
            >
              <Link
                href="/membership"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c6ef55] px-6 py-4 text-sm font-extrabold text-[#123b2c] transition hover:-translate-y-1 hover:shadow-xl"
              >
                Find your place here{" "}
                <ArrowUpRight
                  size={17}
                  className="transition group-hover:rotate-45"
                />
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center gap-3 rounded-full border border-white/35 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Discover our work <ArrowDown size={16} />
              </Link>
            </div>
            {/* <div className="mt-14 flex items-center gap-4 text-xs font-semibold text-white/75">
              <div className="flex -space-x-3">
                {[
                  "/assets/ceo_dp_icon.png",
                  "/assets/ceo_about_image.jpg",
                  "/assets/banner_03.jpeg",
                ].map((src) => (
                  <div
                    key={src}
                    className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#214337]"
                  >
                    <Image
                      src={src}
                      alt="YAP community member"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>Made possible by people who show up.</span>
            </div> */}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-yap grid grid-cols-3 divide-x divide-white/15 border-t border-white/15 py-4 text-center text-white/80 sm:py-5 md:text-left">
            <div className="px-1 sm:px-2 md:px-6">
              <span className="block text-sm font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
                Youth-led
              </span>
              <span className="block text-[8px] uppercase leading-tight tracking-[.08em] sm:text-[10px] sm:tracking-[.16em] md:text-xs">
                In every step
              </span>
            </div>
            <div className="px-1 sm:px-4 md:px-8">
              <span className="block text-sm font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
                Community-first
              </span>
              <span className="block text-[8px] uppercase leading-tight tracking-[.08em] sm:text-[10px] sm:tracking-[.16em] md:text-xs">
                Always rooted locally
              </span>
            </div>
            <div className="px-1 sm:px-4 md:px-8">
              <span className="block break-words text-sm font-extrabold leading-tight text-white sm:text-xl md:text-2xl">
                {statText}
              </span>
              <span className="block text-[8px] uppercase leading-tight tracking-[.08em] sm:text-[10px] sm:tracking-[.16em] md:text-xs">
                Young members
                {counts.events
                  ? ` · ${counts.events} upcoming events`
                  : " building change"}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 md:py-32">
        <div className="container-yap grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative">
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#dff0cd] blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] bg-[#e7efe8]">
              <Image
                src="/assets/ceo_about_image.jpg"
                alt="YAP leader speaking to young people"
                width={900}
                height={1200}
                className="h-[540px] w-full object-cover object-top"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/50 bg-white/85 p-4 shadow-lg backdrop-blur">
                <span className="eyebrow text-[#16834a]">Our purpose</span>
                <p className="mt-1 max-w-[210px] text-sm font-bold leading-5">
                  A fairer future, created together.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#16834a]">Who we are</p>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-extrabold leading-[1.12] tracking-[-.055em] text-[#10241d] md:text-6xl">
              A generation ready to make a difference.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#65736b]">
              Youth Association of Pakistan is a platform for young people to
              learn, lead, and serve. We bring diverse voices together and turn
              shared purpose into action that strengthens our communities.
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#65736b]">
              From education and social welfare to environmental care, our work
              starts by listening—and grows through the energy of people who
              care.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#16834a] pb-2 text-sm font-extrabold text-[#12583b]"
            >
              Get to know YAP <ArrowRight size={17} />
            </Link>
            <div className="mt-12 grid grid-cols-2 gap-7 border-t border-[#dfe7df] pt-7">
              <div>
                <p className="text-3xl font-extrabold tracking-[-.05em] text-[#123e2c]">
                  People first
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#77857c]">
                  Rooted in community
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold tracking-[-.05em] text-[#123e2c]">
                  Hope in action
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#77857c]">
                  Made for the future
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="work" className="bg-[#edf3ec] py-24 md:py-32">
        <div className="container-yap">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#16834a]">What moves us</p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-[-.06em] md:text-6xl">
                Change grows in many ways.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#68766d]">
              We work alongside communities to turn local ideas into lasting
              progress.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {focus.map(({ icon: Icon, number, title, text }) => (
              <article
                key={number}
                className="group rounded-[24px] border border-[#dfe8df] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(17,62,43,.10)] md:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4dd] text-[#16834a]">
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-extrabold tracking-widest text-[#a3b1a6]">
                    {number}
                  </span>
                </div>
                <h3 className="mt-9 text-2xl font-extrabold tracking-[-.04em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6b786f]">{text}</p>
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#16834a]"
                >
                  Explore our approach <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#073d2c] py-24 text-white md:py-32">
        <div className="container-yap">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-lime-300">From intention to impact</p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-[-.06em] md:text-6xl">
                The work is already growing.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 self-start rounded-full border border-white/30 px-5 py-3 text-sm font-bold transition hover:bg-white/10 md:self-auto"
            >
              All our work <ArrowUpRight size={16} />
            </Link>
          </div>
          {projects.length > 0 ? (
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-[24px] bg-white text-[#10241d]">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-2 text-[10px] font-extrabold tracking-widest text-[#16834a]">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold text-[#8b958e]">
                        {project.location}
                      </div>
                      <h3 className="mt-2 text-xl font-extrabold tracking-[-.03em]">
                        {project.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#67746b]">
                        {project.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[#e8ece8] pt-4">
                        <span className="text-xs font-bold text-[#16834a]">
                          Discover this work
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f3e7] text-[#16834a] transition group-hover:bg-[#c6ef55]">
                          <MoveUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-8 text-sm text-white/70">
              Featured projects will appear here once verified details are
              published by YAP.
            </p>
          )}
        </div>
      </section>
      <section className="py-24 md:py-28">
        <div className="container-yap grid overflow-hidden rounded-[32px] bg-[#c6ef55] md:grid-cols-[1.1fr_.9fr]">
          <div className="p-8 md:p-14">
            <p className="eyebrow text-[#387335]">
              Your next chapter starts here
            </p>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-extrabold leading-[1.08] tracking-[-.06em] text-[#123b2c] md:text-6xl">
              Big change begins with showing up.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#35573d]">
              Bring your ideas, your skills, your questions. There is a place
              for you in this movement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/membership"
                className="rounded-full bg-[#073d2c] px-6 py-4 text-sm font-extrabold text-white transition hover:-translate-y-1"
              >
                Become a member{" "}
                <ArrowUpRight className="ml-2 inline" size={16} />
              </Link>
              <Link
                href="/volunteer"
                className="rounded-full border border-[#537d42] px-6 py-4 text-sm font-extrabold text-[#17422f] transition hover:bg-white/30"
              >
                Volunteer with us
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px]">
            <Image
              src="/assets/banner_02.jpeg"
              alt="Young people collaborating at a YAP event"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#c6ef55]/15 to-transparent" />
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur">
              <HeartHandshake className="text-[#16834a]" />
              <p className="mt-2 text-sm font-extrabold text-[#123b2c]">
                There’s room for you.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-yap grid gap-8 rounded-[28px] bg-[#eef3ed] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="eyebrow text-[#16834a]">Let’s talk</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.05em] md:text-4xl">
              A good idea starts with a conversation.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#67746b]">
              Questions, ideas, or just want to learn more? We’d love to hear
              from you.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-[#073d2c] px-6 py-4 text-sm font-extrabold text-white"
          >
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
