import { FAQ, FAQ_LABEL } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* 07 — Questions: the four things an owner asks before booking. Plain hairline rows, always open, no accordion to tap through. */
export default function Faq() {
  return (
    <section id="faq" className="relative border-t border-rule bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHead n="07" label={FAQ_LABEL} className="max-w-xs" />
        <KineticHeading as="h2" text="Before you" accent="book." className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-white" />
        <dl className="mt-12 border-b border-rule">
          {FAQ.map((f, i) => (
            <div key={f.q} className="si grid grid-cols-1 gap-2 border-t border-rule py-6 md:grid-cols-2 md:gap-10 md:py-8" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
              <dt className="display text-[clamp(1.35rem,2.2vw,1.9rem)] text-white">{f.q}</dt>
              <dd className="max-w-xl text-[16px] leading-relaxed text-grey">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
