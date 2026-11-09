"use client";
import { useEffect } from "react";
import { motionReduced } from "./motion";

/** Native anchor scrolling and progressive enhancement; static content is always readable. */
export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { root.dataset.reducedMotion = String(motionReduced()); };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("jot:rm", sync);
    window.addEventListener("storage", sync);
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      const id = a?.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: motionReduced() ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    const els = document.querySelectorAll(".si");
    // Arm the failsafe before attempting observer setup. No JS/IO means no hidden state.
    const t = setTimeout(() => els.forEach(el => el.classList.add("in")), 6000);
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(entries => {
        for (const e of entries) if (e.isIntersecting) {
          e.target.classList.add("in"); io?.unobserve(e.target);
        }
      }, { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
      root.dataset.reveals = "ready";
      els.forEach(el => io?.observe(el));
    }
    return () => {
      document.removeEventListener("click", onClick);
      media.removeEventListener("change", sync);
      window.removeEventListener("jot:rm", sync);
      window.removeEventListener("storage", sync);
      io?.disconnect(); clearTimeout(t); delete root.dataset.reveals;
    };
  }, []);
  return null;
}
