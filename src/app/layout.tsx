import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Elham | Flutter & Mobile Systems Engineer",
  description:
    "Interactive 3D portfolio showcasing elite Flutter architecture, 60fps interaction design, and AI developer tooling.",
  keywords: [
    "Flutter Engineer",
    "Mobile Systems",
    "iOS",
    "Android",
    "Interactive 3D",
    "Dart",
    "Riverpod",
    "BLoC",
    "Three.js",
    "Design Engineering",
  ],
  authors: [{ name: "Elham" }],
  creator: "Elham",
  metadataBase: new URL("https://elham.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elham.dev",
    title: "Elham | Flutter & Mobile Systems Engineer",
    description:
      "Interactive 3D portfolio showcasing elite Flutter architecture, 60fps interaction design, and AI developer tooling.",
    siteName: "Elham Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elham | Flutter & Mobile Systems Engineer",
    description:
      "Interactive 3D portfolio showcasing elite Flutter architecture, 60fps interaction design, and AI developer tooling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#050507] text-[#f4f4f5] selection:bg-blue-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
