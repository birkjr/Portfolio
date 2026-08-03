import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { jetbrainsMono } from "@/lib/fonts";

const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? "__DOMAIN_URL__" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "__SITE_TITLE__",
    template: "%s | __AUTHOR_NAME__",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  description:
    "__AUTHOR_NAME__ — portfolio with projects, experience and skills. Replace this description with your own.",
  keywords: [
    "__AUTHOR_NAME__",
    "portfolio",
    "developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "__AUTHOR_NAME__" }],
  creator: "__AUTHOR_NAME__",
  publisher: "__AUTHOR_NAME__",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: isProduction ? baseUrl : undefined,
    title: "__SITE_TITLE__",
    description:
      "__AUTHOR_NAME__ — portfolio with projects, experience and skills.",
    siteName: "__AUTHOR_NAME__ Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "__SITE_TITLE__",
    description:
      "__AUTHOR_NAME__ — portfolio with projects, experience and skills.",
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
    name: "__AUTHOR_NAME__",
    jobTitle: "Developer",
    url: baseUrl,
    sameAs: [
      "https://github.com/__GITHUB_USERNAME__",
      "https://www.linkedin.com/in/your-profile/",
    ],
  };

  return (
    <html lang="no" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body
        className={`${jetbrainsMono.className} min-h-screen bg-background text-foreground font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
