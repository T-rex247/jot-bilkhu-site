/** Storage can be unavailable in private browsing; the OS preference still applies. */
export function motionReduced() {
  let local = false;
  try { local = localStorage.getItem("jot:reduceMotion") === "1"; } catch {}
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || local;
}
