import { STUDIES, type Study } from "@/data/site";
import { CountUp, KineticHeading, SectionHead } from "./primitives";
import Spine from "./Spine";

/* 03 — The three case studies as numbered chapters on the SPINE: edge-to-edge screenshot grid with 1px rules,
   results as giant numerals where he states a number, the pull-quote as the chapter close. Every word verbatim. */
function Chapter({ s }: { s: Study }) {
  const headMain = s.title.split(" ").slice(0, -3).join(" ");
  const headAccent = s.title.split(" ").slice(-3).join(" ");
  return (
    <article id={`work-${s.n}`} className="relative border-t border-rule bg-black py-16 sm:py-24">
      <span className="display pointer-events-none absolute right-4 top-4 select-none text-[20vw] leading-none text-white/[0.04] sm:text-[24vw] lg:right-8" aria-hidden>{s.n}</span>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:pl-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-5">
            <div className="flex items-baseline gap-5">
              <span className="counter text-white">CASE {s.n}</span>
              <span className="label label-plain">{s.sector}</span>
            </div>
            <KineticHeading as="h3" text={headMain} accent={headAccent} className="display mt-6 text-[clamp(2.1rem,4vw,3.8rem)] text-white" />
            <p className="si mt-6 text-[16px] leading-relaxed text-grey">{s.dek}</p>
            {s.body.map((p, k) => <p key={k} className="si mt-4 text-[15px] leading-relaxed text-white/90" style={{ ["--si-d" as string]: `${0.1 + k * 0.08}s` }}>{p}</p>)}
          </header>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-rule border border-rule sm:grid-cols-2">
              {s.shots.map((sh, k) => (
                <figure key={sh.src} className="si img-card !border-0 bg-black" style={{ ["--si-d" as string]: `${k * 0.08}s` }}>
                  <div className="relative aspect-[16/10]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sh.src} alt={sh.alt} loading="eager" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <figcaption className="flex items-start justify-between gap-4 border-t border-rule px-4 py-3">
                    <span className="text-[12.5px] leading-snug text-grey">{sh.cap}</span>
                    <span className="counter shrink-0 text-[0.62rem] text-grey-dim">{s.n}.{k + 1}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ul className="grid-rules mt-10 grid gap-0 sm:grid-cols-3">
              {s.results.map((r, k) => (
                <li key={k} className="si flex flex-col py-6 sm:pr-6 lg:px-6 first:lg:pl-0" style={{ ["--si-d" as string]: `${0.15 + k * 0.1}s` }}>
                  {r.num !== undefined
                    ? <div className="num text-[clamp(3.4rem,6vw,5.6rem)] text-white"><CountUp to={r.num} /><span className="counter ml-2 align-middle text-[0.72rem] text-grey">{r.suffix?.trim().toUpperCase()}</span></div>
                    : <span className="counter text-grey-dim">{s.n}.R{k + 1}</span>}
                  <p className="mt-4 text-[14px] leading-snug text-white/90 sm:mt-auto sm:pt-4"><strong className="font-semibold text-white">{r.strong}</strong><span className="text-grey">{r.rest}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {s.pull && (
          <blockquote className="si relative mt-14 max-w-4xl border-l border-white pl-6 sm:pl-8">
            <p className="display-light text-[clamp(1.5rem,3vw,2.6rem)] text-white">{s.pull}</p>
          </blockquote>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative border-t border-rule bg-black">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-12 sm:px-8 sm:pt-24 lg:pl-24">
        <SectionHead n="03" label="The work" className="max-w-xs" />
        <KineticHeading as="h2" text="Three businesses," accent="three operating systems." className="display mt-8 max-w-5xl text-[clamp(2.6rem,6.4vw,6.2rem)] text-white" />
        <p className="si mt-6 max-w-2xl text-[16px] leading-relaxed text-grey">Field services. First-party commerce. Research and institutions. Each one its own system — built from how the business actually runs.</p>
      </div>
      <div className="relative">
        <Spine labels={["01", "02", "03"]} className="left-0 lg:left-8" />
        {STUDIES.map((s) => <Chapter key={s.n} s={s} />)}
      </div>
    </section>
  );
}
