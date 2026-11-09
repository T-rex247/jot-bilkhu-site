import Image from "next/image";
import RoomBackground from "@/components/RoomBackground";
import { MagneticLink, Portrait, Process, Reveal, TiltCard, Typewriter } from "@/components/Motion";
import { SITE as s } from "@/data/site";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="arrow"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionMark({ number }: { number: string }) {
  return <span className="section-mark" aria-hidden="true"><span>{number}</span><span /></span>;
}

export default function Page() {
  return (
    <>
      <RoomBackground />
      <a className="skip-link" href={s.ui.mainHref}>{s.ui.skip}</a>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="wordmark" href={s.ui.mainHref} aria-label={s.ui.home}>
            <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
            <span><strong>{s.name}</strong><span>{s.studio}</span></span>
          </a>
          <MagneticLink href={s.ui.startHref} className="talk-button">{s.ui.talk}<Arrow diagonal /></MagneticLink>
        </div>
      </header>
      <main id="main">
        <section className="opening shell" aria-labelledby="opening-heading">
          <div className="opening-content">
            <span className="opening-rule" aria-hidden="true" />
            <h1 id="opening-heading"><Typewriter text={s.opening.heading} /></h1>
            <Reveal delay={0.2}><p className="opening-subtitle">{s.opening.body} <span className="opening-honey">{s.opening.bodyAccent}</span></p></Reveal>
          </div>
          <a href={s.ui.scrollHref} className="scroll-cue"><span className="scroll-line" aria-hidden="true" />{s.ui.scroll}<span aria-hidden="true">↓</span></a>
          <div className="opening-corners" aria-hidden="true" />
        </section>

        <section id="what" className="what-section shell section" aria-labelledby="what-heading">
          <Reveal className="what-paper">
            <SectionMark number="01" />
            <h2 id="what-heading" className="serif">{s.what.heading}</h2>
            <p>{s.what.body}</p>
            <span className="paper-corner" aria-hidden="true" />
          </Reveal>
        </section>

        <section id="how" className="how-section shell section" aria-labelledby="how-heading">
          <Reveal className="section-intro"><SectionMark number="02" /><h2 id="how-heading">{s.how.heading}</h2></Reveal>
          <Process steps={s.how.steps} />
        </section>

        <section id="about" className="about-section shell section" aria-labelledby="about-heading">
          <Reveal className="portrait-wrap">
            <Portrait><Image {...s.about.image} sizes="(max-width: 767px) 85vw, 420px" loading="lazy" /></Portrait>
          </Reveal>
          <div className="about-copy">
            <Reveal><SectionMark number="03" /><h2 id="about-heading">{s.about.heading}</h2></Reveal>
            <Reveal delay={0.08}>
              <p>{s.about.intro}</p>
              <a className="text-link" href={s.PORTFOLIO_HREF} target="_blank" rel="noopener noreferrer">{s.about.portfolio}<Arrow diagonal /></a>
            </Reveal>
            <Reveal delay={0.14}><p>{s.about.body}</p></Reveal>
            <Reveal delay={0.2}><p className="about-strengths">{s.about.strengths}</p></Reveal>
          </div>
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
            <div className="contact-grid">
              <Reveal delay={0.1}><MagneticLink className="contact-button contact-book" href={s.BOOK_HREF} external><span>{s.start.book}</span><Arrow diagonal /></MagneticLink></Reveal>
              <Reveal delay={0.16}><MagneticLink className="contact-button" href={`tel:${s.PHONE_TEL}`}><span><strong>{s.start.phone}</strong><small>{s.PHONE_DISPLAY}</small></span><Arrow diagonal /></MagneticLink></Reveal>
              <Reveal delay={0.22}><MagneticLink className="contact-button" href={`mailto:${s.EMAIL}`}><span><strong>{s.start.email}</strong><small>{s.EMAIL}</small></span><Arrow diagonal /></MagneticLink></Reveal>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer shell"><Reveal><p>{s.brand} · {s.location}</p><span>{new Date().getFullYear()}</span></Reveal></footer>
    </>
  );
}
