import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://verygood.pizza'),
  title: "Very Good Pizza - Nostalgia Gaming & Beatboxing Streams",
  description: "Welcome to the VGP universe! Nostalgia-fueled gaming, epic beatboxing sessions, and a chill community. It's gaming. Not DiGiorno.",
  keywords: ["gaming", "twitch", "beatboxing", "nostalgia gaming", "streaming", "very good pizza", "VGP"],
  authors: [{ name: "Very Good Pizza" }],
  openGraph: {
    title: "Very Good Pizza - Nostalgia Gaming & Beatboxing",
    description: "Join the VGP universe for nostalgia gaming, beats, and good vibes!",
    url: "https://verygood.pizza",
    siteName: "Very Good Pizza",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Very Good Pizza - It's Gaming. Not DiGiorno.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Very Good Pizza - Nostalgia Gaming & Beatboxing",
    description: "Join the VGP universe for nostalgia gaming, beats, and good vibes!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
