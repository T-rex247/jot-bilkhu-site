"use client";
import { useEffect, useState } from "react";
import { UI, BIZ } from "@/data/site";

/* Mobile-only sticky action bar: appears after the hero, hides over the closing/contact band. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("top");
    const book = document.getElementById("book");
    if (!hero || !book) return;
    const on = () => setShow(hero.getBoundingClientRect().bottom <= 0 && book.getBoundingClientRect().top > window.innerHeight);
    const observer = new IntersectionObserver(on, { threshold: [0, 1] });
    observer.observe(hero); observer.observe(book);
    on(); window.addEventListener("resize", on);
    return () => { observer.disconnect(); window.removeEventListener("resize", on); };
  }, []);
  return (
    <div inert={!show} aria-hidden={!show} data-visible={show} className={`mobile-bar fixed inset-x-0 bottom-0 z-40 flex border-t border-rule bg-black px-3 py-2 gap-2 transition-transform duration-500 md:hidden ${show ? "translate-y-0" : "translate-y-[140%]"}`} style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
      <a href={BIZ.bookHref} className="btn btn-solid flex-1 !border-0 !py-4 !text-[0.74rem]">{BIZ.cta}</a>
      <a href={BIZ.phoneHref} aria-label={UI.callOrText} className="flex w-14 items-center justify-center text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" /></svg>
      </a>
    </div>
  );
}
