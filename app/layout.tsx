import type { Metadata } from "next";
import { Outfit, Nunito_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aakash Jayapal — UI/UX & Product Designer",
  description: "Designing products, brands and intelligent systems where business, technology and human behaviour meet.",
  openGraph: {
    title: "Aakash Jayapal — UI/UX & Product Designer",
    description: "Designing products, brands and intelligent systems where business, technology and human behaviour meet.",
    url: "https://aakashjayapal.design",
    siteName: "Aakash Jayapal Brand Platform",
    images: [
      {
        url: "https://aakashjayapal.design/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aakash Jayapal — UI/UX & Product Designer"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Jayapal — UI/UX & Product Designer",
    description: "Designing products, brands and intelligent systems where business, technology and human behaviour meet.",
    images: ["https://aakashjayapal.design/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aakash Jayapal",
    "url": "https://aakashjayapal.design",
    "jobTitle": "UI/UX & Product Designer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://www.linkedin.com/in/aakashjayapal/",
      "https://www.behance.net/aakashjayapaluiux"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Namakkal",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    }
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${nunitoSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-var(--background) text-var(--foreground) transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
