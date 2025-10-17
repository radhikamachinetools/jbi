// app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Jai Balaji Industries - Premium Stone Processing Machinery",
    template: "%s | Jai Balaji Industries"
  },
  description: "Leading manufacturer of stone processing machinery including granite cutting machines, line polishing machines, handling cranes, and epoxy resin lines. Trusted by 500+ industries worldwide.",
  keywords: [
    "stone processing machinery",
    "granite cutting machines",
    "line polishing machines",
    "handling cranes",
    "epoxy resin line",
    "stone machinery manufacturer",
    "industrial machinery",
    "Jodhpur machinery",
    "Jai Balaji Industries"
  ],
  authors: [{ name: "Jai Balaji Industries" }],
  creator: "Jai Balaji Industries",
  publisher: "Jai Balaji Industries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Jai Balaji Industries - Premium Stone Processing Machinery',
    description: 'Leading manufacturer of stone processing machinery. Trusted by 500+ industries worldwide.',
    siteName: 'Jai Balaji Industries',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jai Balaji Industries - Stone Processing Machinery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Balaji Industries - Premium Stone Processing Machinery',
    description: 'Leading manufacturer of stone processing machinery. Trusted by 500+ industries worldwide.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)', color: '#047857' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JBI" />
        <meta name="application-name" content="Jai Balaji Industries" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Jai Balaji Industries",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/images/radhika-logo.png`,
              "description": "Leading manufacturer of stone processing machinery including granite cutting machines, line polishing machines, handling cranes, and epoxy resin lines.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "J1-65, RIICO 1st Phase, Sangariya",
                "addressLocality": "Jodhpur",
                "addressRegion": "Rajasthan",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9983813366",
                "contactType": "customer service",
                "email": "jbi.jodhpur@gmail.com"
              },
              "sameAs": [
                "https://www.jbijodhpur.com"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}