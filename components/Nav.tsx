"use client";
import { useEffect, useState } from "react";
import { BIZ } from "@/data/site";

const LINKS = [["#story", "Story"], ["#work", "Work"], ["#services", "Services"], ["#how", "How it works"], ["#about", "About"]] as const;

/* SpaceX nav: black, hairline under it once scrolled, uppercase letter-spaced links, one squared CTA. */
export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("menu-open", open); return () => document.documentElement.classList.remove("menu-open"); }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-500 ${open ? "flex h-[100svh] flex-col !bg-black" : ""} ${solid ? "bg-black/90 backdrop-blur-sm border-b border-rule" : "bg-gradient-to-b from-black/70 to-transparent border-b border-transparent"}`}>
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" onClick={() => setOpen(false)} className="display -my-2 flex items-center py-2 text-[1.35rem] font-bold tracking-[0.06em] whitespace-nowrap">Jot Bilkhu<span className="counter ml-3 hidden text-grey lg:inline">CUSTOM SOFTWARE</span></a>
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map(([h, l]) => <a key={h} href={h} className="draw display whitespace-nowrap py-2 text-[0.82rem] font-medium tracking-[0.22em] text-white/85 hover:text-white">{l}</a>)}
          <a href={BIZ.bookHref} className="btn btn-ghost !px-5 !py-2.5 !text-[0.72rem]">Book a Review</a>
        </nav>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="-my-2 -mr-3 flex h-11 w-11 items-center justify-center lg:hidden">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={open ? "M6 6l12 12M18 6L6 18" : "M3 7h18M3 12h18M3 17h18"} /></svg>
        </button>
      </div>
      {open && (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-rule bg-black px-5 pb-8 pt-2 lg:hidden sm:px-8">
          {LINKS.map(([h, l], i) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="rv flex items-baseline gap-5 border-b border-rule py-4 text-xl tracking-[0.12em] display" style={{ ["--rv-d" as string]: `${i * 0.05}s`, ["--rv-y" as string]: "10px" }}>
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
