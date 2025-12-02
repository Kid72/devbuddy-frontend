import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation/Navigation";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "DevHub - Developer Portal for Learning, Jobs & Tools",
    template: "%s | DevHub"
  },
  description: "Stay updated with tech news, learn programming, find jobs, prepare for interviews, and optimize your CV - all in one place",
  keywords: ["developer jobs", "programming tutorials", "interview questions", "tech news", "cv builder", "coding interview", "software engineer jobs", "learn programming"],
  authors: [{ name: "DevHub" }],
  creator: "DevHub",
  publisher: "DevHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devhub.com",
    title: "DevHub - Developer Portal for Learning, Jobs & Tools",
    description: "Stay updated with tech news, learn programming, find jobs, prepare for interviews, and optimize your CV",
    siteName: "DevHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHub - Developer Portal for Learning, Jobs & Tools",
    description: "Stay updated with tech news, learn programming, find jobs, prepare for interviews, and optimize your CV",
    creator: "@devhub",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 flex flex-col min-h-screen`}>
        <Providers>
          <Navigation />
          <main className="flex-1">{children}</main>
          <footer className="bg-white border-t border-gray-200 py-6 mt-20">
            <div className="container mx-auto px-4">
              <p className="text-center text-sm text-gray-600">
                © 2025 DevHub. All rights reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
