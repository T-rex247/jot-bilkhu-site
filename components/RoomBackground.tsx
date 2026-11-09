"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/data/site";

export default function RoomBackground() {
  const { scrollYProgress, scrollY } = useScroll();
  // Jot's desk (the v2 image) holds the opening, then dissolves into the room.
  const desk = useTransform(scrollY, (y) => {
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    return Math.min(1, Math.max(0, 1 - (y - 0.2 * vh) / (0.75 * vh)));
  });
  // Each new frame dissolves over the previous one; the base is always opaque.
  const second = useTransform(scrollYProgress, [0.12, 0.31], [0, 1]);
  const third = useTransform(scrollYProgress, [0.37, 0.57], [0, 1]);
  const fourth = useTransform(scrollYProgress, [0.64, 0.83], [0, 1]);
  const grade = useTransform(scrollYProgress, [0, 0.85], [
    "sepia(1) saturate(1.6) contrast(1.08) brightness(0.95)",
    "sepia(0) saturate(1) contrast(1.04) brightness(1.15)",
  ]);
  // Old-photo amber at the top, gone by the middle of the page.
  const amber = useTransform(scrollYProgress, [0, 0.5], [0.34, 0]);
  // The scrim carries the colour temperature: warm brown-black -> cool blue-black.
  const scrim = useTransform(scrollYProgress, [0, 0.55, 1], [
    "rgba(24, 14, 6, 0.62)", "rgba(10, 15, 15, 0.64)", "rgba(5, 16, 26, 0.56)",
  ]);
  const cool = useTransform(scrollYProgress, [0.45, 0.95], [0, 0.22]);
  const grain = useTransform(scrollYProgress, [0, 0.6], [0.09, 0]);
  const opacity = [1, second, third, fourth];
  const clean = SITE.room[3];

  return (
    <div className="room" aria-hidden="true">
      <motion.div className="room-images" style={{ filter: grade }}>
        {SITE.room.map((frame, index) => (
          <motion.picture key={frame.desktop} className={`room-frame room-frame-${index + 1}`} style={{ opacity: opacity[index] }}>
            {/* Media selection happens before downloading: no desktop frame on phones.
                Reduced motion selects the finished room even before hydration. */}
            <source media="(prefers-reduced-motion: reduce) and (max-width: 767px)" srcSet={clean.phone} />
            <source media="(prefers-reduced-motion: reduce)" srcSet={`${clean.desktopSmall} 1920w, ${clean.desktop} 2560w`} sizes="100vw" />
            <source media="(max-width: 767px)" srcSet={frame.phone} />
            <img
              src={frame.desktopSmall}
              srcSet={`${frame.desktopSmall} 1920w, ${frame.desktop} 2560w`}
              sizes="100vw" alt="" width={2560} height={1440}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"} decoding="async"
            />
          </motion.picture>
        ))}
      </motion.div>
      <motion.div className="room-cool" style={{ opacity: cool }} />
      <motion.div className="room-grain" style={{ opacity: grain }} />
      <motion.div className="room-amber" style={{ opacity: amber }} />
      <motion.div className="room-scrim" style={{ background: scrim }} />
      <div className="room-vignette" />
      <motion.div className="room-desk" style={{ opacity: desk }}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/desk-phone.webp" />
          <img src="/hero/desk-1920.webp" srcSet="/hero/desk-1920.webp 1920w, /hero/desk.webp 2560w" sizes="100vw"
            alt="" width={2560} height={1344} loading="eager" fetchPriority="high" decoding="async" />
        </picture>
        <div className="room-desk-shade" />
      </motion.div>
    </div>
  );
}
