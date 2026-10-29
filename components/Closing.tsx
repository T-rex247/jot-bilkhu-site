import { CLOSING, BIZ } from "@/data/site";
import { Magnetic, KineticHeading, Parallax, SectionHead } from "./primitives";

/* 07 — Closing CTA: full-bleed dawn command-center plate, text bottom-left, the same mailto CTA; then the contact band as rule rows. */
export default function Closing() {
  return (
    <section id="book" className="relative overflow-hidden border-t border-rule bg-black">
      <div className="plate relative min-h-[92svh] text-white">
        <Parallax speed={-0.06} className="absolute inset-0">
          <div className="absolute -inset-y-16 inset-x-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/concept/close.webp" alt="" aria-hidden loading="eager" className="kenburns h-full w-full object-cover" />
          </div>
        </Parallax>
        <div className="plate-scrim" />
        <div className="plate-scrim-l" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
          <SectionHead n="07" tone="review" label="Next step" className="max-w-xs" />
          <KineticHeading as="h2" text="Start with an" accent="Operating Review." className="display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7.6rem)] text-white" />
          <p className="si mt-7 max-w-2xl text-[16px] leading-relaxed text-white/85">{CLOSING.p}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic href={BIZ.bookHref} className="btn btn-solid w-full sm:w-auto">{BIZ.cta}</Magnetic>
            <a href={BIZ.phoneHref} className="btn btn-ghost w-full sm:w-auto">Call or text {BIZ.phone}</a>
          </div>
          <p className="mt-5 max-w-md text-[13px] text-grey">{BIZ.ctaNote}</p>
        </div>
      </div>

      <div id="contact" className="relative border-t border-rule bg-black">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="py-10 lg:col-span-4 lg:border-r lg:border-rule">
              <span className="label">{CLOSING.talk}</span>
              <p className="display mt-4 text-4xl text-white">{BIZ.name}</p>
              <p className="counter mt-2 text-grey">{BIZ.city.toUpperCase()}</p>
            </div>
            <a href={BIZ.phoneHref} className="si group border-t border-rule py-10 lg:col-span-4 lg:border-r lg:border-t-0 lg:px-8">
              <span className="counter text-grey">CALL OR TEXT</span>
              <p className="display mt-3 text-3xl text-white group-hover:text-grey sm:text-4xl">{BIZ.phone}</p>
            </a>
            <a href={BIZ.emailHref} className="si group border-t border-rule py-10 lg:col-span-4 lg:border-t-0 lg:pl-8" style={{ ["--si-d" as string]: "0.1s" }}>
              <span className="counter text-grey">EMAIL</span>
              <p className="display mt-3 break-all text-2xl normal-case text-white group-hover:text-grey sm:text-3xl">{BIZ.email}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
