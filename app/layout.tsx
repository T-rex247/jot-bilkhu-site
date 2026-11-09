import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BIZ, SERVICES, SITE_LIVE, SITE_URL } from "@/data/site";
import { structuredData } from "@/data/structured";

/* v3 — SpaceX register: D-DIN-style condensed (Barlow Condensed) for labels + headlines, Inter for body, mono for counters. */
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: BIZ.brand,
  description: `${BIZ.tagline} ${BIZ.sub}`,
  alternates: { canonical: "/" },
  keywords: [BIZ.brand, BIZ.city, ...SERVICES.flatMap(s => [s.name, ...s.items.map(item => item.t)])],
  authors: [{ name: BIZ.name, url: SITE_URL }],
  creator: BIZ.name,
  applicationName: BIZ.brand,
  robots: { index: SITE_LIVE, follow: SITE_LIVE },
  openGraph: { type: "website", locale: "en_US", url: SITE_URL, siteName: BIZ.brand, title: BIZ.brand, description: BIZ.tagline, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: BIZ.brand }] },
  twitter: { card: "summary_large_image", title: BIZ.brand, description: BIZ.tagline, images: ["/og.jpg"] },
};
export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* Read before paint so a saved preference also disables mount animations. */}
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.reducedMotion=String(matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('jot:reduceMotion')==='1')}catch{document.documentElement.dataset.reducedMotion=String(matchMedia('(prefers-reduced-motion: reduce)').matches)}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
