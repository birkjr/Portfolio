import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
     <body className="min-h-screen bg-background text-foreground">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
        <Navbar />
        <main className="container mx-auto px-4">
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}