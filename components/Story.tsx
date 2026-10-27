import { STORY } from "@/data/site";
import { Parallax, KineticHeading, SectionHead } from "./primitives";

/* 02 — "My story": the foundation-site plate edge-to-edge on the right, stark type block on the left, the pull-quote oversized. */
export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden border-t border-rule bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="order-2 mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:order-1 lg:col-span-6 lg:pr-14">
          <SectionHead n="02" label={STORY.label} className="max-w-xs" />
          <KineticHeading as="h2" text="My family runs a" accent="waterproofing company." className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-white" />
          <p className="si mt-8 max-w-xl text-[16px] leading-relaxed text-grey">{STORY.p1}</p>
          <p className="si mt-4 max-w-xl text-[16px] leading-relaxed text-white">{STORY.p2}</p>
          <blockquote className="si si-hair mt-10 max-w-xl border-l border-white pl-6">
            <p className="display-light text-[clamp(1.4rem,2.4vw,2rem)] text-white">{STORY.pull}</p>
            <div className="hair mt-5 w-16" />
          </blockquote>
          <p className="si label mt-8 !text-white">{STORY.p3}</p>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Parallax speed={-0.05} className="h-full">
            <figure className="plate img-card relative h-[56svh] border-0 border-b border-rule lg:h-full lg:min-h-[80svh] lg:border-b-0 lg:border-l">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/concept/story.webp" alt="A basement foundation wall mid-repair with a fresh waterproofing membrane and a drainage trench" loading="eager" className="absolute inset-0 h-full w-full object-cover" />
              <div className="plate-scrim" />
              <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                <span className="max-w-sm text-[13px] text-white/80">Waterproofing and foundation repair — the family business the first system was built for.</span>
                <span className="counter shrink-0 text-grey">FIG. 02</span>
              </figcaption>
            </figure>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
