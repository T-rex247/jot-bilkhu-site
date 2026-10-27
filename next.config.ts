import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export — this is a marketing site with no API routes, server
     actions, or dynamic SSR, so a fully-static build deploys reliably (the
     server-function build was hanging on Vercel's builders at UNKNOWN). */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
