import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatClientWrapper } from '@/components/chat/ChatClientWrapper';
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppFloatingButton';
import { SITE_CONFIG, getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getStudioBusinessSchema } from '@/components/seo/JsonLd';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'SPAN Studio | Industrial Videography & Visual Content',
    template: '%s | SPAN Studio',
  },
  description:
    'Cinematic factory walkthroughs, commercial product films, precision photography, 3D technical animation, and video editing for manufacturing and commercial businesses.',
  keywords: [
    'Industrial Videography',
    'Factory Video Production',
    'Commercial Product Films',
    'Industrial Photography',
    '3D Technical Animation',
    'CAD Animation',
    'Rudrapur Video Production',
    'Uttarakhand Manufacturing Media',
    'SIDCUL Videography',
    'Delhi NCR Industrial Film',
  ],
  authors: [{ name: 'SPAN Studio' }],
  creator: 'SPAN Studio',
  publisher: 'SPAN Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: getCanonicalUrl(),
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: getCanonicalUrl(),
    siteName: 'SPAN Studio',
    title: 'SPAN Studio | Industrial Videography & Visual Content',
    description:
      'Cinematic factory walkthroughs, commercial product films, precision photography, and photorealistic 3D animation for manufacturing and commercial businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPAN Studio | Industrial Videography & Visual Content',
    description:
      'Cinematic factory walkthroughs, commercial product films, precision photography, and photorealistic 3D animation.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={getStudioBusinessSchema()} />
      </head>
      <body className="bg-bg-void text-text-primary font-body antialiased min-h-screen flex flex-col selection:bg-accent-primary selection:text-white">
        {/* Skip to Main Content Link (Keyboard Accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-accent-primary focus:text-white focus:font-mono focus:text-sm focus:font-semibold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
          {children}
        </main>
        <Footer />
        <ChatClientWrapper />
        <WhatsAppFloatingButton />

        {/* Vercel Analytics & Speed Insights integration */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
