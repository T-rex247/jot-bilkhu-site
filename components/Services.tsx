"use client";
import { useEffect, useState } from "react";
import { UI, BIZ, SERVICES, RULES, WORLDS } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* 04 — SERVICES: the regrouped structure (AUDIT.md) as a mission-control explorer. Left: four numbered rows separated by
   1px rules (hover/focus/click selects). Right: the active group's plate, full-bleed inside the column, its outcome
   bottom-left, its items as a rule-grid. Every item verbatim from the live page. */
export default function Services() {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  return (
    <section data-enhanced={enhanced} id="services" aria-label={UI.servicesLabel} className="relative overflow-hidden border-t border-rule bg-black py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="04" tone="build" label={UI.servicesLabel} className="max-w-xs" />
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <KineticHeading as="h2" text={UI.servicesHeading} accent={UI.servicesAccent} className="display text-[clamp(2.6rem,6.4vw,6.2rem)] text-white lg:col-span-8" />
          <p className="si self-end text-[16px] leading-relaxed text-grey lg:col-span-4">{UI.servicesIntro}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-rule lg:grid-cols-12">
          {/* selector */}
          <ol className="lg:col-span-5 lg:border-r lg:border-rule" aria-label={UI.serviceGroups}>
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.id} className="si border-b border-rule" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
                  <button aria-pressed={on} aria-controls={`svc-${s.id} svc-mobile-${s.id}`} onPointerEnter={e => { if (e.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) setActive(i); }} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                    className={`group relative w-full py-6 pr-4 text-left lg:pr-8 ${on ? "text-white" : "text-grey hover:text-white"}`}>
                    <span className={`absolute left-0 top-0 h-full w-px bg-white transition-transform duration-500 origin-top ${on ? "scale-y-100" : "scale-y-0"}`} aria-hidden />
                    <span className="flex items-baseline gap-5 pl-5">
                      <span className="counter text-grey">{s.n}</span>
                      <span className="display text-[clamp(1.7rem,2.8vw,2.6rem)]">{s.name}</span>
                      <span className={`ml-auto display text-xl transition-transform duration-300 ${on ? "translate-x-0 text-white" : "-translate-x-2 text-grey-dim"}`} aria-hidden>→</span>
                    </span>
                    <span className="mt-3 block pl-5 text-[14px] leading-relaxed text-grey">{s.outcome}</span>
                  </button>
                  {/* Every item is server-rendered. Without JS every group stays expanded. */}
                  <ul id={`svc-mobile-${s.id}`} className={`service-mobile mb-6 space-y-2 pl-5 lg:hidden ${enhanced && !on ? "service-inactive" : ""}`}>
                    {s.items.map((it, k) => <li key={it.t} className="si card flex gap-3 p-4 text-[14.5px] text-white" style={{ ["--si-d" as string]: `${k * 0.06}s` }}><span className="mt-[10px] h-px w-3 shrink-0 bg-white/60" />{it.t}</li>)}
                  </ul>
                </li>
              );
            })}
          </ol>

          {/* detail panel (desktop) */}
          <div className="hidden lg:col-span-7 lg:block">
            {SERVICES.map((g, i) => (
            <div key={g.id} id={`svc-${g.id}`} role="region" aria-label={g.name} hidden={enhanced && i !== active} className="service-panel sticky top-24">
              <div className="plate relative aspect-[16/8] border-b border-rule">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.plate} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <div className="plate-scrim" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="counter text-grey">{g.n} — {g.name.toUpperCase()}</span>
                  <p className="rv display-light mt-2 text-[clamp(1.3rem,2vw,1.9rem)] text-white">{g.outcome}</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 [&>li:last-child:nth-child(odd)]:sm:col-span-2">
                {g.items.map((it, k) => (
                  <li key={it.t} className="rv card polish-card p-5" style={{ ["--rv-d" as string]: `${k * 0.06}s`, ["--rv-y" as string]: "12px" }}>
                    <p className="text-[14.5px] font-medium leading-snug text-white">{it.t}</p>
                    <p className="counter mt-2 text-[0.6rem] text-grey-dim">{it.from.toUpperCase()}</p>
                  </li>
                ))}
              </ul>
            </div>
            ))}
          </div>
        </div>

        {/* rules on every build + the worlds */}
        <div className="spec-card mt-10 grid grid-cols-1 px-6 lg:mt-16 lg:grid-cols-12 lg:px-8">
          <div className="si py-8 lg:col-span-8 lg:border-r lg:border-rule lg:pr-10">
            <span className="spec-label">{BIZ.rulesLabel}</span>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {RULES.map((r, i) => <li key={r.t} className="flex gap-4 text-[15px] leading-snug text-white"><span className="counter mt-[3px] text-grey-dim">0{i + 1}</span>{r.t}</li>)}
            </ul>
          </div>
          <div className="si border-t border-rule py-8 lg:col-span-4 lg:border-t-0 lg:pl-10" style={{ ["--si-d" as string]: "0.12s" }}>
            <span className="spec-label">{BIZ.worldsLabel}</span>
            <p className="display mt-5 text-3xl text-white">{BIZ.ownerLed}</p>
            <p className="mt-5 text-[13px] text-grey"><span className="counter mr-2 text-grey-dim">{BIZ.soFarLabel.toUpperCase()}</span>{WORLDS.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
