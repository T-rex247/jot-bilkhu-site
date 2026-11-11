"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { MagneticLink } from "@/components/Motion";
import { Arrow, ContactGrid } from "@/components/Contact";
import { SITE as s } from "@/data/site";

export default function TalkModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => { root.style.overflow = ""; };
  }, [open]);

  const show = (event: MouseEvent<HTMLAnchorElement>) => {
    const dialog = ref.current;
    if (!dialog || typeof dialog.showModal !== "function") return; // no dialog support: fall back to scrolling to #start
    event.preventDefault();
    dialog.showModal();
    dialog.focus();
    setOpen(true);
  };
  const hide = () => ref.current?.close();

  return (
    <>
      <MagneticLink href={s.ui.startHref} className="talk-button" onClick={show}>{s.ui.talk}<Arrow diagonal /></MagneticLink>
      <dialog
        ref={ref}
        className="talk-modal new-world"
        tabIndex={-1}
        aria-labelledby="talk-modal-heading"
        onClose={() => setOpen(false)}
        onClick={event => { if (event.target === event.currentTarget) hide(); }}
      >
        <div className="start-panel">
          <div className="future-grid" aria-hidden="true"><span className="flow flow-one" /><span className="flow flow-two" /><span className="flow-node" /></div>
          <button type="button" className="talk-close" onClick={hide} aria-label={s.start.close}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <h2 id="talk-modal-heading">{s.start.heading}</h2>
          <p className="lets-talk">{s.start.body}</p>
          <ContactGrid />
        </div>
      </dialog>
    </>
  );
}
