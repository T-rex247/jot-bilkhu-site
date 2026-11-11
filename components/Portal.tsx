"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { animate, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// The way in, Apple-style: the scene stays pinned and the scroll drives one
// change at a time. The camera eases toward the window while the headline
// leaves, the office dissolves into the clean space, then the outcome line
// arrives word by word.

const ramp = (a: number, b: number, from: number, to: number) => (v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  const e = t * t * (3 - 2 * t);
  return from + (to - from) * e;
};

// One gesture plays the whole way in. The first wheel turn, swipe or arrow
// key inside the scene starts the transition and runs it to the end; input is
// held while it plays (and until trackpad momentum dies out) so it can't stutter.
let playing = false;
let lastWheel = 0;
let holdMomentum = false;
const portalEnd = () => {
  const el = document.querySelector<HTMLElement>(".portal");
  return el ? el.offsetTop + el.offsetHeight - window.innerHeight : 0;
};
function playTo(to: number, duration: number) {
  if (playing) return;
  playing = true;
  document.documentElement.style.scrollBehavior = "auto";
  animate(window.scrollY, to, {
    duration, ease: [0.45, 0, 0.25, 1],
    onUpdate: (v) => window.scrollTo(0, v),
    onComplete: () => { playing = false; holdMomentum = true; },
  });
}
// Down from anywhere before the end plays forward; up from inside plays back.
function intent(dir: 1 | -1) {
  const end = portalEnd(), y = window.scrollY;
  if (dir > 0 && y < end - 2) { playTo(end, 2.6); return true; }
  if (dir < 0 && y > 2 && y <= end + 2) { playTo(0, 1.8); return true; }
  return false;
}

function useOneGesture(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now(), gap = now - lastWheel; lastWheel = now;
      if (playing) { e.preventDefault(); return; }
      if (holdMomentum) { if (gap < 220) { e.preventDefault(); return; } holdMomentum = false; }
      if (Math.abs(e.deltaY) < 1) return;
      if (intent(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };
    let startY = 0, fired = false;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; fired = false; holdMomentum = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (playing || fired) { if (playing) e.preventDefault(); return; }
      const dy = startY - e.touches[0].clientY;
      if (Math.abs(dy) < 6) return;
      if (intent(dy > 0 ? 1 : -1)) { fired = true; e.preventDefault(); }
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (playing && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Space"].includes(e.key)) { e.preventDefault(); return; }
      const dir = ["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey ? 1
        : ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey) ? -1 : 0;
      if (dir && intent(dir as 1 | -1)) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);
}

function Desk() {
  return (
    <div className="room-desk">
      <picture>
        <source media="(max-width: 767px)" srcSet="/hero/desk-phone.webp" />
        <img src="/hero/desk-1920.webp" srcSet="/hero/desk-1920.webp 1920w, /hero/desk.webp 2560w" sizes="100vw"
          alt="" width={2560} height={1344} loading="eager" fetchPriority="high" decoding="async" />
      </picture>
      <div className="room-desk-shade" />
    </div>
  );
}

export type Line = { readonly text: string; readonly accent: boolean };

function LineIn({ p, i, n, line }: { p: MotionValue<number>; i: number; n: number; line: Line }) {
  const start = 0.56 + (i / n) * 0.3;
  const opacity = useTransform(p, ramp(start, start + 0.08, 0, 1));
  const y = useTransform(p, ramp(start, start + 0.1, 22, 0));
  return <motion.span className={line.accent ? "l accent" : "l"} style={{ opacity, y }}>{line.text}</motion.span>;
}

function Outro({ p, lines, signature }: { p: MotionValue<number>; lines: readonly Line[]; signature?: string }) {
  const n = lines.length + (signature ? 1 : 0);
  const start = 0.56 + (lines.length / n) * 0.3;
  const sigOpacity = useTransform(p, ramp(start, start + 0.08, 0, 1));
  const sigY = useTransform(p, ramp(start, start + 0.1, 22, 0));
  return (
    <section id="what" className="portal-outro shell" aria-labelledby="what-heading">
      <h2 id="what-heading" className="outro-heading">
        {lines.map((l, i) => <LineIn key={i} p={p} i={i} n={n} line={l} />)}
      </h2>
      {signature && <motion.p className="outro-sig" style={{ opacity: sigOpacity, y: sigY }}>{signature}</motion.p>}
    </section>
  );
}

export default function Portal({ children, lines, signature }: { children: ReactNode; lines: readonly Line[]; signature?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useOneGesture(!reduced);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const zoom = useTransform(p, ramp(0, 0.55, 1, 1.32));
  const copyOpacity = useTransform(p, ramp(0, 0.18, 1, 0));
  const copyY = useTransform(p, ramp(0, 0.22, 0, -24));
  const white = useTransform(p, ramp(0.36, 0.56, 0, 1));

  if (reduced) {
    return (
      <div className="portal portal-still">
        <div className="portal-stage"><div className="room"><Desk /></div>{children}</div>
        <div className="new-world portal-outro-still">
          <section id="what" className="portal-outro shell" aria-labelledby="what-heading">
            <h2 id="what-heading" className="outro-heading">{lines.map((l, i) => <span key={i} className={l.accent ? "l accent" : "l"}>{l.text}</span>)}</h2>
            {signature && <p className="outro-sig">{signature}</p>}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="portal">
      <div className="portal-stage">
        <div className="room" aria-hidden="true">
          <motion.div className="portal-img" style={{ scale: zoom }}><Desk /></motion.div>
        </div>
        <motion.div className="portal-copy" style={{ opacity: copyOpacity, y: copyY }}>{children}</motion.div>
        <motion.div className="portal-white" style={{ opacity: white }} aria-hidden="true" />
        <Outro p={p} lines={lines} signature={signature} />
      </div>
    </div>
  );
}

// "Come inside" plays the whole sequence at a calm, fixed pace.
export function ComeInside({ className, children }: { className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !document.querySelector(".portal")) return;
    e.preventDefault();
    playTo(portalEnd(), 2.6);
  };
  return <a href="#what" className={className} onClick={onClick}>{children}</a>;
}
