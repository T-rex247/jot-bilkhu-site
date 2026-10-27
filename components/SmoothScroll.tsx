"use client";
import { useEffect } from "react";
/* NO Lenis / virtual scroll on this page (pinned hero scrub → native scroll only; Jonakee lesson 2026-10-26).
   This only smooth-scrolls same-page anchors with a nav offset via native scrollTo, respecting reduced motion,
   and runs the IntersectionObserver that flips `.si` scroll-in reveals to `.in` (base state is already visible). */
export default function SmoothScroll() {
  useEffect(() => {
    const rm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || localStorage.getItem("jot:reduceMotion") === "1";
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return; const id = a.getAttribute("href")!.slice(1); const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: rm() ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    const els = document.querySelectorAll(".si");
    els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add("in"); else io.observe(el); });
    // failsafe: nothing may stay un-revealed for long regardless of observer behaviour
    const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 6000);
    return () => { document.removeEventListener("click", onClick); io.disconnect(); clearTimeout(t); };
  }, []);
  return null;
}
