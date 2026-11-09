import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  // Wildcard includes AI crawlers. Preview indexing is controlled separately.
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
