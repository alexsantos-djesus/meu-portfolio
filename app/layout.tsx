import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.debuguei.com.br"),
  title: { default: "Alex Santos — Portfólio", template: "%s | Alex Santos" },
  description: "Portfólio e vitrine de serviços de Alex Santos (Full-stack).",
  openGraph: { type: "website", url: "https://www.debuguei.com.br", title: "Alex Santos — Portfólio", siteName: "Alex Santos" },
  twitter: { card: "summary_large_image", creator: "@alex" },
  alternates: { canonical: "https://www.debuguei.com.br" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="scanlines fixed inset-0 pointer-events-none" aria-hidden />
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
