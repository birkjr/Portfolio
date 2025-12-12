import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction
  ? "https://www.birkramstad.no"
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: isProduction ? new URL(baseUrl) : undefined,
  title: {
    default: "Birk Jonathan Ramstad | Full-Stack Developer",
    template: "%s | Birk Jonathan Ramstad",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-48.png",
  },

  description:
    "Birk Jonathan Ramstad – full-stack utvikler og datateknologistudent ved NTNU. Portefølje med prosjekter, erfaring og ferdigheter innen web development, reverse engineering og cybersecurity.",
  keywords: [
    "Birk Ramstad",
    "Birk Jonathan Ramstad",
    "Birk Jonatan Ramstad",
    "fullstack utvikler",
    "full-stack developer",
    "NTNU",
    "portefølje",
    "norsk utvikler",
    "web developer",
    "software engineer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Birk Jonathan Ramstad" }],
  creator: "Birk Jonathan Ramstad",
  publisher: "Birk Jonathan Ramstad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: isProduction ? baseUrl : undefined,
    title: "Birk Jonathan Ramstad | Full-Stack Developer",
    description:
      "Birk Jonathan Ramstad – full-stack utvikler og datateknologistudent ved NTNU. Oppdag prosjekter, erfaring og ferdigheter innen web development, reverse engineering og cybersecurity.",
    siteName: "Birk Jonathan Ramstad Portfolio",
    images: [
      {
        url: isProduction
          ? `${baseUrl}/Selvportrett-kopi.png`
          : "/Selvportrett-kopi.png",
        width: 1200,
        height: 630,
        alt: "Birk Jonathan Ramstad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birk Jonathan Ramstad | Full-Stack Developer",
    description:
      "Birk Jonathan Ramstad – full-stack utvikler og datateknologistudent ved NTNU. Utforsk prosjekter, erfaring og ferdigheter innen web development, reverse engineering og cybersecurity.",
  },
  alternates: {
    canonical:
      process.env.NODE_ENV === "production"
        ? "https://www.birkramstad.no"
        : undefined,
  },
  verification: {
    other: {
      "msvalidate.01": "C3310BF5C41DA7FEC73FA709C89E893B",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Birk Jonathan Ramstad",
    alternateName: ["Birk Ramstad", "Birk J. Ramstad"],
    jobTitle: "Full-Stack Developer",
    url: baseUrl,
    sameAs: [
      "https://github.com/birkjr",
      "https://www.linkedin.com/in/birkjramstad/",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "NTNU - Norges teknisk-naturvitenskapelige universitet",
    },
    knowsAbout: [
      "Full-Stack Development",
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Reverse Engineering",
      "Cybersecurity",
    ],
  };

  return (
    <html lang="no" className="dark" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
