"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
// Below the fold is the "new world": motion there is quick and crisp.
const snapEase = [0.16, 1, 0.3, 1] as const;
const Fast = createContext(false);

function useMotionPreference() {
  const preference = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  // CSS already honors the preference before paint. Keep the first React
  // render identical to SSR, including in reduced-motion browsers.
  return hydrated ? preference : false;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const controls = useAnimationControls();
  const [ready, setReady] = useState(false);
  const reduced = useMotionPreference();
  const fast = useContext(Fast);

  useEffect(() => {
    // SSR and the first client render are fully visible. Arm motion only on
    // entry, so sections still reveal when reached after the fallback deadline.
    if (typeof IntersectionObserver === "undefined") return;
    setReady(true);
    const fallback = window.setTimeout(() => {
      void controls.start({ opacity: 1, y: 0, transition: { duration: 0.35 } });
    }, 6000);
    return () => window.clearTimeout(fallback);
  }, [controls, reduced]);

  return (
    <motion.div
      className={`reveal ${className}`} initial={false} animate={controls}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={ready ? () => {
        controls.set({ opacity: reduced ? 0.96 : fast ? 0 : 0.88, y: reduced ? 0 : fast ? 26 : 18 });
        void controls.start({ opacity: 1, y: 0, transition: { duration: reduced ? 0.25 : fast ? 0.5 : 0.85, delay: fast ? delay * 0.6 : delay, ease: fast ? snapEase : ease } });
      } : undefined}
    >{children}</motion.div>
  );
}

export function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !Element.prototype.animate) return;
    const letters = ref.current?.querySelectorAll<HTMLElement>(".typed-letter");
    const animations = Array.from(letters ?? [], (letter, index) => letter.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1, delay: 200 + index * 28, fill: "backwards" },
    ));
    const finish = () => animations.forEach(animation => animation.cancel());
    const fallback = window.setTimeout(finish, 4000);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", finish);
    return () => { window.clearTimeout(fallback); preference.removeEventListener("change", finish); finish(); };
  }, []);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <span key={index}>
            <span className="typed-word">{Array.from(word).map((letter, i) => <span className="typed-letter" key={i}>{letter}</span>)}</span>
            {index < text.split(" ").length - 1 ? " " : null}
          </span>
        ))}
        <span className="type-cursor" />
      </span>
    </>
  );
}

export function MagneticLink({ children, href, className = "", external = false, label }: {
  children: ReactNode; href: string; className?: string; external?: boolean; label?: string;
}) {
  const x = useSpring(0, { stiffness: 250, damping: 24 });
  const y = useSpring(0, { stiffness: 250, damping: 24 });
  const reduced = useMotionPreference();
  return (
    <motion.a
      href={href} className={className} aria-label={label}
      target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
      onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - box.left - box.width / 2) * 0.07);
        y.set((event.clientY - box.top - box.height / 2) * 0.1);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      onBlur={() => { x.set(0); y.set(0); }}
    >{children}</motion.a>
  );
}

export function TiltCard({ children }: { children: ReactNode }) {
  const rotateX = useSpring(0, { stiffness: 160, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 22 });
  const reduced = useMotionPreference();
  return (
    <motion.article className="work-card" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1100 }}
      onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        rotateX.set((0.5 - (event.clientY - box.top) / box.height) * 3);
        rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 3);
      }}
      onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}
    >{children}</motion.article>
  );
}

export function Portrait({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const reduced = useMotionPreference();
  return <motion.figure ref={ref} className="portrait" style={{ y: reduced ? 0 : y }}>{children}</motion.figure>;
}

export function Process({ steps }: { steps: readonly { title: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const reduced = useMotionPreference();
  return (
    <ol className="process" ref={ref}>
      <li className="process-rail" aria-hidden="true"><motion.span style={{ scaleY: reduced ? 1 : scrollYProgress }} /></li>
      {steps.map((step, index) => (
        <li className="process-step" key={step.title}>
          <Reveal delay={index * 0.06}>
            <span className="step-number" aria-hidden="true">{index + 1}</span>
            <h3>{step.title}</h3>
            {step.body && <p>{step.body}</p>}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function NewWorld({ children }: { children: ReactNode }) {
  return (
    <Fast.Provider value={true}>
      <div className="new-world">{children}</div>
    </Fast.Provider>
  );
}
