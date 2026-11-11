import Image from "next/image";
import Portal, { ComeInside } from "@/components/Portal";
import { NewWorld, Portrait, Process, Reveal, TiltCard, Typewriter } from "@/components/Motion";
import { SITE as s } from "@/data/site";
import { Arrow, ContactGrid } from "@/components/Contact";
import TalkModal from "@/components/TalkModal";

function SectionMark({ number }: { number: string }) {
  return <span className="section-mark" aria-hidden="true"><span>{number}</span><span /></span>;
}

export default function Page() {
  return (
    <>
      <a className="skip-link" href={s.ui.mainHref}>{s.ui.skip}</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="wordmark" href={s.ui.mainHref} aria-label={s.ui.home}>
            <span className="brand-text"><strong>{s.name.toLowerCase()}<span className="brand-dot" aria-hidden="true">.</span></strong><span className="brand-studio">{s.studio.toLowerCase()}</span></span>
          </a>
          <TalkModal />
        </div>
      </header>
      <main id="main">
        <Portal lines={s.what.lines}>
        <section className="opening shell" aria-labelledby="opening-heading">
          <div className="opening-content">
            <span className="opening-rule" aria-hidden="true" />
            <h1 id="opening-heading"><Typewriter text={s.opening.heading} /></h1>
            <Reveal delay={0.2}><p className="opening-subtitle">{s.opening.body}</p></Reveal>
          </div>
          <ComeInside className="scroll-cue"><span className="scroll-line" aria-hidden="true" /><span className="outcome-text">{s.ui.scroll}</span><span className="outcome-arrow" aria-hidden="true">↓</span></ComeInside>
          <div className="opening-corners" aria-hidden="true" />
        </section>
        </Portal>

        <NewWorld>

        <section id="about" className="about-section shell section" aria-labelledby="about-heading">
          <Reveal className="portrait-wrap">
            <Portrait><Image {...s.about.image} sizes="(max-width: 767px) 85vw, 420px" priority /></Portrait>
          </Reveal>
          <div className="about-copy">
            <Reveal><SectionMark number="02" /><h2 id="about-heading">{s.about.heading}</h2></Reveal>
            {s.about.paragraphs.map((para, i) => <Reveal key={i} delay={0.06 * (i + 1)}><p>{para}</p></Reveal>)}
            <Reveal delay={0.3}>
              <p className="about-readon">{s.about.readOn}</p>
            </Reveal>
          </div>
        </section>

        <section id="how" className="how-section shell section" aria-labelledby="how-heading">
          <Reveal className="section-intro"><SectionMark number="03" /><h2 id="how-heading">{s.how.heading}</h2></Reveal>
          <Process steps={s.how.steps} />
        </section>

        <section id="work" className="work-section shell section" aria-labelledby="work-heading">
          <Reveal><SectionMark number="04" /><h2 id="work-heading">{s.work.heading}</h2></Reveal>
          <div className="work-grid">
            {s.work.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.1}>
                <TiltCard>
                  <div className="work-image"><Image {...card.image} width={1600} height={1000} sizes="(max-width: 767px) 90vw, 33vw" loading="lazy" /></div>
                  <div className="work-copy"><h3>{card.title}</h3><p>{card.body}</p></div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="hunch" className="hunch-section shell section" aria-labelledby="hunch-heading">
          <Reveal className="hunch-heading"><SectionMark number="05" /><h2 id="hunch-heading">{s.hunch.heading}</h2></Reveal>
          <Reveal delay={0.12}><p>{s.hunch.body}</p></Reveal>
        </section>

        <section id="start" className="start-section shell section" aria-labelledby="start-heading">
          <div className="start-panel">
            <div className="future-grid" aria-hidden="true"><span className="flow flow-one" /><span className="flow flow-two" /><span className="flow-node" /></div>
            <Reveal><SectionMark number="06" /><h2 id="start-heading">{s.start.heading}</h2></Reveal>
            <Reveal delay={0.1}><p className="lets-talk">{s.start.body}</p></Reveal>
            <ContactGrid reveal />
            <Reveal delay={0.28} className="start-more">
              <p>{s.about.background}</p>
              <a className="text-link" href={s.PORTFOLIO_HREF} target="_blank" rel="noopener noreferrer">{s.about.portfolio}<Arrow diagonal /></a>
            </Reveal>
          </div>
        </section>
        <footer className="footer shell"><Reveal><p>{s.brand} · {s.location}</p><span>{new Date().getFullYear()}</span></Reveal></footer>
        </NewWorld>
      </main>
    </>
  );
}
