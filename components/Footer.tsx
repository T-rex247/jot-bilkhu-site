"use client";
import { useEffect, useState } from "react";
import { BIZ } from "@/data/site";

export default function Footer() {
  const [rm, setRm] = useState(false);
  useEffect(() => { setRm(localStorage.getItem("jot:reduceMotion") === "1"); }, []);
  const toggle = () => { const v = !rm; setRm(v); localStorage.setItem("jot:reduceMotion", v ? "1" : "0"); window.dispatchEvent(new Event("jot:rm")); };
  return (
    <footer className="relative border-t border-rule bg-black py-8 text-grey">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <p className="counter text-[0.68rem]"><span className="text-white">{BIZ.name.toUpperCase()}</span> · {BIZ.city.toUpperCase()}</p>
        <p className="flex items-center gap-5">
          <a href={BIZ.emailHref} className="counter inline-flex min-h-11 items-center normal-case text-[0.68rem] hover:text-white">{BIZ.email}</a>
          <button onClick={toggle} aria-pressed={rm} title="Reduce motion" className="counter inline-flex min-h-11 items-center border border-rule px-3 text-[0.6rem] hover:border-white hover:text-white">{rm ? "MOTION OFF" : "MOTION ON"}</button>
        </p>
      </div>
    </footer>
  );
}
