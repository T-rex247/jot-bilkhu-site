import { UI, CLOSING, BIZ } from "@/data/site";
import { Magnetic, KineticHeading, Parallax, SectionHead } from "./primitives";

/* Closing photo plate followed by three labelled contact cards. */
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
          <SectionHead n="08" tone="review" label={UI.closingLabel} className="max-w-xs" />
          <KineticHeading as="h2" text={UI.closingHeading} accent={UI.closingAccent} className="display mt-8 max-w-5xl text-[clamp(2.8rem,8vw,7.6rem)] text-white" />
          <p className="si mt-7 max-w-2xl text-[16px] leading-relaxed text-white/85">{CLOSING.p}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic href={BIZ.bookHref} className="btn btn-solid w-full sm:w-auto">{BIZ.cta}</Magnetic>
            <a href={BIZ.phoneHref} className="btn btn-ghost w-full sm:w-auto">{UI.callPrefix} {BIZ.phone}</a>
          </div>
          <p className="mt-5 max-w-md text-[13px] text-grey">{BIZ.ctaNote}</p>
        </div>
      </div>

      <div id="contact" className="relative border-t border-rule bg-black">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-3">
            <div className="card p-6">
              <span className="counter uppercase text-grey">{CLOSING.talk}</span>
              <p className="mt-3 text-[15px] font-medium text-white">{BIZ.brand}</p>
              <p className="counter mt-2 text-grey">{BIZ.city.toUpperCase()}</p>
            </div>
            <a href={BIZ.phoneHref} className="si card group p-6">
              <span className="counter text-grey">{UI.phoneLabel}</span>
              <p className="display mt-3 text-3xl text-white group-hover:text-grey sm:text-4xl">{BIZ.phone}</p>
            </a>
            <a href={BIZ.emailHref} className="si card group p-6" style={{ ["--si-d" as string]: "0.1s" }}>
              <span className="counter text-grey">{UI.emailLabel}</span>
              <p className="display mt-3 break-all text-2xl normal-case text-white group-hover:text-grey sm:text-3xl">{BIZ.email}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
