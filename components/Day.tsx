import { UI, DAY } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* The day: light type panel, existing photo and four rounded pain cards. */
export default function Day() {
  return (
    <section id="day" aria-label={DAY.label} className="sec-light relative overflow-hidden bg-black">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead n="01" tone="problem" label={DAY.label} />
          <KineticHeading as="h2" text={UI.dayHeading} accent={UI.dayAccent} className="display mt-8 text-[clamp(2.6rem,5.8vw,5.6rem)] text-white" />
        </div>
        <figure className="plate img-card relative aspect-[4/3] rounded-[14px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/concept/day.webp" alt={UI.dayAlt} loading="lazy" decoding="async" className="kenburns absolute inset-0 h-full w-full object-cover" />
          <div className="plate-scrim" />
        </figure>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <ol className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {DAY.lines.map((l, i) => (
            <li key={i} className="si card polish-card tone-problem p-6 lg:py-8" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
              <span className="counter text-white">0{i + 1}</span>
              <p className="mt-4 text-[16px] leading-relaxed text-white/90">{l}</p>
            </li>
          ))}
        </ol>
        <div className="rule" />
        <p className="si display-light max-w-4xl py-10 text-[clamp(1.5rem,3.2vw,2.8rem)] text-grey sm:py-14">{DAY.close}</p>
        {/* the "after" (Jot 6301/6307): the same four moments, solved */}
        <p className="counter pt-2 text-[0.72rem] tracking-[0.18em] text-white/70">{DAY.afterLabel.toUpperCase()}</p>
        <ol className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {DAY.after.map((l, i) => (
            <li key={i} className="si card polish-card day-after tone-run p-6 lg:py-8" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
              <span className="counter accent-text">0{i + 1}</span>
              <p className="mt-4 text-[16px] leading-relaxed text-white/90">{l}</p>
            </li>
          ))}
        </ol>
        <p className="si display-light max-w-4xl pb-14 pt-4 text-[clamp(1.5rem,3.2vw,2.8rem)] text-white sm:pb-20">{DAY.afterClose}</p>
      </div>
    </section>
  );
}
