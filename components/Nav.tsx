"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./primitives";
import { UI, BIZ, NAV_LINKS } from "@/data/site";



/* SpaceX nav: black, hairline under it once scrolled, uppercase letter-spaced links, one squared CTA. */
export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(([entry]) => setSolid(entry.boundingClientRect.bottom <= 80), { rootMargin: "-80px 0px 0px 0px" });
    if (hero) heroObserver.observe(hero);
    const visible = new Map<string, number>();
    const sections = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.set(`#${entry.target.id}`, entry.boundingClientRect.top);
        else visible.delete(`#${entry.target.id}`);
      });
      setActive([...visible].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "");
    }, { rootMargin: "-20% 0px -60% 0px" });
    NAV_LINKS.forEach(([href]) => { const el = document.querySelector(href); if (el) sections.observe(el); });
    return () => { heroObserver.disconnect(); sections.disconnect(); };
  }, []);
  useEffect(() => {
    const el = progress.current;
    if (!el) return;
    if (rm) { el.style.transform = "scaleX(1)"; return; }
    let raf = 0, queued = false;
    const apply = () => {
      queued = false;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 1})`;
    };
    const on = () => { if (!queued) { queued = true; raf = requestAnimationFrame(apply); } };
    const resize = new ResizeObserver(on);
    resize.observe(document.body);
    apply(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); resize.disconnect(); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [rm]);
  useEffect(() => {
    const on = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    window.addEventListener("keydown", on); desktop.addEventListener("change", close);
    return () => { window.removeEventListener("keydown", on); desktop.removeEventListener("change", close); };
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("menu-open", open); return () => document.documentElement.classList.remove("menu-open"); }, [open]);
  return (
    <header className={`site-nav fixed inset-x-0 top-0 z-50 text-white ${open ? "flex h-[100svh] flex-col !bg-black" : ""} ${solid ? "nav-solid border-b border-rule" : "bg-gradient-to-b from-black/70 to-transparent border-b border-transparent"}`}>
      <div ref={progress} className="scroll-progress" aria-hidden />
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="display -my-2 flex flex-col py-2 text-[1.35rem] font-bold leading-none tracking-[0.06em] whitespace-nowrap sm:flex-row sm:items-center">{UI.navName}<span className="counter mt-1 text-[0.6rem] text-grey sm:ml-3 sm:mt-0 sm:text-[0.68rem]">{UI.navKicker}</span></a>
        <nav aria-label={UI.menu} className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(([h, l]) => <a key={h} href={h} aria-current={active === h ? "location" : undefined} className={`draw display whitespace-nowrap py-2 text-[0.82rem] font-medium tracking-[0.22em] text-white/85 hover:text-white ${active === h ? "is-on" : ""}`}>{l}</a>)}
          <a href={BIZ.bookHref} className="btn btn-solid !px-5 !py-2.5 !text-[0.72rem]">{UI.navCta}</a>
        </nav>
        <button aria-label={UI.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="-my-2 -mr-3 flex h-11 w-11 items-center justify-center lg:hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={open ? "M6 6l12 12M18 6L6 18" : "M3 7h18M3 12h18M3 17h18"} /></svg>
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-rule bg-black px-5 pb-8 pt-2 lg:hidden sm:px-8">
          {NAV_LINKS.map(([h, l], i) => (
            <a key={h} href={h} aria-current={active === h ? "location" : undefined} onClick={() => setOpen(false)} className="rv flex items-baseline gap-5 border-b border-rule py-4 text-xl tracking-[0.12em] display" style={{ ["--rv-d" as string]: `${i * 0.05}s`, ["--rv-y" as string]: "10px" }}>
              <span className="counter text-grey-dim">0{i + 1}</span>{l}
            </a>
          ))}
          <a href={BIZ.bookHref} onClick={() => setOpen(false)} className="btn btn-solid mt-6 w-full">{BIZ.cta}</a>
          <div className="mt-auto flex items-end justify-between pt-10">
            <a href={BIZ.phoneHref} className="counter inline-flex min-h-11 items-center text-white">{BIZ.phone}</a>
            <span className="counter text-grey-dim">{BIZ.city.toUpperCase()}</span>
          </div>
        </div>
      )}
    </header>
  );
}
