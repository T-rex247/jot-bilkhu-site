import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE } from "@/data/site";
import { structuredData } from "@/data/structured";
import "./globals.css";

const typewriter = localFont({ src: "./fonts/arvo-latin-400.woff2", weight: "400", variable: "--font-typewriter", display: "swap", fallback: ["Courier New"] });
const serif = localFont({ src: "./fonts/fraunces-latin-400.woff2", weight: "400", variable: "--font-serif", display: "swap", fallback: ["Georgia"], preload: false });
const sans = localFont({ src: [
  { path: "./fonts/inter-latin-400.woff2", weight: "400" },
  { path: "./fonts/inter-latin-500.woff2", weight: "500" },
], variable: "--font-sans", display: "swap", fallback: ["Arial"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.SITE_URL),
  title: SITE.meta.title,
  description: SITE.meta.description,
  alternates: { canonical: SITE.SITE_URL },
  authors: [{ name: SITE.name, url: SITE.SITE_URL }],
  creator: SITE.name,
  applicationName: SITE.brand,
  robots: { index: SITE.SITE_LIVE, follow: SITE.SITE_LIVE },
  openGraph: {
    type: "website", locale: "en_US", url: SITE.SITE_URL, siteName: SITE.brand,
    title: SITE.meta.title, description: SITE.meta.description,
    images: [{ url: SITE.meta.image, width: 1200, height: 630, alt: SITE.brand }],
  },
  twitter: { card: "summary_large_image", title: SITE.meta.title, description: SITE.meta.description, images: [SITE.meta.image] },
};
export const viewport: Viewport = { themeColor: "#191c1b", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${typewriter.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
