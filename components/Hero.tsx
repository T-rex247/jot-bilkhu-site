import { BIZ } from "@/data/site";

/**
 * HERO — one screen, normal scroll (Jot 2026-10-29: the 230svh scroll-pinned 4-slide deck was "jarring and confusing";
 * he kept its content, not the mechanism). k1 + chapter 1 is the hero; chapters 2–4 sit right under it as a
 * three-step strip (the same night→morning room, k2–k4), so the whole deck reads at a glance and the page just scrolls.
 * No scroll listener, no pin, no Lenis. Reveals are CSS (.rv/.rvw on mount, .si in view) and respect reduced motion.
 */
const TALL = "(max-width: 640px) and (orientation: portrait)";
const HEAD = "I build owner-led businesses";
const ACCENT = "their entire operating system.";

const STEPS = [
  { plate: "02", stage: "Operating review", img: "/hero/k2-1920.webp", alt: "The same operations room, the center screen now drawing a system schematic",
    head: "I sit with you and learn", accent: "how your business actually runs.", copy: "One working session plus a written map of your biggest time-sinks and risks. Yours to keep, whatever you decide next." },
  { plate: "03", stage: "Build", img: "/hero/k3-1920.webp", alt: "The schematic spread across the whole screen wall as a live operating system",
    head: "Then I build the system", accent: "that runs it.", copy: "The whole spine — estimating, contracts, scheduling, payments — custom to exactly how you run. Not another app you bend yourself around." },
  { plate: "04", stage: "Run it together", img: "/hero/k4-1920.webp", alt: "The operations room at dawn, the desk clear and trucks heading out",
    head: "Custom to exactly", accent: "how you run.", copy: "I stay on, fix what comes up, and add to it as the business changes." },
];

export default function Hero() {
  const words = HEAD.split(" ");
  return (
    <>
      <section id="top" className="hero relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-black">
        {/* PERMANENT visible base keyframe — never animated, never hidden (globals: .hero img:first-child) */}
        <picture>
          <source media={TALL} srcSet="/hero/p1.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/k1-1920.webp" srcSet="/hero/k1-1920.webp 1920w, /hero/k1.webp 2560w" sizes="100vw"
            alt="A dark operations room at 9pm: five monitors off, the console buried in paper bids, clipboards and an open filing cabinet"
            fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5 opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />

        <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          <span className="counter hud absolute right-8 top-24 text-[0.68rem] text-white/70">{BIZ.city.toUpperCase()}</span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16">
          <div className="hero-panel edge max-w-[62rem] p-5 sm:p-8 lg:p-10">
            <div className="rv mb-4 flex items-center gap-4" style={{ ["--rv-y" as string]: "8px" }}>
              <span className="counter text-white">01</span>
              <span className="h-px w-8 bg-white/50" />
              <span className="label label-plain !text-white/80">A DAY RIGHT NOW</span>
            </div>
            <h1 className="display max-w-5xl text-[clamp(2.7rem,6.4vw,6.6rem)] text-white" style={{ textShadow: "0 2px 30px rgba(0,0,0,.6)" }}>
              {words.map((w, i) => (<span key={i}><span className="rvw inline-block" style={{ ["--rv-d" as string]: `${i * 0.05}s` }}>{w}</span>{" "}</span>))}
              <span className="rvw block text-grey" style={{ ["--rv-d" as string]: `${words.length * 0.05}s` }}>{ACCENT}</span>
            </h1>
            <p className="rv mt-6 max-w-xl text-balance text-base text-white/85 sm:text-lg" style={{ textShadow: "0 1px 14px rgba(0,0,0,.7)", ["--rv-d" as string]: "0.1s", ["--rv-y" as string]: "12px" }}>
              {BIZ.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={BIZ.bookHref} className="btn btn-solid w-full sm:w-auto">
                {BIZ.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="#work" className="btn btn-ghost w-full sm:w-auto">See the work</a>
            </div>
            <p className="mt-4 max-w-md text-[13px] text-grey">{BIZ.ctaNote}</p>
          </div>
        </div>
      </section>

      {/* chapters 2–4 of the old deck: the same room, night → morning, as three steps you read by scrolling */}
      <section aria-label="How it goes" className="bg-black">
        <ol className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.plate} className="si" style={{ ["--si-d" as string]: `${i * 0.1}s` }}>
              <div className="edge relative aspect-[16/10] overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-6 flex items-center gap-4">
                <span className="counter text-white">{s.plate}</span>
                <span className="h-px w-8 bg-white/50" />
                <span className="label label-plain !text-white/80">{s.stage.toUpperCase()}</span>
              </div>
              <h2 className="display mt-4 text-[clamp(1.6rem,2.4vw,2.3rem)] text-white">
                {s.head} <span className="block text-grey">{s.accent}</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">{s.copy}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
