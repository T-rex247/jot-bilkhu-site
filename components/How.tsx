import { UI, HOW, BIZ } from "@/data/site";
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
      </div>
    </section>
  );
}
