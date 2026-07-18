import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Manichandra M R — Backend .NET Developer",
  description:
    "Portfolio of Manichandra M R, Software Engineer II at Solera Holdings. Backend .NET / C# developer specializing in REST APIs, legacy modernization, and Azure AI pipelines.",
  openGraph: {
    title: "Manichandra M R — Backend .NET Developer",
    description:
      "Software Engineer II at Solera Holdings. Backend .NET / C# developer specializing in REST APIs, legacy modernization, and Azure AI pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-term-bg text-term-fg font-mono">{children}</body>
    </html>
  );
}
