import { DAY } from "@/data/site";
import { KineticHeading, SectionHead } from "./primitives";

/* 01 — "A day right now": full-bleed night-console plate, text bottom-left, his four pains as a numbered rule-grid. */
export default function Day() {
  return (
    <section id="day" className="relative overflow-hidden bg-black">
      <div className="plate relative min-h-[88svh]">
        <div className="absolute -inset-y-10 inset-x-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/concept/day.webp" alt="A paper bid, a pencil and a calculator on a dark console at night, the clock past nine" loading="eager" className="kenburns h-full w-full object-cover" />
        </div>
        <div className="plate-scrim" />
        <div className="plate-scrim-l" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
          <SectionHead n="01" label={DAY.label} className="max-w-xs" />
          <KineticHeading as="h2" text="It’s 9pm and you’re still at" accent="the kitchen table." className="display mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6.6rem)] text-white" />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <ol className="grid-rules grid grid-cols-1 lg:grid-cols-4">
          {DAY.lines.map((l, i) => (
            <li key={i} className="si py-7 lg:px-6 lg:py-10 first:lg:pl-0" style={{ ["--si-d" as string]: `${i * 0.08}s` }}>
              <span className="counter text-white">0{i + 1}</span>
              <p className="mt-4 text-[16px] leading-relaxed text-white/90">{l}</p>
            </li>
          ))}
        </ol>
        <div className="rule" />
        <p className="si display-light max-w-4xl py-10 text-[clamp(1.5rem,3.2vw,2.8rem)] text-grey sm:py-14">{DAY.close}</p>
      </div>
    </section>
  );
}
