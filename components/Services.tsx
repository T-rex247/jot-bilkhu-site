"use client";
import { useState } from "react";
import { SERVICES, RULES, WORLDS } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* 04 — SERVICES: the regrouped structure (AUDIT.md) as a mission-control explorer. Left: four numbered rows separated by
   1px rules (hover/focus/click selects). Right: the active group's plate, full-bleed inside the column, its outcome
   bottom-left, its items as a rule-grid. Every item verbatim from the live page. */
export default function Services() {
  const [active, setActive] = useState(0);
  const g = SERVICES[active];
  return (
    <section id="services" className="relative overflow-hidden border-t border-rule bg-black py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="04" label="What I build" className="max-w-xs" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <KineticHeading as="h2" text="The whole spine," accent="one piece at a time." className="display text-[clamp(2.6rem,6.4vw,6.2rem)] text-white lg:col-span-8" />
          <p className="si self-end text-[16px] leading-relaxed text-grey lg:col-span-4">Grouped by what your business gets, in the order a job moves through it. Everything here is something I have already built and a business runs on today.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-rule lg:grid-cols-12">
          {/* selector */}
          <ol className="lg:col-span-5 lg:border-r lg:border-rule" role="tablist" aria-label="Service groups">
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="si border-b border-rule" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
                  <button role="tab" aria-selected={on} aria-controls={`svc-${s.id}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                    className={`group relative w-full py-6 pr-4 text-left transition-colors duration-300 lg:pr-8 ${on ? "text-white" : "text-grey hover:text-white"}`}>
                    <span className={`absolute left-0 top-0 h-full w-px bg-white transition-transform duration-500 origin-top ${on ? "scale-y-100" : "scale-y-0"}`} aria-hidden />
                    <div className="flex items-baseline gap-5 pl-5">
                      <span className="counter text-grey">{s.n}</span>
                      <span className="display text-[clamp(1.7rem,2.8vw,2.6rem)]">{s.name}</span>
                      <span className={`ml-auto display text-xl transition-transform duration-300 ${on ? "translate-x-0 text-white" : "-translate-x-2 text-grey-dim"}`} aria-hidden>→</span>
                    </div>
                    <p className={`pl-5 text-[14px] leading-relaxed text-grey transition-all duration-500 ${on ? "mt-3 max-h-24 opacity-100" : "max-h-0 overflow-hidden opacity-0 lg:mt-3 lg:max-h-24 lg:opacity-100"}`}>{s.outcome}</p>
                    {/* mobile: items inline under the active group */}
                    <ul className={`mt-4 space-y-2 pl-5 lg:hidden ${on ? "block" : "hidden"}`}>
                      {s.items.map((it) => <li key={it.t} className="flex gap-3 text-[14.5px] text-white"><span className="mt-[10px] h-px w-3 shrink-0 bg-white/60" />{it.t}</li>)}
                    </ul>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* detail panel (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div id={`svc-${g.id}`} role="tabpanel" className="sticky top-20">
              <div className="plate relative aspect-[16/8] border-b border-rule">
                {SERVICES.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s.id} src={s.plate} alt="" aria-hidden={i !== active} loading="eager" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`} style={i === 0 ? { opacity: i === active ? 1 : 0 } : undefined} />
                ))}
                <div className="plate-scrim" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="counter text-grey">{g.n} — {g.name.toUpperCase()}</span>
                  <p key={g.id} className="rv display-light mt-2 text-[clamp(1.3rem,2vw,1.9rem)] text-white">{g.outcome}</p>
                </div>
              </div>
              <ul key={`list-${g.id}`} className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 [&>li:last-child:nth-child(odd)]:sm:col-span-2">
                {g.items.map((it, k) => (
                  <li key={it.t} className="rv bg-black p-5" style={{ ["--rv-d" as string]: `${k * 0.06}s`, ["--rv-y" as string]: "12px" }}>
                    <p className="text-[14.5px] font-medium leading-snug text-white">{it.t}</p>
                    <p className="counter mt-2 text-[0.6rem] text-grey-dim">{it.from.toUpperCase()}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* rules on every build + the worlds */}
        <div className="mt-10 grid grid-cols-1 border-t border-rule lg:mt-16 lg:grid-cols-12">
          <div className="si py-8 lg:col-span-8 lg:border-r lg:border-rule lg:pr-10">
            <span className="label">On every build</span>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {RULES.map((r, i) => <li key={r.t} className="flex gap-4 text-[15px] leading-snug text-white"><span className="counter mt-[3px] text-grey-dim">0{i + 1}</span>{r.t}</li>)}
            </ul>
          </div>
          <div className="si border-t border-rule py-8 lg:col-span-4 lg:border-t-0 lg:pl-10" style={{ ["--si-d" as string]: "0.12s" }}>
            <span className="label">Built for</span>
            <p className="display mt-5 text-3xl text-white">Owner-led businesses.</p>
            <ul className="mt-4 space-y-2">{WORLDS.map((w, i) => <li key={w} className="flex gap-4 text-[15px] text-grey"><span className="counter mt-[3px] text-grey-dim">0{i + 1}</span>{w}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
