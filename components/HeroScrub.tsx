"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./primitives";
import { BIZ } from "@/data/site";

/**
 * SIGNATURE — "THE OWNER'S COMMAND CENTER" HD scroll crossfade (engine copied from ~/workspace/hero-kit/HeroScrub.tsx).
 *
 * v3 SpaceX register: ONE operations room, geometry-locked via xAI images/edits off k1 —
 * k1 screens dark, the console buried in paper → k2 the center screen draws the system schematic →
 * k3 the schematic becomes the live operating system across the screen wall → k4 dawn, the desk clear, trucks leaving.
 * The screens ARE the vehicle. Night→morning is the promise.
 *
 * Engine rules (HERO ENGINE STANDARD 2026-08-18 + Jonakee 2026-10-26): NATIVE scroll listener + rAF, opacity written
 * straight to the DOM, 230svh sticky pin, first crossfade done by 25%, chapters 0/.12/.40/.70, visible progress rail
 * from the first pixel, permanent base <img> (k1) that nothing ever animates, 9:16 plates (p1–p4) for portrait phones
 * via <picture>, reduced-motion → k1 + chapter-1 copy, nothing hidden. NO Lenis on this page. NO framer-motion here.
 */
const KEYS = [
  { wide: "/hero/k1.webp", w1920: "/hero/k1-1920.webp", tall: "/hero/p1.webp" },
  { wide: "/hero/k2.webp", w1920: "/hero/k2-1920.webp", tall: "/hero/p2.webp" },
  { wide: "/hero/k3.webp", w1920: "/hero/k3-1920.webp", tall: "/hero/p3.webp" },
  { wide: "/hero/k4.webp", w1920: "/hero/k4-1920.webp", tall: "/hero/p4.webp" },
];
const TALL = "(max-width: 640px) and (orientation: portrait)";
const FADES: [number, number][] = [[0.0, 0.25], [0.3, 0.55], [0.6, 0.85]];

type Chapter = { at: number; plate: string; stage: string; head: string; accent: string; copy: string };
const CHAPTERS: Chapter[] = [
  { at: 0.0, plate: "01", stage: "A DAY RIGHT NOW", head: "I build owner-led businesses", accent: "their entire operating system.", copy: BIZ.sub },
  { at: 0.12, plate: "02", stage: "OPERATING REVIEW", head: "I sit with you and learn", accent: "how your business actually runs.", copy: "One working session plus a written map of your biggest time-sinks and risks. Yours to keep, whatever you decide next." },
  { at: 0.40, plate: "03", stage: "BUILD", head: "Then I build the system", accent: "that runs it.", copy: "The whole spine — estimating, contracts, scheduling, payments — custom to exactly how you run. Not another app you bend yourself around." },
  { at: 0.70, plate: "04", stage: "RUN IT TOGETHER", head: "Custom to exactly", accent: "how you run.", copy: "I stay on, fix what comes up, and add to it as the business changes." },
];
const smooth = (p: number, a: number, b: number) => { const t = Math.min(1, Math.max(0, (p - a) / (b - a))); return t * t * (3 - 2 * t); };

