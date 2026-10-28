/** Prefer the owner's domain, then Vercel's production domain, then local dev. */
export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("NEXT_PUBLIC_SITE_URL must be an http or https URL.");
    }
    return new URL(url.origin);
  }

  const vercelDomain =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return new URL(
    vercelDomain ? `https://${vercelDomain}` : "http://localhost:3000",
  );
}
