"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";

// The way in. The desk scene holds in place and is set down like a print
// (scales back, corners round, dims) while the new world glides up over it.

const ramp = (a: number, b: number, from: number, to: number) => (v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return from + (to - from) * t;
};

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

export default function Portal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(p, ramp(0, 1, 1, 0.9));
  const radius = useTransform(p, ramp(0, 0.5, 0, 28));
  const dim = useTransform(p, ramp(0.1, 1, 0, 0.55));
  const imgScale = useTransform(p, ramp(0, 1, 1, 1.06));
  const copyOpacity = useTransform(p, ramp(0, 0.45, 1, 0));
  const copyY = useTransform(p, ramp(0, 0.6, 0, -40));
  const borderRadius = useMotionTemplate`${radius}px`;

  if (reduced) {
    return <div className="portal portal-still"><div className="portal-stage"><div className="room"><Desk /></div>{children}</div></div>;
  }

  return (
    <div ref={ref} className="portal">
      <div className="portal-stage">
        <motion.div className="portal-card" style={{ scale, borderRadius }}>
          <div className="room" aria-hidden="true">
            <motion.div className="portal-img" style={{ scale: imgScale }}><Desk /></motion.div>
            <div className="room-grain" />
            <motion.div className="room-dim" style={{ opacity: dim }} />
          </div>
          <motion.div className="portal-copy" style={{ opacity: copyOpacity, y: copyY }}>{children}</motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// "Come inside" eases down to the new world instead of jumping.
export function ComeInside({ className, children }: { className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("what");
    if (!target || reduced) return;
    e.preventDefault();
    const to = target.getBoundingClientRect().top + window.scrollY;
    animate(window.scrollY, to, { duration: 1.6, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => window.scrollTo(0, v) });
  };
  return <a href="#what" className={className} onClick={onClick}>{children}</a>;
}