export default function HeroScrub() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const scrimRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (rm) return;
    let raf = 0, queued = false;
    const apply = () => {
      queued = false;
      const el = wrapRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / travel));
      for (let i = 0; i < FADES.length; i++) { const img = layerRefs.current[i]; if (img) img.style.opacity = String(smooth(p, FADES[i][0], FADES[i][1])); }
      // continuous zoom from the very first notch so the hero never reads as dead scrolling
      if (zoomRef.current) zoomRef.current.style.transform = `scale(${(1.06 - p * 0.06).toFixed(4)})`;
      if (scrimRef.current) scrimRef.current.style.opacity = String(0.55 - p * 0.15);
      if (railRef.current) railRef.current.style.transform = `scaleY(${Math.max(0.02, p)})`;
      if (pctRef.current) pctRef.current.textContent = `${String(Math.round(p * 100)).padStart(3, "0")}`;
      let next = 0; for (let i = CHAPTERS.length - 1; i >= 0; i--) { if (p >= CHAPTERS[i].at) { next = i; break; } }
      setChapter((c) => (c === next ? c : next));
    };
    const onScroll = () => { if (!queued) { queued = true; raf = requestAnimationFrame(apply); } };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [rm]);

  const active = CHAPTERS[chapter];
  const headWords = active.head.split(" ");

  return (
    <section id="top" ref={wrapRef} className="relative h-[230svh]">
      <div className="hero sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        <div ref={zoomRef} className="absolute inset-0 will-change-transform" style={{ transform: rm ? "none" : "scale(1.06)" }}>
          {/* PERMANENT visible base keyframe — never animated, never hidden (globals: .hero img:first-child) */}
          <picture>
            <source media={TALL} srcSet={KEYS[0].tall} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={KEYS[0].w1920} srcSet={`${KEYS[0].w1920} 1920w, ${KEYS[0].wide} 2560w`} sizes="100vw" alt="A dark operations room at 9pm: five monitors off, the console buried in paper bids, clipboards and an open filing cabinet"
              fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          {!rm && KEYS.slice(1).map((k, i) => (
            <picture key={k.wide}>
              <source media={TALL} srcSet={k.tall} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={k.w1920} srcSet={`${k.w1920} 1920w, ${k.wide} 2560w`} sizes="100vw" alt="" aria-hidden loading="eager"
                ref={(el) => { layerRefs.current[i] = el; }} style={{ opacity: 0 }}
                className="absolute inset-0 h-full w-full object-cover will-change-[opacity]" />
            </picture>
          ))}
        </div>

        {/* legibility scrims — black from the bottom/left; eases as the morning arrives */}
        <div ref={scrimRef} style={{ opacity: 0.55 }} className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />
        {!rm && <div className="scan" aria-hidden />}

        {/* TELEMETRY RAIL — visible response from the first pixel of scroll */}
        <div className="pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-8">
          <span className="counter hud text-white">{String(chapter + 1).padStart(2, "0")}<span className="text-grey-dim"> / {String(CHAPTERS.length).padStart(2, "0")}</span></span>
          <div className="relative h-32 w-px overflow-hidden bg-white/20 shadow-[0_0_6px_rgba(0,0,0,.9)] sm:h-40">
            <div ref={railRef} className="absolute inset-x-0 top-0 h-full origin-top bg-white" style={{ transform: rm ? "scaleY(1)" : "scaleY(0.02)" }} />
          </div>
          {!rm && <span className="mono hud hidden text-[10px] tracking-[0.2em] text-white/70 sm:block"><span ref={pctRef}>000</span>%</span>}
          <span className="counter hud hidden [writing-mode:vertical-rl] text-[0.68rem] text-white/70 sm:block">{active.stage}</span>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          <span className="counter hud absolute right-8 top-24 text-[0.68rem] text-white/70">{BIZ.city.toUpperCase()}</span>
          <span className="counter hud absolute bottom-8 right-8 flex items-center gap-3 text-[0.68rem] text-white/70">SCROLL <span className="inline-block h-6 w-px bg-white/50" /></span>
        </div>

        {/* content — bottom-left, SpaceX */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pl-5 pr-16 pb-12 sm:px-8 sm:pb-16">
          {/* Tee 2026-10-26: hairline frame + dark panel so the copy stays legible over every keyframe (k4 morning is the brightest) */}
          <div className="hero-panel edge max-w-[62rem] p-5 sm:p-8 lg:p-10">
          <div key={`plate-${chapter}`} className="rv mb-4 flex items-center gap-4" style={{ ["--rv-y" as string]: "8px" }}>
            <span className="counter text-white">{active.plate}</span>
            <span className="h-px w-8 bg-white/50" />
            <span className="label label-plain !text-white/80">{active.stage}</span>
            <span className="blink ml-1 inline-block h-1.5 w-1.5 bg-white" aria-hidden />
          </div>
          <h1 className="display max-w-5xl text-[clamp(2.7rem,6.4vw,6.6rem)] text-white" style={{ textShadow: "0 2px 30px rgba(0,0,0,.6)" }}>
            <span key={`head-${chapter}`} className="block">
              {headWords.map((w, i) => (<span key={i}><span className="rvw inline-block" style={{ ["--rv-d" as string]: `${i * 0.05}s` }}>{w}</span>{" "}</span>))}
              <span className="rvw block text-grey" style={{ ["--rv-d" as string]: `${headWords.length * 0.05}s` }}>{active.accent}</span>
            </span>
          </h1>
          <p key={`copy-${chapter}`} className="rv mt-6 max-w-xl text-balance text-base text-white/85 sm:text-lg" style={{ textShadow: "0 1px 14px rgba(0,0,0,.7)", ["--rv-d" as string]: "0.1s", ["--rv-y" as string]: "12px" }}>
            {active.copy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={BIZ.bookHref} className="btn btn-solid w-full sm:w-auto">
              {BIZ.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#work" className="btn btn-ghost w-full sm:w-auto">See the work</a>
          </div>
          <p className="mt-4 max-w-md text-[13px] text-grey">{BIZ.ctaNote}</p>
          <div className="mt-6 flex items-center gap-1.5">
            {CHAPTERS.map((_, i) => (<span key={i} className={`h-px transition-all duration-500 ${i === chapter ? "w-12 bg-white" : "w-5 bg-white/30"}`} />))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
