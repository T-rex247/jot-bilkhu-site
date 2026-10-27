"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "./primitives";

/** SIGNATURE #2 — THE SPINE, v3: a white hairline on the left of the editorial band that draws itself down the page by
 *  scroll progress through its parent, with NUMBERED WAYPOINTS (01 02 03) that light as the page passes them.
 *  Native scroll + rAF; transform-only; reduced-motion = fully drawn. */
export default function Spine({ labels = ["01", "02", "03"], className = "" }: { labels?: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const nodes = labels.length;
  useEffect(() => {
    const el = ref.current, line = lineRef.current; if (!el || !line) return;
    if (rm) { line.style.transform = "scaleY(1)"; el.querySelectorAll("[data-node]").forEach((n) => n.classList.add("is-lit")); return; }
    let raf = 0, q = false;
    const apply = () => {
      q = false;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
      line.style.transform = `scaleY(${p.toFixed(4)})`;
      el.querySelectorAll<HTMLElement>("[data-node]").forEach((n) => { const at = parseFloat(n.dataset.node || "0"); n.classList.toggle("is-lit", p >= at); });
    };
    const on = () => { if (!q) { q = true; raf = requestAnimationFrame(apply); } };
    apply(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [rm]);
  return (
    <div ref={ref} className={`pointer-events-none absolute bottom-0 top-0 z-10 w-5 lg:w-10 ${className}`} aria-hidden>
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/12" />
      <div ref={lineRef} className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 origin-top bg-white" style={{ transform: "scaleY(0)" }} />
      {labels.map((l, i) => (
        <span key={l} data-node={(i / Math.max(1, nodes - 1)) * 0.92 + 0.04} className="spine-node absolute left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 transition-all duration-500 lg:flex" style={{ top: `${(i / Math.max(1, nodes - 1)) * 92 + 4}%` }}>
          <span className="spine-dot block h-2 w-2 border border-white/40 bg-black transition-all duration-500" />
          <span className="counter spine-lbl hidden text-[0.62rem] text-white/35 transition-colors duration-500 lg:block">{l}</span>
        </span>
      ))}
      <style>{`.spine-node.is-lit .spine-dot{border-color:#fff;background:#fff;box-shadow:0 0 0 5px rgba(255,255,255,.12)}.spine-node.is-lit .spine-lbl{color:#fff}`}</style>
    </div>
  );
}
