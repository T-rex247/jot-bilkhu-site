import { BIZ, STAGES } from "@/data/site";

/**
 * HERO — one screen, normal scroll (Jot 2026-10-29: the 230svh scroll-pinned 4-slide deck was "jarring and confusing";
 * he kept its content, not the mechanism). 2026-10-30 (msg 6045): the three picture cards under it were "too much", so the
 * whole arc is now one screen: k1, the headline, and the four stages as one text-only line in their story colors
 * (globals.css STORY TONES; STAGES in data/site.ts). That line is the key for the page.
 * No scroll listener, no pin, no Lenis. Reveals are CSS (.rv/.rvw on mount, .si in view) and respect reduced motion.
 */
const TALL = "(max-width: 640px) and (orientation: portrait)";
const HEAD = "I build owner-led businesses";
const ACCENT = "their entire operating system.";

export default function Hero() {
  const words = HEAD.split(" ");
  return (
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
            <ol aria-label="How it goes" className="rv mb-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-3" style={{ ["--rv-y" as string]: "8px" }}>
              {STAGES.map((st, i) => (
                <li key={st.n} className={`${st.tone} flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] sm:text-[0.74rem]`}>
                  {i > 0 && <span aria-hidden className="hidden text-white/35 sm:inline">→</span>}
                  <span className="tone-text font-semibold">{st.n}</span>
                  <span className="tone-text">{st.label}</span>
                </li>
              ))}
            </ol>
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
  );
}
