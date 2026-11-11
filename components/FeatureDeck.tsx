"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";

export type Feature = {
  project: string;
  title: string;
  what: string;
  why: string;
  image: { src: string; alt: string };
};

const ease = [0.22, 1, 0.36, 1] as const;

export function FeatureDeck({ features, prevLabel, nextLabel }: { features: readonly Feature[]; prevLabel: string; nextLabel: string }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduced = useReducedMotion();
  const deckRef = useRef<HTMLDivElement>(null);
  const count = features.length;
  const feature = features[index];

  const go = useCallback((step: number) => {
    setState(([current]) => [(current + step + count) % count, step]);
  }, [count]);

  // Arrow keys while the deck has focus.
  useEffect(() => {
    const node = deckRef.current;
    if (!node) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [go]);

  // Warm the neighbours so a flip never shows an empty frame.
  useEffect(() => {
    for (const step of [1, -1]) {
      const next = features[(index + step + count) % count];
      const img = new window.Image();
      img.src = next.image.src;
    }
  }, [index, count, features]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(1);
    else if (swipe > 60) go(-1);
  };

  const distance = reduced ? 0 : 80;

  return (
    <div className="deck" ref={deckRef} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Features I've built">
      <div className="deck-stage">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.article
            key={index}
            className="deck-card"
            custom={direction}
            initial={{ opacity: 0, x: direction * distance }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -distance }}
            transition={{ duration: reduced ? 0.01 : 0.45, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={onDragEnd}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${feature.title}`}
          >
            <div className="deck-image">
              <Image src={feature.image.src} alt={feature.image.alt} width={1600} height={1000} sizes="(max-width: 767px) 92vw, 60vw" draggable={false} priority={index === 0} />
            </div>
            <div className="deck-copy">
              <p className="deck-project">{feature.project}</p>
              <h3>{feature.title}</h3>
              <p>{feature.what}</p>
              <p className="deck-why">{feature.why}</p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="deck-controls">
        <button type="button" className="deck-arrow" onClick={() => go(-1)} aria-label={prevLabel}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <p className="deck-count" aria-live="polite"><span>{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}</p>
        <button type="button" className="deck-arrow" onClick={() => go(1)} aria-label={nextLabel}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
