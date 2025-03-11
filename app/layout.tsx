import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Personal Assistant - Your Smart Digital Companion",
  description: "Connect with specialized AI assistants for fitness, writing, coding, and more. Powered by advanced AI models including GPT-3.5, Gemini, and Claude.",
  keywords: "AI assistant, personal assistant, fitness coach, grammar checker, email writer, code assistant, AI chat",
  openGraph: {
    title: "AI Personal Assistant - Your Smart Digital Companion",
    description: "Connect with specialized AI assistants for fitness, writing, coding, and more.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "AI Personal Assistant Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Personal Assistant - Your Smart Digital Companion",
    description: "Connect with specialized AI assistants for fitness, writing, coding, and more.",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
