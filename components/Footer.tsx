"use client";
import { useEffect, useState } from "react";
import { UI, BIZ } from "@/data/site";

export default function Footer() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const sync = () => { try { setRm(localStorage.getItem("jot:reduceMotion") === "1"); } catch {} };
    sync(); window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggle = () => { const v = !rm; setRm(v); try { localStorage.setItem("jot:reduceMotion", v ? "1" : "0"); } catch {} window.dispatchEvent(new Event("jot:rm")); };
  return (
    <footer className="relative border-t border-rule bg-black py-8 text-grey">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="counter text-[0.68rem]"><span className="text-white">{BIZ.brand.toUpperCase()}</span> · {BIZ.city.toUpperCase()}</p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <address className="not-italic">
          <a href={BIZ.emailHref} className="counter inline-flex min-h-11 items-center normal-case text-[0.68rem] hover:text-white">{BIZ.email}</a>
          </address>
          <button onClick={toggle} aria-pressed={rm} title={UI.footerTitle} className="counter inline-flex min-h-11 items-center border border-rule px-3 text-[0.6rem] hover:border-white hover:text-white">{rm ? UI.motionOff : UI.motionOn}</button>
        </div>
      </div>
    </footer>
  );
}
