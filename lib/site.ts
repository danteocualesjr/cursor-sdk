const DEFAULT_SITE_URL = "http://127.0.0.1:3000";

export function getSiteUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    DEFAULT_SITE_URL;

  return candidate.replace(/\/$/, "");
}

export const siteName = "Bootcamp Companion";
export const siteDescription =
  "AI-powered crash courses and code-aware mentorship for students preparing for technical programs.";
