import { MagneticLink, Reveal } from "@/components/Motion";
import { SITE as s } from "@/data/site";
import type { ReactNode } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="arrow"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const SMS_HREF = `sms:${s.PHONE_TEL}?&body=${encodeURIComponent(s.start.smsBody)}`;
const MAIL_HREF = `mailto:${s.EMAIL}?subject=${encodeURIComponent(s.start.emailSubject)}&body=${encodeURIComponent(s.start.emailBody)}`;

export function ContactGrid({ reveal = false }: { reveal?: boolean }) {
  const wrap = (node: ReactNode, delay: number) => (reveal ? <Reveal delay={delay}>{node}</Reveal> : <div>{node}</div>);
  return (
    <div className="contact-grid">
      {wrap(<MagneticLink className="contact-button contact-book" href={s.BOOK_HREF} external><span>{s.start.book}</span><Arrow diagonal /></MagneticLink>, 0.1)}
      {wrap(<MagneticLink className="contact-button" href={`tel:${s.PHONE_TEL}`}><span><strong>{s.start.phone}</strong><small>{s.PHONE_DISPLAY}</small></span><Arrow diagonal /></MagneticLink>, 0.16)}
      {wrap(<MagneticLink className="contact-button" href={SMS_HREF}><span><strong>{s.start.text}</strong><small>{s.PHONE_DISPLAY}</small></span><Arrow diagonal /></MagneticLink>, 0.22)}
      {wrap(<MagneticLink className="contact-button" href={MAIL_HREF}><span><strong>{s.start.email}</strong><small>{s.EMAIL}</small></span><Arrow diagonal /></MagneticLink>, 0.28)}
    </div>
  );
}
