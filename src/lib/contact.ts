import { contactDetails } from "@/data/portfolio";

/** Only show verified contact values supplied by the portfolio owner. */
function externalUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function getContact() {
  const value =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || contactDetails.email;
  return {
    email: value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null,
    github: externalUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
    linkedin: externalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  };
}
