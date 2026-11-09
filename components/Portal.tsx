"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { animate, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";

const RAYS = Array.from({ length: 18 }, (_, i) => ({ a: i * 20 + (i % 3) * 7, d: 30 + ((i * 37) % 26), w: i % 2 ? 2 : 3 }));

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

// The way in. The desk and the headline hold still while you scroll, then spin
// and fall into a point of light; the new world opens out of that spark.
export default function Portal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const spin = useTransform(p, [0, 0.62], [0, -38]);
  const zoom = useTransform(p, [0, 0.62], [1, 2.6]);
  const blurPx = useTransform(p, [0.12, 0.6], [0, 10]);
  const world = useTransform(p, (v) => Math.min(1, Math.max(0, (0.66 - v) / 0.21)));
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const dim = useTransform(p, [0, 0.45], [0, 0.55]);

  const sparkScale = useTransform(p, [0.14, 0.42, 0.6], [0, 1, 1.4]);
  const sparkOpacity = useTransform(p, [0.14, 0.24, 0.62, 0.76], [0, 1, 1, 0]);
  const raySpin = useTransform(p, [0.14, 0.8], [0, 220]);
  const burst = useTransform(p, [0.22, 0.6], [0, 1]);
  const rayOpacity = useTransform(p, [0.22, 0.32, 0.55, 0.66], [0, 1, 1, 0]);

  const iris = useTransform(p, [0.34, 0.74], [0, 1]);
  const ringSpin = useTransform(p, [0.34, 0.78], [-200, 0]);
  const ringOpacity = useTransform(p, [0.34, 0.4, 0.7, 0.78], [0, 1, 1, 0]);

  const stage = useTransform(p, [0.76, 0.86], [1, 0]);
  const stageVis = useTransform(p, (v) => (v > 0.86 ? "hidden" : "visible"));

  if (reduced) {
    return <div className="portal portal-still"><div className="portal-stage"><div className="room"><Desk /></div>{children}</div></div>;
  }

  return (
    <div ref={ref} className="portal">
      <motion.div className="portal-stage" style={{ opacity: stage, visibility: stageVis }}>
        <motion.div className="portal-world" style={{ rotate: spin, scale: zoom, opacity: world, filter }}>
          <div className="room" aria-hidden="true">
            <Desk />
            <div className="room-grain" style={{ opacity: 0.06 }} />
            <motion.div className="room-dim" style={{ opacity: dim }} />
          </div>
          {children}
        </motion.div>
        <div className="portal-fx" aria-hidden="true">
          <motion.div className="portal-rays" style={{ rotate: raySpin, opacity: rayOpacity, ["--burst" as string]: burst }}>
            {RAYS.map((r, i) => (
              <span key={i} style={{ ["--a" as string]: `${r.a}deg`, ["--d" as string]: `${r.d}vmax`, width: r.w * 26, height: r.w }} />
            ))}
          </motion.div>
          <motion.div className="portal-spark" style={{ scale: sparkScale, opacity: sparkOpacity }} />
          <motion.div className="portal-ring" style={{ scale: iris, rotate: ringSpin, opacity: ringOpacity }} />
          <motion.div className="portal-iris" style={{ scale: iris }} />
        </div>
      </motion.div>
    </div>
  );
}

// "Come inside" plays the way in rather than jumping past it.
export function ComeInside({ className, children }: { className?: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("what");
    if (!target || reduced) return;
    e.preventDefault();
    const to = target.getBoundingClientRect().top + window.scrollY;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    animate(window.scrollY, to, {
      duration: 3.6, ease: [0.3, 0, 0.25, 1],
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: () => { root.style.scrollBehavior = prev; },
    });
  };
  return <a href="#what" className={className} onClick={onClick}>{children}</a>;
}
