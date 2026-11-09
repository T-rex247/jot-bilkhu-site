"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { motionReduced } from "./motion";

export function useReducedMotion() {
  const [rm, setRm] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setRm(motionReduced());
    h(); m.addEventListener("change", h); window.addEventListener("jot:rm", h); window.addEventListener("storage", h);
    return () => { m.removeEventListener("change", h); window.removeEventListener("jot:rm", h); window.removeEventListener("storage", h); };
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
    if (rm || !ref.current || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
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

/** Keep stated numbers stable, including for crawlers and reduced motion. */
export function CountUp({ to, suffix = "", prefix = "", className, decimals = 0 }: { to: number; suffix?: string; prefix?: string; className?: string; decimals?: number }) {
  return <span className={className}>{prefix}{to.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}

/** Reveal-on-mount wrapper — CSS base-visible (.rv); never stalls invisible. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "article" | "figure" }) {
  return <Tag className={`rv ${className ?? ""}`} style={delay ? ({ ["--rv-d" as string]: `${delay}s` } as React.CSSProperties) : undefined}>{children}</Tag>;
}

/** Word-by-word heading with a palette-aware accent line. */
export function KineticHeading({ text, className, accent, accentClass = "block accent-text", as: Tag = "h2" }: { text: string; className?: string; accent?: string; accentClass?: string; as?: "h1" | "h2" | "h3" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text + (accent ? " " + accent : "")}>
      {words.map((w, i) => (
        <span key={i}><span aria-hidden className="rvw inline-block" style={{ ["--rv-d" as string]: `${i * 0.05}s` }}>{w}</span>{i < words.length - 1 ? " " : ""}</span>
      ))}
      {accent && <> <span aria-hidden className={`rvw ${accentClass}`} style={{ ["--rv-d" as string]: `${words.length * 0.05}s` }}>{accent}</span></>}
    </Tag>
  );
}

export type Tone = "problem" | "review" | "build" | "run";
/** Numbered mono eyebrow; optional story tone. */
export function SectionHead({ n, label, tone, className = "" }: { n: string; label: string; tone?: Tone; className?: string }) {
  return (
    <div className={`si ${tone ? `tone-${tone}` : ""} ${className}`}>
      <div className="eyebrow"><span>{n} // {label}</span></div>
    </div>
  );
}

/** Scroll parallax: translates children by `speed * scroll delta` while in view. transform-only. */
export function Parallax({ children, speed = 0.18, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (rm) { el.style.transform = "none"; return; }
    let raf = 0, queued = false;
    const apply = () => {
      queued = false;
      // Measure the stationary parent, never our own transformed position.
      const r = (el.parentElement ?? el).getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const center = r.top + r.height / 2 - vh / 2;
      const offset = Math.max(-32, Math.min(32, -center * speed));
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const on = () => { if (!queued) { queued = true; raf = requestAnimationFrame(apply); } };
    apply(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [speed, rm]);
  return <div ref={ref} className={`parallax ${className ?? ""}`}>{children}</div>;
}
