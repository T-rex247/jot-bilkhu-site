"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// The old world: Jot's desk, warm and grainy, holds the opening. Everything
// below the fold is the clean "new world" surface that rises over it.
export default function RoomBackground() {
  const { scrollY } = useScroll();
  // The desk dims slightly as the new world rises over it.
  const dim = useTransform(scrollY, (y) => {
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    return Math.min(0.6, Math.max(0, (y - 0.15 * vh) / (1.4 * vh)));
  });

  return (
    <div className="room" aria-hidden="true">
      <div className="room-desk">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/desk-phone.webp" />
          <img src="/hero/desk-1920.webp" srcSet="/hero/desk-1920.webp 1920w, /hero/desk.webp 2560w" sizes="100vw"
            alt="" width={2560} height={1344} loading="eager" fetchPriority="high" decoding="async" />
        </picture>
        <div className="room-desk-shade" />
      </div>
      <div className="room-grain" style={{ opacity: 0.06 }} />
      <motion.div className="room-dim" style={{ opacity: dim }} />
    </div>
  );
}
