import type { Metadata, Viewport } from 'next';
import { Saira_Stencil_One, Share_Tech_Mono } from 'next/font/google';
import './globals.css';

const stencil = Saira_Stencil_One({ weight: '400', subsets: ['latin'], variable: '--font-stencil', display: 'swap' });
const mono = Share_Tech_Mono({ weight: '400', subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const description =
  "Shak's gaming stream. Counter-Strike since 2007, plus PEAK, ARC Raiders and whatever the squad is playing tonight. Live on Twitch, clips on YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL('https://verygood.pizza'),
  title: 'Very Good Pizza — Shak’s gaming stream',
  description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Very Good Pizza',
    description,
    url: 'https://verygood.pizza',
    siteName: 'Very Good Pizza',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Very Good Pizza', description },
};

export const viewport: Viewport = { themeColor: '#1b2016' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${stencil.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
