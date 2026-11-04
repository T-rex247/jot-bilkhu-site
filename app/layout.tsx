import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* v3 — SpaceX register: D-DIN-style condensed (Barlow Condensed) for labels + headlines, Inter for body, mono for counters. */
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const SITE_URL = "https://jot-studio-v2.vercel.app";
const TITLE = "Jot Bilkhu — Custom Software Studio";
const DESC = "Custom software for small and mid-sized businesses, built around the way you actually run — estimating, contracts, scheduling, payments, the whole spine. Book a paid Operating Review.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  robots: { index: false, follow: false },
  openGraph: { type: "website", url: SITE_URL, siteName: "Jot Bilkhu — Custom Software Studio", title: "Jot Bilkhu — Custom Software Studio", description: "Custom software for small and mid-sized businesses, built around the way you actually run.", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }] },
  twitter: { card: "summary_large_image", title: "Jot Bilkhu — Custom Software Studio", description: "Custom software for small and mid-sized businesses, built around the way you actually run.", images: ["/og.jpg"] },
};
export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
