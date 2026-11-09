"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./primitives";

/** A stationary measurement rail: one read phase and one write phase per frame. */
export default function HowProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = [...el.querySelectorAll<HTMLElement>(".how-card")];
    if (rm) {
      el.style.setProperty("--how-progress", "1");
      steps.forEach(step => step.classList.add("is-reached"));
      return;
    }
    let raf = 0, queued = false;
    const apply = () => {
      queued = false;
      const r = el.getBoundingClientRect();
      const horizontal = window.matchMedia("(min-width: 1024px)").matches;
      const rects = steps.map(step => step.getBoundingClientRect());
      const cursor = window.innerHeight * 0.72;
      const start = r.top;
      const distance = horizontal ? r.height : Math.max(1, rects.at(-1)!.top - start);
      const progress = Math.max(0, Math.min(1, (cursor - start) / distance));
      el.style.setProperty("--how-progress", String(progress));
      steps.forEach((step, i) => step.classList.toggle("is-reached", progress >= i / Math.max(1, steps.length - 1)));
    };
    const on = () => { if (!queued) { queued = true; raf = requestAnimationFrame(apply); } };
    const resize = new ResizeObserver(on);
    resize.observe(el);
    apply(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); resize.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [rm]);
  return <div ref={ref} className="how-progress relative"><div className="how-rail" aria-hidden><span /></div>{children}</div>;
}
