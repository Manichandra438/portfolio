// Vercel sets VERCEL_PROJECT_PRODUCTION_URL (no protocol) on every build, so canonical URLs,
// the sitemap, and OG image links point at the production domain without hardcoding it.
// Set NEXT_PUBLIC_SITE_URL to override, e.g. after adding a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteTitle = "Manichandra M R — .NET & AI-Powered Claims Solutions";

export const siteDescription =
  "Portfolio of Manichandra M R, Software Engineer II at Solera Holdings. Backend .NET / C# developer specializing in Azure AI document extraction, REST APIs, legacy modernization, and cloud migration.";
