"use client";
import { useEffect, useState } from "react";
import { BIZ } from "@/data/site";

/* Mobile-only sticky action bar: appears after the hero, hides over the closing/contact band. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const book = document.getElementById("book");
      const past = window.scrollY > window.innerHeight * 1.6;
      const atEnd = book ? book.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(past && !atEnd);
    };
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 flex border-t border-rule bg-black transition-transform duration-500 md:hidden ${show ? "translate-y-0" : "translate-y-[140%]"}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={BIZ.bookHref} className="btn btn-solid flex-1 !border-0 !py-4 !text-[0.74rem]">{BIZ.cta}</a>
      <a href={BIZ.phoneHref} aria-label="Call or text" className="flex w-16 items-center justify-center border-l border-rule text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" /></svg>
      </a>
    </div>
  );
}
