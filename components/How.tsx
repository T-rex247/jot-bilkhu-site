import { UI, HOW, BIZ, FIRST_BUILD } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* Three steps on white cards; the first step retains the review CTA. */
const TONES = ["tone-review", "tone-build", "tone-run"];

export default function How() {
  return (
    <section id="how" className="relative overflow-hidden border-t border-rule bg-ink py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="05" label={HOW.label} className="max-w-xs" />
        <KineticHeading as="h2" text={UI.howHeading} accent={UI.howAccent} className="display mt-8 max-w-5xl text-[clamp(2.6rem,6.4vw,6.2rem)] text-white" />
        <ol className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {HOW.steps.map((s, i) => (
            <li key={s.n} className={`si sec-light card how-card ${TONES[i]} relative p-6 sm:p-8`} style={{ ["--si-d" as string]: `${i * 0.12}s` }}>
              <span className="mono tone-text block text-sm">0{s.n}</span>
              <h3 className="display mt-6 text-[clamp(1.5rem,2.4vw,2.2rem)] text-white">{s.t}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-grey">{s.d}</p>
              {i === 0 && <a href={BIZ.bookHref} className="btn btn-solid mt-6 w-full !px-3 !py-3.5 !text-[0.72rem]">{BIZ.cta} →</a>}
            </li>
          ))}
        </ol>
        {/* Jot 6310/6318: what the first working piece includes */}
        <div className="si tone-build mt-10 rounded-[14px] border border-rule p-6 sm:p-8">
          <p className="counter tone-text text-[0.72rem] tracking-[0.18em]" style={{ color: "var(--tone)" }}>{FIRST_BUILD.label.toUpperCase()}</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            {FIRST_BUILD.items.map((it) => (
              <li key={it.t} className="border-t pt-4 tone-rule">
                <h3 className="display text-[1.15rem] leading-tight text-white">{it.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-grey">{it.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-white/90">{FIRST_BUILD.note}</p>
        </div>
      </div>
    </section>
  );
}
