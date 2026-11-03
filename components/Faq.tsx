import { FAQ } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

export default function Faq() {
  return (
    <section id="faq" className="sec-light sec-grid border-t border-rule py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="07" label={FAQ.label} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <KineticHeading text={FAQ.h} className="display text-[clamp(2.6rem,6.4vw,6.2rem)]" />
          <div className="space-y-3">
            {FAQ.items.map(({ q, a }) => (
              <details key={q} className="faq-row card p-5 sm:p-7">
                <summary><span className="display text-xl sm:text-2xl">{q}</span><span aria-hidden className="faq-plus">+</span></summary>
                <p className="mt-5 max-w-2xl pr-4 text-[15px] leading-relaxed text-grey">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
