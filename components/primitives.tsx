"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

export function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setRm(m.matches || localStorage.getItem("jot:reduceMotion") === "1");
    h(); m.addEventListener("change", h); window.addEventListener("jot:rm", h);
    return () => { m.removeEventListener("change", h); window.removeEventListener("jot:rm", h); };
  }, []);
  return rm;
}

/** Magnetic CTA — tracks the cursor within a radius (desktop only). */
export function Magnetic({ children, className, href, radius = 70 }: { children: React.ReactNode; className?: string; href: string; radius?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rm = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 }), sy = useSpring(y, { stiffness: 60, damping: 18 });
  function onMove(e: React.MouseEvent) {
    if (rm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < radius + r.width / 2) { x.set(dx * 0.22); y.set(dy * 0.22); }
  }
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: rm ? 0 : sx, y: rm ? 0 : sy }} className={className}>
      {children}
    </motion.a>
  );
}

/** Count-up — the FINAL value is in the DOM from SSR; only animates when in view + motion allowed. */
export function CountUp({ to, suffix = "", prefix = "", className, decimals = 0 }: { to: number; suffix?: string; prefix?: string; className?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rm = useReducedMotion();
  const [n, setN] = useState(to);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || rm || started.current) return;
    started.current = true;
    const start = performance.now(), dur = 1400; let raf = 0;
    const tick = (t: number) => { const p = Math.min((t - start) / dur, 1); setN((1 - Math.pow(1 - p, 3)) * to); if (p < 1) raf = requestAnimationFrame(tick); else setN(to); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, rm]);
  return <span ref={ref} className={className}>{prefix}{n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}

/** Reveal-on-mount wrapper — CSS base-visible (.rv); never stalls invisible. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "article" | "figure" }) {
  return <Tag className={`rv ${className ?? ""}`} style={delay ? ({ ["--rv-d" as string]: `${delay}s` } as React.CSSProperties) : undefined}>{children}</Tag>;
}

/** Kinetic word-by-word heading — base-visible (.rvw), per-word delay. The accent is a second line in dim grey
 *  (SpaceX register: no italic, no color — hierarchy by weight and value). Space stays OUTSIDE the inline-block span. */
export function KineticHeading({ text, className, accent, accentClass = "block text-grey", as: Tag = "h2" }: { text: string; className?: string; accent?: string; accentClass?: string; as?: "h1" | "h2" | "h3" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text + (accent ? " " + accent : "")}>
      {words.map((w, i) => (
        <span key={i}><span aria-hidden className="rvw inline-block" style={{ ["--rv-d" as string]: `${i * 0.05}s` }}>{w}</span>{i < words.length - 1 ? " " : ""}</span>
      ))}
      {accent && <span aria-hidden className={`rvw ${accentClass}`} style={{ ["--rv-d" as string]: `${words.length * 0.05}s` }}>{accent}</span>}
    </Tag>
  );
}

/** Section head — the SpaceX counter row: "02 / 07 — LABEL" over a hairline. */
export function SectionHead({ n, total = "07", label, className = "" }: { n: string; total?: string; label: string; className?: string }) {
  return (
    <div className={`si si-hair ${className}`}>
      <div className="flex items-baseline gap-5">
        <span className="counter">{n} / {total}</span>
        <span className="label label-plain">{label}</span>
      </div>
      <div className="hair mt-4 w-full opacity-30" />
    </div>
  );
}

/** Scroll parallax: translates children by `speed * scroll delta` while in view. transform-only. */
export function Parallax({ children, speed = 0.18, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    if (rm) return;
    const el = ref.current; if (!el) return;
    let raf = 0, queued = false;
    const apply = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    };
    const on = () => { if (!queued) { queued = true; raf = requestAnimationFrame(apply); } };
    apply(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [speed, rm]);
  return <div ref={ref} className={`will-change-transform ${className ?? ""}`}>{children}</div>;
}
