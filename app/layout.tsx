import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { themeStorageKey } from "@/data/themes";
import { personal } from "@/data/resume";
import { siteUrl, siteTitle, siteDescription } from "@/data/site";

const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("${themeStorageKey}");
    if (t) document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: personal.name, url: personal.github }],
  keywords: [
    "Manichandra M R",
    ".NET developer",
    "C#",
    "ASP.NET Core",
    "Azure OpenAI",
    "Azure AI Document Intelligence",
    "Backend engineer",
    "Bengaluru",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: personal.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-term-bg text-term-fg font-mono" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
