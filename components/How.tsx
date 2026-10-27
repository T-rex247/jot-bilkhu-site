import { HOW, BIZ } from "@/data/site";
import { KineticHeading, Parallax, SectionHead } from "./primitives";

/* 05 — "How it works": three giant numerals on a rule-grid over the Operating-Review table plate; step 1 carries the CTA. */
export default function How() {
  return (
    <section id="how" className="relative overflow-hidden border-t border-rule bg-black py-16 sm:py-24">
      <Parallax speed={-0.08} className="absolute inset-0">
        <div className="absolute -inset-y-16 inset-x-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/concept/how.webp" alt="" aria-hidden loading="eager" className="kenburns h-full w-full object-cover opacity-55" />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="05" label={HOW.label} className="max-w-xs" />
        <KineticHeading as="h2" text="One session." accent="Then one piece at a time." className="display mt-8 max-w-5xl text-[clamp(2.6rem,6.4vw,6.2rem)] text-white" />
        <ol className="grid-rules mt-14 grid grid-cols-1 border-b border-rule md:grid-cols-3">
          {HOW.steps.map((s, i) => (
            <li key={s.n} className="si relative py-8 md:px-8 first:md:pl-0" style={{ ["--si-d" as string]: `${i * 0.12}s` }}>
              <span className="num block text-[clamp(4rem,8vw,7.5rem)] text-white">0{s.n}</span>
              <h3 className="display mt-6 text-[clamp(1.5rem,2.4vw,2.2rem)] text-white">{s.t}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-grey">{s.d}</p>
              {i === 0 && <a href={BIZ.bookHref} className="btn btn-solid mt-6 !px-5 !py-3.5 !text-[0.72rem]">{BIZ.cta} →</a>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
