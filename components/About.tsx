import { UI, ABOUT } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* Existing portrait and copy, with three light thread cards. */
export default function About() {
  return (
    <section id="about" className="sec-light relative overflow-hidden border-t border-rule bg-black">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-rule lg:col-span-5 lg:border-b-0 lg:border-r">
          <figure className="plate img-card relative aspect-[4/5] !border-0 lg:h-full lg:min-h-[78svh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jot-headshot.jpg" alt={UI.aboutAlt} width={1280} height={1219} loading="eager" className="absolute inset-0 h-full w-full object-cover" />
            <div className="plate-scrim" />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
              <div>
                <span className="text-[13px] italic text-grey">{UI.pronunciation}</span>
                <p className="mt-1 text-[15px] font-medium text-white">{UI.aboutCaption}</p>
              </div>
              <span className="counter shrink-0 text-grey">{UI.aboutFigure}</span>
            </figcaption>
          </figure>
        </div>
        <div className="px-5 py-16 sm:px-8 sm:py-24 lg:col-span-7 lg:pl-14">
          <SectionHead n="06" label={ABOUT.label} className="max-w-xs" />
          <KineticHeading as="h2" text={UI.aboutHeading} accent={UI.aboutAccent} className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-white" />
          <p className="si mt-8 max-w-2xl text-[16px] leading-relaxed text-grey">{ABOUT.text.split("{pron}")[0]}<em>{ABOUT.pron}</em>{ABOUT.text.split("{pron}")[1]}</p>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ABOUT.threads.map((t, i) => (
              <li key={t} className="si card p-5" style={{ ["--si-d" as string]: `${i * 0.1}s` }}>
                <span className="counter text-grey-dim">0{i + 1}</span>
                <p className="mt-3 text-[14.5px] leading-snug text-white">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
