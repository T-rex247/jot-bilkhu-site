import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE.SITE_URL}/` }];
}
