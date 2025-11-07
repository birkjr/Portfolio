import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.birkramstad.no"),
  title: {
    default: "Birk Jonathan Ramstad | Full-Stack Developer",
    template: "%s | Birk Jonathan Ramstad",
  },
  description:
    "Porteføljen til Birk Jonathan Ramstad – full-stack utvikler og datateknologistudent ved NTNU.",
  keywords: [
    "Birk Ramstad",
    "Birk Jonathan Ramstad",
    "Birk Jonatan Ramstad",
    "fullstack utvikler",
    "full-stack developer",
    "NTNU",
    "portefølje",
    "norsk utvikler",
  ],
  authors: [{ name: "Birk Jonathan Ramstad" }],
  creator: "Birk Jonathan Ramstad",
  publisher: "Birk Jonathan Ramstad",
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "https://www.birkramstad.no",
    title: "Birk Jonathan Ramstad | Full-Stack Developer",
    description:
      "Oppdag prosjekter, erfaring og ferdigheter til Birk Jonathan Ramstad, full-stack utvikler og datateknologistudent ved NTNU.",
    siteName: "Birk Jonathan Ramstad Portfolio",
    images: [
      {
        url: "https://www.birkramstad.no/Selvportrett-kopi.png",
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
      "Utforsk prosjektene og erfaringen til Birk Jonathan Ramstad, full-stack utvikler og datateknologistudent ved NTNU.",
  },
  alternates: {
    canonical: "https://www.birkramstad.no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="dark" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
